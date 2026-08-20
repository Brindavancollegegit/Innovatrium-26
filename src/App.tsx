/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader/Preloader';

// Lazy-loaded below-the-fold components
const VideoSection = lazy(() => import('./components/Video/VideoSection'));
const About = lazy(() => import('./components/About/About'));

const Tracks = lazy(() => import('./components/Tracks/Tracks'));
const Timeline = lazy(() => import('./components/Timeline/Timeline'));
const Venue = lazy(() => import('./components/Venue/Venue'));
const College = lazy(() => import('./components/College/College'));
const Registration = lazy(() => import('./components/Registration/Registration'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

// Lightweight, zero-CLS skeleton fallback for lazy chunks
function SectionSkeleton({ className = "py-24" }: { className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-8 ${className}`}>
      <div className="w-full min-h-[300px] rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse flex items-center justify-center">
        <div className="w-16 h-1.5 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

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
      
      <div className="animated-aurora-bg"></div>
      <div className="bg-noise"></div>
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero isLoading={isLoading} />
        
        <Suspense fallback={<SectionSkeleton className="py-20" />}>
          <VideoSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>



        <Suspense fallback={<SectionSkeleton />}>
          <Tracks />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Venue />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <College />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="py-24" />}>
          <Registration />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="py-16" />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-32 bg-base border-t border-surface-border" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
