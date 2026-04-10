"use client";

import { Input } from "@mg/components";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const AppleInputBasicDemo = () => {
  return (
    <div className="w-full max-w-[320px]">
      <Input placeholder="输入内容..." />
    </div>
  );
};

export const AppleInputVariantsDemo = () => {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold tracking-[-0.12px] text-black/80 dark:text-white/80">
          Default
        </label>
        <Input variant="default" placeholder="Apple ID" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold tracking-[-0.12px] text-black/80 dark:text-white/80">
          Search
        </label>
        <Input
          variant="search"
          placeholder="搜索 Apple 产品..."
          startAdornment={<SearchIcon />}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold tracking-[-0.12px] text-black/80 dark:text-white/80">
          Underline
        </label>
        <Input variant="underline" placeholder="您的姓名" />
      </div>
    </div>
  );
};

export const AppleInputSizesDemo = () => {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-5">
      <Input size="sm" placeholder="Small — 36px" />
      <Input size="md" placeholder="Medium — 44px" />
      <Input size="lg" placeholder="Large — 52px" />
    </div>
  );
};

export const AppleInputAdornmentDemo = () => {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-5">
      <Input
        variant="search"
        placeholder="搜索..."
        startAdornment={<SearchIcon />}
      />
      <Input
        variant="default"
        placeholder="you@apple.com"
        startAdornment={<MailIcon />}
      />
    </div>
  );
};

export const AppleInputDisabledDemo = () => {
  return (
    <div className="w-full max-w-[360px]">
      <Input disabled placeholder="不可编辑" />
    </div>
  );
};
