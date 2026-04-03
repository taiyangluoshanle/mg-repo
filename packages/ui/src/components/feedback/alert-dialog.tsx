"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const confirmVariants = cva(
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-foreground-inverse hover:bg-brand-hover",
        destructive: "bg-error text-foreground-inverse hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertDialogProps
  extends VariantProps<typeof confirmVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  className,
}: AlertDialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const handleCancel = React.useCallback(() => {
    onCancel?.();
    onOpenChange(false);
  }, [onCancel, onOpenChange]);

  const handleConfirm = React.useCallback(() => {
    onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);

  if (!open || !mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-background-inverse/40 backdrop-blur-[1px]"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="mg-alert-dialog-title"
          aria-describedby={
            description != null ? "mg-alert-dialog-desc" : undefined
          }
          className={cn(
            "relative z-[101] w-full max-w-md rounded-xl border border-border bg-background p-6 text-foreground shadow-xl",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="mg-alert-dialog-title"
            className="text-lg font-semibold leading-none"
          >
            {title}
          </h2>
          {description != null ? (
            <p
              id="mg-alert-dialog-desc"
              className="mt-2 text-sm text-foreground-secondary"
            >
              {description}
            </p>
          ) : null}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-surface-hover"
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={cn(confirmVariants({ variant }))}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
AlertDialog.displayName = "AlertDialog";
