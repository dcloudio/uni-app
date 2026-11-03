::: sourceCode
## getApp() @getapp

> issues: https://issues.dcloud.net.cn/?mid=api.global.getApp

:::

`getApp()` 函数用于获取当前应用实例，可通过应用实例调用 App.uvue methods 中定义的方法, [详见](#appmethods)。

- HBuilderX 4.31 以前，`getApp()` 返回的是 Vue 实例，且无法在 uts 插件中使用。
- 从 HBuilderX 4.31+ 起，新增 `UniApp` 对象用于管理 app，`getApp()` 返回 `UniApp` 对象；Vue 实例则作为 `UniApp` 对象的 `vm` 属性提供。
- `getApp()` 只能在 `script` 中调用，不能直接在模板中使用。

`UniApp` 对象可同时在 uts 插件和 uvue 页面中使用，但 `vm` 属性及其相关的 `globalData` 仍然只能在 uvue 页面中使用。

### getApp 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=getApp&amp;sector=miniprogram"},{"title":"Android","group":"Android","subtitle":"uni-app x"},{"title":"Android(Vapor) UTS 插件","group":"Android","subtitle":"Vapor UTS 插件"},{"title":"iOS","group":"iOS","subtitle":"uni-app x"},{"title":"iOS(VDOM) UTS 插件","group":"iOS","subtitle":"VDOM UTS 插件"},{"title":"iOS(Vapor) UTS 插件","group":"iOS","subtitle":"Vapor UTS 插件"},{"title":"HarmonyOS"}],"rows":[["4.0","√","√","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","√","4.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />




### 返回值 

| 类型 |
| :- |
| [UniApp](#uniapp-values) |

#### UniApp 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| vm | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | Web: 4.31; 微信小程序: x; Android: 4.31; Android(Vapor) UTS 插件: x; iOS: 4.31; iOS UTS 插件: x; HarmonyOS: 4.61 | App vue 实例对象 |
| globalData | Record\<K, T> | 是 | Web: 4.31; 微信小程序: x; Android: 4.31; Android(Vapor) UTS 插件: x; iOS: 4.31; iOS(Vapor) UTS 插件: x; HarmonyOS: 4.61 | 全局对象 |
| ~~$vm~~ | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | Web: 4.31; 微信小程序: x; Android: 4.31; Android(Vapor) UTS 插件: x; iOS: 4.31; iOS UTS 插件: x; HarmonyOS: 4.61 | App vue 实例对象  **已废弃，仅为了向下兼容保留** |
#### UniApp 的方法 @uniapp-values 

#### getAndroidApplication(): Application @getandroidapplication
getAndroidApplication
获取 Android 应用 Application 上下文
##### getAndroidApplication 兼容性 <Help /> 
Web: x; 微信小程序: x; Android(VDOM): 4.31; Android(Vapor): x; iOS: x; HarmonyOS: x



##### 返回值 

| 类型 |
| :- |
| Application |
 

#### getHarmonyAbility(): UIAbility @getharmonyability
getHarmonyAbility
获取 鸿蒙应用 Ability 实例
##### getHarmonyAbility 兼容性 <Help /> 
Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): x



##### 返回值 

| 类型 |
| :- |
| UIAbility |
 

#### restart(options?: UniAppRestartOptions): void @restart
restart
重启应用
##### restart 兼容性 <Help /> 
Web: x; 微信小程序: x; Android(VDOM): x; Android(Vapor): 5.31; iOS(VDOM): x; iOS(Vapor): 5.31; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **UniAppRestartOptions** | 否 | Web: x; 微信小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| url | string | 否 | Web: x; 微信小程序: x; HarmonyOS: x | 重启直达页面路径。路径后可以带参数，参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔，如 'path?key=value&key2=value2' | 


 


restart，并非真正的应用整体重启，而是前端wgt应用重启。js引擎会重新初始化，onLaunch会重新触发。但开发者需注意原生插件中重复初始化问题，插件作者应该做好防护。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-app/get-app.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-app/get-app.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-app/get-app

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-app/get-app

>示例
```vue
<template>
  <view style="padding-bottom: 20px">
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
      <!-- #ifdef APP-ANDROID && !VUE3-VAPOR -->
      <button class="uni-common-mt" @click="getAndroidApplication">
        getAndroidApplication
      </button>
      <text class="uni-common-mt">androidApplication is null: {{ data.androidApplication == null }}</text>
      <!-- #endif -->
      <!-- #ifdef (APP-ANDROID || APP-IOS) && VUE3-VAPOR -->
      <button class="uni-common-mt" @click="_restart">
        restart
      </button>
      <button class="uni-common-mt" @click="_restartToUrl">
        restart to url
      </button>
      <!-- #endif -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import { state, setLifeCycleNum, updateGlobalData } from '@/store/index.ts'

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

  const data = reactive<DataType>({
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
  })

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

  // #ifdef (APP-ANDROID || APP-IOS) && VUE3-VAPOR
  const _restart = () => {
    setTimeout(() => {
      const app = getApp()
      app.restart()
    }, 100)
  }

  const _restartToUrl = () => {
    setTimeout(() => {
      const app = getApp()
      app.restart({
        url: '/pages/API/get-app/get-app-restart?from=restart'
      })
    }, 100)
  }
  // #endif

  // #ifdef APP-ANDROID && !VUE3-VAPOR
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
    // #ifdef APP-ANDROID && !VUE3-VAPOR
    getAndroidApplication,
    // #endif
    // #ifdef (APP-ANDROID || APP-IOS) && VUE3-VAPOR
    _restart,
    _restartToUrl
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

### 全局方法调用@appmethods
以上示例，getApp()后调用了app.uvue里定义的increasetLifeCycleNum方法。app.uvue的源码[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/App.uvue)

**调整** ：HBuilderX 4.31 `getApp()` 返回值调整为 `UniApp` 类型，调用 `App.uvue` 中定义的全局方法，需要由 `getApp().methodName()` 调整为 `getApp().vm?.methodName()`。



## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

