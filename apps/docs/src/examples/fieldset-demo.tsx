"use client";

import { FieldsetRoot, FieldsetLegend, Input } from "@mg/ui";

export const FieldsetBasicDemo = () => {
  return (
    <FieldsetRoot className="w-full max-w-sm">
      <FieldsetLegend>个人信息</FieldsetLegend>
      <div className="space-y-3">
        <Input placeholder="姓名" />
        <Input placeholder="邮箱" type="email" />
      </div>
    </FieldsetRoot>
  );
};
