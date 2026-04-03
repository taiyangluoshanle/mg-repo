import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const tagVariants = cva(
  "inline-flex max-w-full items-center gap-1 rounded-md border font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background-secondary text-foreground",
        primary: "border-transparent bg-brand text-background",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-amber-900 dark:text-amber-200",
        error:
          "border-destructive/20 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  closable?: boolean;
  onClose?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(
        "px-2.5 py-1 text-sm",
        tagVariants({ variant }),
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      {closable ? (
        <button
          type="button"
          className={cn(
            "-mr-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded",
            "text-foreground-secondary hover:bg-background hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
          )}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          <span className="text-base leading-none" aria-hidden>
            ×
          </span>
        </button>
      ) : null}
    </span>
  ),
);

Tag.displayName = "Tag";
