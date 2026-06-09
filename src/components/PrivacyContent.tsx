'use client';

import { useEffect } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

const EMAIL = 'info@coride.org';

export function PrivacyContent() {
  const { t } = useLocale();
  const p = t.privacy;

  useEffect(() => {
    document.title = p.documentTitle;
  }, [p.documentTitle]);

  return (
    <main className="legalDoc">
      <article className="legalInner">
        <h1>{p.title}</h1>
        <p className="legalMeta">{p.updated}</p>

        <p className="legalLead">{p.lead}</p>

        <h2>{p.s1Title}</h2>
        <p>
          {p.s1Body}{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>{p.s2Title}</h2>
        <p>{p.s2Intro}</p>
        <ul>
          {p.s2Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{p.s2Outro}</p>

        <h2>{p.s3Title}</h2>
        <ul>
          {p.s3Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{p.s3Outro}</p>

        <h2>{p.s4Title}</h2>
        <p>{p.s4Intro}</p>
        <ul>
          {p.s4Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{p.s4Outro}</p>

        <h2>{p.s5Title}</h2>
        <p>
          {p.s5Body}{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>{p.s6Title}</h2>
        <p>{p.s6Body}</p>

        <h2>{p.s7Title}</h2>
        <p>
          {p.s7Body}{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </article>
    </main>
  );
}
