'use client';

import { useLocale } from 'next-intl';
import { Scale } from 'lucide-react';

const DUBAI = '#9a7b2d';
const JAPAN = '#5d6f8a';
const JP_CGT = 0.20315;
const HOLD = 5;

const aed = (n: number) => `AED ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n))}`;
const oku = (n: number) => `¥${(n / 1e8).toFixed(2)}億`;

export function PropertyTaxComparison({
  priceAed,
  yieldPct,
  appreciation,
  aedJpy,
}: {
  priceAed: number;
  yieldPct: number;
  appreciation: number;
  aedJpy: number;
}) {
  const ja = (useLocale() as string) === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';

  const projectedGainAed = priceAed * (Math.pow(1 + appreciation, HOLD) - 1);
  const jpTaxAed = projectedGainAed * JP_CGT;
  const jpKeepAed = projectedGainAed - jpTaxAed;

  const rows: { k: string; jp: string; ae: string }[] = ja
    ? [
        { k: 'キャピタルゲイン課税', jp: '20.315%', ae: '0%' },
        { k: '賃料収入（所得税・最高）', jp: '最大55%', ae: '0%' },
        { k: '相続税（最高）', jp: '最大55%', ae: '0%' },
        { k: '年間保有課税', jp: '固定資産税 ~1.4%', ae: 'なし' },
      ]
    : [
        { k: 'Capital-gains tax', jp: '20.315%', ae: '0%' },
        { k: 'Rental income (top)', jp: 'up to 55%', ae: '0%' },
        { k: 'Inheritance (top)', jp: 'up to 55%', ae: '0%' },
        { k: 'Annual holding tax', jp: '~1.4% property', ae: 'None' },
      ];

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 lg:px-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-sumi/8 bg-washi p-8 lg:p-12">
        <div className="mb-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: DUBAI }}>
            <Scale className="h-4 w-4" strokeWidth={1.6} /> {ja ? '税制比較' : 'Tax Comparison'}
          </span>
          <h2 className={`${display} text-2xl font-semibold text-sumi lg:text-3xl`}>
            {ja ? '日本で保有した場合との税負担差' : 'The tax difference vs. holding in Japan'}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* rate table */}
          <div className="overflow-hidden rounded-2xl border border-sumi/8">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-sumi/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-sumi-soft">
              <span>{ja ? '項目' : 'Item'}</span>
              <span className="text-right">{ja ? '日本' : 'Japan'}</span>
              <span className="text-right">{ja ? 'ドバイ' : 'Dubai'}</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-sumi/8 px-5 py-4 text-sm">
                <span className="text-sumi-soft">{r.k}</span>
                <span className="text-right font-en font-medium" style={{ color: JAPAN }}>{r.jp}</span>
                <span className="text-right font-en font-semibold" style={{ color: DUBAI }}>{r.ae}</span>
              </div>
            ))}
          </div>

          {/* take-home on projected gain */}
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-sumi/8 bg-washi-deep/40 p-6">
            <span className="text-[11px] uppercase tracking-[0.16em] text-sumi-soft">
              {ja ? `${HOLD}年の想定値上がり益 ${aed(projectedGainAed)} の場合` : `On the ${HOLD}-yr projected gain of ${aed(projectedGainAed)}`}
            </span>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-sumi-soft">{ja ? '日本（譲渡益課税）' : 'Japan (gains tax)'}</span>
                <span className="font-en font-medium text-sumi">{aed(jpKeepAed)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sumi/10">
                <div className="h-full rounded-full" style={{ width: `${(1 - JP_CGT) * 100}%`, background: JAPAN }} />
              </div>
              <p className="mt-1.5 text-[11px] text-sumi-soft/70">{ja ? `課税 −${aed(jpTaxAed)}` : `Tax −${aed(jpTaxAed)}`}</p>
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-sumi-soft">{ja ? 'ドバイ（0%）' : 'Dubai (0%)'}</span>
                <span className="font-en font-semibold" style={{ color: DUBAI }}>{aed(projectedGainAed)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sumi/10">
                <div className="h-full rounded-full" style={{ width: '100%', background: `linear-gradient(90deg, ${DUBAI}, #c9a85c)` }} />
              </div>
              <p className="mt-1.5 text-[11px]" style={{ color: DUBAI }}>
                {ja ? `差 +${aed(jpTaxAed)} ( ${oku(jpTaxAed * aedJpy)} ) 手元に残る` : `+${aed(jpTaxAed)} ( ${oku(jpTaxAed * aedJpy)} ) more kept`}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[11px] font-light leading-relaxed text-sumi-soft/70">
          {ja
            ? '※ ドバイの0%税制は「UAEの税務上の居住者であること」が前提です。日本には国外転出時課税制度（出国税）があり、対象資産1億円以上の方の出国時には未実現益に課税されます。本表は概要であり税務助言ではありません。国際税務の専門家にご相談ください。'
            : '※ Dubai’s 0% regime assumes UAE tax residency. Japan levies an exit tax on unrealised gains for residents leaving with ¥100M+ of eligible assets. This is a summary, not tax advice — consult a cross-border tax professional.'}
        </p>
      </div>
    </section>
  );
}
