"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefCallback,
} from "react";
import { cva } from "class-variance-authority";
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

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-foreground-inverse border border-transparent shadow-sm hover:bg-brand-hover active:bg-brand-active",
        default:
          "bg-surface text-foreground border border-border shadow-sm hover:bg-surface-hover hover:border-brand active:bg-surface",
        dashed:
          "bg-surface text-foreground border border-dashed border-border shadow-sm hover:text-brand hover:border-brand active:bg-surface",
        text: "bg-transparent text-foreground border border-transparent hover:bg-background-secondary active:bg-background-tertiary",
        link: "bg-transparent text-brand border border-transparent hover:underline p-0 h-auto shadow-none",
      },
      size: {
        large: "h-10 px-[15px] py-[6.4px] text-base rounded-lg",
        middle: "h-8 px-[15px] py-1 text-sm rounded-md",
        small: "h-6 px-[7px] py-0 text-sm rounded-md",
      },
      ghost: {
        true: "",
        false: "",
      },
      danger: {
        true: "",
        false: "",
      },
      block: {
        true: "w-full",
        false: "",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // ghost overrides
      { ghost: true, variant: "primary", className: "bg-transparent text-brand border-brand hover:bg-brand/10 hover:text-brand active:bg-brand/20" },
      { ghost: true, variant: "default", className: "bg-transparent text-foreground border-foreground/30 hover:bg-foreground/10 active:bg-foreground/20" },
      { ghost: true, variant: "dashed", className: "bg-transparent text-foreground border-foreground/30 hover:text-brand hover:border-brand active:bg-brand/10" },
      { ghost: true, variant: "text", className: "bg-transparent text-foreground hover:bg-foreground/10" },
      { ghost: true, variant: "link", className: "bg-transparent text-brand" },

      // danger overrides
      { danger: true, variant: "primary", className: "bg-error hover:bg-error/90 active:bg-error/80 border-transparent" },
      { danger: true, variant: "default", className: "text-error border-error hover:text-error/80 hover:border-error/80" },
      { danger: true, variant: "dashed", className: "text-error border-error hover:text-error/80 hover:border-error/80" },
      { danger: true, variant: "text", className: "text-error hover:bg-error/10" },
      { danger: true, variant: "link", className: "text-error hover:text-error/80" },

      // danger + ghost
      { danger: true, ghost: true, variant: "primary", className: "bg-transparent text-error border-error hover:bg-error/10 active:bg-error/20" },

      // icon-only sizing (square)
      { iconOnly: true, size: "large", className: "w-10 px-0" },
      { iconOnly: true, size: "middle", className: "w-8 px-0" },
      { iconOnly: true, size: "small", className: "w-6 px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "middle",
      ghost: false,
      danger: false,
      block: false,
      iconOnly: false,
    },
  },
);

const disabledStyles: Record<string, string> = {
  primary: "disabled:bg-brand/40 disabled:text-foreground-inverse/60 disabled:border-transparent disabled:shadow-none disabled:pointer-events-none",
  default: "disabled:bg-surface disabled:text-foreground-muted disabled:border-border/50 disabled:shadow-none disabled:pointer-events-none",
  dashed: "disabled:bg-surface disabled:text-foreground-muted disabled:border-border/50 disabled:shadow-none disabled:pointer-events-none",
  text: "disabled:text-foreground-muted disabled:pointer-events-none",
  link: "disabled:text-foreground-muted disabled:pointer-events-none",
};

type ButtonType = "primary" | "default" | "dashed" | "text" | "link";
type ButtonSize = "large" | "middle" | "small";

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
  loading?: boolean;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  asChild?: boolean;
};

const iconSizeMap: Record<ButtonSize, string> = {
  large: "h-5 w-5",
  middle: "h-4 w-4",
  small: "h-3.5 w-3.5",
};

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "middle",
      icon,
      loading = false,
      ghost = false,
      danger = false,
      block = false,
      htmlType = "button",
      href,
      target,
      asChild = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isIconOnly = !children && (!!icon || loading);
    const isDisabled = disabled || loading;
    const iconSize = iconSizeMap[size];

    const mergedClassName = cn(
      buttonVariants({
        variant,
        size,
        ghost,
        danger,
        block,
        iconOnly: isIconOnly,
      }),
      disabledStyles[variant],
      className,
    );

    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner className={iconSize} />;
      }
      if (icon) {
        return <span className={cn("inline-flex shrink-0", iconSize, "[&>svg]:h-full [&>svg]:w-full")}>{icon}</span>;
      }
      return null;
    };

    const innerContent = (
      <>
        {renderIcon()}
        {children && <span>{children}</span>}
      </>
    );

    if (href && !isDisabled) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          className={mergedClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </a>
      );
    }

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
          type={nativeButton ? htmlType : undefined}
          className={mergedClassName}
          disabled={isDisabled}
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
      <BaseButton
        {...props}
        type={htmlType}
        className={mergedClassName}
        disabled={isDisabled}
        ref={ref}
        onClick={onClick}
      >
        {innerContent}
      </BaseButton>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps, type ButtonType, type ButtonSize };
