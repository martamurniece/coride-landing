import type { Locale } from './types';

const en = {
  meta: {
    title: 'Coride: Skip traffic. Cut costs. Co-ride with colleagues.',
    description:
      'Join verified communities going on the same routes as you. Drive together and split the cost of your commute.',
  },
  nav: {
    homeAria: 'Coride home',
    home: 'Home',
    joinWaitlist: 'Join the waitlist',
    forEmployers: 'For employers',
    forPartners: 'For partners',
    bookCall: 'Book a demo',
    becomePartner: 'Become a partner',
    menuAria: 'Toggle menu',
  },
  employers: {
    meta: {
      title: 'Coride: For employers',
      description:
        "Lower your team's commute costs, parking included. Coride connects employees into verified, shared commutes.",
    },
    hero: {
      title: "Lower your team's commute costs, parking included.",
      sub: 'Spend less on getting people to work, fewer parking spaces to maintain, and gain commute data you can report.',
      ctaPrimary: 'Book a demo',
      ctaGhost: 'How it works',
    },
    timeline: {
      title: 'Your site, over time',
      badge: 'Example data',
      aria: 'Example of the employer admin panel over time',
      periodAria: 'Time period',
      stages: ['Week 1', 'Month 1', 'Month 2', 'Month 3', 'Month 6'],
      stagesShort: ['Week 1', 'M1', 'M2', 'M3', 'M6'],
      sharing: 'Employees sharing rides',
      countsOnly: 'Counts only. No names.',
      parking: 'Parking in use',
      co2: 'CO₂ avoided, Scope 3 Category 7',
    },
    value: {
      title: 'What Coride brings.',
      lead: 'Most workplaces pay for solo commuting without ever seeing the bill. Here is what changes with Coride.',
      big: {
        today: 'Today: Someone pays for every commute',
        title: 'Lower commute costs',
        desc: 'Colleagues share one car and split the fuel. Your employees pay less to get to work, and you have fewer seats to fund on buses and taxis.',
      },
      cards: [
        {
          color: 'blue',
          today: 'Today: Parking is more expensive than it looks',
          title: 'Fewer cars, less parking pressure',
          desc: 'When colleagues share their commute, you need fewer parking spaces.',
        },
        {
          color: 'green',
          today: 'Today: Solo commuting works against your climate goals',
          title: 'Measurable sustainability impact',
          desc: 'Fewer cars on the road is a clear, reportable contribution to your climate and ESG commitments.',
        },
        {
          color: 'magenta',
          today: '',
          title: 'A real saving, with no work for you',
          desc: 'Your employees split fuel costs through the app every time they share a ride. You offer a benefit without running anything yourself.',
        },
        {
          color: 'brown',
          today: 'Today: Hard-to-reach locations cost you talent',
          title: "A workplace that's easier to reach",
          desc: 'Make your location easier to reach without organising alternative transport, and hire and retain good people.',
        },
      ],
      wide: {
        title: 'Verified and workplace-only',
        desc: 'Everyone is heading to the same workplace. By our estimate, that makes each employee about 20 times more likely to find a match than on an open carpool app.',
      },
    },
    admin: {
      title: 'An admin panel with the commute data you report.',
      lead: 'Add your employees, follow adoption and export Scope 3 commute data from one place.',
      features: [
        {
          title: 'Adoption at a glance',
          desc: 'See how many employees have joined and how often they share rides.',
        },
        {
          title: 'Scope 3 commute data',
          desc: 'Shared rides become commute emissions data you can export for Scope 3 Category 7 reporting.',
        },
        {
          title: 'Statistics, not names',
          desc: 'You see counts and trends. The panel never shows which named employee is or is not using Coride.',
        },
      ],
      report: {
        title: 'From shared rides to your report',
        badge: 'Example data',
        aria: 'Example: shared rides turning into a Scope 3 report',
        ride: 'Shared ride, {n} colleagues',
        reportTitle: 'Scope 3, Category 7',
        reportSub: 'Employee commuting, this month',
        rows: ['Shared rides', 'CO₂ avoided', 'Parking freed'],
        note: 'Totals for your company only. No employee names.',
        download: 'Download report',
        downloaded: 'Report downloaded',
        replay: 'Replay the example',
      },
    },
    how: {
      title: 'How Coride works for employers.',
      lead: 'Four steps, from joining to seeing the impact.',
      step: 'Step',
      steps: [
        { title: 'Your workplace joins Coride', desc: 'We set up Coride for your team and verify your commuters.' },
        { title: 'Your employees match', desc: 'They find colleagues on the same routes and shifts.' },
        { title: 'They co-ride', desc: 'One car instead of several. Costs are shared through the app.' },
        {
          title: 'You see the impact',
          desc: 'Lower commute costs, freed-up parking, and commute data for your sustainability report.',
        },
      ],
    },
    closing: {
      label: 'First pilots start in early 2027',
      title: 'Want to bring Coride to your workplace?',
      body: "We're working with a small number of employers to bring Coride to their teams first. If your workplace struggles with commute costs, parking, or access, let us show you how it works. No commitment.",
      cta: 'Book a demo',
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
      title: 'Become a stop on the daily route.',
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
        fuel: 'Fuel station',
      },
    },
    why: {
      title: 'Why partner with Coride.',
      lead:
        "Coride isn't another discount platform. It's a way to reach the people who already pass your door, every working day.",
      cards: [
        {
          line: 'line-blue',
          title: 'Reach customers where they already are',
          desc:
            'Coride puts your business in front of the commuters who pass your door every working day. The platform brings them to you.',
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
      lead: "We're shaping the partner programme together with our first partners.",
      step: 'Step',
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
            'As an early partner, you help shape how the programme works — and get in before anyone else.',
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
        "We're talking to local businesses who want to be part of Coride from the start. Early partners help shape the programme and are the first commuters see when we launch.",
      carAria: 'Move the car along the route',
    },
    closing: {
      title: 'Interested in becoming a Coride partner?',
      body:
        "Let's talk about whether Coride fits your business. We're still shaping the programme, and your input helps build it.",
      cta: 'Become a partner',
      emailNote: 'Or email us:',
    },
  },
  hero: {
    title: 'Cut the cost of the commute you already make.',
    sub: 'Join your workplace community on Coride.',
    ctaPrimary: 'Get early access',
    ctaGhost: 'How it works',
    tractionBold: 'First pilots with select employers start in early 2027.',
    tractionRest: 'Get early access today.',
    demo: {
      tabsAria: 'How a shared commute works',
      tabs: ['Match', 'Ride', 'Save'],
      mapAria:
        'Example map of a commute from Home to Office, with two colleagues living near the route.',
      home: 'Home',
      office: 'Office',
      add: '+ Add {name}',
      added: '{name} added',
      addAria: 'Add {name} to your ride',
      removeAria: 'Remove {name} from your ride',
      eta: 'Arrive 8:50',
      etaDone: 'Arrived 8:50',
      start: 'Start the ride →',
      arrive: 'Arrive →',
      replay: 'Replay ↺',
      matchNoneTitle: '2 colleagues live on your route',
      matchNoneSub: 'Both drive to your office at the same time.',
      matchOneTitle: '{name} joins your ride',
      matchOneSub: '{other} is on your route too.',
      matchTwoTitle: '{a} and {b} join your ride',
      matchTwoSub: 'Three colleagues, one car to work.',
      joinsTitle: '{name} joins the ride',
      joinsSub: 'Picked up on your way to work.',
      onWayTitle: 'On the way to the office',
      aloneSub: 'Driving alone today.',
      nextSub: 'Next pick-up: {name}.',
      boardTitle: 'Everyone is on board',
      boardSub: 'Heading to the office together.',
      sharedTitle: "You shared today's commute",
      sharedSub: 'One car instead of {n}.',
      soloTitle: 'You drove alone today',
      soloSub: 'Add a colleague next time to split the fuel.',
      chipFuel: 'Fuel split {n} ways',
      chipCar: '{n} people, 1 car',
    },
  },
  home: {
    problem: {
      title: 'Carpooling that fits your schedule and route, not the other way round.',
      cost: {
        tag: 'Cost',
        title: 'Driving alone costs more every month.',
        desc: 'Fuel, parking and wear and tear add up. The average car in the EU carries 1.4 people. It is built for five.',
      },
      coverage: {
        tag: 'Coverage',
        title: "Public transport doesn't fit every commute.",
        desc: "We're battling two issues: inefficient and costly transport alternatives for remote sites, and costly and busy parking spaces in dense areas.",
        places: ['Industrial park', 'Logistics hub', 'Airport', 'City office'],
      },
      trust: {
        tag: 'Trust',
        title: 'Sharing a ride with strangers is a hard sell.',
        desc: 'Other carpool apps match you with anyone. Coride matches you only with verified colleagues from your own workplace.',
        verified: 'Verified colleagues',
      },
    },
    impact: {
      title: 'The impact?',
      lead: 'Reduce your impact on the environment while reducing your monthly commute expenses.',
      cost: {
        tag: 'Commute cost',
        from: '250',
        to: '63',
        unit: 'EUR a month',
        desc: 'A 40 km commute, driving alone compared with sharing the car with three colleagues.',
      },
      parking: {
        tag: 'Parking',
        from: '4',
        to: '1',
        unit: 'parking spaces',
        desc: 'Four colleagues in one car take one space at work instead of four.',
      },
    },
    backers: {
      title: 'Who backs Coride.',
      eit: {
        title: 'EIT Jumpstarter 2026',
        desc: 'Winner of EIT Jumpstarter 2026, Urban Mobility and Smart Cities cohort',
        alt: 'EIT Community Jumpstarter, funded by the European Union',
      },
      rtu: { title: 'RTU Innovations', desc: 'Supported by RTU Innovations.', alt: 'RTU Innovations' },
      vefresh: { title: 'VEFRESH', desc: 'Supported by VEFRESH.', alt: 'VEFRESH' },
    },
    how: {
      title: 'How do you get Coride?',
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
          title: 'Match with people who actually go where you go.',
          desc: 'Everyone on Coride is heading to your workplace. By our estimate, that makes each colleague about 20 times more likely to be your match than a user of an open carpool app.',
        },
        {
          label: 'Ride',
          title: 'Ride together.',
          desc: 'One car instead of five. Choose to drive or ride as a passenger, with fuel costs fairly split by the app.',
        },
        {
          label: 'Save',
          title: 'See what you save.',
          desc: 'After every shared ride the app shows what the commute cost you, next to what it costs alone.',
        },
        {
          label: 'Collect',
          title: 'Earn badges with every shared ride.',
          desc: 'Your shared rides add up to badges you collect alongside your colleagues.',
        },
      ],
    },
  },
  signup: {
    title: 'Start before the first ride.',
    subhead:
      "Coride pilots start in early 2027. Tell us where you work, and we'll let you know when your company joins.",
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
      "We'd rather talk than have you fill a form. Pick a 30-minute slot and we'll walk you through what a Coride pilot looks like for your team.",
    partnerMsg:
      "Want to offer perks to Coride riders? Let's talk. Pick a 30-minute slot and we'll figure out a partnership that works for your business.",
    bookCall: 'Book a demo',
    emailNote: 'Or email us:',
    success: "We got it. We'll be in touch shortly.",
    backToTop: 'Back to top',
    errors: {
      consent: 'You must agree to be contacted to submit this form.',
      required: 'Please fill in all required fields.',
      generic: 'Something went wrong. Please try again.',
    },
  },
  footer: {
    homeAria: 'Coride home',
    legal: 'Legal',
    privacy: 'Privacy policy',
    supportedBy: 'Supported by',
  },
  privacy: {
    meta: {
      title: 'Coride: Privacy Policy',
      description:
        'How Coride (SIA Milup) collects, uses, and protects personal data when you use coride.org.',
    },
    title: 'Privacy Policy',
    updated: 'Last updated: 5 August 2026',
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
      'We do not use cookies or analytics that track you. The site uses Simple Analytics, an EU-hosted service that is cookieless and does not collect personal data.',
    s3Title: '3. Why we collect it',
    s3Items: [
      'To respond to your enquiry about Coride',
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
      'We retain submitted contact information for up to 12 months from submission, after which it is anonymised or deleted.',
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
    title: 'Coride: Ietaupi laiku. Samazini izmaksas. Brauc kopā ar kolēģiem.',
    description:
      'Pievienojies kolēģiem, kas brauc pa tiem pašiem maršrutiem. Brauc kopā un dali ceļa izmaksas.',
  },
  nav: {
    homeAria: 'Coride sākums',
    home: 'Sākums',
    joinWaitlist: 'Piesakies agrīnai piekļuvei',
    forEmployers: 'Darba devējiem',
    forPartners: 'Partneriem',
    bookCall: 'Pieteikt demo',
    becomePartner: 'Kļūt par partneri',
    menuAria: 'Atvērt izvēlni',
  },
  employers: {
    meta: {
      title: 'Coride: Darba devējiem',
      description:
        'Samaziniet komandas ceļa izmaksas, ieskaitot stāvvietas. Coride savieno darbiniekus pārbaudītos kopbraucienos.',
    },
    hero: {
      title: 'Samaziniet komandas ceļa izmaksas, ieskaitot stāvvietas.',
      sub: 'Mazāk izdevumu par darbinieku nokļūšanu darbā, mazāk uzturamu stāvvietu un dati par ceļu uz darbu, ko varat iekļaut pārskatos.',
      ctaPrimary: 'Pieteikt demo',
      ctaGhost: 'Kā tas darbojas',
    },
    timeline: {
      title: 'Jūsu darbavieta laika gaitā',
      badge: 'Piemēra dati',
      aria: 'Darba devēja administrēšanas paneļa piemērs laika gaitā',
      periodAria: 'Laika posms',
      stages: ['1. nedēļa', '1. mēnesis', '2. mēnesis', '3. mēnesis', '6. mēnesis'],
      stagesShort: ['1. ned.', '1. mēn.', '2. mēn.', '3. mēn.', '6. mēn.'],
      sharing: 'Darbinieki, kas brauc kopā',
      countsOnly: 'Tikai skaits. Bez vārdiem.',
      parking: 'Aizņemtās stāvvietas',
      co2: 'Ietaupītais CO₂, Scope 3 7. kategorija',
    },
    value: {
      title: 'Ko Coride sniedz.',
      lead: 'Lielākā daļa darbavietu maksā par braukšanu vienatnē, pat neredzot rēķinu. Lūk, kas mainās ar Coride.',
      big: {
        today: 'Šodien: kāds maksā par katru braucienu uz darbu',
        title: 'Zemākas ceļa izmaksas',
        desc: 'Kolēģi brauc vienā auto un dala degvielas izmaksas. Darbinieki maksā mazāk par ceļu uz darbu, un jums jāfinansē mazāk vietu autobusos un taksometros.',
      },
      cards: [
        {
          color: 'blue',
          today: 'Šodien: stāvvieta maksā vairāk, nekā šķiet',
          title: 'Mazāk auto, mazāks spiediens uz stāvvietām',
          desc: 'Kolēģiem braucot kopā, vajag mazāk stāvvietu.',
        },
        {
          color: 'green',
          today: 'Šodien: braukšana vienatnē iet pret jūsu klimata mērķiem',
          title: 'Izmērāms ilgtspējības ieguvums',
          desc: 'Mazāk automašīnu uz ceļiem: skaidrs, uzskatāms ieguldījums jūsu klimata un ESG saistībās.',
        },
        {
          color: 'magenta',
          today: '',
          title: 'Reāls ietaupījums bez papildu darba jums',
          desc: 'Darbinieki lietotnē dala degvielas izmaksas katru reizi, kad brauc kopā. Jūs piedāvājat labumu, neko nepārvaldot paši.',
        },
        {
          color: 'brown',
          today: 'Šodien: grūti pieejamas lokācijas atņem talantus',
          title: 'Darbavieta, kurai vieglāk piekļūt',
          desc: 'Padariet savu lokāciju vieglāk sasniedzamu, neorganizējot alternatīvu transportu, un piesaistiet un noturiet labus darbiniekus.',
        },
      ],
      wide: {
        title: 'Pārbaudīti un tikai no jūsu darbavietas',
        desc: 'Visi brauc uz to pašu darbavietu. Pēc mūsu aprēķiniem tas katram darbiniekam dod aptuveni 20 reizes lielāku iespēju atrast braukšanas biedru nekā atvērtā kopbraukšanas lietotnē.',
      },
    },
    admin: {
      title: 'Administrēšanas panelis ar ceļa datiem jūsu pārskatiem.',
      lead: 'Pievienojiet darbiniekus, sekojiet līdzi lietošanai un eksportējiet Scope 3 ceļa datus vienuviet.',
      features: [
        {
          title: 'Lietošana vienā skatienā',
          desc: 'Redziet, cik darbinieku ir pievienojušies un cik bieži viņi brauc kopā.',
        },
        {
          title: 'Scope 3 ceļa dati',
          desc: 'Kopbraucieni pārvēršas emisiju datos, ko varat eksportēt Scope 3 7. kategorijas pārskatiem.',
        },
        {
          title: 'Statistika, nevis vārdi',
          desc: 'Jūs redzat skaitus un tendences. Panelis nekad nerāda, kurš konkrēts darbinieks lieto vai nelieto Coride.',
        },
      ],
      report: {
        title: 'No kopbraucieniem līdz jūsu pārskatam',
        badge: 'Piemēra dati',
        aria: 'Piemērs: kopbraucieni pārvēršas Scope 3 pārskatā',
        ride: 'Kopbrauciens, {n} kolēģi',
        reportTitle: 'Scope 3, 7. kategorija',
        reportSub: 'Darbinieku ceļš uz darbu, šis mēnesis',
        rows: ['Kopbraucieni', 'Ietaupītais CO₂', 'Atbrīvotās stāvvietas'],
        note: 'Tikai jūsu uzņēmuma kopsummas. Bez darbinieku vārdiem.',
        download: 'Lejupielādēt pārskatu',
        downloaded: 'Pārskats lejupielādēts',
        replay: 'Atkārtot piemēru',
      },
    },
    how: {
      title: 'Kā Coride darbojas darba devējiem.',
      lead: 'Četri soļi, no pievienošanās līdz redzamam rezultātam.',
      step: 'Solis',
      steps: [
        { title: 'Jūsu darbavieta pievienojas Coride', desc: 'Mēs iestatām Coride jūsu komandai un pārbaudām braucējus.' },
        { title: 'Darbinieki atrod kolēģus', desc: 'Viņi atrod kolēģus uz tā paša maršruta un tajā pašā maiņā.' },
        { title: 'Brauc kopā', desc: 'Viens auto vairāku vietā. Izmaksas tiek dalītas lietotnē.' },
        {
          title: 'Redzat rezultātu',
          desc: 'Zemākas ceļa izmaksas, brīvākas stāvvietas un ceļa dati jūsu ilgtspējības pārskatam.',
        },
      ],
    },
    closing: {
      label: 'Pirmie pilotprojekti sāksies 2027. gada sākumā',
      title: 'Vēlaties ieviest Coride savā darbavietā?',
      body: 'Mēs sadarbojamies ar nelielu skaitu darba devēju, lai Coride vispirms nonāktu pie viņu komandām. Ja jūsu darbavietā ir grūtības ar ceļa izmaksām, stāvvietām vai piekļuvi, ļaujiet mums parādīt, kā tas darbojas. Bez saistībām.',
      cta: 'Pieteikt demo',
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
      title: 'Kļūsti par pieturu ikdienas maršrutā.',
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
        fuel: 'DUS',
      },
    },
    why: {
      title: 'Kāpēc sadarboties ar Coride.',
      lead:
        'Coride nav kārtējā atlaižu platforma. Tas ir veids, kā sasniegt cilvēkus, kas jau tagad katru darba dienu brauc garām tavām durvīm.',
      cards: [
        {
          line: 'line-blue',
          title: 'Sasniedz klientus tur, kur viņi jau ir',
          desc:
            'Coride parāda tavu uzņēmumu braucējiem, kas ik darba dienu brauc garām tavām durvīm. Platforma atved klientus pie tevis.',
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
      step: 'Solis',
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
    title: 'Ar Coride tavs ceļš uz darbu izmaksā mazāk.',
    sub: 'Pievienojies savas darbavietas kopienai Coride.',
    ctaPrimary: 'Piesakies agrīnai piekļuvei',
    ctaGhost: 'Kā tas darbojas',
    tractionBold: 'Pirmie pilotprojekti ar organizācijām sāksies 2027. gada sākumā.',
    tractionRest: 'Piesakies agrīnai piekļuvei jau šodien.',
    demo: {
      tabsAria: 'Kā notiek kopīgs brauciens uz darbu',
      tabs: ['Atrodi', 'Brauc', 'Ietaupi'],
      mapAria:
        'Piemēra karte: ceļš no mājām uz biroju un divi kolēģi, kas dzīvo pie maršruta.',
      home: 'Mājas',
      office: 'Birojs',
      add: '+ Pievienot',
      added: '{name} brauc līdzi',
      addAria: 'Pievienot braucienam: {name}',
      removeAria: 'Noņemt no brauciena: {name}',
      eta: 'Ierašanās 8:50',
      etaDone: 'Galā 8:50',
      start: 'Sākt braucienu →',
      arrive: 'Uz biroju →',
      replay: 'Atkārtot ↺',
      matchNoneTitle: '2 kolēģi dzīvo tavā maršrutā',
      matchNoneSub: 'Abi brauc uz biroju tajā pašā laikā.',
      matchOneTitle: '{name} brauc tev līdzi',
      matchOneSub: 'Arī {other} ir tavā maršrutā.',
      matchTwoTitle: '{a} un {b} brauc tev līdzi',
      matchTwoSub: 'Trīs kolēģi, viens auto uz darbu.',
      joinsTitle: '{name} iekāpj',
      joinsSub: 'Pa ceļam uz darbu.',
      onWayTitle: 'Ceļā uz biroju',
      aloneSub: 'Šodien brauc viens.',
      nextSub: 'Nākamā pietura: {name}.',
      boardTitle: 'Visi ir auto',
      boardSub: 'Kopā ceļā uz biroju.',
      sharedTitle: 'Šodien braucāt kopā',
      sharedSub: 'Viens auto {n} vietā.',
      soloTitle: 'Šodien brauci viens',
      soloSub: 'Nākamreiz pievieno kolēģi un daliet degvielas izmaksas.',
      chipFuel: 'Degviela dalīta uz {n}',
      chipCar: '{n} cilvēki, 1 auto',
    },
  },
  home: {
    problem: {
      title: 'Kopbraukšana, kas pielāgojas tavam grafikam un maršrutam, nevis otrādi.',
      cost: {
        tag: 'Izmaksas',
        title: 'Braukt vienam katru mēnesi izmaksā vairāk.',
        desc: 'Degviela, stāvvieta un auto nolietojums summējas. Vidēji ES automašīnā brauc 1,4 cilvēki. Tā ir būvēta pieciem.',
      },
      coverage: {
        tag: 'Pārklājums',
        title: 'Sabiedriskais transports neder katram ceļam uz darbu.',
        desc: 'Mēs risinām divas problēmas: neefektīvas un dārgas transporta alternatīvas attālām darbavietām un dārgas, pārpildītas stāvvietas blīvi apbūvētās vietās.',
        places: ['Industriālais parks', 'Loģistikas centrs', 'Lidosta', 'Birojs pilsētā'],
      },
      trust: {
        tag: 'Uzticēšanās',
        title: 'Braukt kopā ar svešiniekiem nav viegli.',
        desc: 'Citas kopbraukšanas lietotnes savieno tevi ar jebkuru. Coride savieno tevi tikai ar pārbaudītiem kolēģiem no tavas darbavietas.',
        verified: 'Pārbaudīti kolēģi',
      },
    },
    impact: {
      title: 'Kāds ir ieguvums?',
      lead: 'Samazini savu ietekmi uz vidi un reizē arī ikmēneša ceļa izdevumus.',
      cost: {
        tag: 'Ceļa izmaksas',
        from: '250',
        to: '63',
        unit: 'EUR mēnesī',
        desc: '40 km ceļš uz darbu: braucot vienam, salīdzinot ar braucienu kopā ar trim kolēģiem.',
      },
      parking: {
        tag: 'Stāvvietas',
        from: '4',
        to: '1',
        unit: 'stāvvietas',
        desc: 'Četri kolēģi vienā auto darbā aizņem vienu stāvvietu četru vietā.',
      },
    },
    backers: {
      title: 'Kas atbalsta Coride.',
      eit: {
        title: 'EIT Jumpstarter 2026',
        desc: 'EIT Jumpstarter 2026 uzvarētājs Urban Mobility and Smart Cities grupā',
        alt: 'EIT Community Jumpstarter, finansē Eiropas Savienība',
      },
      rtu: { title: 'RTU Innovations', desc: 'Atbalsta RTU Innovations.', alt: 'RTU Innovations' },
      vefresh: { title: 'VEFRESH', desc: 'Atbalsta VEFRESH.', alt: 'VEFRESH' },
    },
    how: {
      title: 'Kā tikt pie Coride?',
      stations: [
        {
          label: 'Darbavieta',
          title: 'Tava darbavieta pievienojas Coride.',
          descBeforeLink:
            'Mēs sadarbojamies ar tavu darba devēju, lai pārbaudītu braucējus un atvērtu Coride tavai komandai. Coride vēl nav pieejams tavā darbavietā?',
          link: 'Pastāsti mums',
          descAfterLink: ', kur strādā, un mēs uzrunāsim tavu uzņēmumu.',
        },
        {
          label: 'Maršruts',
          title: 'Atrodi cilvēkus, kas tiešām brauc turp, kurp tu.',
          desc: 'Visi Coride lietotāji brauc uz tavu darbavietu. Pēc mūsu aprēķiniem tas katru kolēģi padara aptuveni 20 reizes iespējamāku braukšanas biedru nekā atvērtas kopbraukšanas lietotnes lietotāju.',
        },
        {
          label: 'Brauciens',
          title: 'Brauciet kopā.',
          desc: 'Viens auto piecu vietā. Izvēlies būt pie stūres vai braukt kā pasažieris, un lietotne godīgi sadalīs degvielas izmaksas.',
        },
        {
          label: 'Ietaupi',
          title: 'Redzi, cik ietaupi.',
          desc: 'Pēc katra kopbrauciena lietotne parāda, cik tev izmaksāja ceļš, blakus tam, cik tas izmaksātu, braucot vienam.',
        },
        {
          label: 'Krāj',
          title: 'Krāj nozīmītes par katru kopbraucienu.',
          desc: 'Tavi kopbraucieni pārvēršas nozīmītēs, ko krāj kopā ar kolēģiem.',
        },
      ],
    },
  },
  signup: {
    title: 'Piesakies lietotnes testam savā darba vietā.',
    subhead:
      'Pirmie pilotprojekti ar organizācijām sāksies 2027. gada sākumā. Pastāsti mums, kur strādā, un mēs ziņosim, kad tavs uzņēmums pievienosies.',
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
      'Mēs labprātāk runājam, nekā liekam aizpildīt formu. Izvēlies 30 minūšu sarunu, un mēs pastāstīsim, kā Coride izmēģinājums izskatās tavai komandai.',
    partnerMsg:
      'Vēlies piedāvāt bonusus Coride braucējiem? Parunāsim. Izvēlies 30 minūšu sarunu, un kopā atradīsim sadarbības modeli tavam uzņēmumam.',
    bookCall: 'Pieteikt demo',
    emailNote: 'Vai rakstiet mums:',
    success: 'Saņemts. Drīzumā sazināsimies.',
    backToTop: 'Atpakaļ uz augšu',
    errors: {
      consent: 'Lai iesniegtu formu, jāpiekrīt saziņai ar tevi.',
      required: 'Lūdzu, aizpildi visus obligātos laukus.',
      generic: 'Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.',
    },
  },
  footer: {
    homeAria: 'Coride sākums',
    legal: 'Juridiskā informācija',
    privacy: 'Privātuma politika',
    supportedBy: 'Atbalsta',
  },
  privacy: {
    meta: {
      title: 'Coride: Privātuma politika',
      description:
        'Kā Coride (SIA Milup) vāc, izmanto un aizsargā personas datus, kad lietojat coride.org.',
    },
    title: 'Privātuma politika',
    updated: 'Pēdējoreiz atjaunināta: 2026. gada 5. augustā',
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
      'Mēs neizmantojam sīkdatnes vai analītiku, kas jūs izseko. Vietne izmanto Simple Analytics, ES izvietotu pakalpojumu, kas darbojas bez sīkdatnēm un nevāc personas datus.',
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
