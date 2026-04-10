"use client";

import { useState } from "react";
import { Button } from "@mg/ui";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const PowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v10" />
    <path d="M18.4 6.6a9 9 0 1 1-12.77 0" />
  </svg>
);

export const ButtonBasicDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">主按钮</Button>
      <Button variant="default">次按钮</Button>
      <Button variant="dashed">虚线按钮</Button>
      <Button variant="text">文本按钮</Button>
      <Button variant="link">链接按钮</Button>
    </div>
  );
};

export const ButtonIconDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" icon={<SearchIcon />}>搜索</Button>
      <Button variant="default" icon={<DownloadIcon />}>下载</Button>
      <Button variant="primary" icon={<SearchIcon />} />
      <Button variant="default" icon={<DownloadIcon />} />
      <Button variant="dashed" icon={<PowerIcon />} />
    </div>
  );
};

export const ButtonSizesDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="primary" size="large">Large</Button>
      <Button variant="primary" size="middle">Middle</Button>
      <Button variant="primary" size="small">Small</Button>
    </div>
  );
};

export const ButtonLoadingDemo = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleClick1 = () => {
    setLoading1(true);
    setTimeout(() => setLoading1(false), 3000);
  };

  const handleClick2 = () => {
    setLoading2(true);
    setTimeout(() => setLoading2(false), 3000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" loading>加载中</Button>
      <Button variant="default" loading>加载中</Button>
      <Button variant="primary" loading={loading1} onClick={handleClick1}>
        点击加载
      </Button>
      <Button variant="default" loading={loading2} onClick={handleClick2}>
        点击加载
      </Button>
    </div>
  );
};

export const ButtonDisabledDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">主按钮</Button>
        <Button variant="primary" disabled>主按钮(禁用)</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">次按钮</Button>
        <Button variant="default" disabled>次按钮(禁用)</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="dashed">虚线按钮</Button>
        <Button variant="dashed" disabled>虚线按钮(禁用)</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="text">文本按钮</Button>
        <Button variant="text" disabled>文本按钮(禁用)</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="link">链接按钮</Button>
        <Button variant="link" disabled>链接按钮(禁用)</Button>
      </div>
    </div>
  );
};

export const ButtonGhostDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg bg-neutral-700 p-6">
      <Button variant="primary" ghost>Primary</Button>
      <Button variant="default" ghost>Default</Button>
      <Button variant="dashed" ghost>Dashed</Button>
      <Button variant="text" ghost>Text</Button>
      <Button variant="link" ghost>Link</Button>
    </div>
  );
};

export const ButtonDangerDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" danger>危险主按钮</Button>
      <Button variant="default" danger>危险次按钮</Button>
      <Button variant="dashed" danger>危险虚线</Button>
      <Button variant="text" danger>危险文本</Button>
      <Button variant="link" danger>危险链接</Button>
    </div>
  );
};

export const ButtonBlockDemo = () => {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button variant="primary" block>主按钮</Button>
      <Button variant="default" block>次按钮</Button>
    </div>
  );
};

export const ButtonVariantsDemo = ButtonBasicDemo;
