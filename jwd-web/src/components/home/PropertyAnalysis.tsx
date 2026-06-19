import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import type { Listing } from '@/content/properties';
import type { PriceHistory } from '@/lib/market-data';

const ACCENT = '#9a7b2d';

/* ── Illustrative model assumptions (replace with verified / live data) ── */
const APPRECIATION = 0.06; // fallback capital growth p.a. (used if no history)
const PURCHASE_COST = 0.06; // DLD 4% + agency 2%
const EXIT_COST = 0.02; // agency at sale
const OPEX_PER_SQFT = 18; // service charge + management, AED/yr
const HOLD = 5; // holding period, years
const FX_JPY = 41; // AED → JPY

function irr(cf: number[]): number {
  const npv = (r: number) => cf.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
  let lo = -0.95, hi = 1.5;
  let flo = npv(lo);
  if (flo * npv(hi) > 0) return NaN;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const fm = npv(mid);
    if (Math.abs(fm) < 1) return mid;
    if (flo * fm < 0) hi = mid;
    else { lo = mid; flo = fm; }
  }
  return (lo + hi) / 2;
}

const fmt = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

export function PropertyAnalysis({
  listing: p,
  locale,
  history,
}: {
  listing: Listing;
  locale: string;
  history?: PriceHistory;
}) {
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';
  const live = !!history; // DLD-sourced price history available

  // ── model ──
  const price = p.priceAed;
  const appreciation = history?.appreciation ?? APPRECIATION;
  const grossRent = price * (p.yieldPct / 100);
  const opex = p.sizeSqft * OPEX_PER_SQFT;
  const netRent = Math.max(grossRent - opex, 0);
  const netYield = (netRent / price) * 100;
  const invested = price * (1 + PURCHASE_COST);
  const exitPrice = price * Math.pow(1 + appreciation, HOLD);
  const saleNet = exitPrice * (1 - EXIT_COST);
  const cf = [-invested, ...Array(HOLD - 1).fill(netRent), netRent + saleNet];
  const irrPct = irr(cf) * 100;
  const roi5 = ((HOLD * netRent + (exitPrice - price)) / invested) * 100;
  const payback = invested / netRent;

  // ── price/sqft series: history (DLD) or modelled, split solid / dashed ──
  const series =
    history?.points ??
    Array.from({ length: 11 }, (_, i) => {
      const offset = i - 5; // -5 … +5
      return {
        label: `'${String(26 + offset).padStart(2, '0')}`,
        value: (price / p.sizeSqft) * Math.pow(1 + APPRECIATION, offset),
        projected: offset > 0,
      };
    });
  const nowIdx = series.reduce((acc, s, i) => (s.projected ? acc : i), 0);
  const vals = series.map((s) => s.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const W = 100, H = 38, pad = 3;
  const xy = series.map((s, i) => {
    const x = pad + (i / (series.length - 1)) * (W - pad * 2);
    const y = pad + (1 - (s.value - min) / (max - min || 1)) * (H - pad * 2);
    return [x, y] as const;
  });
  const histPts = xy.slice(0, nowIdx + 1);
  const projPts = xy.slice(nowIdx);
  const line = (pts: ReadonlyArray<readonly [number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const nowX = xy[nowIdx][0];

  const metrics = [
    { label: ja ? 'グロス利回り' : 'Gross yield', value: `${p.yieldPct.toFixed(1)}%` },
    { label: ja ? 'ネット利回り' : 'Net yield', value: `${netYield.toFixed(1)}%` },
    { label: ja ? '5年トータルROI' : '5-yr total ROI', value: `${roi5.toFixed(0)}%` },
    { label: ja ? 'IRR（年率）' : 'IRR (p.a.)', value: Number.isFinite(irrPct) ? `${irrPct.toFixed(1)}%` : '—' },
    { label: ja ? '5年後の想定価値' : 'Projected value (5y)', value: `AED ${fmt(exitPrice)}` },
    { label: ja ? '回収年数' : 'Payback', value: `${payback.toFixed(1)} ${ja ? '年' : 'yrs'}` },
  ];

  const risks: { risk: string; hedge: string }[] = ja
    ? [
        { risk: '価格変動・市況サイクル', hedge: 'エリア分散と長期保有。JWDが底堅い立地を厳選。' },
        { risk: '空室・賃料下落リスク', hedge: 'プロによる運営管理と高需要立地の選定。' },
        { risk: '流動性・出口リスク', hedge: '取得前に出口戦略を設計、流動性の高い区分を選定。' },
        { risk: '為替リスク（円）', hedge: 'AEDの米ドルペッグ＋円資産との分散効果。' },
        { risk: '開発・引き渡しリスク', hedge: '実績あるデベロッパーとDLDエスクロー口座。' },
        { risk: '規制・金利の変化', hedge: '最新情報の継続把握と保守的なレバレッジ設計。' },
      ]
    : [
        { risk: 'Price volatility / market cycles', hedge: 'Area diversification + long hold; JWD curates resilient locations.' },
        { risk: 'Vacancy / rental downside', hedge: 'Professional management and high-demand location selection.' },
        { risk: 'Liquidity / exit risk', hedge: 'Exit strategy defined before purchase; liquid segment chosen.' },
        { risk: 'Currency risk (JPY)', hedge: 'AED’s USD peg plus diversification away from yen assets.' },
        { risk: 'Developer / delivery risk', hedge: 'Vetted developers and DLD escrow accounts.' },
        { risk: 'Regulatory / rate changes', hedge: 'Continuous advisory and conservative leverage.' },
      ];

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 lg:px-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-sumi/8 bg-washi p-8 lg:p-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
              <TrendingUp className="h-4 w-4" strokeWidth={1.6} /> {ja ? '投資分析' : 'Investment Analysis'}
            </span>
            <h2 className={`${display} text-2xl font-semibold text-sumi lg:text-3xl`}>
              {ja ? '数字で見る、この物件' : 'This asset, in numbers'}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-gold">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} />
            {live ? (ja ? 'DLDデータ · AI予測' : 'DLD data · AI forecast') : ja ? 'AI試算 · 参考値' : 'AI-modelled · illustrative'}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {/* chart */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-sumi-soft">
                {ja ? '価格推移と将来予測（AED / sqft）' : 'Price history & projection (AED / sqft)'}
              </span>
              {live && (
                <span className="text-[10px] tracking-wide text-sumi-soft/60">
                  {ja ? 'ドバイ土地局のエリア動向に基づく' : 'Based on DLD area trends'}
                </span>
              )}
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 220 }}>
              <defs>
                <linearGradient id="pa-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </linearGradient>
              </defs>
              <line x1={nowX} y1={pad} x2={nowX} y2={H - pad} stroke={ACCENT} strokeWidth={0.4} strokeDasharray="1 1.5" opacity={0.5} />
              <path d={`${line(histPts)} L${histPts[histPts.length - 1][0]} ${H} L${histPts[0][0]} ${H} Z`} fill="url(#pa-fill)" />
              <path d={line(histPts)} fill="none" stroke={ACCENT} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={line(projPts)} fill="none" stroke={ACCENT} strokeWidth={1} strokeDasharray="2 1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.75} />
              <circle cx={nowX} cy={xy[nowIdx][1]} r={1} fill={ACCENT} />
            </svg>
            <div className="flex justify-between text-[10px] tracking-wide text-sumi-soft/70">
              {series.filter((_, i) => i % 2 === 0).map((s, i) => <span key={`${s.label}-${i}`}>{s.label}</span>)}
            </div>
            <p className="text-[11px] font-light italic text-sumi-soft/70">
              {live
                ? ja
                  ? `実線=ドバイ土地局のエリア価格動向（本物件の坪単価に基準化）、点線=今後${HOLD}年の予測（年率${(appreciation * 100).toFixed(0)}%想定）。`
                  : `Solid = DLD area price trend (anchored to this unit), dashed = ${HOLD}-yr forecast (${(appreciation * 100).toFixed(0)}% p.a. assumed).`
                : ja
                  ? `実線=過去（推定）、点線=今後${HOLD}年の予測。年率${(APPRECIATION * 100).toFixed(0)}%の値上がりを仮定。`
                  : `Solid = past (estimated), dashed = ${HOLD}-yr projection, assuming ${(APPRECIATION * 100).toFixed(0)}% p.a. growth.`}
            </p>
          </div>

          {/* metrics */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sumi/8 bg-sumi/[0.06]">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-1.5 bg-washi p-5">
                <span className="font-en text-2xl font-light text-sumi">{m.value}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-sumi-soft">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* risks & hedges */}
        <div className="mt-12 border-t border-sumi/8 pt-10">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" strokeWidth={1.6} /> {ja ? 'リスクとヘッジ' : 'Risks & risk-hedges'}
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {risks.map((r, i) => (
              <div key={i} className="rounded-2xl border border-sumi/8 p-5">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/70" />
                  <span className={`${display} text-sm font-semibold text-sumi`}>{r.risk}</span>
                </div>
                <div className="mt-2.5 flex items-start gap-2 pl-3.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[0.84rem] font-light leading-relaxed text-sumi-soft">{r.hedge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* assumptions / disclaimer */}
        <p className="mt-10 text-[11px] font-light leading-relaxed text-sumi-soft/70">
          {ja
            ? `※ ${live ? '価格推移はドバイ土地局のエリア価格動向に基づき、本物件の坪単価に基準化しています。利回り・ROI・IRRはAIによる試算です。' : '本分析はAIによる試算（参考値）です。'}前提：年率${(appreciation * 100).toFixed(0)}%の価格上昇、取得コスト${(PURCHASE_COST * 100).toFixed(0)}%、売却コスト${(EXIT_COST * 100).toFixed(0)}%、管理・共益費 約AED${OPEX_PER_SQFT}/sqft/年、保有${HOLD}年、AED≈¥${FX_JPY}。実際の数値は市場データ・契約条件により変動します。確定的な投資助言ではありません。`
            : `※ ${live ? "Price history is based on Dubai Land Department area price trends, anchored to this unit's price/sqft; yield, ROI and IRR are AI-modelled." : 'This analysis is AI-modelled and illustrative.'} Assumptions: ${(appreciation * 100).toFixed(0)}% p.a. price growth, ${(PURCHASE_COST * 100).toFixed(0)}% purchase costs, ${(EXIT_COST * 100).toFixed(0)}% exit costs, ~AED ${OPEX_PER_SQFT}/sqft/yr running costs, ${HOLD}-yr hold, AED≈¥${FX_JPY}. Actual figures vary with market data and terms; not financial advice.`}
        </p>
      </div>
    </section>
  );
}
