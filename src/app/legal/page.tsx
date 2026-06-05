import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Legal Information - Coride',
  description: 'Company and legal information for Coride, operated by SIA "Milup".',
};

export default function LegalPage() {
  return (
    <div className="page">
      <Nav />
      <main className="legalDoc">
        <article className="legalInner">
          <h1>Legal Information</h1>

          <p className="legalLead">
            Coride is operated by SIA &ldquo;Milup&rdquo;, a company registered in Latvia.
          </p>

          <ul className="legalFacts">
            <li>
              <span className="k">Company</span>
              <span className="v">SIA &ldquo;Milup&rdquo;</span>
            </li>
            <li>
              <span className="k">Registration number</span>
              <span className="v">40203734972</span>
            </li>
            <li>
              <span className="k">Registered address</span>
              <span className="v">Raunas iela 45 k-1 - 20, Rīga, LV-1084</span>
            </li>
            <li>
              <span className="k">Contact</span>
              <span className="v">
                <a href="mailto:info@coride.org">info@coride.org</a>
              </span>
            </li>
          </ul>

          <p>
            For questions about this site, email{' '}
            <a href="mailto:info@coride.org">info@coride.org</a>.
          </p>
          <p>
            For privacy-related questions, see our <a href="/privacy">Privacy Policy</a>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
