"use client";

import { forwardRef, useCallback, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Button, Input } from "@mg/ui";

export interface QuantityStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onValueChange: (next: number) => void;
  min?: number;
  max?: number;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export const QuantityStepper = forwardRef<HTMLDivElement, QuantityStepperProps>(
  ({ className, value, onValueChange, min = 1, max = 99, ...props }, ref) => {
    const set = useCallback(
      (next: number) => {
        onValueChange(clamp(next, min, max));
      },
      [max, min, onValueChange],
    );

    return (
      <div ref={ref} className={cn("inline-flex items-center gap-1", className)} {...props}>
        <Button
          variant="default"
          size="small"
          className="h-9 w-9 shrink-0 px-0"
          aria-label="减少数量"
          disabled={value <= min}
          onClick={() => set(value - 1)}
        >
          −
        </Button>
        <Input
          size="md"
          className="h-9 w-14 text-center tabular-nums"
          inputMode="numeric"
          aria-label="数量"
          value={Number.isFinite(value) ? String(value) : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw === "") return;
            set(Number.parseInt(raw, 10) || min);
          }}
          onBlur={() => {
            if (!Number.isFinite(value) || value < min) set(min);
          }}
        />
        <Button
          variant="default"
          size="small"
          className="h-9 w-9 shrink-0 px-0"
          aria-label="增加数量"
          disabled={value >= max}
          onClick={() => set(value + 1)}
        >
          +
        </Button>
      </div>
    );
  },
);

QuantityStepper.displayName = "QuantityStepper";
