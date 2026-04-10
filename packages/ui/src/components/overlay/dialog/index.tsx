"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@mg/utils";

/* ────────────────────────────────────────────────────────── */
/*  Types                                                     */
/* ────────────────────────────────────────────────────────── */

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogProps {
  /** 是否显示 */
  open: boolean;
  /** 状态变化回调 */
  onOpenChange: (open: boolean) => void;

  /* ── 内容 ── */
  /** 标题（传 null 可隐藏标题栏） */
  title?: React.ReactNode;
  /** 描述文本（不传则用 title 作为 aria-describedby） */
  description?: React.ReactNode;
  /** 主体内容 */
  children?: React.ReactNode;
  /** 底部操作区 */
  footer?: React.ReactNode;

  /* ── 行为 ── */
  /** 弹窗尺寸 @default "md" */
  size?: DialogSize;
  /** 是否显示关闭按钮 @default true */
  showCloseButton?: boolean;
  /** 禁止点击遮罩关闭 @default false */
  disableBackdropClick?: boolean;
  /** 禁止 ESC 关闭 @default false */
  disableEscapeKey?: boolean;
  /** 关闭后是否销毁内容 @default true */
  destroyOnClose?: boolean;
  /** 加载状态：显示遮罩 + 阻止关闭 @default false */
  loading?: boolean;
  /** 自动关闭延时（ms） */
  timeout?: number;
  /** 打开后初始聚焦的元素 */
  initialFocus?: React.RefObject<HTMLElement | null>;

  /* ── 样式 ── */
  /** 弹窗面板类名 */
  className?: string;
  /** 遮罩层类名 */
  overlayClassName?: string;
  /** 标题区类名 */
  headerClassName?: string;
  /** 主体区类名 */
  contentClassName?: string;
  /** 底部区类名 */
  footerClassName?: string;
  /** 关闭按钮类名 */
  closeButtonClassName?: string;
}

/* ────────────────────────────────────────────────────────── */
/*  Size map                                                  */
/* ────────────────────────────────────────────────────────── */

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)]",
};

/* ────────────────────────────────────────────────────────── */
/*  Close icon (inline SVG, avoid external dependency)        */
/* ────────────────────────────────────────────────────────── */

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

/* ────────────────────────────────────────────────────────── */
/*  Loading spinner                                           */
/* ────────────────────────────────────────────────────────── */

const LoadingOverlay = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/60">
    <svg
      className="h-6 w-6 animate-spin text-foreground-muted"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/*  Dialog                                                    */
/* ────────────────────────────────────────────────────────── */

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  disableBackdropClick = false,
  disableEscapeKey = false,
  destroyOnClose = true,
  loading = false,
  timeout,
  initialFocus,
  className,
  overlayClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  closeButtonClassName,
}) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeReasonRef = React.useRef<"backdrop" | "escape" | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!open || !timeout) return;
    timerRef.current = setTimeout(() => onOpenChange(false), timeout);
    return clearTimer;
  }, [open, timeout, onOpenChange, clearTimer]);

  React.useEffect(() => {
    if (!open || !initialFocus?.current) return;
    const frame = requestAnimationFrame(() => initialFocus.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, initialFocus]);

  /**
   * Base UI 的 dismiss 机制在 document 层级监听，无法通过
   * stopPropagation 在元素级别拦截。因此用 ref 标记关闭来源，
   * 在 onOpenChange 回调中根据来源 + 配置决定是否放行。
   */
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next) {
        const reason = closeReasonRef.current;
        closeReasonRef.current = null;

        if (loading) return;
        if (reason === "backdrop" && disableBackdropClick) return;
        if (reason === "escape" && disableEscapeKey) return;
      }
      clearTimer();
      onOpenChange(next);
    },
    [loading, disableBackdropClick, disableEscapeKey, clearTimer, onOpenChange],
  );

  const handleBackdropPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeReasonRef.current = "backdrop";
      }
    },
    [],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeReasonRef.current = "escape";
      }
    },
    [],
  );

  const hasTitle = title !== null && title !== undefined;
  const hasFooter = footer !== null && footer !== undefined;

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal keepMounted={!destroyOnClose}>
        {/* ── Backdrop ── */}
        <BaseDialog.Backdrop
          className={cn(
            "fixed inset-0 z-100 bg-background-inverse/40 backdrop-blur-xs",
            "transition-opacity duration-250 ease-out will-change-[opacity]",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            overlayClassName,
          )}
        />

        {/* ── Centering layer (接收 Popup 外部的点击) ── */}
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          onPointerDown={handleBackdropPointerDown}
        >
          {/* ── Popup ── */}
          <BaseDialog.Popup
            className={cn(
              "relative flex w-full flex-col rounded-xl",
              "border border-border bg-background text-foreground shadow-xl",
              "transition-[opacity,transform] duration-250 ease-out will-change-[opacity,transform]",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              sizeClasses[size],
              size === "full" && "h-full",
              className,
            )}
            onKeyDown={handleKeyDown}
          >
            {loading && <LoadingOverlay />}

            {/* ── Header ── */}
            <div
              className={cn(
                "flex items-center justify-between",
                hasTitle ? "p-6 pb-0" : "h-0",
                headerClassName,
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <BaseDialog.Title
                  className={cn(
                    "text-lg font-semibold leading-none tracking-tight",
                    !hasTitle && "sr-only",
                  )}
                >
                  {title ?? "Dialog"}
                </BaseDialog.Title>
                {description ? (
                  <BaseDialog.Description className="text-sm text-foreground-secondary">
                    {description}
                  </BaseDialog.Description>
                ) : (
                  <BaseDialog.Description className="sr-only">
                    {typeof title === "string" ? title : "Dialog content"}
                  </BaseDialog.Description>
                )}
              </div>

              {showCloseButton && (
                <BaseDialog.Close
                  disabled={loading}
                  aria-label="关闭"
                  className={cn(
                    "ml-auto shrink-0 cursor-pointer rounded-full p-1.5",
                    "text-foreground-muted transition-colors",
                    "hover:bg-foreground/5 active:bg-foreground/10",
                    "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background",
                    "disabled:pointer-events-none disabled:opacity-40",
                    !hasTitle && "absolute right-3 top-3 z-10",
                    closeButtonClassName,
                  )}
                >
                  <CloseIcon />
                </BaseDialog.Close>
              )}
            </div>

            {/* ── Body ── */}
            <div
              className={cn(
                "flex-1 overflow-y-auto p-6",
                hasTitle && "pt-4",
                contentClassName,
              )}
            >
              {children}
            </div>

            {/* ── Footer ── */}
            {hasFooter && (
              <div
                className={cn(
                  "flex flex-col-reverse gap-2 border-t border-border p-6 pt-4",
                  "sm:flex-row sm:justify-end",
                  footerClassName,
                )}
              >
                {footer}
              </div>
            )}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};

Dialog.displayName = "Dialog";
