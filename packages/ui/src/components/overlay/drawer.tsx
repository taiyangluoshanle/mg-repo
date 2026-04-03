"use client";

import * as React from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

// ─── Styled sub-parts ───

export const DrawerRoot = (props: React.ComponentPropsWithoutRef<typeof BaseDrawer.Root>) => (
  <BaseDrawer.Root {...props} />
);
DrawerRoot.displayName = "DrawerRoot";

export const DrawerProvider = BaseDrawer.Provider;

export const DrawerTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Trigger>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Trigger ref={ref} className={cn("", className)} {...props} />
  ),
);
DrawerTrigger.displayName = "DrawerTrigger";

export const DrawerPortal = BaseDrawer.Portal;

export const DrawerBackdrop = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Backdrop
      ref={ref}
      className={cn("fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0", className)}
      {...props}
    />
  ),
);
DrawerBackdrop.displayName = "DrawerBackdrop";

export const DrawerViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Viewport>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Viewport ref={ref} className={cn("fixed inset-0 z-[101] flex", className)} {...props} />
  ),
);
DrawerViewport.displayName = "DrawerViewport";

const drawerPopupVariants = cva("fixed z-[101] border-border bg-background text-foreground shadow-xl transition-transform duration-300 ease-out", {
  variants: {
    side: {
      left: "bottom-0 left-0 top-0 w-full max-w-sm border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
      right: "bottom-0 right-0 top-0 w-full max-w-sm border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
      top: "left-0 right-0 top-0 max-h-[85vh] border-b data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full",
      bottom: "bottom-0 left-0 right-0 max-h-[85vh] border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
    },
  },
  defaultVariants: { side: "right" },
});

export const DrawerPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDrawer.Popup> & VariantProps<typeof drawerPopupVariants>
>(({ className, side = "right", ...props }, ref) => (
  <BaseDrawer.Popup ref={ref} className={cn(drawerPopupVariants({ side }), className)} {...props} />
));
DrawerPopup.displayName = "DrawerPopup";

export const DrawerContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Content>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Content ref={ref} className={cn("p-6", className)} {...props} />
  ),
);
DrawerContent.displayName = "DrawerContent";

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Title>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  ),
);
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseDrawer.Description>
>(({ className, ...props }, ref) => (
  <BaseDrawer.Description ref={ref} className={cn("text-sm text-neutral-500", className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

export const DrawerClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.Close>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Close ref={ref} className={cn("rounded-md p-1 hover:bg-neutral-100", className)} {...props} />
  ),
);
DrawerClose.displayName = "DrawerClose";

export const DrawerSwipeArea = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseDrawer.SwipeArea>>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.SwipeArea ref={ref} className={cn("", className)} {...props} />
  ),
);
DrawerSwipeArea.displayName = "DrawerSwipeArea";

export const DrawerIndent = BaseDrawer.Indent;
export const DrawerIndentBackground = BaseDrawer.IndentBackground;

// ─── Backward-compatible composed component ───

const sideToSwipeDirection: Record<string, "left" | "right" | "up" | "down"> = {
  left: "left",
  right: "right",
  top: "up",
  bottom: "down",
};

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof drawerPopupVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, side = "right", children, className, ...props }: DrawerProps) {
  const s = side ?? "right";
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} swipeDirection={sideToSwipeDirection[s]}>
      <BaseDrawer.Portal>
        <DrawerBackdrop />
        <DrawerPopup side={s} className={className} {...props}>
          <DrawerContent>{children}</DrawerContent>
        </DrawerPopup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
Drawer.displayName = "Drawer";
