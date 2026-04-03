"use client";

import {
  ComboboxRoot, ComboboxInput, ComboboxPortal, ComboboxPositioner,
  ComboboxPopup, ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@mg/ui";

const fruits = ["苹果", "香蕉", "橙子", "葡萄", "草莓", "蓝莓", "芒果", "西瓜"];

export const ComboboxBasicDemo = () => {
  return (
    <div className="w-full max-w-sm">
      <ComboboxRoot>
        <ComboboxInput placeholder="搜索水果..." />
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {fruits.map((fruit) => (
                  <ComboboxItem key={fruit} value={fruit}>
                    {fruit}
                  </ComboboxItem>
                ))}
              </ComboboxList>
              <ComboboxEmpty>无匹配结果</ComboboxEmpty>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    </div>
  );
};
