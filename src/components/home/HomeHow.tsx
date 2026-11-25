'use client';

import { useLocale } from '@/i18n/LocaleProvider';

const COLORS = ['blue', 'orange', 'green', 'magenta', 'lime'];

export function HomeHow() {
  const { t } = useLocale();
  const h = t.home.how;

  return (
    <section className="hHow" id="how">
      <div className="hHowHead">
        <h2 className="hH2">{h.title}</h2>
      </div>
      <div className="hStations">
        {h.stations.map((s, i) => (
          <div key={s.label} className={`hStation ${i % 2 ? 'right' : 'left'}`} data-color={COLORS[i]}>
            <span className="hMNode hMNodeStation" data-color={COLORS[i]} aria-hidden="true" />
            <div className={`hStationLabel c-${COLORS[i]}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </div>
            <h3>{s.title}</h3>
            <p>
              {'desc' in s ? (
                s.desc
              ) : (
                <>
                  {s.descBeforeLink} <a href="#signup">{s.link}</a>
                  {s.descAfterLink}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
