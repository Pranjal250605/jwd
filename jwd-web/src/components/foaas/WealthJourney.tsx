'use client';

import { useLocale } from 'next-intl';
import { BookOpen, MessageSquare, Globe, LineChart, Plane } from 'lucide-react';
import { Reveal } from '@/components/kintsugi/Reveal';

const ACCENT = '#00c4cc';
type Lang = 'ja' | 'en';

/**
 * The plan's five-stage client journey (slide 12):
 * Education → Consultation → Experience → Investment → Relocation.
 */
export function WealthJourney() {
  const ja = useLocale() === ('ja' as Lang);
  const display = ja ? 'font-jp' : 'font-sans';
  const tl = (en: string, jp: string) => (ja ? jp : en);

  const steps = [
    { icon: BookOpen, en: 'Education', ja: '学ぶ', dEn: 'Market insights, tax education and case studies.', dJa: '市場の知見、税務の学び、事例のご共有。' },
    { icon: MessageSquare, en: 'Consultation', ja: '相談', dEn: 'Understand your needs and design the optimal structure.', dJa: 'ご要望を理解し、最適なストラクチャーを設計。' },
    { icon: Globe, en: 'Experience', ja: '体験', dEn: 'Visit Dubai and experience our ecosystem first-hand.', dJa: 'ドバイを訪れ、私たちのエコシステムを体感。' },
    { icon: LineChart, en: 'Investment', ja: '投資', dEn: 'Implement investment strategy and wealth planning.', dJa: '投資戦略と資産設計を実行。' },
    { icon: Plane, en: 'Relocation', ja: '移住', dEn: 'Support global relocation and long-term residency.', dJa: 'グローバル移住と長期居住をサポート。' },
  ];

  return (
    <section className="relative overflow-hidden bg-night py-24 lg:py-32">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(0,196,204,0.5) 50%, transparent 90%)' }}
      />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-sm uppercase tracking-[0.34em] text-gold-bright/80">
            {tl('The Client Journey', 'クライアント・ジャーニー')}
          </span>
          <h2 className={`${display} max-w-3xl text-3xl font-extrabold leading-tight text-washi lg:text-[2.6rem]`}>
            {tl('Five stages to global wealth management', '5つのステップで、グローバルな資産管理へ')}
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px lg:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,204,0.35) 12%, rgba(0,196,204,0.35) 88%, transparent)' }} />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                  <div className="relative">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-bright/30 bg-night text-gold-bright" style={{ boxShadow: `0 0 30px -8px ${ACCENT}` }}>
                      <s.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-bright font-mono text-[13px] font-semibold text-night">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className={`${display} text-xl font-semibold text-washi`}>{ja ? s.ja : s.en}</h3>
                  <p className="text-lg font-light leading-relaxed text-washi/70">{ja ? s.dJa : s.dEn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
