import type { ReactNode } from "react";

export type SelectControl = {
  type: "select";
  label: string;
  options: { label: string; value: string }[];
  defaultValue: string;
};

export type BooleanControl = {
  type: "boolean";
  label: string;
  defaultValue: boolean;
};

export type TextControl = {
  type: "text";
  label: string;
  defaultValue: string;
  placeholder?: string;
};

export type RadioControl = {
  type: "radio";
  label: string;
  options: { label: string; value: string }[];
  defaultValue: string;
};

export type NumberControl = {
  type: "number";
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
};

export type InputControl = {
  type: "input";
  label: string;
  defaultValue: string;
  placeholder?: string;
};

export type PropControl =
  | SelectControl
  | BooleanControl
  | TextControl
  | RadioControl
  | NumberControl
  | InputControl

export type PlaygroundConfig = {
  componentName: string;
  importPath: string;
  controls: Record<string, PropControl>;
  childrenControl?: TextControl;
  render: (props: Record<string, unknown>) => ReactNode;
  className?: string;
};
