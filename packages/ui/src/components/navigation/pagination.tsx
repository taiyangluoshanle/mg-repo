"use client";

import * as React from "react";
import { cn } from "@mg/utils";

function pageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "ellipsis")[] = [];
  const add = (n: number | "ellipsis") => {
    if (items[items.length - 1] === n) return;
    items.push(n);
  };
  add(1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) add("ellipsis");
  for (let p = left; p <= right; p++) add(p);
  if (right < total - 1) add("ellipsis");
  if (total > 1) add(total);
  return items;
}

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
} & React.ComponentPropsWithoutRef<"nav">;

export const Pagination = React.forwardRef<
  React.ElementRef<"nav">,
  PaginationProps
>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      ...props
    },
    ref,
  ) => {
    const items = React.useMemo(
      () => pageItems(currentPage, totalPages),
      [currentPage, totalPages],
    );

    if (totalPages < 1) return null;

    const btn =
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border bg-background px-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40";

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex flex-wrap items-center gap-1", className)}
        {...props}
      >
        <button
          type="button"
          className={cn(btn, "px-3")}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        {items.map((item, i) =>
          item === "ellipsis" ? (
            <span
              key={`e-${i}`}
              className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-foreground-muted"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={cn(
                btn,
                item === currentPage &&
                  "border-brand bg-brand-subtle text-brand",
              )}
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          className={cn(btn, "px-3")}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
