# @mg/ui — 通用组件库清单

> 按功能分类，与业务域无关。首期目标 ~45 个组件。

---

## 目录结构

```
packages/ui/src/components/
├── general/          # 通用基础
├── layout/           # 布局
├── form/             # 数据录入
├── data-display/     # 数据展示
├── feedback/         # 反馈
├── navigation/       # 导航
└── overlay/          # 浮层
```

---

## 1. 通用基础 (General) — 5 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Button | `button.tsx` | 按钮，支持 variant/size/asChild | ✅ useButton |
| 2 | Icon | `icon.tsx` | 图标容器，统一尺寸/颜色 | — |
| 3 | Typography | `typography.tsx` | 排版组件 (Heading / Text / Label) | — |
| 4 | Link | `link.tsx` | 链接，支持外部/内部路由 | — |
| 5 | Separator | `separator.tsx` | 分割线（水平/垂直） | — |

---

## 2. 布局 (Layout) — 5 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Container | `container.tsx` | 最大宽度容器，居中对齐 | — |
| 2 | Stack | `stack.tsx` | 栈布局 (VStack / HStack)，统一间距 | — |
| 3 | Grid | `grid.tsx` | 网格布局，响应式列数 | — |
| 4 | AspectRatio | `aspect-ratio.tsx` | 固定宽高比容器 | — |
| 5 | ScrollArea | `scroll-area.tsx` | 自定义滚动区域 | ✅ useScrollArea |

---

## 3. 数据录入 (Form) — 10 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Input | `input.tsx` | 单行输入框 | ✅ useInput |
| 2 | Textarea | `textarea.tsx` | 多行输入框，自动高度 | — |
| 3 | Select | `select.tsx` | 下拉选择器 | ✅ useSelect |
| 4 | Checkbox | `checkbox.tsx` | 复选框 | ✅ useCheckbox |
| 5 | Radio | `radio.tsx` | 单选框 / RadioGroup | ✅ useRadioGroup |
| 6 | Switch | `switch.tsx` | 开关切换 | ✅ useSwitch |
| 7 | Slider | `slider.tsx` | 滑块 | ✅ useSlider |
| 8 | DatePicker | `date-picker.tsx` | 日期选择器 | 需自实现 |
| 9 | Upload | `upload.tsx` | 文件上传（拖拽/点击） | 需自实现 |
| 10 | Form | `form.tsx` | 表单容器（校验集成） | 需自实现 |

---

## 4. 数据展示 (Data Display) — 9 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Badge | `badge.tsx` | 徽标（状态/数字） | — |
| 2 | Avatar | `avatar.tsx` | 头像（图片/文字/组） | — |
| 3 | Tag | `tag.tsx` | 标签（可关闭/彩色） | — |
| 4 | Card | `card.tsx` | 卡片容器 | — |
| 5 | Table | `table.tsx` | 基础表格 | — |
| 6 | List | `list.tsx` | 列表 | — |
| 7 | Accordion | `accordion.tsx` | 手风琴 / 折叠面板 | ✅ useAccordion |
| 8 | Empty | `empty.tsx` | 空状态占位 | — |
| 9 | Skeleton | `skeleton.tsx` | 骨架屏加载占位 | — |

---

## 5. 反馈 (Feedback) — 5 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Alert | `alert.tsx` | 内联警告提示 (success/warning/error/info) | — |
| 2 | Toast | `toast.tsx` | 轻提示 / 通知 | 需自实现 |
| 3 | Progress | `progress.tsx` | 进度条 | ✅ useProgress |
| 4 | Spinner | `spinner.tsx` | 加载旋转指示器 | — |
| 5 | AlertDialog | `alert-dialog.tsx` | 确认对话框（阻断式） | ✅ useAlertDialog |

---

## 6. 导航 (Navigation) — 5 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Tabs | `tabs.tsx` | 标签页切换 | ✅ useTabs |
| 2 | Breadcrumb | `breadcrumb.tsx` | 面包屑导航 | — |
| 3 | Pagination | `pagination.tsx` | 分页器 | — |
| 4 | Steps | `steps.tsx` | 步骤条 | — |
| 5 | Menu | `menu.tsx` | 导航菜单（垂直/水平） | ✅ useMenu |

---

## 7. 浮层 (Overlay) — 6 个

| # | 组件 | 文件名 | 说明 | Base UI |
|:--|:-----|:-------|:-----|:-------:|
| 1 | Dialog | `dialog.tsx` | 模态对话框 | ✅ useDialog |
| 2 | Drawer | `drawer.tsx` | 抽屉面板（左/右/上/下） | 需自实现 |
| 3 | DropdownMenu | `dropdown-menu.tsx` | 下拉菜单 | ✅ useMenu |
| 4 | Popover | `popover.tsx` | 气泡卡片 | ✅ usePopover |
| 5 | Tooltip | `tooltip.tsx` | 文字提示气泡 | ✅ useTooltip |
| 6 | Sheet | `sheet.tsx` | 底部弹出面板（移动端） | 需自实现 |

---

## 汇总统计

| 分类 | 数量 | Base UI 覆盖 | 需自实现 |
|:-----|:----:|:------------:|:--------:|
| General | 5 | 1 | 4 |
| Layout | 5 | 1 | 4 |
| Form | 10 | 7 | 3 |
| Data Display | 9 | 1 | 8 |
| Feedback | 5 | 2 | 3 |
| Navigation | 5 | 2 | 3 |
| Overlay | 6 | 4 | 2 |
| **合计** | **45** | **18** | **27** |

---

## 组件设计规范

### 统一模式

每个组件遵循以下模式：

```
Base UI Hook（行为） + CVA（变体样式） + forwardRef（ref 转发）+ displayName
```

### 导出策略

| 导出项 | 路径 | 格式 |
|:-------|:-----|:-----|
| 所有组件 | `@mg/ui` | 统一入口 |
| ESM | `dist/index.mjs` | import |
| CJS | `dist/index.js` | require |
| 类型 | `dist/index.d.ts` | TypeScript |
| 样式 | `@mg/ui/styles` | CSS |

### Peer Dependencies

| 依赖 | 版本要求 |
|:-----|:---------|
| `react` | ≥18 |
| `react-dom` | ≥18 |
| `tailwindcss` | ≥4 |
