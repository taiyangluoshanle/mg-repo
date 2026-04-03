"use client";

import { MGAccordion } from "@mg/ui";

export const AccordionBasicDemo = () => {
  return (
    <div className="w-full max-w-md">
      <MGAccordion
        items={[
          { label: " What is Base UI?", value: "1", content: "Base UI is a library of high-quality unstyled React components for design systems and web apps." },
          { label: "How do I use Base UI?", value: "2", content: "Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home." },
          { label: "What about naming?", value: "3", content: "Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home." },
        ]}
      />
    </div>
  );
};
