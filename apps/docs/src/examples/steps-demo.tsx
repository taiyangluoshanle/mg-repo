"use client";

import { Steps } from "@mg/ui";

export const StepsBasicDemo = () => {
  return (
    <Steps
      current={1}
      items={[
        { title: "第一步", description: "填写基本信息" },
        { title: "第二步", description: "上传资料" },
        { title: "第三步", description: "完成" },
      ]}
    />
  );
};
