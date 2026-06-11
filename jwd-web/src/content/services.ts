/**
 * The 8 core consulting services — ported from foj-app/src/data/servicePages.ts.
 * Full per-service content (overview, focus areas, FAQ) migrates with the
 * /consulting detail pages in a later sprint; this is the homepage layer.
 */
export interface ServiceSummary {
  id: string;
  titleJa: string;
  titleEn: string;
  subtitle: string; // EN strategic subtitle from the original data
  descJa: string;
  descEn: string;
}

export const services: ServiceSummary[] = [
  {
    id: 'company-formation',
    titleJa: '法人設立',
    titleEn: 'Company Formation',
    subtitle: 'Strategic Mainland & Free Zone Setup',
    descJa:
      'フリーゾーン・メインランド・オフショアの最適構造を選定し、設立から成長戦略まで一貫して支援します。',
    descEn:
      'Optimal mainland, free-zone or offshore structuring — from incorporation through growth strategy.',
  },
  {
    id: 'license-acquisition',
    titleJa: 'ライセンス取得',
    titleEn: 'License Acquisition',
    subtitle: 'Commercial & Professional Licensing Strategy',
    descJa:
      '長期的な成長戦略を見据えた最適なライセンス分類（Activity）の選定と取得を代行します。',
    descEn:
      'Activity classification and licensing aligned with your long-term growth strategy.',
  },
  {
    id: 'visa-acquisition',
    titleJa: 'VISA取得',
    titleEn: 'Visa Acquisition',
    subtitle: 'Strategic Investor & Workforce Mobility',
    descJa:
      'ゴールデンビザから就労・家族ビザまで、シームレスな発給プロセスを提供します。',
    descEn:
      'From Golden Visas to employment and family visas — one seamless issuance process.',
  },
  {
    id: 'emirates-id-acquisition',
    titleJa: 'エミレーツID取得',
    titleEn: 'Emirates ID',
    subtitle: 'National Identity & Seamless Integration',
    descJa:
      '申請から生体認証、カード受領までVIP対応で「待機時間」を最小化します。',
    descEn:
      'VIP-handled application, biometrics and issuance — waiting time minimized.',
  },
  {
    id: 'corporate-bank-account',
    titleJa: '法人銀行口座開設',
    titleEn: 'Corporate Banking',
    subtitle: 'Corporate Banking, Treasury & Trade Finance Setup',
    descJa:
      '厳格化するKYC審査に対応する完璧な申請パッケージで、確実な口座開設を実現します。',
    descEn:
      'Bank-grade KYC packages that clear today’s strict corporate onboarding.',
  },
  {
    id: 'personal-bank-account',
    titleJa: '個人銀行口座開設',
    titleEn: 'Personal Banking',
    subtitle: 'Wealth & Private Banking Solutions',
    descJa:
      'リテールからプライベートバンクまで、資産背景に応じた最適な口座戦略を設計します。',
    descEn:
      'From retail to private banking — account strategy matched to your wealth profile.',
  },
  {
    id: 'tax-registration',
    titleJa: '税務署登録',
    titleEn: 'Tax Registration',
    subtitle: 'Corporate Tax & VAT Compliance',
    descJa:
      'VAT・コーポレートタックスの登録から申告まで、FTA準拠で一括管理します。',
    descEn:
      'VAT and corporate-tax registration and filings, fully FTA-compliant.',
  },
  {
    id: 'accounting-audit',
    titleJa: '会計監査',
    titleEn: 'Accounting & Audit',
    subtitle: 'Statutory Audit & IFRS Reporting',
    descJa:
      'IFRS準拠の記帳・監査体制で、財務の透明性を企業の武器に変えます。',
    descEn:
      'IFRS bookkeeping and statutory audit that turn transparency into advantage.',
  },
];
