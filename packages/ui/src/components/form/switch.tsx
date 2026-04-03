"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const switchTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand data-[state=unchecked]:bg-muted",
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
        lg: "h-7 w-14 p-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-md ring-0 transition-transform duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onChange"
> &
  VariantProps<typeof switchTrackVariants> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  };

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(
      defaultChecked ?? false,
    );
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : uncontrolled;

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(switchTrackVariants({ size }), className)}
        onClick={() => {
          const next = !checked;
          if (!isControlled) {
            setUncontrolled(next);
          }
          onCheckedChange?.(next);
        }}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={switchThumbVariants({ size })}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants };
