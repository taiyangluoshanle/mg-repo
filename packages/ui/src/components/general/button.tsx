import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type MutableRefObject,
  type ReactElement,
  type Ref,
  type RefCallback,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (ref == null) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as MutableRefObject<T | null>).current = node;
      }
    }
  };
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-foreground-inverse shadow hover:bg-brand-hover active:bg-brand-active",
        secondary:
          "bg-surface text-foreground border border-border shadow-sm hover:bg-surface-hover",
        ghost: "text-foreground hover:bg-background-secondary",
        destructive:
          "bg-error text-foreground-inverse shadow hover:opacity-90 active:opacity-80",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-background-secondary",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement(child)) {
        throw new Error("Button with asChild expects a single React element child.");
      }
      const childProps = child.props as { className?: string; ref?: Ref<HTMLElement> };
      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        ...(child.props as Record<string, unknown>),
        ...props,
        className: cn(buttonVariants({ variant, size }), className, childProps.className),
        ref: mergeRefs(ref, childProps.ref),
      } as never);
    }

    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
