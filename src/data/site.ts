/* FETS — site content. No pricing, no booking — by design. */

export const CHECKPOINTS = [
  { id: 'airlock', cp: '00', label: 'AIRLOCK', title: 'Entry' },
  { id: 'protocol', cp: '01', label: 'PROTOCOL', title: 'The Exam-Day Journey' },
  { id: 'floor', cp: '02', label: 'THE FLOOR', title: 'Inside the Facility' },
  { id: 'registry', cp: '03', label: 'REGISTRY', title: 'Exam Catalogue' },
  { id: 'simulation', cp: '04', label: 'SIMULATION', title: 'Exam Test Drive' },
  { id: 'clearance', cp: '05', label: 'CLEARANCE', title: 'Authorizations' },
  { id: 'sites', cp: '06', label: 'SITES', title: 'Two Centres' },
  { id: 'briefing', cp: '07', label: 'BRIEFING', title: 'Candidate FAQ' },
  { id: 'contact', cp: '08', label: 'REPORT', title: 'Contact' },
] as const;

export interface ExamRow {
  exam: string;
  body: string;
  format: string;
  sites: string;
}

export const EXAM_GROUPS: { partner: string; role: string; rows: ExamRow[] }[] = [
  {
    partner: 'Prometric',
    role: 'Authorized Test Centre',
    rows: [
      { exam: 'CMA US — Part 1 & 2', body: 'IMA', format: 'CBT · 4h', sites: 'CLT + KCH' },
      { exam: 'USMLE Step 1 / 2 CK', body: 'ECFMG', format: 'CBT · 8h', sites: 'CLT + KCH' },
      { exam: 'MRCS Part A', body: 'Royal Colleges', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'PLAB 1', body: 'GMC UK', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'HAAD · DHA · MOH · OMSB', body: 'Gulf Health Authorities', format: 'CBT', sites: 'CLT + KCH' },
    ],
  },
  {
    partner: 'Pearson VUE',
    role: 'Authorized Test Centre',
    rows: [
      { exam: 'Microsoft Certifications', body: 'Microsoft', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'AWS Certification', body: 'Amazon Web Services', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'Cisco CCNA / CCNP', body: 'Cisco', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'CompTIA A+ / Network+ / Security+', body: 'CompTIA', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'Oracle Certification', body: 'Oracle', format: 'CBT', sites: 'CLT + KCH' },
      { exam: 'GMAT · GED', body: 'GMAC · GED Testing Service', format: 'CBT', sites: 'CLT + KCH' },
    ],
  },
  {
    partner: 'PSI',
    role: 'Authorized Test Centre',
    rows: [
      { exam: 'PSI Certification Programmes', body: 'PSI Services', format: 'CBT', sites: 'CLT + KCH' },
    ],
  },
  {
    partner: 'CELPIP',
    role: 'Official Test Centre',
    rows: [
      { exam: 'CELPIP General', body: 'Paragon Testing', format: 'CBT · 3h', sites: 'CLT + KCH' },
      { exam: 'CELPIP LS', body: 'Paragon Testing', format: 'CBT · 1h10', sites: 'CLT + KCH' },
    ],
  },
  {
    partner: 'ACCA',
    role: 'CBE Centre',
    rows: [
      { exam: 'Applied Knowledge', body: 'ACCA', format: 'On-demand CBE', sites: 'CLT + KCH' },
      { exam: 'Applied Skills', body: 'ACCA', format: 'Session CBE', sites: 'CLT + KCH' },
      { exam: 'Strategic Professional', body: 'ACCA', format: 'Session CBE', sites: 'CLT + KCH' },
    ],
  },
];

export const SIMULATIONS = [
  {
    code: 'SIM-CMA',
    name: 'CMA US',
    logo: '/images/brand/cma-us.png',
    duration: '4H 00M',
    spec: '100 MCQs + 2 Essays',
    points: [
      'Full Prometric-environment replication',
      'Detailed performance analysis',
      'Expert feedback session',
      'Study plan recommendations',
    ],
  },
  {
    code: 'SIM-CELPIP',
    name: 'CELPIP',
    logo: '/images/brand/celpip.jpg',
    duration: '3H 00M',
    spec: 'Listening · Reading · Writing · Speaking',
    points: [
      'Full test simulation, all four components',
      'Speaking practice with feedback',
      'Writing evaluation',
      'Score estimate',
    ],
  },
  {
    code: 'SIM-ACCA',
    name: 'ACCA',
    logo: null,
    duration: '2H 00M',
    spec: 'On-demand CBE · Computer-based',
    points: [
      'Real CBE workstation conditions',
      'Section-wise performance readout',
      'Feedback sitting with our team',
      'Next-attempt study plan',
    ],
  },
];

export interface FacilityShot {
  src: string;
  cam: string;
  title: string;
  site: string;
  desc: string;
  portrait?: boolean;
}

export const FACILITY: FacilityShot[] = [
  {
    src: '/images/facility/clt-reception.jpg',
    cam: 'CAM 01',
    title: 'Reception & Check-in Desk',
    site: 'CALICUT',
    desc: 'Check-in desk and candidate seating — first point of contact on exam day.',
  },
  {
    src: '/images/facility/clt-lounge.jpg',
    cam: 'CAM 02',
    title: 'Candidate Lounge',
    site: 'CALICUT',
    desc: 'Quiet waiting lounge for early arrivals and accompaniments.',
  },
  {
    src: '/images/facility/clt-lockers.jpg',
    cam: 'CAM 03',
    title: 'Secure Locker Corridor',
    site: 'CALICUT',
    desc: 'Belongings sealed in numbered lockers before you enter the floor.',
    portrait: true,
  },
  {
    src: '/images/facility/clt-floor.jpg',
    cam: 'CAM 04',
    title: 'Testing Floor — Private Bays',
    site: 'CALICUT',
    desc: 'Individual partitioned stations, one candidate per bay.',
    portrait: true,
  },
  {
    src: '/images/facility/kch-reception.jpg',
    cam: 'CAM 05',
    title: 'Reception & Support Desk',
    site: 'KOCHI',
    desc: 'Staffed front desk with locker wall directly behind it.',
  },
  {
    src: '/images/facility/kch-hall.jpg',
    cam: 'CAM 06',
    title: 'Testing Hall — Admin Oversight',
    site: 'KOCHI',
    desc: 'Cubicle rows under continuous invigilation from the admin desk.',
  },
  {
    src: '/images/facility/kch-stations.jpg',
    cam: 'CAM 07',
    title: 'Exam Stations — Close View',
    site: 'KOCHI',
    desc: 'Current-generation machines, ergonomic seating, per-station storage.',
    portrait: true,
  },
];

export const AUTHORIZATIONS = [
  { name: 'Prometric', scope: 'Medical · IT · Professional', status: 'ACTIVE' },
  { name: 'Pearson VUE', scope: 'IT · Academic · Professional', status: 'ACTIVE' },
  { name: 'PSI', scope: 'Licensure & Certification', status: 'ACTIVE' },
  { name: 'CELPIP — Paragon', scope: 'Canadian English Proficiency', status: 'ACTIVE' },
  { name: 'ACCA', scope: 'Computer-Based Examinations', status: 'ACTIVE' },
  { name: 'CMA — IMA', scope: 'Certified Management Accountant', status: 'ACTIVE' },
];

export const SITES = [
  {
    id: 'CLT',
    city: 'CALICUT',
    name: 'Calicut Centre',
    address: '4th Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction, Calicut, Kerala 673011',
    phone: '0495 491 5936',
    hours: 'MON–SUN · 08:00–18:00',
    image: '/images/facility/clt-lounge.jpg',
    directions: [
      { mode: 'RAIL', detail: 'Calicut Railway Station — 3.0 km' },
      { mode: 'BUS', detail: 'Calicut New Bus Stand — 4.0 km' },
      { mode: 'AIR', detail: 'Calicut Intl. Airport (CCJ) — 22 km' },
    ],
    mapUrl: 'https://maps.google.com/?q=Kadooli+Tower+West+Nadakkavu+Calicut',
  },
  {
    id: 'KCH',
    city: 'KOCHI',
    name: 'Kochi Centre',
    address: '6th Floor, Manjooran Estate, Behind MRA Hotel, Bypass Junction, Edappally, Kochi, Kerala 682024',
    phone: '0484 454 1957',
    hours: 'MON–SUN · 08:00–18:00',
    image: '/images/facility/kch-reception.jpg',
    directions: [
      { mode: 'METRO', detail: 'Edappally Metro Station — 350 m' },
      { mode: 'RAIL', detail: 'Ernakulam Town (ERN) — 6.0 km' },
      { mode: 'BUS', detail: 'Vytilla Mobility Hub — 8.4 km' },
      { mode: 'AIR', detail: 'Cochin Intl. Airport (COK) — 28 km' },
    ],
    mapUrl: 'https://maps.google.com/?q=Manjooran+Estate+Edappally+Kochi',
  },
];

export const PROTOCOL_FAQ = [
  {
    q: 'What ID do I need to bring?',
    a: 'A valid government-issued photo ID — passport, driving licence, or Aadhaar card — plus your exam confirmation email. Some exam bodies impose additional requirements; check your provider\u2019s guidelines before exam day.',
  },
  {
    q: 'How early should I arrive?',
    a: 'Report at least 30 minutes before your scheduled start. That window covers check-in, biometric verification, and settling into the testing environment without rush.',
  },
  {
    q: 'What can I take into the testing room?',
    a: 'Essentially nothing personal. Phones, smartwatches, bags, study material and electronics stay outside — numbered secure lockers are provided at no step away from the floor.',
  },
  {
    q: 'Can I reschedule or cancel my exam?',
    a: 'Yes, governed by your exam provider\u2019s policy. Contact us or your provider at least 24–48 hours ahead; provider-side fees may apply depending on the programme.',
  },
  {
    q: 'When do I get my results?',
    a: 'It varies by programme. Many IT certifications issue unofficial scores immediately at the station; others — CMA, ACCA, MRCS — follow provider timelines of days to weeks.',
  },
  {
    q: 'Do you run mock exams?',
    a: 'Yes. Our Exam Test Drive programme simulates the real session for CMA US, CELPIP and ACCA — same machines, same conditions, followed by a feedback sitting with our team.',
  },
  {
    q: 'Where exactly are the centres?',
    a: 'Calicut: 4th Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction. Kochi: 6th Floor, Manjooran Estate, Edappally — 350 metres from Edappally Metro. Both run seven days a week, 08:00–18:00.',
  },
];

export const CONTACT = {
  email: 'edu@fets.in',
  calicut: '0495 491 5936',
  kochi: '0484 454 1957',
};

export const TICKER_EXAMS = [
  'CMA US', 'USMLE', 'CELPIP', 'ACCA', 'PSI', 'PEARSON VUE',
  'MRCS', 'AWS', 'MICROSOFT', 'CISCO', 'COMPTIA', 'PLAB', 'GMAT', 'ORACLE',
];
