"use client";

import * as React from "react";
import { cn } from "@mg/utils";

type RadioGroupContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  name: string;
  disabled?: boolean;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

function useRadioGroupContext(component: string): RadioGroupContextValue {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within RadioGroup`);
  }
  return ctx;
}

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      name: nameProp,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const autoName = React.useId();
    const name = nameProp ?? `radio-group-${autoName}`;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | undefined
    >(defaultValue);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolledValue;

    const onValueChangeInner = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const contextValue = React.useMemo<RadioGroupContextValue>(
      () => ({
        value,
        onValueChange: onValueChangeInner,
        name,
        disabled,
      }),
      [value, onValueChangeInner, name, disabled],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export type RadioItemProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "size"
> & {
  value: string;
  label: string;
};

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, id, value, label, disabled: disabledProp, ...props }, ref) => {
    const ctx = useRadioGroupContext("RadioItem");
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const disabled = disabledProp ?? ctx.disabled;
    const checked = ctx.value === value;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-start gap-2",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            name={ctx.name}
            value={value}
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            onChange={() => {
              if (!disabled) {
                ctx.onValueChange(value);
              }
            }}
            {...props}
          />
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background transition-colors",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              "peer-checked:border-brand peer-checked:[&>span]:scale-100",
            )}
            aria-hidden
          >
            <span className="h-2 w-2 scale-0 rounded-full bg-brand transition-transform" />
          </span>
        </span>
        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  },
);

RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem };
