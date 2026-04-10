"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";
import { Collapse } from "./collapse";

export interface AccordionDataItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
}

export interface CommerceAccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items: AccordionDataItem[];
  defaultValue?: string;
  triggerClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  iconNode?: ReactNode;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={cn("h-4 w-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const CommerceAccordion = forwardRef<HTMLDivElement, CommerceAccordionProps>(
  ({ className, items, defaultValue, triggerClassName, itemClassName, contentClassName, iconNode, ...props }, ref) => {
    const [openValue, setOpenValue] = useState<string | null>(defaultValue ?? null);

    const handleToggle = (value: string) => {
      setOpenValue((prev) => (prev === value ? null : value));
    };

    return (
      <div ref={ref} className={cn("divide-y divide-border", className)} {...props}>
        {items.map((item) => {
          const isOpen = openValue === item.value;
          return (
            <div key={item.value} className={cn("py-0", itemClassName)}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-4 text-left font-medium transition-colors hover:text-foreground",
                  triggerClassName,
                )}
                onClick={() => handleToggle(item.value)}
                aria-expanded={isOpen}
                tabIndex={0}
              >
                <span>{item.title}</span>
                {iconNode ?? <ChevronIcon open={isOpen} />}
              </button>
              <Collapse open={isOpen}>
                <div className={cn("flex flex-col gap-4 pb-4", contentClassName)}>
                  {item.content}
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    );
  },
);

CommerceAccordion.displayName = "CommerceAccordion";
