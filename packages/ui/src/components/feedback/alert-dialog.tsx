"use client";

import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
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

export interface AlertDialogProps extends VariantProps<typeof confirmVariants> {
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
  const handleConfirm = React.useCallback(() => {
    onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);

  return (
    <BaseAlertDialog.Root open={open} onOpenChange={(nextOpen) => onOpenChange(nextOpen)}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="fixed inset-0 z-[100] bg-background-inverse/40 backdrop-blur-[1px] transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <BaseAlertDialog.Popup
            className={cn(
              "relative z-[101] w-full max-w-md rounded-xl border border-border bg-background p-6 text-foreground shadow-xl transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              className,
            )}
          >
            <BaseAlertDialog.Title
              id="mg-alert-dialog-title"
              className="text-lg font-semibold leading-none"
            >
              {title}
            </BaseAlertDialog.Title>
            {description != null ? (
              <BaseAlertDialog.Description
                id="mg-alert-dialog-desc"
                className="mt-2 text-sm text-foreground-secondary"
              >
                {description}
              </BaseAlertDialog.Description>
            ) : null}
            <div className="mt-6 flex justify-end gap-2">
              <BaseAlertDialog.Close
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-surface-hover"
                onClick={() => {
                  onCancel?.();
                }}
              >
                {cancelText}
              </BaseAlertDialog.Close>
              <button
                type="button"
                className={cn(confirmVariants({ variant }))}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            </div>
          </BaseAlertDialog.Popup>
        </div>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
AlertDialog.displayName = "AlertDialog";
