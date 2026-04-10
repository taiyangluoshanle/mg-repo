"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";

export interface CommerceDialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: (open: boolean) => void;
  title?: ReactNode;
  zIndex?: number;
  showClose?: boolean;
  closeIcon?: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
}

const DefaultCloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px] lg:h-6 lg:w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const CommerceDialog = forwardRef<HTMLDivElement, CommerceDialogProps>(
  (
    {
      className,
      open,
      onClose,
      title,
      zIndex = 50,
      showClose = true,
      closeIcon,
      overlayClassName,
      contentClassName,
      children,
      ...props
    },
    ref,
  ) => {
    if (!open) return null;

    return (
      <div ref={ref} className={cn("fixed inset-0", className)} style={{ zIndex }} role="dialog" aria-modal="true" {...props}>
        {/* Overlay */}
        <div
          className={cn("fixed inset-0 bg-black/40 animate-in fade-in-0", overlayClassName)}
          style={{ zIndex }}
          onClick={() => onClose(false)}
          aria-hidden="true"
        />
        {/* Content */}
        <div
          className={cn(
            "fixed flex max-h-[81vh] flex-col rounded-t-xl bg-white shadow-lg",
            "bottom-0 left-0 right-0",
            "lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:max-w-[960px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl lg:px-10 lg:py-6",
            "animate-in fade-in-0",
            contentClassName,
          )}
          style={{ zIndex }}
        >
          {showClose && (
            <button
              type="button"
              className={cn(
                "absolute flex cursor-pointer items-center justify-center rounded-full",
                "right-4 top-3.5 h-6 w-6 transition-colors hover:bg-neutral-100 active:bg-neutral-200",
                "lg:right-10 lg:top-6 lg:h-11 lg:w-11",
              )}
              onClick={() => onClose(false)}
              aria-label="关闭"
              tabIndex={0}
            >
              {closeIcon ?? <DefaultCloseIcon />}
            </button>
          )}
          {title && (
            <div className="mb-4 px-4 py-3.5 text-base font-medium text-neutral-900 lg:px-0 lg:py-2 lg:pr-18 lg:text-xl">
              {typeof title === "string" ? <h2>{title}</h2> : title}
            </div>
          )}
          <div className="overflow-y-auto overflow-x-hidden">{children}</div>
        </div>
      </div>
    );
  },
);

CommerceDialog.displayName = "CommerceDialog";
