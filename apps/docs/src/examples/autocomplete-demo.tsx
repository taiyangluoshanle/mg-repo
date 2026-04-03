"use client";

import {
  AutocompleteRoot,
  ComboboxInput,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
} from "@mg/ui";

const cities = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "南京"];

export const AutocompleteBasicDemo = () => {
  return (
    <div className="w-full max-w-sm">
      <AutocompleteRoot>
        <ComboboxInput placeholder="输入城市名..." />
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {cities.map((city) => (
                  <ComboboxItem key={city} value={city}>
                    {city}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </AutocompleteRoot>
    </div>
  );
};
