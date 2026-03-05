<!-- ## uni.$on(eventName, callback) @$on -->

::: sourceCode
## uni.$on(eventName, callback) @$on

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-event


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-event

:::

监听自定义事件。事件可以由 uni.$emit 触发。回调函数会接收 uni.$emit 传递的参数。
4.31+ 开始支持返回事件监听器 id, 用于 off 事件监听器。


### $on 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| eventName | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件名称 |
| callback | () => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件回调 | 


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.$on.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.eventBus.$on)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/window/communication.html#on)

<!-- ## uni.$off(eventName, callback) @$off -->

::: sourceCode
## uni.$off(eventName, callback?) @$off

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-event


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-event

:::

移除自定义事件监听器。如果提供了事件名和回调，则只移除这个回调的监听器。
4.13+ 开始支持第二个参数为可选，如果仅提供事件名，则移除该事件的所有监听器。
4.31+ 开始第二个参数的类型由 `Function | null` 调整为 `any | null`, 支持传入 `uni.$on`、`uni.$once` 返回的事件监听器 id, 移除指定事件监听器。

### $off 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| eventName | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件名称 |
| callback | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要移除的事件回调或事件监听器 id | 




<!-- UTSAPIJSON.$off.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.eventBus.$off)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/window/communication.html#off)

<!-- ## uni.$once(eventName, callback) @$once -->

::: sourceCode
## uni.$once(eventName, callback) @$once

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-event


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-event

:::

监听一个自定义事件。事件只触发一次，在第一次触发之后移除事件监听器。
4.31+ 开始支持返回事件监听器 id, 用于 off 事件监听器。


### $once 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| eventName | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件名称 |
| callback | () => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件回调 | 


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.$once.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.eventBus.$once)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/window/communication.html#once)

<!-- ## uni.$emit(eventName, args?) @$emit -->

::: sourceCode
## uni.$emit(eventName, args?) @$emit

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-event


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-event

:::

触发自定义事件，附加的参数会传递给事件监听器。
在iOS平台UTS环境下或者UTS和JS通信时参数仅支持基础类型、string、Array、UTSJSONObject,其中Array，UTSJSONObject也仅支持包含上述类型,on和emit类型需匹配否则会产生异常

### $emit 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| eventName | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 事件名称 |
| args | Array&lt;any&gt; | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 触发事件时传递的参数 | 



:::warning
参数 `args` 为对象字面量时，4.25 前需要通过 `as` 明确类型，例如：
```js
uni.$emit('fn', {"a": 1} as UTSJSONObject)
```
4.25+ 编译器会自动将对象字面量推断为 `UTSJSONObject` 类型，不再需要通过 `as` 明确类型。如果需要传递其他自定义类型的对象字面量，仍需要通过 `as` 明确类型。
:::



<!-- UTSAPIJSON.$emit.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.eventBus.$emit)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/window/communication.html#emit)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/event-bus/event-bus.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/event-bus/event-bus.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/event-bus/event-bus

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/event-bus/event-bus

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
    <!-- #endif -->
    <view class="box">
      <button class="uni-btn" @click="on">开始监听</button>
      <button class="uni-btn" @click="once">监听一次</button>
      <button class="uni-btn" @click="off">取消监听</button>
      <!-- <button @click="offAll">取消全部监听</button> -->
      <button class="uni-btn" @click="emit">触发监听</button>
      <button class="uni-btn" @click="clear">清空消息</button>
      <view>
        <view class="uni-btn">收到的消息：</view>
        <view class="uni-btn">
          <view v-for="(item, index) in data.log" :key="index">{{ item }}</view>
        </view>
        <button class="uni-btn" @click="onObj">开始监听 obj 参数</button>
        <button class="uni-btn" @click="emitWithObj">触发监听 obj 参数</button>
        <view class='uni-btn'>
          <text>接收到的 obj 参数：</text>
          <text>{{ JSON.stringify(data.objArg) }}</text>
        </view>
        <button class='uni-btn' @click="testReturnId">测试返回 id</button>
        <button class='uni-btn' @click="testEmitNoArgs">测试 $emit 无参</button>
        <button class='uni-btn' @click="testEmitMultipleArgs">测试 $emit 多个参数</button>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type DataType = {
    log: string[];
    objArg: UTSJSONObject;
  }

  const data = reactive({
    log: [],
    objArg: {},
  } as DataType)

  const fn = (res : string) => {
    data.log.push(res)
  }
  
  const fn2 = (res : string) => {
    data.log.push(res)
  }
  
  const on = () => {
    uni.$on('test', fn)
  }
  
  const on2 = () => {
    uni.$on('test', fn2)
  }
  
  const onObj = () => {
    uni.$on('test-obj', (res : UTSJSONObject) => {
      data.objArg = res
    })
  }
  
  const once = () => {
    uni.$once('test', fn)
  }
  
  const off = () => {
    uni.$off('test', fn)
  }
  
  const offAll = () => {
    uni.$off('test')
  }
  
  const emit = () => {
    uni.$emit('test', 'msg:' + Date.now())
  }
  
  const emitWithObj = () => {
    uni.$emit('test-obj', { a: 1, b: 2 })
  }
  
  const clear = () => {
    data.log.length = 0
  }
  
  const testReturnId = () => {
    const id1 = uni.$on('test-return-id', fn)
    uni.$emit('test-return-id', '触发 test-return-id $on fn')
    uni.$off('test-return-id', id1)
    uni.$emit('test-return-id', '触发 test-return-id $on fn')

    uni.$once('test-return-id', fn)
    uni.$emit('test-return-id', '触发 test-return-id $once fn')
    uni.$emit('test-return-id', '触发 test-return-id $once fn')
    const id2 = uni.$once('test-id', fn)
    uni.$off('test-return-id', id2)
    uni.$emit('test-return-id', '触发 test-return-id $once fn')
  }
  
  const testEmitNoArgs = () => {
    uni.$on('test-emit-no-args', () => {
      data.log.push('test-emit-no-args')
    })
    uni.$emit('test-emit-no-args')
    uni.$off('test-emit-no-args')
  }
  
  const testEmitMultipleArgs = () => {
    uni.$on('test-emit-multiple-args', (arg1 : string, arg2 : number) => {
      data.log.push(`${arg1}_${arg2}`)
    })
    uni.$emit('test-emit-multiple-args', 'arg1', 2)
    uni.$off('test-emit-multiple-args')
  }
  
  defineExpose({
    data,
    on,
    on2,
    onObj,
    once,
    off,
    offAll,
    emit,
    emitWithObj,
    clear,
    testReturnId,
    testEmitNoArgs,
    testEmitMultipleArgs
  })
</script>

<style>
.box {
  padding: 10px;
}
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Tips
* - `eventName` 应避免使用 `uni` 开头，以免与 uni-app x 内置事件冲突
