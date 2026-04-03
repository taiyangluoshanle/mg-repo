"use client";

import { useState } from "react";
import { Checkbox } from "@mg/ui";

export const CheckboxBasicDemo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="同意用户协议"
    />
  );
};
