import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Klaxon Studio | Creative Digital Agency',
  description: 'Klaxon Studio is a creative digital agency specializing in branding, web design, and digital marketing solutions.',
  keywords: 'klaxon studio, digital agency, web design, branding, marketing',
  openGraph: {
    title: 'Klaxon Studio | Creative Digital Agency',
    description: 'Klaxon Studio is a creative digital agency specializing in branding, web design, and digital marketing solutions.',
    url: 'https://klaxon.studio',
    siteName: 'Klaxon Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klaxon Studio | Creative Digital Agency',
    description: 'Klaxon Studio is a creative digital agency specializing in branding, web design, and digital marketing solutions.'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}