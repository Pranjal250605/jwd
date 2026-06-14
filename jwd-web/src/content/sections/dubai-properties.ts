import type { Section } from '../types';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2400&q=80',
  search:
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80',
  bayut:
    'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=2400&q=80',
  pf: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80',
};

export const dubaiProperties: Section = {
  slug: 'dubai-properties',
  navKey: 'properties',
  order: 4,
  image: IMG.hero,
  intro: {
    ja: '数千件の在庫ではなく、投資価値で選び抜いた物件だけを。検索の軸と、信頼できる外部ポータルへの導線を用意しました。',
    en: 'Not thousands of listings — only assets selected for investment merit. Here are the axes to search by, and trusted routes to the major portals.',
  },
  blurb: {
    ja: '物件検索の考え方、そしてBayut・Property Finderとの連携。あなたの基準で、ドバイ不動産を見極める。',
    en: 'How to search, plus our links to Bayut and Property Finder — so you can judge Dubai real estate on your own terms.',
  },
  subsections: [
    {
      slug: 'property-search',
      label: { ja: '物件検索', en: 'Property Search' },
      title: { ja: '五つの軸で、絞り込む', en: 'Five axes to narrow the field' },
      tagline: {
        ja: 'エリア、予算、タイプ、利回り、デベロッパー。あなたの基準を、私たちの目で補完する。',
        en: 'Area, budget, type, yield, developer — your criteria, sharpened by our eyes.',
      },
      image: IMG.search,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ドバイには膨大な物件があります。だからこそ、何を基準に絞るかが投資の成否を分けます。JWDは五つの軸——エリア、予算、物件タイプ、利回り、デベロッパー——で検索を構造化し、そこに「投資価値で選ぶ」という私たちの目を重ねます。',
            en: 'Dubai has an enormous supply. That is precisely why your criteria decide the outcome. JWD structures the search around five axes — area, budget, property type, yield and developer — and overlays them with our own discipline of selecting for investment merit.',
          },
        },
        {
          kind: 'cards',
          tone: 'light',
          kicker: { ja: '検索の軸', en: 'The search axes' },
          heading: { ja: '何で絞り込むか', en: 'What you filter by' },
          items: [
            {
              title: { ja: 'エリア', en: 'Area' },
              text: {
                ja: 'ダウンタウン、マリーナ、パーム、JVC——立地は利回りと値動きの性格を決めます。',
                en: 'Downtown, Marina, Palm, JVC — location shapes both the yield and the price behaviour.',
              },
            },
            {
              title: { ja: '予算', en: 'Budget' },
              text: {
                ja: '65万AEDのスタジオから数千万AEDのヴィラまで。レンジで戦略は変わります。',
                en: 'From an AED 650k studio to multi-million villas — strategy shifts with the range.',
              },
            },
            {
              title: { ja: '物件タイプ', en: 'Property Type' },
              text: {
                ja: 'アパートメント、ヴィラ、スタジオ。用途と運用形態で選び分けます。',
                en: 'Apartment, villa, studio — chosen by use case and operating model.',
              },
            },
            {
              title: { ja: '利回り', en: 'Yield' },
              text: {
                ja: '表面利回りの目安を起点に、手取りベースまで一緒に検証します。',
                en: 'Starting from headline yield, we verify down to net returns together.',
              },
            },
            {
              title: { ja: 'デベロッパー', en: 'Developer' },
              text: {
                ja: '開発主体の実績と引き渡し信頼性は、オフプラン投資で特に重要です。',
                en: 'A developer’s track record and delivery reliability matter most for off-plan.',
              },
            },
          ],
        },
        {
          kind: 'stats',
          tone: 'dark',
          kicker: { ja: 'サンプル在庫', en: 'Sample inventory' },
          heading: { ja: 'キュレーションの一例', en: 'A taste of the curation' },
          items: [
            { value: 8.4, decimals: 1, suffix: '%', label: { ja: 'JVC スタジオ 目標利回り', en: 'JVC studio target yield' } },
            { value: 650, prefix: 'AED ', suffix: 'k', label: { ja: 'エントリー価格帯', en: 'Entry price point' } },
            { value: 6.8, decimals: 1, suffix: '%', label: { ja: 'ダウンタウン 1BR', en: 'Downtown 1BR' } },
            { value: 4, label: { ja: '厳選サンプル数', en: 'Curated samples' } },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '※価格・利回りはサンプルです', en: '※ Prices and yields are samples' },
          text: {
            ja: '掲載中のキュレーション物件はドラフトのサンプルデータです。最新の実在庫は外部ポータル（Bayut・Property Finder）と個別相談でご案内します。',
            en: 'The curated items shown are draft sample data. Live inventory is shared via the external portals (Bayut, Property Finder) and in private consultation.',
          },
        },
      ],
    },
    {
      slug: 'bayut',
      label: { ja: 'Bayut連携', en: 'Bayut' },
      title: { ja: 'Bayutで、市場全体を見る', en: 'See the whole market on Bayut' },
      tagline: {
        ja: 'UAE最大級のポータルで相場観を養い、JWDの目利きと突き合わせる。',
        en: 'Build a feel for pricing on one of the UAE’s largest portals — then check it against JWD’s judgement.',
      },
      image: IMG.bayut,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'Bayutは、UAE最大級の不動産ポータルです。エリア・価格・タイプで横断的に在庫を見渡せるため、相場観を養うのに最適。JWDは「Bayutで市場を俯瞰し、私たちが投資価値で絞る」という二段構えをおすすめしています。',
            en: 'Bayut is one of the largest property portals in the UAE. Its breadth across area, price and type makes it ideal for building a feel for the market. We recommend a two-step approach: survey the market on Bayut, then let us narrow it by investment merit.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '使い方', en: 'How to use it' },
          heading: { ja: 'ポータルを賢く使う', en: 'Use the portal well' },
          items: [
            {
              title: { ja: '相場のレンジを掴む', en: 'Grasp the price range' },
              text: {
                ja: '同一エリア・同一タイプの分布を見て、割高・割安の感覚を養います。',
                en: 'Scan the spread within one area and type to sense what is rich or cheap.',
              },
            },
            {
              title: { ja: '賃料の実勢を確認', en: 'Check live rents' },
              text: {
                ja: '売買だけでなく賃貸の掲載も見ることで、利回りの現実味を検証できます。',
                en: 'Reading the rental listings alongside sales grounds your yield assumptions in reality.',
              },
            },
            {
              title: { ja: '気になる物件をJWDへ', en: 'Bring candidates to JWD' },
              text: {
                ja: '気になる物件は私たちへ。デューデリと交渉、契約までを伴走します。',
                en: 'Send us the ones that catch your eye — we handle due diligence, negotiation and closing.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: 'Bayutを開く', en: 'Open Bayut' },
          note: {
            ja: 'リンクは外部サイトに移動します。',
            en: 'These links open an external site.',
          },
          items: [
            { label: { ja: 'Bayut ↗', en: 'Bayut ↗' }, url: 'https://www.bayut.com/' },
            { label: { ja: 'JWDに相談する', en: 'Talk to JWD' }, url: '/contact' },
          ],
        },
      ],
    },
    {
      slug: 'property-finder',
      label: { ja: 'Property Finder連携', en: 'Property Finder' },
      title: { ja: 'Property Finderで、裏取りする', en: 'Cross-check on Property Finder' },
      tagline: {
        ja: 'もう一つの主要ポータルで相場を確かめ、判断の精度を上げる。',
        en: 'Confirm pricing on a second major portal — and sharpen the precision of your decision.',
      },
      image: IMG.pf,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'Property Finderは、ドバイのもう一つの主要ポータルです。Bayutと併せて見ることで、掲載の偏りを補正し、相場観の精度が上がります。「二つのポータルで裏を取る」——これは私たちが投資家に必ず勧める習慣です。',
            en: 'Property Finder is Dubai’s other major portal. Reading it alongside Bayut corrects for listing bias and sharpens your feel for pricing. Cross-checking on two portals is a habit we recommend to every investor.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: 'なぜ二つ見るか', en: 'Why look at two' },
          heading: { ja: '裏取りの価値', en: 'The value of a second source' },
          items: [
            {
              title: { ja: '掲載の偏りを補正', en: 'Correct for bias' },
              text: {
                ja: 'ポータルごとに在庫や仲介が異なります。二つ見ることで全体像に近づきます。',
                en: 'Inventory and agents differ by portal; two views get you closer to the whole picture.',
              },
            },
            {
              title: { ja: '価格の妥当性を検証', en: 'Validate the price' },
              text: {
                ja: '同一物件・類似物件の掲載価格を突き合わせ、交渉余地を見極めます。',
                en: 'Compare list prices for the same and similar units to judge negotiating room.',
              },
            },
            {
              title: { ja: '最終判断はJWDと', en: 'Decide with JWD' },
              text: {
                ja: 'ポータルは入口。契約条件・引き渡し・運用の判断は私たちと一緒に。',
                en: 'Portals are the entry point; terms, handover and operation we decide together.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: 'Property Finderを開く', en: 'Open Property Finder' },
          note: {
            ja: 'リンクは外部サイトに移動します。',
            en: 'These links open an external site.',
          },
          items: [
            { label: { ja: 'Property Finder ↗', en: 'Property Finder ↗' }, url: 'https://www.propertyfinder.ae/' },
            { label: { ja: 'JWDに相談する', en: 'Talk to JWD' }, url: '/contact' },
          ],
        },
      ],
    },
  ],
};
