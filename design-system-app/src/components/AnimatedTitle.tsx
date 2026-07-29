'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedTitle({ children, className = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Target elements inside this container safely
      const lines = gsap.utils.toArray(".title-fill-line", containerRef.current);
      
      gsap.to(lines, {
        backgroundPosition: "0% 0%",
        duration: 1, // 1 second per segment
        stagger: 1,  // Wait exactly 1 second before starting the next segment
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 20%", 
          scrub: true // Changed from 1 to true. 1 causes a 1-second trailing momentum which feels like input lag on mobile
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <h2 ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </h2>
  );
}

// True inline wrapper: Zero forced line breaks, sequential background-clip text fill
export function AnimatedTitleLine({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span 
      className={`title-fill-line ${className}`}
      style={{
        // Hard 50/50 edge for maximum sharpness
        backgroundImage: "linear-gradient(to right, currentColor 50%, rgba(128, 128, 128, 0.4) 50%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
        willChange: "background-position" // Pre-warm the paint thread for this specific property
      } as React.CSSProperties}
    >
      {children}{' '}
    </span>
  );
}
