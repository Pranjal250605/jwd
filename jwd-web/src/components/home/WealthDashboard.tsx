'use client';

import { useLocale } from 'next-intl';
import { Wallet, Building2, LineChart as LineIcon, Coins } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import { DonutChart, LineChart, BarChart } from '@/components/sub/Charts';
import {
  NET_WORTH, TREND, ALLOC, CCY, TARGET, RE_KPI, PROPS, EQ_KPI, HOLDINGS,
} from '@/data/wealth';

const ACCENT = '#0097a7';
const UP = '#3f8f6f';
const DOWN = '#c0566b';
type Lang = 'ja' | 'en';

const oku = (m: number) => `¥${(m / 100).toFixed(2)}億`; // from 百万円

function Panel({ title, sub, children, span }: { title?: string; sub?: string; children: React.ReactNode; span?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-sumi/8 bg-washi p-7 ${span ?? ''}`}>
      {title && (
        <div className="mb-6 flex items-baseline justify-between gap-3">
          <h3 className="font-en text-lg font-medium tracking-wide text-sumi">{title}</h3>
          {sub && <span className="text-[13px] tracking-wide text-sumi-soft">{sub}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export function WealthDashboard() {
  const locale = useLocale() as Lang;
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';
  const tl = (en: string, jp: string) => (ja ? jp : en);

  const allocItems = ALLOC.map((a) => ({ label: ja ? a.ja : a.en, value: a.v }));
  const ccyItems = CCY.map((c) => ({ label: ja ? c.ja : c.en, value: c.v }));
  const trendPoints = TREND.values.map((v, i) => ({ label: i % 2 === 0 ? TREND.months[i] : '', value: v }));
  const topHoldings = [...HOLDINGS].sort((a, b) => b.v - a.v).slice(0, 7).map((h) => ({
    label: ja ? h.nmJa : h.nmEn,
    value: h.v,
    highlight: h.tk === 'ETF',
  }));

  return (
    <section className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <PremiumBackdrop />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        {/* header */}
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.38em] text-gold">
              {tl('Family Office · Wealth Suite', 'ファミリーオフィス・ウェルススイート')}
            </span>
            <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
              {tl('One integrated view of the whole family balance sheet', '一族のすべての資産を、ひとつの統合ビューで')}
            </h2>
            <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          </div>
          <div className="flex items-center gap-3 rounded-full border border-sumi/10 bg-washi px-4 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-washi" style={{ background: `linear-gradient(135deg, #5d6f8a, ${ACCENT})` }}>藤</span>
            <div className="flex flex-col">
              <span className="font-en text-sm text-sumi">{tl('Todō Family', '藤堂家')}</span>
              <span className="text-[12px] tracking-wide text-sumi-soft">{tl('Consolidated · JPY base', '統合口座 ・ JPY 基準')}</span>
            </div>
          </div>
        </Reveal>

        {/* ── net worth hero ── */}
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-sumi/8 bg-sumi/[0.06] lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-3 bg-washi p-8">
              <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-gold">
                <Wallet className="h-3.5 w-3.5" strokeWidth={1.6} /> {tl('Net Worth', '総資産')}
              </span>
              <div className="font-en text-5xl font-light leading-none text-sumi lg:text-6xl">
                <span className="text-3xl text-gold align-top">¥</span>48.0<span className="text-2xl text-sumi-soft">億</span>
              </div>
              <span className="text-[14px] text-sumi-soft">{tl('¥4,800,000,000 · 5 accounts / 3 currencies', '¥4,800,000,000 ・ 5口座 / 3通貨 を統合')}</span>
            </div>
            <Kpi label={tl('MoM', '前月比')} value={`+${NET_WORTH.momPct}%`} sub={`▲ ¥${(NET_WORTH.momYen / 1e6).toFixed(0)}M`} tone={UP} />
            <Kpi label={tl('YTD return', '年初来リターン')} value={`+${NET_WORTH.ytdPct}%`} sub={tl(`Benchmark +${NET_WORTH.benchPct}%`, `ベンチマーク +${NET_WORTH.benchPct}%`)} />
            <Kpi label={tl('Liquid assets', '流動資産')} value={`¥${NET_WORTH.liquidOku}億`} sub={tl(`${NET_WORTH.liquidPct}% of total`, `全体の ${NET_WORTH.liquidPct}%`)} />
          </div>
        </Reveal>

        {/* ── trend + allocation donut ── */}
        <Reveal className="mt-5">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <Panel title={tl('Net-worth trend', '純資産推移')} sub={tl('Last 12 months · ¥億', '直近12ヶ月 ・ 億円')}>
              <LineChart points={trendPoints} accent={ACCENT} />
            </Panel>
            <Panel title={tl('Asset allocation', '資産配分')} sub={tl('By class', 'アセットクラス別')}>
              <DonutChart items={allocItems} accent={ACCENT} />
            </Panel>
          </div>
        </Reveal>

        {/* ── allocation breakdown + currency + target ── */}
        <Reveal className="mt-5">
          <div className="grid gap-5 lg:grid-cols-3">
            <Panel title={tl('Class breakdown', 'クラス別 内訳')} span="lg:col-span-1">
              <div className="flex flex-col">
                {ALLOC.map((a, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-sumi/8 py-3 last:border-0">
                    <span className="text-[15px] text-sumi-soft">{ja ? a.ja : a.en}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-en text-[15px] text-sumi-soft/70">{a.pct.toFixed(1)}%</span>
                      <span className="font-en text-sm text-sumi">{oku(a.v)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title={tl('Currency mix', '通貨配分')}>
              <DonutChart items={ccyItems} accent="#5d6f8a" />
            </Panel>
            <Panel title={tl('Target vs current', '目標 vs 現状')} sub={tl('Strategic weights', '戦略配分')}>
              <div className="flex flex-col gap-4">
                {TARGET.map((t, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-sumi">{ja ? t.ja : t.en}</span>
                      <span className="font-en text-sumi-soft">{tl(`now ${t.cur}% / target ${t.tgt}%`, `現状 ${t.cur}% / 目標 ${t.tgt}%`)}</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-sumi/10">
                      <div className="h-full rounded-full" style={{ width: `${t.cur * 2}%`, background: `linear-gradient(90deg, #5d6f8a, ${ACCENT})` }} />
                      <span className="absolute top-[-2px] h-3 w-[2px] bg-sumi/60" style={{ left: `${t.tgt * 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </Reveal>

        {/* ── real estate ── */}
        <Reveal className="mt-14">
          <h3 className={`${display} mb-6 flex items-center gap-2.5 text-2xl font-semibold text-sumi`}>
            <Building2 className="h-5 w-5 text-gold" strokeWidth={1.6} /> {tl('Real estate portfolio', '不動産ポートフォリオ')}
          </h3>
          <div className="grid gap-5 lg:grid-cols-3">
            <Panel><Kpi inline label={tl('RE market value', '不動産 時価総額')} value={`¥${RE_KPI.valueOku}億`} sub={tl(`Unrealised +¥${RE_KPI.unrealOku}億`, `含み益 +¥${RE_KPI.unrealOku}億`)} tone={UP} /></Panel>
            <Panel><Kpi inline label={tl('Properties', '物件数')} value={tl(`${RE_KPI.count}`, `${RE_KPI.count} 件`)} sub={tl(`${RE_KPI.dom} domestic · ${RE_KPI.intl} overseas`, `国内${RE_KPI.dom} ・ 海外${RE_KPI.intl}`)} /></Panel>
            <Panel><Kpi inline label={tl('Avg. gross yield', '平均利回り（表面）')} value={`${RE_KPI.yld}%`} sub={tl(`Annual rent ¥${RE_KPI.rentM}M`, `年間賃料 ¥${RE_KPI.rentM}M`)} /></Panel>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROPS.map((p, i) => {
              const gain = p.cur - p.acq;
              const up = gain >= 0;
              return (
                <div key={i} className="rounded-[1.5rem] border border-sumi/8 bg-washi p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_50px_-30px_rgba(32,37,31,0.4)]">
                  <span className="text-[12px] uppercase tracking-[0.18em] text-gold">{ja ? p.locJa : p.locEn}</span>
                  <h4 className={`${display} mt-1.5 text-xl font-semibold text-sumi`}>{ja ? p.nmJa : p.nmEn}</h4>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="inline-block rounded-full border border-sumi/12 px-3 py-1 text-[12px] tracking-wide text-sumi-soft">{ja ? p.tagJa : p.tagEn}</span>
                    <span className="font-en text-xl font-light text-sumi">{oku(p.cur)}</span>
                  </div>
                  <div className="mt-4 flex justify-between gap-3 border-t border-sumi/8 pt-4 text-[13px] text-sumi-soft">
                    <span className="flex flex-col gap-0.5">{tl('Acquired', '取得価額')}<b className="font-en text-[15px] font-medium text-sumi">{oku(p.acq)}</b></span>
                    <span className="flex flex-col gap-0.5">{tl('Unrealised', '含み損益')}<b className="font-en text-[15px] font-medium" style={{ color: up ? UP : DOWN }}>{up ? '+' : ''}{oku(gain)}</b></span>
                    <span className="flex flex-col gap-0.5">{tl('Yield', '表面利回り')}<b className="font-en text-[15px] font-medium text-sumi">{p.yld}</b></span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ── equities ── */}
        <Reveal className="mt-14">
          <h3 className={`${display} mb-6 flex items-center gap-2.5 text-2xl font-semibold text-sumi`}>
            <LineIcon className="h-5 w-5 text-gold" strokeWidth={1.6} /> {tl('Equities & securities', '株式・有価証券')}
          </h3>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Panel title={tl('Holdings', '保有銘柄')} sub={tl(`¥${EQ_KPI.valueOku}億 · +${EQ_KPI.dayPct}% today`, `時価 ¥${EQ_KPI.valueOku}億 ・ 当日 +${EQ_KPI.dayPct}%`)}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-[12px] uppercase tracking-[0.12em] text-sumi-soft/70">
                      <th className="pb-3 text-left font-medium">{tl('Holding', '銘柄')}</th>
                      <th className="pb-3 text-right font-medium">{tl('Qty', '数量')}</th>
                      <th className="pb-3 text-right font-medium">{tl('Value', '時価')}</th>
                      <th className="pb-3 text-right font-medium">{tl('Day', '当日')}</th>
                      <th className="pb-3 text-right font-medium">{tl('Wt.', '構成比')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOLDINGS.map((h, i) => (
                      <tr key={i} className="border-t border-sumi/8 text-[15px]">
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-sumi/10 bg-gold/[0.06] font-en text-[15px] text-gold">{h.tk.length > 3 ? '∎' : h.tk[0]}</span>
                            <span className="flex flex-col">
                              <span className="text-sumi">{ja ? h.nmJa : h.nmEn}</span>
                              <span className="text-[12px] tracking-wide text-sumi-soft">{h.tk} · {ja ? h.subJa : h.subEn}</span>
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 text-right font-en text-sumi-soft">{h.q}</td>
                        <td className="py-3.5 text-right font-en text-sumi">¥{h.v}M</td>
                        <td className="py-3.5 text-right font-en" style={{ color: h.d >= 0 ? UP : DOWN }}>{h.d >= 0 ? '+' : ''}{h.d}%</td>
                        <td className="py-3.5 text-right font-en text-gold">{h.w}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
            <Panel title={tl('Top holdings', '主要保有 上位')} sub={tl('Value · ¥M', '評価額 / 百万円')}>
              <div className="pt-2">
                <BarChart items={topHoldings} unit="M" accent={ACCENT} />
              </div>
            </Panel>
          </div>
        </Reveal>

        {/* link to per-property tools */}
        <Reveal className="mt-14">
          <div className="flex flex-wrap items-center gap-2.5 rounded-[1.5rem] border border-sumi/8 bg-washi px-7 py-6">
            <Coins className="h-5 w-5 text-gold" strokeWidth={1.6} />
            <span className="text-sm text-sumi-soft">
              {tl('The interactive growth simulator and Japan↔Dubai tax comparison live on each ', '運用シミュレーションと日本↔ドバイの税制比較は、各')}
              <Link href="/dubai-properties" className="font-medium text-gold underline-offset-2 hover:underline">
                {tl('Dubai property page', 'ドバイ物件ページ')}
              </Link>
              {tl('.', 'に掲載しています。')}
            </span>
          </div>
        </Reveal>

        <p className="mt-8 text-base font-light leading-relaxed text-sumi-soft/60">
          {tl(
            '※ Illustrative sample portfolio for demonstration. Figures are not advice; consult a licensed professional.',
            '※ 本ポートフォリオはデモ用のサンプルです。数値は投資助言ではありません。有資格の専門家にご相談ください。',
          )}
        </p>
      </div>
    </section>
  );
}

function Kpi({ label, value, sub, tone, inline }: { label: string; value: string; sub?: string; tone?: string; inline?: boolean }) {
  return (
    <div className={`flex flex-col gap-2.5 ${inline ? '' : 'bg-washi p-8'}`}>
      <span className="text-[12px] uppercase tracking-[0.16em] text-sumi-soft">{label}</span>
      <span className="font-en text-3xl font-light leading-none" style={{ color: tone ?? '#1b1f26' }}>{value}</span>
      {sub && <span className="text-[14px]" style={{ color: tone ?? '#7b8492' }}>{sub}</span>}
    </div>
  );
}
