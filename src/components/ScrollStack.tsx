'use client';

import React, { useRef, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type ExperienceItem = {
  period: string;
  title: string;
  subtitle: string;
  summary: string;
};

type ScrollStackProps = {
  items: ExperienceItem[];
};

type StackCardProps = {
  item: ExperienceItem;
  index: number;
  total: number;
  shouldReduceMotion: boolean;
};

function StackCard({ item, index, total, shouldReduceMotion }: StackCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 40%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div className="relative min-h-[210px] md:min-h-[260px]">
      <motion.article
        ref={ref}
        className="glass-panel relative md:sticky md:[top:var(--stack-top)] rounded-2xl p-4 sm:p-5 md:p-6 transition-colors"
        style={{
          '--stack-top': `calc(5.25rem + ${index * 0.7}rem)`,
          zIndex: total + index,
          opacity: shouldReduceMotion ? 1 : opacity,
          y: shouldReduceMotion ? 0 : y,
          scale: shouldReduceMotion ? 1 : scale,
        } as CSSProperties}
      >
        <span className="absolute -left-[27px] md:-left-[41px] top-6 md:top-7 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(23,23,23,1)]" />
        <p className="text-xs font-mono text-blue-400 mb-2">{item.period}</p>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-100">{item.title}</h3>
        <p className="text-sm text-neutral-300 mt-1">{item.subtitle}</p>
        <p className="text-sm text-neutral-400 mt-3 leading-relaxed">{item.summary}</p>
      </motion.article>
    </div>
  );
}

export function ScrollStack({ items }: ScrollStackProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative border-l border-neutral-800 pl-5 md:pl-8 space-y-4 md:space-y-0">
      {items.map((item, index) => (
        <StackCard key={`${item.period}-${item.title}`} item={item} index={index} total={items.length} shouldReduceMotion={!!shouldReduceMotion} />
      ))}
    </div>
  );
}
