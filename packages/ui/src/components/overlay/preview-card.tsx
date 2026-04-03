"use client";

import * as React from "react";
import { PreviewCard } from "@base-ui/react/preview-card";
import { cn } from "@mg/utils";

export type PreviewCardRootProps = React.ComponentPropsWithoutRef<typeof PreviewCard.Root>;
export const PreviewCardRoot = (props: PreviewCardRootProps) => <PreviewCard.Root {...props} />;
PreviewCardRoot.displayName = "PreviewCardRoot";

export const PreviewCardTrigger = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof PreviewCard.Trigger>
>(({ className, ...props }, ref) => (
  <PreviewCard.Trigger
    ref={ref}
    className={cn("text-blue-600 underline decoration-dotted underline-offset-4 hover:text-blue-700", className)}
    {...props}
  />
));
PreviewCardTrigger.displayName = "PreviewCardTrigger";

export const PreviewCardPortal = PreviewCard.Portal;

export const PreviewCardPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof PreviewCard.Positioner>
>(({ className, ...props }, ref) => (
  <PreviewCard.Positioner ref={ref} className={cn("", className)} {...props} />
));
PreviewCardPositioner.displayName = "PreviewCardPositioner";

export const PreviewCardPopup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof PreviewCard.Popup>>(
  ({ className, ...props }, ref) => (
    <PreviewCard.Popup ref={ref} className={cn("w-80 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0", className)} {...props} />
  ),
);
PreviewCardPopup.displayName = "PreviewCardPopup";

export const PreviewCardArrow = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof PreviewCard.Arrow>>(
  ({ className, ...props }, ref) => (
    <PreviewCard.Arrow ref={ref} className={cn("fill-white stroke-neutral-200", className)} {...props} />
  ),
);
PreviewCardArrow.displayName = "PreviewCardArrow";

export const PreviewCardBackdrop = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof PreviewCard.Backdrop>>(
  ({ className, ...props }, ref) => (
    <PreviewCard.Backdrop ref={ref} className={cn("", className)} {...props} />
  ),
);
PreviewCardBackdrop.displayName = "PreviewCardBackdrop";

export const PreviewCardViewport = PreviewCard.Viewport;
