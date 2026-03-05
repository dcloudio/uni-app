<!-- ## uni.getLaunchOptionsSync() @getlaunchoptionssync -->

::: sourceCode
## uni.getLaunchOptionsSync() @getlaunchoptionssync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getLaunchOptionsSync


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getLaunchOptionsSync

:::

获取首次启动时的参数。返回值与App.onLaunch的回调参数一致


### getLaunchOptionsSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 |
| :- |
| **OnLaunchOptions** |

#### OnLaunchOptions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 首次启动时的页面路径。返回值与App.onLaunch的回调参数一致<br/> |
| appScheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 首次启动时的Scheme。返回值与App.onLaunch的回调参数一致<br/> |
| appLink | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 首次启动时的appLink。返回值与App.onLaunch的回调参数一致<br/> |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: √; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 启动时的 query 参数<br/> |
| apiCategory | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.20.0`<br/><br/>API 类别<br/><br/>可选值：<br/>- 'default': 默认类别;<br/>- 'nativeFunctionalized': 原生功能化，视频号直播商品、商品橱窗等场景打开的小程序;<br/>- 'browseOnly': 仅浏览，朋友圈快照页等场景打开的小程序;<br/>- 'embedded': 内嵌，通过打开半屏小程序能力打开的小程序;<br/>- 'chatTool': 聊天工具，通过打开聊天工具能力打开的小程序;<br/> |
| forwardMaterials | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 打开的文件信息数组，只有从聊天素材场景打开（scene为1173）才会携带该参数<br/> |
| referrerInfo | **OnLaunchOptionsReferrerInfo** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}`。(参见后文注意)<br/> |
| scene | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| chatType | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型<br/><br/>可选值：<br/>- 1: 微信联系人单聊;<br/>- 2: 企业微信联系人单聊;<br/>- 3: 普通微信群聊;<br/>- 4: 企业微信互通群聊;<br/> |
| shareTicket | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  | 

##### apiCategory 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| nativeFunctionalized | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| browseOnly | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| embedded | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| chatTool | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### referrerInfo 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源小程序、公众号或 App 的 appId<br/> |
| extraData | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源小程序传过来的数据，scene=1037或1038时支持<br/> |

##### chatType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 2 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 3 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 4 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |


- 如果应用通过scheme或applink（通用链接）启动，可以通过本API获取相应参数。配置scheme或applink需在AndroidManifest.xml或info.plist中配置，打包后生效。如开发直达页面功能，一般在应用的onShow生命周期监听。[详见](../collocation/app.md#onshow)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-launch-options-sync/get-launch-options-sync.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-launch-options-sync/get-launch-options-sync.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-launch-options-sync/get-launch-options-sync

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-launch-options-sync/get-launch-options-sync

>示例
```vue
<template>
  <page-head title="getLaunchOptionsSync"></page-head>
  <view class="uni-padding-wrap">
    <button @click="getLaunchOptionsSync">getLaunchOptionsSync</button>
    <view class="uni-common-mt">
      <text>应用本次启动路径：</text>
      <text style="margin-top: 5px">{{ data.launchOptionsPath }}</text>
    </view>
    <view class="uni-common-mt">
      <text>应用本次启动：</text>
      <text style="margin-top: 5px">{{ data.launchOptionsString }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
  import { state } from '@/store/index.uts'

  type DataType = {
    checked: boolean;
    homePagePath: string;
    launchOptionsPath: string;
    launchOptionsString: string;
    testResult: boolean;
  }

  const data = reactive({
    checked: false,
    // #ifdef VUE3-VAPOR
    homePagePath: 'pages/tabBar/tab-bar',
    // #endif
    // #ifndef VUE3-VAPOR
    homePagePath: 'pages/tabBar/component',
    // #endif
    launchOptionsPath: '',
    launchOptionsString: '',
    testResult: false
  } as DataType)

  const compareOnLaunchRes = () => {
    const launchOptions = uni.getLaunchOptionsSync();
    data.launchOptionsString = JSON.stringify(launchOptions, null, 2)

    const appLaunchOptions = state.globalData.launchOptions

    const isPathSame = launchOptions.path == appLaunchOptions.path
    const isAppSchemeSame = launchOptions.appScheme == appLaunchOptions.appScheme
    const isAppLinkSame = launchOptions.appLink == appLaunchOptions.appLink
    data.testResult = isPathSame && isAppSchemeSame && isAppLinkSame
  }

  const getLaunchOptionsSync = () => {
    const launchOptions = uni.getLaunchOptionsSync()
    data.launchOptionsPath = launchOptions.path
    if (launchOptions.path == data.homePagePath) {
      data.checked = true
    }
  }

  onReady(() => {
    compareOnLaunchRes()
  })

  defineExpose({
    data,
    getLaunchOptionsSync
  })
</script>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.launch.getLaunchOptionsSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getLaunchOptionsSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getLaunchOptionsSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getLaunchOptionsSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getLaunchOptionsSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getLaunchOptionsSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getLaunchOptionsSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getEnterOptionsSync() @getenteroptionssync -->

::: sourceCode
## uni.getEnterOptionsSync() @getenteroptionssync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getEnterOptionsSync


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getEnterOptionsSync

:::

获取本次启动时的参数。返回值与App.onShow的回调参数一致


uni.getEnterOptionsSync 和 uni.getLaunchOptionsSync 的区别，相当于应用的 onShow 和 onLaunch 的区别，详见[应用生命周期](../collocation/app.md#applifecycle)

### getEnterOptionsSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.25 | 4.25 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 |
| :- |
| **OnShowOptions** |

#### OnShowOptions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 本次启动时页面的路径<br/> |
| appScheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 本次启动时的Scheme。返回值与App.onShow的回调参数一致<br/> |
| appLink | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 本次启动时的appLink。返回值与App.onShow的回调参数一致<br/> |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: √; HarmonyOS: 4.81; HarmonyOS(Vapor): x | 启动时的 query 参数<br/> |
| apiCategory | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.20.0`<br/><br/>API 类别<br/><br/>可选值：<br/>- 'default': 默认类别;<br/>- 'nativeFunctionalized': 原生功能化，视频号直播商品、商品橱窗等场景打开的小程序;<br/>- 'browseOnly': 仅浏览，朋友圈快照页等场景打开的小程序;<br/>- 'embedded': 内嵌，通过打开半屏小程序能力打开的小程序;<br/>- 'chatTool': 聊天工具，通过打开聊天工具能力打开的小程序;<br/> |
| forwardMaterials | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 打开的文件信息数组，只有从聊天素材场景打开（scene为1173）才会携带该参数<br/> |
| referrerInfo | **OnShowOptionsReferrerInfo** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}`。(参见后文注意)<br/> |
| scene | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| chatType | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型<br/><br/>可选值：<br/>- 1: 微信联系人单聊;<br/>- 2: 企业微信联系人单聊;<br/>- 3: 普通微信群聊;<br/>- 4: 企业微信互通群聊;<br/> |
| shareTicket | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  | 

##### apiCategory 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| nativeFunctionalized | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| browseOnly | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| embedded | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| chatTool | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### referrerInfo 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源小程序、公众号或 App 的 appId<br/> |
| extraData | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 来源小程序传过来的数据，scene=1037或1038时支持<br/> |

##### chatType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 2 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 3 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| 4 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |


- 如果应用通过scheme或applink（通用链接）启动或从后台激活到前台，可以通过本API获取相应参数。配置scheme或applink需在AndroidManifest.xml或info.plist中配置，打包后生效。如开发直达页面功能，一般在应用的onShow生命周期监听。[详见](../collocation/app.md#onshow)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-enter-options-sync/get-enter-options-sync.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-enter-options-sync/get-enter-options-sync.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-enter-options-sync/get-enter-options-sync

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-enter-options-sync/get-enter-options-sync

>示例
```vue
<template>
  <page-head title="getEnterOptionsSync"></page-head>
  <view class="uni-padding-wrap">
    <view class="uni-common-mt">
      <text>应用本次启动路径：</text>
      <text style="margin-top: 5px">{{ data.enterOptionsString }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
import { state } from '@/store/index.uts'

type DataType = {
  enterOptionsString: string,
  testResult: boolean,
}

// Data
const data = reactive({
  enterOptionsString: '',
  testResult: false,
} as DataType)

// Lifecycle
onReady(() => {
  const appShowOptions = state.globalData.showOptions
  const enterOptions = uni.getEnterOptionsSync()
  data.enterOptionsString = JSON.stringify(enterOptions, null, 2)
  data.testResult = (enterOptions.path == appShowOptions.path && enterOptions.appScheme == appShowOptions.appScheme && enterOptions.appLink == appShowOptions.appLink)
})

defineExpose({
  data
})
</script>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.launch.getEnterOptionsSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/getEnterOptionsSync.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getEnterOptionsSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getEnterOptionsSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getEnterOptionsSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getEnterOptionsSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getEnterOptionsSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getEnterOptionsSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getEnterOptionsSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.launch.example -->

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

