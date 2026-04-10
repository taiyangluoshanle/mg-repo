"use client";

import { Button as BaseButton } from "@base-ui/react/button";
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
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0071e3] text-white hover:bg-[#0077ed] active:bg-[#ededf2] active:text-[#0071e3] rounded-[8px] shadow-sm",
        dark:
          "bg-[#1d1d1f] text-white hover:bg-[#2d2d2f] active:bg-[#3d3d3f] rounded-[8px] shadow-sm",
        pill: "bg-transparent text-[#0066cc] border border-[#0066cc] hover:underline dark:text-[#2997ff] dark:border-[#2997ff] rounded-full",
        filter:
          "bg-[#fafafc] text-black/80 border-[3px] border-black/[0.04] rounded-[11px] hover:bg-[#f5f5f7] dark:bg-neutral-800 dark:text-white/80 dark:border-white/[0.04] dark:hover:bg-neutral-700",
        media:
          "bg-[#d2d2d7]/64 text-black/48 hover:scale-90 rounded-full flex items-center justify-center dark:bg-neutral-700/64 dark:text-white/48",
      },
      size: {
        default: "px-[15px] py-[8px] text-[17px] font-normal leading-normal",
        pill: "px-4 py-1 text-[15px] font-medium leading-normal",
        filter: "px-[14px] h-[32px] text-[15px] font-medium leading-normal",
        media: "w-[44px] h-[44px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
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
    const mergedClassName = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement(child)) {
        throw new Error("Button with asChild expects a single React element child.");
      }
      const childProps = child.props as { className?: string; ref?: Ref<HTMLElement> };
      const nativeButton =
        typeof child.type === "string" && child.type === "button";

      return (
        <BaseButton
          {...props}
          nativeButton={nativeButton}
          type={nativeButton ? type : undefined}
          className={mergedClassName}
          ref={ref}
          render={(renderProps) =>
            cloneElement(child as ReactElement<Record<string, unknown>>, {
              ...(child.props as Record<string, unknown>),
              ...renderProps,
              className: cn(renderProps.className, childProps.className),
              ref: mergeRefs(
                renderProps.ref as Ref<HTMLElement> | undefined,
                childProps.ref,
              ),
            } as never)
          }
        />
      );
    }

    return (
      <BaseButton {...props} type={type} className={mergedClassName} ref={ref}>
        {children}
      </BaseButton>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
