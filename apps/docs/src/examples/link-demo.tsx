"use client";

import { Link } from "@mg/ui";

export const LinkBasicDemo = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="#">默认链接</Link>
      <Link href="#" variant="muted">Muted 链接</Link>
      <Link href="https://example.com" external>外部链接 ↗</Link>
    </div>
  );
};
