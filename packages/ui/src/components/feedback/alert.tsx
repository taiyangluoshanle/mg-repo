import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "border-l-4 border-l-info bg-info/5 text-foreground",
        success: "border-l-4 border-l-success bg-success/5 text-foreground",
        warning: "border-l-4 border-l-warning bg-warning/5 text-foreground",
        error: "border-l-4 border-l-error bg-error/5 text-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string;
    icon?: ReactNode;
  };

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
        <div className="flex-1">
          {title && <p className="mb-1 font-medium leading-none">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert, alertVariants, type AlertProps };
