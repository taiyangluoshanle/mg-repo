"use client";

import { Tag } from "@mg/ui";

export const TagBasicDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tag>Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag closable onClose={() => {}}>
        可关闭
      </Tag>
    </div>
  );
};
