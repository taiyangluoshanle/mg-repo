"use client";

import { useState } from "react";
import { RadioGroup, RadioItem } from "@mg/ui";

export const RadioBasicDemo = () => {
  const [value, setValue] = useState("1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioItem value="1" label="选项一" />
      <RadioItem value="2" label="选项二" />
      <RadioItem value="3" label="选项三" />
    </RadioGroup>
  );
};
