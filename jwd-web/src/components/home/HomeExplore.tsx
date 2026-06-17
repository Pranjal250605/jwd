'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { Tabs } from '@/components/sub/Interactive';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';

const ACCENT = '#9a7b2d';
type L = { ja: string; en: string };

const ITEMS: {
  tab: L; title: L; text: L; bullets: L[]; metric: { value: string; label: L };
}[] = [
  {
    tab: { ja: 'ドバイ不動産', en: 'Dubai Real Estate' },
    title: { ja: 'ドバイ不動産 — 投資価値で選び抜く', en: 'Dubai Real Estate — chosen for merit' },
    metric: { value: '6–8%', label: { ja: '想定グロス利回り', en: 'Target gross yield' } },
    text: {
      ja: '数千件の在庫ではなく、立地・利回り・開発主体・出口まで精査した数件を。取得から賃貸運用まで一貫して伴走します。',
      en: 'Not thousands of listings — the handful we have scrutinised on location, yield, developer and exit. We walk with you from acquisition through rental management.',
    },
    bullets: [
      { ja: 'キュレーションされた物件', en: 'Curated, not listed' },
      { ja: '取得後の運用まで伴走', en: 'Alongside you through operation' },
      { ja: 'Bayut / Property Finder 連携', en: 'Linked to Bayut & Property Finder' },
    ],
  },
  {
    tab: { ja: '法人・ビザ', en: 'Company & Visa' },
    title: { ja: '法人・ビザ設計 — 居る権利を整える', en: 'Company & Visa — your right to remain' },
    metric: { value: '0%', label: { ja: '個人所得税', en: 'Personal income tax' } },
    text: {
      ja: 'フリーゾーン法人設立、ゴールデンビザ、エミレーツID、銀行口座まで。ドバイに拠点を持つための手続きをワンストップで。',
      en: 'Free-zone formation, the Golden Visa, Emirates ID and bank accounts — every procedure for a Dubai base, handled as one.',
    },
    bullets: [
      { ja: 'フリーゾーン法人設立', en: 'Free-zone company formation' },
      { ja: 'ゴールデンビザ取得', en: 'Golden Visa attainment' },
      { ja: 'エミレーツID・銀行口座', en: 'Emirates ID & banking' },
    ],
  },
  {
    tab: { ja: 'ファミリーオフィス', en: 'Family Office' },
    title: { ja: 'ファミリーオフィス — 世代を越えて', en: 'Family Office — beyond generations' },
    metric: { value: '2', label: { ja: '国を跨ぐ設計', en: 'Countries bridged' } },
    text: {
      ja: '資産保全、事業承継、相続、タックスプランニングを、日本とドバイ双方の制度を踏まえて設計します。',
      en: 'Asset protection, succession, inheritance and tax planning — designed across both Japanese and Emirati systems.',
    },
    bullets: [
      { ja: '資産保全と承継設計', en: 'Asset protection & succession' },
      { ja: '多国籍の資産構造', en: 'Multi-country structures' },
      { ja: 'タックスプランニング', en: 'Cross-border tax planning' },
    ],
  },
  {
    tab: { ja: '日本不動産', en: 'Japan Real Estate' },
    title: { ja: '日本不動産 — 円安という追い風', en: 'Japan Real Estate — the weak-yen window' },
    metric: { value: '¥', label: { ja: '円安の好機', en: 'Weak-yen advantage' } },
    text: {
      ja: '円安局面を活かした日本不動産、空き家再生、相続対策まで。海外投資家のための機会を提供します。',
      en: 'Japan property, akiya-revival and inheritance planning that leverage the weak-yen window — opportunities for overseas investors.',
    },
    bullets: [
      { ja: '円安局面の優良資産', en: 'Prime assets, weak-yen priced' },
      { ja: '空き家再生の高利回り', en: 'High-yield akiya revival' },
      { ja: '相続・承継への活用', en: 'For succession & inheritance' },
    ],
  },
];

export function HomeExplore() {
  const locale = useLocale();
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';
  const tx = (l: L) => (ja ? l.ja : l.en);

  return (
    <section className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <PremiumBackdrop mask="corner" />
      <div className="relative z-10 mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-12 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {ja ? '事業領域' : 'What we do'}
          </span>
          <h2 className={`${display} max-w-2xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {ja ? '一つの窓口で、すべてを' : 'One desk for everything'}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs
            accent={ACCENT}
            dark={false}
            display={display}
            items={ITEMS.map((it) => ({
              tab: tx(it.tab),
              title: tx(it.title),
              text: tx(it.text),
              bullets: it.bullets.map(tx),
              metric: { value: it.metric.value, label: tx(it.metric.label) },
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
