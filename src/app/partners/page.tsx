import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { PartnersContent } from '@/components/PartnersContent';
import { PartnersNav } from '@/components/PartnersNav';
import '@/styles/employers.css';

export const metadata: Metadata = {
  title: 'Coride: For partners',
  description:
    'Reach loyal local customers on their way to work. Coride riders earn rewards from nearby businesses as part of their daily commute.',
};

export default function PartnersPage() {
  return (
    /* .employersPage carries the shared section/grid/metro/band layout system this page reuses. */
    <div className="page employersPage partnersPage">
      <PartnersNav />
      <PartnersContent />
      <Footer />
    </div>
  );
}
