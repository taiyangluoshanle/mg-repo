"use client";

import { useState } from "react";
import { CheckboxGroupRoot, Checkbox } from "@mg/ui";

export const CheckboxGroupBasicDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <CheckboxGroupRoot value={value} onValueChange={setValue}>
      <Checkbox value="apple" label="苹果" />
      <Checkbox value="banana" label="香蕉" />
      <Checkbox value="orange" label="橙子" />
    </CheckboxGroupRoot>
  );
};
