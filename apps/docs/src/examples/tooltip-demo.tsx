"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@mg/ui";

export const TooltipBasicDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex">
        <Button size="sm" variant="outline">
          悬停查看
        </Button>
      </TooltipTrigger>
      <TooltipContent>提示信息</TooltipContent>
    </Tooltip>
  );
};
