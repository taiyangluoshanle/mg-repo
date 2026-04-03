"use client";

import { Select } from "@mg/ui";

export const SelectBasicDemo = () => {
  return (
    <Select placeholder="请选择" className="w-full max-w-sm">
      <option value="1">选项一</option>
      <option value="2">选项二</option>
      <option value="3">选项三</option>
    </Select>
  );
};
