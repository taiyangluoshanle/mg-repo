"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  buttonVariants,
} from "@mg/ui";
import { cn } from "@mg/utils";

export const PopoverBasicDemo = () => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        打开弹出层
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm" style={{ color: "var(--neutral-200)" }}>
          这是弹出层的内容。
        </p>
      </PopoverContent>
    </Popover>
  );
};
