'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';

const FUNDS = [
  { key: 'equity', url: 'https://www.equiti.com/sc-en/' },
  { key: 'aix', url: 'https://www.aixinvestment.com/' },
] as const;

export function FundsSection() {
  const t = useTranslations('funds');
  const ja = useLocale() === 'ja';

  return (
    <section id="funds" className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {t('intro')}
          </p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-2">
          {FUNDS.map(({ key, url }, i) => (
            <Reveal key={key} delay={0.12 + i * 0.12}>
              <a
                href={jaOutbound(url, ja)}
                target="_blank"
                rel="noopener noreferrer"
                title={ja ? JA_PROXY_NOTICE : undefined}
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-washi to-[#f8f5f0] p-9 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle at 100% 100%, rgba(154,123,45,0.06), transparent 70%)' }}
                />
                <h3 className="font-en text-2xl font-semibold tracking-wide text-sumi">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-sm font-light leading-loose text-sumi-soft">
                  {t(`${key}Desc`)}
                </p>
                <span className="mt-auto inline-block w-fit border-b border-gold/40 pb-1 text-[11px] uppercase tracking-[0.2em] text-gold transition-colors group-hover:border-gold group-hover:text-sumi">
                  {t('visit')}
                  {ja && <span className="ml-2 normal-case tracking-normal text-sumi-soft">（日本語訳で開く）</span>}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {ja && (
          <p className="mt-5 text-[10px] leading-relaxed tracking-[0.05em] text-sumi/30">
            ※ {JA_PROXY_NOTICE}
          </p>
        )}

        <div className="mt-7 grid gap-7 lg:grid-cols-2">
          {(['governance', 'risk'] as const).map((key, i) => (
            <Reveal key={key} delay={0.3 + i * 0.1}>
              <div className="flex items-start gap-5 border-t border-gold/20 pt-6">
                <span className="font-mono text-[10px] text-gold/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-jp text-sm font-bold text-sumi">{t(key)}</h4>
                  <p className="mt-2 text-xs font-light leading-relaxed text-sumi-soft">
                    {t(`${key}Text`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
