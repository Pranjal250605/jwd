import type { Section } from '../types';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80',
  tax: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=80',
  visa: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80',
  currency:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=80',
  yield:
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2400&q=80',
  stats:
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=80',
  golden:
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=2400&q=80',
};

export const whyDubai: Section = {
  slug: 'why-dubai',
  navKey: 'whyDubai',
  order: 3,
  image: IMG.hero,
  intro: {
    ja: 'なぜ今、ドバイなのか。税制、ビザ、為替、利回り——投資家が知るべき理由を、データとともに。',
    en: 'Why Dubai, why now. Tax, visas, currency and yield — the reasons every investor should know, backed by data.',
  },
  blurb: {
    ja: '無税に近い税制から、ゴールデンビザ、世界有数の賃貸利回りまで。ドバイが選ばれる理由を分解します。',
    en: 'From a near-tax-free regime to the Golden Visa and some of the world’s strongest rental yields — the case for Dubai, broken down.',
  },
  subsections: [
    {
      slug: 'tax-benefits',
      label: { ja: '税制メリット', en: 'Tax Benefits' },
      title: { ja: '税が、資産を削らない国', en: 'A country where tax does not erode wealth' },
      tagline: {
        ja: '個人所得税ゼロ、キャピタルゲイン課税ゼロ。資産を「守りながら増やす」前提が違う。',
        en: 'Zero personal income tax, zero capital gains tax — the very premise of preserving and growing wealth is different.',
      },
      image: IMG.tax,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ドバイ（UAE）の最大の魅力は、税が資産形成の足かせにならないことです。個人所得税ゼロ、キャピタルゲイン課税ゼロ、相続税・贈与税もなし。日本では当然のように差し引かれてきた税負担が、ここには存在しません。',
            en: 'Dubai’s greatest draw is that tax does not act as a brake on building wealth. Zero personal income tax, zero capital gains tax, and no inheritance or gift tax. The deductions that feel inevitable in Japan simply do not exist here.',
          },
        },
        {
          kind: 'split',
          tone: 'light',
          image: IMG.tax,
          imageAlt: { ja: 'ドバイの金融街', en: 'Dubai financial district' },
          kicker: { ja: '残る資産', en: 'Wealth that stays' },
          heading: { ja: '差し引かれないことの、複利効果', en: 'The compounding power of what is not taken' },
          body: [
            {
              ja: '所得税やキャピタルゲイン課税がないということは、毎年、再投資に回せる原資が大きくなることを意味します。長期では、この差が複利となって資産曲線を押し上げます。',
              en: 'No income or capital-gains tax means more capital recycled into reinvestment every year. Over time that gap compounds — bending the wealth curve upward.',
            },
          ],
          bullets: [
            { ja: '個人所得税・キャピタルゲイン税ゼロ', en: 'Zero personal income & capital-gains tax' },
            { ja: '相続税・贈与税なし', en: 'No inheritance or gift tax' },
            { ja: '利益・資本の100%本国送金', en: '100% repatriation of profit & capital' },
          ],
        },
        {
          kind: 'stats',
          tone: 'dark',
          kicker: { ja: '税率の比較', en: 'The tax picture' },
          heading: { ja: 'ゼロが並ぶ理由', en: 'Why the zeros line up' },
          items: [
            { value: 0, suffix: '%', label: { ja: '個人所得税', en: 'Personal income tax' } },
            { value: 0, suffix: '%', label: { ja: 'キャピタルゲイン税', en: 'Capital gains tax' } },
            { value: 0, suffix: '%', label: { ja: '相続・贈与税', en: 'Inheritance / gift tax' } },
            { value: 9, suffix: '%', label: { ja: '法人税（一定額超）', en: 'Corporate tax (above threshold)' } },
          ],
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '押さえるべき論点', en: 'What to keep in mind' },
          heading: { ja: '「無税」を正しく理解する', en: 'Understanding “tax-free” correctly' },
          items: [
            {
              title: { ja: '法人税は2023年に導入', en: 'Corporate tax arrived in 2023' },
              text: {
                ja: '一定額を超える法人利益には9%の法人税が課されます。これは国際基準への適合のシグナルであり、フリーゾーン優遇は依然有効です。',
                en: 'Profits above a threshold now carry a 9% corporate tax — a signal of alignment with international standards. Free-zone incentives still apply.',
              },
            },
            {
              title: { ja: 'VATは5%', en: 'VAT is 5%' },
              text: {
                ja: '付加価値税は5%と低水準。住宅用不動産の多くは免税・ゼロ税率の対象になり得ます。',
                en: 'Value-added tax sits at a low 5%, and much residential property can qualify for exemption or zero-rating.',
              },
            },
            {
              title: { ja: '日本側の課税は残る', en: 'Japan-side tax may still apply' },
              text: {
                ja: '日本の居住者には全世界所得課税が及びます。居住形態と租税条約を踏まえた設計が不可欠です。',
                en: 'Japanese residents are taxed on worldwide income. Structuring around residency and tax treaties is essential.',
              },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: 'JWDの視点', en: 'The JWD view' },
          text: {
            ja: '税制の優位は「正しく構造化して初めて」活きます。早期の登録判断と、日本・UAE双方を見た設計が長期の差を生みます。具体的な数字は個別相談で。',
            en: 'A tax advantage only works once it is structured correctly. Early registration decisions and a design that sees both Japan and the UAE create the long-term edge. We model the actual numbers in consultation.',
          },
        },
      ],
    },
    {
      slug: 'visa-programs',
      label: { ja: 'ビザ制度', en: 'Visa Programs' },
      title: { ja: 'ドバイに「居る権利」を設計する', en: 'Designing your right to remain' },
      tagline: {
        ja: 'ゴールデンビザ、不動産ビザ、就労ビザ。目的に応じた最適な滞在の形を。',
        en: 'Golden Visa, property visa, employment visa — the right form of residency for your purpose.',
      },
      image: IMG.visa,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ドバイでの資産形成は、しばしば「滞在資格」とセットで考える必要があります。投資ビザ、不動産ビザ、ゴールデンビザ——制度は近年大きく更新され、より長期・安定的な居住が可能になりました。',
            en: 'Wealth creation in Dubai often needs to be considered together with the right to stay. Investor visas, property visas, the Golden Visa — the rules have been substantially updated in recent years, opening the door to longer, more stable residency.',
          },
        },
        {
          kind: 'tabs',
          tone: 'light',
          kicker: { ja: '主なビザの種類', en: 'The main routes' },
          heading: { ja: '滞在資格を、切り替えて比べる', en: 'Compare your residency routes' },
          items: [
            {
              tab: { ja: 'ゴールデンビザ', en: 'Golden Visa' },
              title: { ja: 'ゴールデンビザ', en: 'Golden Visa' },
              metric: { value: '5–10', label: { ja: '年（長期居住）', en: 'years of residency' } },
              text: {
                ja: '一定額以上の不動産投資や、事業・専門人材を対象に、長期の居住を認める制度。家族の帯同も可能で、長期間の国外滞在でも維持しやすい設計です。',
                en: 'Long-term residency for qualifying property investment, entrepreneurs and specialists. Family can be included, and it is designed to remain valid even through extended time abroad.',
              },
              bullets: [
                { ja: '家族の帯同が可能', en: 'Family can be included' },
                { ja: '長期間の国外滞在に柔軟', en: 'Flexible across time abroad' },
                { ja: '不動産投資から取得可能', en: 'Attainable via property investment' },
              ],
            },
            {
              tab: { ja: '不動産投資ビザ', en: 'Property Investor' },
              title: { ja: '不動産投資ビザ', en: 'Property Investor Visa' },
              metric: { value: '2+', label: { ja: '年（物件連動）', en: 'years, asset-linked' } },
              text: {
                ja: '一定基準を満たす不動産取得に紐づく居住ビザ。物件の保有そのものが、滞在資格の起点になります。',
                en: 'Residency tied to qualifying property ownership — your asset itself becomes the basis of your right to stay.',
              },
              bullets: [
                { ja: '物件保有が滞在の根拠', en: 'Ownership is the basis to stay' },
                { ja: '基準額以上の取得で適格', en: 'Above the threshold qualifies' },
                { ja: '更新管理まで伴走', en: 'We manage renewals too' },
              ],
            },
            {
              tab: { ja: '就労・事業ビザ', en: 'Employment / Business' },
              title: { ja: '就労・事業ビザ', en: 'Employment / Business Visa' },
              metric: { value: '法人', label: { ja: '設立と連動', en: 'Linked to company' } },
              text: {
                ja: 'フリーゾーン法人の設立と連動した就労ビザ。エミレーツIDや法人・個人の銀行口座開設の前提にもなります。',
                en: 'An employment visa linked to free-zone company formation — also the basis for Emirates ID and corporate or personal bank accounts.',
              },
              bullets: [
                { ja: 'フリーゾーン設立と連動', en: 'Tied to free-zone formation' },
                { ja: 'エミレーツIDの前提', en: 'Basis for Emirates ID' },
                { ja: '銀行口座開設の起点', en: 'Gateway to bank accounts' },
              ],
            },
          ],
        },
        {
          kind: 'steps',
          tone: 'dark',
          kicker: { ja: '取得の流れ', en: 'How it flows' },
          heading: { ja: '申請から発給まで', en: 'From application to issuance' },
          items: [
            { title: { ja: '01 適格性の確認', en: '01 Confirm eligibility' }, text: { ja: '投資額・職種・事業形態から、最適なビザ区分を判定します。', en: 'We assess investment, profession and business form to identify the right visa category.' } },
            { title: { ja: '02 書類準備', en: '02 Prepare documents' }, text: { ja: '厳格化する審査に通る完璧な申請パッケージを整えます。', en: 'We assemble a flawless application package built to clear today’s stricter review.' } },
            { title: { ja: '03 申請・生体認証', en: '03 Apply & biometrics' }, text: { ja: 'メディカル、エミレーツID申請、生体認証までVIP対応で伴走します。', en: 'Medical, Emirates ID application and biometrics — handled with VIP support.' } },
            { title: { ja: '04 発給・更新', en: '04 Issuance & renewal' }, text: { ja: 'ビザ発給後の更新管理まで、継続して伴走します。', en: 'Beyond issuance, we manage renewals on an ongoing basis.' } },
          ],
        },
        {
          kind: 'links',
          tone: 'deep',
          heading: { ja: '関連情報', en: 'Related' },
          items: [
            { label: { ja: 'ゴールデンビザ・ガイド', en: 'Golden Visa Guide' }, url: '/why-dubai/golden-visa' },
            { label: { ja: '無料相談を予約', en: 'Book a consultation' }, url: '/contact' },
          ],
        },
      ],
    },
    {
      slug: 'currency-diversification',
      label: { ja: '通貨分散', en: 'Currency Diversification' },
      title: { ja: '円だけに、資産を委ねない', en: 'Do not entrust your wealth to the yen alone' },
      tagline: {
        ja: 'AEDは米ドルにペッグ。円安局面で、資産の一部をドル経済圏へ移すという選択。',
        en: 'The dirham is pegged to the US dollar. In a weak-yen era, moving part of your wealth into the dollar economy is a choice worth making.',
      },
      image: IMG.currency,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'UAEディルハム（AED）は長年にわたり米ドルに固定（ペッグ）されています。つまりドバイ不動産を保有することは、実質的にドル建て資産を持つことに近い。円資産に偏ったポートフォリオにとって、これは強力な通貨分散になります。',
            en: 'The UAE dirham (AED) has long been pegged to the US dollar. Owning Dubai property is therefore close to holding a dollar-denominated asset — a powerful form of currency diversification for a portfolio concentrated in yen.',
          },
        },
        {
          kind: 'stats',
          tone: 'dark',
          kicker: { ja: '通貨の構図', en: 'The currency picture' },
          heading: { ja: 'ペッグという安定', en: 'The stability of the peg' },
          items: [
            { value: 3.6725, decimals: 4, label: { ja: 'AED / USD（固定）', en: 'AED / USD (pegged)' } },
            { value: 40, suffix: '+', label: { ja: 'ペッグ継続年数', en: 'Years of the peg' } },
            { value: 100, suffix: '%', label: { ja: '利益・資本の本国送金', en: 'Profit & capital repatriation' } },
          ],
        },
        {
          kind: 'chart',
          tone: 'light',
          kicker: { ja: '為替の推移', en: 'The currency trend' },
          heading: { ja: '円から見たAEDの強さ', en: 'AED strength, seen from the yen' },
          chart: {
            type: 'line',
            points: [
              { label: { ja: '’21', en: '’21' }, value: 29 },
              { label: { ja: '’22', en: '’22' }, value: 33 },
              { label: { ja: '’23', en: '’23' }, value: 37 },
              { label: { ja: '’24', en: '’24' }, value: 39 },
              { label: { ja: '’25', en: '’25' }, value: 40 },
              { label: { ja: '’26', en: '’26' }, value: 41 },
            ],
          },
          note: {
            ja: '※ 1 AED あたりの円相当（参考値）。',
            en: '※ JPY per AED — illustrative values, not live rates.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '分散の意味', en: 'Why it matters' },
          heading: { ja: '為替が味方になる構造', en: 'When currency works for you' },
          items: [
            {
              title: { ja: '実質ドル建て資産', en: 'Effectively a dollar asset' },
              text: {
                ja: 'ドルペッグにより、ドバイ不動産は円資産に対する自然なヘッジとして機能します。',
                en: 'Through the dollar peg, Dubai property acts as a natural hedge against yen-denominated holdings.',
              },
            },
            {
              title: { ja: '円安が追い風にも逆風にも', en: 'A weak yen cuts both ways' },
              text: {
                ja: '取得時は円換算コストが上がる一方、保有後の賃料・売却益は円で見れば増価しやすくなります。',
                en: 'A weak yen raises the cost of entry, yet rents and gains can appreciate when viewed back in yen.',
              },
            },
            {
              title: { ja: '送金の自由度', en: 'Freedom to move capital' },
              text: {
                ja: '利益・資本の100%本国送金が認められ、資金の出口設計が容易です。',
                en: '100% repatriation of profit and capital is permitted, making exit planning straightforward.',
              },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '為替の影響を試算する', en: 'Model the currency impact' },
          text: {
            ja: 'JPY⇄AEDの変動が利回りと手取りに与える影響は、投資シミュレーターで具体的に試算できます。',
            en: 'You can model how JPY⇄AED movements affect yield and take-home returns in our Investment Simulator.',
          },
        },
      ],
    },
    {
      slug: 'rental-yield',
      label: { ja: '賃貸利回り', en: 'Rental Yield' },
      title: { ja: '利回りで、世界の上位に立つ', en: 'Among the world’s strongest yields' },
      tagline: {
        ja: 'グロス6〜8%が狙える市場。東京の表面利回りを大きく上回る現実。',
        en: 'A market where 6–8% gross is achievable — well above the headline yields of Tokyo.',
      },
      image: IMG.yield,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ドバイ不動産の魅力を一言で言えば「高い賃貸利回り」です。エリアや物件タイプにより幅はありますが、グロスで6〜8%、高利回り物件では8%超も狙えます。多くの主要都市が3〜4%台に留まる中、この水準は際立っています。',
            en: 'If Dubai property can be summed up in one phrase, it is strong rental yield. Ranges vary by area and asset type, but 6–8% gross is common — and high-yield assets can exceed 8%. With many major cities stuck in the 3–4% range, this stands out.',
          },
        },
        {
          kind: 'chart',
          tone: 'dark',
          kicker: { ja: '利回りの比較', en: 'Yield, compared' },
          heading: { ja: 'エリア別グロス利回り', en: 'Gross yield by area' },
          chart: {
            type: 'bars',
            unit: '%',
            items: [
              { label: { ja: 'JVC', en: 'JVC' }, value: 8.4, highlight: true },
              { label: { ja: 'ドバイ・マリーナ', en: 'Dubai Marina' }, value: 7.1, highlight: true },
              { label: { ja: 'ダウンタウン', en: 'Downtown' }, value: 6.8, highlight: true },
              { label: { ja: 'パーム（ヴィラ）', en: 'Palm (villa)' }, value: 5.2 },
              { label: { ja: '東京（参考）', en: 'Tokyo (ref.)' }, value: 3.5 },
            ],
          },
          note: {
            ja: '※ 参考値。実際の利回りは物件・契約・運用形態で変動します。',
            en: '※ Illustrative figures. Actual yields vary by property, lease and operating model.',
          },
        },
        {
          kind: 'calculator',
          tone: 'light',
          kicker: { ja: 'ためしに、動かす', en: 'Try it yourself' },
          heading: { ja: '利回りシミュレーター', en: 'Yield calculator' },
          note: {
            ja: '※ スライダーを動かすと、年間賃料と円換算が即座に更新されます。参考値です。',
            en: '※ Drag the sliders — the annual rent and yen conversion update live. Illustrative only.',
          },
        },
        {
          kind: 'compare',
          tone: 'deep',
          kicker: { ja: '二都市を比べる', en: 'Two cities, compared' },
          heading: { ja: 'ドバイ vs 東京', en: 'Dubai vs Tokyo' },
          left: { ja: 'ドバイ', en: 'Dubai' },
          right: { ja: '東京', en: 'Tokyo' },
          rows: [
            { label: { ja: 'グロス利回り', en: 'Gross yield' }, left: { ja: '6〜8%', en: '6–8%' }, right: { ja: '3〜4%', en: '3–4%' } },
            { label: { ja: '個人所得税', en: 'Income tax' }, left: { ja: '0%', en: '0%' }, right: { ja: '最大45%', en: 'up to 45%' } },
            { label: { ja: 'キャピタルゲイン税', en: 'Capital gains tax' }, left: { ja: '0%', en: '0%' }, right: { ja: '約20%', en: '~20%' } },
            { label: { ja: '固定資産税', en: 'Annual property tax' }, left: { ja: 'なし', en: 'None' }, right: { ja: 'あり', en: 'Yes' } },
            { label: { ja: '外国人所有', en: 'Foreign ownership' }, left: { ja: '100%（指定区域）', en: '100% (freehold)' }, right: { ja: '可', en: 'Permitted' } },
          ],
        },
        {
          kind: 'points',
          tone: 'light',
          numbered: true,
          kicker: { ja: '利回りの内訳', en: 'What drives the yield' },
          heading: { ja: '高利回りを支える要因', en: 'Forces behind the yield' },
          items: [
            {
              title: { ja: '旺盛な賃貸需要', en: 'Robust rental demand' },
              text: {
                ja: '人口流入と観光・駐在需要が、空室リスクを抑え賃料を押し上げます。',
                en: 'Population inflows and tourist/expat demand suppress vacancy and lift rents.',
              },
            },
            {
              title: { ja: '低い保有コスト', en: 'Low holding costs' },
              text: {
                ja: '固定資産税や所得税がない分、手取りベースの利回りが高くなります。',
                en: 'With no property or income tax, net-of-cost yields run higher.',
              },
            },
            {
              title: { ja: '短期賃貸の上振れ', en: 'Short-let upside' },
              text: {
                ja: 'ホリデーホーム運用では、長期賃貸を上回る収益が狙える物件もあります。',
                en: 'Holiday-home operation can outperform long lets for the right asset.',
              },
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'deep',
          title: { ja: '※利回りは目安です', en: '※ Yields are indicative' },
          text: {
            ja: '掲載の数値はサンプルです。実際の利回りは物件・契約・運用形態で変動します。個別物件はドバイ不動産ページからご覧ください。',
            en: 'Figures shown are samples. Actual yields vary by property, lease and operating model. See live assets on the Dubai Properties page.',
          },
        },
      ],
    },
    {
      slug: 'market-statistics',
      label: { ja: '市場統計', en: 'Market Statistics' },
      title: { ja: '感覚ではなく、数字で見る', en: 'Read the market in numbers, not in feeling' },
      tagline: {
        ja: '人口増、価格上昇、外国人所有。ドバイ市場の地力をデータで確認する。',
        en: 'Population growth, price appreciation, foreign ownership — the market’s underlying strength, in data.',
      },
      image: IMG.stats,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ドバイ市場の説得力は、印象ではなくデータにあります。継続する人口増、安定した価格上昇、外国人の100%所有が認められるフリーホールド——これらの構造的な要因が、市場の地力を支えています。',
            en: 'The case for Dubai rests on data, not impressions. Sustained population growth, steady price appreciation, and freehold zones that allow 100% foreign ownership — structural forces that underpin the market’s strength.',
          },
        },
        {
          kind: 'stats',
          tone: 'dark',
          kicker: { ja: '主要指標', en: 'Headline indicators' },
          heading: { ja: '市場の体温', en: 'The market’s vital signs' },
          items: [
            { value: 3.8, decimals: 1, suffix: 'M+', label: { ja: 'ドバイ人口', en: 'Dubai population' } },
            { value: 6, suffix: '%+', label: { ja: '年間人口増ペース', en: 'Annual population growth' } },
            { value: 7, suffix: '%', label: { ja: '平均賃貸利回り', en: 'Average rental yield' } },
            { value: 100, suffix: '%', label: { ja: '外国人所有（指定区域）', en: 'Foreign ownership (freehold)' } },
          ],
        },
        {
          kind: 'chart',
          tone: 'deep',
          kicker: { ja: '価格の推移', en: 'Price trajectory' },
          heading: { ja: 'ドバイ住宅価格指数（2021 = 100）', en: 'Dubai residential price index (2021 = 100)' },
          chart: {
            type: 'line',
            points: [
              { label: { ja: '’21', en: '’21' }, value: 100 },
              { label: { ja: '’22', en: '’22' }, value: 118 },
              { label: { ja: '’23', en: '’23' }, value: 137 },
              { label: { ja: '’24', en: '’24' }, value: 152 },
              { label: { ja: '’25', en: '’25' }, value: 164 },
              { label: { ja: '’26', en: '’26' }, value: 173 },
            ],
          },
          note: {
            ja: '※ 参考の指数イメージです。確定値はご相談ください。',
            en: '※ Illustrative index for orientation. Verified figures on request.',
          },
        },
        {
          kind: 'points',
          tone: 'light',
          kicker: { ja: '構造的な追い風', en: 'Structural tailwinds' },
          heading: { ja: '数字の裏にある力学', en: 'The mechanics behind the numbers' },
          items: [
            {
              title: { ja: '人口流入の継続', en: 'Continued inflows' },
              text: {
                ja: 'ビジネス・観光・移住の中心地として人口が増え続け、住宅需要を底上げします。',
                en: 'As a hub for business, tourism and migration, the population keeps rising and lifts housing demand.',
              },
            },
            {
              title: { ja: '価格の上昇基調', en: 'An upward price trend' },
              text: {
                ja: '供給の質的向上とブランド開発が、中長期の資産価値を押し上げてきました。',
                en: 'Higher-quality supply and branded developments have lifted long-run asset values.',
              },
            },
            {
              title: { ja: 'グローバルハブ性', en: 'A genuine global hub' },
              text: {
                ja: '中東・アフリカ・南アジアへの結節点であることが、需要の地理的な厚みを生みます.',
                en: 'As a node into the Middle East, Africa and South Asia, demand draws on a wide geography.',
              },
            },
          ],
        },
      ],
    },
    {
      slug: 'golden-visa',
      label: { ja: 'ゴールデンビザ', en: 'Golden Visa Guide' },
      title: { ja: 'ゴールデンビザ、完全ガイド', en: 'The Golden Visa, in full' },
      tagline: {
        ja: '5〜10年の長期居住。投資・人材・事業——あなたはどの道で資格を得るか。',
        en: 'Five-to-ten-year residency. Investment, talent or enterprise — which path qualifies you?',
      },
      image: IMG.golden,
      blocks: [
        {
          kind: 'lead',
          tone: 'light',
          text: {
            ja: 'ゴールデンビザは、UAEが優秀な投資家・人材・起業家に長期居住を認める制度です。一定額以上の不動産投資を起点に取得できる道もあり、家族の帯同も可能。「ドバイに資産と生活の拠点を持つ」ことを現実にします。',
            en: 'The Golden Visa is the UAE’s programme granting long-term residency to outstanding investors, talents and entrepreneurs. One route begins with qualifying property investment, family included — making a real base of assets and life in Dubai achievable.',
          },
        },
        {
          kind: 'cards',
          tone: 'light',
          kicker: { ja: '取得の道', en: 'Routes to qualify' },
          heading: { ja: '主な適格カテゴリー', en: 'Principal eligibility paths' },
          items: [
            {
              title: { ja: '不動産投資家', en: 'Property Investor' },
              meta: { ja: '基準額以上の取得', en: 'Above the threshold' },
              text: {
                ja: '基準額以上の不動産を保有することで、長期居住資格の対象となり得ます。',
                en: 'Holding property above the qualifying threshold can make you eligible for long-term residency.',
              },
            },
            {
              title: { ja: '起業家・事業主', en: 'Entrepreneur' },
              meta: { ja: '事業・出資', en: 'Business & capital' },
              text: {
                ja: '一定要件を満たす事業や出資を通じて、起業家としての資格取得が可能です。',
                en: 'Qualifying ventures and capital commitments can secure residency as an entrepreneur.',
              },
            },
            {
              title: { ja: '専門人材', en: 'Specialised Talent' },
              meta: { ja: '専門・実績', en: 'Skills & record' },
              text: {
                ja: '専門領域での実績・資格を持つ人材も、ゴールデンビザの対象となります。',
                en: 'Professionals with recognised expertise and achievements also qualify.',
              },
            },
          ],
        },
        {
          kind: 'faq',
          tone: 'deep',
          kicker: { ja: 'よくある質問', en: 'Common questions' },
          heading: { ja: '取得前に知っておきたいこと', en: 'What to know before you apply' },
          items: [
            {
              q: { ja: '家族も一緒に居住できますか？', en: 'Can my family reside with me?' },
              a: {
                ja: '配偶者・子を帯同できる設計が可能です。要件は時期により更新されるため、最新の基準で確認します。',
                en: 'Yes — spouse and children can typically be included. Requirements update over time, so we verify against the latest rules.',
              },
            },
            {
              q: { ja: '常時ドバイに住む必要がありますか？', en: 'Must I live in Dubai full-time?' },
              a: {
                ja: 'ゴールデンビザは長期滞在に柔軟性があり、長期間の国外滞在でも維持しやすい設計です。',
                en: 'The Golden Visa offers flexibility, and is designed to remain valid even through extended periods abroad.',
              },
            },
            {
              q: { ja: '取得までどのくらいかかりますか？', en: 'How long does it take?' },
              a: {
                ja: '書類の整い方と区分によります。JWDは申請パッケージを最適化し、待機時間を最小化します。',
                en: 'It depends on documentation and category. JWD optimises the application package to minimise waiting time.',
              },
            },
          ],
        },
        {
          kind: 'links',
          tone: 'light',
          heading: { ja: '次のステップ', en: 'Next steps' },
          items: [
            { label: { ja: 'ビザ制度の全体像', en: 'Visa Programs' }, url: '/why-dubai/visa-programs' },
            { label: { ja: '無料相談を予約', en: 'Book a consultation' }, url: '/contact' },
          ],
        },
      ],
    },
  ],
};
