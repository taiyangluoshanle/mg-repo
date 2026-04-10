"use client";

import { useState } from "react";
import {
  HighlightText,
  ClientOnly,
  NoticeBar,
  ParseHtml,
  LoadingOverlay,
  ScrollToTop,
  FadeIn,
  Collapse,
  Countdown,
  BoxCountdown,
  CircularProgress,
  VideoPlayer,
  CommerceDialog,
  CommerceAccordion,
  MobileSelect,
  ClientPagination,
  SimpleCarousel,
} from "@mg/ui-commerce";

/* ── HighlightText ── */
export const HighlightTextDemo = () => (
  <div className="space-y-3">
    <HighlightText
      text="在 BLUETTI 官网搜索 EP2000 电源产品"
      highlight="EP2000"
      highlightClassName="font-bold text-blue-600"
    />
    <br />
    <HighlightText
      text="支持多关键词高亮：React、TypeScript、Tailwind"
      highlight={["React", "TypeScript", "Tailwind"]}
      highlightColor="#e11d48"
    />
  </div>
);

/* ── ClientOnly ── */
export const ClientOnlyDemo = () => (
  <ClientOnly fallback={<span className="text-sm text-gray-400">服务端渲染中...</span>}>
    <span className="text-sm">当前时间：{new Date().toLocaleTimeString()}</span>
  </ClientOnly>
);

/* ── NoticeBar ── */
export const NoticeBarDemo = () => (
  <NoticeBar
    className="rounded-lg border bg-amber-50 px-4 py-2 text-amber-800"
    notices={[
      { title: "🔥 限时优惠：全场满 $500 减 $50" },
      { title: "📦 免费配送至全国各地" },
      { title: "🎁 新用户注册即享 10% 折扣" },
    ]}
  />
);

/* ── ParseHtml ── */
export const ParseHtmlDemo = () => (
  <ParseHtml
    html='<p>这是一段 <strong>富文本</strong> 内容，包含 <a href="#">链接</a> 和 <em>斜体</em>。</p>'
    className="rounded-lg border p-4"
  />
);

/* ── LoadingOverlay ── */
export const LoadingOverlayDemo = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <div className="relative h-32 rounded-lg border">
      <button
        onClick={handleClick}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        显示 Loading（2 秒）
      </button>
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/25">
          <svg width="24" height="24" viewBox="0 0 24 24" className="animate-spin text-white" fill="none">
            <path d="M12 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 19V22" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 12L19 12" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12L2 12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};

/* ── ScrollToTop ── */
export const ScrollToTopDemo = () => (
  <div className="flex items-center gap-2 rounded-lg border p-4 text-sm text-gray-500">
    <span>↑ ScrollToTop 组件会固定在页面右下角，向上滚动时自动出现</span>
  </div>
);

/* ── FadeIn ── */
export const FadeInDemo = () => (
  <div className="space-y-4">
    <FadeIn>
      <div className="rounded-lg bg-blue-50 p-4 text-center text-blue-700">
        滚动到此处时渐入显示
      </div>
    </FadeIn>
    <FadeIn translateY="20px" duration={1500}>
      <div className="rounded-lg bg-green-50 p-4 text-center text-green-700">
        更大偏移、更慢动画
      </div>
    </FadeIn>
  </div>
);

/* ── Collapse ── */
export const CollapseDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
      >
        {open ? "收起" : "展开"} 内容
      </button>
      <Collapse open={open}>
        <div className="rounded-lg border p-4 text-sm">
          这是一段可展开/收起的内容。支持平滑的 CSS 高度过渡动画，无需依赖 framer-motion。
        </div>
      </Collapse>
    </div>
  );
};

/* ── Countdown ── */
export const CountdownDemo = () => {
  const endTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
  return (
    <div className="space-y-4">
      <Countdown pad endTime={endTime} className="text-lg font-bold" />
      <Countdown endTime={endTime} labels={{ days: "Days", hours: "Hrs", minutes: "Mins", seconds: "Secs" }}>
        {({ formatTime }) => (
          <div className="flex gap-3">
            {formatTime.map(([value, unit]) => (
              <div key={unit} className="flex flex-col items-center">
                <span className="rounded bg-gray-900 px-2 py-1 font-mono text-lg font-bold text-white">
                  {value}
                </span>
                <span className="mt-1 text-xs text-gray-500">{unit}</span>
              </div>
            ))}
          </div>
        )}
      </Countdown>
    </div>
  );
};

/* ── BoxCountdown ── */
export const BoxCountdownDemo = () => {
  const endTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
  return (
    <BoxCountdown
      endTime={endTime}
      bgColor="bg-red-500"
      textColor="text-gray-700"
      labels={{ days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" }}
    />
  );
};

/* ── CircularProgress ── */
export const CircularProgressDemo = () => (
  <div className="flex items-center gap-6">
    <CircularProgress value={25} size={48} />
    <CircularProgress value={50} size={48} indicatorColor="stroke-green-500" />
    <CircularProgress value={75} size={48} indicatorColor="stroke-amber-500" />
    <CircularProgress value={100} size={48} indicatorColor="stroke-red-500" />
  </div>
);

/* ── VideoPlayer ── */
export const VideoPlayerDemo = () => (
  <div className="max-w-md overflow-hidden rounded-xl">
    <VideoPlayer
      source="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      showControls
      className="aspect-video"
    />
  </div>
);

/* ── CommerceDialog ── */
export const CommerceDialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        打开弹窗
      </button>
      <CommerceDialog open={open} onClose={() => setOpen(false)} title="产品详情">
        <div className="p-4 text-sm">
          <p>这是一个移动端底部弹出、桌面端居中的商务弹窗。</p>
          <p className="mt-2 text-gray-500">适用于产品详情预览、配件选择等场景。</p>
        </div>
      </CommerceDialog>
    </>
  );
};

/* ── CommerceAccordion ── */
export const CommerceAccordionDemo = () => (
  <CommerceAccordion
    className="max-w-md"
    defaultValue="faq-1"
    items={[
      { value: "faq-1", title: "发货时间是多久？", content: <p className="text-sm text-gray-600">一般 3-5 个工作日内发货。</p> },
      { value: "faq-2", title: "支持退换货吗？", content: <p className="text-sm text-gray-600">收货后 30 天内支持无理由退换。</p> },
      { value: "faq-3", title: "保修政策是什么？", content: <p className="text-sm text-gray-600">提供 5 年超长质保服务。</p> },
    ]}
  />
);

/* ── MobileSelect ── */
export const MobileSelectDemo = () => {
  const [value, setValue] = useState("");
  return (
    <MobileSelect
      className="max-w-xs"
      value={value}
      onChange={setValue}
      placeholder="选择产品型号"
      options={[
        { label: "EP2000", value: "ep2000" },
        { label: "EP760", value: "ep760" },
        { label: "EP800", value: "ep800" },
        { label: "AC200MAX", value: "ac200max" },
      ]}
    />
  );
};

/* ── ClientPagination ── */
export const ClientPaginationDemo = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">当前页：{page}</p>
      <ClientPagination current={page} total={100} pageSize={10} onChange={setPage} />
    </div>
  );
};

/* ── SimpleCarousel ── */
export const SimpleCarouselDemo = () => (
  <SimpleCarousel
    className="max-w-sm"
    showCounter
    slides={[
      "https://placehold.co/400x400/e2e8f0/475569?text=Slide+1",
      "https://placehold.co/400x400/dbeafe/1e40af?text=Slide+2",
      "https://placehold.co/400x400/dcfce7/166534?text=Slide+3",
    ]}
  />
);
