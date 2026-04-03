import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const selectVariants = cva(
  "w-full min-w-0 appearance-none rounded-md border bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-background [&>option]:text-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        sm: "h-8 px-2.5 py-1 pr-8 text-sm",
        md: "h-10 px-3 py-2 pr-9 text-sm",
        lg: "h-12 px-4 py-3 pr-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type SelectProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "size"
> &
  VariantProps<typeof selectVariants> & {
    /** Renders a disabled first option with this label (empty value). */
    placeholder?: string;
  };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      placeholder,
      children,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const resolvedDefault =
      value !== undefined
        ? undefined
        : (defaultValue ?? (placeholder ? "" : undefined));

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          value={value}
          defaultValue={resolvedDefault}
          className={cn(selectVariants({ variant, size, className }))}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-foreground-muted"
          aria-hidden
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select, selectVariants };
