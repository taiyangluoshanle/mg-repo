# MG Monorepo — 设计方案文档索引

> 公司级前端基础设施仓库的完整设计方案。  
> 请逐个审阅后确认，确认通过后开始实施搭建。

---

## 文档清单

| # | 文档 | 文件 | 内容概要 |
|:--|:-----|:-----|:---------|
| 1 | **设计总览** | [DESIGN-OVERVIEW.md](./DESIGN-OVERVIEW.md) | 定位目标、三层架构、包清单、仓库目录结构 |
| 2 | **技术选型** | [TECH-STACK.md](./TECH-STACK.md) | 核心技术栈、运行时依赖、开发依赖、构建输出格式 |
| 3 | **通用组件库** | [COMPONENTS-UI.md](./COMPONENTS-UI.md) | @mg/ui 45 个组件清单（7 大分类）、Base UI 覆盖情况 |
| 4 | **电商域组件** | [COMPONENTS-COMMERCE.md](./COMPONENTS-COMMERCE.md) | @mg/ui-commerce 18 个组件清单（5 大分类）、未来扩展域 |
| 5 | **公共方法库** | [UTILS.md](./UTILS.md) | @mg/utils 38 个工具函数清单（8 大模块） |
| 6 | **设计令牌** | [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) | 色彩/字体/间距/圆角/阴影/动画 完整令牌表 |
| 7 | **文档站设计** | [DOCS-SITE.md](./DOCS-SITE.md) | Fumadocs 文档站美学设计、页面结构、目录结构 |
| 8 | **CI/CD 与发布** | [CI-CD.md](./CI-CD.md) | 流水线设计、Changesets 版本管理、发布策略、分支策略 |
| 9 | **业务接入指南** | [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md) | 三步接入、使用示例、按需安装矩阵 |

---

## 关键数字总览

| 指标 | 数值 |
|:-----|:-----|
| NPM 包数量 | 6 个（4 运行时 + 2 开发时） |
| 通用组件 (@mg/ui) | ~45 个，7 大分类 |
| 电商组件 (@mg/ui-commerce) | ~18 个，5 大分类 |
| 工具函数 (@mg/utils) | ~38 个，8 大模块 |
| 设计令牌分类 | 6 大类（色彩/字体/间距/圆角/阴影/动画） |
| 文档站页面类型 | 5 种（首页/快速开始/组件/工具/令牌） |

---

## 审阅检查清单

请逐项确认是否需要调整：

- [ ] **三层架构** — Layer 1 (令牌+工具) → Layer 2 (通用组件) → Layer 3 (业务组件)
- [ ] **技术选型** — pnpm + Turborepo + tsup + Base UI + CVA + TailwindCSS v4 + Fumadocs
- [ ] **通用组件分类** — General / Layout / Form / Data Display / Feedback / Navigation / Overlay
- [ ] **通用组件清单** — 45 个组件是否覆盖足够或需增减
- [ ] **电商组件清单** — 18 个组件是否符合业务需求
- [ ] **工具函数清单** — 38 个函数是否覆盖足够或需增减
- [ ] **设计令牌** — 色彩体系、字体选择、间距比例尺
- [ ] **文档站美学** — Ink & Amber 风格是否满意
- [ ] **CI/CD 策略** — GitHub Actions + Changesets + GitHub Packages
- [ ] **包命名** — `@mg/*` scope 是否确认
- [ ] **发布目标** — GitHub Packages / Verdaccio / npm public

> 全部确认后，切换到 Agent 模式开始实施。
