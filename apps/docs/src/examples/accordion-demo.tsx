"use client";

import { Accordion, AccordionItem } from "@mg/ui";

export const AccordionBasicDemo = () => {
  return (
    <div className="w-full max-w-md">
      <Accordion>
        <AccordionItem title="什么是 MG Design？">
          MG Design 是一套企业级组件库，基于 Base UI 和 TailwindCSS 构建。
        </AccordionItem>
        <AccordionItem title="如何安装？">
          使用 pnpm add @mg/ui 即可安装。
        </AccordionItem>
        <AccordionItem title="支持哪些框架？">
          目前支持 React 和 Next.js。
        </AccordionItem>
      </Accordion>
    </div>
  );
};
