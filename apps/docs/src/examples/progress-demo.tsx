"use client";

import { Progress } from "@mg/ui";

export const ProgressBasicDemo = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={30} />
      <Progress value={60} variant="success" />
      <Progress value={90} variant="error" />
    </div>
  );
};
