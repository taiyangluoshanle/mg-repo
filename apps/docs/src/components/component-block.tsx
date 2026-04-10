"use client";

import { useCallback, useState, type ReactNode } from "react";
import { cn } from "@mg/utils";

type Tab = "preview" | "code" | "cli";
type PkgManager = "pnpm" | "npm" | "yarn" | "bun";

const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

const FileCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m10 13-2 2 2 2" />
    <path d="m14 17 2-2-2-2" />
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const getInstallCommand = (pkg: string, manager: PkgManager): string => {
  switch (manager) {
    case "pnpm":
      return `pnpm add ${pkg}`;
    case "npm":
      return `npm install ${pkg}`;
    case "yarn":
      return `yarn add ${pkg}`;
    case "bun":
      return `bun add ${pkg}`;
  }
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      aria-label="复制代码"
      tabIndex={0}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

type ComponentBlockProps = {
  children: ReactNode;
  code?: string;
  cli?: string;
  className?: string;
};

const tabConfig: { key: Tab; label: string; Icon: () => ReactNode }[] = [
  { key: "preview", label: "Preview", Icon: MonitorIcon },
  { key: "code", label: "Code", Icon: FileCodeIcon },
  { key: "cli", label: "CLI", Icon: TerminalIcon },
];

const pkgManagers: PkgManager[] = ["pnpm", "npm", "yarn", "bun"];

const ComponentBlock = ({ children, code, cli, className }: ComponentBlockProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [activePkg, setActivePkg] = useState<PkgManager>("pnpm");

  const availableTabs = tabConfig.filter((t) => {
    if (t.key === "code" && !code) return false;
    if (t.key === "cli" && !cli) return false;
    return true;
  });

  return (
    <div className={cn("not-prose my-6 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800", className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-950">
        {availableTabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
              activeTab === key
                ? "bg-neutral-100 text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300",
            )}
            tabIndex={0}
            aria-label={label}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      {/* Preview */}
      {activeTab === "preview" && (
        <div className="flex min-h-[200px] items-center justify-center bg-white p-10 dark:bg-neutral-950">
          {children}
        </div>
      )}

      {/* Code */}
      {activeTab === "code" && code && (
        <div className="relative bg-neutral-50 dark:bg-neutral-950">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton text={code} />
          </div>
          <pre className="m-0! rounded-none! border-0! overflow-x-auto p-4 text-[13px] leading-relaxed">
            <code className="text-neutral-800 dark:text-neutral-200">{code}</code>
          </pre>
        </div>
      )}

      {/* CLI */}
      {activeTab === "cli" && cli && (
        <div className="bg-white dark:bg-neutral-950">
          <div className="flex items-center gap-0 border-b border-neutral-200 px-4 dark:border-neutral-800">
            {pkgManagers.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setActivePkg(pm)}
                className={cn(
                  "px-3 py-2.5 text-[13px] font-medium transition-colors",
                  activePkg === pm
                    ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300",
                )}
                tabIndex={0}
                aria-label={pm}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="relative flex items-center px-4 py-4">
            <code className="flex-1 text-[13px] text-neutral-600 dark:text-neutral-400">
              {getInstallCommand(cli, activePkg)}
            </code>
            <CopyButton text={getInstallCommand(cli, activePkg)} />
          </div>
        </div>
      )}
    </div>
  );
};
ComponentBlock.displayName = "ComponentBlock";

export { ComponentBlock };
export type { ComponentBlockProps };
