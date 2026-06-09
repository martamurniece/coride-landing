'use client';

import { useLocale } from '@/i18n/LocaleProvider';

const STATION_META = [
  { number: '01', line: 'line-blue', side: 'left' as const },
  { number: '02', line: 'line-orange', side: 'right' as const },
  { number: '03', line: 'line-green', side: 'left' as const },
  { number: '04', line: 'line-magenta', side: 'right' as const },
  { number: '05', line: 'line-lime', side: 'left' as const },
];

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <section className="how" id="how">
      <div className="secHead">
        <h2>{t.how.title}</h2>
      </div>
      <p className="howSubhead">{t.how.subhead}</p>

      <div className="s3Track">
        {STATION_META.map((meta, i) => {
          const station = t.how.stations[i];
          return (
            <div key={meta.number} className={`s3Row ${meta.side} ${meta.line}`}>
              <div className="s3Text">
                <div className="s3Label">
                  {t.how.stationPrefix} {meta.number} · {station.label}
                </div>
                <h3>{station.title}</h3>
                <p>
                  {'descBeforeLink' in station ? (
                    <>
                      {station.descBeforeLink}{' '}
                      <a href="#signup">{station.link}</a>
                      {station.descAfterLink}
                    </>
                  ) : (
                    station.desc
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
