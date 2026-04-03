import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const iconVariants = cva(
  "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type IconProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof iconVariants>;

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <span className={cn(iconVariants({ size }), className)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);
Icon.displayName = "Icon";

export { Icon, iconVariants, type IconProps };
