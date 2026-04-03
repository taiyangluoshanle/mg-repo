"use client";

import * as React from "react";
import { Form as BaseForm } from "@base-ui/react/form";
import { Field } from "@base-ui/react/field";
import { cn } from "@mg/utils";

const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentPropsWithoutRef<typeof BaseForm>
>(({ className, ...props }, ref) => (
  <BaseForm ref={ref} className={cn("space-y-4", className)} {...props} />
));
Form.displayName = "Form";

const FormField = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Field.Root>
>(({ className, ...props }, ref) => (
  <Field.Root ref={ref} className={cn("space-y-1.5", className)} {...props} />
));
FormField.displayName = "FormField";

const FormLabel = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof Field.Label>
>(({ className, ...props }, ref) => (
  <Field.Label
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const r of refs) {
      if (r == null) continue;
      if (typeof r === "function") {
        r(node);
      } else {
        (r as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <Field.Error
    render={(htmlProps) => {
      const { ref: innerRef, className: innerClassName, ...rest } = htmlProps;
      return (
        <p
          role="alert"
          {...props}
          {...rest}
          ref={mergeRefs(ref, innerRef)}
          className={cn(
            "text-sm text-destructive",
            className,
            innerClassName,
          )}
        />
      );
    }}
  />
));
FormMessage.displayName = "FormMessage";

export { Form, FormField, FormLabel, FormMessage };
