import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PrivacyContent } from '@/components/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy - Coride',
  description: 'How Coride (SIA "Milup") collects, uses, and protects personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="page">
      <Nav />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
