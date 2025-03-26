import { Hero } from '@/components/Hero';
import { ClientLogos } from '@/components/ClientLogos';
import { Services } from '@/components/Services';
import { FeaturedWorks } from '@/components/FeaturedWorks';
import { LatestPosts } from '@/components/LatestPosts';
import { CTASection } from '@/components/CTASection';
import { AboutSnippet } from '@/components/AboutSnippet';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Services />
      <AboutSnippet />
      <FeaturedWorks />
      <LatestPosts />
      <CTASection />
    </>
  );
}
