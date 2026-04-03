"use client";

import { Heading, Text } from "@mg/ui";

export const TypographyHeadingDemo = () => {
  return (
    <div className="flex flex-col gap-2">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
    </div>
  );
};

export const TypographyTextDemo = () => {
  return (
    <div className="flex flex-col gap-2">
      <Text>默认段落文本</Text>
      <Text as="span" className="text-sm">行内文本 span</Text>
    </div>
  );
};
