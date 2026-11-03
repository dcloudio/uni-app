<!-- ## uni.getLaunchOptionsSync() @getlaunchoptionssync -->

::: sourceCode
## uni.getLaunchOptionsSync() @getlaunchoptionssync

> issues: https://issues.dcloud.net.cn/?mid=api.base.launch.getLaunchOptionsSync


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getLaunchOptionsSync

:::

获取首次启动时的参数。返回值与App.onLaunch的回调参数一致


### getLaunchOptionsSync 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61




### 返回值 

| 类型 |
| :- |
| **OnLaunchOptions** |

#### OnLaunchOptions 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 首次启动时的页面路径。返回值与App.onLaunch的回调参数一致<br/> |
| appScheme | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android(VDOM): 4.25; Android(Vapor): 5.25; iOS(VDOM): 4.25; iOS(Vapor): 5.25; HarmonyOS(VDOM): 4.81; HarmonyOS(Vapor): 5.25 | 首次启动时的Scheme。返回值与App.onLaunch的回调参数一致<br/> |
| appLink | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: x; iOS(VDOM): 4.25; iOS(Vapor): 5.25; HarmonyOS(VDOM): 4.81; HarmonyOS(Vapor): 5.25 | 首次启动时的appLink。返回值与App.onLaunch的回调参数一致<br/> |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: √; iOS: √; HarmonyOS: 4.81 | 启动时的 query 参数<br/> |
| apiCategory | string | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 需要基础库： `2.20.0`<br/><br/>API 类别<br/><br/>可选值：<br/>- 'default': 默认类别;<br/>- 'nativeFunctionalized': 原生功能化，视频号直播商品、商品橱窗等场景打开的小程序;<br/>- 'browseOnly': 仅浏览，朋友圈快照页等场景打开的小程序;<br/>- 'embedded': 内嵌，通过打开半屏小程序能力打开的小程序;<br/>- 'chatTool': 聊天工具，通过打开聊天工具能力打开的小程序;<br/> |
| forwardMaterials | any | 否 | 微信小程序: 4.41 | 打开的文件信息数组，只有从聊天素材场景打开（scene为1173）才会携带该参数<br/> |
| hostExtraData | **OnLaunchOptionsHostExtraData** | 否 | 微信小程序: 4.41 | 宿主传递的数据，第三方 app 中运行小程序时返回<br/> |
| referrerInfo | **OnLaunchOptionsReferrerInfo** | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}`。(参见后文注意)<br/> |
| scene | number | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 |  |
| chatType | number | 否 | 微信小程序: 4.41 | 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型<br/><br/>可选值：<br/>- 1: 微信联系人单聊;<br/>- 2: 企业微信联系人单聊;<br/>- 3: 普通微信群聊;<br/>- 4: 企业微信互通群聊;<br/> |
| shareTicket | string | 否 | 微信小程序: 4.41 |  | 

##### apiCategory 的属性描述

| 合法值 |
| :- |
| "default" |
| "nativeFunctionalized" |
| "browseOnly" |
| "embedded" |
| "chatTool" |

##### hostExtraData 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| host_scene | string | 否 | 微信小程序: 4.41 | 宿主app对应的场景值<br/> |

##### referrerInfo 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| appId | string | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源小程序、公众号或 App 的 appId<br/> |
| extraData | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源小程序传过来的数据，scene=1037或1038时支持<br/> |

##### chatType 的属性描述

| 合法值 |
| :- |
| 1 |
| 2 |
| 3 |
| 4 |


- 如果应用通过scheme或applink（通用链接）启动，可以通过本API获取相应参数。配置scheme或applink需manifest.json中配置，或者在原生的AndroidManifest.xml、iOS的info.plist、鸿蒙的json5中配置，打包后生效。如开发直达页面功能，一般在应用的onShow生命周期监听。[详见](../collocation/app.md#onshow)

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

<script setup lang="ts">
  import { state } from '@/store/index.ts'

  type DataType = {
    checked: boolean;
    homePagePath: string;
    launchOptionsPath: string;
    launchOptionsString: string;
    testResult: boolean;
  }

	const data = reactive<DataType>({
		checked: false,
		homePagePath: 'pages/tabBar/component',
		launchOptionsPath: '',
		launchOptionsString: '',
		testResult: false
	})

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



<!-- ## uni.getEnterOptionsSync() @getenteroptionssync -->

::: sourceCode
## uni.getEnterOptionsSync() @getenteroptionssync

> issues: https://issues.dcloud.net.cn/?mid=api.base.launch.getEnterOptionsSync


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getEnterOptionsSync

:::

获取本次启动时的参数。返回值与App.onShow的回调参数一致


uni.getEnterOptionsSync 和 uni.getLaunchOptionsSync 的区别，相当于应用的 onShow 和 onLaunch 的区别，详见[应用生命周期](../collocation/app.md#applifecycle)

### getEnterOptionsSync 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61




### 返回值 

| 类型 |
| :- |
| **OnShowOptions** |

#### OnShowOptions 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | 本次启动时页面的路径<br/> |
| appScheme | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android(VDOM): 4.25; Android(Vapor): 5.25; iOS(VDOM): 4.25; iOS(Vapor): 5.25; HarmonyOS(VDOM): 4.81; HarmonyOS(Vapor): 5.25 | 本次启动时的Scheme。返回值与App.onShow的回调参数一致<br/> |
| appLink | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: x; iOS(VDOM): 4.25; iOS(Vapor): 5.25; HarmonyOS(VDOM): 4.81; HarmonyOS(Vapor): 5.25 | 本次启动时的appLink。返回值与App.onShow的回调参数一致<br/> |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: √; iOS: √; HarmonyOS: 4.81 | 启动时的 query 参数<br/> |
| apiCategory | string | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 需要基础库： `2.20.0`<br/><br/>API 类别<br/><br/>可选值：<br/>- 'default': 默认类别;<br/>- 'nativeFunctionalized': 原生功能化，视频号直播商品、商品橱窗等场景打开的小程序;<br/>- 'browseOnly': 仅浏览，朋友圈快照页等场景打开的小程序;<br/>- 'embedded': 内嵌，通过打开半屏小程序能力打开的小程序;<br/>- 'chatTool': 聊天工具，通过打开聊天工具能力打开的小程序;<br/> |
| forwardMaterials | any | 否 | 微信小程序: 4.41 | 打开的文件信息数组，只有从聊天素材场景打开（scene为1173）才会携带该参数<br/> |
| hostExtraData | **OnShowOptionsHostExtraData** | 否 | 微信小程序: 4.41 | 宿主传递的数据，第三方 app 中运行小程序时返回<br/> |
| referrerInfo | **OnShowOptionsReferrerInfo** | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}`。(参见后文注意)<br/> |
| scene | number | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 |  |
| chatType | number | 否 | 微信小程序: 4.41 | 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型<br/><br/>可选值：<br/>- 1: 微信联系人单聊;<br/>- 2: 企业微信联系人单聊;<br/>- 3: 普通微信群聊;<br/>- 4: 企业微信互通群聊;<br/> |
| shareTicket | string | 否 | 微信小程序: 4.41 |  | 

##### apiCategory 的属性描述

| 合法值 |
| :- |
| "default" |
| "nativeFunctionalized" |
| "browseOnly" |
| "embedded" |
| "chatTool" |

##### hostExtraData 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| host_scene | string | 否 | 微信小程序: 4.41 | 宿主app对应的场景值<br/> |

##### referrerInfo 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| appId | string | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源小程序、公众号或 App 的 appId<br/> |
| extraData | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 来源小程序传过来的数据，scene=1037或1038时支持<br/> |

##### chatType 的属性描述

| 合法值 |
| :- |
| 1 |
| 2 |
| 3 |
| 4 |


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

<script setup lang="ts">
import { state } from '@/store/index.ts'

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



<!-- UTSAPIJSON.launch.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

