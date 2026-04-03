"use client";

import { useState } from "react";
import { Switch } from "@mg/ui";

export const SwitchBasicDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm">{checked ? "开启" : "关闭"}</span>
    </div>
  );
};

export const SwitchSizesDemo = () => {
  return (
    <div className="flex items-center gap-4">
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </div>
  );
};
