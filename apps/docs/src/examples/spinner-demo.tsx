"use client";

import { Spinner } from "@mg/ui";

export const SpinnerSizesDemo = () => {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
};
