import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

export type GridColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const GRID_COLS: Record<GridColCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

export type ResponsiveGridCols = {
  sm?: GridColCount;
  md?: GridColCount;
  lg?: GridColCount;
};

function colsToClasses(cols: GridColCount | ResponsiveGridCols): string {
  if (typeof cols === "number") {
    return GRID_COLS[cols] ?? GRID_COLS[1];
  }
  const parts: string[] = [GRID_COLS[1]];
  if (cols.sm != null) parts.push(`sm:${GRID_COLS[cols.sm]}`);
  if (cols.md != null) parts.push(`md:${GRID_COLS[cols.md]}`);
  if (cols.lg != null) parts.push(`lg:${GRID_COLS[cols.lg]}`);
  return cn(...parts);
}

const gridVariants = cva("grid w-full", {
  variants: {
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
      10: "gap-10",
      11: "gap-11",
      12: "gap-12",
    },
  },
  defaultVariants: {
    gap: 4,
  },
});

type GridProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof gridVariants> & {
    cols: GridColCount | ResponsiveGridCols;
  };

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        className={cn(gridVariants({ gap }), colsToClasses(cols), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";

export { Grid, gridVariants, type GridProps };
