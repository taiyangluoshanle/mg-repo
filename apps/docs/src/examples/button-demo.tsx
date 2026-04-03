"use client";

import { Button } from "@mg/ui";

export const ButtonBasicDemo = () => {
  return <Button variant="primary">点击我</Button>;
};

export const ButtonVariantsDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
};

export const ButtonSizesDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
};

export const ButtonDisabledDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  );
};
