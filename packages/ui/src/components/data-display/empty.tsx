import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="text-foreground-secondary [&_svg]:size-10">{icon}</div>
      ) : null}
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">{title}</p>
        {description ? (
          <p className="max-w-sm text-sm text-foreground-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  ),
);

Empty.displayName = "Empty";
