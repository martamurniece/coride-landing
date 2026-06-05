import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { HowItWorks } from '@/components/HowItWorks';
import { SignupForm } from '@/components/SignupForm';
import { Footer } from '@/components/Footer';
import { RouteOverlay } from '@/components/RouteOverlay';

export default function Home() {
  return (
    <div className="page">
      <Nav />
      <RouteOverlay />
      <Hero />
      <Problem />
      <HowItWorks />
      <SignupForm />
      <Footer />
    </div>
  );
}
