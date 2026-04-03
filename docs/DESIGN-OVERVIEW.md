# MG Monorepo — 公司级前端基础设施仓库 设计总览

> 最后更新：2026-04-01

---

## 一、定位与目标

| 维度 | 说明 |
|:---|:---|
| **定位** | 公司级前端基础设施的单一真相源（Single Source of Truth） |
| **服务对象** | 公司内所有前端项目团队、设计师、新人 |
| **核心价值** | 统一视觉语言、消除重复建设、集中质量管控 |

### 四大目标

| # | 目标 | 说明 |
|:--|:-----|:-----|
| 1 | **一致性** | 所有业务项目共享统一的设计令牌、组件和工具函数 |
| 2 | **效率** | 新项目 10 分钟接入，零配置使用 |
| 3 | **质量** | 集中测试、集中 CR、统一发布 |
| 4 | **可演进** | 包独立版本管理，业务团队可按需升级 |

---

## 二、三层架构

```
Layer 3  ──  @mg/ui-commerce       电商域组件（业务层）
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
Layer 2  ──  @mg/ui                通用组件库（设计系统层）
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
Layer 1  ──  @mg/tailwind-config   设计令牌
             @mg/utils             工具函数
```

| 层级 | 包名 | 职责 | 依赖方向 |
|:-----|:-----|:-----|:---------|
| Layer 3 | `@mg/ui-commerce` | 电商业务域组件，由通用组件组合而成 | → Layer 2 → Layer 1 |
| Layer 2 | `@mg/ui` | 通用 UI 组件，与任何业务域无关 | → Layer 1 |
| Layer 1 | `@mg/tailwind-config` | 设计令牌（色彩/字体/间距/阴影等） | 无依赖 |
| Layer 1 | `@mg/utils` | 公共工具函数 | 无依赖（仅 clsx + tw-merge） |

**原则**：依赖永远单向向下流动，禁止循环依赖。

---

## 三、NPM 包清单

| 包名 | 类型 | 说明 | 首期 |
|:-----|:-----|:-----|:----:|
| `@mg/ui` | 运行时 | 通用组件库（~45 组件） | ✅ |
| `@mg/ui-commerce` | 运行时 | 电商域组件（~18 组件） | ✅ |
| `@mg/utils` | 运行时 | 公共方法库 | ✅ |
| `@mg/tailwind-config` | 运行时 | TailwindCSS 主题 Preset | ✅ |
| `@mg/tsconfig` | 开发时 | 共享 TypeScript 配置 | ✅ |
| `@mg/eslint-config` | 开发时 | 共享 ESLint 配置 | ✅ |

---

## 四、仓库目录结构

```
mg-repo/
├── apps/
│   └── docs/                          # Fumadocs 文档站 (Next.js)
│
├── packages/
│   ├── ui/                            # @mg/ui 通用组件库
│   ├── ui-commerce/                   # @mg/ui-commerce 电商域组件
│   ├── utils/                         # @mg/utils 公共方法库
│   ├── tailwind-config/               # @mg/tailwind-config 主题
│   ├── tsconfig/                      # @mg/tsconfig 共享TS配置
│   └── eslint-config/                 # @mg/eslint-config 共享ESLint配置
│
├── turbo.json                         # Turborepo 管道配置
├── pnpm-workspace.yaml                # Workspace 声明
├── package.json                       # Root package.json
├── .npmrc                             # pnpm 配置
├── .changeset/config.json             # Changesets 版本管理
├── .github/workflows/ci.yml           # CI 流水线
├── .github/workflows/release.yml      # 自动发布
├── .gitignore
└── README.md
```

> 详细子目录结构请参见各模块设计文档。
