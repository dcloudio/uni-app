# uni-drag-cell 可拖拽排序单元格

`uni-drag-cell` 是一个基于 uni-app x 蒸汽模式实现的可拖拽排序组件。通过 `v-model` 绑定数组，通过插槽渲染每一项内容，拖拽松手后组件回传新的顺序。

## 用途和场景

- 标签排序、支付方式排序
- 宫格排序、九宫格图片选择与排序
- 单列列表排序
- 带删除能力的拖拽（拖到屏幕底部删除）
- 尾部追加“+”入口
- 手柄拖拽排序

组件支持长按拖拽和手柄拖拽两种进入拖拽态的方式，具备对数组数据的排序、添加、删除能力。

组件不适合超长虚拟列表，也不具备拖动到顶部或底部后自动滚动列表的能力。

## 使用方式

### 职责分工

组件负责：

- 维护内部预览顺序，拖动过程只改视觉，不改外部数组
- 松手后通过 `update:modelValue` 和 `change` 回传最终数组
- 处理删除条命中判定、追加项定位、手柄拖拽

使用者负责：

- 用 `v-model` 绑定数组
- 通过 `default` 插槽渲染每一项，通过 `append` 插槽渲染固定入口，通过 `handle` 插槽渲染拖拽手柄
- 在收到 `change` 后按需更新自己的数据源

### 交互模式

- 长按拖拽（默认）：长按 `350ms` 进入拖拽态，按下后移动超过阈值会取消本次长按，避免页面滚动误触发。
- 手柄拖拽：`handle-mode` 为 `true` 且提供 `handle` 插槽时启用手柄模式，无需长按，只有拖动手柄才会排序。

### 插槽

- `default`：参数 `{ item, index }`，渲染每一个可排序项，组件不限制视觉形式。
- `append`：列表末尾的固定入口，不参与拖拽排序、不写入 `v-model`、不会被删除。
- `handle`：参数 `{ item, index }`，拖拽手柄插槽，仅在 `handle-mode` 开启时生效。

### 键盘操作（Web）

Web 端每个可排序项可获得焦点，聚焦后使用方向键可把当前项向前/向后移动一位，等效于拖拽排序的结果。

## 基本用法示例

### 1. 基础标签排序

```vue
<uni-drag-cell v-model="tagList">
  <template #default="{ item, index }">
    <view class="tag-item" @click="onClickTag(item, index)">
      <text>{{ item }}</text>
    </view>
  </template>
</uni-drag-cell>
```

### 2. 宫格排序

```vue
<uni-drag-cell v-model="gridList" :column="3">
  <template #default="{ item }">
    <view class="grid-item">
      <text>{{ item.name }}</text>
    </view>
  </template>
</uni-drag-cell>
```

### 3. 带删除条的拖拽

```vue
<uni-drag-cell v-model="list" :show-close="true">
  <template #default="{ item }">
    <view class="cell-item">
      <text>{{ item }}</text>
    </view>
  </template>
</uni-drag-cell>
```

### 4. 尾部追加一个固定入口

```vue
<uni-drag-cell v-model="tagList" :show-append="true">
  <template #default="{ item }">
    <view class="tag-item">
      <text>{{ item }}</text>
    </view>
  </template>
  <template #append>
    <view class="tag-add" @click="addTag">
      <text>+</text>
    </view>
  </template>
</uni-drag-cell>
```

### 5. 九宫格图片选择

```vue
<uni-drag-cell
  v-model="imageList"
  :column="3"
  :show-close="true"
  :show-append="imageList.length < 9">
  <template #default="{ item, index }">
    <view class="image-item" @click="previewImage(index)">
      <image :src="item" mode="aspectFill"></image>
    </view>
  </template>
  <template #append>
    <view class="image-add" @click="chooseImages">
      <text>+</text>
    </view>
  </template>
</uni-drag-cell>
```

### 6. 手柄拖拽排序

```vue
<uni-drag-cell v-model="list" :column="1" :handle-mode="true">
  <template #default="{ item }">
    <view class="cell-item">
      <text>{{ item }}</text>
    </view>
  </template>
  <template #handle>
    <view class="cell-handle">
      <text>≡</text>
    </view>
  </template>
</uni-drag-cell>
```

## 注意事项

- 建议每个 item 的宽高尽量稳定，尤其是宫格模式下，否则拖动命中感和排序预览观感会不稳定。
- 手柄模式下手柄覆盖在 item 右上角，建议给内容区预留右侧空间，避免遮挡正文。
- `append` 只是固定入口，不是数据项：不参与排序、不进入 `v-model`、不会被删除。需要真正的数据项请直接写进 `modelValue`。
- 外部不要在拖拽过程中频繁整体替换列表，建议由组件在松手后统一回传结果，父组件收到 `change` 后再更新数据源。
- 拖拽过程内部维护“预览顺序”，拖动中不会频繁改写外部数组，只在松手后回传一次，避免频繁触发父组件重渲染。
- 该组件适合小中型标签列表、宫格、表单排序、九宫格图片选择；超长列表或虚拟滚动列表请使用专门为大数据量设计的方案。
