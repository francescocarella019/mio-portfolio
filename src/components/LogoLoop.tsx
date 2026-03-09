'use client';

import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';

type LogoItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  width?: number;
  height?: number;
};

type LogoLoopProps = {
  logos: readonly LogoItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
};

export function LogoLoop({ logos, speed = 80, logoHeight = 28, gap = 32, pauseOnHover = true, className = '' }: LogoLoopProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [setWidth, setSetWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!rootRef.current || !setRef.current) {
        return;
      }

      const viewportWidth = rootRef.current.getBoundingClientRect().width;
      const singleSetWidth = setRef.current.getBoundingClientRect().width;
      setSetWidth(singleSetWidth);

      if (singleSetWidth <= 0) {
        setCopies(2);
        return;
      }

      const neededCopies = Math.max(2, Math.ceil((viewportWidth * 2) / singleSetWidth) + 1);
      setCopies(neededCopies);
    };

    update();
    const observer = new ResizeObserver(update);
    if (rootRef.current) {
      observer.observe(rootRef.current);
    }
    if (setRef.current) {
      observer.observe(setRef.current);
    }

    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [logos]);

  const durationSeconds = useMemo(() => {
    if (!setWidth) {
      return 20;
    }
    return Math.max(6, setWidth / Math.max(20, speed));
  }, [setWidth, speed]);

  if (shouldReduceMotion) {
    return (
      <div className={`flex flex-wrap items-center gap-6 ${className}`}>
        {logos.map((logo) => (
          <div key={`${logo.src}-${logo.alt ?? 'logo'}`} className="flex items-center opacity-85">
            <Image
              src={logo.src}
              alt={logo.alt ?? 'Logo'}
              width={logo.width ?? 140}
              height={logo.height ?? logoHeight}
              className="w-auto object-contain"
              style={{ height: `${logoHeight}px` }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`logo-loop relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocusCapture={() => pauseOnHover && setIsPaused(true)}
      onBlurCapture={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="logo-loop-track flex w-max items-center"
        style={{
          gap: `${gap}px`,
          animationDuration: `${durationSeconds}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
          ...(setWidth ? ({ '--set-width': `${setWidth}px`, '--set-gap': `${gap}px` } as CSSProperties) : {}),
        } as CSSProperties}
      >
        {Array.from({ length: copies }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex w-max items-center"
            style={{ gap: `${gap}px` }}
            aria-hidden={copyIndex > 0}
          >
            {logos.map((logo, logoIndex) => {
              const content = (
                <Image
                  src={logo.src}
                  alt={logo.alt ?? ''}
                  title={logo.title}
                  width={logo.width ?? 140}
                  height={logo.height ?? logoHeight}
                  className="w-auto object-contain opacity-75 transition duration-300 hover:opacity-100"
                  style={{ height: `${logoHeight}px` }}
                />
              );

              if (logo.href) {
                return (
                  <a key={`${copyIndex}-${logo.src}-${logoIndex}`} href={logo.href} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    {content}
                  </a>
                );
              }

              return (
                <span key={`${copyIndex}-${logo.src}-${logoIndex}`} className="inline-flex">
                  {content}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
