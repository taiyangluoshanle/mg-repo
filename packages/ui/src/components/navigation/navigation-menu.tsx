"use client";
import * as React from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { cn } from "@mg/utils";

export type NavigationMenuRootProps = React.ComponentPropsWithoutRef<typeof NavigationMenu.Root>;
export const NavigationMenuRoot = React.forwardRef<HTMLElement, NavigationMenuRootProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Root ref={ref} className={cn("relative", className)} {...props} />
  ),
);
NavigationMenuRoot.displayName = "NavigationMenuRoot";

export const NavigationMenuList = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.List>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.List ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
  ),
);
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Item>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Item ref={ref} className={cn("relative", className)} {...props} />
  ),
);
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Trigger ref={ref} className={cn("inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-600 data-[popup-open]:bg-neutral-100", className)} {...props} />
  ),
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Content>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Content ref={ref} className={cn("p-4", className)} {...props} />
  ),
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Link>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Link ref={ref} className={cn("block rounded-md px-3 py-2 text-sm hover:bg-neutral-100 data-[active]:font-medium data-[active]:text-blue-600", className)} {...props} />
  ),
);
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuPortal = NavigationMenu.Portal;

export const NavigationMenuPositioner = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Positioner>>(
  ({ className, sideOffset = 8, ...props }, ref) => (
    <NavigationMenu.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] data-[instant]:transition-none",
        className,
      )}
      {...props}
    />
  ),
);
NavigationMenuPositioner.displayName = "NavigationMenuPositioner";

export const NavigationMenuPopup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Popup>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Popup
      ref={ref}
      className={cn(
        "relative origin-[var(--transform-origin)] rounded-lg border border-neutral-200 bg-white shadow-lg transition-[opacity,transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
        className,
      )}
      {...props}
    />
  ),
);
NavigationMenuPopup.displayName = "NavigationMenuPopup";

export const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Viewport>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Viewport ref={ref} className={cn("relative h-full w-full overflow-hidden", className)} {...props} />
  ),
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export const NavigationMenuArrow = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof NavigationMenu.Arrow>>(
  ({ className, ...props }, ref) => (
    <NavigationMenu.Arrow ref={ref} className={cn("fill-white stroke-neutral-200", className)} {...props} />
  ),
);
NavigationMenuArrow.displayName = "NavigationMenuArrow";

export const NavigationMenuBackdrop = NavigationMenu.Backdrop;
export const NavigationMenuIcon = NavigationMenu.Icon;
