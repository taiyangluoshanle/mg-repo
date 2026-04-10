"use client";

import { forwardRef, useEffect, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";

const zeroPad = (value: number) => value.toString().padStart(2, "0");

export interface CountdownFormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownRenderParams {
  countdown: number;
  formatTime: string[][];
  formattedRes: CountdownFormattedRes;
  renderDefault: () => ReactNode;
}

export interface CountdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  endTime: Date | number;
  pad?: boolean;
  always?: boolean;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  children?: ReactNode | ((params: CountdownRenderParams) => ReactNode);
  onEnd?: () => void;
}

const toEndMs = (endTime: Date | number): number => {
  if (endTime instanceof Date) return endTime.getTime();
  return endTime < 1e12 ? endTime * 1000 : endTime;
};

export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      className,
      endTime,
      pad = false,
      always = false,
      labels = { days: "天", hours: "时", minutes: "分", seconds: "秒" },
      children,
      onEnd,
      ...props
    },
    ref,
  ) => {
    const endMs = useMemo(() => toEndMs(endTime), [endTime]);
    const endedRef = useRef(false);
    const [isClient, setIsClient] = useState(false);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
      setIsClient(true);
      endedRef.current = false;
      const id = window.setInterval(() => setNow(Date.now()), 1000);
      return () => window.clearInterval(id);
    }, [endMs]);

    const remaining = Math.max(0, endMs - now);

    useEffect(() => {
      if (remaining <= 0 && onEnd && !endedRef.current) {
        endedRef.current = true;
        onEnd();
      }
    }, [remaining, onEnd]);

    if (remaining <= 0 && !always) return null;

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    const formattedRes: CountdownFormattedRes = { days, hours, minutes, seconds };

    const formatTime = [
      [isClient ? (pad ? zeroPad(days) : days.toString()) : pad ? "--" : "-", labels.days ?? "天"],
      [isClient ? (pad ? zeroPad(hours) : hours.toString()) : pad ? "--" : "-", labels.hours ?? "时"],
      [isClient ? (pad ? zeroPad(minutes) : minutes.toString()) : pad ? "--" : "-", labels.minutes ?? "分"],
      [isClient ? (pad ? zeroPad(seconds) : seconds.toString()) : pad ? "--" : "-", labels.seconds ?? "秒"],
    ];

    const renderDefault = () => (
      <div className={cn("inline-flex shrink-0 items-center text-base font-bold lg:text-lg", className)} {...props}>
        <span>{formatTime.map(([v, u]) => `${v} ${u}`).join(" : ")}</span>
      </div>
    );

    if (!children) return renderDefault();

    if (typeof children === "function") {
      return (
        <div ref={ref} className={className} {...props}>
          {children({ countdown: remaining, formatTime, formattedRes, renderDefault })}
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  },
);

Countdown.displayName = "Countdown";
