"use client";

import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";
import { cn } from "@mg/utils";

export type NumberFieldRootProps = React.ComponentPropsWithoutRef<typeof NumberField.Root>;
export const NumberFieldRoot = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  ({ className, ...props }, ref) => (
    <NumberField.Root ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  ),
);
NumberFieldRoot.displayName = "NumberFieldRoot";

export const NumberFieldGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Group>
>(({ className, ...props }, ref) => (
  <NumberField.Group ref={ref} className={cn("flex items-center", className)} {...props} />
));
NumberFieldGroup.displayName = "NumberFieldGroup";

export const NumberFieldInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Input>
>(({ className, ...props }, ref) => (
  <NumberField.Input
    ref={ref}
    className={cn(
      "h-9 w-full border-y border-neutral-300 bg-white px-3 text-center text-sm tabular-nums focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-600",
      className,
    )}
    {...props}
  />
));
NumberFieldInput.displayName = "NumberFieldInput";

export const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Increment>
>(({ className, ...props }, ref) => (
  <NumberField.Increment
    ref={ref}
    className={cn(
      "inline-flex h-9 w-9 items-center justify-center rounded-r-md border border-neutral-300 bg-white text-sm hover:bg-neutral-50 focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
NumberFieldIncrement.displayName = "NumberFieldIncrement";

export const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Decrement>
>(({ className, ...props }, ref) => (
  <NumberField.Decrement
    ref={ref}
    className={cn(
      "inline-flex h-9 w-9 items-center justify-center rounded-l-md border border-neutral-300 bg-white text-sm hover:bg-neutral-50 focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
NumberFieldDecrement.displayName = "NumberFieldDecrement";

export const NumberFieldScrubArea = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof NumberField.ScrubArea>
>(({ className, ...props }, ref) => (
  <NumberField.ScrubArea ref={ref} className={cn("cursor-ew-resize", className)} {...props} />
));
NumberFieldScrubArea.displayName = "NumberFieldScrubArea";

export const NumberFieldScrubAreaCursor = NumberField.ScrubAreaCursor;
