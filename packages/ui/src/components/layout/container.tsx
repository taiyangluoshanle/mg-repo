import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    maxWidth: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    maxWidth: "xl",
  },
});

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, ...props }, ref) => {
    return (
      <div className={cn(containerVariants({ maxWidth }), className)} ref={ref} {...props} />
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants, type ContainerProps };
