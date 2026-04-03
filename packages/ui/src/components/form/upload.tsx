"use client";

import * as React from "react";
import { cn } from "@mg/utils";

export type UploadProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange" | "children"
> & {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  /** Visible label in the drop zone. */
  label?: React.ReactNode;
  /** Optional hint below the label. */
  description?: React.ReactNode;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<"input">,
    "type" | "accept" | "multiple" | "onChange" | "className"
  >;
};

const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      accept,
      multiple,
      onFilesChange,
      label = "Drag files here or click to browse",
      description,
      inputProps,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const emitFiles = React.useCallback(
      (fileList: FileList | null) => {
        if (!fileList?.length) {
          return;
        }
        onFilesChange?.(Array.from(fileList));
      },
      [onFilesChange],
    );

    const openPicker = () => {
      inputRef.current?.click();
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.currentTarget === e.target) {
            setIsDragging(false);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          emitFiles(e.dataTransfer.files);
        }}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            emitFiles(e.target.files);
            e.target.value = "";
          }}
          {...inputProps}
        />
        <button
          type="button"
          onClick={openPicker}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-background px-6 py-10 text-center transition-colors",
            "hover:border-brand hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            isDragging && "border-brand bg-brand/5",
          )}
        >
          <span className="text-sm font-medium text-foreground">{label}</span>
          {description ? (
            <span className="text-xs text-foreground-muted">{description}</span>
          ) : null}
        </button>
      </div>
    );
  },
);

Upload.displayName = "Upload";

export { Upload };
