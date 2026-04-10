import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

type HighlightPattern = string | string[] | RegExp;

export interface HighlightTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  highlight?: HighlightPattern | null;
  highlightColor?: string;
  highlightClassName?: string;
  caseSensitive?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  onHighlightClick?: (value: string, index: number) => void;
}

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const HighlightText = forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      className,
      text,
      highlight = null,
      highlightColor,
      highlightClassName,
      caseSensitive = false,
      tag: Tag = "span",
      onHighlightClick,
      ...props
    },
    ref,
  ) => {
    const parts = useMemo(() => {
      if (!highlight) return [{ text, isHighlight: false }];

      let regex: RegExp;

      if (highlight instanceof RegExp) {
        const flags = `${highlight.flags.includes("g") ? "" : "g"}${caseSensitive ? "" : "i"}`;
        regex = new RegExp(highlight.source, flags);
      } else {
        const arr = Array.isArray(highlight) ? highlight : [highlight];
        const filtered = arr.filter(Boolean);
        if (filtered.length === 0) return [{ text, isHighlight: false }];
        const pattern = filtered.map((s) => escapeRegExp(s)).join("|");
        regex = new RegExp(pattern, `g${caseSensitive ? "" : "i"}`);
      }

      const result: Array<{ text: string; isHighlight: boolean }> = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          result.push({ text: text.slice(lastIndex, match.index), isHighlight: false });
        }
        result.push({ text: match[0], isHighlight: true });
        lastIndex = match.index + match[0].length;
        if (match.index === regex.lastIndex) regex.lastIndex++;
      }

      if (lastIndex < text.length) {
        result.push({ text: text.slice(lastIndex), isHighlight: false });
      }

      return result.length === 0 ? [{ text, isHighlight: false }] : result;
    }, [text, highlight, caseSensitive]);

    const highlightStyle = highlightColor ? { color: highlightColor } : undefined;
    const Comp = Tag as any;

    return (
      <Comp ref={ref} className={cn(className)} {...props}>
        {parts.map((part, idx) =>
          part.isHighlight ? (
            <span
              key={idx}
              className={highlightClassName}
              style={highlightStyle}
              onClick={() => onHighlightClick?.(part.text, idx)}
              role={onHighlightClick ? "button" : undefined}
              tabIndex={onHighlightClick ? 0 : undefined}
              onKeyDown={
                onHighlightClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onHighlightClick(part.text, idx);
                      }
                    }
                  : undefined
              }
            >
              {part.text}
            </span>
          ) : (
            <span key={idx}>{part.text}</span>
          ),
        )}
      </Comp>
    );
  },
);

HighlightText.displayName = "HighlightText";
