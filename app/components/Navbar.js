// app/components/Navbar.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SiInstagram, SiFacebook, SiTwitter } from 'react-icons/si';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Packages', href: '#packages' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    // run once to set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'backdrop-blur-md bg-white/70 border-b border-white/30 shadow-md dark:bg-zinc-900/60 dark:border-zinc-300/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo (left) */}
          <Link href="/" aria-label="Homepage" className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dmt4dj8ft/image/upload/v1758995641/logo_1_u4csls.png"
              alt="Bachpan Travel Agency Logo"
              width={240}
              height={96}
              priority
              className="h-14 md:h-16 w-auto object-contain transform transition-transform duration-200 hover:scale-110"
            />
          </Link>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex md:space-x-10 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 px-2 py-1 rounded ${
                    isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  } hover:text-sky-300`}
                >
                  {item.name}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right area: social icons (md+) + mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Social icons - match nav link color */}
            <div className={`hidden md:flex items-center gap-3 ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in new tab)"
                className="p-2 rounded-full hover:bg-white/10 transition-colors hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center"
              >
                <SiInstagram className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (opens in new tab)"
                className="p-2 rounded-full hover:bg-white/10 transition-colors hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center"
              >
                <SiFacebook className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter (opens in new tab)"
                className="p-2 rounded-full hover:bg-white/10 transition-colors hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center"
              >
                <SiTwitter className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-md ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'} hover:text-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel - side drawer */}
        <div className="md:hidden">
          {/* overlay */}
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={closeMenu}
            aria-hidden={!menuOpen}
          />

          {/* drawer */}
          <aside
            className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85%] bg-white/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            aria-hidden={!menuOpen}
            role="dialog"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-800">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  scroll={item.href.startsWith('#')}
                  onClick={closeMenu}
                  className="block px-3 py-2 text-gray-800 font-semibold rounded hover:bg-gray-100 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </nav>
  );
}
