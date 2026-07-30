'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const initial = { opacity: 0, y: 16 };
const inView = { opacity: 1, y: 0 };
const viewport = { once: true, margin: '-60px' } as const;

/**
 * Zurückhaltendes Einblenden beim Scrollen.
 * Bei prefers-reduced-motion wird ohne Animation gerendert.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const reduced = useReducedMotion();
  const transition = { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] as const };

  if (reduced) {
    if (as === 'li') return <li className={className}>{children}</li>;
    if (as === 'section') return <section className={className}>{children}</section>;
    return <div className={className}>{children}</div>;
  }

  if (as === 'li') {
    return (
      <motion.li
        className={className}
        initial={initial}
        whileInView={inView}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  if (as === 'section') {
    return (
      <motion.section
        className={className}
        initial={initial}
        whileInView={inView}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={inView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
