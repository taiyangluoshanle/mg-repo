import type { PlaygroundConfig, PropControl } from "./types";

const isDefaultValue = (control: PropControl, value: unknown): boolean => {
  return value === control.defaultValue;
};

const formatPropValue = (
  name: string,
  value: unknown,
  control: PropControl,
): string | null => {
  if (isDefaultValue(control, value)) return null;

  if (control.type === "boolean") {
    return (value as boolean) ? name : `${name}={false}`;
  }

  if (control.type === "number") {
    return `${name}={${value}}`;
  }

  return `${name}="${value}"`;
};

export const generateCode = (
  config: PlaygroundConfig,
  props: Record<string, unknown>,
  children?: string,
): string => {
  const propStrings: string[] = [];

  for (const [name, control] of Object.entries(config.controls)) {
    const formatted = formatPropValue(name, props[name], control);
    if (formatted) propStrings.push(formatted);
  }

  const propsStr = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : "";
  const childrenStr = children ?? config.childrenControl?.defaultValue ?? "";
  const tag = config.componentName;

  if (!childrenStr) {
    return `import { ${tag} } from '${config.importPath}';\n\n<${tag}${propsStr} />`;
  }

  if (propsStr.length > 40) {
    const indentedProps = propStrings.map((p) => `  ${p}`).join("\n");
    return `import { ${tag} } from '${config.importPath}';\n\n<${tag}\n${indentedProps}\n>\n  ${childrenStr}\n</${tag}>`;
  }

  return `import { ${tag} } from '${config.importPath}';\n\n<${tag}${propsStr}>\n  ${childrenStr}\n</${tag}>`;
};
