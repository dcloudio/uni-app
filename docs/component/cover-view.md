::: sourceCode
## ~~cover-view~~

> issues: https://issues.dcloud.net.cn/?mid=component.view-container.cover.cover-view

:::

覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera，只支持嵌套cover-view、cover-image

cover-view 在uni-app x的app、web、微信小程序上，已废弃，使用view即可。

在其他小程序平台，某些原生组件（如map、canvas、video）不支持同层渲染，仍需要cover-view来覆盖。


### 兼容性 <Help />
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.53; iOS: 4.53; HarmonyOS: 4.61


::: warning 注意
app 端并不是在运行时实现了cover-view组件，仅仅是编译器把cover-view编译为了view。
:::

### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| scroll-top | number/string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(number/string)*<br/>设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效 |



<!-- UTSCOMJSON.cover-view.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/cover-view/cover-view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/cover-view/cover-view.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/cover-view/cover-view

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/cover-view/cover-view

>示例
```vue
<template>
  <view>
    <page-head title="cover-view用于覆盖map、video等原生组件"></page-head>
    <view class="uni-padding-wrap uni-common-mb">
      <text class="uni-subtitle-text">注意：Web和App需正确配置地图SDK的Key才能正常显示地图组件</text>
    </view>
    <view class="cover-content" v-if="showMap">
      <map class="map" :latitude="latitude" :longitude="longitude"></map>
      <cover-view class="cover-view"><text>简单的cover-view</text></cover-view>
      <cover-image class="cover-image" src="/static/test-image/logo.png"></cover-image>
    </view>
  </view>
</template>

<script setup lang="ts">
  const showMap = ref(false)
  const latitude = ref(39.909)
  const longitude = ref(116.39742)
  onLoad(() => {
    showMap.value = true
  })
</script>

<style>
  .map {
    width: 100%;
    height: 600px;
  }

  .cover-content {
    position: relative;
  }

  .cover-view {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 188px;
    text-align: center;
    background-color: #DDDDDD;
  }

  .cover-image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 96px;
    height: 96px;
  }

</style>

```

:::

### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/cover-view.html)

