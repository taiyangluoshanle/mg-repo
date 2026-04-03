import * as React from "react";
import { cn } from "@mg/utils";

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>(({ className, ...props }, ref) => (
  <nav ref={ref} aria-label="Breadcrumb" className={className} {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-foreground-secondary",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-foreground-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline",
      className,
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<"span"> {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, children = "/", ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden
    className={cn("select-none text-foreground-muted", className)}
    {...props}
  >
    {children}
  </span>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";
