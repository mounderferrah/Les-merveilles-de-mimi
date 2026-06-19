'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!entered && <Preloader onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <main>
          <Navbar />
          <Hero />
          <Story />
          <Numbers />
          <RibbonGallery />
          <Signature />
          <Testimonials />
          <Instagram />
          <Footer />
        </main>
      )}
    </>
  );
}
