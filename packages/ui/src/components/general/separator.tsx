"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px self-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof separatorVariants>;

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <BaseSeparator
        orientation={orientation ?? "horizontal"}
        className={cn(separatorVariants({ orientation }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator, separatorVariants, type SeparatorProps };
