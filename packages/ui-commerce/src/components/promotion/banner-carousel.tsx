"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "@mg/utils";
import { Link } from "@mg/ui";

export interface BannerCarouselItem {
  image: string;
  alt: string;
  href?: string;
}

export interface BannerCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: BannerCarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export const BannerCarousel = forwardRef<HTMLDivElement, BannerCarouselProps>(
  ({ className, items, autoPlay = true, interval = 5000, ...props }, ref) => {
    const [index, setIndex] = useState(0);
    const count = items.length;
    const safeIndex = count > 0 ? index % count : 0;

    const go = useCallback(
      (dir: number) => {
        if (count === 0) return;
        setIndex((i) => (i + dir + count) % count);
      },
      [count],
    );

    useEffect(() => {
      if (!autoPlay || count <= 1) return;
      const id = window.setInterval(() => go(1), interval);
      return () => window.clearInterval(id);
    }, [autoPlay, count, go, interval]);

    if (count === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-border bg-background-secondary",
            className,
          )}
          {...props}
        />
      );
    }

    const current = items[safeIndex]!;

    return (
      <div
        ref={ref}
        className={cn("group relative w-full overflow-hidden rounded-lg border border-border", className)}
        {...props}
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-background-secondary">
          <div
            className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${count * 100}%`,
              transform: `translateX(-${(safeIndex / count) * 100}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.image + item.alt}
                className="h-full shrink-0"
                style={{ width: `${100 / count}%` }}
              >
                <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {current.href ? (
            <Link
              href={current.href}
              className="absolute inset-0 z-[1] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              variant="default"
            >
              <span className="sr-only">{current.alt}</span>
            </Link>
          ) : null}
        </div>
        {count > 1 ? (
          <>
            <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-[2] flex justify-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`第 ${i + 1} 张`}
                  aria-current={i === safeIndex ? "true" : undefined}
                  className={cn(
                    "pointer-events-auto h-1.5 w-1.5 rounded-full transition-colors",
                    i === safeIndex ? "bg-background" : "bg-background/50 hover:bg-background/80",
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="上一张"
              className="absolute left-2 top-1/2 z-[2] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background-inverse/30 text-lg text-foreground-inverse backdrop-blur-sm hover:bg-background-inverse/50 md:flex"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="下一张"
              className="absolute right-2 top-1/2 z-[2] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background-inverse/30 text-lg text-foreground-inverse backdrop-blur-sm hover:bg-background-inverse/50 md:flex"
              onClick={() => go(1)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
    );
  },
);

BannerCarousel.displayName = "BannerCarousel";
