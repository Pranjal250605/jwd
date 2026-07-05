'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';

const ITEMS = [1, 2, 3] as const;

export function KnowledgeSection() {
  const t = useTranslations('knowledge');

  return (
    <section id="knowledge" className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-5">
            <span className="text-[12px] uppercase tracking-[0.38em] text-gold">
              {t('label')}
            </span>
            <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
              {t('title')}
            </h2>
          </div>
          <a
            href="#knowledge"
            className="hidden whitespace-nowrap border-b border-gold/40 pb-1 text-[13px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-sumi sm:block"
          >
            {t('viewAll')}
          </a>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-sumi/8 bg-sumi/8 lg:grid-cols-3">
          {ITEMS.map((n, i) => (
            <Reveal key={n} delay={0.1 + i * 0.1}>
              <article className="group flex h-full flex-col gap-5 bg-washi p-8 transition-colors duration-500 hover:bg-washi-deep">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[12px] text-sumi/40">
                    {t(`date${n}`)}
                  </span>
                  <span className="border border-gold/30 px-2.5 py-1 text-[11px] tracking-[0.2em] text-gold">
                    {t(`tag${n}`)}
                  </span>
                </div>
                <p className="text-lg font-light leading-[2] text-sumi-soft">
                  {t(`text${n}`)}
                </p>
                <span className="mt-auto block h-px w-6 bg-gold/30 transition-all duration-700 group-hover:w-full group-hover:bg-gold/60" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
