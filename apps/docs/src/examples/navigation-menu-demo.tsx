"use client";

import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
  NavigationMenuIcon,
} from "@mg/ui";

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const NavigationMenuBasicDemo = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            产品
            <NavigationMenuIcon className="transition-transform duration-200 data-[popup-open]:rotate-180">
              <ChevronDownIcon />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid list-none gap-1 p-0">
              <li>
                <NavigationMenuLink href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                  组件库
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                  工具集
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                  主题包
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            资源
            <NavigationMenuIcon className="transition-transform duration-200 data-[popup-open]:rotate-180">
              <ChevronDownIcon />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid list-none gap-1 p-0">
              <li>
                <NavigationMenuLink href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                  博客
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                  教程
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#">文档</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenuRoot>
  );
};
