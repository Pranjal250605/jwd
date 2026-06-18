import type { L } from './types';

export interface HighlightDetail {
  id: string;
  stat: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: L;
  };
  title: L;
  description: L;
  points: { title: L; text: L }[];
}

export const highlights: Record<string, HighlightDetail> = {
  tax: {
    id: 'tax',
    stat: { value: 0, suffix: '%', label: { ja: '個人所得税', en: 'Personal income tax' } },
    title: {
      ja: '税が、資産を削らない国',
      en: 'A country where tax does not erode wealth',
    },
    description: {
      ja: 'ドバイ（UAE）の最大の魅力は、税が資産形成の足かせにならないことです。個人所得税ゼロ、キャピタルゲイン課税ゼロ、相続税・贈与税もなし。日本では当然のように差し引かれてきた税負担が、ここには存在しません。',
      en: 'Dubai’s greatest draw is that tax does not act as a brake on building wealth. Zero personal income tax, zero capital gains tax, and no inheritance or gift tax. The deductions that feel inevitable in Japan simply do not exist here.',
    },
    points: [
      {
        title: { ja: '複利効果の最大化', en: 'Maximising compound growth' },
        text: {
          ja: '所得税やキャピタルゲイン課税がないということは、毎年、再投資に回せる原資が大きくなることを意味します。長期では、この差が複利となって資産曲線を押し上げます。',
          en: 'No income or capital-gains tax means more capital recycled into reinvestment every year. Over time that gap compounds — bending the wealth curve upward.',
        },
      },
      {
        title: { ja: '法人税は9%', en: 'Corporate tax at 9%' },
        text: {
          ja: '一定額を超える法人利益には9%の法人税が課されますが、フリーゾーン優遇を活用すれば依然として強力な節税効果が得られます。',
          en: 'Profits above a threshold now carry a 9% corporate tax, but free-zone incentives can still offer powerful tax advantages.',
        },
      },
    ],
  },
  yield: {
    id: 'yield',
    stat: { value: 7, suffix: '%', label: { ja: '平均賃貸利回り', en: 'Average rental yield' } },
    title: {
      ja: '利回りで、世界の上位に立つ',
      en: 'Among the world’s strongest yields',
    },
    description: {
      ja: 'ドバイ不動産の魅力を一言で言えば「高い賃貸利回り」です。エリアや物件タイプにより幅はありますが、グロスで6〜8%、高利回り物件では8%超も狙えます。多くの主要都市が3〜4%台に留まる中、この水準は際立っています。',
      en: 'If Dubai property can be summed up in one phrase, it is strong rental yield. Ranges vary by area and asset type, but 6–8% gross is common — and high-yield assets can exceed 8%. With many major cities stuck in the 3–4% range, this stands out.',
    },
    points: [
      {
        title: { ja: '低い保有コスト', en: 'Low holding costs' },
        text: {
          ja: '固定資産税や所得税がない分、手取りベースの利回りが高くなります。',
          en: 'With no property or income tax, net-of-cost yields run higher.',
        },
      },
      {
        title: { ja: '旺盛な賃貸需要', en: 'Robust rental demand' },
        text: {
          ja: '人口流入と観光・駐在需要が、空室リスクを抑え賃料を押し上げます。',
          en: 'Population inflows and tourist/expat demand suppress vacancy and lift rents.',
        },
      },
    ],
  },
  growth: {
    id: 'growth',
    stat: { value: 6, suffix: '%+', label: { ja: '年間人口増', en: 'Annual population growth' } },
    title: {
      ja: '都市の成長が資産価値を押し上げる',
      en: 'City growth driving asset value',
    },
    description: {
      ja: 'ドバイ市場の説得力は、印象ではなくデータにあります。ビジネス・観光・移住の中心地として人口が増え続け、それが直接的に住宅需要と資産価値の底上げにつながっています。',
      en: 'The case for Dubai rests on data, not impressions. As a hub for business, tourism and migration, the population keeps rising, directly lifting housing demand and asset values.',
    },
    points: [
      {
        title: { ja: '継続的な人口流入', en: 'Sustained population inflows' },
        text: {
          ja: '世界中から富裕層や優秀な人材が集まり続け、現在の約380万人からさらなる拡大が見込まれています。',
          en: 'Wealth and talent continue to gather from around the globe, with the current population of ~3.8M projected to expand further.',
        },
      },
      {
        title: { ja: 'グローバルハブとしての地位', en: 'Status as a global hub' },
        text: {
          ja: '中東・アフリカ・南アジアへの結節点であることが、需要の地理的な厚みを生んでいます。',
          en: 'As a node into the Middle East, Africa and South Asia, demand draws on a remarkably wide geography.',
        },
      },
    ],
  },
  ownership: {
    id: 'ownership',
    stat: { value: 100, suffix: '%', label: { ja: '外国人所有（指定区域）', en: 'Foreign ownership (freehold)' } },
    title: {
      ja: '外国人が土地を100%所有できる特区',
      en: 'Freehold zones for 100% foreign ownership',
    },
    description: {
      ja: 'ドバイでは、外国人が土地および建物を100%完全に所有できる「フリーホールド（完全所有権）エリア」が指定されています。ダウンタウンやマリーナなど、主要な投資エリアはすべてこれに該当します。',
      en: 'Dubai has designated "freehold areas" where foreigners can own 100% of both land and property. All major investment zones, such as Downtown and Dubai Marina, fall under this category.',
    },
    points: [
      {
        title: { ja: '完全な所有権の保護', en: 'Full ownership protection' },
        text: {
          ja: '借地権ではなく、半永久的な完全所有権（Freehold）としてドバイ土地局（DLD）に登記され、法的権利が強固に守られます。',
          en: 'Properties are registered with the Dubai Land Department (DLD) as absolute freehold, not leasehold, ensuring robust legal protection.',
        },
      },
      {
        title: { ja: 'ビザ取得への直結', en: 'Direct link to visas' },
        text: {
          ja: '一定額以上の物件を所有することで、不動産投資ビザやゴールデンビザ（長期居住権）の申請資格が得られます。',
          en: 'Owning property above certain thresholds makes you eligible for property investor visas or the Golden Visa for long-term residency.',
        },
      },
    ],
  },
};
