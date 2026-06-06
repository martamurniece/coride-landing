const stations = [
  {
    number: '01',
    label: 'Workplace',
    line: 'line-blue',
    side: 'left' as const,
    title: 'Your workplace joins Coride.',
    desc: (
      <>
        We partner with your employer to verify commuters and open Coride to your team. Not live at
        your workplace yet?{' '}
        <a href="#signup">Tell us</a>{' '}where you work, and we&apos;ll reach out.
      </>
    ),
  },
  {
    number: '02',
    label: 'Match',
    line: 'line-orange',
    side: 'right' as const,
    title: 'Match with colleagues going your way.',
    desc: 'Add your home, shift, and route. Coride connects you with verified colleagues travelling on similar routes.',
  },
  {
    number: '03',
    label: 'Ride',
    line: 'line-green',
    side: 'left' as const,
    title: 'Ride together.',
    desc: 'One car instead of five. Choose to drive or ride as a passenger, with commute costs fairly split through the app.',
  },
  {
    number: '04',
    label: 'Earn',
    line: 'line-magenta',
    side: 'right' as const,
    title: 'Earn perks with every ride.',
    desc: 'Each commute with Coride adds perks to your account, funded by local partners across your country.',
  },
  {
    number: '05',
    label: 'Spend',
    line: 'line-lime',
    side: 'left' as const,
    title: 'Spend your rewards where you already go.',
    desc: 'Cafés, gyms, shops, services in your area, get discounts on things you would be buying anyway.',
  },
];

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="secHead">
        <h2>How Coride works.</h2>
      </div>
      <p className="howSubhead">Simple to start easy to use.</p>

      <div className="s3Track">
        {stations.map((s) => (
          <div key={s.number} className={`s3Row ${s.side} ${s.line}`}>
            <div className="s3Text">
              <div className="s3Label">Station {s.number} · {s.label}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
