import * as React from "react";
import { cn } from "@mg/utils";

export const Menu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    role="menu"
    className={cn("flex flex-col gap-0.5 p-2", className)}
    {...props}
  />
));
Menu.displayName = "Menu";

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn("py-2", className)} {...props}>
      <div
        className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted"
        role="presentation"
      >
        {label}
      </div>
      <ul role="group" aria-label={label} className="flex flex-col gap-0.5">
        {children}
      </ul>
    </div>
  ),
);
MenuGroup.displayName = "MenuGroup";

export interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, active, type = "button", ...props }, ref) => (
    <li role="none" className="list-none">
      <button
        ref={ref}
        type={type}
        role="menuitem"
        data-active={active ? "" : undefined}
        className={cn(
          "w-full cursor-pointer rounded-md px-2 py-2 text-left text-sm text-foreground-secondary transition-colors hover:bg-surface-hover hover:text-foreground",
          active && "bg-brand-subtle font-medium text-brand",
          className,
        )}
        {...props}
      />
    </li>
  ),
);
MenuItem.displayName = "MenuItem";
