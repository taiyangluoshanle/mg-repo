"use client";

import { Button, Empty } from "@mg/ui";

export const EmptyBasicDemo = () => {
  return (
    <Empty
      title="暂无数据"
      description="当前没有可显示的内容"
      action={<Button size="sm">刷新</Button>}
    />
  );
};
