"use client";

import { Menu, MenuItem, MenuGroup } from "@mg/ui";

export const MenuBasicDemo = () => {
  return (
    <div className="w-full max-w-[200px]">
      <Menu>
        <MenuGroup label="导航">
          <MenuItem active>首页</MenuItem>
          <MenuItem>仪表盘</MenuItem>
          <MenuItem>设置</MenuItem>
        </MenuGroup>
        <MenuGroup label="其他">
          <MenuItem>帮助</MenuItem>
          <MenuItem>关于</MenuItem>
        </MenuGroup>
      </Menu>
    </div>
  );
};
