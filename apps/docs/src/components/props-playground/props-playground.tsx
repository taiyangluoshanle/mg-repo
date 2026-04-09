"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import type { PlaygroundConfig } from "./types";
import { PlaygroundControl } from "./controls";
import { generateCode } from "./code-generator";

type PropsPlaygroundProps = {
  config: PlaygroundConfig;
};

const initializeValues = (
  config: PlaygroundConfig,
): Record<string, unknown> => {
  const values: Record<string, unknown> = {};
  for (const [key, control] of Object.entries(config.controls)) {
    values[key] = control.defaultValue;
  }
  if (config.childrenControl) {
    values.children = config.childrenControl.defaultValue;
  }
  return values;
};

const PropsPlayground = ({ config }: PropsPlaygroundProps) => {
  const [values, setValues] = useState(() => initializeValues(config));

  const handleChange = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(initializeValues(config));
  }, [config]);

  const deferredValues = useDeferredValue(values);

  const code = useMemo(
    () =>
      generateCode(
        config,
        deferredValues,
        deferredValues.children as string | undefined,
      ),
    [config, deferredValues],
  );

  const renderedComponent = useMemo(
    () => config.render(deferredValues),
    [config, deferredValues],
  );

  return (
    <div className="not-prose my-6 overflow-hidden rounded-[10px] border border-neutral-200 dark:border-neutral-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
          {config.componentName} Playground
        </span>
        <button
          type="button"
          className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          onClick={handleReset}
          aria-label="Reset to defaults"
          tabIndex={0}
        >
          重置
        </button>
      </div>

      {/* Preview + Controls */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
        {/* Preview Area — always dark for neutral component backdrop */}
        <div
          className="flex min-h-[200px] items-center justify-center border-b border-neutral-200 p-8 md:border-b-0 md:border-r dark:border-neutral-700"

        >
          {renderedComponent}
        </div>

        {/* Controls Panel */}
        <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto bg-neutral-100 p-4 dark:bg-neutral-900/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            属性控制
          </p>

          {Object.entries(config.controls).map(([name, control]) => (
            <PlaygroundControl
              key={name}
              name={name}
              control={control}
              value={values[name]}
              onValueChange={handleChange}
            />
          ))}

          {config.childrenControl && (
            <PlaygroundControl
              name="children"
              control={config.childrenControl}
              value={values.children}
              onValueChange={handleChange}
            />
          )}
        </div>
      </div>

      {/* Code Output — always dark */}
      <div className="border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center border-b border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-900">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            代码
          </span>
        </div>
        <div
          className="overflow-x-auto p-4"
          style={{ background: "#161617" }}
        >
          <pre className="font-mono text-sm leading-relaxed text-neutral-200">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

PropsPlayground.displayName = "PropsPlayground";

export { PropsPlayground };
export type { PropsPlaygroundProps };
