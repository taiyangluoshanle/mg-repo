"use client";

import { memo, useCallback } from "react";
import type {
  PropControl,
  SelectControl,
  BooleanControl,
  TextControl,
  RadioControl,
  NumberControl,
} from "./types";

type ControlProps<T extends PropControl> = {
  control: T;
  value: T["defaultValue"];
  onChange: (value: T["defaultValue"]) => void;
};

const inputClassName =
  "w-full rounded-md border px-2.5 py-1.5 text-sm outline-none transition-colors border-neutral-300 bg-white text-neutral-900 focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100";

const SelectControlComponent = ({
  control,
  value,
  onChange,
}: ControlProps<SelectControl>) => (
  <select
    className={inputClassName}
    value={value as string}
    onChange={(e) => onChange(e.target.value)}
    aria-label={control.label}
  >
    {control.options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

const BooleanControlComponent = ({
  control,
  value,
  onChange,
}: ControlProps<BooleanControl>) => {
  const isOn = value as boolean;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={control.label}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
        isOn
          ? "border-blue-500 bg-blue-500"
          : "border-neutral-300 bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-600"
      }`}
      onClick={() => onChange(!isOn)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange(!isOn);
        }
      }}
      tabIndex={0}
    >
      <span
        className="pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform"
        style={{
          transform: isOn ? "translateX(16px)" : "translateX(2px)",
        }}
      />
    </button>
  );
};

const TextControlComponent = ({
  control,
  value,
  onChange,
}: ControlProps<TextControl>) => (
  <input
    type="text"
    className={inputClassName}
    value={value as string}
    placeholder={control.placeholder}
    onChange={(e) => onChange(e.target.value)}
    aria-label={control.label}
  />
);

const RadioControlComponent = ({
  control,
  value,
  onChange,
}: ControlProps<RadioControl>) => (
  <div className="flex flex-wrap gap-1">
    {control.options.map((opt) => {
      const isActive = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
            isActive
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          }`}
          onClick={() => onChange(opt.value)}
          aria-label={opt.label}
          aria-pressed={isActive}
          tabIndex={0}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

const NumberControlComponent = ({
  control,
  value,
  onChange,
}: ControlProps<NumberControl>) => (
  <input
    type="number"
    className={inputClassName}
    value={value as number}
    min={control.min}
    max={control.max}
    step={control.step}
    onChange={(e) => onChange(Number(e.target.value))}
    aria-label={control.label}
  />
);

type PlaygroundControlProps = {
  name: string;
  control: PropControl;
  value: unknown;
  onValueChange: (name: string, value: unknown) => void;
};

const PlaygroundControl = memo(({
  name,
  control,
  value,
  onValueChange,
}: PlaygroundControlProps) => {
  const handleChange = useCallback(
    (v: unknown) => onValueChange(name, v),
    [name, onValueChange],
  );

  const renderControl = () => {
    switch (control.type) {
      case "select":
        return (
          <SelectControlComponent
            control={control}
            value={value as string}
            onChange={handleChange}
          />
        );
      case "boolean":
        return (
          <BooleanControlComponent
            control={control}
            value={value as boolean}
            onChange={handleChange}
          />
        );
      case "text":
        return (
          <TextControlComponent
            control={control}
            value={value as string}
            onChange={handleChange}
          />
        );
      case "radio":
        return (
          <RadioControlComponent
            control={control}
            value={value as string}
            onChange={handleChange}
          />
        );
      case "number":
        return (
          <NumberControlComponent
            control={control}
            value={value as number}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {control.label}
        </label>
        {control.type !== "boolean" && (
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
            {name}
          </span>
        )}
      </div>
      {control.type === "boolean" ? (
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
            {name}
          </span>
          {renderControl()}
        </div>
      ) : (
        renderControl()
      )}
    </div>
  );
});

PlaygroundControl.displayName = "PlaygroundControl";

export { PlaygroundControl };
