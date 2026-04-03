import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@mg/utils";

export const Accordion = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("divide-y divide-border rounded-lg border border-border", className)}
    {...props}
  />
));
Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      className,
      title,
      children,
      defaultOpen = false,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const contentId = useId();
    const triggerId = `${contentId}-trigger`;

    return (
      <div ref={ref} className={cn("bg-background", className)} {...props}>
        <button
          id={triggerId}
          type="button"
          className={cn(
            "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-foreground",
            "hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
          )}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="min-w-0 flex-1">{title}</span>
          <span
            className={cn(
              "shrink-0 text-foreground-secondary transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          >
            ▼
          </span>
        </button>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className="border-t border-border px-4 pb-4 pt-2 text-sm text-foreground-secondary"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AccordionItem.displayName = "AccordionItem";
