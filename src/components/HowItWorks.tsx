const stations = [
  {
    number: '01',
    label: 'Workplace',
    line: 'line-blue',
    side: 'left' as const,
    title: 'Your workplace joins Coride.',
    desc: 'Coride partners with your employer to verify commuters and open the platform to your team. Not there yet? Tell us where you work and we\'ll reach out.',
  },
  {
    number: '02',
    label: 'Match',
    line: 'line-orange',
    side: 'right' as const,
    title: 'You match with colleagues going your way.',
    desc: 'Add your home, your shift, your route. Coride finds verified colleagues on the same path.',
  },
  {
    number: '03',
    label: 'Ride',
    line: 'line-green',
    side: 'left' as const,
    title: 'You ride together.',
    desc: 'One car instead of five. Drivers and riders alternate, costs are split through the app.',
  },
  {
    number: '04',
    label: 'Earn',
    line: 'line-magenta',
    side: 'right' as const,
    title: 'You earn perks every ride.',
    desc: 'Each verified commute adds perks to your account, funded by local partners across Rīga.',
  },
  {
    number: '05',
    label: 'Spend',
    line: 'line-lime',
    side: 'left' as const,
    title: 'You spend them where you already go.',
    desc: 'Cafés, gyms, shops, services. Local partners you\'d visit anyway, now part of your commute.',
  },
];

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="secHead">
        <h2>How Coride works.</h2>
      </div>
      <p className="howSubhead">Five steps, the same every commute.</p>

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
