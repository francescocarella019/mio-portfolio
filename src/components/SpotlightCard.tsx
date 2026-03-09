'use client';

import React, { type HTMLAttributes, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
  spotlightSize?: number;
};

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = '59 130 246',
  spotlightSize = 260,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) {
      onPointerMove?.(event);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ref.current.style.setProperty('--spotlight-x', `${x}px`);
    ref.current.style.setProperty('--spotlight-y', `${y}px`);

    onPointerMove?.(event);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden [--spotlight-x:50%] [--spotlight-y:50%] ${className}`}
      {...props}
    >
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x) var(--spotlight-y), rgb(${spotlightColor} / 0.22), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
