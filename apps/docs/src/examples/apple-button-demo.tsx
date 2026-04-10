"use client";

import { Button } from "@mg/components";

export function AppleButtonBasicDemo() {
  return <Button>开始使用</Button>;
}

export function AppleButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="dark">Dark CTA</Button>
      <Button variant="pill" size="pill">Pill Link</Button>
      <Button variant="filter" size="filter">Filter</Button>
      <Button variant="media" size="media">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </Button>
    </div>
  );
}

export function AppleButtonSizesDemo() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Button size="default">Default</Button>
      <Button variant="pill" size="pill">Pill Size</Button>
      <Button variant="filter" size="filter">Filter Size</Button>
      <Button variant="media" size="media">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </Button>
    </div>
  );
}
