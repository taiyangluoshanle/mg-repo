"use client";

import * as React from "react";
import { cn } from "@mg/utils";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (ctx == null) {
    throw new Error(`${component} must be used within Tabs`);
  }
  return ctx;
}

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
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolled;

    const setValue = React.useCallback(
      (v: string) => {
        if (!isControlled) setUncontrolled(v);
        onValueChange?.(v);
      },
      [isControlled, onValueChange],
    );

    const ctx = React.useMemo(
      () => ({ value, setValue }),
      [value, setValue],
    );

    return (
      <TabsContext.Provider value={ctx}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
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
>(({ className, value: tabValue, ...props }, ref) => {
  const { value, setValue } = useTabsContext("TabsTrigger");
  const selected = value === tabValue;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      data-state={selected ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "bg-background text-foreground shadow-sm"
          : "hover:text-foreground",
        className,
      )}
      onClick={() => setValue(tabValue)}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({ className, value: tabValue, ...props }, ref) => {
  const { value } = useTabsContext("TabsContent");
  if (value !== tabValue) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state="active"
      className={cn("mt-2 focus-visible:outline-none", className)}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";
