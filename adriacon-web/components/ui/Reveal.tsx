'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const from = { opacity: 0, y: 14 };
const to = { opacity: 1, y: 0 };
const viewport = { once: true, margin: '-60px' } as const;

/** Ruhiges Einblenden beim Scrollen. Bei prefers-reduced-motion ohne Animation. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const reduced = useReducedMotion();
  const transition = { duration: 0.55, delay, ease: [0.25, 0.6, 0.35, 1] as const };

  if (reduced) {
    return as === 'li' ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }

  if (as === 'li') {
    return (
      <motion.li className={className} initial={from} whileInView={to} viewport={viewport} transition={transition}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div className={className} initial={from} whileInView={to} viewport={viewport} transition={transition}>
      {children}
    </motion.div>
  );
}
