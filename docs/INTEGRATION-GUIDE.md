# 业务项目接入指南

> 三步接入，零配置使用。

---

## 接入步骤

### 第一步：安装依赖

| 命令 | 说明 |
|:-----|:-----|
| `pnpm add @mg/ui @mg/utils @mg/tailwind-config` | 安装核心三件套 |
| `pnpm add @mg/ui-commerce` | （可选）电商业务项目额外安装 |
| `pnpm add -D @mg/tsconfig @mg/eslint-config` | （推荐）安装共享开发配置 |

### 第二步：配置 TailwindCSS

```typescript
// tailwind.config.ts
import mgPreset from '@mg/tailwind-config/preset';
import type { Config } from 'tailwindcss';

export default {
  presets: [mgPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@mg/ui/dist/**/*.{js,mjs}',
    './node_modules/@mg/ui-commerce/dist/**/*.{js,mjs}',  // 电商项目需要
  ],
} satisfies Config;
```

### 第三步：引入基础样式

```css
/* src/styles/globals.css */
@import '@mg/tailwind-config/base.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 使用示例

### 组件使用

```tsx
import { Button, Dialog, Input, Badge } from '@mg/ui';

const MyPage = () => (
  <div>
    <Button variant="primary" size="md">提交</Button>
    <Badge variant="success">已完成</Badge>
  </div>
);
```

### 工具函数使用

```tsx
import { cn, formatCurrency, isEmail, truncate } from '@mg/utils';

// 类名合并
<div className={cn('p-4', isActive && 'bg-brand')} />

// 金额格式化
formatCurrency(1234.5);  // '¥1,234.50'

// 邮箱校验
isEmail('test@example.com');  // true

// 字符串截断
truncate('很长的商品名称...', 10);  // '很长的商品名称...'
```

### 电商组件使用

```tsx
import { ProductCard, PriceDisplay, CartDrawer } from '@mg/ui-commerce';

const ShopPage = () => (
  <ProductCard
    image="/product.jpg"
    title="商品名称"
    price={<PriceDisplay original={199} current={99} />}
  />
);
```

### 暗黑模式

```tsx
// 在 <html> 或 <body> 上切换 class 即可
<html className="dark">
  {/* 所有组件自动适配暗黑模式 */}
</html>
```

---

## 可选配置

### TypeScript 配置（推荐）

```json
// tsconfig.json
{
  "extends": "@mg/tsconfig/react-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### ESLint 配置（推荐）

```js
// .eslintrc.js
module.exports = {
  extends: ['@mg/eslint-config/react'],
};
```

---

## 按需安装矩阵

| 业务类型 | @mg/ui | @mg/utils | @mg/tailwind-config | @mg/ui-commerce | @mg/tsconfig | @mg/eslint-config |
|:---------|:------:|:---------:|:-------------------:|:---------------:|:------------:|:-----------------:|
| **电商项目** | ✅ | ✅ | ✅ | ✅ | 推荐 | 推荐 |
| **后台管理** | ✅ | ✅ | ✅ | — | 推荐 | 推荐 |
| **官网/营销页** | ✅ | ✅ | ✅ | — | 推荐 | 推荐 |
| **纯 Node 服务** | — | ✅ | — | — | 推荐 | 推荐 |

---

## 版本升级

| 操作 | 命令 |
|:-----|:-----|
| 查看可升级版本 | `pnpm outdated @mg/*` |
| 升级到最新 | `pnpm update @mg/ui @mg/utils @mg/tailwind-config` |
| 升级到指定版本 | `pnpm add @mg/ui@2.1.0` |
| 查看 CHANGELOG | 文档站 → Changelog 页面 |
