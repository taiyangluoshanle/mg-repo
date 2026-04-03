"use client";

import { MeterRoot, MeterTrack, MeterIndicator, MeterLabel, MeterValue } from "@mg/ui";

export const MeterBasicDemo = () => {
  return (
    <MeterRoot value={72} className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        <MeterLabel>存储空间</MeterLabel>
        <MeterValue>{(_, value) => `${value}%`}</MeterValue>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterRoot>
  );
};
