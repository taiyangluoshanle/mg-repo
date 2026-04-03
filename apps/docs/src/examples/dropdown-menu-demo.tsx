"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  buttonVariants,
} from "@mg/ui";
import { cn } from "@mg/utils";

export const DropdownMenuBasicDemo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        操作菜单
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>编辑</DropdownMenuItem>
        <DropdownMenuItem>复制</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>删除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
