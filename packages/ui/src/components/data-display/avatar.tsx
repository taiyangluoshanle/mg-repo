"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { forwardRef, type ComponentPropsWithoutRef, type ImgHTMLAttributes } from "react";
import { cn } from "@mg/utils";

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

export type AvatarSize = keyof typeof sizeClasses;

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAvatar.Root>, "children"> {
  src?: ImgHTMLAttributes<HTMLImageElement>["src"];
  alt?: string;
  fallback: string;
  size?: AvatarSize;
}

function initialsFromFallback(fallback: string): string {
  const trimmed = fallback.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "",
      fallback,
      size = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <BaseAvatar.Root
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background-secondary text-foreground-secondary",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {src ? (
          <BaseAvatar.Image
            src={src}
            alt={alt}
            className="size-full object-cover"
          />
        ) : null}
        <BaseAvatar.Fallback
          className="font-medium text-foreground"
          delay={0}
          aria-hidden
        >
          {initialsFromFallback(fallback)}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    );
  },
);

Avatar.displayName = "Avatar";
