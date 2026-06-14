import type { Section } from '../types';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=80',
  equity:
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=2400&q=80',
  aix: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=2400&q=80',
  governance:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80',
  risk: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80',
  crowd:
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80',
};

export const funds: Section = {
  slug: 'funds',
  navKey: 'funds',
  order: 6,
  image: IMG.hero,
  intro: {
    ja: '不動産だけが、資産形成ではない。規制下のファンドを通じて、グローバルな投資機会へ。',
    en: 'Real estate is not the only path to wealth. Through regulated funds, a route to global investment opportunity.',
  },
  blurb: {
    ja: 'エクイティファンド、AIXファンド、そしてガバナンスとリスク管理。将来のクラウドファンディングまで見据えて。',
    en: 'The Equity Fund, the AIX Fund, plus governance and risk management — with crowdfunding on the horizon.',
  },
  subsections: [
    {
      slug: 'equity-fund',
      label: { ja: 'エクイティファンド', en: 'Equity Fund' },
      title: { ja: '世界の市場へ、規制下で', en: 'Global markets, within a regulated frame' },
      tagline: {
        ja: '規制されたエクイティ・プラットフォームを通じ、グローバル市場へアクセスする。',
        en: 'Access global markets through a regulated equity platform.',
      },
      image: IMG.equity,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'エクイティファンドは、規制下のプラットフォームを通じて世界の株式・市場へアクセスする手段です。不動産に偏りがちなポートフォリオに、流動性と分散をもたらします。JWDは、信頼できる枠組みのもとでの投資機会を厳選してご紹介します。',
            en: 'The Equity Fund is a means of accessing global equities and markets through a regulated platform. It brings liquidity and diversification to a portfolio that can lean too heavily on property. JWD curates opportunities within trustworthy frameworks.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: 'ファンドの性格', en: 'Character of the fund' },
          heading: { ja: '戦略・ガバナンス・リスク', en: 'Strategy, governance, risk' },
          items: [
            {
              title: { ja: '戦略', en: 'Strategy' },
              text: { ja: 'グローバル市場への分散アクセスを軸に、流動性と成長性を両立させます。', en: 'Centred on diversified access to global markets, balancing liquidity and growth.' },
            },
            {
              title: { ja: 'ガバナンス', en: 'Governance' },
              text: { ja: '独立した運営と透明な報告体制のもとで運用されます。', en: 'Run under independent administration and transparent reporting.' },
            },
            {
              title: { ja: 'リスク管理', en: 'Risk management' },
              text: { ja: '分散と継続的なデューデリジェンスでリスクを抑制します。', en: 'Risk is contained through diversification and ongoing due diligence.' },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: '公式サイト', en: 'Official site' },
          note: { ja: 'リンクは外部サイトに移動します。投資判断は目論見書等をご確認ください。', en: 'Links open an external site. Always review the offering documents before investing.' },
          items: [
            { label: { ja: 'Equiti ↗', en: 'Equiti ↗' }, url: 'https://www.equiti.com/sc-en/' },
            { label: { ja: 'JWDに相談する', en: 'Talk to JWD' }, url: '/contact' },
          ],
        },
      ],
    },
    {
      slug: 'aix-fund',
      label: { ja: 'AIXファンド', en: 'AIX Fund' },
      title: { ja: '実物資産を軸にした、もう一つの選択', en: 'An alternative anchored in real assets' },
      tagline: {
        ja: '実物資産を中心としたオルタナティブ投資ファンド。構造・目的・リターンを正しく理解する。',
        en: 'An alternative investment fund centred on real assets — understand its structure, objectives and returns.',
      },
      image: IMG.aix,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'AIXファンドは、実物資産（リアルアセット）を中心としたオルタナティブ投資ファンドです。株式市場の値動きとは異なる収益源を求める投資家にとって、ポートフォリオの安定性を高める選択肢になり得ます。',
            en: 'The AIX Fund is an alternative investment fund centred on real assets. For investors seeking a return stream distinct from equity-market swings, it can be an option that adds stability to a portfolio.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: 'ファンドの輪郭', en: 'The shape of the fund' },
          heading: { ja: '構造・目的・リターン', en: 'Structure, objectives, returns' },
          items: [
            {
              title: { ja: '構造', en: 'Structure' },
              text: { ja: '実物資産を裏付けとした規制下のファンド構造を採ります。', en: 'A regulated fund structure backed by tangible real assets.' },
            },
            {
              title: { ja: '目的', en: 'Objectives' },
              text: { ja: '市場相関を抑えつつ、中長期での安定的なリターンを志向します。', en: 'To pursue stable medium-to-long-term returns with low market correlation.' },
            },
            {
              title: { ja: 'リターン', en: 'Returns' },
              text: { ja: '実物資産由来のインカムとキャピタルの両面から収益を狙います。', en: 'Income and capital gains, both drawn from the underlying real assets.' },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: '公式サイト', en: 'Official site' },
          note: { ja: 'リンクは外部サイトに移動します。投資判断は目論見書等をご確認ください。', en: 'Links open an external site. Always review the offering documents before investing.' },
          items: [
            { label: { ja: 'AIX Investment ↗', en: 'AIX Investment ↗' }, url: 'https://www.aixinvestment.com/' },
            { label: { ja: 'JWDに相談する', en: 'Talk to JWD' }, url: '/contact' },
          ],
        },
      ],
    },
    {
      slug: 'governance',
      label: { ja: 'ガバナンス', en: 'Governance' },
      title: { ja: '透明性こそ、最大の安心', en: 'Transparency as the deepest reassurance' },
      tagline: {
        ja: '独立した運営と、透明な報告。資金の流れが見えることが、信頼の前提になる。',
        en: 'Independent administration and transparent reporting — visibility into where money flows is the basis of trust.',
      },
      image: IMG.governance,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ファンド投資で最も重要なのは、リターンの大きさ以前に「ガバナンス」です。誰が運営し、どのように報告され、資金がどこへ流れるか。これが透明であって初めて、投資家は安心して資金を委ねられます。JWDはこの観点を最優先に機会を選別します。',
            en: 'In fund investing, what matters most — before the size of any return — is governance. Who administers it, how it is reported, where the money flows. Only when this is transparent can an investor commit capital with confidence. JWD screens opportunities on exactly this basis.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: 'ガバナンスの柱', en: 'Pillars of governance' },
          heading: { ja: '何を確認すべきか', en: 'What to verify' },
          items: [
            {
              title: { ja: '独立した運営', en: 'Independent administration' },
              text: { ja: '運用と管理の分離により、利益相反を抑えます。', en: 'Separating management from administration limits conflicts of interest.' },
            },
            {
              title: { ja: '透明な報告', en: 'Transparent reporting' },
              text: { ja: '定期的で検証可能な報告が、資金の流れを可視化します。', en: 'Regular, verifiable reporting makes the flow of capital visible.' },
            },
            {
              title: { ja: '規制への準拠', en: 'Regulatory compliance' },
              text: { ja: '適切な規制の枠組みのもとで運用されているかを確認します。', en: 'We confirm operation within an appropriate regulatory framework.' },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: 'JWDの選別基準', en: 'How JWD screens' },
          text: {
            ja: '私たちは「説明できないファンド」を扱いません。構造とガバナンスを自分の言葉で説明できることが、紹介の前提です。',
            en: 'We do not handle funds we cannot explain. Being able to describe the structure and governance in our own words is a precondition for any introduction.',
          },
        },
      ],
    },
    {
      slug: 'risk-management',
      label: { ja: 'リスク管理', en: 'Risk Management' },
      title: { ja: 'リターンの前に、リスクを語る', en: 'Speak of risk before return' },
      tagline: {
        ja: '分散と、厳格なデューデリジェンス。守りを設計してから、攻めを語る。',
        en: 'Diversification and rigorous due diligence — design the defence before discussing the offence.',
      },
      image: IMG.risk,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: '健全な投資は、リターンではなくリスクの設計から始まります。一つの資産・一つの市場に集中しないこと、そしてあらゆる段階で厳格なデューデリジェンスを行うこと。JWDは、上振れと同じ熱量でリスクを共有することを信条としています。',
            en: 'Sound investing begins not with return but with the design of risk. Never concentrate in a single asset or market, and apply rigorous due diligence at every stage. JWD holds it as a principle to share risk with the same energy as upside.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: 'リスクを抑える原則', en: 'Principles that contain risk' },
          heading: { ja: '守りの設計', en: 'Designing the defence' },
          items: [
            {
              title: { ja: '分散', en: 'Diversification' },
              text: { ja: '資産・地域・通貨を分散し、単一要因への依存を避けます。', en: 'Spread across assets, regions and currencies to avoid single-factor dependence.' },
            },
            {
              title: { ja: 'デューデリジェンス', en: 'Due diligence' },
              text: { ja: '各段階で構造・運営・規制を精査し、見えないリスクを潰します。', en: 'At each stage we scrutinise structure, operation and regulation to surface hidden risk.' },
            },
            {
              title: { ja: '出口の設計', en: 'Exit design' },
              text: { ja: '入る前に出口を決める。流動性と税務を見据えた撤退基準を持ちます。', en: 'Decide the exit before entering — with withdrawal criteria mindful of liquidity and tax.' },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '免責', en: 'Disclaimer' },
          text: {
            ja: '本ページは情報提供を目的とし、特定の金融商品の勧誘を意図するものではありません。投資にはリスクが伴います。最終判断は目論見書等と専門家への相談のうえで。',
            en: 'This page is for information only and is not a solicitation for any financial product. Investment carries risk. Make final decisions after reviewing offering documents and consulting professionals.',
          },
        },
      ],
    },
    {
      slug: 'crowdfunding',
      label: { ja: 'クラウドファンディング（将来）', en: 'Crowdfunding (Future)' },
      title: { ja: '少額から、不動産投資へ', en: 'Property investment, from a smaller ticket' },
      tagline: {
        ja: '分割所有とシンジケーション。将来、より多くの人へ投資の扉を開く構想。',
        en: 'Fractional ownership and syndication — a future plan to open the door to more investors.',
      },
      image: IMG.crowd,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'クラウドファンディングは、JWDが将来に向けて構想する領域です。分割所有（フラクショナル・オーナーシップ）や不動産シンジケーションを通じて、これまで一部の富裕層に限られていた投資機会を、より多くの人へ開いていく——その可能性を見据えています。',
            en: 'Crowdfunding is an area JWD is planning for the future. Through fractional ownership and real-estate syndication, we envision opening opportunities — once limited to a wealthy few — to a far wider set of investors.',
          },
        },
        {
          kind: 'cards',
          tone: 'light',
          kicker: { ja: '構想中のかたち', en: 'Concepts in planning' },
          heading: { ja: '将来の選択肢', en: 'Future possibilities' },
          items: [
            {
              title: { ja: '分割所有', en: 'Fractional ownership' },
              meta: { ja: '少額から', en: 'Smaller tickets' },
              text: { ja: '一つの物件を複数の投資家で分割保有し、少額からの参加を可能にします。', en: 'Splitting one asset across investors, enabling participation from a smaller ticket.' },
            },
            {
              title: { ja: 'シンジケーション', en: 'Syndication' },
              meta: { ja: '共同投資', en: 'Co-investment' },
              text: { ja: '複数投資家による共同投資で、より大型の案件にアクセスします。', en: 'Co-investment by multiple parties to access larger deals together.' },
            },
            {
              title: { ja: 'プラットフォーム化', en: 'Toward a platform' },
              meta: { ja: '将来構想', en: 'On the roadmap' },
              text: { ja: 'AI物件アドバイザーやマッチングと連携し、参加しやすい仕組みへ。', en: 'Linked to an AI advisor and matching, toward an accessible system.' },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: 'これは将来構想です', en: 'This is a future plan' },
          text: {
            ja: '本領域は現時点で構想段階であり、提供時期・条件は未定です。ご関心のある方は、提供開始のお知らせをお送りします。',
            en: 'This area is at the concept stage; timing and terms are undetermined. If you are interested, we will notify you when it launches.',
          },
        },
      ],
    },
  ],
};
