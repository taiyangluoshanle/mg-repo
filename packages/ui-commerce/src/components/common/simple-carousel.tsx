"use client";

import { forwardRef, useCallback, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";

export interface SimpleCarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  slides: string[];
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  counterPosition?: "left" | "right";
  aspectRatio?: string;
  children?: ReactNode;
}

const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/40 disabled:pointer-events-none disabled:opacity-30 lg:h-12 lg:w-12",
      direction === "prev" ? "left-2 lg:left-4" : "right-2 lg:right-4",
    )}
    aria-label={direction === "prev" ? "上一张" : "下一张"}
    tabIndex={0}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 lg:h-5 lg:w-5">
      {direction === "prev" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      )}
    </svg>
  </button>
);

export const SimpleCarousel = forwardRef<HTMLDivElement, SimpleCarouselProps>(
  (
    {
      className,
      slides,
      showArrows = true,
      showDots = true,
      showCounter = false,
      counterPosition = "right",
      aspectRatio = "1/1",
      children,
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(0);

    const scrollPrev = useCallback(() => {
      setCurrent((prev) => Math.max(0, prev - 1));
    }, []);

    const scrollNext = useCallback(() => {
      setCurrent((prev) => Math.min(slides.length - 1, prev + 1));
    }, [slides.length]);

    useEffect(() => {
      setCurrent(0);
    }, [slides]);

    if (slides.length === 0) return null;

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div className="relative overflow-hidden">
          {showCounter && (
            <div
              className={cn(
                "absolute top-4 z-10 rounded-md bg-black/20 px-1 py-0.5 text-xs text-white",
                counterPosition === "left" ? "left-4" : "right-4",
              )}
            >
              {current + 1}/{slides.length}
            </div>
          )}

          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0" style={{ aspectRatio }}>
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {showArrows && slides.length > 1 && (
            <>
              <ArrowButton direction="prev" onClick={scrollPrev} disabled={current === 0} />
              <ArrowButton direction="next" onClick={scrollNext} disabled={current === slides.length - 1} />
            </>
          )}
        </div>

        {showDots && slides.length > 1 && (
          <div className="flex justify-center gap-1.5 pt-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all",
                  current === index ? "w-6 bg-foreground" : "w-2 bg-foreground/20",
                )}
                onClick={() => setCurrent(index)}
                aria-label={`第 ${index + 1} 张`}
                tabIndex={0}
              />
            ))}
          </div>
        )}

        {children && <div className="mt-2">{children}</div>}
      </div>
    );
  },
);

SimpleCarousel.displayName = "SimpleCarousel";
