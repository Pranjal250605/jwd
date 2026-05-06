export interface FAQ {
  q: string;
  a: string;
}

export interface FocusArea {
  title: string;
  desc: string;
}

export interface ServiceCategory {
  categoryTitle: string;
  items: string[];
}

export interface ServicePageData {
  id: string;
  title: string;
  subtitle: string;
  overview: string[];
  vision?: string;
  focusAreas: FocusArea[];
  servicesOffered: ServiceCategory[];
  faq: FAQ[];
}

export const servicePages: ServicePageData[] = [
  {
    id: "company-formation",
    title: "法人設立",
    subtitle: "Strategic Mainland & Free Zone Setup",
    overview: [
      "今日のグローバル環境において、企業は新たなトレンドを先取りし、収益機会を活用するために戦略を継続的に見直す必要があります。UAE・ドバイでの事業展開において、法人形態（メインランド、フリーゾーン、オフショア）の選択は極めて重要です。",
      "当社のコンサルティングは、複雑な現地の法的要件を乗り越え、成長機会を特定し、中東市場で競争優位を維持するための強力な支援を行います。顧客の嗜好の変化や動向に対応するため、持続可能な成長設計が不可欠です。",
      "戦略的なアプローチにより、未開拓のセグメントや新たな収益機会を特定します。自社の競争力、市場ポジション、コアケイパビリティを正確に把握することで差別化を図り、強固な基盤を確立します。リソースの最適化により効率的な配分を実現し、ROIを最大化させます。"
    ],
    vision: "ドバイ進出における企業のビジョンを強化し、課題を成長の機会へと変換します。戦略的なビジネス基盤の構築を推進し、持続可能な成功を実現します。",
    focusAreas: [
      { title: "Strategic Landscape Analysis", desc: "UAE全首長国の規制と税務上のメリットを分析し、最適な進出地を特定します。市場調査や競合分析を通じて戦略的機会と脅威を評価します。" },
      { title: "Entity Structuring & Capabilities", desc: "外資保有が可能なフリーゾーンやメインランド企業の設立を支援します。コアコンピタンスと知的財産を評価し、強みを最大限に活用します。" },
      { title: "Strategy Alignment", desc: "ビジネスユニット間でのアライメントを確保し、UAEでの事業計画を統合します。一貫した実行と組織のアジリティを推進します。" },
      { title: "Market Feedback Mechanisms", desc: "フィードバックループを確立し、初期段階でのインサイトを収集します。市場トレンドを継続的に監視し戦略を適応させます。" }
    ],
    servicesOffered: [
      { categoryTitle: "Performance and Value Acceleration", items: ["規制に対する戦略的な再評価", "コスト削減努力に留まらない収益最大化", "定款（MOA/AOA）の設計を通じた最適化"] },
      { categoryTitle: "Accelerated Business Transformation", items: ["ローカル・スポンサーシップから100%外資保有への移行支援", "利益率とパフォーマンスを向上させるための資本準備金の最適化", "長期戦略を支えるためのUAE当局との交渉"] },
      { categoryTitle: "Regulatory & Compliance Turnaround", items: ["過去の不適切な企業構造からの転換とリスク管理", "持続可能な回復と安定化のための最適な意思決定支援", "トラストの設定による確実な資産保全スキーム"] }
    ],
    faq: [
      { q: "フリーゾーンとメインランドの根本的な違いと選定基準は何ですか？", a: "フリーゾーンは主に国際貿易や特定セクター向けに外資100%所有の恩恵を享受しやすく、機能が限定されます。メインランドはUAE国内全域での直接営業が可能で、現地の政府入札などにも参加可能です。" },
      { q: "規模に関わらずサポートを受けられますか？", a: "はい。スタートアップから多国籍企業の地域統括拠点（HQ）の設立まで、あらゆる組織に対してカスタマイズされた事業継続計画（BCP）と設立パッケージを提供します。" },
      { q: "プロセスはオンライン完結可能ですか？", a: "多くのフリーゾーンでは設立手続きがオンライン可能ですが、ビザ発給や銀行口座開設プロセスにおいては、経営者や株主の入国が求められる場合があります。" }
    ]
  },
  {
    id: "license-acquisition",
    title: "ライセンス取得",
    subtitle: "Commercial & Professional Licensing Strategy",
    overview: [
      "合法的に事業を展開するためには、業態に最適化されたライセンスの取得が源泉となります。単なる申請代行ではなく、長期的な成長戦略を見越した「Activity」の選定が求められます。",
      "事業活動の分類ミスは、後々の罰金処分、ビザ発給遅延、銀行口座の強制凍結といった極めて重大なリスクを招きます。我々の専門チームはこうしたリスクを完全に排除します。",
      "ライセンス取得は、企業のブランディングや信頼性にも直結します。適切な監督官庁からの承認を経ることで、市場への参入が強固なものになります。柔軟な拡張をサポートするライセンス設計を提供します。"
    ],
    vision: "規制環境の複雑さを成長の透明ステップに変え、確実なコンプライアンスとシームレスな市場参入を可能にします。貴社のイノベーションを安全かつ迅速にUAE市場へ投入します。",
    focusAreas: [
      { title: "Comprehensive Activity Matching", desc: "DEDおよび全フリーゾーン当局が規定する事業活動データベースから、ビジネスに合致するコードセットを選定します。" },
      { title: "External Approvals Management", desc: "特殊業種に求められる外部機関からの事前承認プロセス（NOC）をスムーズに代行します。" },
      { title: "Multi-Jurisdiction Strategy", desc: "複数の首長国やフリーゾーンにまたがって事業を展開する場合の、効率的な事業拡大戦略を策定します。" },
      { title: "Lifecycle Alignment", desc: "ライセンス取得にとどまらず、成長に応じた活動項目の追加など、ライフサイクル全体を管理します。" }
    ],
    servicesOffered: [
      { categoryTitle: "Core Trading & Commercial Licensing", items: ["コマーシャル（商業）ライセンスの迅速な取得代行と法的助言", "一般貿易ライセンスの要件クリアランス", "インダストリアル向けの環境アセスメント連携"] },
      { categoryTitle: "Specialized Professional Licensing", items: ["プロフェッショナル（専門職コンサルタント）ライセンスの取得", "IT・フィンテック向け先進フリーゾーンでの特別申請", "フリーランスパーミットからの法人化スケーリング支援"] },
      { categoryTitle: "Maintenance & Transformation", items: ["ライセンスの年次更新プロセスの自動化と監視", "フリーゾーン間の移転やアップグレード手続き", "事業縮小時における適法な清算（Liquidation）"] }
    ],
    faq: [
      { q: "1つのライセンス内にいくつの活動を含めることができますか？", a: "管轄によりますが、通常は同一カテゴリ内であれば最大10項目程度まで含めることができます。カテゴリをまたぐ場合は特別承認が必要です。" },
      { q: "オフィススペースを借りる必要はありますか？", a: "はい、ほぼ全てのライセンス取得でテナント契約（Ejari）の証明が必要です。初期費用を抑えるためにバーチャルオフィス等をご提案できます。" },
      { q: "外部承認が必要な業種は何ですか？", a: "飲食業、医療、教育機関、運輸、セキュリティなど、公共の福祉や安全に関わる事業は全て外部機関の認可が必要です。" }
    ]
  },
  {
    id: "visa-acquisition",
    title: "VISA取得",
    subtitle: "Strategic Investor & Workforce Mobility",
    overview: [
      "居住権および合法的な就労権の確保は、生活の基盤を築くだけでなく、ビジネスにおける機動力を決定づける第一歩です。UAEの移民政策やビザのカテゴリーも多様化し高度化しています。",
      "入国管理当局およびドバイ居住者・外国人事務局（GDRFA）と連携し、投資家ご自身の長期ビザ確保から従業員、家族の呼び寄せに至るまでシームレスな発給プロセスを提供します。",
      "労働法の要件やビザシステムに対し最新の知見を持って対応します。長期の『ゴールデンビザ』などの適合診断も含め、単なる代行にとどまらないパートナーとなります。"
    ],
    vision: "人材と家族の移動に伴う不安と複雑な手続きを取り除き、最高のパフォーマンスを発揮できる環境を即座に提供することをお約束します。",
    focusAreas: [
      { title: "Investor & Golden Visa Programs", desc: "経営者の長期居住を可能にする「ゴールデンビザ」やパートナービザの申請要件を厳格に審査し確実な取得を目指します。" },
      { title: "Workforce Setup & Labor Compliance", desc: "労働省（MOHRE）システムと連動し、就労ビザのQuota申請から本証発給までのフローを最適化します。" },
      { title: "Family & Dependent Sponsorship", desc: "経営者や従業員の家族、両親や家事使用人の居住ビザを一元化された管理でスムーズに取得します。" },
      { title: "Health & VIP Typing Services", desc: "メディカルテスト等の物理プロセスに対しVIPセンターの優先予約と日本人専任スタッフによるアテンドを提供します。" }
    ],
    servicesOffered: [
      { categoryTitle: "VIP Investor & Golden Residency", items: ["10年ゴールデンビザの適格性評価と申請代行", "法人設立に付帯するインベスタービザの取得サポート", "特殊長期居住要件のクリアランス"] },
      { categoryTitle: "Corporate Employment Visas", items: ["MOHREを通じた就労ビザ申請とプロセス管理", "従業員ビザ（Quota）増加申請と労働許可の最適化", "短期プロジェクト向けミッションビザ手配"] },
      { categoryTitle: "Family & Logistics Support", items: ["家族の呼び寄せの完全代行", "メディカルテストのVIP予約と追跡", "ビザ更新期日のシステム通知とステータス維持"] }
    ],
    faq: [
      { q: "ゴールデンビザの最大のメリットは何ですか？", a: "スポンサーに依存せず10年間の居住が自立して保証される点です。また海外出国期間による失効制限が緩和されます。" },
      { q: "ビザの発給までどれくらい日数がかかりますか？", a: "入国許可証発行は数日ですが、テスト等を含めると1〜2週間が標準です。VIPサービスで数日に短縮可能です。" },
      { q: "従業員が退職した場合の手続きは？", a: "退職・解雇された場合、スポンサー企業は速やかに労働許可とビザのキャンセルを行う義務があります。弊社はそのプロセスも代行します。" }
    ]
  },
  {
    id: "emirates-id-acquisition",
    title: "エミレーツID取得",
    subtitle: "National Identity & Seamless Integration",
    overview: [
      "エミレーツIDはUAE国民および居住者向けに義務付けられた電子身分証明書です。銀行口座開設、住居賃貸借、携帯電話契約などあらゆる活動において必須となる「絶対的な鍵」です。",
      "生体情報が高度に暗号化されており、最新の国境管理システムでのスムーズな出入国も可能になります。IDの迅速な取得はビジネスのスタートラインを意味します。",
      "申請から認証、物理カード受領までのタイムラインのボトルネックを見直し、ICP（連邦個人ID機関）とのシステム接続とVIP対応ルートを駆使して待機時間を縮小します。"
    ],
    vision: "「待機状態」を最小限に抑え、お客様がスピーディーにビジネス構築と豊かな生活基盤の確立に取り組めるよう官公庁への橋渡しとなります。",
    focusAreas: [
      { title: "Priority Processing & Typing", desc: "入力システム要件を熟知した専門スタッフが入力代行を行い、書類不備をゼロに抑えます。" },
      { title: "Biometric Center Logistics", desc: "生体認証プロセスでのVIP事前予約とアテンドを実施し、長時間での待機を回避します。" },
      { title: "Data Integration & Consistency", desc: "入国管理局と連邦のデータが同期されているか監視し、不整合による発給停止を防ぎます。" },
      { title: "Digital Enablement", desc: "物理的なカード到着を待つ間にも、UAE PASSアプリを利用してデジタル版IDを有効化し即日利用できるようガイダンスします。" }
    ],
    servicesOffered: [
      { categoryTitle: "End-to-End ICP Application", items: ["ICPポータルを通じたID申請の入力代行", "過去の居住データからのシームレスな更新移行", "健康診断結果とID発給システムの連動監視"] },
      { categoryTitle: "Concierge & Expedite Service", items: ["VIP専用ラウンジへの優先アテンド", "発行遅延発生時のICP本部への直接交渉", "UAE PASSのセットアップと即時デジタル利用の手配"] },
      { categoryTitle: "Maintenance & Recovery", items: ["IDカードの紛失盗難破損時の無効化処理と再発行", "転職氏名変更等データ修正", "出国時の適正返納プロセスの管理"] }
    ],
    faq: [
      { q: "ビザとIDの発行はどちらが先ですか？", a: "IDの申請登録を行わないとメディカルテストを受けられません。最終的な居住ビザ承認に続いてカードが到着します。" },
      { q: "IDを紛失した場合はどうすればよいですか？", a: "警察署で紛失証明書を取得しICPに対して無効化の手続きを行います。その後再発行申請となります。" },
      { q: "デジタル版のIDで口座開設できますか？", a: "アプリ等で取得できる電子版のIDは法的に有効であり、大半の銀行や通信会社で物理カードに先行して受け入れられます。" }
    ]
  },
  {
    id: "corporate-bank-account",
    title: "法人銀行口座開設",
    subtitle: "Corporate Banking, Treasury & Trade Finance Setup",
    overview: [
      "世界的なマネーロンダリング防止（AML）規制の劇的な強化に伴い、UAEにおける法人口座開設は厳格化しています。もはや会社を設立すれば自動で銀行口座が開く時代ではありません。",
      "成否は精緻な事業計画書、明確なUBOの証明、そして資金出所の透明性にかかっています。メガバンクのコンプライアンス部門とネットワークを持ち、最適なアプローチを熟知しています。",
      "貿易金融（L/C）やコーポレートカードの発行に至るまで、貴社のビジネスモデルに要求される金融プラットフォームを構築します。"
    ],
    vision: "コンプライアンスの壁を確かな知見で打ち破り、グローバル資金が合法かつ迅速に機能する財務のエコシステムを提供します。",
    focusAreas: [
      { title: "Strategic Bank Matching", desc: "スタートアップから大企業まで、ビジネスフェーズや取引ボリュームに基づいて最も審査通過率が高い銀行を選定します。" },
      { title: "KYC Profiling & Perfection", desc: "銀行の審査基準に合致する「完璧な」KYCパッケージ（事業計画書等）を構築し、審査部門の疑念を払拭します。" },
      { title: "Relationship & Interview Liaison", desc: "銀行担当マネージャー（RM）との事前協議を行い、口座開設に伴う銀行面談においてリエゾンとして同席します。" },
      { title: "Compliance Obstacle Clearing", desc: "高リスク国との取引予定や、複雑な構造を持つ企業に対し、審査を通過するための実務的アドバイスを提供します。" }
    ],
    servicesOffered: [
      { categoryTitle: "Account Opening & Onboarding", items: ["エミレーツNBD、FAB、ADCB等のトップティア銀行での法人口座開設", "最新鋭デジタルバンクへの最短申請サポート", "多通貨口座および外国為替機能の事前要件確認"] },
      { categoryTitle: "Document & Narrative Engineering", items: ["銀行審査に特化した事業計画書の作成", "AMLコンプライアンス開示要求に対する代理回答", "UBO宣言書および法的親会社の複雑なグループ構造証明支援"] },
      { categoryTitle: "Advanced Corporate Treasury", items: ["貿易金融枠の設定支援", "オンラインバンキング権限設定やWPS（給与振込システム）設定", "企業向けコーポレートクレジットカードの発行"] }
    ],
    faq: [
      { q: "ドバイへの渡航が必要ですか？", a: "多くの伝統的なメガバンクでは署名や本人確認のため必ず一度渡航して対面面談を行うことが義務付けられています。" },
      { q: "期間はどのくらいかかりますか？", a: "書類の準備状況により異なりますが、申請から承認まで1ヶ月〜2ヶ月を要します。事前の周到なパッケージが鍵です。" },
      { q: "審査を拒否された場合はどうなりますか？", a: "一度拒否された銀行では再申請が極めて困難になります。だからこそ最初の申請が決定的に重要です。" }
    ]
  },
  {
    id: "personal-bank-account",
    title: "個人銀行口座開設",
    subtitle: "Wealth & Private Banking Solutions",
    overview: [
      "安全で自由度が高く、税務効率に優れた資産運用のハブとしてUAE口座への関心は急増しています。しかしKYC厳格化により、資産背景が不透明な状態での開設はほぼ不可能です。",
      "現在の居住ステータスや運用の目的に応じて最適なソリューションを提供します。リテール預金からプライベートバンキングまで幅広く対応します。",
      "大規模な移転や仮想通貨の法定通貨へのオンボードなど、デリケートな資金移動に関するコンプライアンスもサポートします。"
    ],
    vision: "グローバル金融基盤へのアクセスを提供し、お客様の大切な資産を保護・最大化するインフラを提供します。",
    focusAreas: [
      { title: "Residency-Based Optimization", desc: "UAE居住者としての税務上優位性を引き出す口座設計を実施し、CRSの観点から最適な金融戦略を立案します。" },
      { title: "Wealth Threshold Routing", desc: "預金額に基づきPriority BankingからPrivate Bankingまで、最もメリットを享受できる金融ランクを提供します。" },
      { title: "Documentation Streamlining", desc: "資産の原資を証明する書類を精査し、UAE基準に合致するよう英訳と法的解釈を補強します。" },
      { title: "Non-Resident Capabilities", desc: "ビザを持たない「非居住者」の特例的な開設もサポートしますが、要件は厳格に管理されます。" }
    ],
    servicesOffered: [
      { categoryTitle: "Tiered Banking Introductions", items: ["日常取引向けリテールバンキングサポート", "ウェルスマネジメント口座の特別紹介", "トップクラスの「プライベートバンク口座」へのアプローチ"] },
      { categoryTitle: "Wealth Source Compliance", items: ["資金源証明の書類作成や法的アドバイス", "暗号資産由来の資金受け入れ協議", "各種手数料や最低残高要件の最適化"] },
      { categoryTitle: "International Fiscal Integration", items: ["マルチカレンシーへの対応と為替優遇枠の交渉", "投資証明レターの迅速な発行支援", "CRS要件に基づくタックスドミサイルと連携"] }
    ],
    faq: [
      { q: "居住ビザがなくても口座は作成できますか？", a: "一部の銀行で非居住者向けに認めていますが、小切手帳が発行されず最低維持残高が高額になるなどの厳しい誓約があります。" },
      { q: "日本から大きな金額を送金するリスクは？", a: "事前の予告なく資金源証明を求められ一時制限されることがあります。送金前に必ずRMへ証拠書類を提出する連携が必要です。" },
      { q: "プライベートバンクの最低預金額目安は？", a: "金融機関によりますが、概ね100万米ドルから300万米ドル相当がスタートラインとなります。" }
    ]
  },
  {
    id: "tax-registration",
    title: "税務署登録",
    subtitle: "Corporate Tax & VAT Compliance",
    overview: [
      "中東におけるビジネス環境は、「完全無税」からOECD基準に完全に準拠した「透明なコンプライアンス環境」へと転換しました。",
      "5%のVATに加え、2023年からの9%「コーポレートタックス」への適応は法的義務です。これらを事業上の脅威ではなく、適正な免税措置による競争優位へと繋げる戦略が求められます。",
      "専門アドバイザリーチームを通じてFTAポータル登録を代行し、「適格所得」に該当し0%を享受できるかを徹底的に最適化します。"
    ],
    vision: "急速に変化する税務規制を読み解き、企業ごとのキャッシュフロー最大化を実現するタックスシールドを設計します。",
    focusAreas: [
      { title: "Impact Assessment", desc: "CT法がビジネスモデル（フリーゾーン・メインランド）に与える影響を評価し、適用税率と免除要件を洗い出します。" },
      { title: "Precise FTA Registration", desc: "高額なペナルティを回避するため、期限内に正確な登録プロセスを完了させTRNを取得します。" },
      { title: "Qualifying Income Optimization", desc: "フリーゾーン企業が実質的な法人税免除を受けるための経済的実体要件等をクリアするための商流構築支援をします。" },
      { title: "Double Taxation Relief", desc: "日・UAE間の租税条約を活用し、クロスボーダー送金にかかる源泉所得税リスクを防止します。" }
    ],
    servicesOffered: [
      { categoryTitle: "UAE Corporate Tax (CT)", items: ["FTAへの初期登録とタックスナンバー取得代行", "タックスグループ設定", "スモールビジネスレリーフ適用申請"] },
      { categoryTitle: "Value Added Tax (VAT)", items: ["義務登録閾値に基づくVAT登録", "毎期ごとの正確なVAT申告とFTA対応", "自己開示（Voluntary Disclosure）と修正"] },
      { categoryTitle: "Strategic Fiscal Advisory", items: ["移転価格税制のポリシー策定とローカルファイル作成", "経済的実体規則（ESR）宣誓書の作成", "居住者税務証明書の取得代行"] }
    ],
    faq: [
      { q: "フリーゾーン企業は自動的に無税ですか？", a: "自動的に免除されません。登録自体は全企業に義務付けられており、免税を適用するには複数の要件を継続的に満たす必要があります。" },
      { q: "売上がない会社も登録義務がありますか？", a: "はい。売上にかかわらず全企業が期日内にFTAへ登録を行う義務があります。" },
      { q: "源泉徴収税はかかりますか？", a: "現在、海外への配当金送金などに対してUAE国内では源泉徴収税は一切課されておらず0%です。" }
    ]
  },
  {
    id: "accounting-audit",
    title: "会計監査",
    subtitle: "Statutory Audit & IFRS Reporting",
    overview: [
      "透明性の高い財務報告と厳格な記帳（Bookkeeping）は経営のインフラストラクチャーです。収益管理に役立つだけではなく、法人税の免税要件において不可欠な根幹です。",
      "「適当に数字を埋めればよい」時代は終焉しました。当局は財務データを監視しており、国際基準（IFRS）に準拠した帳簿の提示が求められています。",
      "クラウドベースの会計システムを導入・ローカライズし、グローバル両面の経営指標をリアルタイムで把握できる体制を構築します。"
    ],
    vision: "財務の透明性を企業の武器へと進化させます。完璧なデータ管理により絶対的な信頼を獲得し、事業のスケールアップへの基盤を築きます。",
    focusAreas: [
      { title: "Statutory & Regulatory Assurance", desc: "各当局が求める独自の法定監査基準と提出期限を管理し、ライセンス停止やペナルティを防ぎます。" },
      { title: "Tax-Aligned IFRS Accounting", desc: "VATやCT申告に直結するよう、UAE対応のIFRS準拠の帳簿勘定体系を設計します。" },
      { title: "System Workflow Integration", desc: "最新のクラウド会計ソフト（Xero等）を導入し、銀行口座とのAPI同期などをサポートします。" },
      { title: "Business Health Analytics", desc: "単なるレコーディングを超え、予実管理や部門別利益分析など経営判断のクオリティを向上させるKPIを提供します。" }
    ],
    servicesOffered: [
      { categoryTitle: "Auditing & Assurance", items: ["IFRSに基づく独立した法定年次監査の実施", "専用ポータルを通じた監査報告書のアップロード手配", "DD（財務デューデリジェンス）および企業価値評価"] },
      { categoryTitle: "Bookkeeping & Accounts", items: ["日常的な記帳代行と銀行勘定調整", "マネジメント向けの多言語ハイライトレポート", "バックログ・アカウントの再構築と修正"] },
      { categoryTitle: "CFO & System Advisory", items: ["バーチャルCFOとしての戦略アドバイザリー", "ソフトウェア選定およびセットアップ", "退職給付金の引当金計算とWPSシステム管理"] }
    ],
    faq: [
      { q: "売上が小さくても監査報告は必要ですか？", a: "管轄の規則により、売上に関わらず監査情報の提出が義務付けられている場合が多数です。未提出の場合ペナルティの対象となります。" },
      { q: "日本の会計ソフトをそのまま使用できますか？", a: "管理目的であれば可能ですが、UAEのVATフォーマット自動集計に未対応のため、XeroやZohoといったグローバルソフトの導入を推奨します。" },
      { q: "エクセル記録だけで税務申告できますか？", a: "法人税法導入により事実上不可能です。監査でシステムが要件を満たしていないとみなされた時点で巨額の罰金リスクがあります。" }
    ]
  }
];
