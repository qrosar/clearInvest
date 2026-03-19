import type { Product } from './products';

export interface DataPoint {
  year: number;
  value: number;
  totalContributed: number;
  totalTaxPaid: number;
}

export interface TaxBreakdown {
  tobBuy: number;               // TOB on purchases (lump sum + monthly contributions)
  tobSell: number;              // TOB on sale
  precompte: number;            // précompte on dividends, savings interest above exemption, branche 21 withholding
  reynders: number;             // Reynders tax on gains (bond funds)
  capitalGainsTax: number;      // CGT on gains (10% above €10k, equity ETFs, effective 2026)
  entryFees: number;            // insurer/broker entry fee
  premiumTax: number;           // Belgian 2% government tax on insurance premiums (branche 21)
  annualFeesCumulative: number; // TER impact estimate — already reflected in rate, shown separately
  pensionTax: number;           // 8% lump tax on fictive-capitalised amount (pilier 3)
  taxBenefit: number;           // pension savings tax reduction on contributions (total amount redirected to side-pot)
  pensionSidePotFinal: number;  // final value of the tax-return side-pot reinvested at 6%/yr
  total: number;                // net costs (all taxes/fees minus taxBenefit; excludes annualFeesCumulative)
}

export interface GrowthResult {
  points: DataPoint[];
  /** Final portfolio value after all sell-side taxes (TOB on sale, Reynders, CGT, pension, branche21, etc.) */
  finalValueAfterTax: number;
  /** Total sell-side taxes applied at redemption */
  sellTaxes: number;
  /** Breakdown of each tax and fee component */
  taxBreakdown: TaxBreakdown;
}

/**
 * Computes yearly portfolio growth with accurate Belgian taxation.
 *
 * Holding-period taxes (deducted as they occur, reflected in `value`):
 *   - TOB on each purchase (lump sum + monthly contributions)
 *   - Entry fee on each purchase (branche 21)
 *   - Précompte mobilier on dividends (distributing ETFs)
 *   - Précompte mobilier on savings interest above €1,020/year exemption
 *
 * Holding-period benefits:
 *   - Pilier 3: 30% tax reduction on contributions up to €1,020/year, modelled as additional monthly investment
 *
 * Sell-side taxes (computed at end, not subtracted from chart values):
 *   - TOB on sale
 *   - Reynders tax: 30% on gains (bond-heavy funds)
 *   - CGT: 10% on gains above €10,000 (equity ETFs, Belgium, effective 1 Jan 2026)
 *   - Pension tax: 8% on full capital (épargne-pension, pilier 3)
 *   - Branche 21: 30% précompte on gains at maturity (always, regardless of duration)
 *
 * TER (annualFee): already embedded in historical return rate — tracked for breakdown display only,
 * NOT deducted from portfolio value.
 */
export function computeGrowth(
  product: Product,
  monthlyContribution: number,
  years: number,
  lumpSum: number = 0,
  rateOverride?: number,
  pensionAnnualOption?: 1050 | 1350,
): GrowthResult {
  const rateBase = rateOverride ?? product.defaultRate ?? 0;

  // Resolve tax config — for legacy custom products without taxConfig,
  // fall back to the old taxRate/entryFee fields.
  const tc = product.taxConfig ?? {};
  const entryFee = tc.entryFee ?? 0;
  const premiumTax = tc.premiumTax ?? 0;
  const tob = tc.tob ?? 0;
  const tobOnSale = tc.tobOnSale ?? tob;
  const buyFee = tob + entryFee + premiumTax;
  const annualFee = tc.annualFee ?? 0;

  // For custom products the user enters a gross rate and TER separately —
  // subtract TER from the growth rate so it acts as a real annual drag.
  // For preset products defaultRate already has TER baked in (grossBaseline - TER).
  const rate = product.isCustom ? rateBase - annualFee : rateBase;

  const interestTax = tc.interestTax ?? 0;
  const interestExemption = tc.interestExemption ?? 0;
  const dividendTax = tc.dividendTax ?? 0;
  const dividendYield = tc.dividendYield ?? 0;

  // Upfront tax relief on pension contributions — modelled as additional monthly investment
  // Only applies to genuine Belgian pillar 3 products (upfrontTaxRelief AND pensionTax both set)
  const isPensionProduct = (tc.upfrontTaxRelief ?? 0) > 0 && (tc.pensionTax ?? 0) > 0;
  const pensionAnnualContribution = pensionAnnualOption ?? 1050;
  const effectiveReliefRate = pensionAnnualContribution === 1350 ? 0.25 : (tc.upfrontTaxRelief ?? 0);
  const effectiveReliefCap = pensionAnnualContribution === 1350 ? 1350 : (tc.upfrontTaxReliefCap ?? 0);
  const annualRelief = isPensionProduct
    ? Math.min(monthlyContribution * 12, effectiveReliefCap) * effectiveReliefRate
    : 0;
  const pensionMonthlyBenefit = annualRelief / 12;

  // For legacy custom products: apply taxRate as a simple annual fraction of gains
  const legacyTaxRate = !product.taxConfig ? (product.taxRate ?? 0) : 0;
  const legacyEntryFee = !product.taxConfig ? (product.entryFee ?? 0) : 0;
  const effectiveBuyFee = product.taxConfig ? buyFee : legacyEntryFee;

  // ── Breakdown accumulators ────────────────────────────────
  let tobBuyAcc = lumpSum * tob;
  let entryFeesAcc = lumpSum * entryFee;
  let premiumTaxAcc = lumpSum * premiumTax;
  let precompteAcc = 0;
  let annualFeesAcc = 0;
  let taxBenefitAcc = 0;

  // ── Fictive 4.75%/yr capital accumulators (time-weighted) ─
  // Used for: pension 8% tax basis (Belgian law: taxed on fictive capital, not actual portfolio)
  //           and branche 21 early-exit withholding gain calculation
  const fictiveMonthlyRate = Math.pow(1 + 0.0475, 1 / 12) - 1;
  let fictivePensionCapital = lumpSum;
  let fictiveBr21Capital = lumpSum * (1 - effectiveBuyFee);

  // ── Pension tax-return side-pot ────────────────────────────
  // Government tax refunds are not reinvested in the pension fund itself (separate account),
  // so they grow at a standard 6%/yr rate rather than the product rate.
  let pensionSidePot = 0;
  const sidePotMonthlyRate = 0.06 / 12;

  // ── Initial lump sum ──────────────────────────────────────
  let value = lumpSum * (1 - effectiveBuyFee);
  let totalTaxPaid = lumpSum * effectiveBuyFee;
  let cumulativeContributed = lumpSum;

  const points: DataPoint[] = [{
    year: 0,
    value: Math.round(value),
    totalContributed: lumpSum,
    totalTaxPaid: Math.round(totalTaxPaid),
  }];

  const monthlyRate = (1 + rate) ** (1 / 12) - 1;

  for (let y = 1; y <= years; y++) {
    const yearStartValue = value;
    let yearGrowth = 0;

    for (let m = 0; m < 12; m++) {
      // Add monthly contribution (net of buy costs)
      const contribFee = monthlyContribution * effectiveBuyFee;
      tobBuyAcc += monthlyContribution * tob;
      entryFeesAcc += monthlyContribution * entryFee;
      premiumTaxAcc += monthlyContribution * premiumTax;
      totalTaxPaid += contribFee;
      value += monthlyContribution * (1 - effectiveBuyFee);
      cumulativeContributed += monthlyContribution;

      // Update fictive 4.75%/yr capital accumulators (time-weighted, contribution first then growth)
      fictivePensionCapital += monthlyContribution;
      fictivePensionCapital *= (1 + fictiveMonthlyRate);
      fictiveBr21Capital += monthlyContribution * (1 - effectiveBuyFee);
      fictiveBr21Capital *= (1 + fictiveMonthlyRate);

      // Pension tax return: goes into a separate side-pot at 6%/yr, not into the pension fund itself
      if (isPensionProduct && pensionMonthlyBenefit > 0) {
        pensionSidePot += pensionMonthlyBenefit;
        taxBenefitAcc += pensionMonthlyBenefit;
      }
      pensionSidePot *= (1 + sidePotMonthlyRate);

      // Portfolio growth this month
      const growth = value * monthlyRate;
      yearGrowth += growth;
      value += growth;

      // Distributing ETF: dividend précompte drained monthly
      if (dividendTax > 0 && dividendYield > 0) {
        const monthDividend = value * (dividendYield / 12);
        const tax = monthDividend * dividendTax;
        value -= tax;
        precompteAcc += tax;
        totalTaxPaid += tax;
        yearGrowth -= tax;
      }
    }

    // TER estimate — tracked once per year on year-start value (not deducted, already in rate)
    if (annualFee > 0) {
      annualFeesAcc += yearStartValue * annualFee;
    }

    // Annual savings interest tax on interest above exemption
    if (interestTax > 0) {
      const taxableInterest = Math.max(0, yearGrowth - interestExemption);
      const tax = taxableInterest * interestTax;
      value -= tax;
      precompteAcc += tax;
      totalTaxPaid += tax;
    }

    points.push({
      year: y,
      value: Math.round(value),
      totalContributed: cumulativeContributed,
      totalTaxPaid: Math.round(totalTaxPaid),
    });
  }

  // ── Sell-side taxes (applied at redemption) ───────────────
  const portfolioValue = points[points.length - 1].value;

  // TOB on sale — computed first so gain basis uses net proceeds
  const tobSellAmt = portfolioValue * tobOnSale;
  let sellTaxes = tobSellAmt;

  // Net proceeds after TOB sell; cost basis excludes all buy-side costs that never entered the fund
  const netInvested = cumulativeContributed - tobBuyAcc - entryFeesAcc - premiumTaxAcc;
  const gains = Math.max(0, portfolioValue - tobSellAmt - netInvested);

  // Reynders tax: applied to bond portion of gains; CGT applied to equity portion
  // product.bondAllocation drives the split (defaults to 1.0 = pure bond fund)
  let reyndersAmt = 0;
  let cgtAmt = 0;
  if (tc.reyndersTax && tc.reyndersTax > 0) {
    const bondAlloc = product.bondAllocation ?? 1.0;
    const bondGains = gains * bondAlloc;
    reyndersAmt = bondGains * tc.reyndersTax;
    sellTaxes += reyndersAmt;
    // CGT on the non-bond (equity) portion
    if (tc.capitalGainsTax && tc.capitalGainsTax > 0) {
      const equityGains = gains * (1 - bondAlloc);
      const taxableEquityGains = Math.max(0, equityGains - (tc.capitalGainsExemption ?? 0));
      cgtAmt = taxableEquityGains * tc.capitalGainsTax;
      sellTaxes += cgtAmt;
    }
  } else if (tc.capitalGainsTax && tc.capitalGainsTax > 0 && !tc.branche21WithholdingTax) {
    // Pure equity / no Reynders path
    const taxableGains = Math.max(0, gains - (tc.capitalGainsExemption ?? 0));
    cgtAmt = taxableGains * tc.capitalGainsTax;
    sellTaxes += cgtAmt;
  }

  // Pilier 3: 8% on fictive 4.75%-capitalised amount (Belgian law basis, not actual portfolio value)
  let pensionAmt = 0;
  if (tc.pensionTax) {
    pensionAmt = fictivePensionCapital * tc.pensionTax;
    sellTaxes += pensionAmt;
  }

  // Branche 21: withholding tax on fictive return if held < minYears; exempt after that
  // After the exempt period, CGT applies on real gains instead
  let branche21Amt = 0;
  if (tc.branche21WithholdingTax) {
    const minYears = tc.branche21MinYears ?? 8;
    if (years < minYears) {
      // Early exit: 30% précompte on time-weighted fictive gain (net contributions compounded at 4.75%)
      const fictiveGain = Math.max(0, fictiveBr21Capital - netInvested);
      branche21Amt = fictiveGain * tc.branche21WithholdingTax;
      sellTaxes += branche21Amt;
    } else {
      // After exemption period: no withholding, but CGT applies on real gains
      if (tc.capitalGainsTax && tc.capitalGainsTax > 0) {
        const taxableGains = Math.max(0, gains - (tc.capitalGainsExemption ?? 0));
        cgtAmt = taxableGains * tc.capitalGainsTax;
        sellTaxes += cgtAmt;
      }
    }
  }

  // Legacy custom product: apply taxRate as simple gain tax at sale
  if (legacyTaxRate > 0) {
    sellTaxes += gains * legacyTaxRate;
  }

  // branche21Amt (withholding) is reported under precompte (it is a précompte mobilier)
  const totalPrecompte = precompteAcc + branche21Amt;

  const grossCosts = Math.round(tobBuyAcc + tobSellAmt + totalPrecompte + reyndersAmt + cgtAmt + entryFeesAcc + premiumTaxAcc + pensionAmt);

  const taxBreakdown: TaxBreakdown = {
    tobBuy: Math.round(tobBuyAcc),
    tobSell: Math.round(tobSellAmt),
    precompte: Math.round(totalPrecompte),
    reynders: Math.round(reyndersAmt),
    capitalGainsTax: Math.round(cgtAmt),
    entryFees: Math.round(entryFeesAcc),
    premiumTax: Math.round(premiumTaxAcc),
    annualFeesCumulative: Math.round(annualFeesAcc),
    pensionTax: Math.round(pensionAmt),
    taxBenefit: Math.round(taxBenefitAcc),
    pensionSidePotFinal: Math.round(pensionSidePot),
    total: Math.max(0, grossCosts - Math.round(taxBenefitAcc)),
  };

  return {
    points,
    finalValueAfterTax: Math.round(Math.max(0, portfolioValue - sellTaxes) + pensionSidePot),
    sellTaxes: Math.round(sellTaxes),
    taxBreakdown,
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
