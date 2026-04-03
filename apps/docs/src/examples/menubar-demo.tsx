"use client";

import { Menubar, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@mg/ui";

export const MenubarBasicDemo = () => {
  return (
    <Menubar>
      <DropdownMenu>
        <DropdownMenuTrigger>文件</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>新建</DropdownMenuItem>
          <DropdownMenuItem>打开</DropdownMenuItem>
          <DropdownMenuItem>保存</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>编辑</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>撤销</DropdownMenuItem>
          <DropdownMenuItem>重做</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Menubar>
  );
};
