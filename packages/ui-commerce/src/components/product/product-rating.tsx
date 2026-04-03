import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Text } from "@mg/ui";

export interface ProductRatingProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–5, decimals allowed */
  value: number;
  /** Total review count */
  count: number;
}

function StarSegment({ fill }: { fill: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, fill)) * 100);
  return (
    <span className="relative inline-block h-4 w-4 shrink-0 text-foreground-muted">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          fillOpacity={0.2}
          d="M12 3.5l2.35 4.76 5.26.77-3.8 3.7.9 5.24L12 15.9l-4.71 2.47.9-5.24-3.8-3.7 5.26-.77L12 3.5z"
        />
      </svg>
      <span
        className="absolute inset-0 overflow-hidden text-amber-500"
        style={{ width: `${pct}%` }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3.5l2.35 4.76 5.26.77-3.8 3.7.9 5.24L12 15.9l-4.71 2.47.9-5.24-3.8-3.7 5.26-.77L12 3.5z"
          />
        </svg>
      </span>
    </span>
  );
}

export const ProductRating = forwardRef<HTMLDivElement, ProductRatingProps>(
  ({ className, value, count, ...props }, ref) => {
    const v = Math.min(5, Math.max(0, value));
    const segments = [0, 1, 2, 3, 4].map((i) => Math.min(1, Math.max(0, v - i)));

    return (
      <div ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
        <span className="flex items-center gap-0.5" role="img" aria-label={`评分 ${v.toFixed(1)} 星，满分 5 星`}>
          {segments.map((fill, i) => (
            <StarSegment key={i} fill={fill} />
          ))}
        </span>
        <Text as="span" className="text-sm text-foreground-secondary">
          {count.toLocaleString("zh-CN")} 条评价
        </Text>
      </div>
    );
  },
);

ProductRating.displayName = "ProductRating";
