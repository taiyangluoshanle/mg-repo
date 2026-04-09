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
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Destructive", value: "destructive" },
      ],
      defaultValue: "primary",
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "SM", value: "sm" },
        { label: "MD", value: "md" },
        { label: "LG", value: "lg" },
      ],
      defaultValue: "md",
    },
    disabled: {
      type: "boolean",
      label: "Disabled",
      defaultValue: false,
    },
    className: {
      type: "text",
      label: "Preview Class Name",
      defaultValue: "",
      placeholder: "preview-class-name",
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
