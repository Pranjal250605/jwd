import type { Section } from '../types';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=80',
  world:
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=80',
  project:
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80',
  types:
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=2400&q=80',
  rental:
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2400&q=80',
  capital:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=80',
  tomo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2400&q=80',
  videos:
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2400&q=80',
  faq: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80',
};

const WORLD_URL = 'https://theworld-dubai.com/';
const VISIT_URL =
  'https://www.visitdubai.com/en/places-to-visit/the-world-islands';
const HOE_URL = 'https://theheartofeurope.emirates.expert/';

export const heartOfEurope: Section = {
  slug: 'heart-of-europe',
  navKey: 'heartOfEurope',
  order: 5,
  image: IMG.hero,
  intro: {
    ja: 'ドバイ沖4キロ、人工島群「ザ・ワールド」の中心に、ヨーロッパが立ち上がる。JWDの旗艦プロジェクト、ハート・オブ・ヨーロッパ。',
    en: 'Four kilometres off the Dubai coast, at the heart of the man-made archipelago “The World,” a Europe is rising — JWD’s flagship project, the Heart of Europe.',
  },
  blurb: {
    ja: 'ザ・ワールドとは何か。ハート・オブ・ヨーロッパとは何か。物件タイプ、利回り、資産価値、そして川名自身の体験まで。',
    en: 'What The World is, what the Heart of Europe is — property types, returns, appreciation, and Tomo’s own first-hand experience.',
  },
  subsections: [
    {
      slug: 'the-world',
      label: { ja: 'ザ・ワールド諸島', en: 'The World Islands' },
      title: { ja: '海の上に描かれた、世界地図', en: 'A map of the world, drawn on the sea' },
      tagline: {
        ja: '300の人工島が描く世界地図。地球上で、ここにしかない舞台。',
        en: 'Three hundred man-made islands tracing a map of the world — a stage that exists nowhere else on earth.',
      },
      image: IMG.world,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: '「ザ・ワールド」は、ドバイ沖に造られた約300の人工島からなる群島です。上空から見ると、それは海の上に描かれた世界地図そのもの。各島が国や地域を象り、その中心に位置するのが、ヨーロッパをテーマにした開発——ハート・オブ・ヨーロッパです。',
            en: '“The World” is an archipelago of roughly 300 man-made islands built off the Dubai coast. Seen from above, it is a map of the world itself, drawn on the sea — each island shaped like a country or region. At its centre sits a Europe-themed development: the Heart of Europe.',
          },
        },
        {
          kind: 'split',
          tone: 'light',
          image: IMG.world,
          imageAlt: { ja: '上空から見たザ・ワールド諸島', en: 'The World Islands, seen from above' },
          kicker: { ja: '海に描かれた地図', en: 'A map drawn on the sea' },
          heading: { ja: '再生産できない、海上の地形', en: 'A geography that cannot be remade' },
          body: [
            {
              ja: '一度きりの埋め立てで生まれた島々は、増やすことができません。だからこそ希少であり、所有そのものが物語になります。その中心に位置するハート・オブ・ヨーロッパは、この物語の主役です。',
              en: 'Born from a one-time act of reclamation, these islands cannot be multiplied. That scarcity is the point — ownership itself becomes a story, with the Heart of Europe at its centre.',
            },
          ],
          bullets: [
            { ja: '約300の人工島', en: 'Roughly 300 man-made islands' },
            { ja: '海上という唯一の立地', en: 'A singular over-water setting' },
            { ja: 'ドバイを象徴するランドマーク', en: 'An icon of Dubai' },
          ],
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '稀少性の源泉', en: 'Where the scarcity comes from' },
          heading: { ja: 'なぜ唯一無二か', en: 'Why it is one of a kind' },
          items: [
            {
              title: { ja: '有限な人工島', en: 'A finite set of islands' },
              text: {
                ja: '島の数は限られ、再生産できません。希少性そのものが資産価値の核になります.',
                en: 'The islands are finite and cannot be reproduced — scarcity itself sits at the core of value.',
              },
            },
            {
              title: { ja: '海に浮かぶ立地', en: 'Floating on the sea' },
              text: {
                ja: '陸の不動産にはない、海上という体験価値が需要を支えます。',
                en: 'An over-the-water setting offers an experience no land asset can, sustaining demand.',
              },
            },
            {
              title: { ja: '世界的な認知', en: 'Global recognition' },
              text: {
                ja: 'ドバイを象徴するランドマークとして、国際的な知名度を持ちます。',
                en: 'As an icon of Dubai, it carries genuine international recognition.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: '公式情報', en: 'Official sources' },
          note: { ja: 'リンクは外部サイトに移動します。', en: 'These links open external sites.' },
          items: [
            { label: { ja: 'The World 公式 ↗', en: 'The World official ↗' }, url: WORLD_URL },
            { label: { ja: 'Visit Dubai ↗', en: 'Visit Dubai ↗' }, url: VISIT_URL },
          ],
        },
      ],
    },
    {
      slug: 'project',
      label: { ja: 'プロジェクト概要', en: 'The Project' },
      title: { ja: 'ハート・オブ・ヨーロッパ', en: 'The Heart of Europe' },
      tagline: {
        ja: '六つの島に、ヨーロッパの情緒を再構築する旗艦リゾート開発。',
        en: 'A flagship resort across six islands, rebuilding the spirit of Europe on the water.',
      },
      image: IMG.project,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパは、ザ・ワールドの中心に位置する旗艦リゾート開発です。複数の島にホテル、ヴィラ、レジデンスが配され、ヨーロッパの街並みと地中海の情緒を再構築します。JWD代表・川名が個人として投資する、私たちの象徴的プロジェクトです。',
            en: 'The Heart of Europe is the flagship resort development at the centre of The World. Across multiple islands it arranges hotels, villas and residences, recreating the streetscapes of Europe and the spirit of the Mediterranean. It is the symbolic project in which JWD’s founder, Tomo, personally invests.',
          },
        },
        {
          kind: 'cards',
          tone: 'light',
          kicker: { ja: '構成', en: 'Composition' },
          heading: { ja: '島ごとに異なる世界', en: 'A different world on each island' },
          items: [
            {
              icon: 'building',
              title: { ja: 'ホスピタリティ', en: 'Hospitality' },
              text: {
                ja: 'ホテル運営を前提とした設計で、所有者は運用収益を享受できます。',
                en: 'Designed around hotel operation, owners can share in the operating income.',
              },
            },
            {
              icon: 'home',
              title: { ja: 'プライベート・レジデンス', en: 'Private residences' },
              text: {
                ja: '海に面した居住空間。別荘としても、運用資産としても機能します。',
                en: 'Sea-facing homes that work as a retreat or as a managed income asset.',
              },
            },
            {
              icon: 'sparkles',
              title: { ja: '体験型インフラ', en: 'Experiential infrastructure' },
              text: {
                ja: '気候演出やビーチ、施設群が滞在体験を高め、稼働を支えます。',
                en: 'Climate features, beaches and amenities raise the guest experience and support occupancy.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: 'プロジェクト公式', en: 'Project site' },
          items: [
            { label: { ja: 'Heart of Europe ↗', en: 'Heart of Europe ↗' }, url: HOE_URL },
            { label: { ja: '物件タイプを見る', en: 'See property types' }, url: '/heart-of-europe/property-types' },
          ],
        },
      ],
    },
    {
      slug: 'property-types',
      label: { ja: '物件タイプ', en: 'Property Types' },
      title: { ja: 'ホテル、ヴィラ、レジデンス', en: 'Hotels, villas, residences' },
      tagline: {
        ja: '三つの所有の形。運用益か、利用価値か、その両方か。',
        en: 'Three ways to own — for income, for enjoyment, or for both.',
      },
      image: IMG.types,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパには、性格の異なる三つの所有の形があります。運用益を重視するホテル、利用価値と希少性を兼ね備えるヴィラ、その中間に位置するレジデンス。目的に応じて選び分けることが、満足度の高い投資につながります。',
            en: 'The Heart of Europe offers three distinct ways to own. Hotels emphasise operating income; villas combine use value with scarcity; residences sit in between. Choosing by purpose is what makes for a satisfying investment.',
          },
        },
        {
          kind: 'tabs',
          tone: 'light',
          kicker: { ja: '三つのタイプ', en: 'Three types' },
          heading: { ja: '所有の形を、切り替えて見る', en: 'Switch between the ways to own' },
          items: [
            {
              tab: { ja: 'ホテル', en: 'Hotels' },
              title: { ja: 'ホテル — 運用益を重視', en: 'Hotels — income-led' },
              metric: { value: '6–8%', label: { ja: '想定稼働収益', en: 'Target operating yield' } },
              text: {
                ja: 'プロ運営による安定稼働を前提に、賃貸運用の手間を抑えて収益を狙えます。観光需要に連動した、ホスピタリティならではの利回りです。',
                en: 'Professional operation aims at stable occupancy and income with minimal owner effort — a hospitality yield that tracks tourism demand.',
              },
              bullets: [
                { ja: 'プロによるホスピタリティ運用', en: 'Professionally operated hospitality' },
                { ja: '所有者の手間は最小限', en: 'Minimal owner effort' },
                { ja: '観光需要に連動した収益', en: 'Income tied to tourism demand' },
              ],
            },
            {
              tab: { ja: 'ヴィラ', en: 'Villas' },
              title: { ja: 'ヴィラ — 希少性を重視', en: 'Villas — scarcity-led' },
              metric: { value: '★★★', label: { ja: '希少性', en: 'Scarcity' } },
              text: {
                ja: '海上の独立した住空間。数が限られるからこそ希少性が高く、資産価値の保全に向きます。利用の満足と所有の誇りが両立します。',
                en: 'Standalone homes on the water. Because numbers are finite, scarcity runs high — well suited to preserving value, with the pride of true ownership.',
              },
              bullets: [
                { ja: '海上の独立した住空間', en: 'A standalone over-water home' },
                { ja: '固定された供給＝高い希少性', en: 'Fixed supply, high scarcity' },
                { ja: '資産価値の保全に有利', en: 'Strong for preserving value' },
              ],
            },
            {
              tab: { ja: 'レジデンス', en: 'Residences' },
              title: { ja: 'レジデンス — バランス型', en: 'Residences — balanced' },
              metric: { value: '50 / 50', label: { ja: '利用と運用', en: 'Use & income' } },
              text: {
                ja: '利用と運用の両立。別荘としての滞在と、賃貸による収益のバランスを取りたい方に最適です。',
                en: 'Use and income in balance — ideal for those who want both a retreat to stay in and a return from letting.',
              },
              bullets: [
                { ja: '別荘利用と賃貸収益の両立', en: 'A retreat and a return, together' },
                { ja: '柔軟な運用の選択肢', en: 'Flexible operating options' },
                { ja: '入門に適したバランス', en: 'A balanced entry point' },
              ],
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '選び方の相談を', en: 'Let us help you choose' },
          text: {
            ja: 'どのタイプが目的に合うかは、保有期間・運用方針・税務の前提で変わります。川名の一次体験を踏まえて個別にご案内します。',
            en: 'Which type fits depends on horizon, operating plan and tax assumptions. We advise individually, grounded in Tomo’s first-hand experience.',
          },
        },
      ],
    },
    {
      slug: 'rental-returns',
      label: { ja: '賃貸収益', en: 'Rental Returns' },
      title: { ja: '海上の資産が、生む収益', en: 'The income an over-water asset can generate' },
      tagline: {
        ja: 'リゾート運用ならではの稼働。ホスピタリティ収益という新しい利回り。',
        en: 'Occupancy unique to resort operation — hospitality income as a new kind of yield.',
      },
      image: IMG.rental,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパの収益は、一般的な長期賃貸とは性格が異なります。リゾート・ホスピタリティとしての運用が前提となり、観光需要と体験価値が稼働を支えます。プロの運営者による管理は、所有者の手間を抑えながら収益機会を広げます。',
            en: 'Income at the Heart of Europe differs in character from ordinary long-term letting. Operation is built around resort hospitality, where tourism demand and experience value drive occupancy. Professional management widens the income opportunity while reducing the owner’s burden.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: '収益の構造', en: 'How income forms' },
          heading: { ja: 'ホスピタリティ利回りの源泉', en: 'Sources of hospitality yield' },
          items: [
            {
              title: { ja: '観光需要', en: 'Tourism demand' },
              text: { ja: '世界中から訪れる観光客が、リゾートの稼働を底支えします。', en: 'Visitors from around the world underpin resort occupancy.' },
            },
            {
              title: { ja: '体験価値', en: 'Experience value' },
              text: { ja: '海上という唯一性が単価を高め、収益の質を引き上げます。', en: 'The singular over-water setting lifts rates and the quality of income.' },
            },
            {
              title: { ja: 'プロ運営', en: 'Professional operation' },
              text: { ja: '運営者による管理で、所有者は手間を抑えつつ収益を享受できます。', en: 'Managed operation lets owners earn while keeping effort low.' },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '具体的な数字は個別に', en: 'Real numbers, shared privately' },
          text: {
            ja: '想定稼働・賃料・運用フィーは島や物件で異なります。実際の収益シナリオは投資シミュレーターと相談で試算します。',
            en: 'Assumed occupancy, rate and fees vary by island and unit. We model the actual scenarios in the simulator and in consultation.',
          },
        },
      ],
    },
    {
      slug: 'capital-appreciation',
      label: { ja: '資産価値の成長', en: 'Capital Appreciation' },
      title: { ja: '希少性が、価値を押し上げる', en: 'Scarcity that lifts value' },
      tagline: {
        ja: '再生産できない海上の島々。供給が限られるからこそ、資産価値の物語がある。',
        en: 'Islands that cannot be reproduced — and because supply is finite, a story of appreciation.',
      },
      image: IMG.capital,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパの資産価値を語る上で外せないのが「希少性」です。海上の人工島は数が限られ、再生産できません。供給が増えない一方で、ドバイの認知と観光需要が高まれば、資産価値の上昇余地が生まれます。',
            en: 'Any discussion of value at the Heart of Europe must begin with scarcity. The over-water islands are finite and cannot be reproduced. As supply stays fixed while Dubai’s recognition and tourism rise, room for appreciation emerges.',
          },
        },
        {
          kind: 'chart',
          tone: 'deep',
          kicker: { ja: '価値の推移', en: 'Value trajectory' },
          heading: { ja: '海上資産の価値指数（参考・2021 = 100）', en: 'Over-water asset value index (illustrative, 2021 = 100)' },
          chart: {
            type: 'line',
            points: [
              { label: { ja: '’21', en: '’21' }, value: 100 },
              { label: { ja: '’22', en: '’22' }, value: 121 },
              { label: { ja: '’23', en: '’23' }, value: 144 },
              { label: { ja: '’24', en: '’24' }, value: 162 },
              { label: { ja: '’25', en: '’25' }, value: 178 },
              { label: { ja: '’26', en: '’26' }, value: 190 },
            ],
          },
          note: {
            ja: '※ 希少性を象徴する参考指数です。確定値はご相談ください。',
            en: '※ An illustrative index expressing scarcity. Verified figures on request.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '価値を支える力', en: 'Forces behind value' },
          heading: { ja: '上昇余地の論理', en: 'The logic of upside' },
          items: [
            {
              title: { ja: '固定された供給', en: 'Fixed supply' },
              text: { ja: '島は増えない。希少性が下値を支え、上値の余地を生みます。', en: 'No new islands — scarcity supports the floor and opens upside.' },
            },
            {
              title: { ja: 'ブランド開発', en: 'Branded development' },
              text: { ja: '統一されたコンセプトとブランドが、長期の価値認識を高めます。', en: 'A unified concept and brand lift long-run perceptions of value.' },
            },
            {
              title: { ja: 'ドバイの成長', en: 'Dubai’s growth' },
              text: { ja: '都市そのものの成長が、象徴的資産の価値を引き上げます。', en: 'The city’s own growth raises the value of its iconic assets.' },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: 'リスクも正直に', en: 'Honest about risk' },
          text: {
            ja: '開発型・海上立地ならではのリスク（工程・運営・流動性）も存在します。JWDは上振れと同じ熱量でリスクを共有します。',
            en: 'Development and over-water assets carry their own risks — schedule, operation, liquidity. JWD shares the risks with the same candour as the upside.',
          },
        },
      ],
    },
    {
      slug: 'tomo-experience',
      label: { ja: '川名の体験', en: 'Tomo’s Experience' },
      title: { ja: '当事者として、語れること', en: 'What an owner can tell you' },
      tagline: {
        ja: '川名は、このプロジェクトに自ら投資している。だから語れる、現場の手触り。',
        en: 'Tomo invests in this project himself — which is why he can speak to its texture, first-hand.',
      },
      image: IMG.tomo,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパについて、JWDが最も価値を提供できる理由——それは代表・川名が当事者だからです。パンフレットの数字ではなく、実際に投資し、現地を歩き、運営と向き合った人間の視点で、良い面も難しい面もお伝えします。',
            en: 'The reason JWD can add the most value on the Heart of Europe is simple: our founder is an owner. Not brochure figures, but the perspective of someone who has actually invested, walked the site and dealt with operation — sharing both the good and the difficult.',
          },
        },
        {
          kind: 'quote',
          tone: 'dark',
          text: {
            ja: '海の上の不動産は、数字だけでは語れない。実際に持って、初めて見えるものがある。',
            en: 'Property on the sea cannot be told in numbers alone. Some things only become visible once you actually own it.',
          },
          by: { ja: '川名 智 (Tomo Kawana)', en: 'Tomo Kawana' },
          role: { ja: 'JWDグループ 代表', en: 'Representative, JWD Group' },
        },
        {
          kind: 'links',
          tone: 'light',
          heading: { ja: 'もっと知る', en: 'Go deeper' },
          items: [
            { label: { ja: '川名のストーリー', en: 'Tomo’s Stories' }, url: '/stories' },
            { label: { ja: 'よくある質問', en: 'FAQ' }, url: '/heart-of-europe/faq' },
          ],
        },
      ],
    },
    {
      slug: 'videos',
      label: { ja: '動画', en: 'Videos' },
      title: { ja: '映像で、島を歩く', en: 'Walk the islands, in film' },
      tagline: {
        ja: '言葉では伝わらない海上のスケールを、映像で。順次公開予定。',
        en: 'The scale of the islands is hard to put in words — so we put it on film. Coming soon.',
      },
      image: IMG.videos,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: '海の上に広がるスケールは、写真や文章だけでは伝わりきりません。川名による現地ツアーやプロジェクト紹介の映像を、順次このページで公開していきます。',
            en: 'The scale spread across the sea is hard to convey in stills or text alone. We will publish films here over time — site tours and project walkthroughs led by Tomo.',
          },
        },
        {
          kind: 'cards',
          tone: 'dark',
          kicker: { ja: '近日公開', en: 'In the pipeline' },
          heading: { ja: '公開予定の映像シリーズ', en: 'The film series to come' },
          items: [
            { icon: 'map', title: { ja: '現地ツアー', en: 'On-site tour' }, meta: { ja: '近日', en: 'Soon' }, text: { ja: '川名が案内する島めぐり。海上の街並みを歩きながら、各島の性格を解説します。', en: 'An island tour led by Tomo — walking the over-water streets and reading each island’s character.' } },
            { icon: 'building', title: { ja: 'プロジェクト紹介', en: 'Project overview' }, meta: { ja: '近日', en: 'Soon' }, text: { ja: '開発コンセプトと全体像を、設計図と映像で立体的に紹介します。', en: 'The development concept and master plan, brought to life in film and renderings.' } },
            { icon: 'users', title: { ja: 'オーナーの声', en: 'Owner voices' }, meta: { ja: '近日', en: 'Soon' }, text: { ja: '実際に投資した当事者が、判断の理由と体験を率直に語ります。', en: 'Real owners, candidly sharing why they invested and what the experience has been.' } },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '公開のお知らせを受け取る', en: 'Be notified when films go live' },
          text: {
            ja: '映像の公開や現地ツアーの案内をご希望の方は、お問い合わせよりご連絡ください。',
            en: 'To be notified of new films and site tours, reach out via the contact page.',
          },
        },
      ],
    },
    {
      slug: 'faq',
      label: { ja: 'よくある質問', en: 'FAQ' },
      title: { ja: '気になることに、答える', en: 'Answers to what you are wondering' },
      tagline: {
        ja: '海上不動産だからこそ生まれる疑問に、当事者の視点で。',
        en: 'The questions that an over-water asset naturally raises — answered from an owner’s view.',
      },
      image: IMG.faq,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ハート・オブ・ヨーロッパは特別な不動産だからこそ、特有の疑問が生まれます。代表的なものに、当事者の視点でお答えします。個別のご質問は、いつでもお問い合わせください。',
            en: 'Because the Heart of Europe is an unusual asset, it raises unusual questions. Here are answers to the most common ones, from an owner’s perspective — and you can always ask us anything specific.',
          },
        },
        {
          kind: 'faq',
          tone: 'light',
          kicker: { ja: 'FAQ', en: 'FAQ' },
          heading: { ja: 'よくある質問', en: 'Frequently asked' },
          items: [
            {
              q: { ja: '外国人でも所有できますか？', en: 'Can foreigners own here?' },
              a: { ja: 'はい。ドバイのフリーホールド制度のもとで外国人の所有が可能です。詳細は個別にご案内します。', en: 'Yes — foreign ownership is possible under Dubai’s freehold framework. We advise on the specifics individually.' },
            },
            {
              q: { ja: '運用は誰が行いますか？', en: 'Who operates the property?' },
              a: { ja: 'ホスピタリティ運用は専門の運営者が担う設計が中心です。所有者の手間は抑えられます。', en: 'Hospitality operation is typically handled by professional operators, keeping the owner’s effort low.' },
            },
            {
              q: { ja: '途中で売却できますか？', en: 'Can I sell before completion or later?' },
              a: { ja: '流動性は一般的な市街地物件と性格が異なります。出口戦略は取得前に一緒に設計します。', en: 'Liquidity differs from typical urban property. We design the exit strategy with you before you buy.' },
            },
            {
              q: { ja: 'リスクは何ですか？', en: 'What are the risks?' },
              a: { ja: '開発工程・運営・流動性などのリスクがあります。JWDは上振れと同様にリスクも開示します。', en: 'Schedule, operation and liquidity risks all exist. JWD discloses risk as openly as upside.' },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: '相談する', en: 'Talk to us' },
          items: [
            { label: { ja: '無料相談を予約', en: 'Book a consultation' }, url: '/contact' },
            { label: { ja: 'プロジェクト概要に戻る', en: 'Back to the project' }, url: '/heart-of-europe/project' },
          ],
        },
      ],
    },
  ],
};
