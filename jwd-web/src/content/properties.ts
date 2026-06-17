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
  beds: string;
  sizeSqft: number;
  descJa: string;
  descEn: string;
  /** real photograph for the card */
  image: string;
  /** gradient stops for the code-drawn card visual (fallback) */
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
    beds: '1BR',
    sizeSqft: 820,
    descJa: 'ブルジュ・ハリファを望むダウンタウンの中心に立つ1ベッドルーム。観光・駐在需要が厚く、長期・短期いずれの賃貸でも高稼働が見込めます。',
    descEn: 'A one-bedroom residence in the heart of Downtown with Burj Khalifa views. Deep tourist and expat demand supports strong occupancy on both long and short lets.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
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
    beds: '2BR',
    sizeSqft: 1_250,
    descJa: 'マリーナのウォーターフロントに位置する2ベッドルーム。海とヨットハーバーの眺望、充実した共用施設が、安定した賃貸需要を支えます。',
    descEn: 'A two-bedroom waterfront residence on Dubai Marina. Sea and marina views with rich shared amenities underpin steady rental demand.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
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
    beds: '5BR',
    sizeSqft: 6_500,
    descJa: 'パーム・ジュメイラのプライベートビーチに面した5ベッドルーム・ヴィラ。希少性が高く、資産価値の保全と短期賃貸の上振れの両面で魅力があります。',
    descEn: 'A five-bedroom villa on a private beach on Palm Jumeirah. High scarcity makes it compelling both for preserving value and for short-let upside.',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
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
    beds: 'Studio',
    sizeSqft: 480,
    descJa: 'JVCの高利回りスタジオ。手頃な価格帯と旺盛な賃貸需要により、グロス8%超を狙えるエントリー向けの一戸です。',
    descEn: 'A high-yield studio in JVC. An accessible price point and robust rental demand make 8%+ gross achievable — an ideal entry asset.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    hues: ['#131c33', '#2d2a20'],
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/jumeirah-village-circle-jvc/',
    pf: 'https://www.propertyfinder.ae/en/search?l=64&c=1&fu=0&ob=mr',
  },
];
