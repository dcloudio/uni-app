# 页面简介

uni-app x 项目中，页面文件的后缀名`.uvue`文件。

每个uvue文件，都是一个符合`Vue SFC规范`的 vue 文件。

uni-app x 只有 `.uvue`页面，不支持和vue页面并存（因vue是js驱动、webview渲染，uni-app x在app-Android中没有js引擎，app中渲染是原生渲染，无法使用vue页面）。

当然某些组件可以通过条件编译同时适配uni-app和uni-app x，所以在uni-app x的项目中，看到某些组件代码也有vue文件，但这些vue文件并不在uni-app x项目中生效，或者被当做uvue组件对待。

另外uts组件的[uni-app兼容模式插件](./plugin/uts-component.md)的入口文件命名是index.vue。因为uts插件在uni-app和uni-app x中均可使用，所以文件后缀名为vue。\
但这个vue文件并不是真正的页面，它只是uts组件插件为了尽可能照顾开发者习惯而参考vue规范定义的原生组件入口文件。

uni-app x 在非小程序平台上，提供了[dialogPage](./api/dialog-page.md)，这是一种在主页面上弹出全屏的、背景透明的模态子页面。

uni-app x 在app-android上，每个页面都是一个全屏activity，不支持透明。如需要透明页面请使用[dialogPage](./api/dialog-page.md)

## 页面管理

### 新建页面

新建页面，默认保存在工程根目录下的`pages`目录下。

每次新建页面，均需在`pages.json`中配置`pages`列表；未在`pages.json -> pages` 中注册的页面，在编译阶段会被忽略，不会进入编译产物。

pages.json的完整配置参考：[页面配置](./collocation/pagesjson.md)。

通过HBuilderX开发 `uni-app x` 项目时，在项目上右键“新建页面”，HBuilderX会自动在`pages.json`中完成页面注册，开发更方便。

新建页面时，可以选择`是否创建同名目录`。创建目录的意义在于：

- 如果你的页面较复杂，需要拆分多个附属的uts、css、组件等文件，则使用目录归纳比较合适。
- 如果只有一个页面文件，大可不必多放一层目录。

不管是普通页面，还是dialogPage页面，都需要在pages.json中注册。

### 删除页面

删除页面时，需做两件工作：

- 删除`.uvue`文件
- 删除`pages.json -> pages`列表项中的配置 （如使用HBuilderX删除页面，会在状态栏提醒删除pages.json对应内容，点击后会打开pages.json并定位到相关配置项）

### 页面改名

操作和删除页面同理，依次修改文件名和 `pages.json`。

### pages.json

pages.json位于工程根目录，是工程的页面管理配置文件，功能包括：页面路由注册、页面style参数配置（背景色、原生标题栏、下拉刷新...）、首页tabbar等众多功能。

其篇幅较长，另见 [pages.json](./collocation/pagesjson.md)

#### 设置应用首页@startpage

`pages.json -> pages`配置项中的第一个页面，作为当前工程的首页（启动页）。

```json
{
	"pages": [
		{
			"path": "pages/index/index", //名字叫不叫index无所谓，位置在第一个，就是首页
			"style": {
				"navigationBarTitleText": "首页" //页面标题
			}
		},
		{
			"path": "pages/my",
			"style": {
				"navigationBarTitleText": "我的"
			}
		},
	]
}
```

## 页面内容构成

uvue页面基于 vue 单文件组件规范。一个页面内，有3个根节点标签：

- 模板区 `<template>`
- 脚本区 `<script>`
- 样式区 `<style>`

```vue
<template>
	<view class="content">
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script setup>
  let title = ref("Hello world") //定义一个响应式变量。类似于选项式的定义data
	const buttonClick = () => { //方法不再需要写在method下面
	  console.log("按钮被点了")
	}
	onReady(() => {
		console.log("页面onReady触发") // 页面生命周期，编写页面加载后的逻辑
	})
</script>

<style>
	.content {
		width: 750rpx;
		background-color: white;
	}
</style>
```

页面内容构成，另有[详细文档](./vue/README.md)

## 页面对象实例

运行时每个打开的页面，都有一个[UniPage](./api/unipage.md)实例。

通过全局API [getCurrentPages()](./api/get-current-pages.md) 可以获取到当前应用的页面栈，即所有打开的页面**数组**。

页面栈数组中的每个页面都是一个UniPage实例对象。

也可以通过`this.$page`或`getCurrentInstance()`等vue方式直接获取当前页面。[详见](./api/get-current-pages.md#currentpage)

[UniPage](./api/unipage.md)对象上有很多方法，比如可以获取和设置页面样式（pages.json里配置的页面Style），比如可以获取页面的子弹窗页面（dialogPages）和页面上的元素（UniElement）。[详见](./api/get-current-pages.md)

## 页面生命周期 @lifecycle

| 组合式 | 选项式 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) | 描述 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| onLoad | onLoad | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 生命周期回调 监听页面加载<br/><br/>页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。 |
| onPageShow | onShow | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 生命周期回调 监听页面显示<br/><br/>页面显示/切入前台时触发。<br/> |
| onReady | onReady | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 生命周期回调 监听页面初次渲染完成<br/><br/>页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。<br/> |
| onPageHide | onHide | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 生命周期回调 监听页面隐藏<br/><br/>页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，应用切入后台等。<br/> |
| onUnload | onUnload | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 生命周期回调 监听页面卸载<br/><br/>页面卸载时触发。如 `redirectTo` 或 `navigateBack` 到其他页面时。<br/> |
| onPullDownRefresh | onPullDownRefresh | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 监听用户下拉动作<br/>- 需要在 `pages.json` 的页面配置中开启 `enablePullDownRefresh` 。<br/>- 可以通过 `uni.startPullDownRefresh` 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。<br/>- 当处理完数据刷新后，`uni.stopPullDownRefresh` 可以停止当前页面的下拉刷新。<br/> |
| onReachBottom | onReachBottom | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 页面上拉触底事件的处理函数<br/>- 可以在 `pages.json` 的页面配置中设置触发距离 `onReachBottomDistance` 。<br/>- 在触发距离内滑动期间，本事件只会被触发一次。<br/> |
| onPageScroll | onPageScroll | 4.0 | 4.41 | 3.9 | 4.13 | 4.61 | - | 页面滚动触发事件的处理函数<br/><br/>监听用户滑动页面事件。 |
| onResize | onResize | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - | 页面尺寸改变时触发 |
| onBackPress | onBackPress | 4.0 | x | 3.9 | 4.11 | 4.61 | - | 监听页面返回 |
| onInit | onInit | x | x | x | x | 4.61 | - | 生命周期回调 监听页面初始化<br/><br/>页面初始化时触发。一个页面只会调用一次，可以在 onInit 的参数中获取打开当前页面路径中的参数。 |
| onShareAppMessage | onShareAppMessage | x | 4.41 | x | x | 4.61 | - | 用户点击右上角转发<br/><br/>监听用户点击页面内转发按钮（`<button>` 组件 `open-type="share"`）或右上角菜单“转发”按钮的行为，并自定义转发内容。 |
| onShareTimeline | onShareTimeline | x | 4.41 | x | x | 4.61 | - | 用户点击右上角转发到朋友圈<br/><br/>监听右上角菜单“分享到朋友圈”按钮的行为，并自定义发享内容。<br/> |
| onAddToFavorites | onAddToFavorites | x | 4.41 | x | x | 4.61 | - | 用户点击右上角收藏<br/><br/>监听用户点击右上角菜单“收藏”按钮的行为，并自定义收藏内容。<br/> |
| onTabItemTap | onTabItemTap | 4.0 | 4.41 | x | x | 4.61 | - | 当前是 tab 页时，点击 tab 时触发 |
| onNavigationBarButtonTap | onNavigationBarButtonTap | 4.0 | x | x | x | 4.61 | - | 监听原生标题栏按钮点击事件 |
| onNavigationBarSearchInputChanged | onNavigationBarSearchInputChanged | 4.0 | x | x | x | 4.61 | - | 监听原生标题栏搜索输入框输入内容变化事件<br/> |
| onNavigationBarSearchInputConfirmed | onNavigationBarSearchInputConfirmed | 4.0 | x | x | x | 4.61 | - | 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。<br/> |
| onNavigationBarSearchInputClicked | onNavigationBarSearchInputClicked | 4.0 | x | x | x | 4.61 | - | 监听原生标题栏搜索输入框点击事件<br/> |

在 Vue 中，页面也是一种组件，所以也同时支持[组件生命周期](./vue/options-api.md#page-component-options)。

### 页面 onLoad 生命周期@onload

页面初始化时，会触发onLoad生命周期。此时Dom还未构建渲染完毕，ref和getElementById使用同步方式的话拿不到Dom（需要等onReady或使用异步获取）。

所以onLoad页面常见的用途是：
1. 开始联网取数，由于联网是异步的，在onLoad发起联网，等到获取到服务器数据后，也就可以更新到data或响应式变量上了
2. 页面的URL支持参数传递，这个参数也是在onLoad生命周期中获取。

手机都是多核的，uni.request或云开发联网，在子线程运行，不会干扰UI线程的入场动画，并行处理可以更快的拿到数据、渲染界面。

通过uni.navigateTo API 或 `<navigator>`组件，可跳转到目标页面，比如从list页面跳转到detail页面，如下：

```uts
// 发起跳转，并传入post_id参数
uni.navigateTo({
  url: '/pages/template/list-news/detail/detail?post_id=' + post_id
})
```

```uts
// 在detail页面的onLoad中接收URL中传递的参数
export default {
  data() {
    return {
      post_id: ""
    }
  },
  onLoad(event : OnLoadOptions) { // 类型非必填，可自动推导
    this.post_id = event["post_id"] ?? "";
    // 可根据详情页id继续联网请求数据...
  },
}
```

::: warning 注意
- OnLoadOptions类型，可不填。不填时可自动推导。
- App-iOS平台的窗体动画是异步的，onLoad时可能窗体动画已经开始，此时再设置页面的pageStyle（比如设置背景色），会出现闪烁现象。
- onLoad里不适合进行大量同步耗时运算，因为此时转场动画还没开始。尤其app-Android平台，onLoad里的代码（除了联网和加载图片）默认是在UI线程运行的，大量同步耗时计算很容易卡住页面动画不启动。除非开发者显式指定在其他线程运行。
- `uni-app x android` 平台，如需获取 [activity 实例](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html#activity)，此时当前页面的 `activity 实例`并未创建完成，会获取到上一个页面的 `activity 实例`（首页会获取应用默认的 `activity 实例`）。如需获取当前页面的 `activity 实例`，应在 `onShow` 或 `onReady` 生命周期中获取。
:::

### 页面 onShow 生命周期@onshow
onShow是在onLoad之后，它的意义在于，onLoad是页面创建时触发一次；而当页面隐藏（比如被新窗体遮挡），然后页面再恢复显示时，onLoad不会再触发，只会触发onShow。

tabbar页面切换时，老的tabbar页面会hide，新的tabbar页面会show。

onShow和onHide是成对出现的。

在组合式API中，组件可以监听应用和页面的生命周期。但由于应用和页面都有onShow和onHide，导致重名。所以在组合式的组件中监听页面的显示隐藏，改为了onPageShow和onPageHide。

在微信小程序下，关闭弹出的原生窗体也会触发页面的onShow。比如关闭chooseImage、chooseVideo、chooseMedia、previewImage、chooseLocation、openLocation、scanCode等弹出的窗体。

### 页面 onHide 生命周期@onhide

页面被隐藏/遮挡时会触发页面隐藏生命周期。

比如跳转到下一个页面，会触发之前页面的隐藏。

在微信小程序下，打开全屏原生窗体也会触发页面的onHide。比如chooseImage、chooseVideo、chooseMedia、previewImage、chooseLocation、openLocation、scanCode。可以简单理解为弹出的这些原生窗体盖住了js写的小程序。

### 页面 onResize 生命周期 @onresize

#### onResize 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnResizeOptions** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 页面尺寸改变时回调参数  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| deviceOrientation | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 屏幕方向 |
| size | **OnResizeSize** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 新的显示区域尺寸 |

##### size 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| screenHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 新的屏幕高度 |
| screenWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 新的屏幕宽度 |
| windowHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 新的显示区域高度 |
| windowWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 新的显示区域宽度 | 




### onReachBottom

可在pages.json里定义具体页面底部的触发距离[onReachBottomDistance](/collocation/pagesjson#pages-globalstyle)，
比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。

### 页面 onPageScroll 生命周期 @onpagescroll

#### onPageScroll 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.13 | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnPageScrollOptions** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.13; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 页面滚动参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| scrollTop | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.13; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 页面在垂直方向已滚动的距离（单位 px） | 




### 页面 onBackPress 生命周期 @onbackpress

#### onBackPress 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | 3.9 | 4.11 | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnBackPressOptions** | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 监听页面返回回调参数  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| from | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | - backbutton 顶部导航栏左边的返回按钮或 Android 实体返回键<br/>- navigateBack 返回 API，即 uni.navigateBack() |

##### from 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| backbutton | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | - |
| navigateBack | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | - | 


#### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| boolean | 返回 `true` 时阻止页面返回 | 否 |
 


::: warning 注意
- `onBackPress`上不可使用`async`，会导致无法阻止默认返回
- - iOS 端侧滑返回不会触发 `onBackPress`
:::

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/page/onBackPress/on-back-press-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/page/onBackPress/on-back-press-composition

> 组合式 API

```vue
<template>
  <view class="page container">
    <text>测试 onBackPress 生命周期返回 true</text>
    <button class="mt-10" @click="goChildPage">
      跳转子页，测试返回值为 false
    </button>
  </view>
</template>

<script lang="uts" setup>
  const backPressOptions = reactive({
    from: 'backbutton'
  } as OnBackPressOptions)

  onBackPress((options : OnBackPressOptions) : boolean | null => {
    console.log('onBackPress', options)
    backPressOptions.from = options.from
    return true
  })
  const goChildPage = () => {
    uni.navigateTo({ url: '/pages/lifecycle/page/onBackPress/on-back-press-child-composition' })
  }

  defineExpose({
    goChildPage,
    backPressOptions
  })
</script>
```

> 选项式 API

```vue
<template>
  <view class="page container">
    <text>测试 onBackPress 生命周期返回 true</text>
    <button class='mt-10' @click="goChildPage">跳转子页，测试返回值为 false</button>
  </view>
</template>

<script lang='uts'>
  export default {
    data() {
      return {
        backPressOptions: {
          from: 'backbutton'
        } as OnBackPressOptions
      }
    },
    onBackPress(options: OnBackPressOptions): boolean | null {
      console.log('onBackPress', options)
      this.backPressOptions = options
      return true
    },
    methods: {
      goChildPage() {
        uni.navigateTo({
          url: '/pages/lifecycle/page/onBackPress/on-back-press-child-options'
        })
      }
    }
  }
</script>
```

:::

### 页面 onTabItemTap 生命周期 @ontabitemtap

#### onTabItemTap 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | x | x | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnTabItemTapOption** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 监听 tab 点击回调参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 被点击 tabItem 的序号，从0开始 |
| pagePath | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 被点击 tabItem 的页面路径 |
| text | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 被点击 tabItem 的按钮文字 | 




::: warning 注意
- onTabItemTap常用于点击当前 tabItem，滚动或刷新当前页面。如果是点击不同的 tabItem，一定会触发页面切换。
:::

### 页面 onNavigationBarButtonTap 生命周期 @onnavigationbarbuttontap

#### onNavigationBarButtonTap 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | x | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnNavigationBarButtonTapOption** | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 原生标题栏按钮点击回调参数  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 原生标题栏按钮数组的下标 | 




### 页面 onNavigationBarSearchInputChanged 生命周期 @onnavigationbarsearchinputchanged

#### onNavigationBarSearchInputChanged 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | x | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| event | **NavigationBarSearchInputEvent** | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 监听原生标题栏搜索输入框搜索回调参数  |

#### event 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 搜索输入框输入内容 | 




### 页面 onNavigationBarSearchInputConfirmed 生命周期 @onnavigationbarsearchinputconfirmed

#### onNavigationBarSearchInputConfirmed 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | x | 4.61 | - |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| event | **NavigationBarSearchInputEvent** | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 监听原生标题栏搜索输入框搜索回调参数  |

#### event 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 搜索输入框输入内容 | 




### 页面生命周期示例 @lifecycle-example

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/page/page-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/page/page-composition

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1" :bounces="false">
    <!-- #endif -->
    <view class="page container">
      <text>page lifecycle 组合式 API</text>
      <view class="flex flex-row justify-between mt-10">
        <text>onLoad 触发：</text>
        <text>{{ isOnloadTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPageShow 触发：</text>
        <text>{{ isOnPageShowTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReady 触发：</text>
        <text>{{ isOnReadyTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPullDownRefresh 触发：</text>
        <text>{{ isOnPullDownRefreshTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReachBottom 触发：</text>
        <text>{{ isOnReachBottomTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onBackPress 触发：</text>
        <text>{{ isOnBackPressTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPageHide 触发：</text>
        <text>{{ isOnPageHideTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onResize 触发：</text>
        <text>{{ isOnResizeTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <MonitorPageLifecycleComposition />
      </view>
      <button class="mt-10" @click="scrollToBottom">scrollToBottom</button>
      <button class="mt-10" @click="pullDownRefresh">
        trigger pullDownRefresh
      </button>
      <button class="mt-10" @click="goOnBackPress">
        跳转 onBackPress 示例
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
import { state, setLifeCycleNum } from '@/store/index.uts'
import MonitorPageLifecycleComposition from './monitor-page-lifecycle-composition.uvue'

const isOnloadTriggered = ref(false)
const isOnPageShowTriggered = ref(false)
const isOnReadyTriggered = ref(false)
const isOnPullDownRefreshTriggered = ref(false)
const isOnPageScrollTriggered = ref(false)
const isOnReachBottomTriggered = ref(false)
const isOnBackPressTriggered = ref(false)
const isOnPageHideTriggered = ref(false)
const isOnResizeTriggered = ref(false)

type DataInfo = {
  isScrolled : boolean
}
const dataInfo = reactive({
  isScrolled: false,
} as DataInfo)

onLoad((options : OnLoadOptions) => {
  console.log('onLoad', options)
  isOnloadTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 100)
})
onPageShow(() => {
  isOnPageShowTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onReady(() => {
  isOnReadyTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onPullDownRefresh(() => {
  isOnPullDownRefreshTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onPageScroll((e: OnPageScrollOptions) => {
  console.log('onPageScroll', e)
  isOnPageScrollTriggered.value = true
  // 自动化测试
  dataInfo.isScrolled = true
})
onReachBottom(() => {
  isOnReachBottomTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onBackPress((options : OnBackPressOptions) : boolean | null => {
  console.log('onBackPress', options)
  isOnBackPressTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
  return null
})
onPageHide(() => {
  isOnPageHideTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
})
onUnload(() => {
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 100)
})
onResize((options: OnResizeOptions) => {
  console.log('onBackPress', options)
  isOnResizeTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})

// 自动化测试
const pageGetLifeCycleNum = () : number => {
  return state.lifeCycleNum
}
// 自动化测试
const pageSetLifeCycleNum = (num : number) => {
  setLifeCycleNum(num)
}

// 自动化测试
const pullDownRefresh = () => {
  uni.startPullDownRefresh({
    success() {
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1500)
    },
  })
}

const scrollToBottom = () => {
  uni.pageScrollTo({
    scrollTop: 2000,
  })
}

const goOnBackPress = () => {
  uni.navigateTo({url: '/pages/lifecycle/page/onBackPress/on-back-press-composition'})
}

defineExpose({
  dataInfo,
  pageGetLifeCycleNum,
  pageSetLifeCycleNum,
  pullDownRefresh,
  scrollToBottom,
})
</script>

<style>
.container {
  height: 1200px;
}
</style>

```

:::

## 页面及组件生命周期流程图 @lifecycleflow

下图展示了一个新页面，从创建开始，包括其中的组件，完整的时序。

![](https://web-ext-storage.dcloud.net.cn/doc/tutorial/uni-app-lifecycle-vue3.jpg)#{.zooming width=600 margin=auto}


1. uni-app x框架，首先根据pages.json的配置，创建页面

所以pages.json中页面的style中各个设置是最早生效的，原生导航栏、页面背景色都会立即生效。

2. 根据页面template里的组件，创建dom。

这里的dom创建仅包含第一批处理的静态dom。对于通过uts更新data或响应式变量，然后通过v-for再创建的列表数据，不在第一批处理。

要注意一个页面静态dom元素过多，会影响页面加载速度。
- 在app-Android平台，可能会阻碍页面进入的转场动画。因为此时，页面转场动画还没有启动
- 在app-iOS平台，窗体动画是异步的，不会阻塞

3. 触发onLoad

此时页面还未显示，没有开始进入的转场动画，页面dom还不存在。

所以这里不能直接操作dom（可以修改data或响应式变量，因为vue框架会等待dom准备后再更新界面）。

onLoad中获取当前的activity等原生窗体对象，拿到的是老页面的activity，只能通过页面栈获取activity。

onLoad比较适合的场景是：接受上页的参数，联网取数据，更新data或响应式变量。

4. 页面onShow

onLoad之后，转场动画开始后，页面会触发onShow。

新页面开始进入的转场动画，动画默认耗时300ms。

5. 页面onReady

第2步创建dom是虚拟dom，dom创建后需要经历一段时间，UI层才能完成了页面上真实元素的创建，即触发了onReady。

onReady后，页面元素就可以自由操作了，比如ref获取节点。同时首批界面也渲染了。

注意：onReady和转场动画开始、结束之间，没有必然的先后顺序，完全取决于dom的数量和复杂度。

如果元素排版和渲染够快，转场动画刚开始就渲染好了；

大多情况下，转场动画走几格就看到了首批渲染内容；

如果元素排版和渲染过慢，转场动画结束都没有内容，就会造成白屏。

联网进程从onLoad起就在异步获取数据更新data或响应式变量，如果服务器速度够快，第二批数据也可能在转场动画结束前渲染。

6. 转场动画结束

再次强调，5和6的先后顺序不一定，取决于首批dom渲染的速度。

## 通过props接收页面参数 @page-with-props

HBuilderX 4.71+ 全平台支持通过 props 接收页面参数


::: preview

> 组合式

```vue
<script setup>
const props = defineProps(["title"])
onLoad((options)=>{
  console.log(options['title'] == props.title) // true
})
</script>
```

> 选项式

```vue
<script>
export default {
  props:["title"],
  onLoad(options){
     console.log(options['title'] == this.title) // true
  }
}
</script>
```

:::


## 页面作为组件 @page-as-component

HBuilderX 4.71+ 全平台支持页面作为组件来渲染，通常用于宽屏适配等场景，比如一个新闻网站，在新闻列表页面，宽屏模式下，左侧显示列表，右侧用组件来显示详情页面。

- 需要手动引入页面做为组件使用
```vue
<template>
    <TestPage></TestPage>
</template>

<script setup>
    import TestPage from '@/pages/test/test.uvue'
</script>
```
- 页面作为组件渲染时，所有页面特有的生命周期不再生效，仅支持组件的生命周期(注意：页面组合式生命周期API还可以使用，但监听到的是作为组件时所在页面的，而非它自身的)
- 支持定义props，作为页面渲染时，props会接收url中的参数，作为组件使用时，可以正常传递props（注意：如果某个页面要作为组件渲染，且需要接收参数，请使用props传递，而不是使用onLoad生命周期）
- 如果想判断当前是作为页面渲染，还是组件渲染，可以通过 this.$page.vm === this 来判断，如果相等，说明是作为页面渲染的，不相等，说明是作为组件渲染的
- 宽屏示例详见：[https://ext.dcloud.net.cn/plugin?id=23613](https://ext.dcloud.net.cn/plugin?id=23613)
