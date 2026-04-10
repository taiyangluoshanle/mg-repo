import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface ParseHtmlProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  html: string;
  proseClassName?: string;
}

export const ParseHtml = forwardRef<HTMLDivElement, ParseHtmlProps>(
  ({ className, html, proseClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-a:text-[#005ab6] prose-a:no-underline prose-p:m-0 prose-li:m-0 w-full whitespace-pre-wrap",
          proseClassName,
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    );
  },
);

ParseHtml.displayName = "ParseHtml";
