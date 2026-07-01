'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { ChatPanel } from '@/components/advisor/ChatPanel';
import { AiSpark } from '@/components/advisor/AiSpark';

export function AdvisorPageContent() {
  const t = useTranslations('advisor');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-washi-deep py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Chat panel — main area */}
          <Reveal>
            <div className="h-[70vh] min-h-[500px] overflow-hidden rounded-2xl border border-sumi/8 bg-washi shadow-lg shadow-sumi/5">
              <ChatPanel fullPage className="h-full" />
            </div>
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-8">
              {/* About this advisor */}
              <div className="rounded-xl border border-sumi/8 bg-washi p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sumi">
                  <AiSpark className="h-7 w-7" />
                </div>
                <h3 className="font-jp text-base font-bold text-sumi mb-2">
                  {t('title')}
                </h3>
                <p className="text-sm text-sumi-soft/80 leading-relaxed mb-4">
                  {t('intro')}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-sumi-soft/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Powered by Google Gemini</span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('advisor-new-chat'))}
                  className="mt-4 w-full rounded-lg border border-sumi/10 px-4 py-2 text-xs text-sumi-soft transition-colors duration-300 hover:border-gold/40 hover:text-sumi"
                >
                  {locale === 'ja' ? '新しいチャットを開始' : 'Start a new chat'}
                </button>
              </div>

              {/* Quick links */}
              <div className="rounded-xl border border-sumi/8 bg-washi p-6">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                  {locale === 'ja' ? '関連ページ' : 'Related Pages'}
                </h4>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      href: '/simulator' as const,
                      label: locale === 'ja' ? '投資シミュレーター' : 'Investment Simulator',
                    },
                    {
                      href: '/dubai-properties' as const,
                      label: locale === 'ja' ? 'ドバイ物件' : 'Dubai Properties',
                    },
                    {
                      href: '/heart-of-europe' as const,
                      label: locale === 'ja' ? 'ハート・オブ・ヨーロッパ' : 'Heart of Europe',
                    },
                    {
                      href: '/why-dubai' as const,
                      label: locale === 'ja' ? 'なぜドバイか' : 'Why Dubai',
                    },
                    {
                      href: '/contact' as const,
                      label: locale === 'ja' ? 'お問い合わせ' : 'Contact',
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-lg border border-sumi/5 px-4 py-2.5 text-sm text-sumi-soft transition-all duration-300 hover:border-gold/30 hover:text-sumi"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] text-sumi/20 transition-colors group-hover:text-gold">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] leading-relaxed text-sumi/30 px-1">
                {t('disclaimer')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
