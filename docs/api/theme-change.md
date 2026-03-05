## 主题light和dark

`iOS 13+`、`Android 10+` 提供了暗黑模式/深色模式，之前的模式称为light，暗黑称为dark。

同时也要注意，低于上述版本的手机，系统层没有暗黑模式概念。

在uni-app x中，有3种主题概念：OSTheme、hostTheme、appTheme。每种主题在不同平台支持度不同，获取、设置和监听变化的方式也不同。

|主题概念	|描述												|App|Web|小程序	|获取方式																			|设置方式												|监听变化							|
|--				|--													|--	|--	|--			|--																						|--															|--										|
|osTheme	|手机OS的当前主题							|√	|x	|x			|[uni.getDeviceInfo](./get-device-info.md)		|-															|[uni.onOsThemeChange](#onosthemechange)|
|hostTheme|浏览器或小程序宿主的当前主题	|x	|√	|√			|[uni.getAppBaseInfo](./get-app-base-info.md)		|-															|[uni.onHostThemeChange](#onhostthemechange)|
|appTheme	|App当前主题									|√	|X	|x			|[uni.getAppBaseInfo](./get-app-base-info.md)	|[uni.setAppTheme](#setapptheme)|[uni.onAppThemeChange](#onappthemechange)|

Web和小程序注意：
1. 没有能力获取os的主题。只能获取浏览器或小程序宿主的主题，即hostTheme。
2. 可以选择不响应hostTheme，也可以根据hostTheme调整自身的表现。
3. 某些浏览器或小程序自带API会涉及UI，其主题是跟随hostTheme来的，开发者的应用无法控制这些ui的主题。比如浏览器的alert()、小程序的showModal。

应用适配暗黑主题，可以选择：
1. 跟随上家，比如app平台跟随OSTheme，web和小程序跟随hostTheme。
2. 不跟随上家，应用自己独立设置主题。比如有的应用只有暗黑模式，有的应用给用户提供了主题选择列表，允许用户选择和osTheme不一样的主题。

一般情况下，独立设置主题的场景常见于App平台，所以App平台新增了appTheme的概念。appTheme有几个用途：
1. 独立于osTheme设置主题
2. 方便开发者和插件作者协作。推荐各个插件作者在涉及UI时，支持主题适配，响应App的主题变化
3. uni-app x框架自带的一些UI页面，比如showActionSheet、比如pages.json的页面设置，会响应appTheme的变化

开发者做主题适配时需考虑的内容范围：
1. 开发者自己的uvue代码
	大部分主题通过css设置，有部分ui需要通过组件的属性或内置API的参数来设置。

	web和小程序平台可以使用媒体查询来设置，但App平台暂不支持媒体查询。所以跨端的写法是，通过`uni.getAppBaseInfo`获取主题设置，保存到vue的响应式变量中，模板的class绑定响应式变量实现动态切换class。

	在hello uni-app x有示例，其在`app.uvue`的onLaunch中调用了`checkSystemTheme()`，该方法来自于`/store/index.uts`，获取当前的主题设置存放在响应式`state.isDarkMode`中。
	然后在组件`components/boolean-data/boolean-data.vue`中，设置computed()的`isDarkMode`，在template中通过响应式变量isDarkMode动态切换class。

2. [pages.json](../collocation/pagesjson.md)的页面设置，推荐通过[theme.json](../collocation/themejson.md)设置
3. web 端、小程序需要配置 [manifest.json](../collocation/manifest.md) 中 `web`、`mp-weixin` 根节点的 `"darkmode": true`。配置后如果不生效请重新编译运行
4. uni-app x的App和Web平台框架中自带的界面（小程序平台由小程序宿主自行适配，与uni-app x框架无关）
	- uni.showActionSheet（从HBuilderX 4.51起适配暗黑模式）
	- uni.showModal （暂未适配暗黑模式）
	- uni.chooseLocation （从HBuilderX 4.33起适配暗黑模式）
	- uni.openLocation （从HBuilderX 4.41起适配暗黑模式）
	- uni.chooseImage/chooseVideo/chooseMedia/chooseFile，当调用系统的选择界面时，该界面的主题跟随osTheme，应用层无法干预

注意：有些平台，os主题变化时会重启App，有些小程序宿主主题变化时会重启小程序，有些则不会。在会重启的场景下，监听主题变化其实没有意义。

<!-- ## uni.setAppTheme(options) @setapptheme -->

::: sourceCode
## uni.setAppTheme(options) @setapptheme

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

设置应用主题

uni.setAppTheme，并不会帮助开发者自动实现整个应用的亮/暗主题切换，它的作用是：
1. 根据[theme.json](../collocation/themejson.md)，设置pages.json的亮/暗主题
2. 触发uni.onAppThemeChange，开发者和组件作者均可监听这个事件，自行响应将页面设置为对应的亮/暗风格。

当然组件作者也可以不监听onAppThemeChange，而是暴露主题切换API给开发者，由开发者监听主题切换，再调用组件的主题切换API。

目前uni-app x的内置组件和UI相关的API（比如showModal），并不会响应setAppTheme。组件是暴露了样式属性供开发者自行设置，Modal相关API目前没有样式设置，后续会升级支持。

### setAppTheme 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.18 | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetAppThemeOptions** | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 主题 |
| success | (result: [SetAppThemeSuccessResult](#setappthemesuccessresult-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [AppThemeFail](#appthemefail-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 亮色模式 |
| dark | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 深色模式 |
| auto | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 跟随系统模式 |

#### SetAppThemeSuccessResult 的属性值 @setappthemesuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### AppThemeFail 的属性值 @appthemefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 错误码<br/>- 702001  参数错误<br/>- 2002000  未知错误 |
| errSubject | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 702001 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 参数错误 |
| 2002000 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 未知错误 |




```uts
uni.setAppTheme({
  theme: "auto",
  success: function() {
    console.log("设置appTheme为 auto 成功")
  },
  fail: function(e: IAppThemeFail) {
    console.log("设置appTheme为 auto 失败,原因:", e.errMsg)
  }
})
```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.setAppTheme)

<!-- ## uni.onAppThemeChange(callback) @onappthemechange -->

::: sourceCode
## uni.onAppThemeChange(callback) @onappthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

开启监听应用主题变化

**版本历史调整**
- HBuilderX 4.18版本的逻辑是：[uni.setAppTheme](#setapptheme) 设置的 theme 值变化时触发本监听回调，回调参数中的 appTheme 值可能是"light" | "dark" | "auto"。在 app 平台设置应用的 theme 值为 auto 后，需再次查询osTheme来判断当前的真实主题。如果应用主题是auto，那么需要同时监听osTheme的变化。
- HBuilderX 4.19版本调整为：应用的light/dark主题真正发生变化时触发监听回调。无论是手动设置setAppTheme还是跟随osTheme变化，只要真正变化了就会触发本监听。回调参数中的 appTheme 值只能是"light" | "dark"。

### onAppThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.18 | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [AppThemeChangeResult](#appthemechangeresult-values)) => void | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 

### AppThemeChangeResult 的属性值 @appthemechangeresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appTheme | string | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 应用主题 |

#### appTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 亮色模式 |
| dark | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 深色模式 |


### 返回值 

| 类型 |
| :- |
| number |
 


```uts
//callbackId 用于注销监听
val callbackId = uni.onAppThemeChange((res: AppThemeChangeResult) => {
  console.log("onAppThemeChange", res.appTheme)
})
```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onAppThemeChange)

<!-- ## uni.offAppThemeChange(id) @offappthemechange -->

::: sourceCode
## uni.offAppThemeChange(id) @offappthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

取消监听应用主题变化

### offAppThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.18 | 4.18 | 4.18 | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 




```uts
val callbackId = uni.onAppThemeChange((res: AppThemeChangeResult) => {
  console.log("onAppThemeChange", res.appTheme)
})
//...
//...
//注销监听
uni.offAppThemeChange(this.appThemeChangeId)
```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offAppThemeChange)

<!-- ## uni.onOsThemeChange(callback) @onosthemechange -->

::: sourceCode
## uni.onOsThemeChange(callback) @onosthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

开启监听系统主题变化

### onOsThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.18 | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [OsThemeChangeResult](#osthemechangeresult-values)) => void | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 

### OsThemeChangeResult 的属性值 @osthemechangeresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| osTheme | string | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 系统主题 |

#### osTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 亮色模式 |
| dark | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 深色模式 |


### 返回值 

| 类型 |
| :- |
| number |
 


```uts
//callbackId 用于注销监听
val callbackId = uni.onOsThemeChange((res: OsThemeChangeResult)=> {
    console.log("onOsThemeChange---", res.osTheme)
})
```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onOsThemeChange)

**注意：**
+ android 10、iOS 13 才开始支持深色模式主题 `dark`，更低版本无法获取、监听OS的主题。
+ iOS平台应用在进入后台时，会分别截取 app 在 light 和 dark 模式下的截图，用于系统主题切换的同时对后台 app 预览视图进行切换，所以会切换多次 light/dark 模式，程序正常响应 change 事件即可，否则系统截取的图片可能会出现异常，如果确实有必要忽略这种情况下的 change 事件可以在 onHide 后自行忽略。

<!-- ## uni.offOsThemeChange(id) @offosthemechange -->

::: sourceCode
## uni.offOsThemeChange(id) @offosthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

取消监听系统主题变化

### offOsThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.18 | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 




```uts
val callbackId = uni.onOsThemeChange((res: OsThemeChangeResult)=> {
    console.log("onOsThemeChange---", res.osTheme)
})
...
...
//注销监听
uni.offOsThemeChange(callbackId)
```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offOsThemeChange)

<!-- UTSAPIJSON.offOsThemeChange.example -->

<!-- ## uni.onHostThemeChange(callback) @onhostthemechange -->

::: sourceCode
## uni.onHostThemeChange(callback) @onhostthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

监听宿主题状态变化。

### onHostThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.35 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnHostThemeChangeCallbackResult](#onhostthemechangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 

### OnHostThemeChangeCallbackResult 的属性值 @onhostthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| hostTheme | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 主题名称 |

#### hostTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 亮色模式 |
| dark | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 深色模式 |


### 返回值 

| 类型 |
| :- |
| number |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onHostThemeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#onhostthemechange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#onhostthemechange)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onHostThemeChange&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onHostThemeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onHostThemeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onHostThemeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onHostThemeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onHostThemeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onHostThemeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.onHostThemeChange.example -->

<!-- ## uni.offHostThemeChange(id) @offhostthemechange -->

::: sourceCode
## uni.offHostThemeChange(id) @offhostthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

取消监听宿主题状态变化。

### offHostThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.35 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offHostThemeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#offhostthemechange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#offhostthemechange)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=offHostThemeChange&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offHostThemeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offHostThemeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offHostThemeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offHostThemeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offHostThemeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offHostThemeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.offHostThemeChange.example -->

::: sourceCode
## uni.~~onThemeChange(callback)~~ @onthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

监听系统主题状态变化。  **已废弃，在web、小程序上推荐使用 onHostThemeChange**

### onThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnThemeChangeCallbackResult](#onthemechangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 

### OnThemeChangeCallbackResult 的属性值 @onthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 主题名称 |

#### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 亮色模式 |
| dark | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 深色模式 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onThemeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#onthemechange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#onthemechange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onThemeChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onThemeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onThemeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onThemeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onThemeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onThemeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onThemeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.onThemeChange.example -->

::: sourceCode
## uni.~~offThemeChange(callback)~~ @offthemechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

取消监听系统主题状态变化。  **已废弃，在web、小程序上推荐使用 offHostThemeChange**

### offThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnThemeChangeCallbackResult](#onthemechangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | - | 

### OnThemeChangeCallbackResult 的属性值 @onthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 主题名称 |

#### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 亮色模式 |
| dark | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 深色模式 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offThemeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#offthemechange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/theme.html#offthemechange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offThemeChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offThemeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offThemeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offThemeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offThemeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offThemeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offThemeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.offThemeChange.example -->

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/theme-change/theme-change.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/theme-change/theme-change.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/theme-change/theme-change

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/theme-change/theme-change

>示例
```vue
<template>
  <view class="uni-padding-wrap">
    <!-- #ifdef APP -->
    <view class="uni-common-mt item-box">
      <text>osTheme:</text>
      <text id="theme">{{ osTheme }}</text>
    </view>
    <!-- #endif -->
    <view class="uni-common-mt item-box">
      <text>应用当前主题:</text>
      <text id="theme">{{ appTheme }}</text>
    </view>

    <!-- #ifdef APP -->
    <view>
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 修改appTheme主题（此处仅为演示API，本应用并未完整适配暗黑模式） </text>
      </view>
    </view>
    <view class="uni-list uni-common-pl">
      <radio-group @change="radioChange" class="radio-group">
        <radio class="uni-list-cell uni-list-cell-pd radio" v-for="(item, index) in items" :key="item"
          :class="index < items.length - 1 ? 'uni-list-cell-line' : ''" :value="item" :checked="index === current">
          {{ item }}
        </radio>
      </radio-group>
    </view>
    <!-- #endif -->

  </view>
</template>

<script setup lang="uts">
  

  const osThemeChangeId = ref(0)
  const appThemeChangeId = ref(0)
  const osTheme = ref("light" as string)
  const appTheme = ref("light" as string)
  const originalTheme = ref("light" as string)
  const current = ref(0)
  const items = ref([
    "light",
    "dark",
    "auto"
  ] as string[])

  function bindOsThemeChange() : number {
    //注册osTheme变化监听
    return uni.onOsThemeChange((res : OsThemeChangeResult) => {
      osTheme.value = res.osTheme
    })
  }

  function bindAppThemeChange() : number {
    // #ifdef APP
    //注册appTheme变化监听
    return uni.onAppThemeChange((res : AppThemeChangeResult) => {
      appTheme.value = res.appTheme
    })
    // #endif
    // #ifdef WEB || MP
    return uni.onHostThemeChange((res : OnHostThemeChangeCallbackResult) => {
      appTheme.value = res.hostTheme
    })
    // #endif
  }

  function setAppTheme(value : string) {
    uni.setAppTheme({
      theme: value as 'light' | 'dark' | 'auto',
      success: function () {
        console.log("设置appTheme为", value, "成功")
      },
      fail: function (e : IAppThemeFail) {
        console.log("设置appTheme为", value, "失败,原因:", e.errMsg)
      }
    })
  }

  function radioChange(e : UniRadioGroupChangeEvent) {
    const theme = e.detail.value
    setAppTheme(theme)
    uni.showToast({
      icon: 'none',
      title: '当前选中:' + theme,
    })
  }

  onReady(() => {
    uni.getSystemInfo({
      success: (res : GetSystemInfoResult) => {
        // #ifdef APP
        osTheme.value = res.osTheme!
        originalTheme.value = res.appTheme!
        appTheme.value = res.appTheme == "auto" ? res.osTheme! : res.appTheme!
        current.value = items.value.indexOf(res.appTheme!)
        // #endif
        // #ifdef WEB || MP
        appTheme.value = res.hostTheme!
        // #endif
      }
    })
    // #ifdef APP
    osThemeChangeId.value = bindOsThemeChange()
    // #endif
    appThemeChangeId.value = bindAppThemeChange()
  })

  onUnload(() => {
    //注销监听
    // #ifdef APP
    uni.offAppThemeChange(appThemeChangeId.value)
    uni.offOsThemeChange(osThemeChangeId.value)
    // #endif
    // #ifdef WEB || MP
    uni.offHostThemeChange(appThemeChangeId.value)
    // #endif
    //暂时屏蔽 避免5.1安卓设备自动化测试不过
    // uni.showToast({
    //   "position": "bottom",
    //   "title": "已停止监听主题切换"
    // })
  })
</script>

<style>
  .item-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .uni-list-cell {
    justify-content: flex-start;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

