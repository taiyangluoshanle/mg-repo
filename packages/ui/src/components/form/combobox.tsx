"use client";

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";
import { cn } from "@mg/utils";

export type ComboboxRootProps = React.ComponentPropsWithoutRef<typeof Combobox.Root>;
export const ComboboxRoot = (props: ComboboxRootProps) => <Combobox.Root {...props} />;

export const ComboboxLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Label>
>(({ className, ...props }, ref) => (
  <Combobox.Label
    ref={ref}
    className={cn("mb-1 block text-sm font-medium text-neutral-700", className)}
    {...props}
  />
));
ComboboxLabel.displayName = "ComboboxLabel";

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Input>
>(({ className, ...props }, ref) => (
  <Combobox.Input
    ref={ref}
    className={cn(
      "h-9 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-blue-600 data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ComboboxInput.displayName = "ComboboxInput";

export const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Trigger>
>(({ className, ...props }, ref) => (
  <Combobox.Trigger
    ref={ref}
    className={cn("absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400", className)}
    {...props}
  />
));
ComboboxTrigger.displayName = "ComboboxTrigger";

export const ComboboxInputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.InputGroup>
>(({ className, ...props }, ref) => (
  <Combobox.InputGroup ref={ref} className={cn("relative", className)} {...props} />
));
ComboboxInputGroup.displayName = "ComboboxInputGroup";

export const ComboboxPortal = Combobox.Portal;

export const ComboboxBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Backdrop>
>(({ className, ...props }, ref) => (
  <Combobox.Backdrop ref={ref} className={cn("fixed inset-0", className)} {...props} />
));
ComboboxBackdrop.displayName = "ComboboxBackdrop";

export const ComboboxPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Positioner>
>(({ className, ...props }, ref) => (
  <Combobox.Positioner ref={ref} className={cn("", className)} {...props} />
));
ComboboxPositioner.displayName = "ComboboxPositioner";

export const ComboboxPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Popup>
>(({ className, ...props }, ref) => (
  <Combobox.Popup
    ref={ref}
    className={cn(
      "max-h-60 overflow-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  />
));
ComboboxPopup.displayName = "ComboboxPopup";

export const ComboboxList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.List>
>(({ className, ...props }, ref) => (
  <Combobox.List ref={ref} className={cn("", className)} {...props} />
));
ComboboxList.displayName = "ComboboxList";

export const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Item>
>(({ className, ...props }, ref) => (
  <Combobox.Item
    ref={ref}
    className={cn(
      "flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none data-highlighted:bg-blue-50 data-highlighted:text-blue-700 data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ComboboxItem.displayName = "ComboboxItem";

export const ComboboxItemIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof Combobox.ItemIndicator>
>(({ className, ...props }, ref) => (
  <Combobox.ItemIndicator ref={ref} className={cn("text-blue-600", className)} {...props} />
));
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

export const ComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Empty>
>(({ className, ...props }, ref) => (
  <Combobox.Empty
    ref={ref}
    className={cn("px-3 py-6 text-center text-sm text-neutral-500", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "ComboboxEmpty";

export const ComboboxGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Group>
>(({ className, ...props }, ref) => (
  <Combobox.Group ref={ref} className={cn("", className)} {...props} />
));
ComboboxGroup.displayName = "ComboboxGroup";

export const ComboboxGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Combobox.GroupLabel>
>(({ className, ...props }, ref) => (
  <Combobox.GroupLabel
    ref={ref}
    className={cn("px-3 py-1.5 text-xs font-medium text-neutral-500", className)}
    {...props}
  />
));
ComboboxGroupLabel.displayName = "ComboboxGroupLabel";

export const ComboboxClear = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Combobox.Clear>
>(({ className, ...props }, ref) => (
  <Combobox.Clear
    ref={ref}
    className={cn(
      "absolute right-8 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600",
      className,
    )}
    {...props}
  />
));
ComboboxClear.displayName = "ComboboxClear";

export const ComboboxValue = Combobox.Value;
export const ComboboxIcon = Combobox.Icon;
export const ComboboxArrow = Combobox.Arrow;
