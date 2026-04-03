"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const switchTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-brand data-unchecked:bg-muted",
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
        sm: "h-4 w-4 data-checked:translate-x-4 data-unchecked:translate-x-0",
        md: "h-5 w-5 data-checked:translate-x-5 data-unchecked:translate-x-0",
        lg: "h-6 w-6 data-checked:translate-x-7 data-unchecked:translate-x-0",
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
      type: _type,
      children: _children,
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    return (
      <SwitchPrimitive.Root
        ref={ref as React.Ref<HTMLElement>}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange?.(next)}
        value={
          typeof valueProp === "string"
            ? valueProp
            : valueProp === undefined
              ? undefined
              : String(valueProp)
        }
        className={cn(switchTrackVariants({ size }), className)}
        {...(props as Omit<
          React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
          | "ref"
          | "checked"
          | "defaultChecked"
          | "disabled"
          | "onCheckedChange"
          | "value"
          | "className"
        >)}
      >
        <SwitchPrimitive.Thumb className={switchThumbVariants({ size })} />
      </SwitchPrimitive.Root>
    );
  },
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants };
