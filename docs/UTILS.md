# @mg/utils — 公共方法库清单

> 纯函数、Tree-shakable、类型完备、零依赖（仅 clsx + tailwind-merge）。

---

## 目录结构

```
packages/utils/src/
├── cn.ts              # clsx + twMerge 封装（最高频）
├── string/            # 字符串处理
├── number/            # 数字/金额
├── date/              # 日期处理
├── validation/        # 校验工具
├── storage/           # 本地存储封装
├── dom/               # DOM 操作
├── type-guards/       # 类型守卫
└── index.ts           # 统一导出
```

---

## 设计原则

| 原则 | 说明 |
|:-----|:-----|
| **纯函数** | 无副作用，输入确定则输出确定 |
| **Tree-shakable** | 每个函数独立文件，ESM 导出 |
| **类型完备** | 所有函数有完整 TypeScript 类型 + JSDoc |
| **零依赖** | 除 clsx 和 tailwind-merge 外无第三方依赖 |
| **防御性编程** | 所有函数对异常输入有安全处理 |

---

## 1. cn — 类名合并（核心）

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `cn` | `(...inputs: ClassValue[]) => string` | clsx + tailwind-merge，合并 Tailwind 类名并处理冲突 |

---

## 2. string — 字符串处理

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `truncate` | `(str: string, maxLen: number, suffix?: string) => string` | 截断字符串，超出部分加省略号 |
| 2 | `capitalize` | `(str: string) => string` | 首字母大写 |
| 3 | `slugify` | `(str: string) => string` | 转为 URL 友好的 slug |
| 4 | `escapeHtml` | `(str: string) => string` | HTML 转义 |
| 5 | `camelToKebab` | `(str: string) => string` | 驼峰转短横线 |
| 6 | `kebabToCamel` | `(str: string) => string` | 短横线转驼峰 |

---

## 3. number — 数字/金额

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `clamp` | `(value: number, min: number, max: number) => number` | 限制数值范围 |
| 2 | `formatCurrency` | `(amount: number, options?: CurrencyOptions) => string` | 金额格式化（¥1,234.56） |
| 3 | `formatPercent` | `(value: number, decimals?: number) => string` | 百分比格式化 |
| 4 | `randomInt` | `(min: number, max: number) => number` | 随机整数 |
| 5 | `toFixed` | `(value: number, decimals: number) => string` | 安全的小数点截断（解决精度问题） |
| 6 | `formatNumber` | `(value: number, options?: NumberOptions) => string` | 数字千分位格式化 |

---

## 4. date — 日期处理

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `formatDate` | `(date: DateInput, format?: string) => string` | 日期格式化（YYYY-MM-DD 等） |
| 2 | `relativeTime` | `(date: DateInput) => string` | 相对时间（3 分钟前、昨天等） |
| 3 | `isToday` | `(date: DateInput) => boolean` | 判断是否今天 |
| 4 | `isYesterday` | `(date: DateInput) => boolean` | 判断是否昨天 |
| 5 | `daysBetween` | `(start: DateInput, end: DateInput) => number` | 计算两个日期之间的天数 |

---

## 5. validation — 校验工具

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `isEmail` | `(value: string) => boolean` | 邮箱格式校验 |
| 2 | `isPhone` | `(value: string) => boolean` | 手机号格式校验（中国大陆） |
| 3 | `isUrl` | `(value: string) => boolean` | URL 格式校验 |
| 4 | `isEmpty` | `(value: unknown) => boolean` | 判断空值（null/undefined/空字符串/空数组/空对象） |
| 5 | `isIdCard` | `(value: string) => boolean` | 身份证号校验（18 位） |

---

## 6. storage — 本地存储封装

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `safeGetItem` | `<T>(key: string, fallback: T) => T` | 安全读取 localStorage（自动 JSON.parse，异常返回 fallback） |
| 2 | `safeSetItem` | `(key: string, value: unknown) => boolean` | 安全写入 localStorage（自动 JSON.stringify，返回是否成功） |
| 3 | `safeRemoveItem` | `(key: string) => void` | 安全删除 localStorage |
| 4 | `sessionGet` | `<T>(key: string, fallback: T) => T` | 安全读取 sessionStorage |
| 5 | `sessionSet` | `(key: string, value: unknown) => boolean` | 安全写入 sessionStorage |

---

## 7. dom — DOM 操作

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `copyToClipboard` | `(text: string) => Promise<boolean>` | 复制文本到剪贴板 |
| 2 | `scrollTo` | `(target: Element \| number, options?: ScrollOptions) => void` | 平滑滚动到目标 |
| 3 | `getScrollPosition` | `() => { x: number; y: number }` | 获取当前滚动位置 |
| 4 | `isInViewport` | `(el: Element) => boolean` | 判断元素是否在可视区域 |

---

## 8. type-guards — 类型守卫

| # | 函数 | 签名 | 说明 |
|:--|:-----|:-----|:-----|
| 1 | `isDefined` | `<T>(value: T \| undefined \| null) => value is T` | 排除 null/undefined |
| 2 | `isString` | `(value: unknown) => value is string` | 判断字符串 |
| 3 | `isNumber` | `(value: unknown) => value is number` | 判断数字（排除 NaN） |
| 4 | `isObject` | `(value: unknown) => value is Record<string, unknown>` | 判断普通对象 |
| 5 | `isArray` | `<T>(value: unknown) => value is T[]` | 判断数组 |
| 6 | `isFunction` | `(value: unknown) => value is Function` | 判断函数 |

---

## 汇总统计

| 模块 | 函数数量 | 说明 |
|:-----|:--------:|:-----|
| cn | 1 | 最高频，单独文件 |
| string | 6 | 字符串处理 |
| number | 6 | 数字/金额格式化 |
| date | 5 | 日期处理 |
| validation | 5 | 校验工具 |
| storage | 5 | 本地存储封装 |
| dom | 4 | DOM 操作 |
| type-guards | 6 | 类型守卫 |
| **合计** | **38** | — |
