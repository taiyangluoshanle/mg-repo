"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Button, Text } from "@mg/ui";

export type SkuOption = { name: string; values: string[] };

export interface SkuSelectorProps extends HTMLAttributes<HTMLDivElement> {
  options: SkuOption[];
  value: Record<string, string>;
  onValueChange: (next: Record<string, string>) => void;
}

export const SkuSelector = forwardRef<HTMLDivElement, SkuSelectorProps>(
  ({ className, options, value, onValueChange, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
        {options.map((group) => (
          <div key={group.name} className="flex flex-col gap-2">
            <Text as="span" className="text-sm font-medium text-foreground-secondary">
              {group.name}
            </Text>
            <div className="flex flex-wrap gap-2">
              {group.values.map((v) => {
                const active = value[group.name] === v;
                return (
                  <Button
                    key={v}
                    size="small"
                    variant={active ? "primary" : "default"}
                    onClick={() => onValueChange({ ...value, [group.name]: v })}
                  >
                    {v}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

SkuSelector.displayName = "SkuSelector";
