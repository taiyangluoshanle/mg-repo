"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface NoticeBarItem {
  title: string;
  [key: string]: string;
}

export interface NoticeBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  notices: NoticeBarItem[];
  interval?: number;
  duration?: number;
  renderItem?: (item: NoticeBarItem, index: number) => React.ReactNode;
}

export const NoticeBar = forwardRef<HTMLDivElement, NoticeBarProps>(
  ({ className, notices, interval = 3000, duration = 500, renderItem, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [moving, setMoving] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const [maxH, setMaxH] = useState(0);

    const swiperTransition = (index: number, dur: number) => {
      if (!listRef.current) return;
      listRef.current.style.transitionDuration = `${dur}ms`;
      listRef.current.style.transform = `translate3d(0, calc(-${index} * ${maxH}px), 0)`;
    };

    const handleTransitionEnd = () => {
      setMoving(false);
      if (shouldReset) {
        setShouldReset(false);
        swiperTransition(0, 0);
        const first = listRef.current?.firstElementChild as HTMLElement | null;
        if (first) first.removeAttribute("style");
      }
    };

    const next = () => {
      const nextIndex = activeIndex + 1;
      const isLast = nextIndex >= notices.length;
      setMoving(true);
      swiperTransition(nextIndex, duration);
      if (isLast) {
        setActiveIndex(0);
        setShouldReset(true);
        const first = listRef.current?.firstElementChild as HTMLElement | null;
        if (first) first.style.transform = `translate3d(0, calc(${nextIndex} * ${maxH}px), 0)`;
      } else {
        setActiveIndex(nextIndex);
      }
    };

    useEffect(() => {
      if (notices.length < 2) return;
      if (!maxH) {
        setMaxH(
          itemRefs.current.reduce((p, c) => Math.max(c?.getBoundingClientRect()?.height ?? 0, p), 0),
        );
        return;
      }
      const timer = setInterval(() => {
        if (!moving) next();
      }, interval + duration);
      return () => clearInterval(timer);
    }, [activeIndex, moving, maxH, notices.length, interval, duration]);

    if (notices.length === 0) return null;

    return (
      <div ref={ref} className={cn("w-full overflow-hidden", className)} {...props}>
        <div
          ref={listRef}
          className="flex-1"
          style={{ height: maxH ? maxH : "auto" }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div>
            {notices.map((notice, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                style={{ height: maxH ? maxH : "auto" }}
                className="flex items-center overflow-hidden text-ellipsis text-sm"
              >
                {renderItem ? (
                  renderItem(notice, index)
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: notice.title }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

NoticeBar.displayName = "NoticeBar";
