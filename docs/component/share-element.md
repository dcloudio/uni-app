<!-- ## share-element -->

::: sourceCode
## share-element
:::

> 组件类型：UniShareElement 

 共享元素

共享元素组件，用于页面转场动画。指A、B 2个页面之间在动画时共享某个组件，这个组件在转场动画中通过特殊的动画从A页面的位置移动到B页面的位置。

常见场景有：
1. 商品列表的商品缩略图，点击进入商品详情页面时，把缩略图变成共享元素，放大到详情页面的新位置。
2. 相册应用，点击缩略图，先放大到详情页的大图位置，然后后台加载大图，完毕后再显示大图。
3. 视觉上跨页面一直显示的一个组件，比如播放条、悬浮球。

在hello uni-app x中，组件->视图容器下有共享元素示例，在模板->列表到详情 中也提供了演示。

注意共享元素组件仅指的是动画的视觉共享，并不是2个页面真的复用了同一个组件实例，不同页面的组件仍然是各自单独的实例。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.51 | 4.51 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| share-key | string | - | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 映射标记，页面内唯一 |
| easing-function | string | "ease-out" | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | `css`缓动函数 |
| shuttle-on-push | string | "to" | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 指定 push 阶段的飞跃物 |
| shuttle-on-pop | string | "to" | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 指定 pop 阶段的飞跃物 |
| transition-on-gesture | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 手势返回时是否进行动画 |

#### easing-function 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ease | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 表示过渡效果开始缓慢，然后逐渐加速，最后减速结束。这是大多数情况下的推荐值，因为它创建了平滑的过渡效果 |
| ease-out | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 过渡开始时较快，然后逐渐减速。这会在过渡末尾创建一个缓慢的效果 |
| ease-in | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 过渡开始时较慢，然后逐渐加速。这会在过渡初期创建一个缓慢的效果 |
| ease-in-out | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 过渡开始时较慢，然后加速，最后减速。这是一个结合了ease-in和ease-out的时间函数，产生平滑的过渡效果 |
| linear | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 过渡效果是线性的，速度保持恒定，没有加速或减速。这会在整个过渡期间保持相同的速度 |
| cubic-bezier | Web: x; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | 用于自定义 CSS 过渡（transition）的时间函数的函数，它允许你精确地定义过渡效果的速度变化 |

#### shuttle-on-push 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| from | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | push 阶段采用源页面节点作为飞跃物 |
| to | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | push 阶段采用目标页面节点作为飞跃物 |

#### shuttle-on-pop 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| from | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | pop 阶段采用源页面节点作为飞跃物 |
| to | Web: x; 微信小程序: x; Android: x; iOS: 4.51; HarmonyOS: x; HarmonyOS(Vapor): - | pop 阶段采用目标页面节点作为飞跃物 |


### 指定飞跃物

开发者可以指定选定源页面或目标页的 `share-element` 作为飞跃物

假定 `A` 页和 `B` 页存在对应的 `share-element` 组件

#### push 阶段

+ 通过 uni.navigateTo 由 `A` 进入 `B`，称 `A` 为源页面（from 页)，`B` 为目标页（to 页)
+ 默认采用 `B` 页的 `share-element` 组件进行飞跃，设置属性 shuttle-on-push=from 可切换成 A 页的 `share-element` 组件

<img src="https://web-ext-storage.dcloud.net.cn/uni-app-x/component/share-element/share-element-01.png" width="600" height="378">

#### pop 阶段

+ 通过 uni.navigateBack 由 `B` 返回 `A`，此时 `B` 为源页面 (from 页)， `A` 为目标页（to 页）
+ 默认采用 `A `页的 `share-element` 组件，设置属性 shuttle-on-pop=from 可切换成 `B` 页的 `share-element` 组件

<img src="https://web-ext-storage.dcloud.net.cn/uni-app-x/component/share-element/share-element-02.png" width="600" height="378">

#### 注意事项

+ android平台不支持设定shuttle-on-push、shuttle-on-pop，push阶段飞跃物是 `B` 页面（to 页)的 `share-element` 组件，pop阶段飞跃物也是 `B` 页面(from 页)的 `share-element` 组件
+ `share-element` 组件执行共享元素动画过程中会将 `share-element` 的`飞跃物`显示在页面最顶层，这会导致部分场景原本被其他元素遮挡的 `share-element` 会显示完整内容，这是为了更好的过度穿越效果并非Bug

### 用法

`A` 页面

```html
<template>
	<view style="flex: 1;">
		<share-element style="width: 200px;height: 200px;" share-key="box" >
			<view style="width: 200px;height: 200px; background-color: red;"></view>
		</share-element>
	</view>
</template>
```

`B` 页面

```html
<template>
	<view style="flex: 1;">
		<share-element style="width: 400px;height: 400px;" share-key="box" >
			<view style="width: 400px;height: 400px; background-color: red;"></view>
		</share-element>
	</view>
</template>
```

`A` 和 `B` 页面分别设置 `share-element` 的 share-key 属性值，需要一致并且唯一，这样两个共享元素则会建立共享关系，切页动画时则会触发共享元素过度动画效果。



<!-- UTSCOMJSON.share-element.component_type -->

### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/share-element/share-element.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/share-element/share-element.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/share-element/share-element
```uvue
<template>
  <page-head title="share-element"></page-head>
  <view class="main">
    <share-element class="share-element" share-key="left" :shuttle-on-pop="shuttleOnPopType"
      :transition-on-gesture="transitionOnGesture" :shuttle-on-push="shuttleOnPushType"  :easing-function="easingFunctionType" @tap="openPage()">
      <image style="width: 100px;height: 150px;"
        src="https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/drop-card-1.jpg">
      </image>
    </share-element>
  </view>
  <button type="primary" @click="openPage" class="button">
    打开share-element页面
  </button>

  <scroll-view style="flex: 1">
    <view class="content">
      <boolean-data :defaultValue="transitionOnGesture" title="transition-on-gesture= true(仅iOS生效)"
        @change="changeTransitionOnGesture"></boolean-data>

      <text class="uni-common-mt choose-property-title">easing-function:</text>
      <radio-group class="choose-property-type-radio-group" @change="handleEasingFunction">
        <radio class="ml-10 uni-common-mt" v-for="item in easingFunctionTypeList" :key="item" :value="item"
          :checked="easingFunctionType == item">{{ item }}
        </radio>
      </radio-group>

      <text class="uni-common-mt choose-property-title">shuttle-on-push(仅iOS生效):</text>
      <radio-group class="choose-property-type-radio-group" @change="handleShuttleOnPushType">
        <radio class="ml-10 uni-common-mt" v-for="item in shuttleOnTypeList" :key="item" :value="item"
          :checked="shuttleOnPushType == item">{{ item }}
        </radio>
      </radio-group>

      <text class="uni-common-mt choose-property-title">shuttle-on-pop(仅iOS生效):</text>
      <radio-group class="choose-property-type-radio-group" @change="handleShuttleOnPopType">
        <radio class="ml-10 uni-common-mt" v-for="item in shuttleOnTypeList" :key="item" :value="item"
          :checked="shuttleOnPopType == item">{{ item }}
        </radio>
      </radio-group>

      <text class="uni-common-mt choose-property-title">animationType(页面动画降级):</text>
      <radio-group class="choose-property-type-radio-group" @change="handleOpenAnimationType">
        <radio class="ml-10 uni-common-mt" v-for="item in openAnimationTypeList" :key="item" :value="item"
          :checked="openAnimationType == item">{{ item }}
        </radio>
      </radio-group>
    </view>
  </scroll-view>
  <button  @click="gotoShareElementWithSwiper" class="button">
    打开share-element-with-swiper页面
  </button>
  <view style="height: 80px;"></view>
  <share-element class="bottomWrap" share-key="bottom" @tap="openPage()" transitionOnGesture=true>
    <view class="bottom">
      <text style="color: white;">share-element(底部固定)</text>
    </view>
  </share-element>
</template>
<script setup lang="uts">
  type ShareElementOpenAnimationType =
    'auto' |
    'none' |
    'slide-in-right' |
    'slide-in-left' |
    'slide-in-top' |
    'slide-in-bottom' |
    'fade-in' |
    'pop-in' |
    'zoom-out' |
    'zoom-fade-out'

  type ShareElementEasingFunctionType =
    'ease' |
    'ease-in' |
    'ease-out' |
    'ease-in-out' |
    'linear'

  type ShuttleOnType =
    'from' |
    'to'

  import { ItemType } from '@/components/enum-data/enum-data-types'

  const transitionOnGesture = ref(true)
  const shuttleOnPopType = ref('to' as ShuttleOnType)
  const shuttleOnPushType = ref('to' as ShuttleOnType)
  const shuttleOnTypeList = [
    'from',
    'to'
  ]
  const openAnimationType = ref('slide-in-right' as ShareElementOpenAnimationType)
  const openAnimationTypeList = [
    'auto',
    'none',
    'slide-in-right',
    'slide-in-left',
    'slide-in-top',
    'slide-in-bottom',
    'fade-in',
    'pop-in',
    'zoom-out',
    'zoom-fade-out'
  ]
  const easingFunctionType = ref('ease' as ShareElementEasingFunctionType)
  const easingFunctionTypeList = [
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'linear'
  ]

  const openPage = () => {
    uni.navigateTo({
      animationType: openAnimationType.value,
      url: "/pages/component/share-element/share-element-to?shuttleOnPush=" + shuttleOnPushType.value + "&transitionOnGesture=" + transitionOnGesture.value
    })
  }

  const gotoShareElementWithSwiper = () => {
    uni.navigateTo({
      url:'/pages/component/share-element/share-element-with-swiper'
    })
  }

  const changeTransitionOnGesture = (checked : boolean) => {
    console.log(`changeTransitionOnGesture:${checked}`)
    transitionOnGesture.value = checked
  }

  const handleOpenAnimationType = (e : RadioGroupChangeEvent) => {
    openAnimationType.value = e.detail.value as ShareElementOpenAnimationType
  }

  const handleEasingFunction = (e : RadioGroupChangeEvent) => {
    easingFunctionType.value = e.detail.value as ShareElementEasingFunctionType
  }

  const handleShuttleOnPopType = (e : RadioGroupChangeEvent) => {
    shuttleOnPopType.value = e.detail.value as ShuttleOnType
  }

  const handleShuttleOnPushType = (e : RadioGroupChangeEvent) => {
    shuttleOnPushType.value = e.detail.value as ShuttleOnType
  }

  defineExpose({
    transitionOnGesture,
    shuttleOnPopType,
    shuttleOnPushType,
    shuttleOnTypeList,
    openAnimationType,
    openAnimationTypeList,
    easingFunctionType,
    easingFunctionTypeList,
    openPage,
    gotoShareElementWithSwiper,
    changeTransitionOnGesture,
    handleOpenAnimationType,
    handleEasingFunction,
    handleShuttleOnPopType,
    handleShuttleOnPushType
  })
</script>

<style>
  .ml-10 {
    margin-left: 10px;
  }

  .choose-property-title {
    font-weight: bold;
  }

  .choose-property-type-radio-group {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .bottomWrap {
    width: 100%;
    bottom: 0px;
    height: 80px;
    position: fixed;
  }

  .bottom {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #007aff;
  }

  .main {
    padding: 5px 0;
    align-items: center;
    justify-content: center;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.share-element)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=share-element&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=share-element&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=share-element&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=share-element&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=share-element&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=share-element)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=share-element&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
