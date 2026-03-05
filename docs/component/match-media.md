<!-- ## match-media -->

::: sourceCode
## match-media

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-match-media


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-match-media

:::

media query 匹配检测节点

宽屏适配指南另见：[详情](../../docs/adapt.md)


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.71 | 5.0 | 4.71 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| width | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面宽度（px 为单位） |
| min-width | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面最小宽度（px 为单位） |
| max-width | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面最大宽度（px 为单位） |
| height | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面高度（px 为单位） |
| min-height | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面最小高度（px 为单位） |
| max-height | number | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 页面最大高度（px 为单位） |
| orientation | portrait \| landscape | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 屏幕方向 |

#### orientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| portrait | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 竖屏 |
| landscape | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 5.0; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 横屏 |



<!-- UTSCOMJSON.match-media.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/match-media/match-media.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/match-media/match-media.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/match-media/match-media
```uvue
<template>
  <view class="container">
    <view class="section">
      <text class="subtitle">基础条件匹配</text>

      <match-media min-width="400">
        <view class="demo-box">屏幕宽度 ≥ 400px 时显示</view>
      </match-media>

      <match-media max-width="600">
        <view class="demo-box">屏幕宽度 ≤ 600px 时显示</view>
      </match-media>

      <match-media width="375">
        <view class="demo-box">屏幕宽度 = 375px 时显示</view>
      </match-media>

      <match-media min-height="600">
        <view class="demo-box">屏幕高度 ≥ 600px 时显示</view>
      </match-media>

      <match-media max-height="800">
        <view class="demo-box">屏幕高度 ≤ 800px 时显示</view>
      </match-media>

      <match-media height="667">
        <view class="demo-box">屏幕高度 = 667px 时显示</view>
      </match-media>

      <match-media orientation="portrait">
        <view class="demo-box">竖屏 时显示</view>
      </match-media>
      <match-media orientation="landscape">
        <view class="demo-box">横屏 时显示</view>
      </match-media>
    </view>
    <view class="section">
      <text class="subtitle">组合条件匹配</text>

      <match-media min-width="500" max-width="1000" orientation="landscape">
        <view class="demo-box">横屏 且宽度在 500px ~ 1000px 时显示</view>
      </match-media>

      <match-media min-height="200" max-height="800" orientation="portrait">
        <view class="demo-box">竖屏 且高度在 200px ~ 800px 时显示</view>
      </match-media>

      <match-media min-width="300" max-width="900" min-height="400" max-height="800" orientation="portrait">
        <view class="demo-box">竖屏 且宽度在 300px ~ 900px，高度在 400px ~ 800px 时显示</view>
      </match-media>
    </view>
  </view>
</template>

<style>
  .container {
    padding: 20px;
  }

  .section {
    padding-top: 5px;
  }

  .subtitle {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .demo-box {
    padding: 5px 0;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.match-media)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/match-media.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/match-media.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=match-media&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=match-media&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=match-media&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=match-media&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=match-media)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=match-media&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
