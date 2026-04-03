"use client";

import { CountdownTimer } from "@mg/ui-commerce";

export const CountdownTimerBasicDemo = () => {
  const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000);
  return <CountdownTimer endTime={endTime} onEnd={() => alert("活动已结束")} />;
};
