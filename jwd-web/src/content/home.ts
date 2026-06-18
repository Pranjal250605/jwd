import type { L } from './types';

/**
 * Content for the HOME page (sitemap section 1) and its seven blocks, in the
 * exact order of the sitemap:
 *   Latest Properties → Investment Highlights → Dubai Market News →
 *   Japan Market News → Featured Projects → Why JWD → CTA
 * Bilingual leaves (L) are resolved client-side via useLocale.
 */

export interface NewsItem {
  date: string;
  tag: L;
  title: L;
  href: string;
}

export interface HighlightStat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: L;
  href?: string;
}

export interface FeaturedProject {
  title: L;
  meta: L;
  text: L;
  href: string;
  external?: boolean;
  image: string;
}

export interface WhyPoint {
  title: L;
  text: L;
  action?: { label: L; href: string };
}

export const home = {
  latestProperties: {
    label: { ja: '最新物件', en: 'Latest Properties' },
    title: { ja: '厳選された、ドバイの最新物件', en: 'The latest, curated Dubai properties' },
    intro: {
      ja: '数千件の在庫ではなく、投資価値で選び抜いた物件だけを。利回りと立地で見極めた最新のキュレーション。',
      en: 'Not thousands of listings — only assets chosen for investment merit, judged on yield and location.',
    },
    viewAll: { ja: 'すべての物件を見る', en: 'View all properties' },
    yieldLabel: { ja: '目標利回り', en: 'Target yield' },
  },

  highlights: {
    label: { ja: '投資ハイライト', en: 'Investment Highlights' },
    title: { ja: '数字で見る、ドバイ投資の現在地', en: 'Where Dubai investment stands, in numbers' },
    intro: {
      ja: '税、利回り、成長。ドバイ市場の魅力を支える指標を一目で。',
      en: 'Tax, yield, growth — the indicators behind Dubai’s appeal, at a glance.',
    },
    stats: [
      { value: 0, suffix: '%', label: { ja: '個人所得税', en: 'Personal income tax' }, href: '/highlight/tax' },
      { value: 7, suffix: '%', label: { ja: '平均賃貸利回り', en: 'Average rental yield' }, href: '/highlight/yield' },
      { value: 6, suffix: '%+', label: { ja: '年間人口増', en: 'Annual population growth' }, href: '/highlight/growth' },
      { value: 100, suffix: '%', label: { ja: '外国人所有（指定区域）', en: 'Foreign ownership (freehold)' }, href: '/highlight/ownership' },
    ] as HighlightStat[],
  },

  dubaiNews: {
    label: { ja: 'ドバイ・マーケットニュース', en: 'Dubai Market News' },
    title: { ja: 'ドバイ市場の、いま', en: 'Dubai, right now' },
    items: [
      {
        date: '2026.05.20',
        tag: { ja: '市場動向', en: 'Market' },
        title: {
          ja: 'ドバイ不動産取引額、四半期で過去最高を更新。海外投資家の比率が拡大。',
          en: 'Dubai property transaction value hits a fresh quarterly record as the foreign-investor share widens.',
        },
        href: '/why-dubai/market-statistics',
      },
      {
        date: '2026.04.08',
        tag: { ja: 'ビザ', en: 'Visa' },
        title: {
          ja: 'ゴールデンビザの適格要件が一部更新。長期居住の選択肢がさらに柔軟に。',
          en: 'Golden Visa eligibility refined — long-term residency options grow more flexible.',
        },
        href: '/why-dubai/golden-visa',
      },
      {
        date: '2026.03.02',
        tag: { ja: '利回り', en: 'Yield' },
        title: {
          ja: 'JVCなど新興エリアで、グロス8%超の高利回り物件が依然として供給。',
          en: 'Emerging areas like JVC keep supplying high-yield assets above 8% gross.',
        },
        href: '/why-dubai/rental-yield',
      },
      {
        date: '2026.02.14',
        tag: { ja: '税制', en: 'Tax' },
        title: {
          ja: 'UAEの法人税ガイダンスが更新。フリーゾーン優遇の適用範囲が明確化。',
          en: 'UAE corporate-tax guidance updated, clarifying the scope of free-zone incentives.',
        },
        href: '/why-dubai/tax-benefits',
      },
      {
        date: '2026.01.22',
        tag: { ja: '市場動向', en: 'Market' },
        title: {
          ja: 'オフプラン販売が好調を維持。主要デベロッパーが新規プロジェクトを相次ぎ発表。',
          en: 'Off-plan sales stay strong as major developers launch a wave of new projects.',
        },
        href: '/dubai-properties',
      },
      {
        date: '2025.12.05',
        tag: { ja: '為替', en: 'Currency' },
        title: {
          ja: 'AEDの米ドルペッグが安定を維持。円安局面で分散需要が拡大。',
          en: 'The AED’s dollar peg holds steady; weak-yen diversification demand grows.',
        },
        href: '/why-dubai/currency-diversification',
      },
    ] as NewsItem[],
  },

  japanNews: {
    label: { ja: '日本・マーケットニュース', en: 'Japan Market News' },
    title: { ja: '日本市場の、いま', en: 'Japan, right now' },
    items: [
      {
        date: '2026.05.11',
        tag: { ja: '為替', en: 'Currency' },
        title: {
          ja: '円安基調が継続。海外投資家にとって日本の優良資産が引き続き割安に。',
          en: 'A weak yen persists, keeping prime Japanese assets attractively priced for overseas buyers.',
        },
        href: '/japan-properties',
      },
      {
        date: '2026.04.19',
        tag: { ja: '空き家', en: 'Akiya' },
        title: {
          ja: '地方の空き家再生投資が拡大。リノベ前提の高利回り事例が増加。',
          en: 'Regional akiya-revival investing expands, with more renovation-led high-yield cases.',
        },
        href: '/japan-properties',
      },
      {
        date: '2026.02.27',
        tag: { ja: '相続', en: 'Inheritance' },
        title: {
          ja: '不動産を活用した事業承継・相続設計への関心が高まる。',
          en: 'Interest grows in property-based succession and inheritance planning.',
        },
        href: '/japan-properties',
      },
      {
        date: '2026.01.30',
        tag: { ja: '市場動向', en: 'Market' },
        title: {
          ja: '都心の優良物件に海外マネーが流入。利回りは依然タイト。',
          en: 'Overseas capital flows into prime central Tokyo; yields remain tight.',
        },
        href: '/japan-properties',
      },
      {
        date: '2025.12.18',
        tag: { ja: '税制', en: 'Tax' },
        title: {
          ja: '相続税対策としての不動産活用に関する相談が増加。',
          en: 'Enquiries rise on using real estate for inheritance-tax planning.',
        },
        href: '/family-office',
      },
      {
        date: '2025.11.20',
        tag: { ja: '空き家', en: 'Akiya' },
        title: {
          ja: '自治体の空き家バンク連携が拡大。再生投資のパイプラインが充実。',
          en: 'Municipal akiya-bank tie-ups expand, deepening the renovation pipeline.',
        },
        href: '/japan-properties',
      },
    ] as NewsItem[],
  },

  featured: {
    label: { ja: '注目のプロジェクト', en: 'Featured Projects' },
    title: { ja: '私たちが、自ら投資する場所', en: 'The places we invest in ourselves' },
    intro: {
      ja: 'パンフレットではなく、当事者の視点で選ぶ旗艦プロジェクト。',
      en: 'Flagship projects chosen from an owner’s perspective — not a brochure’s.',
    },
    items: [
      {
        title: { ja: 'ハート・オブ・ヨーロッパ', en: 'Heart of Europe' },
        meta: { ja: '旗艦・ザ・ワールド', en: 'Flagship · The World' },
        text: {
          ja: 'ドバイ沖の人工島群に立ち上がるヨーロッパ。川名が個人として投資する象徴的プロジェクト。',
          en: 'A Europe rising on islands off Dubai — the symbolic project Tomo invests in personally.',
        },
        href: '/heart-of-europe',
        image:
          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: { ja: 'ドバイ・プロパティ', en: 'Dubai Properties' },
        meta: { ja: 'キュレーション', en: 'Curated' },
        text: {
          ja: 'ダウンタウン、マリーナ、パーム。投資価値で厳選した都市の物件群。',
          en: 'Downtown, Marina, Palm — city assets curated for investment merit.',
        },
        href: '/dubai-properties',
        image:
          'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: { ja: 'インベストメント・ファンド', en: 'Investment Funds' },
        meta: { ja: '不動産の先へ', en: 'Beyond real estate' },
        text: {
          ja: '規制下のエクイティ・AIXファンドを通じ、グローバルな投資機会へ。',
          en: 'Regulated Equity and AIX funds opening access to global opportunity.',
        },
        href: '/funds',
        image:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
      },
    ] as FeaturedProject[],
  },

  whyJwd: {
    label: { ja: 'なぜJWDか', en: 'Why JWD' },
    title: { ja: '二つの市場を、母語で結ぶ', en: 'Two markets, bridged in your language' },
    intro: {
      ja: '物件を売る会社ではなく、資産を次の地平へ渡すための設計をするパートナー。',
      en: 'Not a company that sells property — a partner that designs your wealth toward its next horizon.',
    },
    items: [
      {
        title: { ja: '両市場に精通', en: 'Fluent in both markets' },
        text: {
          ja: '日本とドバイ、その両方を母語で、一貫した視点で語れる数少ない事業者です。',
          en: 'One of the few firms that speaks to both Japan and Dubai — in your language, from one viewpoint.',
        },
      },
      {
        title: { ja: '当事者の実体験', en: 'First-hand as an owner' },
        text: {
          ja: '代表・川名はドバイに住み、投資し、子を育てる。語る資格は暮らしの中にあります。',
          en: 'Our founder lives, invests and raises a family in Dubai — authority that comes from his life.',
        },
      },
      {
        title: { ja: 'ワンストップ', en: 'One desk for everything' },
        text: {
          ja: '不動産、法人・ビザ、ファミリーオフィスまで、ひとつのチームが横断的に伴走します。',
          en: 'Property, company and visa, family office — one team walks with you across all of it.',
        },
        action: { label: { ja: 'AIにリアルタイムで相談', en: 'Ask AI in real-time' }, href: '/advisor' },
      },
      {
        title: { ja: '透明性', en: 'Radical transparency' },
        text: {
          ja: '実取引データも、川名自身のポートフォリオも開示する。透明性が最大の差別化です。',
          en: 'Real transaction data and Tomo’s own portfolio, disclosed — transparency is our edge.',
        },
      },
    ] as WhyPoint[],
  },

  cta: {
    label: { ja: 'はじめの一歩', en: 'The first move' },
    title: { ja: '二つの地平へ、ともに踏み出す', en: 'Step toward two horizons, together' },
    desc: {
      ja: 'ご相談はご紹介制です。まずはお問い合わせください。あとは私たちが導きます。',
      en: 'Consultations are by introduction. Reach out — and we will take it from there.',
    },
    primary: { ja: '無料相談を予約', en: 'Book a Consultation' },
    secondary: { ja: '投資ガイドをダウンロード', en: 'Download Investment Guide' },
    note: { ja: 'ご紹介制', en: 'By introduction only' },
  },
};
