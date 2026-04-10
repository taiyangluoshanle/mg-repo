"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface ScrollToTopProps extends HTMLAttributes<HTMLButtonElement> {
  threshold?: number;
  smooth?: boolean;
}

export const ScrollToTop = forwardRef<HTMLButtonElement, ScrollToTopProps>(
  ({ className, threshold = 300, smooth = true, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const lastY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
      const handleScroll = () => {
        if (ticking.current) return;
        ticking.current = true;
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setVisible(currentY < lastY.current && currentY > threshold);
          lastY.current = currentY;
          ticking.current = false;
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label="回到顶部"
        tabIndex={0}
        onClick={handleClick}
        className={cn(
          "fixed bottom-20 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 lg:bottom-24 lg:right-6 lg:h-[50px] lg:w-[50px]",
          visible ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0",
          className,
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 lg:h-6 lg:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    );
  },
);

ScrollToTop.displayName = "ScrollToTop";
