'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Wallet, Building2, LineChart as LineIcon, Coins, Activity, Signal } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { DonutChart, LineChart, BarChart } from '@/components/sub/Charts';
import {
  NET_WORTH, TREND, ALLOC, CCY, TARGET, RE_KPI, PROPS, EQ_KPI, HOLDINGS,
} from '@/data/wealth';

const ACCENT = '#00c4cc';
const ACCENT_DIM = '#0097a7';
const UP = '#3fd6a0';
const DOWN = '#e6857f';
type Lang = 'ja' | 'en';

const oku = (m: number) => `¥${(m / 100).toFixed(2)}億`; // from 百万円

/* ── terminal console panel with hairline border + corner ticks ── */
function Panel({
  label, sub, children, className = '', icon,
}: {
  label?: string; sub?: string; children: React.ReactNode; className?: string; icon?: React.ReactNode;
}) {
  return (
    <div
      className={`group relative rounded-xl border border-[#00c4cc]/15 bg-[#0a1c24]/70 p-6 backdrop-blur-sm ${className}`}
    >
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-[#00c4cc]/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-[#00c4cc]/40" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[#00c4cc]/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[#00c4cc]/40" />
      {label && (
        <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-[#00c4cc]/10 pb-3">
          <span className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.22em] text-[#7fd8dd]">
            {icon}{label}
          </span>
          {sub && <span className="font-mono text-[15px] tracking-wide text-[#5e7d84]">{sub}</span>}
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

  const modules = [
    tl('OVERVIEW', '概要'),
    tl('ALLOCATION', '資産配分'),
    tl('REAL ESTATE', '不動産'),
    tl('EQUITIES', '株式'),
  ];
  // duplicate the holdings so the ticker scroll loops seamlessly
  const ticker = [...HOLDINGS, ...HOLDINGS];

  return (
    <section className="relative overflow-hidden bg-[#050f15] py-24 lg:py-32">
      {/* HUD backdrop: grid + turquoise glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,196,204,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.06) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(900px 500px at 82% -10%, rgba(0,196,204,0.14), transparent 60%), radial-gradient(700px 480px at -8% 110%, rgba(0,151,167,0.12), transparent 55%)' }}
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-5 lg:px-10">
        {/* section eyebrow */}
        <Reveal className="mb-8">
          <span className="flex items-center gap-2.5 font-mono text-[14px] uppercase tracking-[0.34em] text-[#00c4cc]">
            <Activity className="h-3.5 w-3.5" strokeWidth={1.8} />
            {tl('Family Office · Wealth Terminal', 'ファミリーオフィス・ウェルスターミナル')}
          </span>
          <h2 className={`${display} mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-[#e7f4f5] lg:text-[3rem]`}>
            {tl('The whole family balance sheet, live in one console', '一族のすべての資産を、ひとつのライブ・コンソールで')}
            <span className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.06em] bg-[#00c4cc]" style={{ animation: 'wtBlink 1.1s step-end infinite' }} />
          </h2>
        </Reveal>

        {/* ══ THE CONSOLE ══ */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[#00c4cc]/20 bg-gradient-to-b from-[#08202a] to-[#061620] shadow-[0_40px_120px_-40px_rgba(0,196,204,0.35)]">
            {/* scanline sweep */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16"
              style={{ background: 'linear-gradient(180deg, rgba(0,196,204,0.18), transparent)', animation: 'wtScan 7s linear infinite' }}
            />

            {/* ── HUD top bar ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00c4cc]/15 bg-[#061a22]/80 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-mono text-[15px] font-medium tracking-[0.14em] text-[#cdeef0]">
                  JWD <span className="text-[#00c4cc]">⟩⟩</span> {tl('WEALTH TERMINAL', 'ウェルスターミナル')}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-[#3fd6a0]/40 bg-[#3fd6a0]/10 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fd6a0]" style={{ animation: 'pulseDot 1.6s ease-in-out infinite' }} />
                  <span className="font-mono text-[15px] tracking-[0.2em] text-[#87e6c3]">LIVE</span>
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[15px] tracking-wide text-[#5e7d84]">
                <span className="hidden sm:inline">{tl('BASE', '基準')} <b className="font-medium text-[#9fd8dd]">JPY</b></span>
                <span className="hidden md:inline">{tl('AS OF', '基準日')} <b className="font-medium text-[#9fd8dd]">2026.05.31 15:31 JST</b></span>
                <span className="flex items-center gap-1.5"><Signal className="h-3.5 w-3.5 text-[#3fd6a0]" strokeWidth={2} /><span className="text-[#87e6c3]">SYNCED</span></span>
                <span className="flex items-center gap-2 rounded-md border border-[#00c4cc]/20 bg-[#0a222c] px-2.5 py-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[15px] text-[#04141a]" style={{ background: `linear-gradient(135deg, ${ACCENT_DIM}, ${ACCENT})` }}>藤</span>
                  <span className="text-[#bfe3e6]">{tl('Todō Family', '藤堂家')}</span>
                </span>
              </div>
            </div>

            {/* ── live ticker strip ── */}
            <div className="relative overflow-hidden border-b border-[#00c4cc]/12 bg-[#04141b] py-2">
              <motion.div
                className="flex w-max gap-8 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
              >
                {ticker.map((h, i) => (
                  <span key={i} className="flex items-center gap-2 font-mono text-[14px] tracking-wide">
                    <span className="text-[#6f9299]">{h.tk}</span>
                    <span className="text-[#aecfd3]">¥{h.v}M</span>
                    <span style={{ color: h.d >= 0 ? UP : DOWN }}>{h.d >= 0 ? '▲' : '▼'}{Math.abs(h.d)}%</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── module tabs ── */}
            <div className="flex flex-wrap gap-1 border-b border-[#00c4cc]/12 bg-[#061a22]/60 px-4 py-2">
              {modules.map((m, i) => (
                <span
                  key={i}
                  className={`font-mono text-[15px] tracking-[0.18em] rounded-md px-3 py-1.5 ${
                    i === 0
                      ? 'bg-[#00c4cc]/12 text-[#7fe9ee] ring-1 ring-inset ring-[#00c4cc]/30'
                      : 'text-[#587a81]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} · {m}
                </span>
              ))}
            </div>

            {/* ── console body ── */}
            <div className="flex flex-col gap-4 p-4 lg:p-6">
              {/* net worth hero row */}
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <Panel label={tl('NET WORTH', '総資産')} icon={<Wallet className="h-3.5 w-3.5" strokeWidth={1.7} />}>
                  <div className="font-mono text-5xl font-light leading-none tracking-tight text-[#eafafb] tabular-nums lg:text-6xl">
                    <span className="align-top text-3xl text-[#00c4cc]">¥</span>48.0<span className="text-2xl text-[#6f9299]">億</span>
                  </div>
                  <div className="mt-3 font-mono text-[15px] tracking-wide text-[#6f9299]">
                    {tl('¥4,800,000,000 · 5 accounts / 3 currencies', '¥4,800,000,000 ・ 5口座 / 3通貨 統合')}
                  </div>
                </Panel>
                <TermKpi label={tl('MoM', '前月比')} value={`+${NET_WORTH.momPct}%`} sub={`▲ ¥${(NET_WORTH.momYen / 1e6).toFixed(0)}M`} tone={UP} />
                <TermKpi label={tl('YTD', '年初来')} value={`+${NET_WORTH.ytdPct}%`} sub={tl(`BMK +${NET_WORTH.benchPct}%`, `指標 +${NET_WORTH.benchPct}%`)} tone={UP} />
                <TermKpi label={tl('LIQUID', '流動資産')} value={`¥${NET_WORTH.liquidOku}億`} sub={tl(`${NET_WORTH.liquidPct}% of NAV`, `全体の ${NET_WORTH.liquidPct}%`)} />
              </div>

              {/* trend + allocation */}
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <Panel label={tl('NET-WORTH TREND', '純資産推移')} sub={tl('12M · ¥億', '直近12ヶ月 ・ 億円')} icon={<LineIcon className="h-3.5 w-3.5" strokeWidth={1.7} />}>
                  <LineChart points={trendPoints} accent={ACCENT} dark />
                </Panel>
                <Panel label={tl('ALLOCATION', '資産配分')} sub={tl('BY CLASS', 'クラス別')}>
                  <DonutChart items={allocItems} accent={ACCENT} dark />
                </Panel>
              </div>

              {/* breakdown + ccy + target */}
              <div className="grid gap-4 lg:grid-cols-3">
                <Panel label={tl('CLASS BREAKDOWN', 'クラス別 内訳')}>
                  <div className="flex flex-col">
                    {ALLOC.map((a, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-[#00c4cc]/8 py-3 last:border-0">
                        <span className="text-[15px] text-[#9fc0c4]">{ja ? a.ja : a.en}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[16px] text-[#5e7d84] tabular-nums">{a.pct.toFixed(1)}%</span>
                          <span className="font-mono text-[16px] text-[#dbeff1] tabular-nums">{oku(a.v)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Panel label={tl('CURRENCY MIX', '通貨配分')}>
                  <DonutChart items={ccyItems} accent="#5f9aa2" dark />
                </Panel>
                <Panel label={tl('TARGET vs CURRENT', '目標 vs 現状')} sub={tl('STRATEGIC', '戦略配分')}>
                  <div className="flex flex-col gap-4">
                    {TARGET.map((t, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[15px]">
                          <span className="text-[#bfe0e3]">{ja ? t.ja : t.en}</span>
                          <span className="font-mono text-[#5e7d84] tabular-nums">{tl(`${t.cur} / ${t.tgt}%`, `現${t.cur} / 目${t.tgt}%`)}</span>
                        </div>
                        <div className="relative h-2 overflow-hidden rounded-full bg-[#0d2830]">
                          <div className="h-full rounded-full" style={{ width: `${t.cur * 2}%`, background: `linear-gradient(90deg, ${ACCENT_DIM}, ${ACCENT})` }} />
                          <span className="absolute top-[-2px] h-3 w-[2px] bg-[#7fe9ee]" style={{ left: `${t.tgt * 2}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              {/* real estate */}
              <div className="mt-3">
                <h3 className="mb-3 flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.24em] text-[#7fd8dd]">
                  <Building2 className="h-4 w-4 text-[#00c4cc]" strokeWidth={1.7} /> {tl('REAL ESTATE PORTFOLIO', '不動産ポートフォリオ')}
                </h3>
                <div className="grid gap-4 lg:grid-cols-3">
                  <Panel><TermKpi inline label={tl('RE VALUE', '不動産 時価')} value={`¥${RE_KPI.valueOku}億`} sub={tl(`Unreal. +¥${RE_KPI.unrealOku}億`, `含み益 +¥${RE_KPI.unrealOku}億`)} tone={UP} /></Panel>
                  <Panel><TermKpi inline label={tl('PROPERTIES', '物件数')} value={`${RE_KPI.count}`} sub={tl(`${RE_KPI.dom} dom · ${RE_KPI.intl} intl`, `国内${RE_KPI.dom} ・ 海外${RE_KPI.intl}`)} /></Panel>
                  <Panel><TermKpi inline label={tl('AVG YIELD', '平均利回り')} value={`${RE_KPI.yld}%`} sub={tl(`Rent ¥${RE_KPI.rentM}M/y`, `年間賃料 ¥${RE_KPI.rentM}M`)} /></Panel>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PROPS.map((p, i) => {
                    const gain = p.cur - p.acq;
                    const up = gain >= 0;
                    return (
                      <div key={i} className="group relative rounded-xl border border-[#00c4cc]/12 bg-[#0a1c24]/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#00c4cc]/40 hover:shadow-[0_24px_50px_-30px_rgba(0,196,204,0.5)]">
                        <span className="font-mono text-[15px] uppercase tracking-[0.18em] text-[#00c4cc]">{ja ? p.locJa : p.locEn}</span>
                        <h4 className={`${display} mt-1.5 text-lg font-semibold text-[#e2f3f4]`}>{ja ? p.nmJa : p.nmEn}</h4>
                        <div className="mt-4 flex items-end justify-between">
                          <span className="inline-block rounded border border-[#00c4cc]/20 px-2.5 py-1 font-mono text-[15px] tracking-wide text-[#7fd8dd]">{ja ? p.tagJa : p.tagEn}</span>
                          <span className="font-mono text-xl font-light text-[#eafafb] tabular-nums">{oku(p.cur)}</span>
                        </div>
                        <div className="mt-4 flex justify-between gap-3 border-t border-[#00c4cc]/10 pt-4 font-mono text-[14px] text-[#6f9299]">
                          <span className="flex flex-col gap-0.5">{tl('ACQ', '取得')}<b className="text-[16px] font-medium text-[#cfeaec] tabular-nums">{oku(p.acq)}</b></span>
                          <span className="flex flex-col gap-0.5">{tl('P/L', '損益')}<b className="text-[16px] font-medium tabular-nums" style={{ color: up ? UP : DOWN }}>{up ? '+' : ''}{oku(gain)}</b></span>
                          <span className="flex flex-col gap-0.5">{tl('YLD', '利回り')}<b className="text-[16px] font-medium text-[#cfeaec] tabular-nums">{p.yld}</b></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* equities */}
              <div className="mt-3">
                <h3 className="mb-3 flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.24em] text-[#7fd8dd]">
                  <LineIcon className="h-4 w-4 text-[#00c4cc]" strokeWidth={1.7} /> {tl('EQUITIES & SECURITIES', '株式・有価証券')}
                </h3>
                <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                  <Panel label={tl('HOLDINGS', '保有銘柄')} sub={tl(`¥${EQ_KPI.valueOku}億 · +${EQ_KPI.dayPct}% today`, `時価 ¥${EQ_KPI.valueOku}億 ・ 当日 +${EQ_KPI.dayPct}%`)}>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="font-mono text-[15px] uppercase tracking-[0.14em] text-[#5e7d84]">
                            <th className="pb-3 text-left font-medium">{tl('Holding', '銘柄')}</th>
                            <th className="pb-3 text-right font-medium">{tl('Qty', '数量')}</th>
                            <th className="pb-3 text-right font-medium">{tl('Value', '時価')}</th>
                            <th className="pb-3 text-right font-medium">{tl('Day', '当日')}</th>
                            <th className="pb-3 text-right font-medium">{tl('Wt.', '構成比')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {HOLDINGS.map((h, i) => (
                            <tr key={i} className="border-t border-[#00c4cc]/8 transition-colors hover:bg-[#00c4cc]/[0.04]">
                              <td className="py-3.5">
                                <div className="flex items-center gap-3">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00c4cc]/15 bg-[#00c4cc]/[0.07] font-mono text-[15px] text-[#00c4cc]">{h.tk.length > 3 ? '∎' : h.tk[0]}</span>
                                  <span className="flex flex-col">
                                    <span className="text-[15px] text-[#dbeff1]">{ja ? h.nmJa : h.nmEn}</span>
                                    <span className="font-mono text-[15px] tracking-wide text-[#5e7d84]">{h.tk} · {ja ? h.subJa : h.subEn}</span>
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 text-right font-mono text-[16px] text-[#7f9aa2] tabular-nums">{h.q}</td>
                              <td className="py-3.5 text-right font-mono text-[16px] text-[#dbeff1] tabular-nums">¥{h.v}M</td>
                              <td className="py-3.5 text-right font-mono text-[16px] tabular-nums" style={{ color: h.d >= 0 ? UP : DOWN }}>{h.d >= 0 ? '+' : ''}{h.d}%</td>
                              <td className="py-3.5 text-right font-mono text-[16px] text-[#00c4cc] tabular-nums">{h.w}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                  <Panel label={tl('TOP HOLDINGS', '主要保有 上位')} sub={tl('¥M', '百万円')}>
                    <div className="pt-2">
                      <BarChart items={topHoldings} unit="M" accent={ACCENT} dark />
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* link to per-property tools */}
        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-[#00c4cc]/15 bg-[#0a1c24]/60 px-6 py-5">
            <Coins className="h-5 w-5 text-[#00c4cc]" strokeWidth={1.7} />
            <span className="text-[15px] text-[#9fc0c4]">
              {tl('The interactive growth simulator and Japan↔Dubai tax comparison run on each ', '運用シミュレーションと日本↔ドバイの税制比較は、各')}
              <Link href="/dubai-properties" className="font-medium text-[#00c4cc] underline-offset-2 hover:underline">
                {tl('Dubai property page', 'ドバイ物件ページ')}
              </Link>
              {tl('.', 'に掲載しています。')}
            </span>
          </div>
        </Reveal>

        <p className="mt-6 font-mono text-[15px] leading-relaxed text-[#5e7d84]">
          {tl(
            '※ Illustrative sample portfolio for demonstration. Figures are not advice; consult a licensed professional.',
            '※ 本ポートフォリオはデモ用のサンプルです。数値は投資助言ではありません。有資格の専門家にご相談ください。',
          )}
        </p>
      </div>
    </section>
  );
}

function TermKpi({ label, value, sub, tone, inline }: { label: string; value: string; sub?: string; tone?: string; inline?: boolean }) {
  const body = (
    <>
      <span className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#5e7d84]">{label}</span>
      <span className="font-mono text-3xl font-light leading-none tabular-nums" style={{ color: tone ?? '#eafafb' }}>{value}</span>
      {sub && <span className="font-mono text-[14px] tracking-wide" style={{ color: tone ? tone : '#6f9299' }}>{sub}</span>}
    </>
  );
  if (inline) return <div className="flex flex-col gap-2.5">{body}</div>;
  return (
    <div className="relative flex flex-col justify-center gap-2.5 rounded-xl border border-[#00c4cc]/15 bg-[#0a1c24]/70 p-6">
      <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-[#00c4cc]/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[#00c4cc]/40" />
      {body}
    </div>
  );
}
