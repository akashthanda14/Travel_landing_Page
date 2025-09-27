// app/components/SideNavbar.js
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SideNavbar
 * Props:
 * - items: Array<{ path: string, name: string }>
 *
 * Behavior:
 * - Toggle button fixed at top-left opens the sidebar
 * - Overlay closes the menu when clicked
 * - Sidebar slides in from left with spring transition
 * - Links stagger-fade in; clicking a link closes the menu
 */
export default function SideNavbar({ items = [] }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((s) => !s), []);
  const close = useCallback(() => setOpen(false), []);

  // framer-motion variants
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 320, damping: 30 },
    },
    exit: { x: '-100%', transition: { ease: 'easeInOut', duration: 0.25 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const listVariants = {
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
    hidden: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: 'easeOut' } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.18 } },
  };

  return (
    <>
      {/* Toggle button (fixed) */}
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed top-6 left-6 z-50 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-lg font-medium">☰</span>
      </button>

      <AnimatePresence>
        {open && (
          // Overlay
          <motion.div
            key="sidenav-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="sidenav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed top-0 left-0 z-50 h-screen w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 text-white"
            role="dialog"
            aria-modal="true"
          >
            <div className="h-full flex flex-col">
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="text-lg font-semibold">Menu</div>
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/6 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ×
                </button>
              </div>

              <nav className="px-4 py-2 flex-1 overflow-y-auto">
                <motion.ul initial="hidden" animate="visible" exit="hidden" variants={listVariants} className="space-y-1">
                  {items.map((it) => (
                    <motion.li key={it.path} variants={itemVariants} className="rounded-md">
                      <Link href={it.path} onClick={close} className="block px-3 py-3 rounded-md font-medium hover:bg-white/6 transition-colors">
                        {it.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="px-4 py-4 border-t border-white/6">
                <small className="text-sm text-white/70">© {new Date().getFullYear()} Bachpan Travel</small>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
