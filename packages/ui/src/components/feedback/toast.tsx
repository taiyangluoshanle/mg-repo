"use client";

import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn } from "@mg/utils";

export type ToastVariant = "default" | "success" | "error";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

const toastItemVariants = cva(
  "pointer-events-auto w-full max-w-sm rounded-lg border border-border bg-background p-4 text-foreground shadow-lg transition-[opacity,transform]",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-success/40 bg-surface",
        error: "border-error/40 bg-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider timeout={5000} limit={50}>
      {children}
      <Toaster />
    </Toast.Provider>
  );
}
ToastProvider.displayName = "ToastProvider";

export function useToast(): { toast: (options: ToastOptions) => void } {
  const { add } = Toast.useToastManager();
  const toast = React.useCallback(
    (options: ToastOptions) => {
      add({
        title: options.title,
        description: options.description,
        timeout: options.duration ?? 5000,
        type: options.variant ?? "default",
      });
    },
    [add],
  );
  return { toast };
}

/** Renders the toast stack. Place inside `ToastProvider` (already included by default). */
export function Toaster() {
  const { toasts } = Toast.useToastManager();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return (
    <Toast.Portal>
      <Toast.Viewport
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <Toast.Root
            key={t.id}
            toast={t}
            className={(state) =>
              cn(
                toastItemVariants({
                  variant: (state.type as ToastVariant) ?? "default",
                }),
                "pointer-events-auto transition-[opacity,transform] duration-300 data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0 data-[ending-style]:translate-x-full data-[ending-style]:opacity-0 data-[swipe-direction=right]:data-[ending-style]:translate-x-[var(--toast-swipe-end-x)]",
              )
            }
          >
            <div className="flex justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1">
                <Toast.Title className="text-sm font-semibold leading-tight" />
                <Toast.Description className="text-sm text-foreground-secondary" />
              </div>
              <Toast.Close
                type="button"
                className="shrink-0 rounded-md p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                aria-label="Dismiss"
              >
                ×
              </Toast.Close>
            </div>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
Toaster.displayName = "Toaster";
