# 技术选型总览

---

## 核心技术栈

| 维度 | 选型 | 版本 | 理由 |
|:-----|:-----|:-----|:-----|
| 包管理器 | **pnpm** | ≥9 | 严格依赖隔离、磁盘高效、原生 workspace 支持 |
| 构建编排 | **Turborepo** | ≥2 | 增量构建、远程缓存、并行任务执行 |
| 库构建工具 | **tsup** (esbuild) | ≥8 | 快速、配置简洁、ESM/CJS 双输出 |
| 组件基础 | **Base UI** | latest | Hooks-first 无头组件，灵活度最高 |
| 样式变体 | **CVA** (class-variance-authority) | ≥0.7 | 类型安全的组件变体管理 |
| 类名合并 | **clsx + tailwind-merge** | latest | Tailwind 类名冲突处理 |
| 样式框架 | **TailwindCSS** | v4 | 原子化 CSS，搭配 CSS Variables 实现运行时主题 |
| 类型系统 | **TypeScript** (strict) | ≥5.4 | 全链路类型安全 |
| 文档站 | **Fumadocs** (Next.js) | latest | 品牌化文档、MDX 原生、实时组件预览 |
| 版本管理 | **Changesets** | latest | 语义化版本 + 自动 CHANGELOG |
| 代码规范 | **ESLint + Prettier** | latest | 统一代码格式与质量检查 |
| CI/CD | **GitHub Actions** | — | 自动化测试、构建、发布 |

---

## 运行时依赖清单（业务项目需安装）

| 包名 | 用途 |
|:-----|:-----|
| `@mg/ui` | 通用组件库 |
| `@mg/ui-commerce` | 电商域组件（按需） |
| `@mg/utils` | 公共工具函数 |
| `@mg/tailwind-config` | Tailwind Preset 主题配置 |
| `react` ≥18 | Peer Dependency |
| `react-dom` ≥18 | Peer Dependency |
| `tailwindcss` ≥4 | Peer Dependency |

---

## 开发依赖清单（各包内部使用）

| 包名 | 用途 | 使用方 |
|:-----|:-----|:-------|
| `@base-ui-components/react` | 无头组件 hooks & primitives | `@mg/ui` |
| `class-variance-authority` | 组件变体定义 | `@mg/ui`, `@mg/ui-commerce` |
| `clsx` | 条件类名拼接 | `@mg/utils` |
| `tailwind-merge` | Tailwind 类名智能合并 | `@mg/utils` |
| `tsup` | 库构建 | 所有 packages |
| `typescript` | 类型检查 | 所有 packages |
| `@mg/tsconfig` | 共享 TS 配置 | 所有 packages |
| `@mg/eslint-config` | 共享 ESLint 规则 | 所有 packages |

---

## 构建输出格式

| 输出 | 格式 | 用途 |
|:-----|:-----|:-----|
| `dist/index.mjs` | ESM | 现代打包工具 (Vite, Next.js 等) |
| `dist/index.js` | CJS | Node.js / 旧版工具兼容 |
| `dist/index.d.ts` | TypeScript 声明 | 类型提示 |
| `dist/styles.css` | CSS（组件库） | 组件所需样式 |
