"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@mg/utils";

type ComponentPreviewProps = {
  children: ReactNode;
  className?: string;
};

const ComponentPreview = ({ children, className }: ComponentPreviewProps) => {
  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-[10px] border",
        className,
      )}
      style={{ borderColor: "var(--neutral-700)" }}
    >
      <div
        className="flex min-h-[160px] items-center justify-center p-8"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(41,151,255,0.03) 0%, var(--neutral-950) 70%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
ComponentPreview.displayName = "ComponentPreview";

type ComponentShowcaseProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  code?: ReactNode;
  className?: string;
};

const ComponentShowcase = ({
  title,
  description,
  children,
  code,
  className,
}: ComponentShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-[10px] border",
        className,
      )}
      style={{ borderColor: "var(--neutral-700)" }}
    >
      {(title || description) && (
        <div
          className="border-b px-4 py-3"
          style={{
            borderColor: "var(--neutral-700)",
            background: "var(--neutral-900)",
          }}
        >
          {title && (
            <p className="text-sm font-medium" style={{ color: "var(--neutral-50)" }}>
              {title}
            </p>
          )}
          {description && (
            <p className="mt-0.5 text-xs" style={{ color: "var(--neutral-400)" }}>
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className="flex border-b"
        style={{
          borderColor: "var(--neutral-700)",
          background: "var(--neutral-900)",
        }}
      >
        <button
          type="button"
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
          )}
          style={{
            color:
              activeTab === "preview"
                ? "#2997ff"
                : "var(--neutral-400)",
          }}
          onClick={() => setActiveTab("preview")}
        >
          预览
          {activeTab === "preview" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "#2997ff" }}
            />
          )}
        </button>
        <button
          type="button"
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
          )}
          style={{
            color:
              activeTab === "code"
                ? "#2997ff"
                : "var(--neutral-400)",
          }}
          onClick={() => setActiveTab("code")}
        >
          代码
          {activeTab === "code" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "#2997ff" }}
            />
          )}
        </button>
      </div>

      {activeTab === "preview" ? (
        <div
          className="flex min-h-[160px] items-center justify-center p-8"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(41,151,255,0.03) 0%, var(--neutral-950) 70%)",
          }}
        >
          {children}
        </div>
      ) : (
        <div className="[&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0">
          {code}
        </div>
      )}
    </div>
  );
};
ComponentShowcase.displayName = "ComponentShowcase";

export { ComponentPreview, ComponentShowcase };
export type { ComponentPreviewProps, ComponentShowcaseProps };
