"use client";

import {
  PreviewCardRoot,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
} from "@mg/ui";

export const PreviewCardBasicDemo = () => {
  return (
    <PreviewCardRoot>
      <PreviewCardTrigger href="https://base-ui.com">
        Base UI 官网
      </PreviewCardTrigger>
      <PreviewCardPortal>
        <PreviewCardPositioner sideOffset={8}>
          <PreviewCardPopup>
            <PreviewCardArrow />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Base UI</h4>
              <p className="text-xs text-neutral-500">
                无样式、可组合的 React UI 组件库，由 Radix、Floating UI 和 Material UI 团队共同打造。
              </p>
            </div>
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCardRoot>
  );
};
