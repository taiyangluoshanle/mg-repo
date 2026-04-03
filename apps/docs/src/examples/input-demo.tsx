"use client";

import { Input } from "@mg/ui";

export const InputBasicDemo = () => {
  return <Input placeholder="请输入内容..." />;
};

export const InputSizesDemo = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  );
};

export const InputErrorDemo = () => {
  return (
    <div className="w-full max-w-sm">
      <Input variant="error" placeholder="错误状态" />
    </div>
  );
};
