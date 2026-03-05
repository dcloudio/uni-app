# 全局 API

## 应用实例 @app-instance

### 兼容性 @compatibility

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| createApp() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| createSSRApp() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.mount() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.unmount() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.component() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.directive() | - | - | - | - | - |
| app.use() | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| app.mixin() | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| app.provide() | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| app.runWithContext() | - | - | - | - | - |
| app.version | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.config | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| app.config.errorHandler | 4.0 | 4.41 | x | 4.11 | 4.61 |
| app.config.warnHandler | - | - | - | - | - |
| app.config.performance | - | - | - | - | - |
| app.config.compilerOptions | - | - | - | - | - |
| app.config.globalProperties | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| app.config.optionMergeStrategies | - | - | - | - | - |
| globalData | 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |
| onLaunch() | 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |
| onShow() | 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |
| onHide() | 4.0 | 4.41 | 3.9 | 4.0 | 4.61 |
| onLastPageBackPress() | x | x | 3.9 | x | 4.71 |
| onExit() | x | x | 3.9 | x | 4.72 |
| onError() | 4.0 | 4.41 | 4.21 | 4.21 | 4.61 |
| onPageNotFound() | 4.0 | 4.41 | x | x | x |
| onUniNViewMessage() | - | - | - | - | - |
| onThemeChange() | x | 4.41 | x | x | x |

### app.component

如果同时传递一个组件名字符串及其定义，则注册一个全局组件；如果只传递一个名字，则会返回用该名字注册的组件 (如果存在的话)。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/app-instance/component/component.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/app-instance/component/component

> 注册全局组件

```ts
import App from './App.uvue'
import CompForAppComponent from '@/components/CompForAppComponent.uvue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('CompForAppComponent', CompForAppComponent)
}
```

> 使用全局组件

```vue
<template>
  <view class="page">
    <CompForAppComponent class="component-for-app-component" />
  </view>
</template>

```

:::

### app.use

`app.use` 支持通过对象字面量、函数及 `definePlugin` 方式定义插件。

支持传递插件参数，当传递插件参数时，`app` 的类型需要指定为 `VueApp`。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/app-instance/use/use-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/app-instance/use/use-options

> 组合式 API
```vue
<template>
  <view class="page">
    <CompForAppUse class="component-for-app-use" />
  </view>
</template>

<script setup lang="uts">
import CompForAppUse from '@/components/CompForAppUse.uvue'
</script>

```

> 选项式 API
```vue
<template>
  <view class="page">
    <CompForAppUse class="component-for-app-use" />
  </view>
</template>

<script lang="uts">
import CompForAppUse from '@/components/CompForAppUse.uvue'

export default {
  components: {
    CompForAppUse
  }
}
</script>

```
:::

### app.mixin

`app.mixin` 在 app-android 平台，不支持运行时动态判断条件来调用`app.mixin`方法，比如不支持把`app.mixin`放到`if`条件中执行。

### app.config.globalProperties

请注意，`globalProperties` 是一个保留关键字，因此在项目中请勿声明名为 `globalProperties` 的变量。

在向 `globalProperties` 注册方法时，请使用直接函数表达式方式进行赋值。不支持先声明函数，再将其注册到 `globalProperties` 上的方式。同时，注册的函数一旦被赋值，不允许进行修改。

`globalProperties` 在编译时处理，因此确保你的操作在编译时是可知的。例如，将变量赋值给 `globalProperties` 时，这个变量在编译时必须是已知的，而不能是在运行时才能确定的变量。
当传递插件参数时，`app` 的类型需要指定为 `VueApp`。

注意：app-android 平台给 `globalProperties` 赋值变量时，该变量需要定义在顶层，不支持使用局部变量赋值
```ts
const data = {}
export function createApp() {
  const app = createSSRApp(App)
  // const data = {} // 不正确，应该定义在顶层
  app.config.globalProperties.mydata = data
  return {
    app
  }
}
```

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/app-instance/globalProperties/globalProperties-options.uvue)

[设置 app.config.globalProperties](https://gitcode.com/dcloud/hello-uvue/blob/alpha/main.uts)

::: preview https://hellouvue.dcloud.net.cn/#/pages/app-instance/globalProperties/globalProperties-options

> 组合式 API
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
    <!-- #endif -->
    <view class="uni-padding-wrap">
      <text class="mt-10"
        >globalProperties string: {{ globalPropertiesStr }}</text
      >
      <text class="mt-10"
        >globalProperties number: {{ globalPropertiesNum }}</text
      >
      <text class="mt-10"
        >globalProperties boolean: {{ globalPropertiesBool }}</text
      >
      <text class="mt-10"
        >globalProperties object: {{ globalPropertiesObj }}</text
      >
      <text class="mt-10"
        >globalProperties null: {{ globalPropertiesNull }}</text
      >
      <text class="mt-10"
        >globalProperties array: {{ globalPropertiesArr }}</text
      >
      <text class="mt-10"
        >globalProperties set: {{ globalPropertiesSet }}</text
      >
      <text class="mt-10"
        >globalProperties map: {{ globalPropertiesMap }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.str:
        {{ globalPropertiesReactiveObj['str'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.num:
        {{ globalPropertiesReactiveObj['num'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.boolean:
        {{ globalPropertiesReactiveObj['bool'] }}</text
      >
      <text class="mt-10"
        >globalProperties fun 返回值: {{ globalPropertiesFn() }}</text
      >
      <button @click="updateGlobalProperties" class="mt-10">
        update globalProperties
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
type MyGlobalProperties = {
	str : string;
	num : number;
	bool : boolean;
	obj : UTSJSONObject;
	null : string | null;
	arr : number[];
	set : string[];
	map : UTSJSONObject;
	reactiveObj : UTSJSONObject;
  globalPropertiesFnRes: string;
}

const myGlobalProperties = reactive<MyGlobalProperties>({
	str: '',
	num: 0,
	bool: false,
	obj: {},
	null: null,
	arr: [] as number[],
	set: [] as string[],
	map: {},
	reactiveObj: {
		str: '',
		num: 0,
		bool: false,
	},
  globalPropertiesFnRes: '',
} as MyGlobalProperties)

const instance = getCurrentInstance()!.proxy!
const getGlobalProperties = () => {
	myGlobalProperties.str = instance.globalPropertiesStr
	myGlobalProperties.num = instance.globalPropertiesNum
	myGlobalProperties.bool = instance.globalPropertiesBool
	myGlobalProperties.obj = instance.globalPropertiesObj
	myGlobalProperties.null = instance.globalPropertiesNull
	myGlobalProperties.arr = instance.globalPropertiesArr
	myGlobalProperties.set = []
	instance.globalPropertiesSet.forEach(item => {
		myGlobalProperties.set.push(item)
	})
	myGlobalProperties.map = {}
	instance.globalPropertiesMap.forEach((value: number, key: string) => {
		myGlobalProperties.map[key] = value
	})
	myGlobalProperties.reactiveObj = instance.globalPropertiesReactiveObj
	myGlobalProperties.globalPropertiesFnRes = instance.globalPropertiesFn()
}

setTimeout(() => {
  // 等待 globalProperties-options resetGlobalProperties 完成
	getGlobalProperties()
}, 1000)

const updateGlobalProperties = () => {
	instance.globalPropertiesStr = 'new string'
	instance.globalPropertiesNum = 100
	instance.globalPropertiesBool = true
	instance.globalPropertiesObj = {
		str: 'new globalProperties obj string',
		num: 100,
		bool: true,
	}
	instance.globalPropertiesNull = 'not null'
	instance.globalPropertiesArr = [1, 2, 3]
	instance.globalPropertiesSet = new Set(['a', 'b', 'c'])
	instance.globalPropertiesMap = new Map([['a', 1], ['b', 2], ['c', 3]])
	instance.globalPropertiesReactiveObj['str'] = 'new reactive string'
	instance.globalPropertiesReactiveObj['num'] = 200
	instance.globalPropertiesReactiveObj['bool'] = true
	getGlobalProperties()
}

defineExpose({
  myGlobalProperties,
  updateGlobalProperties
})
</script>

<style>
.uni-padding-wrap {
  padding: 10px 10px 40px 10px;
}
</style>

```

> 选项式 API
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
    <!-- #endif -->
    <view class="uni-padding-wrap">
      <text class="mt-10"
        >globalProperties string: {{ globalPropertiesStr }}</text
      >
      <text class="mt-10"
        >globalProperties number: {{ globalPropertiesNum }}</text
      >
      <text class="mt-10"
        >globalProperties boolean: {{ globalPropertiesBool }}</text
      >
      <text class="mt-10"
        >globalProperties object: {{ globalPropertiesObj }}</text
      >
      <text class="mt-10"
        >globalProperties null: {{ globalPropertiesNull }}</text
      >
      <text class="mt-10"
        >globalProperties array: {{ globalPropertiesArr }}</text
      >
      <text class="mt-10"
        >globalProperties set: {{ globalPropertiesSet }}</text
      >
      <text class="mt-10"
        >globalProperties map: {{ globalPropertiesMap }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.str:
        {{ globalPropertiesReactiveObj['str'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.num:
        {{ globalPropertiesReactiveObj['num'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.boolean:
        {{ globalPropertiesReactiveObj['bool'] }}</text
      >
      <text class="mt-10"
        >globalProperties fun 返回值: {{ globalPropertiesFn() }}</text
      >
      <button @click="updateGlobalProperties" class="mt-10">
        update globalProperties
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
type MyGlobalProperties = {
	str : string;
	num : number;
	bool : boolean;
	obj : UTSJSONObject;
	null : string | null;
	arr : number[];
	set : string[];
	map : UTSJSONObject;
	reactiveObj : UTSJSONObject;
	globalPropertiesFnRes: string
}
export default {
	data() {
		return {
			myGlobalProperties: {
				str: '',
				num: 0,
				bool: false,
				obj: {},
				null: null,
				arr: [],
				set: [],
				map: {},
				reactiveObj: {
					str: '',
					num: 0,
					bool: false,
				} as UTSJSONObject,
				globalPropertiesFnRes: '',
			} as MyGlobalProperties,
		}
	},
	onLoad() {
		this.getGlobalProperties()
	},
	onUnload(){
		this.resetGlobalProperties()
	},
	methods: {
		getGlobalProperties() {
			this.myGlobalProperties.str = this.globalPropertiesStr
			this.myGlobalProperties.num = this.globalPropertiesNum
			this.myGlobalProperties.bool = this.globalPropertiesBool
			this.myGlobalProperties.obj = this.globalPropertiesObj
			this.myGlobalProperties.null = this.globalPropertiesNull
			this.myGlobalProperties.arr = this.globalPropertiesArr
			this.myGlobalProperties.set = []
			this.globalPropertiesSet.forEach(item => {
				this.myGlobalProperties.set.push(item)
			})
			this.myGlobalProperties.map = {}
			this.globalPropertiesMap.forEach((value: number, key: string) => {
				this.myGlobalProperties.map[key] = value
			})
			this.myGlobalProperties.reactiveObj = this.globalPropertiesReactiveObj
			this.myGlobalProperties.globalPropertiesFnRes = this.globalPropertiesFn()
		},
		resetGlobalProperties() {
			this.globalPropertiesStr = 'default string'
			this.globalPropertiesNum = 0
			this.globalPropertiesBool = false
			this.globalPropertiesObj = {
				str: 'default globalProperties obj string',
				num: 0,
				bool: false,
			}
			this.globalPropertiesNull = null
			this.globalPropertiesArr = []
			this.globalPropertiesSet = new Set()
			this.globalPropertiesMap = new Map()
			this.globalPropertiesReactiveObj['str'] = 'default reactive string'
			this.globalPropertiesReactiveObj['num'] = 0
			this.globalPropertiesReactiveObj['bool'] = false
		},
		updateGlobalProperties() {
			this.globalPropertiesStr = 'new string'
			this.globalPropertiesNum = 100
			this.globalPropertiesBool = true
			this.globalPropertiesObj = {
				str: 'new globalProperties obj string',
				num: 100,
				bool: true,
			}
			this.globalPropertiesNull = 'not null'
			this.globalPropertiesArr = [1, 2, 3]
			this.globalPropertiesSet = new Set(['a', 'b', 'c'])
			this.globalPropertiesMap = new Map([['a', 1], ['b', 2], ['c', 3]])
			this.globalPropertiesReactiveObj['str'] = 'new reactive string'
			this.globalPropertiesReactiveObj['num'] = 200
			this.globalPropertiesReactiveObj['bool'] = true
			this.getGlobalProperties()
		}
	},
}
</script>

<style>
.uni-padding-wrap {
  padding: 10px 10px 40px 10px;
}
</style>

```
:::

## 应用生命周期 @app-lifecycle

uni-app x 新增了 [onLastPageBackPress](../collocation/App.md#applifecycle) 和 [onExit](../collocation/App.md#applifecycle) 应用级生命周期，Android退出应用逻辑写在app.uvue里，新建项目的模板自动包含相关代码。如需修改退出逻辑，请直接修改相关代码。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/App.uvue)

::: preview https://hellouvue.dcloud.net.cn/#

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
:::

## 通用 @general

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| version | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| nextTick() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| defineComponent() | 4.0 | 4.41 | x | x | x |
| defineAsyncComponent() | - | - | - | - | - |
| defineCustomElement() | - | - | - | - | - |



### nextTick 使用注意事项 @nexttick

目前 nextTick 可以保证当前数据已经同步到 DOM，但是由于排版和渲染是异步的的，所以 nextTick 不能保证 DOM 排版以及渲染完毕。如果需要获取排版后的节点信息推荐使用 [uni.createSelectorQuery](../api/nodes-info.md) 不推荐直接使用 [Element](../dom/unielement.md) 对象。在修改 DOM 后，立刻使用 [Element](../dom/unielement.md) 对象的同步接口获取 DOM 状态可能获取到的是排版之前的，而 [uni.createSelectorQuery](../api/nodes-info.md) 可以保障获取到的节点信息是排版之后的。
