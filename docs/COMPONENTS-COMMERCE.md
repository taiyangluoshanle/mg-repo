# @mg/ui-commerce — 电商域组件清单

> 电商业务专用组件，由 `@mg/ui` 通用组件组合而成。仅电商业务项目安装。

---

## 目录结构

```
packages/ui-commerce/src/components/
├── product/           # 商品
├── price/             # 价格
├── cart/              # 购物车
├── order/             # 订单
└── promotion/         # 营销
```

---

## 1. 商品 (Product) — 5 个

| # | 组件 | 文件名 | 说明 | 组合自 @mg/ui |
|:--|:-----|:-------|:-----|:-------------|
| 1 | ProductCard | `product-card.tsx` | 商品卡片（图片 + 标题 + 价格 + 标签） | Card, Badge, Typography |
| 2 | ProductGallery | `product-gallery.tsx` | 商品图片画廊（缩略图 + 主图 + 放大镜） | AspectRatio, ScrollArea |
| 3 | SkuSelector | `sku-selector.tsx` | SKU 规格选择器（颜色/尺寸/规格） | Button, Tag |
| 4 | QuantityStepper | `quantity-stepper.tsx` | 数量步进器（+/- 按钮） | Button, Input |
| 5 | ProductRating | `product-rating.tsx` | 评分展示（星星 + 分数） | Icon, Typography |

---

## 2. 价格 (Price) — 3 个

| # | 组件 | 文件名 | 说明 | 组合自 @mg/ui |
|:--|:-----|:-------|:-----|:-------------|
| 1 | PriceDisplay | `price-display.tsx` | 价格展示（原价/促销价/折扣百分比） | Typography |
| 2 | PriceRange | `price-range.tsx` | 价格区间展示 | Typography |
| 3 | CouponTag | `coupon-tag.tsx` | 优惠券标签（满减/折扣/立减） | Badge, Tag |

---

## 3. 购物车 (Cart) — 3 个

| # | 组件 | 文件名 | 说明 | 组合自 @mg/ui |
|:--|:-----|:-------|:-----|:-------------|
| 1 | CartItem | `cart-item.tsx` | 购物车单项（商品信息 + 数量 + 小计） | Card, Avatar, QuantityStepper |
| 2 | CartSummary | `cart-summary.tsx` | 购物车汇总（总价/优惠/运费） | Card, Separator, Typography |
| 3 | CartDrawer | `cart-drawer.tsx` | 购物车侧滑面板 | Drawer, List, Button |

---

## 4. 订单 (Order) — 4 个

| # | 组件 | 文件名 | 说明 | 组合自 @mg/ui |
|:--|:-----|:-------|:-----|:-------------|
| 1 | OrderCard | `order-card.tsx` | 订单卡片（订单号/状态/商品列表/金额） | Card, Badge, List |
| 2 | OrderStatus | `order-status.tsx` | 订单状态展示（待付款/已发货/已完成等） | Badge, Steps |
| 3 | OrderTimeline | `order-timeline.tsx` | 订单物流时间线 | Steps, Typography |
| 4 | AddressCard | `address-card.tsx` | 收货地址卡片（姓名/电话/地址/默认标记） | Card, Badge, Typography |

---

## 5. 营销 (Promotion) — 3 个

| # | 组件 | 文件名 | 说明 | 组合自 @mg/ui |
|:--|:-----|:-------|:-----|:-------------|
| 1 | CountdownTimer | `countdown-timer.tsx` | 倒计时组件（天/时/分/秒） | Typography |
| 2 | FlashSaleBadge | `flash-sale-badge.tsx` | 限时特价标签 | Badge |
| 3 | BannerCarousel | `banner-carousel.tsx` | 轮播 Banner | AspectRatio, Button |

---

## 汇总统计

| 分类 | 数量 |
|:-----|:----:|
| Product | 5 |
| Price | 3 |
| Cart | 3 |
| Order | 4 |
| Promotion | 3 |
| **合计** | **18** |

---

## 依赖关系

| 依赖 | 类型 | 说明 |
|:-----|:-----|:-----|
| `@mg/ui` | dependency | 基于通用组件组合 |
| `@mg/utils` | dependency | 使用工具函数（格式化价格等） |
| `@mg/tailwind-config` | devDependency | 使用设计令牌 |
| `react` ≥18 | peerDependency | — |
| `react-dom` ≥18 | peerDependency | — |
| `tailwindcss` ≥4 | peerDependency | — |

---

## 未来可扩展的业务域包

| 包名 | 适用场景 | 典型组件 | 优先级 |
|:-----|:---------|:---------|:------:|
| `@mg/ui-commerce` | 电商业务 | ProductCard, CartDrawer, SkuSelector | 🟢 首期 |
| `@mg/ui-data` | 数据密集型后台 | AdvancedTable, Chart, Kanban, TreeSelect | 🟡 二期 |
| `@mg/ui-form-pro` | 复杂表单场景 | FormBuilder, DynamicForm, SchemaForm | 🟡 二期 |
| `@mg/ui-marketing` | 营销 / 落地页 | HeroSection, FeatureGrid, TestimonialCard | 🔴 按需 |
| `@mg/ui-editor` | 内容编辑 | RichTextEditor, MarkdownEditor, CodeEditor | 🔴 按需 |
