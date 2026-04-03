"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "@mg/utils";

export type ToastVariant = "default" | "success" | "error";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastRecord {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastRecord[];
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

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

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  React.useEffect(() => {
    const id = window.setTimeout(() => onDismiss(t.id), t.duration);
    return () => window.clearTimeout(id);
  }, [t.id, t.duration, onDismiss]);

  return (
    <div
      role="status"
      className={cn(
        toastItemVariants({ variant: t.variant }),
        "animate-slide-down",
      )}
    >
      <div className="flex justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight">{t.title}</p>
          {t.description != null ? (
            <p className="text-sm text-foreground-secondary">{t.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="shrink-0 rounded-md p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
          aria-label="Dismiss"
          onClick={() => onDismiss(t.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
ToastItem.displayName = "ToastItem";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const record: ToastRecord = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "default",
      duration: options.duration ?? 5000,
    };
    setToasts((prev) => [...prev, record]);
  }, []);

  const value = React.useMemo<ToastContextValue>(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}
ToastProvider.displayName = "ToastProvider";

export function useToast(): Pick<ToastContextValue, "toast"> {
  const ctx = React.useContext(ToastContext);
  if (ctx == null) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return { toast: ctx.toast };
}

/** Renders the toast stack in a portal (top-right). Place inside `ToastProvider`. */
export function Toaster() {
  const ctx = React.useContext(ToastContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (ctx == null || !mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {ctx.toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={ctx.dismiss} />
      ))}
    </div>,
    document.body,
  );
}
Toaster.displayName = "Toaster";
