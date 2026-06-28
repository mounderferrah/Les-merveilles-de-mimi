'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { isInitialDocumentLoad } from '@/lib/useInitialLoad';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Numbers from '@/components/Numbers';
import RibbonGallery from '@/components/RibbonGallery';
import Signature from '@/components/Signature';
import Testimonials from '@/components/Testimonials';
import Instagram from '@/components/Instagram';
import Footer from '@/components/Footer';

export default function Home() {
  // Show the preloader only on a real document load / refresh — not when arriving
  // via in-app navigation (e.g. clicking Accueil from the collection page), which
  // should jump straight to the section.
  const [showIntro, setShowIntro] = useState(isInitialDocumentLoad);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  const handleEnter = () => {
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <Preloader onEnter={handleEnter} />}
      </AnimatePresence>

      <main>
        <Navbar />
        <Hero />
        <Story />
        <Numbers />
        <RibbonGallery />
        <Signature />
        <Instagram />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
