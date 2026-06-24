import {
  CandlestickChart,
  BarChart3,
  Droplet,
  PieChart,
  Layers,
  Bitcoin,
  Shield,
} from 'lucide-react';

export type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export interface Market {
  key: string;
  icon: IconType;
  en: string;
  ja: string;
  url: string;
  descEn: string;
  descJa: string;
}

const BASE = 'https://www.equiti.com/sc-en/products';

/** Tradable markets offered by our partner Equiti — each links to its page. */
export const MARKETS: Market[] = [
  { key: 'forex', icon: CandlestickChart, en: 'Forex', ja: '外国為替', url: `${BASE}/forex/`, descEn: '80+ global currency pairs with tight spreads.', descJa: '80超の通貨ペアをタイトなスプレッドで。' },
  { key: 'indices', icon: BarChart3, en: 'Indices', ja: '株価指数', url: `${BASE}/indices/`, descEn: "The world's major stock indices as CFDs.", descJa: '世界の主要株価指数をCFDで。' },
  { key: 'commodities', icon: Droplet, en: 'Commodities', ja: '商品', url: `${BASE}/commodities/`, descEn: 'Gold, oil and core commodities.', descJa: '金・原油など主要コモディティ。' },
  { key: 'shares', icon: PieChart, en: 'Shares', ja: '株式', url: `${BASE}/shares/`, descEn: 'Blue-chip global equities, long or short.', descJa: '世界の優良株をロング・ショートで。' },
  { key: 'etfs', icon: Layers, en: 'ETFs', ja: 'ETF', url: `${BASE}/etfs/`, descEn: 'Diversified funds in a single trade.', descJa: '分散投資をワントレードで。' },
  { key: 'crypto-cfds', icon: Bitcoin, en: 'Crypto CFDs', ja: '暗号資産CFD', url: `${BASE}/crypto-cfds/`, descEn: 'Major digital assets around the clock.', descJa: '主要暗号資産を24時間取引。' },
  { key: 'gold-option', icon: Shield, en: 'Gold Option CFDs', ja: '金オプションCFD', url: `${BASE}/gold-option/`, descEn: 'Hedge and trade options on gold.', descJa: '金オプションでヘッジ・取引。' },
];

export const MARKETS_ALL_URL = `${BASE}/`;
