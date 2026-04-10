"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  translateY?: string;
  threshold?: number;
  once?: boolean;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ className, duration = 1000, translateY = "10px", threshold = 0.1, once = true, children, style, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        },
        { threshold },
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold, once]);

    const mergedRef = (node: HTMLDivElement | null) => {
      (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={mergedRef}
        className={cn("transition-all ease-in-out", className)}
        style={{
          transitionDuration: `${duration}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : `translateY(${translateY})`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FadeIn.displayName = "FadeIn";
