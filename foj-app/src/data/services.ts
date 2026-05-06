// ─── Shared image URLs (confirmed-working AIDA public images) ───────────────
export const IMG = {
  architecture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA80AIU9e41-2rcz8150Gqowwq015ZQLTT3EiLIqzOk4jXVbdmuLn90BKER8Dv_KADSPWoO6oCzAXuxBiIfeBpgGhvMPomMTe7k6_rTrgygFZLxNifXz_7RU8qV0KAFhZV8LvDi0Oj4eAKZqlPhndfgMrew_xLHS1yS8yLAEqWVA1wlomj3zUwrSV0jbFGyrIzHvs73R_fnpZegal-oB3Z0T8MBPL7gI3Tmd78y0GEYbwHG2bq-9PZc_La6jhoc2j_xl5put8_eHVit',
  penOnPaper:   'https://lh3.googleusercontent.com/aida-public/AB6AXuB1roq9jzq0EOiHfhFg8nPDbCN-wWZQhMT07h6sDdjd1ha9RHncGGJNmpz7mh35PzEmTnHO7ZEtxTYIbVaDiy8DXygztPg-w9vQ-9Ojrunti_4QbEWeY-GQP-Zf1MjId1_RRwqCOC7liYEd5NbU1fCX-nvm86kCRND5SpF6YfUwUyuEt9rS1IcLqtE966NTMxB8URmZnwe6-6w9DzCY12gFrmlsSNtgFbnsy-nKFTsh8K62P4ZlepGaiDmlwR30wCcaYlZe0Cl76R0k',
  bonsai:       'https://lh3.googleusercontent.com/aida-public/AB6AXuDZLH3kGe0Tmt9-Oj29skWIBBWxHg75YIOtVuyin-gUDbMOyQqDa7Pkr5TvrV_8WZDNVvp8cgfkDbbwGt_dkCIfP3Y54xKFAEDz1qMZZHLCxvwZpz8ECwLqm28Y8X-U1X-orJEey96FHQQDacn6H4VH5dGS6XHR33BySDN5hEmPuQrA8fKozSc6jSLSbvIGuDlo3Lic5E18bh8wHHr2JHGzFp0uEksuRX0FRJqFVq5E-4jaL089TAyJz6cZVs8JVqaesGXDshrmE0-g',
  washi:        'https://lh3.googleusercontent.com/aida-public/AB6AXuDWsgkQ-8fVt3mUEZCjvGkj-lVEB1XvSezhJUs3TcTOeUoMZf7Ck8x4t7PfZTmdAPm1uyqDYeV91zhfZv5Z5GUYNlrW9RkgYYyhbn7sr8kx4midHDRKs5wkivofF9jc3LwtPoZC3RcMY3MxG57xtEqmR1jDixhPXclwczSnBMxGWaNzAHlPhgdX7qsyImXJ7fQ4OBR5Ybo82xalNsZEMfsBYbe5mSwLwcXPcGnQOTYGcGnwEIgzWyaZ4jvSrwF5mxPfqOo4XqlDcNvM',
  stoneGarden:  'https://lh3.googleusercontent.com/aida-public/AB6AXuDqNKJ-IER__53jD-gh3ANUytx-viD1cGyFyGCTnyMZ7eCcHQBYBigkvUyeJtyWbvkoHkBrq-bujo_hLiBSK6kGNEz6I9jgL45Is3VeL4ltrcBkq6IviSJ-rNhY-TiMvFZPaHl44yfv86xfv-HwUl2_cTRqVbKF399kx0w1ubRy7skd4rvwOfcLF3QaRSutnMplsNI2cg-1ZtXLrMn0k0bXFCUe0e6YAzC52yRAShr6gMCT03omgNetjEeC2Qag6OlGNE51YR1sJJkX',
  news1:        'https://lh3.googleusercontent.com/aida-public/AB6AXuAiQ3xEzlWT1zV6eptmpIXICi1Dwvvb3mUW2Dt0Nr5EifCcroJrD9JWZIfqBzA86SrYqFN9KKrC6Z0Xm1wkXGtBtmHpFySJNAA0uUp5SqINFKSKFRdh72SpAzYQs65m809iWUL0jMUZVo3o-yvZO4ovGHkLFcXUynNL53hGj7amw8IFblhH-KeXKDYmDQThQMLWxYn5Ojb8dasuHUN0uSn_2pWnmdID-wDK-6gB6zFD9mt4cEUmSL1HicmdQHfXbHZCCJAVT7TiP1bV',
  news2:        'https://lh3.googleusercontent.com/aida-public/AB6AXuDgyRIAX_MWRSfr9AVUwxrklZMvfwUwztHRWkYKq4PfFASvQAAQ_hOKzcK4TZKQQ_8B-FxJjld9fpuVTSaB9-Kd-ls_tEVZUnBsgjjTHOtwDcuc5X5wtf3KwQ3WQQ9gUKcoYdXfvnWTspEdVJ0hOz9bm0tJS164OBDxmC-A-b_7Cqtq6_TLkFXscCs_A2XzFWEZ1998IbyVgTIV05uUbJ7UbQddx_CUt4Aq1NU0d6aGWMScOZUGecN-haGveKJbMZJtjiPH86yLzrsc',
};

// ─── Shared icons (Material Symbols names) ───────────────────────────────────
type ServiceData = {
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  heroImage: string;
  stat: { number: string; label: string };
  overview: { heading: string; paragraphs: string[] };
  challenges: { heading: string; items: { icon: string; title: string; desc: string }[] };
  approach: { heading: string; steps: { num: string; title: string; desc: string }[] };
  included: { heading: string; items: string[] };
  timeline: { heading: string; steps: { phase: string; duration: string; desc: string }[] };
  whyFOJ: { heading: string; reasons: { icon: string; title: string; desc: string }[] };
};

export const services: ServiceData[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. 法人設立
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'corporate-formation',
    title: '法人設立',
    titleEn: 'Corporate Formation',
    subtitle: 'Structuring your UAE legal entity for long-term competitive advantage',
    heroImage: IMG.architecture,
    stat: { number: '50+', label: 'UAE Free Zones Available' },
    overview: {
      heading: 'Establish the Right Legal Foundation',
      paragraphs: [
        'Selecting the optimal corporate structure is the single most consequential decision a business makes when entering the UAE market. A misaligned entity type imposes constraints on operations, ownership, taxation, and capital repatriation that compound over time — often forcing costly restructuring at exactly the wrong moment.',
        'FOJ\'s Corporate Formation advisory provides a systematic, end-to-end capability: from jurisdiction and structure analysis, to drafting constitutional documents, liaising with relevant authorities, and delivering a fully operational legal entity. We act as your authorised representative throughout the process, eliminating ambiguity and accelerating time-to-market.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in UAE Corporate Formation',
      items: [
        {
          icon: 'account_tree',
          title: 'Jurisdiction Complexity',
          desc: 'Choosing between 40+ Free Zones, Mainland DED jurisdiction, and Offshore registrations requires deep knowledge of activity restrictions, shareholding rules, and regulatory obligations unique to each authority.',
        },
        {
          icon: 'gavel',
          title: 'Regulatory Navigation',
          desc: 'Each authority maintains distinct documentation standards, approval workflows, and MOA requirements. Errors at the application stage create delays that cascade across visa, banking, and operational timelines.',
        },
        {
          icon: 'balance',
          title: 'Ownership & Control Structure',
          desc: 'Mainland entities now permit 100% foreign ownership in most sectors, but specific activities still require a UAE national service agent or local partner — a nuance that demands precise activity classification before proceeding.',
        },
        {
          icon: 'currency_exchange',
          title: 'Tax & Repatriation Planning',
          desc: 'The 2023 Corporate Tax regime and Free Zone Qualifying Income rules create structuring opportunities and risks that must be evaluated at incorporation — not retrospectively.',
        },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        {
          num: '01',
          title: 'Strategic Structure Design',
          desc: 'We analyse your business model, activity scope, ownership preferences, and five-year growth trajectory. We then recommend the optimal jurisdiction (Free Zone, Mainland, or Offshore) and entity type, with a clear rationale and risk assessment for each option.',
        },
        {
          num: '02',
          title: 'Documentation & Authority Liaison',
          desc: 'FOJ prepares all constitutional documents (MOA, AOA, shareholder agreements), coordinates notarisation, and manages submissions to the relevant authority on your behalf. We maintain real-time tracking of application status and proactively resolve queries.',
        },
        {
          num: '03',
          title: 'Completion & Post-Formation',
          desc: 'We deliver all formation certificates, trade names, and official documents. We then coordinate the downstream steps — licence issuance, visa eligibility confirmation, and bank account readiness — ensuring your entity is fully operational from day one.',
        },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Jurisdiction and entity type feasibility assessment',
        'Trade name reservation and approval',
        'Memorandum and Articles of Association (MOA/AOA) drafting',
        'Notarisation and attestation coordination',
        'Authority application submission and tracking',
        'Certificate of Incorporation / Commercial Registration',
        'Share certificate preparation',
        'Registered office address provision (where applicable)',
        'Post-formation compliance checklist and roadmap',
        'Coordination with licence, visa, and banking workstreams',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Phase 1 — Assessment', duration: '1–2 days', desc: 'Structure consultation, jurisdiction recommendation, and engagement confirmation.' },
        { phase: 'Phase 2 — Documentation', duration: '2–3 days', desc: 'Document preparation, notarisation, and authority pre-checks.' },
        { phase: 'Phase 3 — Application & Approval', duration: '3–10 days', desc: 'Formal submission to authority. Free Zone approvals typically 3–5 days; Mainland DED 7–15 days.' },
        { phase: 'Phase 4 — Completion', duration: '1–2 days', desc: 'Certificate collection, document delivery, and downstream coordination initiation.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Corporate Formation',
      reasons: [
        { icon: 'hub', title: 'Authority Network', desc: 'Direct relationships with DIFC, ADGM, IFZA, Meydan, and DED Mainland teams accelerate approvals and resolve blockers that generic agencies cannot.' },
        { icon: 'translate', title: 'Japanese-Language Advisory', desc: 'All consultations, documents, and progress updates delivered in Japanese — eliminating translation risk and ensuring shareholders fully understand every decision.' },
        { icon: 'route', title: 'Integrated Workflow', desc: 'Formation is step one of eight. By managing the full setup journey, we prevent the structural misalignments that fragment multi-vendor approaches.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ライセンス取得
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'license-acquisition',
    title: 'ライセンス取得',
    titleEn: 'License Acquisition',
    subtitle: 'Securing the right trading authority to operate, expand, and remain compliant',
    heroImage: IMG.penOnPaper,
    stat: { number: '2,000+', label: 'Licensed Business Activities in UAE' },
    overview: {
      heading: 'The Commercial Licence as a Strategic Asset',
      paragraphs: [
        'A UAE trade licence is not merely an administrative requirement — it defines the legal scope of your commercial activities, determines your regulatory obligations, and governs the terms under which you can hire staff, open bank accounts, and contract with third parties. An incorrectly classified licence creates operational blind spots and exposes the business to regulatory risk.',
        'FOJ provides comprehensive licence acquisition support: from activity classification and authority selection, through application management and issuance, to ongoing renewal and expansion. We manage the complexity so you can focus on building your business.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in UAE Licence Acquisition',
      items: [
        { icon: 'category', title: 'Activity Classification', desc: 'With over 2,000 licensed activities across UAE authorities, selecting the precise classification that covers your operations — without over-scoping and incurring unnecessary fees — requires expert knowledge.' },
        { icon: 'corporate_fare', title: 'Authority Fragmentation', desc: 'Each Free Zone maintains its own approved activity list. An activity permitted in IFZA may be categorised differently in DIFC or DMCC, demanding authority-specific expertise.' },
        { icon: 'add_circle', title: 'Multi-Licence Requirements', desc: 'Businesses operating across sectors — e.g., trading plus consulting — often require multiple licences. Co-ordinating simultaneous applications while managing dependencies requires dedicated project management.' },
        { icon: 'autorenew', title: 'Renewal Compliance', desc: 'Annual licence renewal is a statutory obligation. Late or missed renewals attract penalties, put visas at risk, and can lead to entity deregistration.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Activity Mapping & Selection', desc: 'We conduct a detailed review of your business model and map it to the authorised activity classifications of the target Free Zone or Mainland authority. We advise on the minimum viable licence scope and flag any restricted activities requiring special approval.' },
        { num: '02', title: 'Application Management', desc: 'FOJ prepares the full application dossier, liaises with the licensing authority, and manages the approval workflow. We proactively respond to authority queries and escalate where necessary to minimise delays.' },
        { num: '03', title: 'Issuance, Renewal & Expansion', desc: 'On issuance, we deliver your licence with a structured renewal calendar. As your business evolves, we manage activity additions, licence upgrades, and authority transfers with the same rigour as the initial application.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Business activity analysis and optimal classification advisory',
        'Authority and Free Zone suitability assessment',
        'Licence type selection (Commercial, Professional, Industrial, Tourism)',
        'Application form preparation and submission',
        'Authority liaison and query resolution',
        'Trade licence certificate procurement',
        'Multi-licence co-ordination where applicable',
        'Annual renewal management and calendar',
        'Activity amendment and addition support',
        'Compliance monitoring for licence-linked obligations',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Activity Classification', duration: '1 day', desc: 'Business model review and activity mapping to authority classification lists.' },
        { phase: 'Application Preparation', duration: '1–2 days', desc: 'Document package assembly and pre-submission checks.' },
        { phase: 'Authority Processing', duration: '3–7 days', desc: 'Standard Free Zone issuance. Mainland DED may require 5–10 days for specialised activities.' },
        { phase: 'Licence Delivery', duration: '1 day', desc: 'Digital and physical licence delivery with downstream coordination.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Licence Acquisition',
      reasons: [
        { icon: 'verified', title: 'Zero Misclassification Risk', desc: 'Our activity mapping process eliminates the most common and costly licence error — misclassification — which invalidates contracts and triggers regulatory scrutiny.' },
        { icon: 'calendar_month', title: 'Proactive Renewal Management', desc: 'We track every client licence expiry and initiate renewals 45 days in advance, ensuring you are never operationally disrupted by a lapsed licence.' },
        { icon: 'link', title: 'Integrated with Formation', desc: 'Licence acquisition runs in parallel with corporate formation, compressing the total setup timeline by eliminating handoff delays between vendors.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. VISA取得
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'visa-acquisition',
    title: 'VISA取得',
    titleEn: 'VISA Acquisition',
    subtitle: 'Securing UAE residency rights for investors, employees, and families',
    heroImage: IMG.architecture,
    stat: { number: '10', label: 'Year Golden Visa Available' },
    overview: {
      heading: 'Residency as a Strategic Foundation',
      paragraphs: [
        'UAE residency is the gateway to operating, banking, and living in one of the world\'s most dynamic jurisdictions. Whether you are an investor establishing a holding structure, an entrepreneur relocating with family, or a corporate deploying key personnel — the visa classification, sponsorship structure, and processing pathway you choose have long-term consequences for your tax residency status, asset mobility, and operational flexibility.',
        'FOJ manages the complete visa lifecycle: from eligibility determination and visa type selection, through ICA and GDRFA application management, entry permit processing, status change, medical fitness coordination, and Emirates ID linkage. We handle complexity across all visa categories so your team can focus on the work that matters.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in UAE Visa Acquisition',
      items: [
        { icon: 'badge', title: 'Visa Category Selection', desc: 'Investor, employment, freelance, green, and golden visas each carry different eligibility criteria, processing authorities, and long-term implications — a decision that demands both regulatory knowledge and strategic perspective.' },
        { icon: 'description', title: 'Documentation Precision', desc: 'Document requirements are authority-specific, frequently updated, and intolerant of error. Incomplete applications are rejected without refund of fees and restart processing timelines.' },
        { icon: 'family_restroom', title: 'Family Sponsorship Complexity', desc: 'Sponsoring dependants — spouses, children, domestic staff — involves parallel processes, salary thresholds, and accommodation requirements that must be co-ordinated carefully.' },
        { icon: 'loop', title: 'Status Change Management', desc: 'Changing visa type (e.g., visit visa to residence visa), renewing expiring permits, or cancelling and re-applying under a different sponsor are high-risk processes if managed without expert guidance.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Eligibility & Category Assessment', desc: 'We assess your profile, business structure, and objectives to identify the optimal visa category and sponsorship arrangement. For investors, we evaluate Golden Visa eligibility based on property holdings, entity value, and contribution criteria.' },
        { num: '02', title: 'End-to-End Application Management', desc: 'FOJ prepares the complete application dossier, submits to ICA or GDRFA as applicable, tracks status in real time, manages medical fitness appointments, and accompanies clients to Emirates ID biometric enrolment where required.' },
        { num: '03', title: 'Activation, Linkage & Ongoing Management', desc: 'On visa stamping, we ensure Emirates ID linkage, health insurance compliance, and sponsor-entity alignment. We maintain a renewal calendar for all visa holders within your corporate family and proactively manage renewals and amendments.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Visa type eligibility assessment (Investor, Employment, Freelance, Golden, Green)',
        'Entry permit application and approval',
        'Status change coordination (visit-to-residence)',
        'Medical fitness test scheduling and accompaniment',
        'ICA / GDRFA application submission and tracking',
        'Emirates ID application linkage (see Emirates ID service)',
        'Visa stamping coordination',
        'Family / dependent visa sponsorship management',
        'Domestic worker visa application support',
        'Annual renewal calendar and proactive renewal management',
        'Visa cancellation and transfer advisory',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Entry Permit', duration: '3–5 days', desc: 'Initial entry permit approval via ICA online platform.' },
        { phase: 'Medical & Biometrics', duration: '2–3 days', desc: 'Medical fitness test and Emirates ID biometric enrolment.' },
        { phase: 'Residence Visa Stamping', duration: '3–5 days', desc: 'Passport stamping at GDRFA or authorised typing centre.' },
        { phase: 'Emirates ID Delivery', duration: '5–7 days', desc: 'Physical Emirates ID card delivery (see Emirates ID service).' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for VISA Acquisition',
      reasons: [
        { icon: 'support_agent', title: 'Full-Journey Accompaniment', desc: 'We accompany clients to medical fitness centres and Emirates ID biometric appointments — eliminating the language barrier and ensuring no procedural error at the point of highest friction.' },
        { icon: 'family_restroom', title: 'Family-Inclusive Planning', desc: 'Investor, spouse, child, and domestic worker visas managed in a single coordinated workflow — reducing total processing time by 40% versus sequential applications.' },
        { icon: 'security', title: 'Compliance Assurance', desc: 'Every visa application includes a pre-submission compliance check against the latest ICA/GDRFA requirements, minimising rejection risk and protecting your setup investment.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. エミレーツID取得
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'emirates-id',
    title: 'エミレーツID取得',
    titleEn: 'Emirates ID Acquisition',
    subtitle: 'Establishing your verified identity within the UAE\'s national registration framework',
    heroImage: IMG.washi,
    stat: { number: '5–7', label: 'Business Days to Delivery' },
    overview: {
      heading: 'The Foundation of UAE Residency Identity',
      paragraphs: [
        'The Emirates ID — issued by the Identity and Citizenship Authority (ICA) — is the mandatory biometric identification card for all UAE residents. It is required to open bank accounts, access government services, register vehicles, purchase property, obtain a SIM card, and execute a range of everyday transactions. Without it, your UAE presence is administratively incomplete.',
        'While the Emirates ID process runs in parallel with residence visa stamping, its application, biometric enrolment, and delivery involve distinct steps with their own timelines and compliance requirements. FOJ manages the full Emirates ID journey as an integrated component of your visa and onboarding workflow.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in Emirates ID Acquisition',
      items: [
        { icon: 'fingerprint', title: 'Biometric Enrolment Logistics', desc: 'Biometric appointments at ICA-approved typing centres require pre-scheduling, document verification, and — for non-Arabic speakers — confident navigation of an Arabic-interface registration process.' },
        { icon: 'sync_problem', title: 'Visa-ID Synchronisation', desc: 'Emirates ID expiry must align with residency visa expiry. Misalignment creates compliance gaps that affect banking, tenancy renewals, and government service access.' },
        { icon: 'edit_document', title: 'Amendment Complexity', desc: 'Changes to name, address, or sponsor details require formal ICA amendment applications. Delays in amendment processing can invalidate linked services.' },
        { icon: 'lock_reset', title: 'Renewal Timing', desc: 'Emirates IDs must be renewed before expiry. A lapsed ID creates cascading compliance issues across all registered services — banking, utilities, and government portals.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Application Preparation', desc: 'FOJ prepares and submits the ICA online application with the correct residency visa reference, ensuring field accuracy and attaching the required biometric-ready photograph and document set.' },
        { num: '02', title: 'Biometric Enrolment Support', desc: 'We schedule your biometric appointment at an ICA-approved centre and accompany you through the enrolment process — managing the language interface, verifying data entry, and resolving on-the-spot queries.' },
        { num: '03', title: 'Delivery, Linkage & Renewal Management', desc: 'We track card production and coordinate delivery or collection. On receipt, we verify expiry alignment with your visa and add the renewal date to your compliance calendar. All future amendments and renewals are managed proactively.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'ICA online application preparation and submission',
        'Required photograph and document verification',
        'Biometric appointment scheduling',
        'Accompaniment to ICA typing centre',
        'Arabic-interface navigation support',
        'Card production status tracking',
        'Emirates ID physical card delivery coordination',
        'Expiry-visa alignment verification',
        'Amendment application management (name, address, sponsor)',
        'Annual renewal calendar integration',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Application & Submission', duration: '1 day', desc: 'ICA portal application preparation and submission.' },
        { phase: 'Biometric Appointment', duration: '1 day', desc: 'In-person biometric enrolment at ICA typing centre.' },
        { phase: 'Card Production', duration: '3–5 days', desc: 'ICA production and print cycle.' },
        { phase: 'Card Delivery', duration: '1–2 days', desc: 'Collection or courier delivery to registered address.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Emirates ID',
      reasons: [
        { icon: 'interpreter_mode', title: 'Language Barrier Eliminated', desc: 'ICA systems operate primarily in Arabic. Our accompaniment service ensures accurate data entry, preventing re-applications caused by transliteration or field errors.' },
        { icon: 'link', title: 'Visa-ID Integration', desc: 'Managed as part of the visa workflow, not as a separate engagement — ensuring perfect synchronisation of expiry dates and sponsor references from day one.' },
        { icon: 'notifications_active', title: 'Proactive Renewal Alerts', desc: 'Renewal reminders are issued 60 days before expiry as standard. We initiate the renewal process and complete it before any service disruption occurs.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. 法人銀行口座開設
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'corporate-bank-account',
    title: '法人銀行口座開設',
    titleEn: 'Corporate Bank Account Opening',
    subtitle: 'Securing institutional banking access for your UAE legal entity',
    heroImage: IMG.penOnPaper,
    stat: { number: '3–8', label: 'Weeks Average Processing' },
    overview: {
      heading: 'Banking Access as a Critical Operational Prerequisite',
      paragraphs: [
        'A UAE corporate bank account is operationally non-negotiable — it underpins payroll, supplier payments, investor distributions, and regulatory fee settlements. Yet the post-2020 compliance environment has made corporate account opening one of the most challenging steps in the UAE market entry journey, with major banks tightening KYC requirements, increasing documentation thresholds, and extending due diligence timelines.',
        'FOJ leverages long-standing relationships with UAE\'s leading commercial and private banks to navigate this environment efficiently. We do not refer clients to banks. We actively manage the engagement: preparing a compliance-grade KYC dossier, briefing relationship managers, accompanying clients to interviews, and managing the post-submission queries that determine approval velocity.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in Corporate Bank Account Opening',
      items: [
        { icon: 'policy', title: 'Enhanced KYC Scrutiny', desc: 'UAE banks conduct comprehensive AML/KYC reviews on all new corporate applicants. Source of funds, business model clarity, and shareholder transparency are all scrutinised — and any ambiguity triggers delays or rejection.' },
        { icon: 'person_search', title: 'Relationship Dependency', desc: 'Without an established relationship manager contact, applications enter a generic intake queue with low prioritisation and limited visibility of decision-making progress.' },
        { icon: 'description', title: 'Documentation Completeness', desc: 'Each bank maintains a distinct document checklist. Missing, outdated, or inconsistently formatted documents are the primary cause of application delays and re-submissions.' },
        { icon: 'quiz', title: 'Interview Preparation', desc: 'Banks conduct structured interviews with UBOs and authorised signatories. Unprepared applicants make poor impressions on compliance teams — directly affecting approval outcomes.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Bank Selection & Profile Alignment', desc: 'We assess your entity profile — jurisdiction, activity, shareholder structure, expected transaction volumes, and banking requirements — and identify the two or three UAE banks with the highest alignment and approval probability for your specific profile.' },
        { num: '02', title: 'KYC Dossier Preparation & Submission', desc: 'FOJ prepares a compliance-grade KYC package tailored to the selected bank\'s exact requirements. We review source-of-funds narrative, prepare business activity descriptions, and ensure all documents are correctly formatted, certified, and current.' },
        { num: '03', title: 'Interview Management & Post-Submission Advocacy', desc: 'We brief clients on interview expectations, accompany them to bank meetings, and manage all post-submission queries from the bank\'s compliance team. We maintain direct contact with relationship managers to track application status and escalate where warranted.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Business profile assessment and bank selection advisory',
        'KYC document checklist preparation and review',
        'Source of funds narrative drafting',
        'Business plan and activity description preparation',
        'Document certification and formatting verification',
        'Bank introduction and relationship manager briefing',
        'Application submission and tracking',
        'Interview preparation and accompaniment',
        'Post-submission query management',
        'Account activation confirmation',
        'Online banking onboarding support',
        'Private bank referral (for qualifying wealth management clients)',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Bank Selection & KYC Prep', duration: '3–5 days', desc: 'Profile assessment, bank selection, and KYC dossier preparation.' },
        { phase: 'Submission & Initial Review', duration: '1–2 weeks', desc: 'Document submission to bank compliance team and initial KYC review.' },
        { phase: 'Bank Interview', duration: 'Week 2–3', desc: 'Structured interview with UBO / authorised signatory.' },
        { phase: 'Approval & Activation', duration: '1–4 weeks', desc: 'Compliance approval, account number issuance, and online banking activation. Total range: 3–8 weeks depending on bank and entity complexity.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Corporate Bank Account Opening',
      reasons: [
        { icon: 'handshake', title: 'Direct Bank Relationships', desc: 'Active relationships with relationship managers at ENBD, FAB, Mashreq, ADCB, and private banking divisions accelerate queue prioritisation and provide direct escalation paths.' },
        { icon: 'verified_user', title: 'Compliance-Grade Documentation', desc: 'Our KYC packages are prepared to the standard expected by UAE bank compliance teams — reducing re-submission cycles and accelerating approval timelines.' },
        { icon: 'shield', title: 'Post-Approval Banking Advisory', desc: 'We advise on account structuring, signatory mandates, and online banking configuration to ensure your banking setup supports operational requirements from activation.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. 個人銀行口座開設
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'personal-bank-account',
    title: '個人銀行口座開設',
    titleEn: 'Personal Bank Account Opening',
    subtitle: 'Establishing your personal financial infrastructure in the UAE',
    heroImage: IMG.bonsai,
    stat: { number: '1–3', label: 'Weeks to Activation' },
    overview: {
      heading: 'Personal Banking as the Cornerstone of UAE Residency',
      paragraphs: [
        'A UAE personal bank account is essential infrastructure for any resident — enabling salary receipt, property rental payments, investment access, and utility management. For new residents and incoming investors, the choice of bank, account tier, and product structure determines not only convenience, but also access to wealth management services and international transfer capabilities.',
        'FOJ provides personal banking advisory and facilitation across the full spectrum: from standard retail current accounts for newly arrived employees, to premium wealth management and private banking introductions for HNWIs relocating or diversifying their financial centre. We identify the right banking relationship for your profile and manage the onboarding process from end to end.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in Personal Bank Account Opening',
      items: [
        { icon: 'home_work', title: 'Residency and Salary Requirements', desc: 'Most UAE retail banks require proof of UAE residency and a minimum salary transfer. New residents or self-employed individuals often fall outside standard eligibility criteria, requiring specialised account types or alternative institutions.' },
        { icon: 'attach_money', title: 'Minimum Balance Thresholds', desc: 'Premium account tiers with waived fees typically require AED 3,000–100,000 minimum monthly balances. Selecting the right tier from the outset prevents ongoing fee exposure.' },
        { icon: 'public', title: 'Non-Resident Account Options', desc: 'Non-resident banking — for investors maintaining UAE structures without residency — is available but limited. Understanding which institutions offer viable non-resident products is non-trivial.' },
        { icon: 'diversity_3', title: 'Private Banking Eligibility', desc: 'For HNWIs, accessing private banking services requires navigating minimum AUM thresholds, relationship introductions, and compliance onboarding that differs significantly from retail banking.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Banking Profile Assessment', desc: 'We assess your residency status, income structure, expected transaction profile, and wealth management requirements. We then recommend the optimal account tier and institution — retail, priority, private, or Islamic banking — aligned with your near-term needs and long-term financial planning goals.' },
        { num: '02', title: 'Application Preparation & Submission', desc: 'FOJ prepares the complete document package — residency visa, Emirates ID, salary certificate or source of funds letter, and supporting KYC materials — tailored to the specific requirements of the chosen institution. We submit on your behalf and manage the bank\'s onboarding queries.' },
        { num: '03', title: 'Account Activation & Advisory', desc: 'We confirm account activation, assist with online banking registration, and advise on account structuring — joint accounts, signatories, and linked investment accounts — to ensure your personal banking setup serves your full financial life in the UAE.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Personal banking profile assessment',
        'Bank and account tier recommendation',
        'Document preparation (residency, income, KYC)',
        'Application submission and liaison',
        'Non-resident account facilitation (where applicable)',
        'Islamic banking option evaluation',
        'Priority / private banking introduction for qualifying profiles',
        'Online banking registration support',
        'Debit and credit card application guidance',
        'Salary transfer and direct debit configuration advisory',
        'Ongoing banking relationship management advisory',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Profile Assessment & Bank Selection', duration: '1 day', desc: 'Needs analysis and institution / product recommendation.' },
        { phase: 'Document Preparation', duration: '1–2 days', desc: 'KYC package assembly and verification.' },
        { phase: 'Application & KYC Review', duration: '3–7 days', desc: 'Bank submission, compliance review, and approval.' },
        { phase: 'Account Activation', duration: '1–3 days', desc: 'Account number issuance and online banking access.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Personal Bank Account Opening',
      reasons: [
        { icon: 'account_balance', title: 'Full Spectrum Coverage', desc: 'From retail current accounts for new joiners to AED 5M+ private banking mandates for relocating HNWIs — we advise across the entire personal banking spectrum with equal depth.' },
        { icon: 'person_pin', title: 'Profile-Matched Introductions', desc: 'We do not refer all clients to the same bank. Each introduction is matched to the client\'s specific profile, ensuring product fit, approval probability, and relationship quality.' },
        { icon: 'savings', title: 'Wealth Management Connectivity', desc: 'For clients seeking UAE-based investment management, we facilitate introductions to private banking and wealth management teams alongside standard account onboarding.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. 税務署登録
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'tax-registration',
    title: '税務署登録',
    titleEn: 'Tax Office Registration',
    subtitle: 'Establishing compliant tax registrations with the UAE Federal Tax Authority',
    heroImage: IMG.stoneGarden,
    stat: { number: '375,000+', label: 'VAT-Registered Businesses in UAE' },
    overview: {
      heading: 'Tax Compliance as a Competitive Requirement',
      paragraphs: [
        'The UAE\'s introduction of Value Added Tax (2018) and Corporate Tax (2023) has transformed the compliance landscape for UAE-based businesses. What was once among the world\'s simplest tax environments now requires active engagement with the Federal Tax Authority (FTA): accurate registration, timely return filing, and ongoing record-keeping to sustain compliance and avoid penalties.',
        'FOJ provides end-to-end UAE tax registration and compliance management — VAT registration and periodic filing, Corporate Tax registration and initial return management, and ongoing advisory on Free Zone Qualifying Income treatment, transfer pricing obligations, and Pillar Two implications for multinationals. We act as your interface with the FTA, ensuring your registration is correctly structured from the outset.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in UAE Tax Registration',
      items: [
        { icon: 'calculate', title: 'VAT Threshold Determination', desc: 'VAT registration is mandatory when taxable supplies exceed AED 375,000 annually, and voluntary from AED 187,500. Correctly determining your threshold — particularly for Free Zone entities, holding companies, and group structures — requires careful analysis.' },
        { icon: 'business_center', title: 'Corporate Tax Structuring', desc: 'The 9% Corporate Tax rate applies broadly, but Qualifying Free Zone Persons benefit from a 0% rate on Qualifying Income. Structuring your entity and activity to access this benefit — and documenting it correctly — demands proactive tax planning.' },
        { icon: 'receipt_long', title: 'FTA Portal Compliance', desc: 'FTA\'s EmaraTax portal requires accurate entity data, supporting documentation, and timely return filing. Errors in registration or late filing attract penalties of up to AED 10,000 for first-time offences.' },
        { icon: 'account_tree', title: 'Group and Intercompany Complexity', desc: 'Businesses with multiple UAE entities, offshore holding structures, or intercompany transactions must navigate Tax Group registration, transfer pricing documentation, and related-party disclosure requirements.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Registration Obligation Assessment', desc: 'We analyse your entity structure, activity, revenue profile, and transaction flows to determine your precise VAT and Corporate Tax registration obligations — including Free Zone Qualifying Income eligibility, group registration options, and voluntary registration benefits.' },
        { num: '02', title: 'FTA Registration & Portal Setup', desc: 'FOJ manages the complete EmaraTax registration process: entity profile setup, supporting documentation submission, TRN (Tax Registration Number) procurement, and portal access configuration for authorised users. We resolve authority queries and track approval status in real time.' },
        { num: '03', title: 'Ongoing Compliance Management', desc: 'Registration is the starting point. We manage quarterly VAT return preparation and filing, annual Corporate Tax return management, and proactive advisory on regulatory changes — ensuring your tax position remains accurate and your FTA standing remains clean.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'VAT registration obligation assessment and threshold analysis',
        'Mandatory and voluntary VAT registration',
        'Corporate Tax registration (EmaraTax)',
        'Free Zone Qualifying Income eligibility review',
        'Tax Group registration advisory and implementation',
        'TRN (Tax Registration Number) procurement',
        'Quarterly VAT return preparation and filing',
        'Annual Corporate Tax return management',
        'FTA correspondence and audit support',
        'Transfer pricing documentation advisory',
        'Penalty waiver applications (where applicable)',
        'Ongoing regulatory change advisory',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Obligation Assessment', duration: '1–2 days', desc: 'Revenue analysis, entity review, and registration type determination.' },
        { phase: 'Portal Setup & Application', duration: '2–3 days', desc: 'EmaraTax profile creation, document upload, and submission.' },
        { phase: 'FTA Review & TRN Issuance', duration: '5–10 days', desc: 'FTA processing and Tax Registration Number issuance.' },
        { phase: 'Compliance Cycle Initiation', duration: 'Ongoing', desc: 'First VAT return filing cycle and Corporate Tax registration activation.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Tax Registration',
      reasons: [
        { icon: 'gavel', title: 'FTA-Experienced Advisory', desc: 'Our tax team has managed FTA registrations, audits, and penalty disputes across Free Zone, Mainland, and holding company structures since UAE VAT inception in 2018.' },
        { icon: 'hub', title: 'Cross-Service Integration', desc: 'Tax registration is structurally dependent on entity formation and licensing decisions. FOJ\'s integrated workflow ensures registration is structured correctly from the outset, preventing retrospective corrections.' },
        { icon: 'trending_up', title: 'Proactive Compliance Monitoring', desc: 'UAE tax regulations continue to evolve. Our ongoing advisory service monitors FTA guidance updates and advises clients proactively — not reactively.' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. 会計監査
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'auditing',
    title: '会計監査',
    titleEn: 'Auditing',
    subtitle: 'Delivering statutory audit and financial reporting to UAE and international standards',
    heroImage: IMG.news2,
    stat: { number: 'IFRS', label: 'Compliant Reporting Standard' },
    overview: {
      heading: 'Statutory Audit as a Governance and Credibility Instrument',
      paragraphs: [
        'Statutory audit is a legal requirement for most UAE Free Zone entities and mainland companies with significant revenue. Beyond regulatory compliance, an independent, high-quality audit report is a credibility instrument: it supports banking relationships, investor confidence, shareholder accountability, and the integrity of financial information used in strategic decision-making.',
        'FOJ delivers statutory audit services through its network of UAE-registered, PCAOB and ICAEW-affiliated audit partners — providing IFRS-compliant financial statement preparation, independent audit execution, and authority-compliant audit report submission. We manage the full audit cycle as a seamless component of your annual compliance programme.',
      ],
    },
    challenges: {
      heading: 'Key Challenges in UAE Auditing',
      items: [
        { icon: 'library_books', title: 'IFRS Compliance Complexity', desc: 'UAE financial statements must comply with International Financial Reporting Standards (IFRS). For businesses transitioning from Japanese GAAP or US GAAP, the conversion and ongoing compliance require specialised expertise.' },
        { icon: 'domain_verification', title: 'Free Zone Authority Requirements', desc: 'Each Free Zone specifies approved auditors, submission deadlines, and report formats. Non-compliance with authority-specific requirements triggers licence renewal delays and penalties.' },
        { icon: 'receipt', title: 'Record-Keeping Quality', desc: 'Audit fieldwork depends on the quality of underlying accounting records. Businesses without structured bookkeeping face extended audit timelines and qualified audit opinions — both of which are damaging.' },
        { icon: 'corporate_fare', title: 'Group Reporting Obligations', desc: 'Entities within multi-jurisdictional groups may face additional consolidation, intercompany elimination, and transfer pricing audit requirements beyond the scope of a standalone statutory audit.' },
      ],
    },
    approach: {
      heading: 'Our Three-Phase Approach',
      steps: [
        { num: '01', title: 'Audit Planning & Scoping', desc: 'We conduct a pre-audit assessment of your accounting records, identify risk areas, and agree the audit scope with your management team. We align on the applicable reporting standard (IFRS or IFRS for SMEs), reporting currency, and authority submission requirements.' },
        { num: '02', title: 'Fieldwork & Financial Statement Preparation', desc: 'Our audit partners conduct substantive testing of balance sheet positions, income statement items, and critical accounting estimates. We prepare or review financial statements to IFRS standard — including notes, disclosures, and related-party transaction schedules.' },
        { num: '03', title: 'Audit Report Issuance & Authority Submission', desc: 'We issue the independent auditor\'s report, prepare the complete audit pack for management and shareholders, and submit to the relevant Free Zone authority or regulatory body within the required deadline. We manage any authority queries arising from the submission.' },
      ],
    },
    included: {
      heading: 'What\'s Included',
      items: [
        'Pre-audit accounting records assessment',
        'IFRS financial statement preparation (or review)',
        'Statutory audit execution by UAE-registered auditors',
        'Audit of all balance sheet and P&L line items',
        'Related party transaction review and disclosure',
        'Free Zone authority submission and deadline management',
        'Management letter with internal control recommendations',
        'Shareholder audit report package',
        'Corporate Tax return support (audit-linked)',
        'Transfer pricing documentation review',
        'Group consolidation advisory (multi-entity structures)',
        'Regulatory correspondence management post-submission',
      ],
    },
    timeline: {
      heading: 'Indicative Timeline',
      steps: [
        { phase: 'Planning & Record Review', duration: '1–2 weeks', desc: 'Pre-audit assessment, scope agreement, and record quality evaluation.' },
        { phase: 'Fieldwork', duration: '2–4 weeks', desc: 'Substantive audit testing and financial statement preparation.' },
        { phase: 'Review & Clearance', duration: '1–2 weeks', desc: 'Management review, adjustments, and final clearance.' },
        { phase: 'Issuance & Submission', duration: '3–5 days', desc: 'Audit report issuance and Free Zone authority submission.' },
      ],
    },
    whyFOJ: {
      heading: 'Why FOJ for Auditing',
      reasons: [
        { icon: 'workspace_premium', title: 'Accredited Audit Partners', desc: 'We work exclusively with UAE-registered, internationally affiliated audit firms — ensuring your audit opinion carries the credibility required by banks, investors, and Free Zone authorities.' },
        { icon: 'integration_instructions', title: 'Integrated with Tax & Compliance', desc: 'Audit findings directly inform Corporate Tax returns, VAT reconciliations, and transfer pricing documentation. Our integrated model eliminates the costly disconnect between audit and tax workstreams.' },
        { icon: 'translate', title: 'Japanese-Language Financial Reporting', desc: 'Audit findings, management letters, and financial statements summarised in Japanese for shareholder and parent-company reporting — bridging the gap between UAE IFRS and Japanese corporate governance requirements.' },
      ],
    },
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
