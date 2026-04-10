# tempComponents 组件封装分析

> 分析时间：2026-04-01
> 组件总数：408 个 TSX 文件 + 32 个 TS 文件
> 来源：Bluetti Shopify Hydrogen 电商项目

---

## 一、整体概况

`tempComponents` 是从 Bluetti Shopify 电商项目中提取的组件集合，包含了从基础 UI 原子组件到完整业务页面的所有内容。组件的外部依赖主要包括：

| 依赖类别 | 具体依赖 |
|----------|---------|
| Shopify 生态 | `@shopify/hydrogen`, `@shopify/hydrogen-react`, Storefront API Types |
| 路由/数据 | `react-router`（v7）, `useLoaderData`, `useFetcher` |
| 状态管理 | `jotai`（`@repo/store` 中的 atoms） |
| 国际化 | `react-i18next` |
| UI 基础 | `@radix-ui/*`, `@headlessui/react`, `clsx` |
| 动画 | `framer-motion` / `motion/react` |
| 轮播 | `embla-carousel-react`, `swiper/react` |
| 工具库 | `ahooks`, `lodash` |
| 业务内部 | `@repo/lib`, `@repo/data`, `@repo/store`, `@repo/types`, `@bluetti/icons` |

---

## 二、可封装组件（✅ 推荐封装到 `@mg/ui-commerce`）

以下组件**依赖较少、通用性强**，可以抽象为通用电商组件。

### 2.1 纯 UI 组件（无外部业务依赖）

| # | 组件 | 源路径 | 映射到 | 外部依赖 | 封装难度 | 说明 |
|---|------|--------|--------|----------|---------|------|
| 1 | **HighlightText** | `HighlightText.tsx` | `@mg/ui-commerce` 新增 | 无（纯 React） | ⭐ 极低 | 文本高亮组件，支持字符串/正则/数组匹配，完全无外部依赖，可直接复用 |
| 2 | **ClientOnly** | `ClientOnly.tsx` | `@mg/utils` 新增 | 无（纯 React） | ⭐ 极低 | SSR 客户端渲染包装，纯 React 实现，建议放入 utils |
| 3 | **NoticeBar** | `NoticeBar.tsx` | `@mg/ui-commerce` 新增 | 无（纯 React） | ⭐ 极低 | 通知栏滚动组件，纯 CSS transition，无外部依赖 |
| 4 | **ParseHtml** | `ParseHtml.tsx` | `@mg/ui-commerce` 新增 | `clsx` | ⭐ 极低 | HTML 渲染组件，dangerouslySetInnerHTML + prose 样式 |
| 5 | **Loading**（全屏） | `bt-loading/Loading.tsx` | `@mg/ui-commerce` 新增 | 无（纯 React） | ⭐ 极低 | 全屏加载遮罩，SVG 动画，区别于 `@mg/ui` 的 Spinner |
| 6 | **ScrollToTop** | `ScrollToTop.tsx` | `@mg/ui-commerce` 新增 | `clsx` | ⭐ 低 | 回到顶部按钮，监听滚动方向，纯 DOM 操作 |

### 2.2 轻依赖组件（仅依赖 framer-motion 或 ahooks 等通用库）

| # | 组件 | 源路径 | 映射到 | 外部依赖 | 封装难度 | 说明 |
|---|------|--------|--------|----------|---------|------|
| 7 | **FadeIn** | `FadeIn.tsx` | `@mg/ui-commerce` 新增 | `framer-motion`, `react-intersection-observer` | ⭐⭐ 低 | 滚动渐入动画包装组件 |
| 8 | **Collapse** | `Collapse.tsx` | `@mg/ui-commerce` 新增 | `framer-motion`, `clsx` | ⭐⭐ 低 | 展开/收起动画组件，基于 AnimatePresence |
| 9 | **ProgressCircular** | `common/ProgressCircular.tsx` | `@mg/ui-commerce` 新增 | `framer-motion`, `clsx` | ⭐⭐ 低 | 圆形进度条，支持 MotionValue，适合产品页 |
| 10 | **BasicCountDown** | `bt-countdown/BasicCountDown.tsx` | `@mg/ui-commerce` 新增 | `ahooks`, `react-i18next`, `clsx` | ⭐⭐ 中 | 基础倒计时，需去掉 i18n 硬编码，改为 prop 传入 labels |
| 11 | **BoxCountDown** | `bt-countdown/BoxCountDown.tsx` | `@mg/ui-commerce` 新增 | 同上（依赖 BasicCountDown） | ⭐⭐ 中 | 方块样式倒计时，基于 BasicCountDown 的变体 |
| 12 | **BTVideo** | `BTVideo.tsx` | `@mg/ui-commerce` 新增 | `hls.js`, `@heroicons/react`, `react-intersection-observer` | ⭐⭐ 中 | HLS 视频播放器，需替换 heroicons 为自定义 icon |

### 2.3 需适度重构的组件

| # | 组件 | 源路径 | 映射到 | 外部依赖 | 封装难度 | 重构要点 |
|---|------|--------|--------|----------|---------|---------|
| 13 | **BaseDialog** | `bt-dialog/BaseDialog.tsx` | 已有 `@mg/ui` Dialog | `@radix-ui/react-dialog`, `@bluetti/icons` | ⭐⭐ 中 | 移除 `@bluetti/icons`，用 prop 传入关闭图标；或直接使用 `@mg/ui` Dialog |
| 14 | **BasicAccordion** | `bt-accordion/BasicAccordion.tsx` | 已有 `@mg/ui` Accordion | `@repo/lib`(cn), 内部 shadcn/Accordion | ⭐⭐ 中 | 替换 `cn` 为 `@mg/utils` 的 cn，替换 shadcn 为 `@mg/ui` Accordion |
| 15 | **BasicSelect** | `bt-select/BasicSelect.tsx` | 已有 `@mg/ui` Select | `@radix-ui/react-select`, 内部 shadcn, bt-dialog | ⭐⭐⭐ 中高 | 移动端底部弹窗模式有价值，但需解耦内部 shadcn 依赖 |
| 16 | **PaginationClient** | `bt-pagination/PaginationClient.tsx` | 已有 `@mg/ui` Pagination | 内部 shared/utils | ⭐⭐ 中 | 客户端分页逻辑可复用，需解耦内部工具函数 |
| 17 | **Carousel**（简版） | `common/Carousel/index.tsx` | `@mg/ui-commerce` 新增 | `embla-carousel-react` | ⭐⭐⭐ 中 | 简单图片轮播，硬编码了尺寸，需参数化 |

---

## 三、不可封装组件（❌ 强业务/框架耦合）

以下组件**深度绑定** Shopify Hydrogen 框架、项目路由数据、或特定业务逻辑，**不适合抽象为通用组件**。

### 3.1 Shopify Hydrogen 深度耦合

| 组件/目录 | 耦合原因 |
|-----------|---------|
| `bt-button/AddCart.tsx` | `@shopify/hydrogen` CartForm, `useLoaderData`, jotai atoms (`PRODUCTS_PARAMS_ATOM`), 埋点 (`buryPoint`), Facebook Pixel, PTEngine |
| `bt-button/BuyNow.tsx` | 同 AddCart，Shopify checkout 流程 |
| `common/VariantCheck.tsx` | `useLoaderData`, `useFetcher`, `useSearchParams`, Shopify Product 类型, `@repo/store` atoms |
| `Carousel.tsx`（根目录） | `@shopify/hydrogen` Image/MediaFile/ModelViewer, `@repo/data`, `@repo/lib`, i18n |
| `BTMoney.tsx` | Shopify Money 格式化, `SHOP` 类型 |
| `AddToCartButton.tsx` | Shopify CartForm API |
| `BTVariants.tsx` / `Varians.tsx` | Shopify 变体选择器, 路由数据 |
| `ProductItem.tsx` / `ProductPrice.tsx` | Shopify 产品数据模型 |
| `Checkout.tsx` | Shopify 结算流程 |

### 3.2 路由/布局深度耦合

| 组件/目录 | 耦合原因 |
|-----------|---------|
| `header/` (整个目录) | `react-router` 导航, `@repo/data` 菜单配置, `@repo/store` 状态, Shopify 搜索 API |
| `footer/` (整个目录) | `@repo/lib` (usePageLayout), `react-router` Link, 多站点配置 |
| `AnnouncementBar.tsx` | `@repo/lib`, `@repo/types`, `react-router` Link, 嵌入多种业务类型（普通/营销/优惠券）|
| `FloatingAction.tsx` | `@repo/lib` (usePageLayout), `@shopify/hydrogen` (useNonce, useLoadScript), Zoho 客服集成 |
| `Toaster.tsx` | `@repo/lib` (usePageLayout), `next-themes` |
| `Breadcrumbs.tsx` | 内部 `LayoutLink`（依赖 react-router） |
| `SearchForm*.tsx` / `SearchResults*.tsx` | Shopify Predictive Search API |
| `PageLayout.tsx` / `NotFound.tsx` | 路由布局组件 |

### 3.3 完整业务页面（营销落地页）

| 目录 | 内容 |
|------|------|
| `pages/EP2000/` | EP2000 产品落地页（30+ 组件） |
| `pages/EP760/` | EP760 产品落地页 |
| `pages/EP800Page/` | EP800 产品落地页 |
| `pages/EP13K/` | EP13K 产品落地页 |
| `pages/EP200/` | EP200 产品落地页 |
| `pages/energy-pro6K/` | Energy Pro 6K 落地页 |
| `pages/consultation/` | 咨询页面 |
| `pages/specs/` | 产品规格页 |
| `pages/components/formLottery/` | 表单抽奖活动 |

### 3.4 特定业务流程

| 目录 | 内容 |
|------|------|
| `product/` (37 个文件) | 产品详情页组件（加购、组合、比较、安装等） |
| `payment/` | 分期付款、税务计算 |
| `trade-in/` | 以旧换新流程（表单、上传、步骤） |
| `support/` | 售后支持（反馈表单、换货） |
| `members-day/` | 会员日活动（抽奖、搜索） |
| `micro-reversal/` | 特定产品营销 |
| `balkonkraftwerk/` | 阳台电站营销 |
| `Cart*.tsx` (CartMain/CartSummary等) | 购物车页面 |
| `FlashSale.tsx` | 闪购弹窗，依赖内部 shadcn |

### 3.5 图标组件（需特殊处理）

| 目录 | 说明 |
|------|------|
| `Icons/` (41 个) | Bluetti 品牌专属图标（Logo、Cart、支付图标等），**非通用 UI 图标**，建议保留在 `@mg/ui-commerce` 或独立为 `@bluetti/icons` 包，不适合放入通用组件库 |

---

## 四、映射关系总览

```
tempComponents/                     →  目标包
├── HighlightText.tsx               →  @mg/ui-commerce (新增 HighlightText)
├── ClientOnly.tsx                  →  @mg/utils (新增 ClientOnly)
├── NoticeBar.tsx                   →  @mg/ui-commerce (新增 NoticeBar)
├── ParseHtml.tsx                   →  @mg/ui-commerce (新增 ParseHtml / HtmlRenderer)
├── ScrollToTop.tsx                 →  @mg/ui-commerce (新增 ScrollToTop)
├── FadeIn.tsx                      →  @mg/ui-commerce (新增 FadeIn)
├── Collapse.tsx                    →  @mg/ui-commerce (新增 Collapse / AnimatedCollapse)
├── BTVideo.tsx                     →  @mg/ui-commerce (新增 VideoPlayer)
│
├── bt-loading/Loading.tsx          →  @mg/ui-commerce (新增 LoadingOverlay)
├── bt-countdown/BasicCountDown.tsx →  @mg/ui-commerce (新增 Countdown)
├── bt-countdown/BoxCountDown.tsx   →  @mg/ui-commerce (新增 BoxCountdown)
├── common/ProgressCircular.tsx     →  @mg/ui-commerce (新增 CircularProgress)
├── common/Carousel/                →  @mg/ui-commerce (新增 SimpleCarousel)
│
├── bt-accordion/BasicAccordion.tsx →  ✅ 已有 @mg/ui Accordion（建议迁移使用）
├── bt-dialog/BaseDialog.tsx        →  ✅ 已有 @mg/ui Dialog（建议迁移使用）
├── bt-select/BasicSelect.tsx       →  ✅ 已有 @mg/ui Select（移动端底部弹窗模式可提取）
├── bt-pagination/PaginationClient  →  ✅ 已有 @mg/ui Pagination（建议迁移使用）
│
├── bt-button/AddCart.tsx           →  ❌ 业务组件（保留在消费端项目）
├── bt-button/BuyNow.tsx            →  ❌ 业务组件（保留在消费端项目）
├── Carousel.tsx                    →  ❌ Shopify 耦合（产品图片/视频/3D）
├── AnnouncementBar.tsx             →  ❌ 业务组件（依赖后端数据结构）
├── FloatingAction.tsx              →  ❌ 业务组件（依赖 Zoho、无障碍脚本）
├── header/                         →  ❌ 业务组件
├── footer/                         →  ❌ 业务组件
├── product/                        →  ❌ 业务组件
├── payment/                        →  ❌ 业务组件
├── pages/                          →  ❌ 业务页面
├── trade-in/                       →  ❌ 业务流程
├── support/                        →  ❌ 业务流程
├── members-day/                    →  ❌ 活动专属
├── micro-reversal/                 →  ❌ 活动专属
├── Icons/                          →  🔶 品牌图标（建议 @bluetti/icons 或保留 @mg/ui-commerce）
└── 其余 ~300 个文件                →  ❌ 业务组件/页面
```

---

## 五、封装优先级建议

### P0 - 立即封装（无依赖，直接复用）
1. `HighlightText` - 搜索高亮场景必备
2. `ClientOnly` - SSR 项目标配工具
3. `NoticeBar` - 电商通知栏
4. `ParseHtml` - 富文本渲染
5. `LoadingOverlay` (bt-loading) - 全屏加载

### P1 - 优先封装（轻依赖，高复用率）
6. `Countdown` + `BoxCountdown` - 电商促销核心组件
7. `FadeIn` - 营销页常用动画
8. `ScrollToTop` - 长页面标配
9. `Collapse` - 展开收起交互

### P2 - 按需封装（需适度重构）
10. `CircularProgress` - 特定场景使用
11. `VideoPlayer` (BTVideo) - 需要 hls.js 依赖
12. `SimpleCarousel` - 需参数化重构
13. `BasicSelect` 的移动端底部弹窗模式 - 可作为 `@mg/ui` Select 的扩展

---

## 六、统计摘要

| 分类 | 数量 | 占比 |
|------|------|------|
| ✅ 可直接封装 | 6 个 | ~1.5% |
| 🔧 需适度重构后封装 | 11 个 | ~2.7% |
| 🔶 已有对应组件（建议迁移） | 4 个 | ~1.0% |
| ❌ 不可封装（业务耦合） | ~387 个 | ~94.8% |

> **结论**：约 **95% 的组件**是业务级组件，与 Shopify Hydrogen 框架、路由数据、后端 API 深度绑定，不适合抽象为通用组件库。可封装的约 **17 个通用 UI 组件**，建议按优先级逐步迁入 `@mg/ui-commerce` 包。
