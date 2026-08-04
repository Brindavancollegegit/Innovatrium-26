/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import VideoSection from './components/Video/VideoSection';
import About from './components/About/About';
import Workshop from './components/Workshop/Workshop';
import Tracks from './components/Tracks/Tracks';
import Venue from './components/Venue/Venue';
import College from './components/College/College';
import Registration from './components/Registration/Registration';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader/Preloader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      <div className="bg-noise"></div>
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero isLoading={isLoading} />
        <VideoSection />
        <About />
        <Workshop />
        <Tracks />
        <Venue />
        <College />
        <Registration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
