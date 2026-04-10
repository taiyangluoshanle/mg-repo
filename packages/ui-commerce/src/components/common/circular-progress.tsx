import { forwardRef, type SVGAttributes } from "react";
import { cn } from "@mg/utils";

const RADIUS = 20;

export interface CircularProgressProps extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
  value?: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  indicatorColor?: string;
}

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      className,
      value = 0,
      size = 32,
      strokeWidth = 4,
      trackColor = "stroke-black/30",
      indicatorColor = "stroke-blue-600",
      style,
      ...props
    },
    ref,
  ) => {
    const boxSize = (2 * RADIUS) / (1 - strokeWidth / size);
    const circumference = 2 * Math.PI * RADIUS;
    const svgStrokeWidth = (boxSize / size) * strokeWidth;
    const center = boxSize / 2;
    const offset = ((100 - Math.min(100, Math.max(0, value))) / 100) * circumference;

    return (
      <svg
        ref={ref}
        className={cn("inline size-[1em]", className)}
        viewBox={`0 0 ${boxSize} ${boxSize}`}
        style={{ fontSize: `${size}px`, ...style }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <circle
          className={trackColor}
          cx={center}
          cy={center}
          r={RADIUS}
          strokeWidth={svgStrokeWidth}
          strokeDasharray={circumference}
          fill="transparent"
        />
        <circle
          className={cn(indicatorColor, "transition-[stroke-dashoffset] duration-300 ease-in-out")}
          cx={center}
          cy={center}
          r={RADIUS}
          strokeWidth={svgStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
    );
  },
);

CircularProgress.displayName = "CircularProgress";
