"use client";

import { useState } from "react";
import { QuantityStepper } from "@mg/ui-commerce";

export const QuantityStepperBasicDemo = () => {
  const [value, setValue] = useState(1);
  return <QuantityStepper value={value} onValueChange={setValue} min={1} max={99} />;
};
