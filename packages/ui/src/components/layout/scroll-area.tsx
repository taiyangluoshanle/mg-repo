import { forwardRef } from "react";
import { cn } from "@mg/utils";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical" | "both";
};

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "scrollbar-hidden",
          orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
          orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
          orientation === "both" && "overflow-auto",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea, type ScrollAreaProps };
