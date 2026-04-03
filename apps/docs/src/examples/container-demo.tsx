"use client";

import { Container } from "@mg/ui";

export const ContainerBasicDemo = () => {
  return (
    <div className="w-full">
      <Container maxWidth="sm" className="rounded-lg border border-dashed p-4 text-center text-sm" style={{ borderColor: "var(--neutral-600)", color: "var(--neutral-300)" }}>
        Container (sm)
      </Container>
    </div>
  );
};
