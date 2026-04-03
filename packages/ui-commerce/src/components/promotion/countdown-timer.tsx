"use client";

import { forwardRef, useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Text } from "@mg/ui";

export interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
  endTime: Date | string | number;
  onEnd?: () => void;
}

function toEndMs(endTime: Date | string | number): number {
  if (endTime instanceof Date) return endTime.getTime();
  if (typeof endTime === "string") return new Date(endTime).getTime();
  return endTime < 1e12 ? endTime * 1000 : endTime;
}

function pad2(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="flex min-w-[2.5rem] items-center justify-center rounded-md bg-background-secondary px-2 py-1.5 font-mono text-lg font-semibold tabular-nums text-foreground ring-1 ring-border">
        {value}
      </span>
      <Text as="span" className="text-[10px] text-foreground-muted">
        {label}
      </Text>
    </div>
  );
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ className, endTime, onEnd, ...props }, ref) => {
    const endMs = useMemo(() => toEndMs(endTime), [endTime]);
    const endedRef = useRef(false);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
      endedRef.current = false;
      const id = window.setInterval(() => setNow(Date.now()), 1000);
      return () => window.clearInterval(id);
    }, [endMs]);

    const remaining = Math.max(0, endMs - now);
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    useEffect(() => {
      if (remaining <= 0 && onEnd && !endedRef.current) {
        endedRef.current = true;
        onEnd();
      }
    }, [remaining, onEnd]);

    return (
      <div ref={ref} className={cn("flex flex-wrap items-end gap-2", className)} {...props}>
        {days > 0 ? <TimeBox value={pad2(days)} label="天" /> : null}
        <TimeBox value={pad2(hours)} label="时" />
        <TimeBox value={pad2(minutes)} label="分" />
        <TimeBox value={pad2(seconds)} label="秒" />
      </div>
    );
  },
);

CountdownTimer.displayName = "CountdownTimer";
