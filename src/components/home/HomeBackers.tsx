'use client';

import Image from 'next/image';
import { useLocale } from '@/i18n/LocaleProvider';

export function HomeBackers() {
  const { t } = useLocale();
  const b = t.home.backers;
  const items = [
    { key: 'eit', it: b.eit, src: '/assets/eit-jumpstarter-dark.png', w: 1960, h: 300, cls: 'logoEit' },
    { key: 'rtu', it: b.rtu, src: '/assets/rtu-logo.png', w: 530, h: 343, cls: 'logoRtu' },
    { key: 'vefresh', it: b.vefresh, src: '/assets/vefresh-navy.png', w: 1844, h: 253, cls: 'logoVefresh' },
  ];

  return (
    <section className="hSec hBackers" id="proof">
      <span className="hMNode" data-color="brown" aria-hidden="true" />
      <h2 className="hH2">{b.title}</h2>
      <div className="hBackersGrid">
        {items.map(({ key, it, src, w, h, cls }) => (
          <div key={key} className="hBacker">
            <Image className={`hBackerLogo ${cls}`} src={src} alt={it.alt} width={w} height={h} />
            <div className="hBackerText">
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
