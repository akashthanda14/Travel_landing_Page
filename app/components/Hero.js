// app/components/Hero.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

/**
 * Reusable Hero section targeted at busy professionals sponsoring trips for parents.
 * - Full-width, min-h-screen
 * - Background Image (optimized), dark gradient overlay
 * - Trust badge, headline, subheadline, split CTA (search + button)
 */
export default function Hero({
  headline = 'Give Your Parents the Adventures They Deserve',
  subheadline = 'Complete travel planning and personal care for your parents. create precious memories while you focus on work because the best time to show love is now.',
  background = 'https://res.cloudinary.com/dmt4dj8ft/image/upload/v1758968239/photo-1519451241324-20b4ea2c4220_ahzq3p.jpg',
}) {
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger entrance animations
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  

  const onSearch = (e) => {
    e.preventDefault();
    // stub: implement search handler or navigation
    if (search.trim()) {
      // For now just log
      console.log('search:', search);
    }
  };

  return (
    <section
      aria-label="Hero - Sponsor safe trips for parents"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: desktop video (md+) + mobile image */}
      <div className="absolute inset-0 -z-10 group">
        {/* Desktop video (hidden on small screens) */}
        {/* Desktop video (hidden on small screens) */}
        <video
          className="hidden md:block w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dmt4dj8ft/image/upload/w_1000,q_auto:low/v1758997756/IMG_4903_i7mvlm.png"
          aria-hidden="true"
        >
          <source src="https://res.cloudinary.com/dmt4dj8ft/video/upload/v1758997745/151217-800210493_xl5ijt.mp4" type="video/mp4" />
        </video>

        {/* Mobile image (visible on small screens only) */}
        <div className="md:hidden w-full h-full">
          <Image
            src="https://res.cloudinary.com/dmt4dj8ft/image/upload/v1758997756/IMG_4903_i7mvlm.png"
            alt="Serene family travel scene"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* dark overlay (stronger on desktop for contrast) */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/60" aria-hidden="true" />
      </div>

  {/* (data saver toggle removed) */}

      {/* Content wrapper */}
      <div className="relative z-10 w-full px-6 sm:px-8">
        <div className="mx-auto text-center" style={{ maxWidth: '64rem' }}>
          {/* Trust badge */}
          <div
            className={`inline-flex items-center gap-3 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } transition-all duration-500`}
            style={{ transitionDelay: mounted ? '120ms' : '0ms' }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800">
              <HeartIcon className="w-5 h-5 text-pink-600" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-white">Trusted by 10,000+ Families</span>
          </div>

          {/* Headline with animated words */}
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg relative z-10 mx-auto max-w-4xl text-center">
            {headline.split(' ').map((word, idx) => (
              <motion.span
                key={word + idx}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.12, ease: 'easeInOut' }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline with fade-in */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 1.0 }}
            className="mt-4 mx-auto text-base sm:text-lg text-blue-100 max-w-xl relative z-10 py-2 text-center font-normal"
          >
            {subheadline}
          </motion.p>

          {/* Split CTA row: improved responsive search + CTA */}
          <div className="mt-6 flex flex-col items-center gap-4 justify-center">
            <form
              role="search"
              aria-label="Search destinations or packages"
              onSubmit={onSearch}
              className={`w-full max-w-2xl ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Input container: fills available space on desktop, full width on mobile */}
                <div className="relative flex-1 w-full">
                  <label htmlFor="hero-search" className="sr-only">Search destinations or packages</label>

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                    </svg>
                  </div>

                  <input
                    id="hero-search"
                    name="q"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search destinations or packages"
                    className="w-full pl-10 pr-10 py-3 rounded-full bg-white/95 text-gray-800 placeholder-gray-500 ring-1 ring-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                    aria-label="Search destinations or packages"
                    autoComplete="off"
                  />

                  {/* Clear button inside input (small) */}
                  {search ? (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ) : null}
                </div>

                {/* Submit button: full-width on mobile, auto width on desktop */}
                <div className="w-full sm:w-auto flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-full text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg"
                    aria-label="Search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                    </svg>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Explore Packages CTA stays below the search on small screens and beside on larger layouts visually; keep it prominent */}
            <Link
              href="#packages"
              scroll={true}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-700 hover:from-pink-600 hover:to-pink-500 transform transition-all duration-200 shadow-lg ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } w-full sm:w-auto justify-center`}
              aria-label="Explore Packages"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white" aria-hidden="true" />
              <span>Explore Packages</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}