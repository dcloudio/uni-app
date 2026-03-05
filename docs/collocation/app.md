# App.uvue

`App.uvue`是uni-app-x的主组件。

所有页面都是在`App.uvue`下进行切换的，是应用入口文件。但`App.uvue`本身不是页面，这里不能编写视图元素，也就是没有`<template>`。

这个文件的作用包括：
1. 监听应用生命周期
2. 配置全局变量globalData
3. 编写全局可用的method方法
4. 配置全局样式

应用生命周期仅可在`App.uvue`中监听，在页面监听无效。

`App.uvue`仅支持选项式，暂不支持组合式写法。

## 应用生命周期@applifecycle

`uni-app-x` 支持如下应用生命周期函数：

### onLaunch?(options: OnLaunchOptions): void; @onlaunch

生命周期回调，监听应用初始化，应用初始化完成时触发，全局只触发一次。


#### onLaunch 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnLaunchOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 应用启动页面路径 |
| appScheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: x | 首次启动时的Scheme。返回值与App.onLaunch的回调参数一致<br/> |
| appLink | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: 4.25; HarmonyOS: x | 首次启动时的appLink。返回值与App.onLaunch的回调参数一致<br/> | 




- 如果应用通过scheme或applink（通用链接）启动，可在本生命周期获取相应参数。配置scheme或applink需在AndroidManifest.xml或info.plist中配置，打包后生效。

#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)



### onShow?(options: OnShowOptions): void; @onshow

生命周期回调 监听应用显示

应用启动，或从后台进入前台显示时触发


#### onShow 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnShowOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 应用启动页面路径 |
| appScheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: x | 本次启动时的Scheme。返回值与App.onShow的回调参数一致<br/> |
| appLink | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: 4.25; HarmonyOS: x | 本次启动时的appLink。返回值与App.onShow的回调参数一致<br/> | 




- 如果应用通过scheme或applink（通用链接）启动（不管首次启动还是后台激活到前台，均触发本生命周期），可在本生命周期获取。配置scheme或applink需在AndroidManifest.xml或info.plist中配置，打包后生效。
- 如开发App页面直达功能，在配置scheme或通用链接并打包后，一般在onShow生命周期里解析scheme或applink参数，然后自行写navigatorTo等路由API跳转页面。onShow的好处是不管首页启动还是后台激活到前台，都触发。当然如果是初次启动，仍然会先打开App的首页再执行开发者编写的路由代码。
- Web的页面直达无需使用scheme或通用链接，所有页面地址都可以直接在地址栏访问。

在微信小程序下，关闭弹出的原生窗体也会触发应用的onShow。比如关闭chooseImage、chooseVideo、chooseMedia、previewImage、chooseLocation、openLocation、scanCode等弹出的窗体。

#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)



### onHide?(): void; @onhide

生命周期回调 监听应用隐藏

应用从前台进入后台时触发


#### onHide 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |






在微信小程序下，打开全屏原生窗体也会触发应用的onHide。比如chooseImage、chooseVideo、chooseMedia、previewImage、chooseLocation、openLocation、scanCode。可以简单理解为弹出的这些原生窗体盖住了js写的小程序。

#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)



### onExit?(): void; @onexit

监听应用退出。app-uvue-android 3.9+


#### onExit 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 3.9 | x | 4.72 |







* 参见 [uni.exit](https://doc.dcloud.net.cn/uni-app-x/api/exit.html#exit) 相关文档

### onError?(error: any): void; @onerror

错误监听函数
应用发生脚本错误或 API 调用报错时触发
4.33+ App 端支持监听异步逻辑中的错误
:::warning
`onError` 可以监听以下来源中的同步错误：
- 组件渲染器
- 事件处理器
- 生命周期钩子
- setup() 函数
- 侦听器

无法监听异步逻辑（例如：`setTimeout`）中的错误和应用初始化之前、 App 崩溃等错误。
:::
#### onError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.21 | 4.21 | 4.61 |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| error | any | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息 | 




#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)




### onLastPageBackPress?(): void; @onlastpagebackpress

最后一个页面按下Android back键，常用于自定义退出。


#### onLastPageBackPress 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 3.9 | x | 4.71 |






#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)




### onPageNotFound?(options: OnPageNotFoundOption): void; @onpagenotfound

页面不存在监听函数

应用要打开的页面不存在时触发，会带上页面信息回调该函数

**注意：**
1. 如果开发者没有添加 `onPageNotFound` 监听，当跳转页面不存在时，将推入微信客户端原生的页面不存在提示页面。
2. 如果 `onPageNotFound` 回调中又重定向到另一个不存在的页面，将推入微信客户端原生的页面不存在提示页面，并且不再回调 `onPageNotFound`。


#### onPageNotFound 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | x | x | x |


#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OnPageNotFoundOption** | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 不存在页面的路径 |
| query | AnyObject | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 打开不存在页面的 query |
| isEntryPage | boolean | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面） | 




#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)




### onUnhandledRejection?(): void; @onunhandledrejection

未处理的 Promise 拒绝事件监听函数


#### onUnhandledRejection 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | x | x | - |






#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)




### onThemeChange?(): void; @onthemechange

监听系统主题变化


#### onThemeChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | 4.41 | x | x | x |


监听主题变化一般不推荐这个生命周期。而是使用uni api方式。详见：[uni-app x主题适配](../api/theme-change.md)





#### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)



**示例代码**

```vue
<script setup lang="uts">
  import { state, setLifeCycleNum, setAppLaunchPath, setAppShowPath } from './store/index.uts'

  // #ifdef APP-ANDROID || APP-HARMONY
  let firstBackTime = 0
  // #endif

  // #ifndef APP-ANDROID || VUE3-VAPOR
  defineOptions({
  mixins: [
    {
      data() {
        return {
          appMixinDataMsg: 'App.uvue mixin data msg'
        }
      }
    }]
  })
  // #endif
	onLaunch((options) => {
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 1000)
		setAppLaunchPath(options.path)
		console.log('App Launch')
	})
	onAppShow((options) => {
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 100)
		setAppShowPath(options.path)
  // #ifndef VUE3-VAPOR
		nextTick(() => {
      if(getApp()?.vm?.globalPropertiesStr === 'default string'){
        setLifeCycleNum(state.lifeCycleNum + 10)
      }
    })
  // #endif
		console.log('App Show')
	})
	onAppHide(() => {
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum - 100)
		console.log('App Hide')
	})
	// #ifdef APP-ANDROID || APP-HARMONY
	onLastPageBackPress(() => {
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum - 1000)
		console.log('App LastPageBackPress')
		if (firstBackTime == 0) {
			uni.showToast({
				title: '再按一次退出应用',
				position: 'bottom',
			})
			firstBackTime = Date.now()
			setTimeout(() => {
				firstBackTime = 0
			}, 2000)
		} else if (Date.now() - firstBackTime < 2000) {
			firstBackTime = Date.now()
			uni.exit()
		}
	})
	onExit(() => {
		console.log('App Exit')
	})
	// #endif
	onError((err: any) => {
		console.log('App Error', err)
		setLifeCycleNum(state.lifeCycleNum + 100)
	})
	const checkLaunchPath = () : boolean => {
		const HOME_PATH = 'pages/index/index'
		if (state.appLaunchPath != HOME_PATH) {
			return false
		}
		if (state.appShowPath != HOME_PATH) {
			return false
		}
		return true
	}
  // #ifndef APP-ANDROID || VUE3-VAPOR
  const checkAppMixin = () : boolean => {
    if(getApp()?.vm?.globalMixinDataMsg1 != '通过 defineMixin 定义全局 mixin data') {
      return false
    }
    if(getApp()?.vm?.appMixinDataMsg != 'App.uvue mixin data msg') {
      return false
    }
    return true
  }
  // #endif
	defineExpose({
		checkLaunchPath,
    // #ifndef APP-ANDROID || VUE3-VAPOR
    checkAppMixin,
    // #endif
	})
</script>

<style>
  @import './styles/common.css';

  .list-item-text {
    line-height: 36px;
  }

  .split-title {
    margin: 20px 0 5px;
    padding: 5px 0;
    border-bottom: 1px solid #dfdfdf;
  }

  .btn-view {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
  }
</style>
<style>
.text-red{
  color: red;
}
</style>

```

**注意**
- **应用生命周期仅可在`App.uvue`中监听，在其它页面监听无效**。
- 应用启动参数，也可以在API `uni.getLaunchOptionsSync`获取，[详见](../api/launch.md#getlaunchoptionssync)
- 由于Android的`uni.exit()`是[热退出](../api/exit.md)，此时很多代码逻辑仍然在运行，有些on的事件监听并没有off，需要开发者在onExit生命周期中编写代码处理。比如在app的onLaunch里通过onXX监听了某事件，那么就需要在onExit里调用offXX取消某事件的监听，否则反复热退出、启动，会多次on而不会off，这会引发内存泄露。

## globalData

> HBuilderX 3.99+

小程序有 globalData，这是一种简单的全局变量机制。这套机制在 uni-app-x 里也可以使用，仅 `iOS uts 插件` 环境不支持。

**以下是 App.uvue 中定义globalData的相关配置：**

```ts
<script lang="uts">
  export default {
    globalData: {
      str: 'global data str',
      num: 123,
      bool: true
    }
  }
</script>
```

页面或组件中通过 `getApp().globalData` 访问。

```ts
<script lang="uts">
  export default {
    methods: {
      getGlobalData() {
        const app = getApp()
        this.globalDataStr = app.globalData.str
        this.globalDataNum = app.globalData.num
        this.globalDataBool = app.globalData.bool
      }
    }
  }
</script>
```

**注意：** `uni-app x` 中 `globalData` 的数据结构与类型通过 `App.uvue` 中的 `globalData` 初始值定义，后续只能读取或修改，不能新增或删除。

globalData是简单的全局变量，其他状态管理方式，可参考文档[全局变量和状态管理](../tutorial/store.md)。

## 全局方法
在 `App.uvue methods` 中，可以定义全局方法，这里定义的方法，在项目中可以通过 `getApp().vm?.methodName()` 调用, 例如：

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-app/get-app.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-app/get-app.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-app/get-app

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-app/get-app

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
  <!-- #endif -->
    <view>
      <page-head title="getApp"></page-head>
      <view class="uni-padding-wrap">
        <button @click="getGlobalData">get globalData</button>
        <template v-if="data.originGlobalData.str.length">
          <text class="uni-common-mt bold">初始的 globalData:</text>
          <text class="uni-common-mt">globalData string: {{ data.originGlobalData.str }}</text>
          <text class="uni-common-mt">globalData number: {{ data.originGlobalData.num }}</text>
          <text class="uni-common-mt">globalData boolean: {{ data.originGlobalData.bool }}</text>
          <text class="uni-common-mt">globalData object: {{ data.originGlobalData.obj }}</text>
          <text class="uni-common-mt">globalData null: {{ data.originGlobalData.null }}</text>
          <text class="uni-common-mt">globalData array: {{ data.originGlobalData.arr }}</text>
          <text class="uni-common-mt">globalData Set: {{ data.originGlobalData.set }}</text>
          <text class="uni-common-mt">globalData Map: {{ data.originGlobalData.map }}</text>
          <text class="uni-common-mt">globalData fun 返回值: {{ data.originGlobalDataFuncRes }}</text>
        </template>
        <button @click="setGlobalData" class="uni-common-mt">
          set globalData
        </button>
        <template v-if="data.newGlobalData.bool">
          <text class="uni-common-mt bold">更新后的 globalData:</text>
          <text class="uni-common-mt">globalData string: {{ data.newGlobalData.str }}</text>
          <text class="uni-common-mt">globalData number: {{ data.newGlobalData.num }}</text>
          <text class="uni-common-mt">globalData boolean: {{ data.newGlobalData.bool }}</text>
          <text class="uni-common-mt">globalData object: {{ data.newGlobalData.obj }}</text>
          <text class="uni-common-mt">globalData null: {{ data.newGlobalData.null }}</text>
          <text class="uni-common-mt">globalData array: {{ data.newGlobalData.arr }}</text>
          <text class="uni-common-mt">globalData Set: {{ data.newGlobalData.set }}</text>
          <text class="uni-common-mt">globalData Map: {{ data.newGlobalData.map }}</text>
          <text class="uni-common-mt">globalData fun 返回值: {{ data.newGlobalDataFuncRes }}</text>
        </template>
        <text class="uni-common-mt">点击按钮调用 App.uvue methods</text>
        <text class="uni-common-mt">increaseLifeCycleNum 方法</text>
        <button class="uni-common-mt" @click="_increaseLifeCycleNum">
          increase lifeCycleNum
        </button>
        <text class="uni-common-mt">lifeCycleNum: {{ data.lifeCycleNum }}</text>
        <!-- #ifndef MP -->
        <button class="uni-common-mt" @click="getAndroidApplication">
          getAndroidApplication
        </button>
        <text class="uni-common-mt">androidApplication is null: {{ data.androidApplication == null }}</text>
        <!-- #endif -->
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { state, setLifeCycleNum, updateGlobalData } from '@/store/index.uts'

  type MyGlobalData = {
    str : string,
    num : number,
    bool : boolean,
    obj : UTSJSONObject,
    null : string | null,
    arr : number[],
    set : string[],
    map : UTSJSONObject,
    fun : () => string
  }

  type DataType = {
    originGlobalData: MyGlobalData;
    originGlobalDataFuncRes: string;
    newGlobalData: MyGlobalData;
    newGlobalDataFuncRes: string;
    lifeCycleNum: number;
    androidApplication: any | null;
  }

  const data = reactive({
    originGlobalData: {
      str: '',
      num: 0,
      bool: false,
      obj: {
        str: '',
        num: 0,
        bool: false
      },
      null: null,
      arr: [] as number[],
      set: [] as string[],
      map: {},
      fun: () : string => ''
    },
    originGlobalDataFuncRes: '',
    newGlobalData: {
      str: '',
      num: 0,
      bool: false,
      obj: {
        str: '',
        num: 0,
        bool: false
      },
      null: null,
      arr: [] as number[],
      set: [] as string[],
      map: {},
      fun: () : string => ''
    },
    newGlobalDataFuncRes: '',
    lifeCycleNum: 0,
    androidApplication: null
  } as DataType)

  const getGlobalData = () => {
    data.originGlobalData.str = state.globalData.str
    data.originGlobalData.num = state.globalData.num
    data.originGlobalData.bool = state.globalData.bool
    data.originGlobalData.obj = state.globalData.obj
    data.originGlobalData.null = state.globalData.null
    data.originGlobalData.arr = state.globalData.arr
    state.globalData.set.forEach((value : string) => {
      data.originGlobalData.set.push(value)
    })
    state.globalData.map.forEach((value : any, key : string) => {
      data.originGlobalData.map[key] = value
    })
    data.originGlobalData.fun = state.globalData.fun
    data.originGlobalDataFuncRes = data.originGlobalData.fun()
  }

  const setGlobalData = () => {
    updateGlobalData('str', 'new globalData str')
    updateGlobalData('num', 100)
    updateGlobalData('bool', true)
    updateGlobalData('obj',{
      str: 'new globalData obj str',
      num: 200,
      bool: true
    })
    updateGlobalData('null', 'not null')
    updateGlobalData('arr', [1, 2, 3])
    updateGlobalData('set', new Set(['a', 'b', 'c']))
    updateGlobalData('map', new Map<string, any>([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ]))
    updateGlobalData('fun', () : string => {
      return 'new globalData fun'
    })

    data.newGlobalData.str = state.globalData.str
    data.newGlobalData.num = state.globalData.num
    data.newGlobalData.bool = state.globalData.bool
    data.newGlobalData.obj = state.globalData.obj
    data.newGlobalData.null = state.globalData.null
    data.newGlobalData.arr = state.globalData.arr
    console.log('state.globalData.arr',state.globalData.arr)
    console.log('state.globalData.set',state.globalData.set)
    state.globalData.set.forEach((value : string) => {
      data.newGlobalData.set.push(value)
    })
    state.globalData.map.forEach((value : any, key : string) => {
      data.newGlobalData.map[key] = value
    })
    data.newGlobalData.fun = state.globalData.fun
    data.newGlobalDataFuncRes = data.newGlobalData.fun()
  }

  const _increaseLifeCycleNum = () => {
    const app = getApp()
    app.vm!.increaseLifeCycleNum()
    data.lifeCycleNum = state.lifeCycleNum
  }

  // 自动化测试
  const setLifeCycleNumFunc = (num : number) => {
    setLifeCycleNum(num)
  }

  // #ifndef MP
  const getAndroidApplication = () : boolean => {
    const app = getApp()
    data.androidApplication = app.getAndroidApplication()
    return data.androidApplication !== null
  }
  // #endif

  onReady(() => {
    data.lifeCycleNum = state.lifeCycleNum
  })

  defineExpose({
    data,
    getGlobalData,
    setGlobalData,
    _increaseLifeCycleNum,
    setLifeCycleNumFunc,
    // #ifndef MP
    getAndroidApplication
    // #endif
  })
</script>

<style>
  .bold {
    font-weight: bold;
  }

  .hr {
    border-bottom: 1px solid #ccc;
  }
</style>

```

:::

::: warning 注意
HBuilderX 4.31 `getApp()` 返回值调整为 `UniApp` 类型，调用 `App.uvue` 中定义的全局方法，需要由 `getApp().methodName()` 调整为 `getApp().vm?.methodName()`。
:::

## 全局样式

在`App.uvue`中，可以定义一些全局通用样式，这里定义的class，每个页面都可以直接使用。
