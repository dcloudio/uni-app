# uni-index-bar 索引列表组件

## 用途和场景

uni-index-bar 以竖排方式显示字母索引，常悬浮或固定于列表右侧。用户点击或滑动索引条上的字母时触发 `select` 事件，由使用者在事件中驱动列表滚动到对应字母的位置。

本组件为绝对定位，默认垂直居中于父容器右侧，适合城市列表、联系人列表等带字母分组的场景。

## 使用方式（职责分工）

组件内部负责：

- 渲染竖排索引字符（`indexs` 按换行符分行）。
- 处理触摸/点击/键盘选择，并触发 `select` 事件。
- 触摸时在索引条左侧显示水滴形气泡，展示当前触摸的索引字符，并可经外部样式类定制。

使用者负责：

- 提供一个相对定位的父容器，将本组件与列表放在一起。
- 使用 `list-view` 渲染列表，并为可跳转的分组设置带 `id` 的 `list-item`。
- 在 `select` 事件中通过 `scroll-into-view` 或 `scrollTop` 驱动列表跳转。
- 按需通过外部样式类定制指示器气泡和文字样式。

本组件不包含列表组件，必须配合 `list-view` 使用。

## 基本用法

```html
<view style="flex: 1; position: relative;">
  <list-view ref="listRef" style="flex: 1;">
    <!-- 列表内容，分组项需要有 id -->
  </list-view>
  <uni-index-bar @select="onSelect"></uni-index-bar>
</view>
```

```ts
const onSelect = (index : string) => {
  // 处理索引选择，滚动列表到对应位置
}
```

自定义索引字符，使用换行符 `\n` 分隔：

```html
<uni-index-bar :indexs="'☆\nA\nB\nC\n#'" @select="onSelect"></uni-index-bar>
```

自定义指示器样式，通过外部样式类 `indicator-view-class`、`indicator-text-class`：

```html
<uni-index-bar
  indicator-view-class="custom-indicator"
  indicator-text-class="custom-indicator-text"
  @select="onSelect">
</uni-index-bar>
```

配合 `list-view` 使用的完整示例：

```html
<view style="flex: 1; position: relative;">
  <list-view ref="listRef" style="flex: 1;" :scroll-into-view="indexViewID">
    <template v-for="group in cityGroups" :key="group.index">
      <list-item :id="'idx-' + group.index" type="header">
        <view class="group-header">
          <text>{{ group.index }}</text>
        </view>
      </list-item>
      <list-item v-for="city in group.cities" :key="city.id" type="city">
        <view class="city-item">
          <text>{{ city.name }}</text>
        </view>
      </list-item>
    </template>
  </list-view>
  <uni-index-bar :indexs="indexList" @select="onSelect"></uni-index-bar>
</view>
```

```ts
const indexList = cityGroups.map((g) : string => g.index).join('\n')
const indexViewID = ref('')

const onSelect = (index : string) => {
  indexViewID.value = 'idx-' + index
}
```

## 注意事项

- 组件为绝对定位，需要放在相对定位的父容器内，否则索引条位置会基于页面定位。
- 列表中的可跳转分组需要有可作为 `scroll-into-view` 目标的 `id`。
- 在 Web 平台，索引条支持键盘操作：获得焦点后可用上下方向键切换索引，按回车或空格确认选择。

## 示例页面

`/pages/uni-ui/index-bar/index-bar`
