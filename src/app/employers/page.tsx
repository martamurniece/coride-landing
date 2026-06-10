import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { EmployersContent } from '@/components/EmployersContent';
import { EmployersNav } from '@/components/EmployersNav';
import '@/styles/employers.css';

export const metadata: Metadata = {
  title: 'Coride: For employers',
  description:
    'Help your team get to work without building another parking lot. Coride connects employees into verified, shared commutes.',
};

export default function EmployersPage() {
  return (
    <div className="page employersPage">
      <EmployersNav />
      <EmployersContent />
      <Footer />
    </div>
  );
}
