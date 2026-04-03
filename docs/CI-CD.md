# CI/CD 与发布策略

---

## 流水线总览

```
PR 提交 → CI 检查 → 合入 main → Release 自动发布
```

| 阶段 | 触发条件 | 执行内容 |
|:-----|:---------|:---------|
| **CI** | 每次 PR 提交/更新 | lint → typecheck → build → test |
| **Release** | 合入 main 分支 | Changesets 版本检测 → bump → CHANGELOG → publish |
| **Docs Deploy** | 合入 main 分支 | 文档站自动部署到 Vercel |

---

## CI Pipeline

### 触发条件

| 事件 | 分支 |
|:-----|:-----|
| `pull_request` | 所有分支 → main |
| `push` | main（仅用于 Release） |

### 执行步骤

| # | 步骤 | 命令 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | 安装依赖 | `pnpm install --frozen-lockfile` | 使用 pnpm 缓存加速 |
| 2 | 代码检查 | `turbo lint` | 并行执行所有包的 ESLint |
| 3 | 类型检查 | `turbo typecheck` | 并行执行所有包的 tsc |
| 4 | 构建 | `turbo build` | 并行构建所有包（带依赖顺序） |
| 5 | 测试 | `turbo test` | 并行执行所有包的单元测试 |

### Turborepo 缓存策略

| 配置 | 说明 |
|:-----|:-----|
| 本地缓存 | 默认启用，命中缓存跳过未变更包的构建 |
| 远程缓存 | 可配置 Vercel Remote Cache，团队共享构建缓存 |
| 缓存输出 | `dist/**` 目录 |

---

## Release Pipeline

### 版本管理工具：Changesets

| 步骤 | 说明 |
|:-----|:-----|
| **开发者提 PR** | 运行 `pnpm changeset` 创建变更描述文件 |
| **CR 审核** | 审核代码 + 变更描述 |
| **合入 main** | CI 自动检测 changeset 文件 |
| **自动 PR** | Changesets Action 创建 "Version Packages" PR |
| **合并 Version PR** | 自动 bump 版本号 + 更新 CHANGELOG + npm publish |

### 版本号策略

| 变更类型 | 版本号变化 | 示例 |
|:---------|:----------|:-----|
| **patch** | 修复 Bug | `1.0.0` → `1.0.1` |
| **minor** | 新增功能（向后兼容） | `1.0.0` → `1.1.0` |
| **major** | 破坏性变更 | `1.0.0` → `2.0.0` |

### Changesets 配置

| 配置项 | 值 | 说明 |
|:-------|:---|:-----|
| `access` | `restricted` | 内网包，受限访问（公开则改为 `public`） |
| `baseBranch` | `main` | 基准分支 |
| `updateInternalDependencies` | `patch` | 内部包依赖自动更新 |
| `changelog` | `@changesets/cli/changelog` | CHANGELOG 格式 |

---

## 发布目标

| 方案 | 适用场景 | 说明 |
|:-----|:---------|:-----|
| **GitHub Packages** | GitHub 生态团队 | 与 GitHub 深度集成，权限管理方便 |
| **Verdaccio** | 自建私有 npm | 轻量级，自托管 |
| **npm (public)** | 开源方案 | 公开发布 |

> 推荐首选 **GitHub Packages**，与 GitHub Actions 无缝集成。

---

## 文档站部署

| 配置 | 值 |
|:-----|:---|
| 平台 | Vercel |
| 触发 | main 分支 push |
| 项目路径 | `apps/docs` |
| 构建命令 | `turbo build --filter=docs` |
| 输出目录 | `.next` |

---

## 根目录 Scripts

| 命令 | 说明 |
|:-----|:-----|
| `pnpm dev` | 启动所有包的开发模式 |
| `pnpm build` | 构建所有包 |
| `pnpm lint` | 检查所有包的代码规范 |
| `pnpm typecheck` | 检查所有包的类型 |
| `pnpm test` | 运行所有包的测试 |
| `pnpm changeset` | 创建变更描述 |
| `pnpm version-packages` | 执行版本 bump |
| `pnpm release` | 构建 + 发布 |
| `pnpm clean` | 清理所有构建产物和 node_modules |

---

## 分支策略

| 分支 | 用途 | 保护规则 |
|:-----|:-----|:---------|
| `main` | 主分支，发布源 | 必须 PR、CI 通过、至少 1 人 Review |
| `feat/*` | 功能分支 | — |
| `fix/*` | 修复分支 | — |
| `chore/*` | 杂项（配置/文档等） | — |
