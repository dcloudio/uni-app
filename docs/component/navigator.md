<!-- ## navigator -->

::: sourceCode
## navigator

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-navigator


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-navigator

:::

> 组件类型：UniNavigatorElement 

 页面链接


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| target | string | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 在哪个目标上发生跳转，默认当前应用 |
| url | string([string.PageURIString](/uts/data-type.md#ide-string)) | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前应用内的跳转链接 |
| open-type | string | "navigate" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 跳转方式 |
| delta | number | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当 open-type 为 navigateBack 时有效，表示回退的层数 |
| app-id | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 当target="miniProgram"时有效，要打开的小程序 appId |
| path | string | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 当target="miniProgram"时有效，打开的页面路径，如果为空则打开首页 |
| extra-data | object | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 当target="miniProgram"时有效，需要传递给目标应用的数据，目标应用可在 App.onLaunch()，App.onShow() 中获取到这份数据 |
| version | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 当target="miniProgram"时有效，要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版），仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版 |
| animation-type | string | "pop-in/out" | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当 open-type="navigateTo" 或 open-type="navigateBack" 时有效，窗口的显示/关闭的动画类型。 |
| animation-duration | number | 300 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当 open-type="navigateTo" 或 open-type="navigateBack" 时有效，窗口的显示/关闭动画的持续时间。 |
| hover-class | string | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | boolean | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time | number | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 按住后多久出现点击态，单位毫秒 |
| hover-stay-time | number | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 手指松开后点击态保留时间，单位毫秒 |
| render-link | boolean | true | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 是否给 navigator 组件加一层 a 标签控制 ssr 渲染 |
| short-link | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>当`target="miniProgram"`时有效，当传递该参数后，可以不传 app-id 和 path。链接可以通过【小程序菜单】->【复制链接】获取。 |
| @success | string | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(string)*<br/>当`target="miniProgram"`且`open-type="navigate/navigateBack"`时有效时有效，跳转小程序成功 |
| @fail | string | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(string)*<br/>当`target="miniProgram"`且`open-type="navigate/navigateBack"`时有效时有效，跳转小程序失败 |
| @complete | string | - | Web: 4.41; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(string)*<br/>当`target="miniProgram"`且`open-type="navigate/navigateBack"`时有效时有效，跳转小程序完成 |

#### target 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| self | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 当前小程序 |
| miniProgram | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 其它小程序 |

#### open-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| navigate | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对应 uni.navigateTo 或 navigateToMiniProgram 的功能 |
| redirect | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对应 uni.redirectTo 的功能 |
| switchTab | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对应 uni.switchTab 的功能 |
| reLaunch | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对应 uni.reLaunch 的功能 |
| navigateBack | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对应 uni.navigateBack 的功能 |
| exit | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 退出小程序，`target="miniProgram"`时生效 |

#### version 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| develop | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 开发版 |
| trial | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 体验版 |
| release | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 正式版，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。 |

#### animation-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | - | 自动选择动画效果 |
| none | - | 无动画效果 |
| slide-in-right | - | 从右侧横向滑动效果 |
| slide-in-left | - | 左侧横向滑动效果 |
| slide-in-top | - | 从上侧竖向滑动效果 |
| slide-in-bottom | - | 从下侧竖向滑动效果 |
| fade-in | - | 从透明到不透明逐渐显示效果 |
| zoom-out | - | 从小到大逐渐放大显示效果 |
| zoom-fade-out | - | 从小到大逐渐放大并且从透明到不透明逐渐显示效果 |
| pop-in | - | 从右侧平移入栈动画效果 |
| slide-out-right | - | 横向向右侧滑出屏幕动画 |
| slide-out-left | - | 横向向左侧滑出屏幕动画 |
| slide-out-top | - | 竖向向上侧滑出屏幕动画 |
| slide-out-bottom | - | 竖向向下侧滑出屏幕动画 |
| fade-out | - | 从不透明到透明逐渐隐藏动画 |
| zoom-in | - | 从大逐渐缩小关闭动画 |
| zoom-fade-in | - | 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画 |
| pop-out | - | 从右侧平移出栈动画效果 |



<!-- UTSCOMJSON.navigator.component_type-->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/navigator/navigator.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/navigator/navigator.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/navigator/navigator

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/navigator/navigator

>示例
```vue
<template>
  <page-head :title="title"></page-head>
  <view class="uni-padding-wrap uni-common-mt">
    <navigator id="navigate" class="navigator" url="navigate?title=navigate">
      <button type="default">跳转到新页面</button>
    </navigator>
    <navigator id="redirect" class="navigator" url="redirect?title=redirect" open-type="redirect">
      <button type="default">在当前页打开redirect</button>
    </navigator>
    <navigator id="switchTab" class="navigator" url="/pages/tabBar/template" open-type="switchTab">
      <button type="default">切换到模板选项卡switchTab</button>
    </navigator>
    <navigator id="reLaunch" class="navigator" url="/pages/tabBar/component" open-type="reLaunch">
      <button type="default">关闭所有页面回首页reLaunch</button>
    </navigator>
    <navigator id="reLaunch" class="navigator" open-type="navigateBack">
      <button type="default">返回上一页navigateBack</button>
    </navigator>
    <!-- <navigator id="reLaunch" class="navigator" open-type="exit">
      <button type="default">退出应用（仅Android和小程序生效）</button>
    </navigator> -->
    <navigator id="navigateToErrorPage" class="navigator" url="/pages/error-page/error-page">
      <button type="default"> 打开不存在的页面 </button>
    </navigator>
    <navigator id="navigateToErrorPage" class="navigator">
      <button type="default"> 未指定URL的跳转 </button>
    </navigator>
    <navigator style="flex-direction: row;justify-content: space-between;">
      <text>两端对齐样式测试</text>
      <view style="width: 20px;height: 20px; background-color: aqua;"></view>
    </navigator>
  </view>
</template>

<script setup lang="uts">
  const title = ref('navigator')
</script>

<style>
  .navigator {
    margin-bottom: 15px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.navigation.navigator)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/navigator.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=navigator&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=navigator&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=navigator&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=navigator&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=navigator)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=navigator&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## Tips
navigator组件是对uni.navigateTo API的易用性封装，无需编写method方法，直接跳转页面。跳转后的新页面在onload生命周期中接收参数，详见[页面onLoad生命周期](../page.md#onload)
