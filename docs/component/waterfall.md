#### waterfall

app端nvue专用组件。

`<waterfall>` 组件是提供瀑布流布局的核心组件。瀑布流，又称瀑布流式布局是比较流行的一种页面布局，视觉表现为参差不齐的多栏布局。随着页面滚动条向下滚动，这种布局还可以不断加载数据块并附加至当前尾部。

```
<template>
  <waterfall column-count="2" column-width="auto">
    <cell v-for="num in lists" >
      <text>{{num}}</text>
    </cell>
  </waterfall>
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

<style></style>
```

#### 子组件

和 `<list>` 组件一样, `<waterfall>` 组件的子组件只能包括以下四种组件或是 fix 定位的组件，其他形式的组件将不能被正确渲染。

- `<cell>`：用于定义列表中的子列表项，类似于 HTML 中的 ul 之于 li。`<waterfall>` 会对 `<cell>` 进行高效的内存回收以达到更好的性能。
- `<header>`：当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。
- `<refresh>`：用于给列表添加下拉刷新的功能。
- `<loading>`：`<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。
  <img src="https://img-cdn-qiniu.dcloud.net.cn/app-nvue-component-waterfall-01.png" />

#### 属性

- show-scrollbar : `[可选]` 可选值为 true/ false，默认值为 true。控制是否出现滚动条。
- column-count: `[可选]`描述瀑布流的列数
  - auto: 意味着列数是被其他属性所决定的(比如 column-width)
  - `<integer>`: 最佳列数，column-width 和 column-count 都指定非0值， 则 column-count 代表最大列数。
- column-width : `[可选]`描述瀑布流每一列的列宽
  - `auto`: 意味着列宽是被其他属性所决定的(比如 column-count)
  - `<length>`: 最佳列宽，实际的列宽可能会更宽(需要填充剩余的空间)， 或者更窄(如果剩余空间比列宽还要小)。 该值必须大于0
- column-gap: [可选]列与列的间隙. 如果指定了 `normal` ，则对应 32.
- left-gap: [可选]左边cell和列表的间隙. 如果未指定 ，则对应 `0`
- right-gap: [可选]右边cell和列表的间隙. 如果未指定，则对应 `0`
  <img src="https://img-cdn-qiniu.dcloud.net.cn/app-nvue-component-waterfall-02.png" />

其他支持的属性参见 `<list>` 组件属性部分

#### 事件
支持所有通用事件：

- click：用于监听点击事件。（例如：一般绑定于子组件之上触发跳转）。
- longpress：用于监听长按事件（一般绑定于子组件之上例如：长按可删除）。
- appear：用于监听子组件出现事件（一般绑定于子组件之上例如：监听最后一个元素出现，加载新的数据）
- disappear：用于监听子组件滑出屏幕事件（一般绑定于子组件之上）
