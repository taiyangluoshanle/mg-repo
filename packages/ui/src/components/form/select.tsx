"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const selectVariants = cva(
  "w-full min-w-0 appearance-none rounded-md border bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
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

const selectItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-surface-hover",
);

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "error";
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      placeholder,
      children,
      value,
      defaultValue,
      onValueChange,
    },
    ref,
  ) => {
    const valueProps =
      value !== undefined
        ? { value: value === "" ? null : value }
        : defaultValue !== undefined
          ? { defaultValue: defaultValue === "" ? null : defaultValue }
          : {};

    return (
      <BaseSelect.Root
        {...valueProps}
        onValueChange={(next) => onValueChange?.(next == null ? "" : String(next))}
        modal={false}
      >
        <div className="relative w-full">
          <BaseSelect.Trigger
            ref={ref}
            className={cn(
              selectVariants({ variant, size }),
              "flex items-center justify-between gap-2 text-left",
              className,
            )}
          >
            <BaseSelect.Value
              placeholder={
                placeholder != null ? (
                  <span className="text-foreground-muted">{placeholder}</span>
                ) : undefined
              }
            />
            <BaseSelect.Icon className="flex shrink-0 text-foreground-muted">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BaseSelect.Icon>
          </BaseSelect.Trigger>
        </div>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className="z-50 outline-none"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <BaseSelect.Popup className="max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-md border border-border bg-background p-1 text-foreground shadow-md transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
              <BaseSelect.List>{children}</BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    );
  },
);

Select.displayName = "Select";

export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => (
    <BaseSelect.Item
      ref={ref as React.Ref<HTMLElement>}
      value={value}
      disabled={disabled}
      className={cn(selectItemVariants(), className)}
      {...props}
    >
      <BaseSelect.ItemText className="flex-1 pr-6">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-foreground">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M3 8L6.5 11.5L13 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  ),
);

SelectItem.displayName = "SelectItem";

export { Select, selectVariants };
