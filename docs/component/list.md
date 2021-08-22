#### list

app端nvue专用组件。在app-nvue下，如果是长列表，使用list组件的性能高于使用view或scroll-view的滚动。原因在于list在不可见部分的渲染资源回收有特殊的优化处理。

原生渲染的资源回收机制，与webview渲染不同。webview不需要数据有规则格式，长页面处于不可视的部分，其渲染资源会自动回收，除非webview使用区域滚动而不是页面滚动。所以vue页面只要不用scroll-view，就不需要关注这个问题。而原生渲染则必须注意。

**如果需要跨端，建议使用uni-ui的uni-list组件，它会自动处理webview渲染和原生渲染的情况，在app-nvue下使用list组件，而在其他平台则使用页面滚动。详见[https://ext.dcloud.net.cn/plugin?id=24](https://ext.dcloud.net.cn/plugin?id=24)**

`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 `<list>` 标签内使用一组由简单数组循环生成的 `<cell>` 标签填充。

```
<template>
  <list>
    <!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
    <cell v-for="(item, index) in dataList" :key="item.id">
      <text>{{item.name}}</text>
    </cell>
  </list>
</template>

<script>
  export default {
    data () {
      return {
        dataList: [{id: "1", name: 'A'}, {id: "2", name: 'B'}, {id: "3", name: 'C'}]
      }
    }
  }
</script>
```

> **注意**
> - 相同方向 `<list>` 或者 `<scroll-view>` 互相嵌套时，Android 平台子 `<list>` 不可滚动，iOS 可以，iOS 有Bounce效果， Android仅可滚动时有
> - `<list>` 需要显式的设置其宽高，可使用 position: absolute; 定位或 width、height 设置其宽高值。
> - list是区域滚动，不会触发页面滚动，无法触发pages.json配置的下拉刷新、页面触底onReachBottomDistance、titleNView的transparent透明渐变。
> - Android 平台，因 `<list>` 高效内存回收机制，不在屏幕可见区域的组件不会被创建，导致一些内部需要计算宽高的组件无法正常工作，例如 `<slider>`、`<progress>`、`<swiper>`

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
|bounce|控制是否回弹效果, iOS 不支持动态修改|boolean|true|
|loadmoreoffset|触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与 list 底部之间的距离），建议手动设置此值，设置大于0的值即可|number|0|
|offset-accuracy|控制 onscroll 事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|number|10|
|pagingEnabled|是否按分页模式显示List，默认值false|boolean|true/false|
|scrollable|是否允许List滚动|boolean|true/false|
|enable-back-to-top|iOS点击顶部状态栏滚动条返回顶部，只支持竖向|boolean|false|

`loadmoreoffset` 示意图：

<img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/40e33a30-4f30-11eb-b997-9918a5dda011.png" />

#### setSpecialEffects(object)
设置嵌套list父容器支持swiper-list吸顶滚动效果

###### Object object
属性|说明|类型|必填|备注
:--|:--|:--|:--|:--|
id|list父容器滚动组件id|String|是|应为最外层滚动容器，必须是list组件
headerHeight|吸顶距离|Number|是|子list吸顶距离最外层滚动容器顶部的距离

#### 方法

`scrollToElement(ref, options)`

滚动到指定位置，详情 [https://uniapp.dcloud.net.cn/nvue-api?id=scrolltoelement](https://uniapp.dcloud.net.cn/nvue-api?id=scrolltoelement)

#### 事件


- `loadmore` 事件
如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。 如果未触发，请检查是否设置了loadmoreoffset的值，建议此值设置大于0

- 如何重置 loadmore

```html
<template>
  <list ref="list">
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
    },
    methods: {
        // 重置 loadmore
        resetLoadMore() {
            this.$refs["list"].resetLoadmore();
        }
    }
  }
</script>
```

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



####  list.setSpecialEffects(args)

设置嵌套父容器信息

#### 参数:

args 为要设置的参数为json类型可以包含下列元素

属性|类型 |默认值|必填|说明
:--|:--|:--|:--|:--|
id|string|无|是|和list同时滚动的组件id，应为外层的scroller
headerHeight|float|0|是|要吸顶的header顶部距离scroller顶部的距离，Android暂不支持

#### 返回值：无

#### 示例:

```html
<template>
		<!-- ios 需要配置 fixFreezing="true" -->
    <view class="uni-swiper-page">
        <list ref="list" fixFreezing="true">
        </list>
    </view>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
        // 重置 loadmore
        setSpecialEffects() {
            this.$refs["list"].setSpecialEffects({id:"scroller", headerHeight:150});
        },
				clearSpecialEffects() {
					this.$refs["list"].setSpecialEffects({});
				}
    }
  }
</script>
```

`setSpecialEffects` 完整代码: [https://github.com/dcloudio/hello-uniapp/tree/master/pages/template/swiper-list-nvue](https://github.com/dcloudio/hello-uniapp/tree/master/pages/template/swiper-list-nvue)
