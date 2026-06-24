/**
 * Sample integrated family-office portfolio (the 藤堂家 / "Todō family"),
 * ported from the CEO's AURUM dashboard reference. Illustrative demo data —
 * JPY-based, values in 百万円 (millions) unless noted; ¥億 = value / 100.
 */

export const NET_WORTH = {
  oku: 48.0,
  jpy: 4_800_000_000,
  momPct: 2.4,
  momYen: 112_000_000,
  ytdPct: 9.7,
  benchPct: 6.1,
  liquidOku: 18.7,
  liquidPct: 39.0,
};

export const TREND = {
  months: ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月'],
  values: [42.1, 42.6, 43.0, 42.4, 43.8, 44.5, 44.1, 45.3, 46.0, 46.4, 46.9, 48.0],
};

export interface AllocItem { en: string; ja: string; v: number; pct: number }
export const ALLOC: AllocItem[] = [
  { en: 'Real estate', ja: '不動産', v: 1920, pct: 40.0 },
  { en: 'Equities & securities', ja: '株式・有価証券', v: 1440, pct: 30.0 },
  { en: 'Alternatives', ja: 'オルタナティブ', v: 528, pct: 11.0 },
  { en: 'Fixed income', ja: '債券・固定収益', v: 480, pct: 10.0 },
  { en: 'Cash & deposits', ja: '現金・預金', v: 432, pct: 9.0 },
];

export const CCY = [
  { en: 'JPY', ja: 'JPY', v: 62 },
  { en: 'USD', ja: 'USD', v: 28 },
  { en: 'Other', ja: 'その他', v: 10 },
];

export const TARGET = [
  { en: 'Real estate', ja: '不動産', cur: 40, tgt: 35 },
  { en: 'Equities', ja: '株式', cur: 30, tgt: 32 },
  { en: 'Alternatives', ja: 'オルタナティブ', cur: 11, tgt: 15 },
  { en: 'Fixed income', ja: '債券', cur: 10, tgt: 12 },
  { en: 'Cash', ja: '現金', cur: 9, tgt: 6 },
];

export const RE_KPI = { valueOku: 19.2, unrealOku: 2.85, count: 5, dom: 4, intl: 1, yld: 4.3, rentM: 82.4 };

export interface PropItem {
  locEn: string; locJa: string; nmEn: string; nmJa: string; tagEn: string; tagJa: string;
  acq: number; cur: number; yld: string;
}
export const PROPS: PropItem[] = [
  { locEn: 'Minato, Tokyo', locJa: '東京 ・ 港区', nmEn: 'Tower Residence', nmJa: 'タワーレジデンス', tagEn: 'Residential', tagJa: '居住用', acq: 620, cur: 740, yld: '—' },
  { locEn: 'Chiyoda, Tokyo', locJa: '東京 ・ 千代田区', nmEn: 'Office Building', nmJa: 'オフィスビル', tagEn: 'Commercial', tagJa: '商業', acq: 480, cur: 512, yld: '4.1%' },
  { locEn: 'Kita, Osaka', locJa: '大阪 ・ 北区', nmEn: 'Rental Apartments', nmJa: '賃貸マンション', tagEn: 'Investment', tagJa: '投資用', acq: 210, cur: 248, yld: '5.2%' },
  { locEn: 'Higashiyama, Kyoto', locJa: '京都 ・ 東山区', nmEn: 'Kyō-machiya', nmJa: '京町家（運用）', tagEn: 'Hospitality', tagJa: '観光', acq: 85, cur: 112, yld: '6.0%' },
  { locEn: 'Oahu, Hawaii', locJa: 'ハワイ ・ オアフ', nmEn: 'Condominium', nmJa: 'コンドミニアム', tagEn: 'Villa / Overseas', tagJa: '別荘/海外', acq: 230, cur: 308, yld: '3.4%' },
];

export const EQ_KPI = { valueOku: 14.4, dayPct: 0.8 };

export interface Holding {
  tk: string; nmEn: string; nmJa: string; subEn: string; subJa: string;
  q: string; v: number; d: number; w: number;
}
export const HOLDINGS: Holding[] = [
  { tk: '7203', nmEn: 'Toyota Motor', nmJa: 'トヨタ自動車', subEn: 'JP equity', subJa: '国内株式', q: '58,000', v: 218, d: +1.2, w: 15.1 },
  { tk: 'AAPL', nmEn: 'Apple Inc.', nmJa: 'Apple Inc.', subEn: 'US equity', subJa: '米国株式', q: '1,400', v: 196, d: +0.6, w: 13.6 },
  { tk: '6861', nmEn: 'Keyence', nmJa: 'キーエンス', subEn: 'JP equity', subJa: '国内株式', q: '2,800', v: 182, d: -0.4, w: 12.6 },
  { tk: 'MSFT', nmEn: 'Microsoft Corp.', nmJa: 'Microsoft Corp.', subEn: 'US equity', subJa: '米国株式', q: '1,050', v: 174, d: +1.1, w: 12.1 },
  { tk: '6758', nmEn: 'Sony Group', nmJa: 'ソニーグループ', subEn: 'JP equity', subJa: '国内株式', q: '42,000', v: 158, d: +0.9, w: 11.0 },
  { tk: 'NVDA', nmEn: 'NVIDIA Corp.', nmJa: 'NVIDIA Corp.', subEn: 'US equity', subJa: '米国株式', q: '620', v: 146, d: +2.3, w: 10.1 },
  { tk: '8058', nmEn: 'Mitsubishi Corp.', nmJa: '三菱商事', subEn: 'JP equity', subJa: '国内株式', q: '33,000', v: 121, d: -0.2, w: 8.4 },
  { tk: 'ETF', nmEn: 'Global Equity ETFs', nmJa: '全世界株式 ETF 他', subEn: 'Index', subJa: 'インデックス', q: '—', v: 245, d: +0.5, w: 17.1 },
];
