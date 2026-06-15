import type { Section } from '../types';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=2400&q=80',
  overview:
    'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=2400&q=80',
  mission:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80',
  vision:
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=80',
  leadership:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80',
  tomo:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2400&q=80',
};

export const about: Section = {
  slug: 'about',
  navKey: 'about',
  order: 2,
  image: IMG.hero,
  intro: {
    ja: 'JWDグループは、日本とドバイという二つの市場を母語で結ぶ、数少ない架け橋です。',
    en: 'JWD Group is the rare bridge that connects two markets — Japan and Dubai — in your own language.',
  },
  blurb: {
    ja: '会社概要、ミッション、ビジョン、経営陣、そして代表・川名のプロフィールまで。私たちの土台をご紹介します。',
    en: 'Company overview, mission, vision, leadership, and the story of our founder, Tomo Kawana — the foundations beneath everything we do.',
  },
  subsections: [
    {
      slug: 'company-overview',
      label: { ja: '会社概要', en: 'Company Overview' },
      title: { ja: 'JWDグループという会社', en: 'The JWD Group story' },
      tagline: {
        ja: '日本に根ざし、ドバイに広がる。一人の起業家の経験から生まれた架け橋。',
        en: 'Rooted in Japan, reaching across to Dubai — a bridge born from one entrepreneur’s lived experience.',
      },
      image: IMG.overview,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'JWDグループ（Japan WorldLink DWC）は、ドバイと日本の不動産・資産形成をつなぐクロスボーダー・アドバイザリーです。私たちは「物件を売る会社」ではなく、二つの市場を知り尽くした上で、お客様の資産が次の地平へ渡るための設計を行うパートナーを目指しています。',
            en: 'JWD Group (Japan WorldLink DWC) is a cross-border advisory linking real estate and wealth creation across Dubai and Japan. We are not a company that simply sells property — we are a partner that understands both markets intimately and designs the structures that carry your wealth to its next horizon.',
          },
        },
        {
          kind: 'prose',
          tone: 'light',
          kicker: { ja: '私たちの立ち位置', en: 'Where we stand' },
          heading: {
            ja: '二つの市場の、両方の言葉を話す',
            en: 'Fluent in both markets, in both languages',
          },
          body: [
            {
              ja: '多くの投資家にとって、海外不動産の最大の壁は「言葉」と「制度の違い」です。ドバイには魅力的な利回りと税制があり、日本には円安という追い風と成熟した市場があります。けれど、その両方を母語で、しかも一貫した視点で語れる事業者はほとんど存在しません。',
              en: 'For most investors, the biggest barriers to overseas property are language and unfamiliar systems. Dubai offers compelling yields and tax advantages; Japan offers a weak-yen tailwind and a mature market. Yet almost no firm can speak to both — in your own language, from a single coherent point of view.',
            },
            {
              ja: 'JWDは、まさにその空白を埋めるために生まれました。ドバイ法人設立、不動産取得、ファミリーオフィス設計から、日本側の資産・相続戦略まで。私たちは案件ごとに専門家を寄せ集めるのではなく、ひとつのチームとして横断的に伴走します。',
              en: 'JWD exists to close exactly that gap. From Dubai company formation, property acquisition and family-office design to Japan-side asset and succession strategy — we do not assemble a fresh set of specialists for every deal. We walk alongside you as one team, across both jurisdictions.',
            },
          ],
        },
        {
          kind: 'stats',
          tone: 'dark',
          kicker: { ja: '数字で見るJWD', en: 'JWD in numbers' },
          heading: { ja: '信頼の、その裏側にある実績', en: 'The record behind the trust' },
          items: [
            {
              value: 5,
              suffix: '+',
              label: { ja: 'ドバイでの活動年数', en: 'Years operating in Dubai' },
            },
            {
              value: 10,
              prefix: '¥',
              suffix: 'B+',
              label: { ja: '取引総額', en: 'Transaction volume' },
            },
            {
              value: 120,
              suffix: '+',
              label: { ja: '支援した投資家・家族', en: 'Investors & families advised' },
            },
            {
              value: 2,
              label: { ja: '結ぶ市場', en: 'Markets bridged' },
            },
          ],
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: '事業領域', en: 'What we do' },
          heading: { ja: '一つの窓口で、すべてを', en: 'One desk for everything' },
          items: [
            {
              icon: 'building',
              title: { ja: 'ドバイ不動産', en: 'Dubai Real Estate' },
              text: {
                ja: '投資価値で厳選した物件のキュレーション、取得から賃貸運用までの伴走。',
                en: 'Curated properties selected for investment merit, with hands-on support from acquisition through rental management.',
              },
            },
            {
              icon: 'key',
              title: { ja: '法人・ビザ設計', en: 'Company & Visa Structuring' },
              text: {
                ja: 'フリーゾーン法人設立、ゴールデンビザ、エミレーツIDまでワンストップで。',
                en: 'Free-zone company formation, Golden Visa and Emirates ID — handled end to end.',
              },
            },
            {
              icon: 'shield',
              title: { ja: 'ファミリーオフィス', en: 'Family Office' },
              text: {
                ja: '資産保全、事業承継、相続を国境を越えて設計する富裕層向けの中核機能。',
                en: 'Asset protection, succession and inheritance designed across borders — our core offering for HNW families.',
              },
            },
            {
              icon: 'sprout',
              title: { ja: '日本不動産', en: 'Japan Real Estate' },
              text: {
                ja: '円安局面を活かした、海外投資家のための日本不動産・空き家再生の機会提供。',
                en: 'Japan property and akiya-revival opportunities for overseas investors, leveraging the weak-yen window.',
              },
            },
          ],
        },
        {
          kind: 'split',
          tone: 'deep',
          reverse: true,
          image: IMG.leadership,
          imageAlt: { ja: 'JWDのチーム', en: 'The JWD team' },
          kicker: { ja: 'ひとつのチーム', en: 'One team' },
          heading: { ja: '案件ごとに専門家を、寄せ集めない', en: 'We don’t reassemble a team for every deal' },
          body: [
            {
              ja: '不動産、法人・ビザ、ファミリーオフィス、日本側の資産戦略まで——本来は別々の専門家に渡る領域を、JWDはひとつのチームとして横断的に扱います。窓口は常に一つ。判断の文脈が、人から人へこぼれ落ちることはありません。',
              en: 'Property, company and visa, family office, Japan-side strategy — domains that usually pass between separate specialists are handled by JWD as one team. One point of contact, always; context never falls through the cracks between hands.',
            },
          ],
          bullets: [
            { ja: 'クロスボーダーを一貫した視点で', en: 'Cross-border, from one viewpoint' },
            { ja: '日本語・英語の両対応', en: 'Fluent in Japanese and English' },
            { ja: '取得後の運用まで伴走', en: 'Alongside you, through operation' },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '所在地', en: 'Where to find us' },
          text: {
            ja: 'Japan WorldLink DWC Group ／ 名古屋市中区丸の内2-17-13 NK丸の内ビル2F。ドバイ（DWC・各フリーゾーン）にも拠点を構え、二つの時間帯で動きます。',
            en: 'Japan WorldLink DWC Group — NK Marunouchi Bldg. 2F, 2-17-13 Marunouchi, Naka-ku, Nagoya, Aichi, Japan. With a Dubai presence (DWC and the free zones), we operate across two time zones.',
          },
        },
      ],
    },
    {
      slug: 'mission',
      label: { ja: 'ミッション', en: 'Mission' },
      title: { ja: '私たちの使命', en: 'Our mission' },
      tagline: {
        ja: '海外投資を、一部の人だけのものから、正しく備えた人すべてのものへ。',
        en: 'To turn overseas investment from the privilege of a few into the right of everyone who prepares well.',
      },
      image: IMG.mission,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: '私たちの使命は、国境によって生まれる「情報の非対称」をなくすことです。正しい知識と、信頼できる伴走者さえあれば、日本の投資家もドバイの機会に等しく手を伸ばせる——その確信が、JWDのすべての行動の起点です。',
            en: 'Our mission is to dissolve the information asymmetry that borders create. With the right knowledge and a trustworthy guide, a Japanese investor can reach Dubai’s opportunities as readily as anyone — that conviction is the starting point of everything JWD does.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '使命を支える三つの約束', en: 'Three promises behind the mission' },
          heading: { ja: 'リード・信頼・教育', en: 'Leads, trust, education' },
          items: [
            {
              title: { ja: 'リードを生む', en: 'Generate leads' },
              text: {
                ja: 'ドバイ・日本の不動産購入者、ファミリーオフィスの顧客、ファンド投資家——本当に必要としている人へ、機会を届けます。',
                en: 'We connect real opportunity to the people who genuinely need it: Dubai and Japan property buyers, family-office clients, and fund investors.',
              },
            },
            {
              title: { ja: '信頼を築く', en: 'Build trust' },
              text: {
                ja: '実取引データ、価格推移、利回り、ビザ情報、そして代表自身のポートフォリオまで開示する。透明性こそ最大の差別化です。',
                en: 'Real transaction data, price history, yields, visa information — and our founder’s own portfolio. Transparency is our strongest differentiator.',
              },
            },
            {
              title: { ja: '投資家を育てる', en: 'Educate investors' },
              text: {
                ja: 'なぜドバイか、なぜ日本か。税制、相続、ビザ、為替——判断に必要な知識を、惜しみなく共有します。',
                en: 'Why Dubai, why Japan; tax, inheritance, visas, currency — we share, generously, the knowledge needed to decide.',
              },
            },
          ],
        },
        {
          kind: 'quote',
          tone: 'dark',
          text: {
            ja: '「売ること」ではなく「正しく判断できる状態にすること」。それが私たちの仕事だと考えています。',
            en: 'Our job is not to sell — it is to put you in a position to decide well.',
          },
          by: { ja: '川名 智 (Tomo Kawana)', en: 'Tomo Kawana' },
          role: { ja: 'JWDグループ 代表', en: 'Representative, JWD Group' },
        },
      ],
    },
    {
      slug: 'vision',
      label: { ja: 'ビジョン', en: 'Vision' },
      title: { ja: '私たちが描く未来', en: 'The future we are building' },
      tagline: {
        ja: '日本とドバイをつなぐ、世界で最も信頼されるクロスボーダー資産プラットフォームへ。',
        en: 'To become the most trusted cross-border wealth platform between Japan and Dubai.',
      },
      image: IMG.vision,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'JWDが目指すのは、単なる不動産仲介ではありません。「川名の個人ブランド × ファミリーオフィス × AI投資アドバイザー × 日本・ドバイのクロスボーダー資産設計」——この組み合わせは市場でも極めて稀であり、私たちはそれをひとつのプラットフォームへと育てていきます。',
            en: 'JWD aims to be far more than a brokerage. “Tomo’s personal brand × family office × an AI investment advisor × Japan–Dubai cross-border wealth planning” — a combination that is exceptionally rare in the market, and one we are growing into a single platform.',
          },
        },
        {
          kind: 'steps',
          tone: 'light',
          kicker: { ja: '段階的な進化', en: 'A staged evolution' },
          heading: { ja: 'プラットフォームへの道', en: 'The road to a platform' },
          items: [
            {
              title: { ja: 'フェーズ1 — 基盤', en: 'Phase 1 — Foundation' },
              text: {
                ja: 'ホーム、会社概要、なぜドバイ、ドバイ不動産、ハート・オブ・ヨーロッパ、問い合わせ。信頼の土台を築きます。',
                en: 'Home, About, Why Dubai, Dubai Properties, Heart of Europe and Contact — laying the foundation of trust.',
              },
            },
            {
              title: { ja: 'フェーズ2 — ツール', en: 'Phase 2 — Tools' },
              text: {
                ja: '投資シミュレーター、ナレッジセンター、投資ファンド。判断を支える道具を整えます。',
                en: 'Investment Simulator, Knowledge Center and Investment Funds — the tools that support each decision.',
              },
            },
            {
              title: { ja: 'フェーズ3 — 拡張', en: 'Phase 3 — Expansion' },
              text: {
                ja: 'ファミリーオフィス、日本不動産、AI物件アドバイザー、物件マッチングエンジンへ。',
                en: 'Family Office, Japan Properties, an AI property advisor and a matching engine.',
              },
            },
            {
              title: { ja: '将来 — B2Bへ', en: 'Future — Toward B2B' },
              text: {
                ja: '月額サブスクリプションで全国500社の不動産企業をつなぐ、B2Bプラットフォームへと発展させます。',
                en: 'A subscription model connecting 500 Japanese real-estate firms — evolving JWD into a B2B platform.',
              },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '差別化の本質', en: 'The real differentiator' },
          text: {
            ja: '差別化の源泉は物件リストではありません。「川名の個人ブランド＋ファミリーオフィス＋AI投資アドバイザー＋日本・ドバイの越境資産設計」——この稀有な組み合わせこそが、JWDをプレミアムなプラットフォームへ押し上げます。',
            en: 'The differentiator is not the property listings. It is “Tomo’s personal brand + family office + AI investment advisor + Japan–Dubai cross-border wealth planning” — a rare combination that lifts JWD into a premium platform.',
          },
        },
      ],
    },
    {
      slug: 'leadership',
      label: { ja: '経営陣', en: 'Leadership' },
      title: { ja: '私たちを率いる人々', en: 'The people who lead us' },
      tagline: {
        ja: '机上の理論ではなく、自らの資金と経験で語れるチーム。',
        en: 'A team that speaks from its own capital and experience — not from theory.',
      },
      image: IMG.leadership,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'JWDの経営陣に共通するのは、「自分が実際に投資し、住み、経験したこと」だけを語るという姿勢です。だからこそ私たちのアドバイスには、パンフレットには載らない手触りがあります。',
            en: 'What the JWD leadership shares is a single discipline: we speak only of what we have actually invested in, lived through and experienced. That is why our advice carries a texture you will not find in any brochure.',
          },
        },
        {
          kind: 'cards',
          tone: 'light',
          kicker: { ja: 'リーダーシップ', en: 'Leadership' },
          heading: { ja: '伴走する専門領域', en: 'How our expertise is organised' },
          items: [
            {
              title: { ja: '代表 / 投資戦略', en: 'Founder / Investment Strategy' },
              meta: { ja: '川名 智', en: 'Tomo Kawana' },
              text: {
                ja: 'ドバイ・ハートオブヨーロッパへの個人投資家。日本とドバイをつなぐ全体戦略を統括します。',
                en: 'A personal investor in Dubai’s Heart of Europe, leading the overarching Japan–Dubai strategy.',
              },
            },
            {
              title: { ja: '法人・コンプライアンス', en: 'Corporate & Compliance' },
              meta: { ja: 'UAE法務ネットワーク', en: 'UAE legal network' },
              text: {
                ja: 'フリーゾーン・メインランドの設立、ビザ、税務登録をUAE当局との深いネットワークで支えます。',
                en: 'Free-zone and mainland formation, visas and tax registration — backed by deep ties with UAE authorities.',
              },
            },
            {
              title: { ja: 'ファミリーオフィス', en: 'Family Office' },
              meta: { ja: '資産・承継設計', en: 'Wealth & succession' },
              text: {
                ja: '多国籍の資産保全と事業承継を、日本とドバイの双方の制度を踏まえて設計します。',
                en: 'Multi-jurisdiction asset protection and succession, designed across both Japanese and Emirati systems.',
              },
            },
          ],
        },
        {
          kind: 'quote',
          tone: 'dark',
          text: {
            ja: '理論を教える人は多い。自分の資金を賭けて検証した人は少ない。私たちは後者でありたい。',
            en: 'Many people will teach you theory. Few have tested it with their own capital. We choose to be the latter.',
          },
          by: { ja: 'JWDグループ 経営陣', en: 'JWD Group Leadership' },
        },
      ],
    },
    {
      slug: 'tomo-kawana',
      label: { ja: '代表プロフィール', en: 'Founder Profile' },
      title: { ja: '川名 智という投資家', en: 'Tomo Kawana, the investor' },
      tagline: {
        ja: 'ドバイに住み、ドバイに投資し、子をドバイで育てた。語る資格は、暮らしの中にある。',
        en: 'He lives in Dubai, invests in Dubai, raised his children in Dubai. His authority comes from his life.',
      },
      image: IMG.tomo,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'JWDの中心には、常に川名智の存在があります。彼は「ドバイ投資を勧める人」ではなく、「ドバイに人生の軸足を置いた人」です。ハート・オブ・ヨーロッパへの個人投資、現地での子育て、日々の市場との対話——その一次体験のすべてが、JWDの助言の裏付けになっています。',
            en: 'At the center of JWD, always, is Tomo Kawana. He is not someone who recommends Dubai investment — he is someone who has placed the axis of his life in Dubai. A personal investor in the Heart of Europe, raising his children there, in daily dialogue with the market: every piece of that first-hand experience underwrites JWD’s advice.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: '実体験の軌跡', en: 'A track of lived experience' },
          heading: { ja: '机上ではなく、現場から', en: 'From the field, not the desk' },
          items: [
            {
              title: { ja: 'ハート・オブ・ヨーロッパへの個人投資', en: 'Personal stake in the Heart of Europe' },
              text: {
                ja: 'ドバイ沖「ザ・ワールド」の旗艦プロジェクトに、自らの資金を投じる当事者として関わっています。',
                en: 'A personal capital stake in the flagship project off Dubai’s coast — an owner, not a spectator.',
              },
            },
            {
              title: { ja: 'ドバイでの生活と子育て', en: 'Living and raising a family in Dubai' },
              text: {
                ja: '教育、住まい、コミュニティ——「ドバイに住む」現実を、家族として日々経験しています。',
                en: 'Schools, housing, community — the reality of living in Dubai, experienced daily as a family.',
              },
            },
            {
              title: { ja: '失敗から学んだ教訓', en: 'Lessons learned from mistakes' },
              text: {
                ja: '成功談だけでなく、避けるべき失敗も語る。その誠実さが投資家の信頼を生んでいます.',
                en: 'He shares not only successes but the mistakes to avoid — and that honesty is what earns investors’ trust.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: 'もっと知る', en: 'Go deeper' },
          note: {
            ja: '川名のストーリーと、旗艦プロジェクトの詳細はこちらから。',
            en: 'Explore Tomo’s stories and the flagship project he invests in.',
          },
          items: [
            { label: { ja: '川名のストーリー', en: 'Tomo’s Stories' }, url: '/stories' },
            { label: { ja: 'ハート・オブ・ヨーロッパ', en: 'Heart of Europe' }, url: '/heart-of-europe' },
          ],
        },
      ],
    },
  ],
};
