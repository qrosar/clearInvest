import { describe, expect, it } from 'vitest';
import { PRODUCTS, type Product } from './products';
import { CGT_ANNUAL_EXEMPTION, cgtExemptionFor, computeGrowth } from './compute';

function product(id: string): Product {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) throw new Error(`unknown product in test fixture: ${id}`);
  return p;
}

/** Sum of the cost rows the UI lists under "Détail des taxes". */
function sumOfCostRows(bd: ReturnType<typeof computeGrowth>['taxBreakdown']) {
  return (
    bd.tobBuy +
    bd.tobSell +
    bd.precompte +
    bd.reynders +
    bd.capitalGainsTax +
    bd.entryFees +
    bd.premiumTax +
    bd.pensionTax
  );
}

// ── Invariants ───────────────────────────────────────────────────────────────
// These hold for every product; they are what stops a refactor from silently
// changing the arithmetic.

describe('invariants across every product', () => {
  const cases = PRODUCTS.filter(p => p.defaultRate !== null);

  it('covers every product category', () => {
    const categories = new Set(cases.map(p => p.category));
    expect([...categories].sort()).toEqual(['bank', 'branche21', 'etf']);
  });

  for (const p of cases) {
    describe(p.id, () => {
      const r = computeGrowth(p, 200, 20, 1000);

      it('breakdown total equals the sum of its rows', () => {
        // TER is displayed separately and greyed out because it is already
        // baked into the return rate — it must not be in the total.
        expect(r.taxBreakdown.total).toBe(sumOfCostRows(r.taxBreakdown));
      });

      it('never returns a negative final value', () => {
        expect(r.finalValueAfterTax).toBeGreaterThanOrEqual(0);
      });

      it('emits one point per year plus the opening balance', () => {
        expect(r.points).toHaveLength(21);
        expect(r.points[0].year).toBe(0);
        expect(r.points[20].year).toBe(20);
      });

      it('tracks contributions exactly', () => {
        expect(r.points[20].totalContributed).toBe(1000 + 200 * 12 * 20);
      });

      it('charges no more sell-side tax than the portfolio is worth', () => {
        expect(r.sellTaxes).toBeLessThanOrEqual(r.points[20].value);
      });
    });
  }
});

// ── Edge cases ───────────────────────────────────────────────────────────────

describe('edge cases', () => {
  const etf = product('monde-simplifie');

  it('with no money in, everything is zero', () => {
    const r = computeGrowth(etf, 0, 20, 0);
    expect(r.finalValueAfterTax).toBe(0);
    expect(r.sellTaxes).toBe(0);
    expect(r.taxBreakdown.total).toBe(0);
  });

  it('with zero years, the opening balance is the closing balance', () => {
    const r = computeGrowth(etf, 200, 0, 1000);
    expect(r.points).toHaveLength(1);
    // Only the buy-side TOB on the lump sum has been charged.
    expect(r.points[0].value).toBe(Math.round(1000 * (1 - 0.0012)));
    expect(r.points[0].totalContributed).toBe(1000);
  });

  it('handles a lump sum with no monthly contribution', () => {
    const r = computeGrowth(etf, 0, 20, 10_000);
    expect(r.points[20].totalContributed).toBe(10_000);
    expect(r.finalValueAfterTax).toBeGreaterThan(10_000);
  });

  it('grows monotonically with the horizon at a positive rate', () => {
    const ten = computeGrowth(etf, 200, 10, 0).finalValueAfterTax;
    const twenty = computeGrowth(etf, 200, 20, 0).finalValueAfterTax;
    const thirty = computeGrowth(etf, 200, 30, 0).finalValueAfterTax;
    expect(twenty).toBeGreaterThan(ten);
    expect(thirty).toBeGreaterThan(twenty);
  });

  it('honours a rate override', () => {
    const base = computeGrowth(etf, 200, 20, 0, 0.02).finalValueAfterTax;
    const higher = computeGrowth(etf, 200, 20, 0, 0.08).finalValueAfterTax;
    expect(higher).toBeGreaterThan(base);
  });

  it('applies no capital gains tax when the gain sits inside the exemption', () => {
    // Small contribution over a short horizon — the gain stays well under €10k.
    const r = computeGrowth(etf, 50, 3, 0);
    expect(r.taxBreakdown.capitalGainsTax).toBe(0);
  });
});

// ── Golden values ────────────────────────────────────────────────────────────
// €200/month for 20 years, no lump sum. Locked in so a change in the tax stack
// has to be deliberate.

describe('golden case: €200/month, 20 years, no lump sum', () => {
  it('accumulating equity ETF (monde-simplifie)', () => {
    const r = computeGrowth(product('monde-simplifie'), 200, 20, 0);
    expect(r.taxBreakdown).toMatchObject({
      tobBuy: 58,
      tobSell: 140,
      precompte: 0,
      reynders: 0,
      entryFees: 0,
      premiumTax: 0,
      pensionTax: 0,
    });
    // TER is tracked for display only and excluded from `total`.
    expect(r.taxBreakdown.annualFeesCumulative).toBe(1635);
    expect(r.sellTaxes).toBe(r.taxBreakdown.tobSell + r.taxBreakdown.capitalGainsTax);
  });

  it('distributing equity ETF withholds précompte on dividends', () => {
    const r = computeGrowth(product('dividendes'), 200, 20, 0);
    expect(r.taxBreakdown.precompte).toBe(9260);
    expect(r.dividends).toBeDefined();
    expect(r.dividends!.grossYield).toBeCloseTo(0.04, 5);
    expect(r.dividends!.netYield).toBeCloseTo(0.04 * 0.7, 5);
    expect(r.dividends!.netTotal).toBe(
      r.dividends!.grossTotal - r.dividends!.precompte,
    );
    expect(r.dividends!.totalIfCashedOut).toBe(
      r.dividends!.portfolioIfCashedOut + r.dividends!.cashCollected,
    );
  });

  it('regulated savings account taxes interest above the exemption only', () => {
    const r = computeGrowth(product('savings-belfius-flow'), 200, 20, 0);
    expect(r.taxBreakdown.precompte).toBe(776);
    expect(r.taxBreakdown.capitalGainsTax).toBe(0);
    expect(r.sellTaxes).toBe(0);
  });

  it('term deposit taxes interest from the first euro', () => {
    const r = computeGrowth(product('bon-caisse-kbc-5yr'), 200, 20, 0);
    expect(r.taxBreakdown.precompte).toBe(6392);
    expect(r.taxBreakdown.total).toBe(6392);
  });

  it('branche 21 charges the 2% premium tax on every deposit', () => {
    const r = computeGrowth(product('branche21'), 200, 20, 0);
    // 2% of €48,000 contributed.
    expect(r.taxBreakdown.premiumTax).toBe(960);
    expect(r.taxBreakdown.entryFees).toBe(1440);
  });
});

// ── CGT exemption and its carry-forward ──────────────────────────────────────
// €10,000 a year, with unused franchise carried forward at up to €1,000/year
// for five years — €15,000 ceiling, reached from year 6.

describe('cgtExemptionFor', () => {
  it('gives the base exemption for a sale inside the first year', () => {
    expect(cgtExemptionFor(0)).toBe(10_000);
    expect(cgtExemptionFor(1)).toBe(10_000);
  });

  it('accrues €1,000 per completed year of deferral', () => {
    expect(cgtExemptionFor(2)).toBe(11_000);
    expect(cgtExemptionFor(3)).toBe(12_000);
    expect(cgtExemptionFor(4)).toBe(13_000);
    expect(cgtExemptionFor(5)).toBe(14_000);
  });

  it('caps at €15,000 from year 6 onward', () => {
    expect(cgtExemptionFor(6)).toBe(15_000);
    expect(cgtExemptionFor(20)).toBe(15_000);
    expect(cgtExemptionFor(40)).toBe(15_000);
  });

  it('stays at zero for products with no exemption configured', () => {
    expect(cgtExemptionFor(30, 0)).toBe(0);
  });

  it('never exceeds the ceiling regardless of horizon', () => {
    for (let y = 0; y <= 60; y++) {
      expect(cgtExemptionFor(y)).toBeLessThanOrEqual(15_000);
      expect(cgtExemptionFor(y)).toBeGreaterThanOrEqual(CGT_ANNUAL_EXEMPTION);
    }
  });
});

describe('carry-forward reduces the tax actually charged', () => {
  const etf = product('monde-simplifie');

  it('taxes a long hold less than the flat exemption would', () => {
    const r = computeGrowth(etf, 200, 20, 0);
    // Ceiling applies: €15,000 exempt rather than €10,000, so €500 less tax.
    expect(r.taxBreakdown.capitalGainsTax).toBe(5400);
  });

  it('charges 10% on the excess over the available exemption', () => {
    const r = computeGrowth(etf, 200, 30, 0);
    const netInvested = 200 * 12 * 30 - r.taxBreakdown.tobBuy;
    const gains = r.points[30].value - r.taxBreakdown.tobSell - netInvested;
    const expected = Math.round((gains - 15_000) * 0.1);
    // Within a euro — the assertion above uses the rounded chart value.
    expect(Math.abs(r.taxBreakdown.capitalGainsTax - expected)).toBeLessThanOrEqual(1);
  });
});

// ── Branche 21 holding-period rule ───────────────────────────────────────────

describe('branche 21 withholding depends on the holding period', () => {
  const p = product('branche21-ethias-9yr');
  const minYears = p.taxConfig?.branche21MinYears ?? 8;

  it('withholds on the fictive return when sold before the exempt period', () => {
    const early = computeGrowth(p, 200, minYears - 1, 0);
    expect(early.taxBreakdown.precompte).toBeGreaterThan(0);
  });

  it('exempts the withholding once the period is complete', () => {
    const late = computeGrowth(p, 200, minYears + 1, 0);
    expect(late.taxBreakdown.precompte).toBe(0);
  });
});

// ── Pension savings (pilier 3) ───────────────────────────────────────────────

describe('pension savings', () => {
  const p = PRODUCTS.find(x => x.taxConfig?.pensionTax && x.taxConfig?.upfrontTaxRelief)!;

  it('records the tax relief and the 8% exit tax', () => {
    const r = computeGrowth(p, 87.5, 30, 0);
    expect(r.taxBreakdown.taxBenefit).toBeGreaterThan(0);
    expect(r.taxBreakdown.pensionTax).toBeGreaterThan(0);
    expect(r.taxBreakdown.pensionSidePotFinal).toBeGreaterThan(0);
  });

  it('gives a larger relief on the €1,350 ceiling than the €1,050 one', () => {
    const low = computeGrowth(p, 112.5, 30, 0, undefined, 1050);
    const high = computeGrowth(p, 112.5, 30, 0, undefined, 1350);
    expect(high.taxBreakdown.taxBenefit).toBeGreaterThan(low.taxBreakdown.taxBenefit);
  });
});
