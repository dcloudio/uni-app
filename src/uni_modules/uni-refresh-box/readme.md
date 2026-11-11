# uni-refresh-box 自定义下拉刷新

## 用途和场景

用于 `scroll-view`、`list-view` 等滚动容器的自定义下拉刷新。

将它放入滚动容器的 `refresher` 插槽中，即可得到"左侧 loading 圈 + 右侧提示文字"的自定义刷新样式；也可以完全自定义刷新提示，或通过 `loading` 插槽替换整个刷新区内容。

## 使用方式（职责分工）

- 组件内部负责：根据传入的 `pullingDistance`、`refreshing` 计算当前刷新状态（下拉中 / 松手刷新 / 刷新中 / 刷新完成 / 归位），维护提示文字与 loading 旋转角度，并根据系统语言提供内置文案。
- 使用者负责：
  - 在滚动容器上开启 `refresher-enabled`、设置 `refresher-triggered`，并把本组件放入 `refresher` 插槽（插槽放在组件外层标签上，不要写在组件内部根节点上）。
  - 接管 `@refresherpulling`、`@refresherrefresh`、`@refresherrestore`、`@refresherabort`，把下拉距离和刷新状态同步给组件，并在刷新完成后把 `refreshing` 置回 `false`。
  - 按需通过 `pulling-text`、`loosing-text`、`loading-text`、`complete-text` 覆盖提示文字；不再传入时跟随系统语言，传入空字符串则不显示文字。
  - 通过外部样式类 `loading-class`、`text-class` 自定义 loading 与提示文字样式。

## 基本用法

```vue
<template>
  <scroll-view
    style="flex: 1;"
    :refresher-enabled="true"
    :refresher-triggered="refreshing1"
    refresher-default-style="none"
    :refresher-threshold="45"
    refresher-max-drag-distance="200px"
    @refresherpulling="onRefresherpulling1"
    @refresherrefresh="onRefresherrefresh1"
    @refresherrestore="onRefresherrestore1"
    @refresherabort="onRefresherabort1"
  >
    <view v-for="i in listCount1" :key="i" class="content-item">
      <text class="text">item-{{ i }}</text>
    </view>

    <uni-refresh-box
      slot="refresher"
      :pulling-distance="pullingDistance1"
      :refreshing="refreshing1"
    ></uni-refresh-box>
  </scroll-view>
</template>

<script setup lang="ts">
const listCount1 = ref(3)
const refreshing1 = ref(false)
const pullingDistance1 = ref(0)

function onRefresherpulling1(e : RefresherEvent) {
  pullingDistance1.value = e.detail.dy
}

function onRefresherrefresh1() {
  refreshing1.value = true
  setTimeout(() => {
    listCount1.value += 5
    refreshing1.value = false
  }, 1500)
}

function onRefresherrestore1() {
  pullingDistance1.value = 0
}

function onRefresherabort1() {
  pullingDistance1.value = 0
}
</script>
```

### 自定义刷新内容

通过 `loading` 插槽替换默认 loading。插槽参数 `state` 为当前刷新状态，可用于切换图标：

```vue
<uni-refresh-box
  slot="refresher"
  :pulling-distance="pullingDistance"
  :refreshing="refreshing"
>
  <template #loading="{ state }">
    <image v-if="state == 2" src="/static/loading.gif" style="width: 20px; height: 20px;" />
    <image v-else src="/static/pull.png" style="width: 20px; height: 20px;" />
  </template>
</uni-refresh-box>
```

## 注意事项

- 提示文字不传入时跟随系统语言（内置中文简体、中文繁体、英文、法文、拉丁文）；传入空字符串则对应状态不显示文字。
- `state` 取值说明：`0` 下拉中（未达到阈值）、`1` 松手可刷新（已达到阈值）、`2` 刷新中、`3` 刷新完成、`4` 归位中（不显示文字）。
- `loading` 插槽的插槽参数为 `{ state }`。
- 示例页面路径：`/pages/uni-ui/refresh-box/refresh-box.uvue`。
- 鸿蒙平台需要在组件内部根元素上补 `slot="refresher"`，部分平台则只认组件外层标签上的 `slot="refresher"`。
