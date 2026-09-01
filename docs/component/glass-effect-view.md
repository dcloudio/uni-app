::: sourceCode
## glass-effect-view
:::

> 组件类型：UniGlassEffectViewElement 

 玻璃效果视图容器。iOS 26 及以上使用系统液态玻璃效果，iOS 26 以下降级为系统毛玻璃效果。




### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS 系统版本 | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 15.0 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


- iOS26以下：组件降级为系统毛玻璃效果，"regular" 映射为系统标准毛玻璃材质，"clear" 映射为更轻、更透明的毛玻璃材质，interactive、tint-color 属性将不生效。
- 液态玻璃是iOS26特有效果。它和毛玻璃效果不同。如需其他平台上使用毛玻璃效果，应使用css的[backdrop-filter](../css/backdrop-filter.md)

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| glass-style | string | "regular" | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 15.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 玻璃效果样式 |
| interactive | boolean | false | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 26.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 是否启用液态玻璃的交互行为，仅 iOS 26 及以上生效 |
| tint-color | string([string.ColorString](/uts/data-type.md#ide-string)) |   | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 26.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 施加在液态玻璃效果上的着色，仅 iOS 26 及以上生效 |

#### glass-style 的属性描述

| 合法值 | 描述 |
| :- | :- |
| regular | 常规玻璃效果 |
| clear | 更通透的玻璃效果 |

<!-- UTSCOMJSON.glass-effect-view.fileFormates -->



<!-- UTSCOMJSON.glass-effect-view.component_type -->

### 子组件 @children-tags
支持所有组件

### Tips@tips

- 玻璃材质需要实时采样和合成背景内容。大量创建、重叠或在长列表中频繁复用玻璃组件可能增加 GPU 合成开销造成卡顿。

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/glass-effect-view/glass-effect-view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/glass-effect-view/glass-effect-view.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/glass-effect-view/glass-effect-view
```uvue
<template>
  <page-head title="glass-effect-view"></page-head>
  <scroll-view style="flex: 1">
    <view class="uni-padding-wrap uni-common-mt">
      <text class="uni-title-text">玻璃效果预览</text>
      <view class="stage">
        <view class="color-row">
          <view class="color-block color-red"></view>
          <view class="color-block color-yellow"></view>
          <view class="color-block color-green"></view>
          <view class="color-block color-blue"></view>
          <view class="color-block color-purple"></view>
        </view>
        <text class="stage-text stage-text-top">GLASS</text>
        <text class="stage-text stage-text-bottom">iOS</text>
        <glass-effect-view
          v-if="data.glassStyle == 'regular'"
          class="glass-panel"
          glass-style="regular"
          :interactive="data.interactive"
          :tint-color="data.tintColor">
          <view class="glass-content">
            <text class="glass-title">regular</text>
            <text class="glass-detail">interactive: {{ data.interactive }}</text>
            <text class="glass-detail">tint: {{ data.tintColor }}</text>
          </view>
        </glass-effect-view>
        <glass-effect-view
          v-else
          class="glass-panel"
          glass-style="clear"
          :interactive="data.interactive"
          :tint-color="data.tintColor">
          <view class="glass-content">
            <text class="glass-title">clear</text>
            <text class="glass-detail">interactive: {{ data.interactive }}</text>
            <text class="glass-detail">tint: {{ data.tintColor }}</text>
          </view>
        </glass-effect-view>
      </view>
    </view>

    <view class="content">
      <enum-data
        title="glass-style 玻璃效果样式"
        :items="data.glassStyleItems"
        @change="changeGlassStyle"></enum-data>
      <boolean-data
        title="interactive 启用交互行为"
        :defaultValue="false"
        @change="changeInteractive"></boolean-data>
      <enum-data
        title="tint-color 玻璃效果着色"
        :items="data.tintColorItems"
        @change="changeTintColor"></enum-data>
      <view class="bottom-space"></view>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  type DataType = {
    glassStyle : string;
    interactive : boolean;
    tintColor : string;
    glassStyleItems : ItemType[];
    tintColorItems : ItemType[];
  }

  const data = reactive({
    glassStyle: 'regular',
    interactive: false,
    tintColor: 'transparent',
    glassStyleItems: [
      { value: 0, name: 'regular', checked: true },
      { value: 1, name: 'clear' },
    ],
    tintColorItems: [
      { value: 0, name: '透明', checked: true },
      { value: 1, name: '红色' },
      { value: 2, name: '蓝色' },
      { value: 3, name: '绿色' },
    ],
  } as DataType)

  function changeGlassStyle(value : number) {
    data.glassStyle = value == 1 ? 'clear' : 'regular'
  }

  function changeInteractive(value : boolean) {
    data.interactive = value
  }

  function changeTintColor(value : number) {
    switch (value) {
      case 1:
        data.tintColor = 'rgba(255, 59, 48, 0.25)'
        break
      case 2:
        data.tintColor = 'rgba(0, 122, 255, 0.25)'
        break
      case 3:
        data.tintColor = 'rgba(52, 199, 89, 0.25)'
        break
      default:
        data.tintColor = 'transparent'
        break
    }
  }

  defineExpose({
    data,
  })
</script>

<style>
  .stage {
    position: relative;
    height: 300px;
    margin-top: 12px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #ffffff;
  }

  .color-row {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    flex-direction: row;
  }

  .color-block {
    flex: 1;
  }

  .color-red {
    background-color: #ff453a;
  }

  .color-yellow {
    background-color: #ffd60a;
  }

  .color-green {
    background-color: #30d158;
  }

  .color-blue {
    background-color: #0a84ff;
  }

  .color-purple {
    background-color: #bf5af2;
  }

  .stage-text {
    position: absolute;
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
  }

  .stage-text-top {
    left: 18px;
    top: 18px;
  }

  .stage-text-bottom {
    right: 18px;
    bottom: 18px;
  }

  .glass-panel {
    position: absolute;
    left: 42px;
    right: 42px;
    top: 74px;
    height: 152px;
    border-radius: 28px;
    overflow: hidden;
  }

  .glass-content {
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .glass-title {
    font-size: 24px;
    font-weight: 700;
    color: #111111;
  }

  .glass-detail {
    margin-top: 8px;
    font-size: 13px;
    color: #222222;
  }

  .content {
    margin-top: 10px;
  }

  .bottom-space {
    height: 30px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.glass-effect-view)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=glass-effect-view&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=glass-effect-view&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=glass-effect-view&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=glass-effect-view&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=glass-effect-view&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=glass-effect-view)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=glass-effect-view&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
