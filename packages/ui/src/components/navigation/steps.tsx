import * as React from "react";
import { cn } from "@mg/utils";

export interface StepItem {
  title: string;
  description?: string;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  current: number;
  items: StepItem[];
}

export const Steps = React.forwardRef<HTMLOListElement, StepsProps>(
  ({ className, current, items, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("flex w-full list-none flex-row gap-0 p-0", className)}
        {...props}
      >
        {items.map((item, index) => {
          const done = index < current;
          const active = index === current;
          const last = index === items.length - 1;
          return (
            <li
              key={index}
              className={cn("relative flex flex-1 flex-col items-center", !last && "pr-2")}
            >
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                    done &&
                      "border-success bg-success text-foreground-inverse",
                    active &&
                      !done &&
                      "border-brand bg-brand text-foreground-inverse",
                    !active &&
                      !done &&
                      "border-border bg-background text-foreground-muted",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : index + 1}
                </div>
                {!last ? (
                  <div
                    className={cn(
                      "mx-2 h-0.5 min-w-[1rem] flex-1 rounded-full",
                      index < current ? "bg-success" : "bg-border",
                    )}
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="mt-2 max-w-[8rem] text-center">
                <div
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-foreground" : "text-foreground-secondary",
                  )}
                >
                  {item.title}
                </div>
                {item.description != null ? (
                  <div className="mt-0.5 text-xs text-foreground-muted">
                    {item.description}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);
Steps.displayName = "Steps";
