"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface ProductGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: string[];
  alt: string;
}

export const ProductGallery = forwardRef<HTMLDivElement, ProductGalleryProps>(
  ({ className, images, alt, ...props }, ref) => {
    const safe = images.length > 0 ? images : [""];
    const [activeIndex, setActiveIndex] = useState(0);
    const main = safe[Math.min(activeIndex, safe.length - 1)];

    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background-secondary">
          {main ? (
            <img src={main} alt={alt} className="h-full w-full object-contain" />
          ) : null}
        </div>
        {safe.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safe.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                aria-label={`${alt} 缩略图 ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                  i === activeIndex ? "border-brand ring-2 ring-brand/20" : "border-transparent hover:border-border",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

ProductGallery.displayName = "ProductGallery";
