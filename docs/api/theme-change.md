## 暗黑主题适配教程light和dark

### 基础概念
`iOS 13+`、`Android 10+` 提供了暗黑模式/深色模式，之前的模式称为light，暗黑称为dark。

同时也要注意，低于上述版本的手机，系统层没有暗黑模式概念。

在uni-app x中，有3种主题概念：OSTheme、hostTheme、appTheme。每种主题在不同平台支持度不同，获取、设置和监听变化的方式也不同。

|主题概念	|描述												|App|Web|小程序	|获取方式																			|设置方式												|监听变化							|
|--				|--													|--	|--	|--			|--																						|--															|--										|
|osTheme	|手机OS的当前主题							|√	|x	|x			|[uni.getDeviceInfo](./get-device-info.md)		|-															|[uni.onOsThemeChange](#onosthemechange)|
|hostTheme|浏览器或小程序宿主的当前主题	|x	|√	|√			|[uni.getAppBaseInfo](./get-app-base-info.md)		|-															|[uni.onHostThemeChange](#onhostthemechange)|
|appTheme	|App当前主题									|√	|X	|x			|[uni.getAppBaseInfo](./get-app-base-info.md)	|[uni.setAppTheme](#setapptheme)|[uni.onAppThemeChange](#onappthemechange)|

Web和小程序注意：
- 没有能力获取os的主题。只能获取浏览器或小程序宿主的主题，即hostTheme。
- 可以选择不响应hostTheme（darkmode设置为false），也可以根据hostTheme调整自身的表现（darkmode设置为true）。
- 一旦在manifest里开启darkmode，pages.json的tabbar、导航栏、页面背景色，某些浏览器或小程序自带的组件和涉及UI的API，都会跟随hostTheme变化，开发者的应用无法控制这些ui的主题。比如浏览器的alert()、小程序的showModal。

一般情况下，独立设置主题的场景常见于App平台，所以App平台新增了appTheme的概念。appTheme有几个用途：
1. 独立于osTheme设置主题
2. 方便开发者和插件作者协作。推荐各个插件作者在涉及UI时，支持主题适配，响应App的主题变化
3. uni-app x框架自带的一些UI页面，比如showActionSheet、比如pages.json的页面设置，会响应appTheme的变化

开发者做主题适配时需要先明确需求，这3种做法，需要做的事情都不一样：
1. 只做dark，不做light
- 只需要在pages.json的globalStyle里写死页面背景、tabBar以及navigationBar的背景前景颜色。
- 在uvue页面里写死暗色系颜色值。无需动态判断、无需css变量。本文接下来都不用再看了。
2. 只跟随“上家”（App的上家是osTheme、小程序和web的上家是hostTheme），不需要给用户提供手动切换
- 要做一些事情，见下
3. App上提供独立的light/dark/auto选项给用户，可以根据osTheme，也可以独立设置
- 要做更多事情，了解appTheme相关API，见下

### 主题适配处理内容范围
开发者做主题适配时需处理的内容范围，涉及manifest.json、theme.json、pages.json、app.uvue，以及自己的uvue页面。

#### 1.manifest.json
web 端、小程序需要配置 [manifest.json](../collocation/manifest.md) 中 `web`、`mp-weixin` 根节点的 `"darkmode": true`。配置后如果不生效请重新编译运行
```json
{
	"mp-weixin": {
		"darkmode": true
	},
	"web": {
		"darkmode": true
	}
}
```

#### 2. pages.json和theme.json

[pages.json](../collocation/pagesjson.md)的亮黑设置，需要通过[theme.json](../collocation/themejson.md)处理。

要特别注意，**适配暗黑模式，在项目根目录下放置theme.json文件是必不可少的环节**。

该文件除了处理tabbar和导航栏之外，非常重要的是globalStyle里的页面style的backgroundColorContent属性。

尤其是在小程序下，前端页面设置的背景色生效时间较晚，在页面刚创建并开始动画的时候，页面的原生背景色是浅色，然后前端设置页面背景色为深色，就会出现闪白现象。

所以适配暗黑，就必须要在项目下新建theme.json文件，并且在pages.json的globalStyle里，把页面在dark模式下的背景色统一掉。

然后每个页面的根view或scroll-view，反而不用设背景色，使用globalStyle的backgroundColorContent的配置就好了。

下面是pages.json中的globalStyle设置，在属性值中，通过@来引用theme.json中定义的值：
```json
"globalStyle": {
	"navigationBarTextStyle": "@navigationBarTextStyle",
	"navigationBarBackgroundColor": "@navigationBarBackgroundColor",
	"backgroundColorContent": "@backgroundColorContent",
	"backgroundColor": "@backgroundColor",
	"backgroundTextStyle": "@backgroundTextStyle"
},
```

下面是theme.json的样例。theme.json的位置放在pages.json同级目录下。

在light和dark节点下，分别命名一批同名的变量，并分别赋值。这些变量可以在pages.json里直接引用。
```json
{
  "light": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#007AFF",
    "backgroundColor": "#efeff4",
    "backgroundColorContent": "#efeff4",
    "tabBarPagebackgroundColorContent": "#efeff4",
    "backgroundTextStyle": "dark"
  },
  "dark": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#1F1F1F",
    "backgroundColor": "#1F1F1F",
    "backgroundColorContent": "#646464",
    "tabBarPagebackgroundColorContent": "#1F1F1F",
    "backgroundTextStyle": "light"
  }
}
```

完整的theme.json教程详见：[theme.json](../collocation/themejson.md)

theme.json 里的变量仅能用于 pages.json。uvue页面不能引用。

在web和小程序中，theme.json的dark部分生效的前提是：
1. manifest设置了`darkmode:true`
2. 浏览器和小程序宿主如微信，主题外观是dark。

在App中，可以通过manifest.json的[`app.defaultAppTheme`](../collocation/manifest.md#manifest-app)配置应用默认主题，可取值为light、dark、auto，默认值为light。配置为auto时，appTheme会跟随OS主题变化。

```json
{
	"app": {
		"defaultAppTheme": "auto"
	}
}
```

如果应用为用户提供主题切换功能，可以在运行时通过[uni.setAppTheme](#setapptheme)设置light、dark或auto。

完成上述基础配置后，页面和组件的主题样式可以根据平台及版本选择以下一种方案。

#### 3. 使用媒体查询适配主题（推荐）

以下平台可以使用`@media (prefers-color-scheme: light)`和`@media (prefers-color-scheme: dark)`设置主题样式：

- Web和小程序平台
- HBuilderX 5.25+的App平台蒸汽模式

在支持上述能力的平台，推荐优先使用媒体查询适配主题。

媒体查询会根据hostTheme或appTheme自动匹配。主题变化时，匹配的样式也会自动更新，无需监听主题变化、维护响应式变量或动态切换class。详见[@media媒体查询](../css/common/at-rules.md#media)。

页面只需要使用固定的class，通过媒体查询分别定义亮色和暗色样式：

```vue
<template>
	<view class="page">
		<text class="title">根据当前主题显示不同颜色的文字</text>
	</view>
</template>

<style>
	@media (prefers-color-scheme: light) {
		.page {
			--text-color: #333333;
		}
	}

	@media (prefers-color-scheme: dark) {
		.page {
			--text-color: #ffffff;
		}
	}

	.title {
		color: var(--text-color);
	}
</style>
```

在theme.json中已经设置页面背景色的情况下，一般不推荐重复在uvue文件的根组件上重复设置背景色。

如果App平台需要为用户提供light、dark、auto选项，直接调用`uni.setAppTheme`即可。appTheme变化后，媒体查询会自动更新匹配的样式。

#### 4. 监听主题并动态切换class（兼容方案）

以下App平台场景，由于不支持媒体查询，只能通过API使用监听主题变化，然后动态切换class：

- HBuilderX 5.25之前的App平台
- App平台VDOM模式

在已支持媒体查询的平台，如果业务逻辑还需要读取当前主题状态，可以另外使用主题API获取和监听，但样式仍可使用媒体查询，无需动态切换class。

为了在同一套代码中兼容上述App平台场景，以下示例在各端统一使用动态class。为避免每个页面都监听主题变化，可以在app.uvue中获取并监听主题，将结果存放在`store/index.uts`中，供各页面使用。

如果应用只需要跟随上家，不独立设置主题，App平台需要先将`app.defaultAppTheme`配置为auto，然后可以这样处理：

```ts
// app.uvue
import { state } from '@/store/index.uts'

onLaunch(() => {
	// #ifdef WEB || MP-WEIXIN
	state.isDark = (uni.getAppBaseInfo().hostTheme == 'dark')
	uni.onHostThemeChange((result) => {
		state.isDark = (result.hostTheme == 'dark')
	})
	// #endif

	// #ifdef APP
	state.isDark = (uni.getDeviceInfo().osTheme == 'dark')
	uni.onOsThemeChange((result: OsThemeChangeResult) => {
		state.isDark = (result.osTheme == 'dark')
	})
	// #endif
})
```

`store/index.uts`的内容如下：

```ts
type State = {
	// 是否为暗黑主题
	isDark: boolean
}

export const state = reactive({
	isDark: false
} as State)
```

如果App平台允许用户独立设置主题，则需要获取和监听appTheme：

```ts
// app.uvue
import { state } from '@/store/index.uts'

onLaunch(() => {
	// #ifdef WEB || MP-WEIXIN
	state.isDark = (uni.getAppBaseInfo().hostTheme == 'dark')
	uni.onHostThemeChange((result) => {
		state.isDark = (result.hostTheme == 'dark')
	})
	// #endif

	// #ifdef APP
	const appTheme = uni.getAppBaseInfo().appTheme
	state.isDark = appTheme == 'auto'
		? uni.getDeviceInfo().osTheme == 'dark'
		: appTheme == 'dark'
	uni.onAppThemeChange((result: AppThemeChangeResult) => {
		state.isDark = (result.appTheme == 'dark')
	})
	// #endif
})
```

可以在app.uvue的全局样式中定义亮色和暗色class。除非页面或组件的样式隔离策略禁止全局样式影响，否则页面可以直接使用这些class。

```css
.theme-light {
	--text-color: #333333;
}

.theme-dark {
	--text-color: #ffffff;
}
```

页面根节点根据`state.isDark`动态切换class：

```vue
<template>
	<view :class="state.isDark ? 'theme-dark' : 'theme-light'">
		<text class="title">根据当前主题显示不同颜色的文字</text>
	</view>
</template>

<script setup lang="uts">
	import { state } from '@/store/index.uts'
</script>

<style>
	.title {
		color: var(--text-color);
	}
</style>
```

动态切换class，由于要执行script，性能没有媒体查询高。另外动态切换class的代码，和theme.json的执行可能不在同一帧，会造成theme.json先生效、class后生效，有闪烁感。推荐升级到5.25的蒸汽模式，使用媒体查询方案适配主题。

#### 内置组件和UI相关的API的说明

uni-app x的App和Web平台框架中自带的界面，均已适配暗黑模式（小程序平台由小程序宿主自行适配）
- uni.showActionSheet（HBuilderX 4.51+）
- uni.showModal （HBuilderX 4.61+）
- uni.chooseLocation （HBuilderX 4.33+）
- uni.openLocation （HBuilderX 4.41+）
- uni.chooseImage/chooseVideo/chooseMedia/chooseFile，当调用系统的选择界面时，该界面的主题跟随osTheme，应用层无法干预

uni-app x的内置组件，在App和Web平台均支持css设置所有样式，这样就可以在所有样式控制中使用css变量。但小程序平台的内置组件，依赖其自身实现，有的组件需要通过属性控制样式，此时无法使用css变量。

### 示例项目

1. hello uni-app x示例目前使用媒体查询适配主题。其`app.uvue`、页面和组件样式中使用`@media (prefers-color-scheme: light)`和`@media (prefers-color-scheme: dark)`定义不同主题下的样式，`pages/CSS/prefers-color-scheme`页面提供了完整示例。
2. [test-theme](https://gitcode.com/dcloud/test-theme)，是一个基于无媒体查询的、动态切换class的示例项目，演示主题设置。


<!-- ## uni.setAppTheme(options) @setapptheme -->

::: sourceCode
## uni.setAppTheme(options) @setapptheme

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-theme


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-theme

:::

设置应用主题

uni.setAppTheme用于设置App当前主题。开发者仍需为不同主题定义相应的页面和组件样式。它的作用是：
1. 根据[theme.json](../collocation/themejson.md)，设置pages.json的亮/暗主题
2. HBuilderX 5.25+，在App平台蒸汽模式下，自动更新`@media (prefers-color-scheme: light)`和`@media (prefers-color-scheme: dark)`匹配的样式
3. 触发uni.onAppThemeChange，开发者和组件作者均可监听这个事件，自行响应将页面设置为对应的亮/暗风格。

当然组件作者也可以不监听onAppThemeChange，而是暴露主题切换API给开发者，由开发者监听主题切换，再调用组件的主题切换API。

uni-app x的UI相关的API（比如showModal），也会响应setAppTheme。

### setAppTheme 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **SetAppThemeOptions** | 是 | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 |  | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 主题 |
| success | (result: [SetAppThemeSuccessResult](#setappthemesuccessresult-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 接口调用成功的回调函数 |
| fail | (result: [AppThemeFail](#appthemefail-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x | 亮色模式 |
| dark | Web: x; 微信小程序: x | 深色模式 |
| auto | Web: x; 微信小程序: x | 跟随系统模式 |

#### SetAppThemeSuccessResult 的属性值 @setappthemesuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| theme | string | 是 | Web: x; 微信小程序: x |

#### AppThemeFail 的属性值 @appthemefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 错误码<br/>- 702001  参数错误<br/>- 2002000  未知错误 |
| errSubject | string | 是 | Web: x; 微信小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 702001 | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 参数错误 |
| 2002000 | Web: x; 微信小程序: x | 未知错误 |




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

### onAppThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [AppThemeChangeResult](#appthemechangeresult-values)) => void | 是 | Web: x; 微信小程序: x | 

### AppThemeChangeResult 的属性值 @appthemechangeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| appTheme | string | 是 | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 应用主题 |

#### appTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x | 亮色模式 |
| dark | Web: x; 微信小程序: x | 深色模式 |


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

### offAppThemeChange 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| id | number | 是 | Web: x | 




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

### onOsThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [OsThemeChangeResult](#osthemechangeresult-values)) => void | 是 | Web: x; 微信小程序: x | 

### OsThemeChangeResult 的属性值 @osthemechangeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| osTheme | string | 是 | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.71 | 系统主题 |

#### osTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: x; 微信小程序: x | 亮色模式 |
| dark | Web: x; 微信小程序: x | 深色模式 |


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

### offOsThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.18 | 4.18 | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| id | number | 是 | Web: x; 微信小程序: x | 




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

### onHostThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.35 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: [OnHostThemeChangeCallbackResult](#onhostthemechangecallbackresult-values)) => void | 是 | Android: x; iOS: x | 

### OnHostThemeChangeCallbackResult 的属性值 @onhostthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| hostTheme | string | 是 | Android: x; iOS: x | 主题名称 |

#### hostTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Android: x; iOS: x | 亮色模式 |
| dark | Android: x; iOS: x | 深色模式 |


### 返回值 

| 类型 |
| :- |
| number |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onHostThemeChange)
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

### offHostThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.35 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| id | number | 是 | Android: x; iOS: x | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offHostThemeChange)
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

### onThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: [OnThemeChangeCallbackResult](#onthemechangecallbackresult-values)) => void | 是 | Android: x; iOS: x | 

### OnThemeChangeCallbackResult 的属性值 @onthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| theme | string | 是 | Android: x; iOS: x | 主题名称 |

#### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Android: x; iOS: x | 亮色模式 |
| dark | Android: x; iOS: x | 深色模式 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.onThemeChange)
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

### offThemeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: [OnThemeChangeCallbackResult](#onthemechangecallbackresult-values)) => void | 是 | Android: x; iOS: x | 

### OnThemeChangeCallbackResult 的属性值 @onthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| theme | string | 是 | Android: x; iOS: x | 主题名称 |

#### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Android: x; iOS: x | 亮色模式 |
| dark | Android: x; iOS: x | 深色模式 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.themeChange.offThemeChange)
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
      <text id="theme">{{ data.osTheme }}</text>
    </view>
    <!-- #endif -->
    <view class="uni-common-mt item-box">
      <text>应用当前主题:</text>
      <text id="theme">{{ data.appTheme }}</text>
    </view>

    <!-- #ifdef APP -->
    <view>
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 修改appTheme主题（此处仅为演示API，本应用并未完整适配暗黑模式） </text>
      </view>
    </view>
    <enum-data :items="data.items" title="appTheme" @change="radioChange"></enum-data>
    <!-- #endif -->

  </view>
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  type Data = {
    osThemeChangeId: number;
    appThemeChangeId: number;
    osTheme: string;
    appTheme: string;
    originalTheme: string;
    current: number;
    items: ItemType[];
  }

  const data = reactive({
    osThemeChangeId: 0,
    appThemeChangeId: 0,
    osTheme: 'light',
    appTheme: 'light',
    originalTheme: 'light',
    current: 0,
    items: [
      { value: 0, name: 'light' },
      { value: 1, name: 'dark' },
      { value: 2, name: 'auto' }
    ] as ItemType[]
  } as Data)

  function bindOsThemeChange() : number {
    return uni.onOsThemeChange((res : OsThemeChangeResult) => {
      data.osTheme = res.osTheme
    })
  }

  function bindAppThemeChange() : number {
    // #ifdef APP
    return uni.onAppThemeChange((res : AppThemeChangeResult) => {
      data.appTheme = res.appTheme
    })
    // #endif
    // #ifdef WEB || MP
    return uni.onHostThemeChange((res : OnHostThemeChangeCallbackResult) => {
      data.appTheme = res.hostTheme
    })
    // #endif
  }

  function setAppTheme(value : string) {
    uni.setAppTheme({
      theme: value as 'light' | 'dark' | 'auto',
      success: function () {
        console.log('设置appTheme为', value, '成功')
      },
      fail: function (e : IAppThemeFail) {
        console.log('设置appTheme为', value, '失败,原因:', e.errMsg)
      }
    })
  }

  function radioChange(value : number) {
    const theme = data.items[value].name
    setAppTheme(theme)
  }

  onReady(() => {
    uni.getSystemInfo({
      success: (res : GetSystemInfoResult) => {
        // #ifdef APP
        data.osTheme = res.osTheme!
        data.originalTheme = res.appTheme!
        data.appTheme = res.appTheme == 'auto' ? res.osTheme! : res.appTheme!
        data.current = data.items.findIndex((item : ItemType) : boolean => {
          const currentItem = item.name == res.appTheme!
          if (currentItem) {
            item.checked = true
          }
          return currentItem
        })
        // #endif
        // #ifdef WEB || MP
        data.appTheme = res.hostTheme!
        // #endif
      }
    })
    // #ifdef APP
    data.osThemeChangeId = bindOsThemeChange()
    // #endif
    data.appThemeChangeId = bindAppThemeChange()
  })

  onUnload(() => {
    // #ifdef APP
    uni.offAppThemeChange(data.appThemeChangeId)
    uni.offOsThemeChange(data.osThemeChangeId)
    // #endif
    // #ifdef WEB || MP
    uni.offHostThemeChange(data.appThemeChangeId)
    // #endif
  })

  defineExpose({
    data,
    setAppTheme,
    radioChange
  })
</script>

<style>
  .item-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

