# 文档站设计方案

> 技术方案：Fumadocs + Next.js App Router + MDX  
> 美学方向：**Ink & Blue** — 深墨色 + 品牌蓝高亮

---

## 技术选型

| 维度 | 选型 | 说明 |
|:-----|:-----|:-----|
| 框架 | Fumadocs + Next.js App Router | 品牌化文档、RSC 支持 |
| 内容 | MDX | 支持嵌入交互式 React 组件 |
| 搜索 | Fumadocs 内置全文搜索 | 开箱即用 |
| 部署 | Vercel | Next.js 最佳部署平台 |
| 主题 | 自定义 Ink & Blue | 深色编辑风格 + 品牌蓝强调 |

---

## 美学设计

### 色彩方案 — Ink & Blue

| 分类 | 色值 | 用途 |
|:-----|:-----|:-----|
| `neutral-950` | `#161617` | 页面底色 (Dark) |
| `neutral-900` | `#1d1d1f` | 卡片/侧栏背景 (Dark) |
| `neutral-800` | `#333336` | 悬浮/选中态 (Dark) |
| `neutral-700` | `#424245` | 边框 (Dark) |
| `neutral-600` | `#6e6e73` | 辅助文字 (Dark) |
| `neutral-500` | `#86868b` | 次级文字 |
| `neutral-400` | `#9a9a9e` | 占位文字 |
| `neutral-300` | `#d2d2d7` | 边框 (Light) |
| `neutral-200` | `#e9e9ed` | 分割线 (Light) |
| `neutral-100` | `#f5f5f7` | 次级背景 (Light) |
| `neutral-50` | `#fafafc` | 页面底色 (Light) / 主文字 (Dark) |
| `blue-600` | `#0071e3` | **品牌主色 (Light)** |
| `blue-500` | `#0077ed` | 悬浮态 |
| `blue-400` | `#2997ff` | **品牌主色 (Dark)** |
| `blue-300` | `#a4cafe` | 悬浮态 (Dark) |
| `blue-50` | `#e8f0fe` | 淡色强调背景 (Light) |
| `blue-900` | `#233876` | 淡色强调背景 (Dark) |

### 字体方案

| 用途 | 字体 | 特点 |
|:-----|:-----|:-----|
| 标题 | Sora + Noto Sans SC | 几何感、现代、辨识度高 |
| 正文 | Plus Jakarta Sans + Noto Sans SC | 圆润友好、阅读舒适 |
| 代码 | JetBrains Mono | 等宽、连字支持 |

### 视觉特征

| 特征 | 说明 |
|:-----|:-----|
| 噪点纹理 | body 叠加微弱噪点纹理，增加质感深度 |
| 蓝色高亮 | 侧栏活动项、标题渐变、CTA 按钮均使用品牌蓝 |
| 呼吸留白 | 编辑式排版，内容区宽 padding |
| 代码块 | 暗色卡片 + 语法高亮 + 复制按钮 + 语言标签 |
| 微动效 | hover 微位移、边框色变化、背景淡入 |

---

## 页面结构

### 全局布局

| 区域 | 位置 | 内容 |
|:-----|:-----|:-----|
| **TopBar** | 顶部固定 | Logo + 导航 + 搜索(⌘K) + 版本号 + 主题切换 + GitHub |
| **Sidebar** | 左侧 260px | 树形导航，分 Section，active 项品牌蓝高亮 |
| **Main Content** | 中间弹性 | 面包屑 + 标题 + 正文 + 上/下页导航 |
| **TOC** | 右侧 200px | 当前页目录，滚动跟随高亮 |
| **Footer** | 底部 | 版本号 + GitHub + Changelog 链接 |

### 页面类型

| 页面 | 路径 | 内容 |
|:-----|:-----|:-----|
| **首页** | `/` | Hero + 特性卡片 + 快速开始代码 |
| **快速开始** | `/docs/getting-started/*` | 安装指南、主题定制、暗黑模式 |
| **组件文档** | `/docs/components/*` | 预览 + 代码 + 变体 + API 表格 + 无障碍 |
| **工具函数文档** | `/docs/utils/*` | 签名 + 参数说明 + 示例代码 + 返回值 |
| **设计令牌** | `/docs/tokens/*` | 色彩色板 + 字体比例尺 + 间距展示 |

---

## 组件文档页模板

每个组件文档页包含以下模块（从上到下）：

| # | 模块 | 说明 |
|:--|:-----|:-----|
| 1 | **面包屑** | 导航路径：组件 > Primitives > Button |
| 2 | **标题 + 描述** | 组件名称（渐变文字）+ 一句话描述 |
| 3 | **实时预览** | 可交互 Demo，Preview / Code 标签切换 |
| 4 | **安装** | 安装命令 + 复制按钮 |
| 5 | **基础用法** | 最简代码示例 |
| 6 | **变体展示** | 所有 variant 的网格卡片展示 |
| 7 | **尺寸展示** | 所有 size 的对比展示 |
| 8 | **API 表格** | 属性名 / 类型 / 默认值 / 说明 |
| 9 | **无障碍说明** | 键盘操作、ARIA 属性、屏幕阅读器支持 |
| 10 | **上/下页导航** | 前一个组件 / 后一个组件链接卡片 |

---

## 首页设计

| 区域 | 内容 |
|:-----|:-----|
| **Hero** | Logo + 标题（蓝色渐变文字）+ 副标题 + CTA 按钮（快速开始/浏览组件） |
| **背景** | 微妙的蓝色径向渐变 + 噪点纹理 |
| **特性卡片** | 3 列：组件库(45+) / 工具函数(38+) / 设计令牌(CSS变量) |
| **快速开始** | 安装命令 + 使用代码示例（带复制按钮） |

---

## 文档目录结构

```
apps/docs/
├── app/
│   ├── layout.tsx                    # 全局布局（TopBar + Footer）
│   ├── page.tsx                      # 首页 Landing
│   └── docs/[[...slug]]/
│       └── page.tsx                  # 文档页（Fumadocs 渲染）
│
├── content/                          # MDX 文档源文件
│   ├── getting-started/
│   │   ├── index.mdx                # 快速开始
│   │   ├── installation.mdx         # 安装指南
│   │   ├── theming.mdx              # 主题定制
│   │   └── dark-mode.mdx            # 暗黑模式
│   ├── components/
│   │   ├── general/
│   │   │   ├── button.mdx
│   │   │   ├── icon.mdx
│   │   │   └── ...
│   │   ├── form/
│   │   │   ├── input.mdx
│   │   │   ├── select.mdx
│   │   │   └── ...
│   │   ├── data-display/
│   │   │   ├── badge.mdx
│   │   │   ├── card.mdx
│   │   │   └── ...
│   │   ├── feedback/
│   │   │   ├── toast.mdx
│   │   │   └── ...
│   │   ├── navigation/
│   │   │   ├── tabs.mdx
│   │   │   └── ...
│   │   └── overlay/
│   │       ├── dialog.mdx
│   │       └── ...
│   ├── commerce/
│   │   ├── product-card.mdx
│   │   ├── sku-selector.mdx
│   │   └── ...
│   ├── utils/
│   │   ├── cn.mdx
│   │   ├── string.mdx
│   │   ├── number.mdx
│   │   └── ...
│   └── tokens/
│       ├── colors.mdx
│       ├── typography.mdx
│       ├── spacing.mdx
│       └── shadows.mdx
│
├── components/                       # 文档站专用组件
│   ├── component-preview.tsx         # 实时预览容器
│   ├── props-table.tsx               # Props API 表格
│   ├── color-palette.tsx             # 色彩色板展示
│   └── copy-button.tsx               # 代码复制按钮
│
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```
