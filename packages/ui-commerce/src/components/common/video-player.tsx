"use client";

import { forwardRef, useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { cn } from "@mg/utils";

export interface VideoPlayerProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "children"> {
  source: string;
  wrapperClassName?: string;
  showControls?: boolean;
  pauseWhenHidden?: boolean;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      className,
      source,
      wrapperClassName,
      showControls = false,
      pauseWhenHidden = true,
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const mergedRef = (node: HTMLVideoElement | null) => {
      (innerRef as React.MutableRefObject<HTMLVideoElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = node;
    };

    useEffect(() => {
      if (!pauseWhenHidden || !containerRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const video = innerRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        },
        { threshold: 0.25 },
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [pauseWhenHidden]);

    const handleToggle = () => {
      const video = innerRef.current;
      if (!video) return;
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    };

    if (!source) return null;

    return (
      <div ref={containerRef} className={cn("relative h-full w-full", wrapperClassName)}>
        <video
          ref={mergedRef}
          src={source}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className={cn("h-full w-full object-cover", className)}
          {...props}
        />
        {showControls && (
          <button
            type="button"
            className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            onClick={handleToggle}
            aria-label={isPlaying ? "暂停" : "播放"}
            tabIndex={0}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
