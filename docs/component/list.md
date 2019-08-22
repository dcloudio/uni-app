#### list

app端nvue专用组件。

`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 `<list>` 标签内使用一组由简单数组循环生成的 `<cell>` 标签填充。

```
<template>
  <list>
    <cell v-for="num in lists">
      <text>{{num}}</text>
    </cell>
  </list>
</template>

<script>
  export default {
    data () {
      return {
        lists: ['A', 'B', 'C', 'D', 'E']
      }
    }
  }
</script>
```

> **注意**
> - 不允许相同方向的 `<list>` 或者 `<scroll-view>` 互相嵌套，换句话说就是嵌套的 `<list>` / `<scroll-view>` 必须是不同的方向。
> - `<list>` 需要显式的设置其宽高，可使用 position: absolute; 定位或 width、height 设置其宽高值。

#### 子组件
`<list>` 的子组件只能包括以下四种组件或是 fix 定位的组件，其他形式的组件将不能被正确渲染。

- `<cell>`<br>
 用于定义列表中的子列表项，类似于 HTML 中的 ul 之于 li。`<list>` 会对 `<cell>` 进行高效的内存回收以达到更好的性能。
- `<header>`<br>当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。
- `<refresh>`<br>用于给列表添加下拉刷新的功能。
- `<loading>`<br>
  `<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。

#### 属性

|属性名|说明|类型|默认值|
|:-|:-|:-|:-|
|show-scrollbar|控制是否出现滚动条|boolean|true|
|loadmoreoffset|触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与 list 底部之间的距离），建议手动设置此值，设置大于0的值即可|number|0|
|offset-accuracy|控制 onscroll 事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|number|10|
|pagingEnabled|是否按分页模式线上List，默认值false|boolean|true/false|
|scrollable|是否运行List关系|boolean|true/false|

`loadmoreoffset` 示意图：

<img src="https://img-cdn-qiniu.dcloud.net.cn/app-nvue-component-list.png" />

#### 事件


- `loadmore` 事件
如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。 如果未触发，请检查是否设置了loadmoreoffset的值，建议此值设置大于0

- `scroll` 事件
列表发生滚动时将会触发该事件，事件的默认抽样率为 10px，即列表每滚动 10px 触发一次，可通过属性 offset-accuracy 设置抽样率。

  事件中的 event 对象属性：
  - `contentSize {Object}`：列表的内容尺寸
    - `width {number}`：列表内容宽度
    - `height {number}`：列表内容高度
  - `contentOffset {Object}`：列表的偏移尺寸
    - `x {number}`：x轴上的偏移量
    - `y {number}`：y轴上的偏移量
  - `isDragging {boolean}`: 用户是否正在拖动列表
