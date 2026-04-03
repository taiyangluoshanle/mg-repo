import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const sizeMap = { sm: 16, md: 24, lg: 32 } as const;

const spinnerVariants = cva("inline-block shrink-0 animate-spin text-brand", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height">,
    VariantProps<typeof spinnerVariants> {}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    const px = sizeMap[size ?? "md"];
    const stroke = Math.max(2, Math.round(px / 8));
    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size }), className)}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={stroke}
        />
        <circle
          className="opacity-90"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
          transform="rotate(-90 12 12)"
        />
      </svg>
    );
  },
);
Spinner.displayName = "Spinner";
