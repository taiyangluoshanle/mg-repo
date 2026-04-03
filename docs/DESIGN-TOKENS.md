# @mg/tailwind-config — 设计令牌体系

> 双层架构：CSS Variables（运行时主题切换） + Tailwind Preset（开发时使用）

---

## 目录结构

```
packages/tailwind-config/src/
├── preset.ts              # Tailwind Preset 主入口
├── tokens/
│   ├── colors.ts          # 语义化色彩体系
│   ├── typography.ts      # 字体/字号/行高
│   ├── spacing.ts         # 间距比例尺
│   ├── shadows.ts         # 阴影层级
│   ├── radius.ts          # 圆角层级
│   └── animations.ts      # 动画/过渡
├── plugins/
│   └── custom-utilities.ts # 自定义工具类插件
├── base.css               # CSS Variables 定义 (light/dark)
└── index.ts               # 导出
```

---

## 架构原理

```
┌──────────────────────────────────────────────────┐
│             CSS Variables Layer                    │
│  :root  { --color-blue: #0071e3; }               │
│  .dark  { --color-blue: #2997ff; }               │
│  切换主题 = 切换 CSS 变量值                        │
└──────────────────────┬───────────────────────────┘
                       │ 引用
┌──────────────────────▼───────────────────────────┐
│           Tailwind Token Layer                    │
│  brand: 'var(--color-blue)'                      │
│  业务代码: className="bg-brand text-neutral-900"  │
└──────────────────────────────────────────────────┘
```

---

## 1. 色彩体系 (Colors)

### 1.1 品牌色 — 蓝色系 (Brand / Blue)

| CSS Variable | 色值 | 色板 | 用途 |
|:-------------|:-----|:----:|:-----|
| `--color-blue-50` | `#e8f0fe` | 🟦 | 最浅背景（selected 态底色） |
| `--color-blue-100` | `#e1effe` | 🟦 | 浅色背景（hover 底色） |
| `--color-blue-200` | `#c3ddfd` | 🟦 | 浅色描边/分割 |
| `--color-blue-300` | `#a4cafe` | 🟦 | 浅色图标/辅助 |
| `--color-blue-400` | `#2997ff` | 🔵 | Dark 模式主色 |
| `--color-blue-500` | `#0077ed` | 🔵 | Hover 态 |
| `--color-blue-600` | `#0071e3` | 🔵 | **品牌主色** (Light 模式) |
| `--color-blue-700` | `#0066cc` | 🔵 | Active 按压态 |
| `--color-blue-800` | `#1959b3` | 🔵 | 深色文字/图标 |
| `--color-blue-900` | `#233876` | 🔵 | 最深蓝（极少使用） |

**语义映射：**

| 语义令牌 | Light 模式 | Dark 模式 | 用途 |
|:---------|:-----------|:----------|:-----|
| `--brand` | `#0071e3` (blue-600) | `#2997ff` (blue-400) | 品牌主色（按钮/链接/强调） |
| `--brand-hover` | `#0077ed` (blue-500) | `#a4cafe` (blue-300) | 品牌悬浮态 |
| `--brand-active` | `#006edb` | `#0077ed` (blue-500) | 品牌按压态 |
| `--brand-subtle` | `#e8f0fe` (blue-50) | `#233876` (blue-900) | 品牌淡色背景 |

### 1.2 中性色 — Neutral (前景/背景/边框)

| CSS Variable | 色值 | 色板 | 用途 |
|:-------------|:-----|:----:|:-----|
| `--color-neutral-50` | `#fafafc` | ⬜ | Light 模式页面背景 |
| `--color-neutral-100` | `#f5f5f7` | ⬜ | 次级背景（卡片/区块） |
| `--color-neutral-200` | `#e9e9ed` | ⬜ | 分割线/浅边框 |
| `--color-neutral-300` | `#d2d2d7` | ⬜ | 边框/禁用态 |
| `--color-neutral-400` | `#9a9a9e` | 🔘 | 占位文字/辅助信息 |
| `--color-neutral-500` | `#86868b` | 🔘 | 次级文字 |
| `--color-neutral-600` | `#6e6e73` | 🔘 | 说明文字 |
| `--color-neutral-700` | `#424245` | ⚫ | 次级正文 |
| `--color-neutral-800` | `#333336` | ⚫ | 正文文字 |
| `--color-neutral-900` | `#1d1d1f` | ⚫ | Light 模式主文字 |
| `--color-neutral-950` | `#161617` | ⚫ | Dark 模式页面背景 |

### 1.3 背景色语义映射

| 语义令牌 | Tailwind 类名 | Light 值 | Dark 值 | 用途 |
|:---------|:-------------|:---------|:--------|:-----|
| `--bg-primary` | `bg-background` | `#fafafc` (neutral-50) | `#161617` (neutral-950) | 页面主背景 |
| `--bg-secondary` | `bg-background-secondary` | `#f5f5f7` (neutral-100) | `#1d1d1f` (neutral-900) | 卡片/区块背景 |
| `--bg-tertiary` | `bg-background-tertiary` | `#e9e9ed` (neutral-200) | `#333336` (neutral-800) | 悬浮/选中态 |
| `--bg-inverse` | `bg-background-inverse` | `#1d1d1f` (neutral-900) | `#fafafc` (neutral-50) | 反转背景 |

### 1.4 前景色（文字）语义映射

| 语义令牌 | Tailwind 类名 | Light 值 | Dark 值 | 用途 |
|:---------|:-------------|:---------|:--------|:-----|
| `--fg-primary` | `text-foreground` | `#1d1d1f` (neutral-900) | `#fafafc` (neutral-50) | 主文字 |
| `--fg-secondary` | `text-foreground-secondary` | `#424245` (neutral-700) | `#9a9a9e` (neutral-400) | 次级文字 |
| `--fg-muted` | `text-foreground-muted` | `#86868b` (neutral-500) | `#6e6e73` (neutral-600) | 辅助/占位文字 |
| `--fg-inverse` | `text-foreground-inverse` | `#fafafc` (neutral-50) | `#1d1d1f` (neutral-900) | 反转文字（深色底上的白字） |

### 1.5 边框 & 表面语义映射

| 语义令牌 | Tailwind 类名 | Light 值 | Dark 值 | 用途 |
|:---------|:-------------|:---------|:--------|:-----|
| `--border` | `border-border` | `#e9e9ed` (neutral-200) | `#424245` (neutral-700) | 默认边框 |
| `--border-strong` | `border-border-strong` | `#d2d2d7` (neutral-300) | `#6e6e73` (neutral-600) | 强调边框 |
| `--surface` | `bg-surface` | `#ffffff` | `#1d1d1f` (neutral-900) | 浮层/卡片表面 |
| `--surface-hover` | `bg-surface-hover` | `#f5f5f7` (neutral-100) | `#333336` (neutral-800) | 浮层悬浮态 |

### 1.6 语义色

| 语义令牌 | Tailwind 类名 | Light 色值 | Dark 色值 | 用途 |
|:---------|:-------------|:-----------|:----------|:-----|
| `--success` | `text-success` / `bg-success` | `#1a8d48` | `#30d158` | 成功 |
| `--warning` | `text-warning` / `bg-warning` | `#c93400` | `#ff9f0a` | 警告 |
| `--error` | `text-error` / `bg-error` | `#de3730` | `#ff453a` | 错误 |
| `--info` | `text-info` / `bg-info` | `#0071e3` | `#2997ff` | 信息（复用品牌蓝） |

---

## 2. 字体体系 (Typography)

### 2.1 字体族

| 令牌 | 字体栈 | 用途 |
|:-----|:-------|:-----|
| `font-sans` | `'Noto Sans SC', system-ui, sans-serif` | 正文默认 |
| `font-display` | `'Sora', 'Noto Sans SC', sans-serif` | 标题/展示 |
| `font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | 代码 |

### 2.2 字号比例尺（基于 1.250 Major Third）

| 令牌 | 字号 | 行高 | Tailwind 类名 | 用途 |
|:-----|:-----|:-----|:-------------|:-----|
| `text-xs` | 0.75rem (12px) | 1rem | `text-xs` | 辅助信息 |
| `text-sm` | 0.875rem (14px) | 1.25rem | `text-sm` | 次级文字 |
| `text-base` | 1rem (16px) | 1.5rem | `text-base` | 正文默认 |
| `text-lg` | 1.125rem (18px) | 1.75rem | `text-lg` | 强调正文 |
| `text-xl` | 1.25rem (20px) | 1.75rem | `text-xl` | 小标题 |
| `text-2xl` | 1.563rem (25px) | 2rem | `text-2xl` | 标题 |
| `text-3xl` | 1.953rem (31px) | 2.25rem | `text-3xl` | 大标题 |
| `text-4xl` | 2.441rem (39px) | 2.5rem | `text-4xl` | 页面标题 |
| `text-5xl` | 3.052rem (49px) | 1 | `text-5xl` | 展示标题 |

### 2.3 字重

| 令牌 | 值 | Tailwind 类名 | 用途 |
|:-----|:---|:-------------|:-----|
| `font-normal` | 400 | `font-normal` | 正文 |
| `font-medium` | 500 | `font-medium` | 强调 |
| `font-semibold` | 600 | `font-semibold` | 小标题 |
| `font-bold` | 700 | `font-bold` | 标题 |
| `font-extrabold` | 800 | `font-extrabold` | 展示标题 |

---

## 3. 间距体系 (Spacing)

> 基于 4px 网格

| 令牌 | 值 | 像素 | 典型用途 |
|:-----|:---|:-----|:---------|
| `spacing-px` | 1px | 1px | 边框补偿 |
| `spacing-0.5` | 0.125rem | 2px | 微间距 |
| `spacing-1` | 0.25rem | 4px | 紧凑间距 |
| `spacing-1.5` | 0.375rem | 6px | — |
| `spacing-2` | 0.5rem | 8px | 小间距 |
| `spacing-3` | 0.75rem | 12px | 常规间距 |
| `spacing-4` | 1rem | 16px | 默认间距 |
| `spacing-5` | 1.25rem | 20px | — |
| `spacing-6` | 1.5rem | 24px | 区块内间距 |
| `spacing-8` | 2rem | 32px | 区块间间距 |
| `spacing-10` | 2.5rem | 40px | 大间距 |
| `spacing-12` | 3rem | 48px | 段落间距 |
| `spacing-16` | 4rem | 64px | 区域间距 |
| `spacing-20` | 5rem | 80px | 页面间距 |
| `spacing-24` | 6rem | 96px | 大区域间距 |

---

## 4. 圆角体系 (Border Radius)

| 令牌 | 值 | Tailwind 类名 | 典型用途 |
|:-----|:---|:-------------|:---------|
| `radius-none` | 0 | `rounded-none` | 无圆角 |
| `radius-sm` | 4px | `rounded-sm` | Tag, Badge |
| `radius-md` | 8px | `rounded-md` | Button, Input |
| `radius-lg` | 12px | `rounded-lg` | Card, Dialog |
| `radius-xl` | 16px | `rounded-xl` | 大卡片 |
| `radius-2xl` | 24px | `rounded-2xl` | 弹窗 |
| `radius-full` | 9999px | `rounded-full` | 圆形 Avatar, Pill |

---

## 5. 阴影体系 (Shadows)

| 令牌 | Tailwind 类名 | 典型用途 |
|:-----|:-------------|:---------|
| `shadow-xs` | `shadow-xs` | 微弱阴影（输入框聚焦） |
| `shadow-sm` | `shadow-sm` | 轻微阴影（卡片） |
| `shadow-md` | `shadow-md` | 中等阴影（下拉菜单） |
| `shadow-lg` | `shadow-lg` | 明显阴影（弹窗） |
| `shadow-xl` | `shadow-xl` | 强烈阴影（Modal） |

> 阴影色跟随主题变化：Light 模式使用 neutral-300 透明度阴影，Dark 模式使用纯黑透明度阴影。

---

## 6. 动画体系 (Animations)

### 6.1 过渡时长

| 令牌 | 值 | 用途 |
|:-----|:---|:-----|
| `duration-fast` | 100ms | 微交互（hover 色变） |
| `duration-normal` | 200ms | 常规过渡 |
| `duration-slow` | 300ms | 展开/收起 |
| `duration-slower` | 500ms | 页面级转场 |

### 6.2 缓动函数

| 令牌 | 值 | 用途 |
|:-----|:---|:-----|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 默认 |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 进入 |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 退出 |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 弹性 |

### 6.3 关键帧动画

| 名称 | 说明 | 用途 |
|:-----|:-----|:-----|
| `fade-in` | 透明度 0 → 1 | Dialog, Toast 进入 |
| `fade-out` | 透明度 1 → 0 | Dialog, Toast 退出 |
| `slide-up` | 下方滑入 | Sheet, Drawer |
| `slide-down` | 上方滑入 | Dropdown |
| `scale-in` | 缩放 0.95 → 1 | Popover |
| `spin` | 360° 旋转 | Spinner |

---

## 附录：CSS Variables 完整声明

```css
:root {
  /* ── Brand / Blue ── */
  --color-blue: #0071e3;
  --color-blue-hover: #0077ed;
  --color-blue-active: #006edb;
  --color-blue-dark: #2997ff;
  --color-blue-50: #e8f0fe;
  --color-blue-100: #e1effe;
  --color-blue-200: #c3ddfd;
  --color-blue-300: #a4cafe;
  --color-blue-400: #2997ff;
  --color-blue-500: #0077ed;
  --color-blue-600: #0071e3;
  --color-blue-700: #0066cc;
  --color-blue-800: #1959b3;
  --color-blue-900: #233876;

  /* ── Neutral ── */
  --color-neutral-50: #fafafc;
  --color-neutral-100: #f5f5f7;
  --color-neutral-200: #e9e9ed;
  --color-neutral-300: #d2d2d7;
  --color-neutral-400: #9a9a9e;
  --color-neutral-500: #86868b;
  --color-neutral-600: #6e6e73;
  --color-neutral-700: #424245;
  --color-neutral-800: #333336;
  --color-neutral-900: #1d1d1f;
  --color-neutral-950: #161617;

  /* ── 语义映射 (Light) ── */
  --brand: var(--color-blue-600);
  --brand-hover: var(--color-blue-500);
  --brand-active: var(--color-blue-active);
  --brand-subtle: var(--color-blue-50);

  --bg-primary: var(--color-neutral-50);
  --bg-secondary: var(--color-neutral-100);
  --bg-tertiary: var(--color-neutral-200);
  --bg-inverse: var(--color-neutral-900);

  --fg-primary: var(--color-neutral-900);
  --fg-secondary: var(--color-neutral-700);
  --fg-muted: var(--color-neutral-500);
  --fg-inverse: var(--color-neutral-50);

  --border: var(--color-neutral-200);
  --border-strong: var(--color-neutral-300);
  --surface: #ffffff;
  --surface-hover: var(--color-neutral-100);

  --success: #1a8d48;
  --warning: #c93400;
  --error: #de3730;
  --info: var(--color-blue-600);
}

.dark {
  /* ── 语义映射 (Dark) ── */
  --brand: var(--color-blue-400);
  --brand-hover: var(--color-blue-300);
  --brand-active: var(--color-blue-500);
  --brand-subtle: var(--color-blue-900);

  --bg-primary: var(--color-neutral-950);
  --bg-secondary: var(--color-neutral-900);
  --bg-tertiary: var(--color-neutral-800);
  --bg-inverse: var(--color-neutral-50);

  --fg-primary: var(--color-neutral-50);
  --fg-secondary: var(--color-neutral-400);
  --fg-muted: var(--color-neutral-600);
  --fg-inverse: var(--color-neutral-900);

  --border: var(--color-neutral-700);
  --border-strong: var(--color-neutral-600);
  --surface: var(--color-neutral-900);
  --surface-hover: var(--color-neutral-800);

  --success: #30d158;
  --warning: #ff9f0a;
  --error: #ff453a;
  --info: var(--color-blue-400);
}
```
