'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';

const ACCENT = '#0097a7';
type Lang = 'ja' | 'en';

/**
 * The plan's three Dubai-focused inheritance-planning strategies (slide 7).
 * Legally compliant optimisation grounded in specific articles of Japan's tax code.
 */
export function TaxStrategies() {
  const ja = useLocale() === ('ja' as Lang);
  const display = ja ? 'font-jp' : 'font-sans';
  const tl = (en: string, jp: string) => (ja ? jp : en);

  const strategies = [
    {
      no: '01',
      en: 'Asset Valuation Optimization', ja: '資産評価の最適化',
      lawEn: 'Art. 22, Inheritance Tax Act', lawJa: '相続税法 第22条',
      dEn: 'Dubai holding structures use valuation differentials so private-company shares can often be valued below market.',
      dJa: 'ドバイの持株ストラクチャーと評価差を活用。非上場株式を市場価格より低く評価できる場合があります。',
      resultEn: 'Up to 60% reduction in taxable estate valuation',
      resultJa: '課税対象評価額を最大60%圧縮',
    },
    {
      no: '02',
      en: 'CFC Optimization via Genuine Substance', ja: '実体を伴うCFC最適化',
      lawEn: 'Special Taxation Measures Act, Art. 40-4', lawJa: '租税特別措置法 第40条の4',
      dEn: 'Establishing real business operations in Dubai — genuine activity, physical office, local management — to satisfy substance requirements.',
      dJa: 'ドバイに実体ある事業を設立。実際の事業活動・物理的オフィス・現地管理により実体基準を充足します。',
      resultEn: 'Legally defer Japanese taxation on overseas business profits',
      resultJa: '海外事業利益への日本課税を合法的に繰り延べ',
    },
    {
      no: '03',
      en: 'Next-Generation 10-Year Rule', ja: '次世代・10年ルール',
      lawEn: 'Art. 1-3, Inheritance Tax Act', lawJa: '相続税法 第1条の3',
      dEn: 'When both heirs and assets are non-resident for more than ten years, inheritance tax on overseas assets can effectively be eliminated.',
      dJa: '相続人と資産の双方が10年超の非居住者となる場合、海外資産への相続税を実質的にゼロにできます。',
      resultEn: 'Inheritance tax on overseas assets effectively → 0 after 10 years',
      resultJa: '10年経過後、海外資産の相続税は実質ゼロに',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-washi-deep py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.34em] text-gold">
            {tl('Three Strategic Inheritance Solutions', '3つの相続プランニング戦略')}
          </span>
          <h2 className={`${display} max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tl('Legally compliant tax optimization, built on UAE regulations', 'UAE規制に基づく、合法的な税務最適化')}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-2xl text-xl font-light leading-loose text-sumi-soft">
            {tl(
              'Three strategies, designed and executed as one integrated Family Office solution through the JWD Investment ecosystem.',
              'JWDインベストメントのエコシステムを通じ、ひとつの統合されたファミリーオフィス・ソリューションとして設計・実行する3つの戦略です。',
            )}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {strategies.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-5 rounded-[1.5rem] border border-sumi/8 bg-washi p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-en text-5xl font-light text-gold">{s.no}</span>
                  <span className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 font-mono text-[13px] tracking-wide text-gold">
                    {ja ? s.lawJa : s.lawEn}
                  </span>
                </div>
                <h3 className={`${display} text-xl font-semibold leading-snug text-sumi`}>{ja ? s.ja : s.en}</h3>
                <p className="text-lg font-light leading-relaxed text-sumi-soft">{ja ? s.dJa : s.dEn}</p>
                <div className="mt-auto flex items-start gap-2.5 border-t border-sumi/8 pt-5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span className="text-lg font-medium leading-snug text-sumi">{ja ? s.resultJa : s.resultEn}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-sm font-light leading-relaxed text-sumi-soft/70">
            {tl(
              '※ Strategies are illustrative and depend on individual circumstances, residency substance and prevailing law. This is not tax advice — always consult a licensed international tax professional.',
              '※ 戦略は一例であり、個別の状況・居住実態・現行法により結果は異なります。本内容は税務助言ではありません。国際税務に精通した有資格の専門家に必ずご相談ください。',
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
