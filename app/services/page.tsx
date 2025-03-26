import { ServicesHero } from '@/components/ServicesHero';
import { ServicesList } from '@/components/ServicesList';
import { ProcessSection } from '@/components/ProcessSection';
import { Testimonials } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';

export const metadata = {
  title: 'Services | Klaxon Studio',
  description: 'Explore our comprehensive range of digital services including branding, web design, development, and digital marketing.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </>
  );
}