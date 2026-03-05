# page-container 页面容器组件

页面容器组件，用于在页面内创建"假页面"效果，支持拦截返回操作。

## 平台支持

本组件仅支持 Web 和 App 平台（uni-app x），不支持微信小程序（微信小程序有内置的 page-container 组件）。

## 功能特性

- ✅ 支持五种弹出位置：top、bottom、left、right、center
- ✅ 支持自定义动画时长
- ✅ 支持显示/隐藏蒙层
- ✅ 支持圆角显示
- ✅ 支持下滑关闭（bottom 位置）
- ✅ 支持自定义样式
- ✅ **支持拦截返回操作**（右滑手势、安卓物理返回键、navigateBack）
- ✅ **Web 平台滚动穿透防护**（自动禁止背景页面滚动）

## 核心功能

### 1. 返回拦截

拦截用户的返回操作，包括右滑手势、安卓物理返回键和调用 navigateBack 接口。
用户进行返回操作时，首先判断页面是否有 page-container 显示，如有显示，则不进行返回，而是关闭 page-container 组件。
在 Web 和 App 平台，组件内部自动监听页面的 onBackPress 生命周期。

### 2. Web 平台滚动穿透防护

在 Web 平台，当打开**带蒙层**（`overlay: true`）的 page-container 时，组件会自动设置 `document.body.style.overflow = 'hidden'` 禁止背景页面滚动，避免滚动穿透问题。

当 page-container 关闭时，会检查是否还有其他带蒙层的实例显示：

- 如果还有其他带蒙层的实例，保持背景禁止滚动
- 如果没有带蒙层的实例了，自动恢复页面滚动

**无蒙层**（`overlay: false`）的 page-container 不会影响背景页面滚动。此功能仅在 Web 平台生效，使用条件编译实现，不影响 App 平台性能。

## 使用方法

### 基本用法

```vue
<template>
  <view>
    <button @click="show = true">打开容器</button>

    <page-container :show="show" @clickoverlay="show = false">
      <view style="padding: 20px;">
        <text>容器内容</text>
        <button @click="show = false">关闭</button>
      </view>
    </page-container>
  </view>
</template>

<script setup lang="uts">
const show = ref(false)
</script>
```

### 核心功能说明

**自动拦截返回：** 组件会自动拦截页面的返回操作（右滑手势、安卓物理返回键、navigateBack 接口）。

**Web 滚动防护：** 在 Web 平台，带蒙层的 page-container 会自动防止滚动穿透。无蒙层时背景页面可以正常滚动。

以上功能**无需任何额外配置**，引入组件即可使用。

## 文件位置

- 组件演示页面源码：`/pages/page-container/page-container.uvue`
- 组件源码：`/uni_modules/page-container/components/page-container/page-container.uvue`（包含全局实例管理逻辑）
- 自动化测试脚本：`/pages/page-container/page-container.test.js`

# 组件规范

|        属性         |    类型     | 默认值 | 必填 |                       说明                       |
| :-----------------: | :---------: | :----: | :--: | :----------------------------------------------: |
|        show         |   boolean   | false  |  否  |                 是否显示容器组件                 |
|      duration       |   number    |  300   |  否  |                动画时长，单位毫秒                |
|       z-index       |   number    |  100   |  否  |                   z-index 层级                   |
|       overlay       |   boolean   |  true  |  否  |                  是否显示遮罩层                  |
|      position       |   string    | bottom |  否  | 弹出位置，可选值为  top bottom left right center |
|        round        |   boolean   | false  |  否  |                   是否显示圆角                   |
| close-on-slide-down |   boolean   | false  |  否  |             是否在下滑一段距离后关闭             |
|    overlay-style    |   string    |        |  否  |                 自定义遮罩层样式                 |
|    custom-style     |   string    |        |  否  |                 自定义弹出层样式                 |
|    @beforeenter     |             |        |  否  |                    进入前触发                    |
|       @enter        |             |        |  否  |                    进入中触发                    |
|     @afterenter     |             |        |  否  |                    进入后触发                    |
|    @beforeleave     |             |        |  否  |                    离开前触发                    |
|       @leave        |             |        |  否  |                    离开中触发                    |
|     @afterleave     |             |        |  否  |                    离开后触发                    |
|    @clickoverlay    | eventhandle |        |  否  |                 点击遮罩层时触发                 |

## 使用示例

### 不同位置

```vue
<!-- 底部弹出 -->
<page-container :show="show" position="bottom">
  <view style="padding: 20px;">底部弹出的内容</view>
</page-container>

<!-- 顶部弹出 -->
<page-container :show="show" position="top">
  <view style="padding: 20px;">顶部弹出的内容</view>
</page-container>

<!-- 左侧弹出 -->
<page-container :show="show" position="left">
  <view style="padding: 20px;">左侧弹出的内容</view>
</page-container>

<!-- 右侧弹出 -->
<page-container :show="show" position="right">
  <view style="padding: 20px;">右侧弹出的内容</view>
</page-container>

<!-- 居中弹出 -->
<page-container :show="show" position="center">
  <view style="padding: 20px;">居中弹出的内容</view>
</page-container>
```

### 圆角显示

```vue
<page-container :show="show" position="bottom" :round="true">
  <view style="padding: 20px;">带圆角的容器</view>
</page-container>
```

### 下滑关闭

```vue
<page-container :show="show" position="bottom" :closeOnSlideDown="true">
  <view style="padding: 20px;">可以下滑关闭的容器</view>
</page-container>
```

### 自定义样式

```vue
<page-container
  :show="show"
  overlayStyle="background-color: rgba(0, 0, 0, 0.8);"
  customStyle="background-color: #f0f0f0; padding: 30px;"
>
  <view>自定义样式的容器</view>
</page-container>
```

### 事件监听

```vue
<template>
  <page-container
    :show="show"
    @beforeenter="onBeforeEnter"
    @enter="onEnter"
    @afterenter="onAfterEnter"
    @beforeleave="onBeforeLeave"
    @leave="onLeave"
    @afterleave="onAfterLeave"
    @clickoverlay="onClickOverlay"
  >
    <view style="padding: 20px;">容器内容</view>
  </page-container>
</template>

<script setup lang="uts">
const onBeforeEnter = () => {
  console.log('进入前')
}

const onEnter = () => {
  console.log('进入中')
}

const onAfterEnter = () => {
  console.log('进入后')
}

const onBeforeLeave = () => {
  console.log('离开前')
}

const onLeave = () => {
  console.log('离开中')
}

const onAfterLeave = () => {
  console.log('离开后')
}

const onClickOverlay = () => {
  console.log('点击蒙层')
  // 默认会关闭容器，如需阻止可在这里处理
}
</script>
```

## 注意事项

1. **自动返回拦截**：组件会自动拦截页面的返回操作，无需手动配置
2. **支持多个实例**：技术上支持在同一页面使用多个 page-container，组件会自动管理返回操作（优先关闭最后打开的）
3. **仅支持 Web 和 App**：本组件不支持微信小程序，微信小程序请使用内置的 page-container 组件
4. **属性命名**：在代码中使用驼峰命名（如 `closeOnSlideDown`），在模板中可以使用短横线命名（如 `close-on-slide-down`）

## 完整示例

参见演示页面：`/pages/page-container/page-container.uvue`
