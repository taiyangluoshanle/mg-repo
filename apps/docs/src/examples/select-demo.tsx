"use client";

import { Select, SelectItem } from "@mg/ui";

export const SelectBasicDemo = () => {
  return (
    <Select placeholder="请选择" className="w-full max-w-sm">
      <SelectItem value="1">选项一</SelectItem>
      <SelectItem value="2">选项二</SelectItem>
      <SelectItem value="3">选项三</SelectItem>
    </Select>
  );
};
