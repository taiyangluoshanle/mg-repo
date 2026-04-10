"use client";

import { Button } from "@mg/ui";
import {
  PropsPlayground,
  type PlaygroundConfig,
} from "@/components/props-playground";

const buttonPlaygroundConfig: PlaygroundConfig = {
  componentName: "Button",
  importPath: "@mg/ui",
  controls: {
    variant: {
      type: "select",
      label: "Variant",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Default", value: "default" },
        { label: "Dashed", value: "dashed" },
        { label: "Text", value: "text" },
        { label: "Link", value: "link" },
      ],
      defaultValue: "default",
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Large", value: "large" },
        { label: "Middle", value: "middle" },
        { label: "Small", value: "small" },
      ],
      defaultValue: "middle",
    },
    loading: {
      type: "boolean",
      label: "Loading",
      defaultValue: false,
    },
    disabled: {
      type: "boolean",
      label: "Disabled",
      defaultValue: false,
    },
    ghost: {
      type: "boolean",
      label: "Ghost",
      defaultValue: false,
    },
    danger: {
      type: "boolean",
      label: "Danger",
      defaultValue: false,
    },
    block: {
      type: "boolean",
      label: "Block",
      defaultValue: false,
    },
  },
  childrenControl: {
    type: "text",
    label: "Children",
    defaultValue: "Button",
    placeholder: "按钮文字",
  },
  render: (props) => {
    const { children, ...rest } = props;
    return <Button {...(rest as Record<string, unknown>)}>{children as string}</Button>;
  },
};

export const ButtonPlayground = () => (
  <PropsPlayground config={buttonPlaygroundConfig} />
);
