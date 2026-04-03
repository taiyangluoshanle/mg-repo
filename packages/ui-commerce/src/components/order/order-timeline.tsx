import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Text } from "@mg/ui";

export interface OrderTimelineEvent {
  time: string;
  title: string;
  description?: string;
}

export interface OrderTimelineProps extends HTMLAttributes<HTMLUListElement> {
  events: OrderTimelineEvent[];
}

export const OrderTimeline = forwardRef<HTMLUListElement, OrderTimelineProps>(
  ({ className, events, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn("relative m-0 list-none space-y-0 p-0", className)} {...props}>
        {events.map((ev, i) => {
          const last = i === events.length - 1;
          return (
            <li key={`${ev.time}-${ev.title}-${i}`} className="relative flex gap-3 pb-6 last:pb-0">
              {!last ? (
                <span
                  className="absolute left-[7px] top-3 h-[calc(100%-0.25rem)] w-px bg-border"
                  aria-hidden
                />
              ) : null}
              <span
                className={cn(
                  "relative z-[1] mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4 ring-background",
                  i === 0 ? "bg-brand" : "bg-foreground-muted",
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <Text as="span" className="text-xs text-foreground-muted tabular-nums">
                    {ev.time}
                  </Text>
                  <Text as="span" className="text-sm font-medium">{ev.title}</Text>
                </div>
                {ev.description ? (
                  <Text as="p" className="mt-1 text-sm text-foreground-secondary">
                    {ev.description}
                  </Text>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    );
  },
);

OrderTimeline.displayName = "OrderTimeline";
