## getApp() @getapp

`getApp()` 函数用于获取当前应用实例，可通过应用实例调用 App.uvue methods 中定义的方法, [详见](#appmethods)。

- HBuilderX 4.31以前，getApp返回的是vue实例。并且在uts插件中无法使用。
- HBuilderX 4.31+，新增了UniApp对象，用于管理app，getApp返回的是UniApp对象。而vue实例，则是UniApp对象的一个vm属性。

UniApp对象可以在uts插件和uvue页面中同时使用，但vm属性以及相关的globalData仍然只能在uvue页面中才能使用。

### getApp 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | √ | √ | √ | 4.31 | 4.61 |




### 返回值 

| 类型 |
| :- |
| [UniApp](#uniapp-values) |

#### UniApp 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| vm | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 | App vue 实例对象 |
| globalData | any | 是 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61 | 全局对象 |
| ~~$vm~~ | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 | App vue 实例对象  **已废弃，仅为了向下兼容保留** |
#### UniApp 的方法 @uniapp-values 

#### getAndroidApplication(): Application @getandroidapplication
getAndroidApplication
获取 Android 应用 Application 上下文
##### getAndroidApplication 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.31 | x | x |


##### 返回值 

| 类型 |
| :- |
| Application |
 

#### getHarmonyAbility(): UIAbility @getharmonyability
getHarmonyAbility
获取 鸿蒙应用 Ability 实例
##### getHarmonyAbility 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | x | x | 4.61 |


##### 返回值 

| 类型 |
| :- |
| UIAbility |
 
 


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

### 全局方法调用@appmethods
以上示例，getApp()后调用了app.uvue里定义的increasetLifeCycleNum方法。app.uvue的源码[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/App.uvue)

**调整** ：HBuilderX 4.31 `getApp()` 返回值调整为 `UniApp` 类型，调用 `App.uvue` 中定义的全局方法，需要由 `getApp().methodName()` 调整为 `getApp().vm?.methodName()`。


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.global.getApp)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/tutorial/page.html#getapp)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getApp&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getApp&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getApp&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getApp&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getApp&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getApp)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getApp&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

