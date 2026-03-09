'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  shouldReduceMotion: boolean;
};

function StackCard({ item, index, shouldReduceMotion }: StackCardProps) {
  return (
    <div className="relative min-h-[210px] md:min-h-[240px]">
      <motion.article
        className="glass-panel relative rounded-2xl p-4 sm:p-5 md:p-6 transition-colors"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.05 }}
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
    <div className="relative border-l border-neutral-800 pl-5 md:pl-8 space-y-4">
      {items.map((item, index) => (
        <StackCard key={`${item.period}-${item.title}`} item={item} index={index} shouldReduceMotion={!!shouldReduceMotion} />
      ))}
    </div>
  );
}
