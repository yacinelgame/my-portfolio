'use client';

import { LanguageProvider } from '@/app/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import Portfolio from '@/app/components/Portfolio';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
