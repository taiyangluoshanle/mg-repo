import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export type CouponTagType = "discount" | "reduction" | "freeShipping";

export interface CouponTagProps extends HTMLAttributes<HTMLSpanElement> {
  type: CouponTagType;
  value: string;
}

const typeClass: Record<CouponTagType, string> = {
  discount: "border-brand/50 bg-brand/5 text-brand",
  reduction: "border-amber-500/50 bg-amber-500/5 text-amber-800 dark:text-amber-200",
  freeShipping: "border-emerald-500/50 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200",
};

export const CouponTag = forwardRef<HTMLSpanElement, CouponTagProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex max-w-full items-center rounded-md border border-dashed px-2 py-0.5 text-xs font-medium",
          typeClass[type],
          className,
        )}
        {...props}
      >
        {value}
      </span>
    );
  },
);

CouponTag.displayName = "CouponTag";
