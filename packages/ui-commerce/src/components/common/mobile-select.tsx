"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { CommerceDialog } from "./commerce-dialog";

export interface MobileSelectOption {
  label: string;
  value: string;
  [key: string]: any;
}

export interface MobileSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  options: MobileSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  breakpoint?: number;
  triggerClassName?: string;
  optionClassName?: string;
}

const CheckIcon = () => (
  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={cn("h-4 w-4 opacity-50 transition-transform duration-300", open && "rotate-180")}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const MobileSelect = forwardRef<HTMLDivElement, MobileSelectProps>(
  (
    {
      className,
      value,
      onChange,
      options,
      placeholder = "请选择",
      disabled = false,
      breakpoint = 1024,
      triggerClassName,
      optionClassName,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < breakpoint);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    const handleSelect = (val: string) => {
      onChange(val);
      setOpen(false);
    };

    if (!isMobile) {
      return (
        <div ref={ref} className={cn("relative", className)} {...props}>
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "h-12 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
              triggerClassName,
            )}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={disabled}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName,
          )}
        >
          <span className={cn(selectedOption ? "text-neutral-900" : "text-neutral-500")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown open={open} />
        </button>
        <CommerceDialog
          open={open}
          onClose={() => setOpen(false)}
          title={placeholder}
        >
          <div className="overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "flex w-full items-center justify-between border-b border-gray-100 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50",
                  value === opt.value ? "bg-blue-50 text-blue-600" : "text-gray-900",
                  optionClassName,
                )}
              >
                <span>{opt.label}</span>
                {value === opt.value && <CheckIcon />}
              </button>
            ))}
          </div>
        </CommerceDialog>
      </div>
    );
  },
);

MobileSelect.displayName = "MobileSelect";
