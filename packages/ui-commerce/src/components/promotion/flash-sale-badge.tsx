import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface FlashSaleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
}

export const FlashSaleBadge = forwardRef<HTMLSpanElement, FlashSaleBadgeProps>(
  ({ className, text = "限时特价", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm",
          className,
        )}
        {...props}
      >
        <span aria-hidden>⚡</span>
        {text}
      </span>
    );
  },
);

FlashSaleBadge.displayName = "FlashSaleBadge";
