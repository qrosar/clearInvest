import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Déclarer son compte broker étranger en Belgique — Guide 2026', 
    nl: 'Buitenlandse brokerrekening aangeven in België — Gids 2026', 
    en: 'Declaring a Foreign Broker Account in Belgium — 2026 Guide' 
  }
  const descriptions = { 
    fr: 'Comment déclarer votre compte DEGIRO, Trade Republic ou IBKR à la BNB et sur votre déclaration fiscale.', 
    nl: 'Hoe geeft u uw DEGIRO-, Trade Republic- of IBKR-rekening aan bij de NBB en op uw belastingaangifte.', 
    en: 'How to declare your DEGIRO, Trade Republic or IBKR account to the NBB and on your tax return.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/ressources/declarer-compte-etranger`,
    },
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function TipBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
      <p className="mb-1 font-semibold">{label}</p>
      {children}
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-[var(--forest)]/20 bg-[var(--forest)]/5 px-5 py-4 text-sm leading-relaxed text-[var(--charcoal)]/80">
      <p className="mb-1 font-semibold text-[var(--forest)]">{label}</p>
      {children}
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 pt-0.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--forest)] text-xs font-bold text-white">
          {number}
        </div>
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[var(--charcoal)]">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-[var(--charcoal)]/70">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function DeclarerCompteEtrangerPage() {
  const t = await getTranslations('declarerCompte');

  const formFields = [
    { field: t('s1_field1_name'), desc: t('s1_field1_desc') },
    { field: t('s1_field2_name'), desc: t('s1_field2_desc') },
    { field: t('s1_field3_name'), desc: t('s1_field3_desc') },
    { field: t('s1_field4_name'), desc: t('s1_field4_desc') },
    { field: t('s1_field5_name'), desc: t('s1_field5_desc') },
    { field: t('s1_field6_name'), desc: t('s1_field6_desc') },
    { field: t('s1_field7_name'), desc: t('s1_field7_desc') },
  ];

  const taxRows = [
    { taxe: t('s3_row_tob'),       degiro: true,  tr: false, ibkr: false },
    { taxe: t('s3_row_precompte'), degiro: false, tr: false, ibkr: false },
    { taxe: t('s3_row_cgt'),       degiro: false, tr: false, ibkr: false },
  ];

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          {t('hero_tag')}
        </p>
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {t('hero_title')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 md:text-base">
          {t('hero_subtitle')}
        </p>
      </div>

      <main className="bg-[var(--warm-cream)]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">

          {/* Intro */}
          <section className="mb-12">
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('intro_p1')}</p>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('intro_p2')}</p>
            <InfoCard label={t('info_label')}>{t('intro_info')}</InfoCard>
          </section>

          {/* Section 1 — BNB PCC */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s1_title')}{' '}
              <span className="text-base font-normal text-[var(--charcoal)]/50">{t('s1_title_badge')}</span>
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s1_p1')}</p>
            <p className="mb-6 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s1_p2')}</p>

            <p className="mb-4 text-sm font-semibold text-[var(--charcoal)]/80">{t('s1_how')}</p>

            <div className="space-y-5">
              <Step number={1} title={t('s1_step1_title')}>{t('s1_step1_desc')}</Step>
              <Step number={2} title={t('s1_step2_title')}>{t('s1_step2_desc')}</Step>
              <Step number={3} title={t('s1_step3_title')}>{t('s1_step3_desc')}</Step>
              <Step number={4} title={t('s1_step4_title')}>
                <p className="mb-3">{t('s1_step4_intro')}</p>
                <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] divide-y divide-[var(--warm-tan)]/40">
                  {formFields.map(({ field, desc }) => (
                    <div key={field} className="flex gap-3 px-4 py-2.5">
                      <span className="w-44 flex-shrink-0 text-xs font-semibold text-[var(--charcoal)]/70">{field}</span>
                      <span className="text-xs text-[var(--charcoal)]/55">{desc}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">{t('s1_step4_note')}</p>
              </Step>
              <Step number={5} title={t('s1_step5_title')}>{t('s1_step5_desc')}</Step>
            </div>

            <TipBox label={t('tip_label')}>{t('s1_tip')}</TipBox>
          </section>

          {/* Section 2 — Tax-on-web */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s2_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s2_p1')}</p>
            <p className="mb-5 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s2_p2')}</p>

            <p className="mb-3 text-sm font-semibold text-[var(--charcoal)]/80">{t('s2_how')}</p>
            <div className="space-y-3">
              {[
                { label: t('s2_item1_label'), desc: t('s2_item1_desc') },
                { label: t('s2_item2_label'), desc: t('s2_item2_desc') },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-3 rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0 font-mono text-xs font-bold text-[var(--forest)]">{label}</span>
                  <p className="text-sm text-[var(--charcoal)]/65">{desc}</p>
                </div>
              ))}
            </div>

            <TipBox label={t('tip_label')}>{t('s2_tip')}</TipBox>
          </section>

          {/* Section 3 — Taxes manuelles */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s3_title')}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s3_intro')}</p>

            <div className="mb-6 overflow-x-auto rounded-xl border border-[var(--warm-tan)]/50">
              <table className="w-full min-w-[400px] bg-[var(--warm-white)] text-sm">
                <thead>
                  <tr className="border-b border-[var(--warm-tan)]/40 bg-[var(--warm-cream)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--charcoal)]/50">{t('s3_col_tax')}</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[var(--charcoal)]/50">DEGIRO</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[var(--charcoal)]/50">Trade Republic</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[var(--charcoal)]/50">IBKR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--warm-tan)]/30">
                  {taxRows.map(({ taxe, degiro, tr, ibkr }) => (
                    <tr key={taxe}>
                      <td className="px-4 py-3 text-sm font-medium text-[var(--charcoal)]">{taxe}</td>
                      {[degiro, tr, ibkr].map((auto, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {auto ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--forest)]">
                              {t('s3_auto')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                              {t('s3_manual')}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mb-5 text-sm font-semibold text-[var(--charcoal)]/80">{t('s3_manual_intro')}</p>

            <div className="space-y-5">
              <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-5">
                <p className="mb-2 font-semibold text-[var(--charcoal)]">
                  {t('s3_tob_title')}{' '}
                  <span className="ml-1 text-xs font-normal text-[var(--charcoal)]/50">{t('s3_tob_subtitle')}</span>
                </p>
                <p className="text-sm leading-relaxed text-[var(--charcoal)]/65">{t('s3_tob_desc')}</p>
              </div>
              <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-5">
                <p className="mb-2 font-semibold text-[var(--charcoal)]">{t('s3_precompte_title')}</p>
                <p className="text-sm leading-relaxed text-[var(--charcoal)]/65">{t('s3_precompte_desc')}</p>
              </div>
              <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-5">
                <p className="mb-2 font-semibold text-[var(--charcoal)]">
                  {t('s3_cgt_title')}{' '}
                  <span className="ml-1 text-xs font-normal text-[var(--charcoal)]/50">{t('s3_cgt_subtitle')}</span>
                </p>
                <p className="text-sm leading-relaxed text-[var(--charcoal)]/65">{t('s3_cgt_desc')}</p>
              </div>
            </div>

            <TipBox label={t('tip_label')}>{t('s3_tip')}</TipBox>
          </section>

          {/* Section 4 — Pourquoi */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s4_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s4_p1')}</p>
            <p className="mb-5 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s4_p2')}</p>

            <div className="rounded-xl border border-red-200/60 bg-red-50/60 px-5 py-4">
              <p className="mb-2 text-sm font-semibold text-red-800">{t('s4_warning_title')}</p>
              <ul className="space-y-1.5">
                {[t('s4_bullet1'), t('s4_bullet2')].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-red-700/80">
                    <span className="mt-1 flex-shrink-0 text-xs">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="mb-10 rounded-xl bg-[var(--warm-tan)]/20 px-4 py-3 text-xs leading-relaxed text-[var(--charcoal)]/50">
            {t('disclaimer')}
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/brokers"
              className="rounded-full bg-[var(--forest)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t('cta_brokers')}
            </Link>
            <Link
              href="/ressources"
              className="text-sm text-[var(--charcoal)]/50 transition-colors hover:text-[var(--charcoal)]"
            >
              {t('cta_back')}
            </Link>
          </div>

          <LastUpdated isoDate="2026-03-01" />

        </div>
      </main>
    </>
  );
}
