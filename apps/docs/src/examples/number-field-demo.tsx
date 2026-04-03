"use client";

import {
  NumberFieldRoot,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from "@mg/ui";

export const NumberFieldBasicDemo = () => {
  return (
    <NumberFieldRoot defaultValue={1} min={0} max={99} className="w-full max-w-[180px]">
      <NumberFieldGroup>
        <NumberFieldDecrement>−</NumberFieldDecrement>
        <NumberFieldInput />
        <NumberFieldIncrement>+</NumberFieldIncrement>
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
};
