import type { Locale } from './types';

const en = {
  meta: {
    title: 'Coride: Skip traffic. Earn perks. Co-ride with colleagues.',
    description:
      'Join verified communities going on the same routes as you. Drive together and earn perks from local partners across Riga.',
  },
  nav: {
    homeAria: 'Coride home',
    joinWaitlist: 'Join the waitlist',
    menuAria: 'Toggle menu',
  },
  hero: {
    title: 'Earn perks for the commute you already make.',
    sub:
      'Join your workplace community on Coride. Share your daily commute with colleagues, save on your journey to work and earn rewards from local partners along the way.',
    ctaPrimary: 'Get early access',
    ctaGhost: 'How it works',
    tractionBold: 'First pilots with select employers launch later this year.',
    tractionRest: 'Get early access today.',
    appPreview: 'App preview',
    appNote: '// screen design - coming',
  },
  problem: {
    title: "People have been co-riding for years. We're just making it profitable for everyone.",
    cards: [
      {
        tag: 'Time',
        title: 'Traffic eats an hour of your day.',
        desc: 'Same route. Same hour. Five different cars from your office.',
      },
      {
        tag: 'Cost',
        title: 'Driving alone costs more every month.',
        desc:
          'Fuel, parking, wear and tear, and wasted time add up. Most rides still carry one person in a car built for five.',
      },
      {
        tag: 'Coverage',
        title: "Public transport doesn't reach every workplace.",
        desc:
          'Industrial parks, airports, and logistics hubs sit on the outskirts, far from public transport routes and difficult to reach without a car.',
      },
      {
        tag: 'Land',
        title: 'Every parking space costs more than most employers realize.',
        desc:
          'Land, construction, maintenance, and snow clearing all add up to thousands per space each year, often for a single commuter.',
      },
    ],
  },
  how: {
    title: 'How Coride works.',
    subhead: 'Simple to start, easy to use.',
    stationPrefix: 'Station',
    stations: [
      {
        label: 'Workplace',
        title: 'Your workplace joins Coride.',
        descBeforeLink:
          'We partner with your employer to verify commuters and open Coride to your team. Not live at your workplace yet?',
        link: 'Tell us',
        descAfterLink: " where you work, and we'll reach out.",
      },
      {
        label: 'Match',
        title: 'Match with colleagues going your way.',
        desc:
          'Add your home, shift, and route. Coride connects you with verified colleagues travelling on similar routes.',
      },
      {
        label: 'Ride',
        title: 'Ride together.',
        desc:
          'One car instead of five. Choose to drive or ride as a passenger, with commute costs fairly split through the app.',
      },
      {
        label: 'Earn',
        title: 'Earn perks with every ride.',
        desc:
          'Each commute with Coride adds perks to your account, funded by local partners across your country.',
      },
      {
        label: 'Spend',
        title: 'Spend your rewards where you already go.',
        desc:
          'Cafés, gyms, shops, services in your area, get discounts on things you would be buying anyway.',
      },
    ],
  },
  signup: {
    title: 'Start before the first ride.',
    subhead:
      "Coride pilots launch later this year. Tell us where you work, and we'll let you know when your company can join.",
    signingUpAs: "I'm signing up as…",
    branches: {
      individual: { title: 'An individual', desc: "I'd like to use Coride at my workplace." },
      employer: { title: 'An employer', desc: 'I want to bring Coride to my team.' },
      partner: { title: 'A partner', desc: 'My business wants to offer perks to Coride riders.' },
    },
    fields: {
      name: 'Your name',
      email: 'Email',
      company: 'Where do you work?',
      companyPlaceholder: 'Company name or "Prefer not to say"',
    },
    consentBefore: 'I agree to be contacted about Coride and have read the',
    consentLink: 'Privacy Policy',
    consentAfter: '.',
    submit: 'Add my workplace to the list',
    submitting: 'Submitting…',
    employerMsg:
      "We'd rather talk than have you fill a form. Pick a 20-minute slot and we'll walk you through what a Coride pilot looks like for your team.",
    partnerMsg:
      "Want to offer perks to Coride riders? Let's talk. Pick a 20-minute slot and we'll figure out a partnership that works for your business.",
    bookCall: 'Book a call with Coride',
    emailNote: 'Or email us:',
    success: "We got it. We'll be in touch when Coride goes live for you.",
    backToTop: 'Back to top',
    errors: {
      consent: 'You must agree to be contacted to submit this form.',
      required: 'Please fill in all required fields.',
      generic: 'Something went wrong. Please try again.',
    },
  },
  route: {
    problem: '02 · The problem',
    how: '03 · How it works',
    signup: '04 · Get on board',
  },
  footer: {
    homeAria: 'Coride home',
    legal: 'Legal',
    privacy: 'Privacy policy',
    supportedBy: 'Supported by',
  },
  privacy: {
    documentTitle: 'Privacy Policy - Coride',
    title: 'Privacy Policy',
    updated: 'Last updated: June 5, 2026',
    lead:
      'This Privacy Policy explains how Milup SIA ("we", "us", "Coride") collects, uses, and protects personal data when you use the Coride website.',
    s1Title: '1. Who we are',
    s1Body:
      'Coride is a brand of SIA "Milup", registered in Latvia. Registration number: 40203734972. Registered address: Raunas iela 45 k-1 - 20, Rīga, LV-1084. Contact:',
    s2Title: '2. What data we collect',
    s2Intro: 'When you submit the signup form, we collect:',
    s2Items: [
      'Your name',
      'Your email address',
      'For individuals: your employer name (or "Don\'t want to say")',
      'For partners: business name, role, perk offer (optional)',
      'Technical: IP address (used only for rate limiting, not stored long-term)',
    ],
    s2Outro:
      'We do not use cookies or analytics that track you. The site uses Plausible Analytics, which is cookieless and does not collect personal data.',
    s3Title: '3. Why we collect it',
    s3Items: [
      'To respond to your inquiry about Coride',
      'To notify you when Coride launches at your workplace',
      'To improve our understanding of Coride\'s potential user base (in aggregated form)',
    ],
    s3Outro: 'We do not sell, rent, or share your personal data with third parties for marketing.',
    s4Title: '4. How we store it',
    s4Intro: 'Form submissions are processed by:',
    s4Items: [
      'Linear (linear.app): used as our lead-tracking system. Data controller: us. Data processor: Linear.',
      'Resend (resend.com): sends our confirmation emails. Data controller: us. Data processor: Resend.',
    ],
    s4Outro:
      'We retain submitted contact information for up to 12 months from submission, after which it is anonymized or deleted.',
    s5Title: '5. Your rights',
    s5Body:
      'Under GDPR, you have the right to access, correct, or request deletion of your data, and to lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija). To exercise any of these rights, email',
    s6Title: '6. Changes to this policy',
    s6Body:
      'We will update this policy as our services evolve. The "last updated" date at the top reflects the most recent revision.',
    s7Title: '7. Contact',
    s7Body: 'For privacy-related questions:',
  },
};

const lv = {
  meta: {
    title: 'Coride: Ietaupi laiku. Nopelni bonusus. Brauc kopā ar kolēģiem.',
    description:
      'Pievienojies kolēģiem, kas brauc pa tiem pašiem maršrutiem. Brauc kopā un saņem bonusus no vietējiem partneriem.',
  },
  nav: {
    homeAria: 'Coride sākums',
    joinWaitlist: 'Piesakies agrīnai piekļuvei',
    menuAria: 'Atvērt izvēlni',
  },
  hero: {
    title: 'Ar Coride tavs ceļš uz darbu pelna bonusus.',
    sub:
      'Pievienojies savas darba vietas kopienai Coride platformā. Brauc uz darbu kopā ar kolēģiem, samazini ceļa izmaksas un saņem bonusus no mūsu partneriem.',
    ctaPrimary: 'Piesakies agrīnai piekļuvei',
    ctaGhost: 'Kā tas darbojas',
    tractionBold: 'Pirmie pilotprojekti ar organizācijām sāksies šī gada rudenī.',
    tractionRest: 'Piesaki arī savu darbavietu gaidīšanas sarakstā',
    appPreview: 'Lietotnes priekšskatījums',
    appNote: '// ekrāna dizains — drīzumā',
  },
  problem: {
    title: 'Cilvēki jau gadiem brauc kopā. Coride padara to izdevīgu visiem.',
    cards: [
      {
        tag: 'Laiks',
        title: 'Satiksme katru dienu paņem stundu no tava laika.',
        desc: 'Tas pats ceļš. Tas pats laiks. Piecas dažādas automašīnas no tavas darbavietas.',
      },
      {
        tag: 'Izmaksas',
        title: 'Braukt vienam kļūst dārgāk katru mēnesi.',
        desc:
          'Degviela, stāvvieta, auto nolietojums, uzturēšana un laiks ceļā summējas reālās izmaksās, lai gan vairums braucienu joprojām notiek vienatnē, ar piecām brīvām vietām.',
      },
      {
        tag: 'Pārklājums',
        title: 'Sabiedriskais transports neaizved līdz katrai darbavietai.',
        desc:
          'Industriālie parki, lidostas un loģistikas centri bieži atrodas pilsētas nomalēs, tālu no sabiedriskā transporta maršrutiem. Bez auto tur nokļūt ir sarežģīti.',
      },
      {
        tag: 'Zeme',
        title: 'Katra stāvvieta darba devējam rada izmaksas.',
        desc:
          'Zeme, izbūve, uzturēšana un sniega tīrīšana kopā veido tūkstošiem eiro gadā par katru stāvvietu, kuru parasti izmanto tikai viens darbinieks.',
      },
    ],
  },
  how: {
    title: 'Kā darbojas Coride.',
    subhead: 'Viegli sākt, vienkārši lietot.',
    stationPrefix: 'Pietura',
    stations: [
      {
        label: 'DARBAVIETA',
        title: 'Tava darbavieta pievienojas Coride.',
        descBeforeLink:
          'Mēs sadarbojamies ar tavu darba devēju, lai Coride būtu pieejams tev un taviem kolēģiem. Coride vēl nav pieejams tavā darbavietā?',
        link: 'Pastāsti mums',
        descAfterLink: ', kur strādā, un mēs uzrunāsim tavu uzņēmumu.',
      },
      {
        label: 'MARŠRUTS',
        title: 'Atrodi kolēģus, kas dodas vienā virzienā ar tevi.',
        desc:
          'Norādi savu dzīvesvietu, darba laika maiņu un maršrutu, kurā brauksi. Coride savienos tevi ar kolēģiem, kuru ceļš uz darbu pārklājas ar tavējo.',
      },
      {
        label: 'BRAUCIENS',
        title: 'Brauciet kopā.',
        desc:
          'Viens auto piecu vietā. Izvēlies būt pie stūres vai braukt kā pasažieris, un Coride godīgi sadalīs visas ceļa izmaksas. Par slēptajām pozīcijām gala rēķinā vari nesatraukties, mums tādu nav.',
      },
      {
        label: 'NOPELNI',
        title: 'Saņem bonusus par katru braucienu.',
        desc:
          'Ar katru Coride braucienu tavā kontā krājas bonusi, ko nodrošina mūsu partneri.',
      },
      {
        label: 'IZMANTO',
        title: 'Izmanto uzkrātos bonusus vietās, kuras ikdienā jau apmeklē.',
        desc:
          'Coride uzkrātos bonusa punktus iztērē kafejnīcās, degvielas uzpildē, sporta zālēs, veikalos vai maksājot par citiem pakalpojumiem. Braucot ar Coride saņemsi atlaides saviem ikdienas pirkumiem, kurus tu visdrīzāk veic jebkurā gadījumā.',
      },
    ],
  },
  signup: {
    title: 'Piesakies lietotnes testam savā darba vietā.',
    subhead:
      'Pirmie pilotprojecti ar organizācijām sāksies šī gada rudenī. Pastāsti mums, kur strādā, un mēs ziņosim, kad Coride būs pieejams arī tavā uzņēmumā.',
    signingUpAs: 'Es pierakstos kā…',
    branches: {
      individual: { title: 'Privātpersona', desc: 'Vēlos izmantot Coride savā darbavietā.' },
      employer: { title: 'Darba devējs', desc: 'Vēlos ieviest Coride savā komandā.' },
      partner: { title: 'Partneris', desc: 'Mans uzņēmums vēlas piedāvāt bonusus Coride braucējiem.' },
    },
    fields: {
      name: 'Tavs vārds',
      email: 'E-pasts',
      company: 'Kur tu strādā?',
      companyPlaceholder: 'Uzņēmuma nosaukums vai "Nevēlos norādīt"',
    },
    consentBefore: 'Piekrītu, ka ar mani sazināsies par Coride, un esmu iepazinies/-usies ar',
    consentLink: 'Privātuma politiku',
    consentAfter: '.',
    submit: 'Pievienot manu darbavietu sarakstam',
    submitting: 'Nosūta…',
    employerMsg:
      'Mēs labprātāk runājam, nekā liekam aizpildīt formu. Izvēlies 20 minūšu sarunu, un mēs pastāstīsim, kā Coride izmēģinājums izskatās tavai komandai.',
    partnerMsg:
      'Vēlies piedāvāt bonusus Coride braucējiem? Parunāsim. Izvēlies 20 minūšu sarunu, un kopā atradīsim sadarbības modeli tavam uzņēmumam.',
    bookCall: 'Pieteikt zvanu ar Coride',
    emailNote: 'Vai rakstiet mums:',
    success: 'Saņemts. Sazināsimies, kad Coride būs pieejams arī tev.',
    backToTop: 'Atpakaļ uz augšu',
    errors: {
      consent: 'Lai iesniegtu formu, jāpiekrīt saziņai ar tevi.',
      required: 'Lūdzu, aizpildi visus obligātos laukus.',
      generic: 'Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.',
    },
  },
  route: {
    problem: '02 · Problēma',
    how: '03 · Kā darbojas Coride',
    signup: '04 · Piesakies',
  },
  footer: {
    homeAria: 'Coride sākums',
    legal: 'Juridiskā informācija',
    privacy: 'Privātuma politika',
    supportedBy: 'Atbalsta',
  },
  privacy: {
    documentTitle: 'Privātuma politika - Coride',
    title: 'Privātuma politika',
    updated: 'Pēdējoreiz atjaunināta: 2026. gada 5. jūnijā',
    lead:
      'Šī Privātuma politika izskaidro, kā SIA "Milup" ("mēs", "mūsu", "Coride") vāc, izmanto un aizsargā personas datus, kad izmantojat Coride tīmekļa vietni.',
    s1Title: '1. Kas mēs esam',
    s1Body:
      'Coride ir SIA "Milup" zīmols, reģistrēts Latvijā. Reģistrācijas numurs: 40203734972. Juridiskā adrese: Raunas iela 45 k-1 - 20, Rīga, LV-1084. Kontakti:',
    s2Title: '2. Kādus datus mēs vācam',
    s2Intro: 'Kad iesniedzat pieteikuma veidlapu, mēs vācam:',
    s2Items: [
      'Jūsu vārdu',
      'Jūsu e-pasta adresi',
      'Privātpersonām: darba devēja nosaukumu (vai "Nevēlos norādīt")',
      'Partneriem: uzņēmuma nosaukumu, kontaktpersonu, bonusu piedāvājumu (pēc izvēles)',
      'Tehniskos datus: IP adresi (izmantota tikai pieprasījumu ierobežošanai, netiek glabāta ilgtermiņā)',
    ],
    s2Outro:
      'Mēs neizmantojam sīkdatnes vai analītiku, kas jūs izseko. Vietne izmanto Plausible Analytics, kas darbojas bez sīkdatnēm un nevāc personas datus.',
    s3Title: '3. Kāpēc mēs tos vācam',
    s3Items: [
      'Lai atbildētu uz jūsu pieprasījumu par Coride',
      'Lai informētu jūs, kad Coride tiks palaists jūsu darbavietā',
      'Lai uzlabotu izpratni par Coride potenciālo lietotāju bāzi (apkopotā formā)',
    ],
    s3Outro:
      'Mēs nepārdodam, neizīrējam un nedalāmies ar jūsu personas datiem ar trešajām pusēm mārketinga nolūkos.',
    s4Title: '4. Kā mēs tos glabājam',
    s4Intro: 'Veidlapu iesniegumus apstrādā:',
    s4Items: [
      'Linear (linear.app): mūsu potenciālo klientu uzskaites sistēma. Datu pārzinis: mēs. Datu apstrādātājs: Linear.',
      'Resend (resend.com): apstiprinājuma e-pastu sūtīšana. Datu pārzinis: mēs. Datu apstrādātājs: Resend.',
    ],
    s4Outro:
      'Mēs glabājam iesniegtos kontaktus līdz 12 mēnešiem no iesniegšanas brīža, pēc tam tos anonimizējam vai dzēšam.',
    s5Title: '5. Jūsu tiesības',
    s5Body:
      'Saskaņā ar VDAR jums ir tiesības piekļūt saviem datiem, tos labot vai pieprasīt dzēšanu, kā arī iesniegt sūdzību Datu valsts inspekcijā. Lai izmantotu šīs tiesības, rakstiet uz',
    s6Title: '6. Izmaiņas šajā politikā',
    s6Body:
      'Mēs atjaunināsim šo politiku, attīstoties mūsu pakalpojumiem. Datums "pēdējoreiz atjaunināta" augšā norāda uz jaunāko versiju.',
    s7Title: '7. Kontakti',
    s7Body: 'Jautājumi par privātumu:',
  },
};

export type Messages = typeof en;

export const messages: Record<Locale, Messages> = { en, lv };
