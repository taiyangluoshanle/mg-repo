"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { cn } from "@mg/utils";

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "size"
> & {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onValueChange,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = React.useCallback(
      (next: number) => {
        onValueChange?.(next);
        onChange?.({
          target: { value: String(next) },
          currentTarget: { value: String(next) },
        } as React.ChangeEvent<HTMLInputElement>);
      },
      [onChange, onValueChange],
    );

    const valueProps =
      value !== undefined ? { value } : defaultValue !== undefined
        ? { defaultValue }
        : {};

    return (
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...valueProps}
        {...(props as Omit<
          React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
          | "min"
          | "max"
          | "step"
          | "disabled"
          | "onValueChange"
          | "className"
          | "value"
          | "defaultValue"
        >)}
      >
        <SliderPrimitive.Control className="relative flex w-full items-center">
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
            <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-brand" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            inputRef={ref}
            className={cn(
              "block h-4 w-4 rounded-full border-2 border-border bg-background shadow-sm outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand",
            )}
          />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
