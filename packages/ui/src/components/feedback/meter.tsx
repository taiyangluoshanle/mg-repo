"use client";
import * as React from "react";
import { Meter } from "@base-ui/react/meter";
import { cn } from "@mg/utils";

export type MeterRootProps = React.ComponentPropsWithoutRef<typeof Meter.Root>;

export const MeterRoot = React.forwardRef<HTMLDivElement, MeterRootProps>(
  ({ className, ...props }, ref) => (
    <Meter.Root ref={ref} className={cn("flex w-full flex-col gap-1", className)} {...props} />
  ),
);
MeterRoot.displayName = "MeterRoot";

export const MeterTrack = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Meter.Track>>(
  ({ className, ...props }, ref) => (
    <Meter.Track ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-neutral-200", className)} {...props} />
  ),
);
MeterTrack.displayName = "MeterTrack";

export const MeterIndicator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Meter.Indicator>>(
  ({ className, ...props }, ref) => (
    <Meter.Indicator ref={ref} className={cn("h-full rounded-full bg-blue-600 transition-[width] duration-300", className)} {...props} />
  ),
);
MeterIndicator.displayName = "MeterIndicator";

export const MeterLabel = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<typeof Meter.Label>>(
  ({ className, ...props }, ref) => (
    <Meter.Label ref={ref} className={cn("text-sm font-medium text-neutral-700", className)} {...props} />
  ),
);
MeterLabel.displayName = "MeterLabel";

export const MeterValue = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<typeof Meter.Value>>(
  ({ className, ...props }, ref) => (
    <Meter.Value ref={ref} className={cn("text-sm text-neutral-500", className)} {...props} />
  ),
);
MeterValue.displayName = "MeterValue";
