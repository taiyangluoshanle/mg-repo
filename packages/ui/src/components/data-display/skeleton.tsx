import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const skeletonVariants = cva("animate-pulse bg-background-secondary", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-md",
      circular: "rounded-full",
      rectangular: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  ),
);

Skeleton.displayName = "Skeleton";
