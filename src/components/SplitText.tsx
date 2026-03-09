'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function SplitText({ text, className, delay = 0, stagger = 0.04, once = true }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.7 });
  const shouldReduceMotion = useReducedMotion();

  const chars = useMemo(() => Array.from(text), [text]);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      ref={ref}
      aria-label={text}
      className={className}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: '0.8em', filter: 'blur(6px)' },
            show: {
              opacity: 1,
              y: '0em',
              filter: 'blur(0px)',
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
