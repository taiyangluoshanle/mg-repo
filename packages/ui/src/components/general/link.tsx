import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const linkVariants = cva(
  "underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
  {
    variants: {
      variant: {
        default: "text-brand hover:text-brand-hover",
        muted: "text-foreground-muted hover:text-foreground-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    external?: boolean;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, rel, target, ...props }, ref) => {
    const externalProps =
      external === true
        ? {
            target: "_blank" as const,
            rel: rel ?? "noopener noreferrer",
          }
        : { target, rel };

    return (
      <a
        className={cn(linkVariants({ variant }), className)}
        ref={ref}
        {...externalProps}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link, linkVariants, type LinkProps };
