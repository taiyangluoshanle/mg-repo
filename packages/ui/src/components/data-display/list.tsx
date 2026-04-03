import {
  forwardRef,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "@mg/utils";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  ordered?: boolean;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ ordered, className, ...props }, ref) => {
    if (ordered) {
      return (
        <ol
          ref={ref as Ref<HTMLOListElement>}
          className={cn("list-decimal space-y-1 pl-5 text-foreground", className)}
          {...props}
        />
      );
    }
    return (
      <ul
        ref={ref as Ref<HTMLUListElement>}
        className={cn("list-none space-y-1 text-foreground", className)}
        {...props}
      />
    );
  },
);
List.displayName = "List";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("flex items-start gap-2 text-sm leading-relaxed", className)}
      {...props}
    >
      {icon ? (
        <span className="mt-0.5 shrink-0 text-foreground-secondary" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  ),
);
ListItem.displayName = "ListItem";
