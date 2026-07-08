'use client';

import { useLocale } from 'next-intl';
import {
  Globe2, ShieldCheck, Scale, Plane, Users, Sparkles, Building2, Landmark,
} from 'lucide-react';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';

const ACCENT = '#0097a7';
type Lang = 'ja' | 'en';

/**
 * FOaaS — Family Office as a Service. The plan's core positioning (slide 11):
 * an integrated one-stop platform, plus the two audiences it serves
 * (affluent families + SME business owners — the "hidden affluent" blue ocean).
 */
export function FoaasSuite() {
  const ja = useLocale() === ('ja' as Lang);
  const display = ja ? 'font-jp' : 'font-sans';
  const tl = (en: string, jp: string) => (ja ? jp : en);

  const audiences = [
    {
      icon: Users,
      en: 'Affluent families', ja: '富裕層ファミリー',
      dEn: 'Japan’s aging affluent facing the ¥1,400T generational transfer — and up to 55% inheritance tax.',
      dJa: '¥1,400兆円の世代間移転期を迎える富裕層。最高55%の相続税に直面する世代です。',
    },
    {
      icon: Building2,
      en: 'SME business owners', ja: '中小企業オーナー',
      dEn: 'A ¥9T blue ocean of corporate surplus capital — deployable even when personal assets sit below ¥100M.',
      dJa: '約9兆円の法人余剰資本というブルーオーシャン。個人資産が1億円未満でも活用できます。',
    },
  ];

  const services = [
    { icon: Globe2, en: 'Global Asset Management', ja: 'グローバル資産運用', dEn: 'Discretionary investment management across global markets.', dJa: 'グローバル市場を横断した一任運用。' },
    { icon: ShieldCheck, en: 'Trust & Estate Planning', ja: '信託・資産承継設計', dEn: 'Trust structures and estate planning for wealth protection.', dJa: '資産保全のための信託ストラクチャーと承継設計。' },
    { icon: Scale, en: 'Tax & Legal Advisory', ja: '税務・法務アドバイザリー', dEn: 'International tax planning and legal structuring.', dJa: '国際税務プランニングと法的ストラクチャリング。' },
    { icon: Plane, en: 'Relocation & Residency', ja: '移住・居住サポート', dEn: 'Residency, visa and relocation support for global mobility.', dJa: 'ビザ・居住権取得と移住支援によるグローバル・モビリティ。' },
    { icon: Landmark, en: 'Family Governance & Succession', ja: 'ファミリーガバナンス・承継', dEn: 'Family constitution, governance framework and succession planning.', dJa: '家憲・ガバナンス体制の構築と承継計画。' },
    { icon: Sparkles, en: 'Lifestyle & Concierge', ja: 'ライフスタイル・コンシェルジュ', dEn: 'Premium lifestyle, concierge and family-office support.', dJa: 'プレミアムなライフスタイルとコンシェルジュ支援。' },
  ];

  return (
    <section className="relative overflow-hidden bg-washi py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.34em] text-gold">
            {tl('Family Office as a Service · FOaaS', 'ファミリーオフィス・アズ・ア・サービス')}
          </span>
          <h2 className={`${display} max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tl('One integrated platform for the whole family balance sheet', '一族のすべてを、ひとつの統合プラットフォームで')}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-2xl text-xl font-light leading-loose text-sumi-soft">
            {tl(
              'A Dubai-based Family Office as a Service — integrating international tax planning, global asset management, relocation and succession into a single, coordinated whole.',
              'ドバイを拠点とするファミリーオフィス・アズ・ア・サービス。国際税務、グローバル資産運用、移住、そして事業承継を、ひとつに統合してご提供します。',
            )}
          </p>
        </Reveal>

        {/* who we serve */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full items-start gap-5 rounded-[1.5rem] border border-sumi/10 bg-washi-deep/60 p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-washi" style={{ background: `linear-gradient(140deg, ${ACCENT}, #00c4cc)` }}>
                  <a.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className={`${display} text-xl font-semibold text-sumi`}>{ja ? a.ja : a.en}</h3>
                  <p className="text-lg font-light leading-relaxed text-sumi-soft">{ja ? a.dJa : a.dEn}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* six services */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group flex h-full flex-col gap-4 rounded-[1.5rem] border border-sumi/8 bg-washi p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(0,196,204,0.4)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-washi" style={{ background: `linear-gradient(140deg, ${ACCENT}, #00c4cc)` }}>
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className={`${display} text-xl font-semibold text-sumi`}>{ja ? s.ja : s.en}</h3>
                <p className="text-lg font-light leading-relaxed text-sumi-soft">{ja ? s.dJa : s.dEn}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
