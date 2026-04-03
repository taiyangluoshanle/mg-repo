"use client";

import { forwardRef } from "react";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@mg/utils";

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollArea.Root> & {
  orientation?: "horizontal" | "vertical" | "both";
};

const ScrollAreaComponent = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    const showVertical = orientation === "vertical" || orientation === "both";
    const showHorizontal = orientation === "horizontal" || orientation === "both";

    return (
      <ScrollArea.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollArea.Viewport className="size-full rounded-[inherit]">
          {children}
        </ScrollArea.Viewport>
        {showVertical ? (
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex touch-none select-none bg-transparent p-0.5 transition-colors data-hovering:bg-surface-hover data-scrolling:bg-surface-hover"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
          </ScrollArea.Scrollbar>
        ) : null}
        {showHorizontal ? (
          <ScrollArea.Scrollbar
            orientation="horizontal"
            className="flex touch-none select-none bg-transparent p-0.5 transition-colors data-hovering:bg-surface-hover data-scrolling:bg-surface-hover"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
          </ScrollArea.Scrollbar>
        ) : null}
        {showVertical && showHorizontal ? (
          <ScrollArea.Corner className="bg-transparent" />
        ) : null}
      </ScrollArea.Root>
    );
  },
);
ScrollAreaComponent.displayName = "ScrollArea";

export { ScrollAreaComponent as ScrollArea, type ScrollAreaProps };
