"use client";

import { useRef, useState } from "react";
import { Button, Dialog } from "@mg/ui";

/* ── 基础用法 ── */
export const DialogBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="确认操作"
        description="此操作不可撤销，是否继续？"
        footer={
          <>
            <Button variant="default" size="small" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button size="small" onClick={() => setOpen(false)}>
              确认
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground-secondary">
          这是对话框的主体内容区域。
        </p>
      </Dialog>
    </>
  );
};

/* ── 尺寸 ── */
export const DialogSizesDemo = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "full">("md");
  const [open, setOpen] = useState(false);

  const handleOpen = (s: typeof size) => {
    setSize(s);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
          <Button key={s} variant="default" size="small" onClick={() => handleOpen(s)}>
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`尺寸: ${size.toUpperCase()}`}
        size={size}
        footer={
          <Button size="small" onClick={() => setOpen(false)}>
            关闭
          </Button>
        }
      >
        <p className="text-sm text-foreground-secondary">
          当前弹窗尺寸为 <strong>{size}</strong>。
        </p>
      </Dialog>
    </>
  );
};

/* ── 可滚动内容 ── */
export const DialogScrollDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        长内容对话框
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="用户协议"
        description="请仔细阅读以下条款。"
        className="max-h-[60vh]"
        footer={
          <>
            <Button variant="default" size="small" onClick={() => setOpen(false)}>
              拒绝
            </Button>
            <Button size="small" onClick={() => setOpen(false)}>
              同意
            </Button>
          </>
        }
      >
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-3 text-sm text-foreground-secondary">
            第 {i + 1} 条：这是一段很长的协议内容，用于演示当内容超出可视区域时，
            Body 区域可滚动而 Header 和 Footer 保持固定。
          </p>
        ))}
      </Dialog>
    </>
  );
};

/* ── 禁止关闭 ── */
export const DialogPreventCloseDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        禁止遮罩/ESC 关闭
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="重要操作"
        description="此对话框禁止通过点击遮罩或按 ESC 关闭。"
        disableBackdropClick
        disableEscapeKey
        footer={
          <Button size="small" onClick={() => setOpen(false)}>
            我已知悉
          </Button>
        }
      >
        <p className="text-sm text-foreground-secondary">
          只能通过点击按钮关闭，适用于需要用户明确操作的场景。
        </p>
      </Dialog>
    </>
  );
};

/* ── Loading 状态 ── */
export const DialogLoadingDemo = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        提交表单
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="提交确认"
        description="提交后将无法修改。"
        loading={loading}
        footer={
          <>
            <Button variant="default" size="small" onClick={() => setOpen(false)} disabled={loading}>
              取消
            </Button>
            <Button size="small" onClick={handleSubmit} disabled={loading}>
              {loading ? "提交中…" : "确认提交"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground-secondary">
          点击确认后将模拟 2 秒的提交过程，期间无法关闭对话框。
        </p>
      </Dialog>
    </>
  );
};

/* ── 嵌套对话框 ── */
export const DialogNestedDemo = () => {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOuterOpen(true)}>
        打开外层
      </Button>
      <Dialog
        open={outerOpen}
        onOpenChange={setOuterOpen}
        title="外层对话框"
        footer={
          <Button variant="default" size="small" onClick={() => setOuterOpen(false)}>
            关闭外层
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-foreground-secondary">
            这是外层对话框，可以在其中打开内层对话框。
          </p>
          <Button size="small" onClick={() => setInnerOpen(true)}>
            打开内层
          </Button>
        </div>
      </Dialog>
      <Dialog
        open={innerOpen}
        onOpenChange={setInnerOpen}
        title="内层对话框"
        description="这是嵌套的第二层对话框。"
        size="sm"
        footer={
          <Button size="small" onClick={() => setInnerOpen(false)}>
            关闭内层
          </Button>
        }
      >
        <p className="text-sm text-foreground-secondary">
          多层对话框通过 DOM 顺序自动处理层级关系。
        </p>
      </Dialog>
    </>
  );
};

/* ── 无标题模式 ── */
export const DialogNoTitleDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        无标题对话框
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={null}>
        <p className="text-sm text-foreground-secondary">
          将 title 设为 null 可隐藏标题栏，关闭按钮会移到右上角绝对定位。
        </p>
      </Dialog>
    </>
  );
};

/* ── 自动关闭 ── */
export const DialogTimeoutDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        3 秒后自动关闭
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="提示"
        timeout={3000}
        showCloseButton={false}
      >
        <p className="text-sm text-foreground-secondary">
          此对话框将在 3 秒后自动关闭。
        </p>
      </Dialog>
    </>
  );
};

/* ── initialFocus ── */
export const DialogInitialFocusDemo = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        自动聚焦输入框
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="搜索"
        initialFocus={inputRef}
        footer={
          <Button size="small" onClick={() => setOpen(false)}>
            关闭
          </Button>
        }
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="打开后自动聚焦到此输入框"
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
          aria-label="搜索输入框"
        />
      </Dialog>
    </>
  );
};
