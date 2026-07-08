'use client';

import { useLocale } from 'next-intl';
import { Building2, Briefcase, GraduationCap, Check } from 'lucide-react';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';

const ACCENT = '#0097a7';
type Lang = 'ja' | 'en';

/**
 * The plan's three worked case studies (slides 8-10). Illustrative scenarios:
 * profile → challenges → three steps → outcome.
 */
export function CaseStudies() {
  const ja = useLocale() === ('ja' as Lang);
  const display = ja ? 'font-jp' : 'font-sans';
  const tl = (en: string, jp: string) => (ja ? jp : en);

  const cases = [
    {
      icon: Building2,
      tagEn: 'Real estate succession', tagJa: '不動産の承継',
      titleEn: '¥1 billion real-estate owner', titleJa: '資産10億円の不動産オーナー',
      profileEn: 'Primarily domestic real estate · three children.',
      profileJa: '資産の大半が国内不動産 ・ 子ども3人。',
      stepsEn: [
        'Reallocate domestic holdings into Dubai real estate (valuation −60%)',
        'Support the eldest son’s relocation to Dubai',
        'Establish a DIFC family office for international succession',
      ],
      stepsJa: [
        '国内不動産をドバイ不動産へ再配分（評価額−60%）',
        '長男のドバイ移住をサポート',
        'DIFCにファミリーオフィスを設立し国際承継へ',
      ],
      outcomeEn: 'Inheritance tax reduced from 55% to effectively zero after ten years',
      outcomeJa: '相続税を55%から10年後に実質ゼロへ',
    },
    {
      icon: Briefcase,
      tagEn: 'Business-owner exit', tagJa: '経営者のExit',
      titleEn: '¥3 billion after an M&A exit', titleJa: 'M&A後 資産30億円',
      profileEn: 'IT founder · assets heavily concentrated in yen.',
      profileJa: 'IT企業創業者 ・ 資産が円に極端に集中。',
      stepsEn: [
        'Establish a Dubai family office with genuine CFC substance',
        'Diversify into global equities, PE, FX and USD assets',
        'Acquire Dubai real estate + apply the 10-year rule',
      ],
      stepsJa: [
        '実体を伴うドバイ・ファミリーオフィスを設立',
        'グローバル株式・PE・為替・USD資産へ分散',
        'ドバイ不動産取得と10年ルールの適用',
      ],
      outcomeEn: 'Full hedge against yen depreciation · 8–12% target annual return',
      outcomeJa: '円安への完全ヘッジ ・ 年率8〜12%を目標',
    },
    {
      icon: GraduationCap,
      tagEn: 'Multi-generational', tagJa: '多世代',
      titleEn: '¥2 billion, three generations', titleJa: '資産20億円・三世代',
      profileEn: 'Family-business owner · three children and three grandchildren.',
      profileJa: '同族企業オーナー ・ 子ども3人と孫3人。',
      stepsEn: [
        'Relocate children and grandchildren to Dubai (IB education)',
        'Acquire Dubai real estate via Golden Visa (7–10% yield)',
        'Establish a multi-generational family office',
      ],
      stepsJa: [
        '子・孫のドバイ移住（国際バカロレア教育）',
        'ゴールデンビザでドバイ不動産取得（利回り7〜10%）',
        '多世代型ファミリーオフィスを設立',
      ],
      outcomeEn: 'Overseas inheritance tax eliminated · wealth diversified from regional risk',
      outcomeJa: '海外資産の相続税を撤廃 ・ 地政学リスクから分散',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-washi py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.34em] text-gold">
            {tl('Case Studies', 'ケーススタディ')}
          </span>
          <h2 className={`${display} max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tl('How families keep what they’ve built', '築いた資産を、どう守り抜くか')}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-5 rounded-[1.5rem] border border-sumi/8 bg-washi-deep/50 p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-washi" style={{ background: `linear-gradient(140deg, ${ACCENT}, #00c4cc)` }}>
                    <c.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 text-sm tracking-wide text-gold">
                    {ja ? c.tagJa : c.tagEn}
                  </span>
                </div>
                <div>
                  <h3 className={`${display} text-xl font-semibold text-sumi`}>{ja ? c.titleJa : c.titleEn}</h3>
                  <p className="mt-1.5 text-lg font-light leading-relaxed text-sumi-soft">{ja ? c.profileJa : c.profileEn}</p>
                </div>
                <ol className="flex flex-col gap-3 border-t border-sumi/8 pt-5">
                  {(ja ? c.stepsJa : c.stepsEn).map((step, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-mono text-[13px] font-semibold text-gold">{j + 1}</span>
                      <span className="text-lg font-light leading-snug text-sumi-soft">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex items-start gap-2.5 rounded-xl bg-gold/[0.07] p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.4} />
                  <span className="text-lg font-medium leading-snug text-sumi">{ja ? c.outcomeJa : c.outcomeEn}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-sm font-light leading-relaxed text-sumi-soft/70">
            {tl(
              '※ Illustrative scenarios for demonstration; outcomes depend on individual circumstances and prevailing law. Not tax advice — consult a licensed professional.',
              '※ 本事例はデモ用のシナリオであり、結果は個別の状況・現行法により異なります。税務助言ではありません。有資格の専門家にご相談ください。',
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
