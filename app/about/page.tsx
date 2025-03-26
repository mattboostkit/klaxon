import { AboutHero } from '@/components/AboutHero';
import { TeamSection } from '@/components/TeamSection';
import { HistoryTimeline } from '@/components/HistoryTimeline';
import { ValueProposition } from '@/components/ValueProposition';
import { CTASection } from '@/components/CTASection';

export const metadata = {
  title: 'About Us | Klaxon Studio',
  description: 'Learn about Klaxon Studio, our team, values, and the story behind our creative agency.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ValueProposition />
      <TeamSection />
      <HistoryTimeline />
      <CTASection />
    </>
  );
}