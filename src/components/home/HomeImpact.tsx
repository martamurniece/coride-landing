'use client';

import { useLocale } from '@/i18n/LocaleProvider';

export function HomeImpact() {
  const { t } = useLocale();
  const im = t.home.impact;
  const cards = [
    { key: 'cost', c: im.cost, cls: 'hStatOrange', tag: 'tagOrange' },
    { key: 'parking', c: im.parking, cls: 'hStatMagenta', tag: 'tagMagenta' },
  ];

  return (
    <section className="hSec hImpact" id="numbers">
      <span className="hMNode" data-color="lime" aria-hidden="true" />
      <h2 className="hH2">{im.title}</h2>
      <p className="hLead">{im.lead}</p>
      <div className="hStats">
        {cards.map(({ key, c, cls, tag }) => (
          <div key={key} className={`hStat ${cls}`}>
            <div className={`tag ${tag}`}>
              <span aria-hidden="true" />
              <span>{c.tag}</span>
            </div>
            <div className="hStatFig">
              <span className="hStatFrom">{c.from}</span>
              <span className="hStatArrow" aria-hidden="true">→</span>
              <span className="hStatTo">{c.to}</span>
              <span className="hStatUnit">{c.unit}</span>
            </div>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
