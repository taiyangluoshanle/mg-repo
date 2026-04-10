# @mg/ui

## 0.2.1

### Patch Changes

- feat(dialog): 重构 Dialog 为开箱即用组件，支持 size/disableBackdropClick/disableEscapeKey/loading/timeout/initialFocus/destroyOnClose 等完整特性；修复遮罩点击拦截失效的 bug；优化关闭动画流畅度

  feat(ui-commerce): 新增 17 个通用组件（HighlightText/ClientOnly/NoticeBar 等）并修复 Button 类型兼容问题

## 0.2.0

### Minor Changes

- feat(ui): 重构 Button 组件，支持五种类型(primary/default/dashed/text/link)、icon、loading、ghost、danger、block、href 属性
  feat(components): 新增 @mg/components 包，包含 Apple 设计风格的 Button 和 Input 组件

## 0.1.3

### Patch Changes

- Updated dependencies
  - @mg/utils@0.2.0

## 0.1.2

### Patch Changes

- Replace CJS use-sync-external-store with pure ESM shims to eliminate \_\_require() in dist, fixing workerd/MiniOxygen compatibility

## 0.1.1

### Patch Changes

- Bundle @base-ui/react and CJS dependencies into dist to fix MiniOxygen/workerd compatibility
