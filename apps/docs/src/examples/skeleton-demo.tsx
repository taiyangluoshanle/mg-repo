"use client";

import { Skeleton } from "@mg/ui";

export const SkeletonBasicDemo = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" width={120} height={16} />
        <Skeleton variant="text" width={200} height={12} />
        <Skeleton variant="rectangular" width={200} height={32} />
      </div>
    </div>
  );
};
