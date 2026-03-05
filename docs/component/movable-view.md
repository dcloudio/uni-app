<!-- ## movable-view -->

::: sourceCode
## movable-view
:::

可移动的视图容器，在页面中可以拖拽滑动


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


之所以有movable-area和movable-view，是因为逻辑层和视图层分离，从视图层发送数据给逻辑层，处理后再传回视图层会产生损耗，导致拖动卡顿。

于是通过一个框架实现好的组件，在视图层内部处理拖动，避免来回通信。

在uni-app和小程序上确实存在这个问题，但在uni-app x的web和app上其实都不存在通信损耗。

在hello uni-app x里有示例，可以自由的监听view的拖动并移动其位置。[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/component/general-event/touch-event.uvue)

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| direction | string | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | movable-view的移动方向，属性值有all、vertical、horizontal、none |
| inertia | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | movable-view 是否带有惯性。 |
| out-of-bounds | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 超过可移动区域后，movable-view 是否还可以移动。 |
| x | string \| number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 定义 x 轴方向的偏移，如果 x 的值不在可移动范围内，会自动移动到可移动范围；改变 x 的值会触发动画。 |
| y | string \| number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 定义 y 轴方向的偏移，如果 y 的值不在可移动范围内，会自动移动到可移动范围；改变 y 的值会触发动画。 |
| damping | number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 阻尼系数，用于控制 x 或 y 改变时的动画和过界回弹的动画，值越大移动越快。 |
| friction | number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值 2。 |
| disabled | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 是否禁用。 |
| scale | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 是否支持双指缩放，默认缩放手势生效区域是在 movable-view 内。 |
| scale-min | number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 定义缩放倍数最小值，默认为 0.5。 |
| scale-max | number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 定义缩放倍数最大值，默认为 10。 |
| scale-value | number | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 定义缩放倍数，取值范围为 0.5 - 10 |
| animation | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 是否使用动画，默认为 true。 |
| htouchmove | eventhandle | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(eventhandle)*<br/>初次手指触摸后移动为横向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch |
| vtouchmove | eventhandle | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(eventhandle)*<br/>初次手指触摸后移动为纵向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch |
| @change | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 拖动过程中触发的事件，event.detail = {x: x, y: y, source: source}。其中source表示产生移动的原因，值可为touch（拖动）、touch-out-of-bounds（超出移动范围）、out-of-bounds（超出移动范围后的回弹）、friction（惯性）和空字符串（setData）。 |
| @scale | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 缩放过程中触发的事件，event.detail = {x: x, y: y, scale: scale}。 |

#### direction 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| all | - | - |
| vertical | - | - |
| horizontal | - | - |
| none | - | - |



<!-- UTSCOMJSON.movable-view.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/movable-view/movable-view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/movable-view/movable-view.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/movable-view/movable-view

>示例
```vue
<template>
  <view class="page-body">
    <page-head title="movable-view,可拖动视图"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        示例 1
        <text>\nmovable-view 区域小于 movable-area</text>
      </view>
      <movable-area>
        <movable-view :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
      </movable-area>
      <view @tap="tap" class="uni-link uni-center uni-common-mt">
        点击这里移动至 (30px, 30px)
      </view>
      <view class="uni-title uni-common-mt">
        示例 2
        <text>\nmovable-view区域大于movable-area</text>
      </view>
      <movable-area>
        <movable-view class="max" direction="all">text</movable-view>
      </movable-area>
      <view class="uni-title uni-common-mt">
        示例 3
        <text>\n只可以横向移动</text>
      </view>
      <movable-area>
        <movable-view direction="horizontal">text</movable-view>
      </movable-area>
      <view class="uni-title uni-common-mt">
        示例 4
        <text>\n只可以纵向移动</text>
      </view>
      <movable-area>
        <movable-view direction="vertical">text</movable-view>
      </movable-area>
      <view class="uni-title uni-common-mt">
        示例 5
        <text>\n可超出边界</text>
      </view>
      <movable-area>
        <movable-view direction="all" out-of-bounds>text</movable-view>
      </movable-area>
      <view class="uni-title uni-common-mt">
        示例 6
        <text>\n带有惯性</text>
      </view>
      <movable-area>
        <movable-view direction="all" inertia>text</movable-view>
      </movable-area>
      <view class="uni-title uni-common-mt">
        示例 7
        <text>\n可放缩</text>
      </view>
      <movable-area scale-area>
        <movable-view direction="all" @scale="onScale" scale scale-min="0.5" scale-max="4"
          :scale-value="scale">text</movable-view>
      </movable-area>
      <view @tap="tap2" class="uni-link uni-center uni-common-mt" style="padding-bottom:40px;">
        点击这里放大3倍
      </view>
    </view>
  </view>
</template>

<script setup lang="uts">
  const x = ref(0)
  const y = ref(0)
  const scale = ref(2)
  const old = reactive({
    x: 0,
    y: 0,
    scale: 2
  })

  const tap = (e) => {
    // 解决view层不同步的问题
    x.value = old.x
    y.value = old.y
    nextTick(() => {
      x.value = 30
      y.value = 30
    })
  }

  const tap2 = () => {
    // 解决view层不同步的问题
    scale.value = old.scale
    nextTick(() => {
      scale.value = 3
    })
  }

  const onChange = (e) => {
    old.x = e.detail.x
    old.y = e.detail.y
  }

  const onScale = (e) => {
    old.scale = e.detail.scale
  }

  defineExpose({
  	x,
  	y,
  	scale,
  	tap,
  	tap2 // 仅供自动化测试用例调用
  })

</script>

<style>
  movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 75px;
    background-color: #007AFF;
    color: #fff;
  }

  movable-area {
    height: 150px;
    width: 100%;
    background-color: #D8D8D8;
    overflow: hidden;
  }

  .max {
    width: 250px;
    height: 250px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.movable.movable-view)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/movable-view.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/movable-view.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=movable-view&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=movable-view&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=movable-view&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=movable-view&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=movable-view)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=movable-view&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
