"use client";

import { Grid } from "@mg/ui";

export const GridBasicDemo = () => {
  const cell = "flex h-12 items-center justify-center rounded-md text-xs font-medium";
  return (
    <Grid cols={3} gap={3} className="w-full max-w-md">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className={cell} style={{ background: "rgba(41,151,255,0.15)", color: "#2997ff" }}>
          {n}
        </div>
      ))}
    </Grid>
  );
};
