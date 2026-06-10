import type { Locale } from './types';

const en = {
  meta: {
    title: 'Coride: Skip traffic. Earn perks. Co-ride with colleagues.',
    description:
      'Join verified communities going on the same routes as you. Drive together and earn perks from local partners across Riga.',
  },
  nav: {
    homeAria: 'Coride home',
    home: 'Home',
    joinWaitlist: 'Join the waitlist',
    forEmployers: 'For employers',
    forPartners: 'For partners',
    bookCall: 'Book a call',
    becomePartner: 'Become a partner',
    menuAria: 'Toggle menu',
  },
  employers: {
    meta: {
      title: 'Coride: For employers',
      description:
        'Help your team get to work without building another parking lot. Coride connects employees into verified, shared commutes.',
    },
    hero: {
      title: 'Help your team get to work, without building another parking lot.',
      sub:
        'Coride connects your employees into verified, shared commutes. Fewer cars in the lot, lower parking costs, a real sustainability impact, and an easier journey for everyone on your team.',
      ctaPrimary: 'Book a call',
      ctaGhost: 'How it works',
      baBefore: 'Before',
      baAfter: 'After',
      baCap: 'Fewer cars means space you can use, expand, rent out, or simply stop paying for.',
      baAria: 'Before and after: a packed parking lot becomes a mostly freed, repurposable lot',
    },
    cost: {
      title: 'The hidden cost of how your team commutes.',
      lead: 'Most workplaces pay for solo commuting without ever seeing the bill.',
      cards: [
        {
          line: 'line-magenta',
          title: 'Parking is more expensive than it looks',
          desc:
            'Land, construction, maintenance, snow clearing. Every space costs thousands per year, and most carry one person.',
        },
        {
          line: 'line-blue',
          title: 'Hard-to-reach locations cost you talent',
          desc:
            'Industrial parks, the airport, logistics hubs. When getting to work is difficult, hiring and keeping people gets harder.',
        },
        {
          line: 'line-green',
          title: 'Solo commuting works against your climate goals',
          desc:
            'One person per car is the least efficient way for a team to travel. It shows up in your footprint and your reporting.',
        },
        {
          line: 'line-orange',
          title: "The commute is a daily friction you can't easily fix",
          desc: 'Your people lose time and money getting to work. Now you can help them save real money over a year.',
        },
      ],
    },
    value: {
      title: 'What Coride brings.',
      lead: "Coride turns your team's daily commute into something that works for everyone.",
      cards: [
        {
          line: 'line-blue',
          title: 'Fewer cars, less parking pressure',
          desc:
            'When colleagues share rides, you need fewer spaces. Free up land, cut parking costs, and ease the daily crunch.',
        },
        {
          line: 'line-orange',
          title: "A workplace that's easier to reach",
          desc:
            'Make your location more accessible without waiting for new bus routes. Easier commutes help you hire and keep people.',
        },
        {
          line: 'line-green',
          title: 'Measurable sustainability impact',
          desc:
            'Fewer cars on the road is a clear, reportable contribution to your climate and ESG commitments.',
        },
        {
          line: 'line-magenta',
          title: 'A real perk, with no work for you',
          desc:
            'Your employees earn rewards from local partners every time they co-ride. You offer a genuine benefit without running anything yourself.',
        },
        {
          line: 'line-lime',
          span2: true,
          title: 'Verified and workplace-only',
          desc: 'Only your people, verified through your workplace. Colleagues ride with colleagues, not strangers.',
        },
      ],
    },
    how: {
      title: 'How Coride works for employers.',
      lead: 'Four steps, from joining to seeing the impact.',
      steps: [
        {
          line: 'line-blue',
          step: '01',
          title: 'Your workplace joins Coride',
          desc: 'We set up Coride for your team and verify your commuters.',
        },
        {
          line: 'line-orange',
          step: '02',
          title: 'Your employees match',
          desc: 'They find colleagues on the same routes and shifts.',
        },
        {
          line: 'line-green',
          step: '03',
          title: 'They co-ride',
          desc: 'One car instead of several. Costs are shared through the app.',
        },
        {
          line: 'line-magenta',
          step: '04',
          title: 'You see the impact',
          desc: 'Fewer cars, freed-up parking, and a measurable sustainability result.',
        },
      ],
    },
    pilot: {
      title: "We're launching our first pilots later this year.",
      body:
        "We're working with a small number of employers to bring Coride to their teams first. If your workplace struggles with parking, access, or commuting, we'd like to talk.",
      carAria: 'Move the car along the route',
    },
    closing: {
      title: 'Want to bring Coride to your workplace?',
      body:
        "Let's have a short conversation about whether Coride fits your team. No commitment, just a chance to explore it.",
      cta: 'Book a call',
      emailNote: 'Or email us:',
    },
  },
  partners: {
    meta: {
      title: 'Coride: For partners',
      description:
        'Reach loyal local customers on their way to work. Coride riders earn rewards from nearby businesses as part of their daily commute.',
    },
    hero: {
      title: 'Reach loyal local customers on their way to work.',
      sub:
        'Coride riders earn rewards from nearby businesses as part of their daily commute. Become a partner and put your business in front of a steady stream of local customers — the people who pass you every day.',
      ctaPrimary: 'Become a partner',
      ctaGhost: 'How it works',
      map: {
        aria: 'A commute route from home to work with local businesses as stops along the way',
        home: 'Home',
        work: 'Work',
        cafe: 'Café',
        gym: 'Gym',
        shop: 'Shop',
        bakery: 'Bakery',
        cap: 'Be a stop on the daily route',
      },
    },
    why: {
      title: 'Why partner with Coride.',
      lead:
        "Coride isn't another discount platform. It's a way to reach the people who already pass your door, every working day.",
      cards: [
        {
          line: 'line-blue',
          title: 'Reach customers without a marketing budget',
          desc:
            'Coride puts your business in front of nearby commuters. No ad campaigns, no marketing spend. The platform brings the customers to you.',
        },
        {
          line: 'line-orange',
          title: 'Customers who arrive ready to spend',
          desc:
            'Coride riders come to you as part of their routine — motivated and local, not one-off discount hunters passing through.',
        },
        {
          line: 'line-green',
          title: 'Become the local choice on their commute',
          desc:
            'Be the café, the gym, the shop, the stop that commuters choose on their way to and from work. A whole network of nearby workers, choosing you.',
        },
        {
          line: 'line-magenta',
          title: 'Repeat, routine visits',
          desc:
            "Commuting is daily. These aren't one-time customers — they pass you every working day, again and again.",
        },
      ],
    },
    how: {
      title: 'How partnership works.',
      lead: "We're shaping the partner program together with our first partners.",
      steps: [
        {
          line: 'line-blue',
          step: '01',
          title: 'Riders earn rewards through Coride',
          desc: 'Every time colleagues co-ride, they earn rewards to spend with local partners.',
        },
        {
          line: 'line-orange',
          step: '02',
          title: 'You offer something that fits',
          desc:
            "Cafés, gyms, shops, services — we'll work with you to find the right fit. No rigid formula.",
        },
        {
          line: 'line-green',
          step: '03',
          title: 'Commuters discover and visit you',
          desc: 'Riders find you through the app and come to you as part of their daily route.',
        },
        {
          line: 'line-magenta',
          step: '04',
          title: 'We figure out the details together',
          desc:
            'As an early partner, you help shape how the program works — and get in before anyone else.',
        },
      ],
    },
    local: {
      title: 'Built for local businesses near where people work.',
      body:
        'Cafés, restaurants, gyms, shops, fuel stations, services — if commuters pass you on their way to and from work, Coride can bring them in.',
      tags: [
        { label: 'Cafés', color: 'line-orange' },
        { label: 'Restaurants', color: 'line-blue' },
        { label: 'Gyms', color: 'line-green' },
        { label: 'Shops', color: 'line-magenta' },
        { label: 'Fuel stations', color: 'line-brown' },
        { label: 'Services', color: 'line-lime' },
      ],
    },
    network: {
      title: "We're building our first partner network now.",
      body:
        "We're talking to local businesses who want to be part of Coride from the start. Early partners help shape the program and are the first commuters see when we launch.",
      carAria: 'Move the car along the route',
    },
    closing: {
      title: 'Interested in becoming a Coride partner?',
      body:
        "Let's talk about whether Coride fits your business. We're still shaping the program, and your input helps build it.",
      cta: 'Become a partner',
      emailNote: 'Or email us:',
    },
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
    home: 'Sākums',
    joinWaitlist: 'Piesakies agrīnai piekļuvei',
    forEmployers: 'Darba devējiem',
    forPartners: 'Partneriem',
    bookCall: 'Pieteikt zvanu',
    becomePartner: 'Kļūt par partneri',
    menuAria: 'Atvērt izvēlni',
  },
  employers: {
    meta: {
      title: 'Coride: Darba devējiem',
      description:
        'Palīdziet komandai nokļūt darbā, nebūvējot vēl vienu stāvlaukumu. Coride savieno darbiniekus pārbaudītos kopbraucienos.',
    },
    hero: {
      title: 'Palīdziet komandai nokļūt darbā, nebūvējot vēl vienu stāvlaukumu.',
      sub:
        'Coride savieno jūsu darbiniekus pārbaudītos kopbraucienos. Mazāk auto stāvlaukumā, zemākas stāvvietu izmaksas, reāls ilgtspējības ieguvums un vieglāks ceļš uz darbu visai komandai.',
      ctaPrimary: 'Pieteikt zvanu',
      ctaGhost: 'Kā tas darbojas',
      baBefore: 'Pirms',
      baAfter: 'Pēc',
      baCap: 'Mazāk automašīnu nozīmē brīvu vietu, ko var izmantot, paplašināt, izīrēt, vai vienkārši vairs par to nemaksāt.',
      baAria: 'Pirms un pēc: pilns stāvlaukums kļūst brīvāks un izmantojams citiem mērķiem',
    },
    cost: {
      title: 'Slēptās izmaksas, kā jūsu komanda brauc uz darbu.',
      lead: 'Lielākā daļa darbavietu maksā par braukšanu vienatnē, pat neredzot rēķinu.',
      cards: [
        {
          line: 'line-magenta',
          title: 'Stāvvieta maksā vairāk, nekā šķiet',
          desc:
            'Zeme, būvniecība, uzturēšana, sniega tīrīšana. Katra vieta gadā izmaksā tūkstošiem eiro, un lielākajā daļā brauc tikai viens cilvēks.',
        },
        {
          line: 'line-blue',
          title: 'Grūti pieejamas lokācijas atņem talantus',
          desc:
            'Industriālie parki, lidosta, loģistikas centri. Kad ceļš uz darbu ir sarežģīts, atrast un noturēt darbiniekus kļūst grūtāk.',
        },
        {
          line: 'line-green',
          title: 'Braukšana vienatnē iet pret jūsu klimata mērķiem',
          desc:
            'Viens cilvēks vienā automašīnā: neefektīvākais veids, kā komandai ceļot. Tas redzams jūsu oglekļa pēdā un pārskatos.',
        },
        {
          line: 'line-orange',
          title: 'Ceļš uz darbu ir ikdienas slogs, kuru grūti noņemt',
          desc:
            'Jūsu darbinieki katru dienu zaudē laiku un naudu ceļā. Tagad varat palīdzēt viņiem ietaupīt reālas summas gada laikā.',
        },
      ],
    },
    value: {
      title: 'Ko Coride sniedz.',
      lead: 'Coride pārvērš jūsu komandas ikdienas braucienu par risinājumu, kas der visiem.',
      cards: [
        {
          line: 'line-blue',
          title: 'Mazāk auto, mazāks spiediens uz stāvvietām',
          desc:
            'Kolēģi braucot kopā, vajag mazāk vietu. Atbrīvojiet zemi, samaziniet stāvvietu izmaksas un maziniet ikdienas sastrēgumus.',
        },
        {
          line: 'line-orange',
          title: 'Darbavieta, kurai vieglāk piekļūt',
          desc:
            'Padariet savu lokāciju pieejamāku, negaidot jaunus autobusu maršrutus. Vieglāks ceļš uz darbu palīdz atrast un noturēt darbiniekus.',
        },
        {
          line: 'line-green',
          title: 'Izmērāms ilgtspējības ieguvums',
          desc:
            'Mazāk automašīnu uz ceļiem: skaidrs, uzskatāms ieguldījums jūsu klimata un ESG saistībās.',
        },
        {
          line: 'line-magenta',
          title: 'Reāls bonuss darbiniekiem, bez papildu darba jums',
          desc:
            'Darbinieki par katru kopbraucienu saņem bonusus no vietējiem partneriem. Jūs piedāvājat reālu labumu, neko pārvaldot paši.',
        },
        {
          line: 'line-lime',
          span2: true,
          title: 'Pārbaudīti un tikai no jūsu darbavietas',
          desc: 'Tikai jūsu cilvēki, pārbaudīti caur darbavietu. Kolēģi brauc ar kolēģiem, ne ar svešiniekiem.',
        },
      ],
    },
    how: {
      title: 'Kā Coride darbojas darba devējiem.',
      lead: 'Četri soļi, no pievienošanās līdz redzamam rezultātam.',
      steps: [
        {
          line: 'line-blue',
          step: '01',
          title: 'Jūsu darbavieta pievienojas Coride',
          desc: 'Mēs iestatām Coride jūsu komandai un pārbaudām braucēus.',
        },
        {
          line: 'line-orange',
          step: '02',
          title: 'Darbinieki atrod kolēģus',
          desc: 'Viņi atrod kolēģus uz tā paša maršruta un maiņā.',
        },
        {
          line: 'line-green',
          step: '03',
          title: 'Brauc kopā',
          desc: 'Viens auto vairāku vietā. Izmaksas tiek godīgi sadalītas lietotnē.',
        },
        {
          line: 'line-magenta',
          step: '04',
          title: 'Redzat rezultātu',
          desc: 'Mazāk automašīnu, brīvākas stāvvietas un izmērāms ilgtspējības ieguvums.',
        },
      ],
    },
    pilot: {
      title: 'Pirmie pilotprojekti sāksies šī gada rudenī.',
      body:
        'Mēs sadarbojamies ar ierobežotu skaitu darba devēju, lai Coride vispirms nonāktu pie viņu komandām. Ja jūsu darbavietā trūkst stāvvietu, ir grūti piekļūt vai ikdienu nokļūt līdz darbam ir sarežģīti, vēlamies parunāt.',
      carAria: 'Pārvietot automašīnu pa maršrutu',
    },
    closing: {
      title: 'Vēlaties ieviest Coride savā darbavietā?',
      body:
        'Parunāsim īsi par to, vai Coride der jūsu komandai. Bez saistībām, vienkārši iespēja izpētīt.',
      cta: 'Pieteikt zvanu',
      emailNote: 'Vai rakstiet mums:',
    },
  },
  partners: {
    meta: {
      title: 'Coride: Partneriem',
      description:
        'Sasniedz lojālus vietējos klientus viņu ikdienas ceļā uz darbu. Coride braucēji pelna bonusus pie tuvējiem uzņēmumiem.',
    },
    hero: {
      title: 'Sasniedz lojālus vietējos klientus ceļā uz darbu.',
      sub:
        'Coride braucēji ikdienas ceļā uz darbu pelna bonusus pie tuvējiem uzņēmumiem. Kļūsti par partneri un parādi savu uzņēmumu pastāvīgai vietējo klientu plūsmai — cilvēkiem, kas brauc tev garām katru dienu.',
      ctaPrimary: 'Kļūt par partneri',
      ctaGhost: 'Kā tas darbojas',
      map: {
        aria: 'Ceļš no mājām uz darbu ar vietējiem uzņēmumiem kā pieturām pa ceļam',
        home: 'Mājas',
        work: 'Darbs',
        cafe: 'Kafejnīca',
        gym: 'Sporta zāle',
        shop: 'Veikals',
        bakery: 'Maiznīca',
        cap: 'Kļūsti par pieturu ikdienas maršrutā',
      },
    },
    why: {
      title: 'Kāpēc sadarboties ar Coride.',
      lead:
        'Coride nav kārtējā atlaižu platforma. Tas ir veids, kā sasniegt cilvēkus, kas jau tagad katru darba dienu brauc garām tavām durvīm.',
      cards: [
        {
          line: 'line-blue',
          title: 'Sasniedz klientus bez mārketinga budžeta',
          desc:
            'Coride parāda tavu uzņēmumu apkārtnes braucējiem. Bez reklāmas kampaņām, bez mārketinga izdevumiem. Platforma atved klientus pie tevis.',
        },
        {
          line: 'line-orange',
          title: 'Klienti, kas ierodas gatavi pirkt',
          desc:
            'Coride braucēji pie tevis iegriežas savas ikdienas gaitās — motivēti un vietēji, nevis vienreizēji atlaižu mednieki.',
        },
        {
          line: 'line-green',
          title: 'Kļūsti par viņu ikdienas izvēli',
          desc:
            'Esi tā kafejnīca, sporta zāle vai veikals, ko braucēji izvēlas ceļā uz darbu un mājām. Vesels apkārtnē strādājošo tīkls, kas izvēlas tevi.',
        },
        {
          line: 'line-magenta',
          title: 'Atkārtoti, regulāri apmeklējumi',
          desc:
            'Ceļš uz darbu ir katru dienu. Šie nav vienreizēji pircēji — viņi brauc tev garām katru darba dienu, atkal un atkal.',
        },
      ],
    },
    how: {
      title: 'Kā darbojas partnerība.',
      lead: 'Partneru programmu veidojam kopā ar pirmajiem partneriem.',
      steps: [
        {
          line: 'line-blue',
          step: '01',
          title: 'Braucēji pelna bonusus ar Coride',
          desc: 'Katru reizi, kad kolēģi brauc kopā, viņi nopelna bonusus, ko tērēt pie vietējiem partneriem.',
        },
        {
          line: 'line-orange',
          step: '02',
          title: 'Tu piedāvā ko piemērotu',
          desc:
            'Kafejnīcas, sporta zāles, veikali, pakalpojumi — kopā atradīsim īsto piedāvājumu. Bez stingras formulas.',
        },
        {
          line: 'line-green',
          step: '03',
          title: 'Braucēji tevi atklāj un apciemo',
          desc: 'Braucēji atrod tevi lietotnē un iegriežas pie tevis sava ikdienas maršruta laikā.',
        },
        {
          line: 'line-magenta',
          step: '04',
          title: 'Detaļas izstrādājam kopā',
          desc:
            'Kā agrīnais partneris tu palīdzi veidot programmas darbību — un esi klāt pirms citiem.',
        },
      ],
    },
    local: {
      title: 'Veidots vietējiem uzņēmumiem tur, kur cilvēki strādā.',
      body:
        'Kafejnīcas, restorāni, sporta zāles, veikali, degvielas uzpildes stacijas, pakalpojumi — ja braucēji tev brauc garām ceļā uz darbu un mājām, Coride var viņus atvest pie tevis.',
      tags: [
        { label: 'Kafejnīcas', color: 'line-orange' },
        { label: 'Restorāni', color: 'line-blue' },
        { label: 'Sporta zāles', color: 'line-green' },
        { label: 'Veikali', color: 'line-magenta' },
        { label: 'Degvielas stacijas', color: 'line-brown' },
        { label: 'Pakalpojumi', color: 'line-lime' },
      ],
    },
    network: {
      title: 'Mēs jau tagad veidojam savu pirmo partneru tīklu.',
      body:
        'Mēs runājam ar vietējiem uzņēmumiem, kas vēlas būt daļa no Coride jau no paša sākuma. Agrīnie partneri palīdz veidot programmu, un tieši viņus braucēji ieraudzīs pirmos, kad sāksim.',
      carAria: 'Pārvietot automašīnu pa maršrutu',
    },
    closing: {
      title: 'Interesē kļūt par Coride partneri?',
      body:
        'Aprunāsimies, vai Coride der tavam uzņēmumam. Mēs vēl veidojam programmu, un tava pieredze palīdz to izveidot.',
      cta: 'Kļūt par partneri',
      emailNote: 'Vai raksti mums:',
    },
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
