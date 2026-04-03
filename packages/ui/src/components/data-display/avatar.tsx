import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from "react";
import { cn } from "@mg/utils";

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

export type AvatarSize = keyof typeof sizeClasses;

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
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

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
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
    const [imageFailed, setImageFailed] = useState(false);
    const showImage = Boolean(src) && !imageFailed;

    useEffect(() => {
      setImageFailed(false);
    }, [src]);

    const handleError = useCallback(() => {
      setImageFailed(true);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background-secondary text-foreground-secondary",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={handleError}
          />
        ) : (
          <span className="font-medium text-foreground" aria-hidden>
            {initialsFromFallback(fallback)}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
