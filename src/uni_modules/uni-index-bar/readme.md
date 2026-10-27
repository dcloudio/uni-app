### 介绍

本组件以竖排方式显示字母索引，常悬浮或固定于列表右侧，用户通过点击或滑动索引条上的字母索引，触发 `select` 事件。在该事件中通过代码驱动指定的列表滚动到该字母索引所在的位置。

本组件为绝对定位，默认垂直居中于父容器右侧。

本组件不包括 list-view 组件，需要配合 list-view 使用。list-view 中需要有对应索引的 list-item，且这些 list-item 需要有 id 属性，可以通过 `scroll-into-view` 属性或 `scrollTop` 属性跳转。

本组件包括一个指示器（indicator）子组件。当用户手指触摸在索引条上的某个字母时，在触摸的字母左边悬浮显示一个水滴形气泡，箭头指向当前触摸的字母。

### 基本用法

```html
<view style="flex: 1; position: relative;">
  <list-view ref="listRef" style="flex: 1;">
    <!-- 列表内容 -->
  </list-view>
  <uni-index-bar @select="onSelect"></uni-index-bar>
</view>
```

```ts
const onSelect = (index: string) => {
  // 处理索引选择，滚动列表到对应位置
}
```

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择索引时触发 | index: string - 当前选择的索引字符 |

### 外部样式类

| 类名 | 说明 |
|------|------|
| indicator-view-class | 指示器容器样式，可自定义气泡背景色等 |
| indicator-text-class | 指示器文字样式，可自定义文字颜色等 |

### 示例

#### 自定义索引

```html
<uni-index-bar :indexs="'☆\nA\nB\nC\n#'" @select="onSelect"></uni-index-bar>
```

#### 自定义样式

```html
<uni-index-bar
  indicator-view-class="custom-indicator"
  indicator-text-class="custom-indicator-text"
  style="color: aqua;"
  @select="onSelect">
</uni-index-bar>
```

```css
.custom-indicator {
  background-color: #007aff;
}
.custom-indicator-text {
  color: #ffff00;
}
```

#### 配合 list-view 使用

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
const indexList = cityGroups.map((g): string => g.index).join('\n')
const indexViewID = ref("")

const onSelect = (index: string) => {
  indexViewID.value = 'idx-' + index
}
```
