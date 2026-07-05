'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';

const FX_FALLBACK = 41.2; // AED→JPY fallback, mirrors DataStrip

function Field({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="flex items-baseline justify-between">
        <span className="text-[12px] uppercase tracking-[0.25em] text-sumi-soft">
          {label}
        </span>
        <span className="font-mono text-sm text-sumi">
          {value.toLocaleString('en-US')}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-px w-full cursor-pointer appearance-none bg-sumi/15 accent-[#0097a7]"
      />
    </label>
  );
}

function Output({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-gold/20 pt-4">
      <span className="text-[11px] uppercase tracking-[0.25em] text-sumi-soft/80">
        {label}
      </span>
      <span className={`font-mono text-xl ${accent ? 'text-gold' : 'text-sumi'}`}>
        {value}
      </span>
    </div>
  );
}

export function SimulatorSection() {
  const t = useTranslations('simulator');
  const [price, setPrice] = useState(1_800_000);
  const [rent, setRent] = useState(11_000);
  const [expenses, setExpenses] = useState(15_000);
  const [fx, setFx] = useState(FX_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetch('https://open.er-api.com/v6/latest/AED')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.rates?.JPY === 'number') setFx(d.rates.JPY);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const annualRent = rent * 12;
  const gross = (annualRent / price) * 100;
  const net = ((annualRent - expenses) / price) * 100;
  const jpy = (n: number) =>
    `¥${Math.round(n * fx).toLocaleString('en-US')}`;

  return (
    <section id="simulator" className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5">
          <span className="text-[12px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="max-w-xl text-xl font-light leading-loose text-sumi-soft">
            {t('intro')}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid gap-12 border border-sumi/8 bg-washi p-9 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:p-14">
            {/* Inputs */}
            <div className="flex flex-col gap-9">
              <Field label={t('price')} value={price} min={400_000} max={20_000_000} step={50_000} onChange={setPrice} />
              <Field label={t('rent')} value={rent} min={2_000} max={100_000} step={500} onChange={setRent} />
              <Field label={t('expenses')} value={expenses} min={0} max={200_000} step={1_000} onChange={setExpenses} />
            </div>

            {/* Outputs */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <Output label={t('grossYield')} value={`${gross.toFixed(2)}%`} accent />
              <Output label={t('netYield')} value={`${net.toFixed(2)}%`} accent />
              <Output label={t('jpyPrice')} value={jpy(price)} />
              <Output label={t('jpyRent')} value={jpy(rent)} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-6">
          <p className="text-[12px] tracking-[0.1em] text-sumi/35">{t('disclaimer')}</p>
        </Reveal>
      </div>
    </section>
  );
}
