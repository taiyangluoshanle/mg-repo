import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
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
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: 4,
    align: "stretch",
    justify: "start",
  },
});

type StackProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof stackVariants>;

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, ...props }, ref) => {
    return (
      <div
        className={cn(stackVariants({ direction, gap, align, justify }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Stack.displayName = "Stack";

type StackOmitDirection = Omit<StackProps, "direction">;

const VStack = forwardRef<HTMLDivElement, StackOmitDirection>((props, ref) => (
  <Stack ref={ref} direction="column" {...props} />
));
VStack.displayName = "VStack";

const HStack = forwardRef<HTMLDivElement, StackOmitDirection>((props, ref) => (
  <Stack ref={ref} direction="row" {...props} />
));
HStack.displayName = "HStack";

export { Stack, VStack, HStack, stackVariants, type StackProps };
