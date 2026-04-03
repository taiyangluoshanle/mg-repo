"use client";

import { useState } from "react";
import { Slider } from "@mg/ui";

export const SliderBasicDemo = () => {
  const [value, setValue] = useState(50);
  return (
    <div className="w-full max-w-sm">
      <Slider
        min={0}
        max={100}
        step={1}
        value={value}
        onValueChange={setValue}
      />
      <p className="mt-2 text-center text-sm text-foreground-muted">
        值: {value}
      </p>
    </div>
  );
};
