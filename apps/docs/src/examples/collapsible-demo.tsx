"use client";

import { CollapsibleRoot, CollapsibleTrigger, CollapsiblePanel } from "@mg/ui";

export const CollapsibleBasicDemo = () => {
  return (
    <CollapsibleRoot className="w-full max-w-sm rounded-lg border border-neutral-200">
      <CollapsibleTrigger>
        <span>点击展开</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-data-[panel-open]:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="px-3 pb-3 text-sm text-neutral-600">
          这是可折叠的内容区域。Collapsible 是比 Accordion 更轻量的折叠组件，适用于单个面板的展开/收起场景。
        </div>
      </CollapsiblePanel>
    </CollapsibleRoot>
  );
};
