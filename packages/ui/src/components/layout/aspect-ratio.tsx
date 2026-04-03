import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const aspectRatioVariants = cva("relative w-full overflow-hidden");

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof aspectRatioVariants> & {
    /** Width ÷ height (e.g. `16 / 9`). */
    ratio?: number;
  };

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, style, ...props }, ref) => {
    return (
      <div
        className={cn(aspectRatioVariants(), className)}
        ref={ref}
        style={{ aspectRatio: ratio, ...style }}
        {...props}
      />
    );
  },
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio, aspectRatioVariants, type AspectRatioProps };
