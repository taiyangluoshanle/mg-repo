"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";
import { Countdown, type CountdownRenderParams } from "./countdown";

export interface BoxCountdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  endTime: Date | number;
  bgColor?: string;
  textColor?: string;
  separatorColor?: string;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  children?: (params: { timer: ReactNode }) => ReactNode;
  onEnd?: () => void;
}

export const BoxCountdown = forwardRef<HTMLDivElement, BoxCountdownProps>(
  (
    {
      className,
      endTime,
      bgColor = "bg-[#FF5A1F]",
      textColor = "text-black",
      separatorColor = "text-neutral-300",
      labels,
      children,
      onEnd,
      ...props
    },
    ref,
  ) => {
    const renderChildren = ({ formatTime }: CountdownRenderParams) => {
      const boxes = formatTime.map(([value, unit]) => {
        const digits = value.split("");
        return (
          <div key={unit} className="inline-flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center gap-0.5 text-base/[32px]">
              {digits.map((d, i) => (
                <div key={i} className={cn("w-6 rounded-sm text-center font-semibold text-white", bgColor)}>
                  {d}
                </div>
              ))}
            </div>
            <div className={cn("text-xs font-medium", textColor)}>{unit}</div>
          </div>
        );
      });

      const withSeparators: ReactNode[] = [];
      boxes.forEach((box, i) => {
        withSeparators.push(box);
        if (i < boxes.length - 1) {
          withSeparators.push(
            <div key={`sep-${i}`} className={cn("h-8 self-start text-base/[32px] font-bold", separatorColor)}>
              :
            </div>,
          );
        }
      });

      const timer = <div className="inline-flex items-center gap-0.5">{withSeparators}</div>;
      return children ? children({ timer }) : timer;
    };

    return (
      <Countdown ref={ref} pad endTime={endTime} className={className} labels={labels} onEnd={onEnd} {...props}>
        {renderChildren}
      </Countdown>
    );
  },
);

BoxCountdown.displayName = "BoxCountdown";
