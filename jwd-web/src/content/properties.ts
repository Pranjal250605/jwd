/**
 * Curated draft listings — PLACEHOLDER data until the client supplies real
 * inventory. Visuals are code-drawn gradients (no photos yet).
 */
export interface Listing {
  id: string;
  area: string;
  nameJa: string;
  nameEn: string;
  typeJa: string;
  typeEn: string;
  priceAed: number;
  yieldPct: number;
  /** gradient stops for the code-drawn card visual */
  hues: [string, string];
  bayut: string;
  pf: string;
}

export const listings: Listing[] = [
  {
    id: 'downtown-1br',
    area: 'Downtown Dubai',
    nameJa: 'ダウンタウン 1BR レジデンス',
    nameEn: 'Downtown 1BR Residence',
    typeJa: 'アパートメント',
    typeEn: 'Apartment',
    priceAed: 1_850_000,
    yieldPct: 6.8,
    hues: ['#1a2336', '#3a2f25'],
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/downtown-dubai/',
    pf: 'https://www.propertyfinder.ae/en/search?l=50&c=1&fu=0&ob=mr',
  },
  {
    id: 'marina-2br',
    area: 'Dubai Marina',
    nameJa: 'マリーナ 2BR ウォーターフロント',
    nameEn: 'Marina 2BR Waterfront',
    typeJa: 'アパートメント',
    typeEn: 'Apartment',
    priceAed: 2_400_000,
    yieldPct: 7.1,
    hues: ['#0e2233', '#1d3a4a'],
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/dubai-marina/',
    pf: 'https://www.propertyfinder.ae/en/search?l=36&c=1&fu=0&ob=mr',
  },
  {
    id: 'palm-villa',
    area: 'Palm Jumeirah',
    nameJa: 'パーム・ジュメイラ 5BR ヴィラ',
    nameEn: 'Palm Jumeirah 5BR Villa',
    typeJa: 'ヴィラ',
    typeEn: 'Villa',
    priceAed: 16_500_000,
    yieldPct: 5.2,
    hues: ['#2a2438', '#4a3a28'],
    bayut: 'https://www.bayut.com/for-sale/villas/dubai/palm-jumeirah/',
    pf: 'https://www.propertyfinder.ae/en/search?l=1535&c=1&t=35&fu=0&ob=mr',
  },
  {
    id: 'jvc-studio',
    area: 'Jumeirah Village Circle',
    nameJa: 'JVC 高利回りスタジオ',
    nameEn: 'JVC High-Yield Studio',
    typeJa: 'スタジオ',
    typeEn: 'Studio',
    priceAed: 650_000,
    yieldPct: 8.4,
    hues: ['#131c33', '#2d2a20'],
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/jumeirah-village-circle-jvc/',
    pf: 'https://www.propertyfinder.ae/en/search?l=64&c=1&fu=0&ob=mr',
  },
];
