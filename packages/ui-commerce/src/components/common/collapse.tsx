"use client";

import { forwardRef, useRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, open, duration = 300, children, style, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
    const isInitial = useRef(true);

    useEffect(() => {
      if (isInitial.current) {
        isInitial.current = false;
        return;
      }

      const el = contentRef.current;
      if (!el) return;

      if (open) {
        const scrollH = el.scrollHeight;
        setHeight(scrollH);
        const timer = setTimeout(() => setHeight(undefined), duration);
        return () => clearTimeout(timer);
      } else {
        const scrollH = el.scrollHeight;
        setHeight(scrollH);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight(0);
          });
        });
      }
    }, [open, duration]);

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("overflow-hidden transition-[height] ease-in-out", className)}
        style={{
          transitionDuration: `${duration}ms`,
          height: height === undefined ? "auto" : `${height}px`,
          ...style,
        }}
        aria-hidden={!open}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Collapse.displayName = "Collapse";
