"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";
import { cn } from "@mg/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      defaultValue = "",
      value: valueProp,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const rootValueProps =
      valueProp !== undefined
        ? { value: valueProp === "" ? null : valueProp }
        : { defaultValue: defaultValue === "" ? null : defaultValue };

    return (
      <BaseTabs.Root
        ref={ref}
        className={cn("w-full", className)}
        {...props}
        {...rootValueProps}
        onValueChange={(next) => onValueChange?.(String(next ?? ""))}
      >
        {children}
      </BaseTabs.Root>
    );
  },
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-background-secondary p-1 text-foreground-muted",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, value: tabValue, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    type="button"
    value={tabValue}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm [&:not([data-active])]:hover:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({ className, value: tabValue, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    value={tabValue}
    className={cn("mt-2 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
