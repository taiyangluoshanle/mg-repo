"use client";

import {
  ContextMenuRoot,
  ContextMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@mg/ui";

export const ContextMenuBasicDemo = () => {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger>
        <div className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 text-sm text-neutral-500">
          右键点击此区域
        </div>
      </ContextMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>复制</DropdownMenuItem>
        <DropdownMenuItem>粘贴</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>删除</DropdownMenuItem>
      </DropdownMenuContent>
    </ContextMenuRoot>
  );
};
