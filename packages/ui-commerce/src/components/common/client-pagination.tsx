"use client";

import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface ClientPaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  current: number;
  total: number;
  pageSize?: number;
  siblingCount?: number;
  onChange: (page: number) => void;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const DOTS = "...";

const usePaginationRange = (totalPages: number, current: number, siblingCount: number) => {
  return useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalNumbers >= totalPages) return range(1, totalPages);

    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(current + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + 2 * siblingCount;
      return [...range(1, leftCount), DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + 2 * siblingCount;
      return [1, DOTS, ...range(totalPages - rightCount + 1, totalPages)];
    }

    return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, totalPages];
  }, [totalPages, current, siblingCount]);
};

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const ClientPagination = forwardRef<HTMLElement, ClientPaginationProps>(
  ({ className, current, total, pageSize = 10, siblingCount = 1, onChange, ...props }, ref) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pages = usePaginationRange(totalPages, current, siblingCount);

    if (totalPages <= 1) return null;

    const btnBase =
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

    return (
      <nav ref={ref} className={cn("flex items-center gap-1", className)} aria-label="分页" {...props}>
        <button
          type="button"
          className={cn(btnBase, "hover:bg-background-secondary", current <= 1 && "pointer-events-none opacity-50")}
          onClick={() => onChange(current - 1)}
          disabled={current <= 1}
          aria-label="上一页"
          tabIndex={0}
        >
          <ArrowLeft />
        </button>

        {pages.map((page, i) =>
          page === DOTS ? (
            <span key={`dots-${i}`} className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-foreground-muted">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn(
                btnBase,
                page === current
                  ? "border-brand bg-brand text-white"
                  : "hover:bg-background-secondary text-foreground",
              )}
              onClick={() => onChange(page as number)}
              aria-current={page === current ? "page" : undefined}
              tabIndex={0}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          className={cn(btnBase, "hover:bg-background-secondary", current >= totalPages && "pointer-events-none opacity-50")}
          onClick={() => onChange(current + 1)}
          disabled={current >= totalPages}
          aria-label="下一页"
          tabIndex={0}
        >
          <ArrowRight />
        </button>
      </nav>
    );
  },
);

ClientPagination.displayName = "ClientPagination";
