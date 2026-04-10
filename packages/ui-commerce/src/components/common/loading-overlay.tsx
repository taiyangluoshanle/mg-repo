"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  spinnerClassName?: string;
}

const SpinnerSvg = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={cn("animate-spin text-white", className)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.005 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.005 19V22" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22.005 12L19.005 12" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5.005 12L2.005 12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.0779 4.92572L17.1494 6.85419" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.86414 17.1394L4.93566 19.0678" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.0844 19.0678L17.1559 17.1394" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.87061 6.85419L4.94213 4.92571" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, open, spinnerClassName, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/25",
          className,
        )}
        role="status"
        aria-label="加载中"
        {...props}
      >
        <SpinnerSvg className={spinnerClassName} />
      </div>
    );
  },
);

LoadingOverlay.displayName = "LoadingOverlay";
