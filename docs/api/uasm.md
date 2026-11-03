::: sourceCode
## uni.loadUasm(module) @loaduasm

> issues: https://issues.dcloud.net.cn/?mid=api.uasm.loadUasm


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-uasm

:::

异步加载 UASM 模块

module 必须是编译时可确定的 uni_modules 插件路径，模块类型由编译器推导。


### loadUasm 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=loadUasm&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=loadUasm&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android(VDOM)","group":"Android","subtitle":"VDOM"},{"title":"Android(Vapor)","group":"Android","subtitle":"Vapor"},{"title":"iOS(VDOM)","group":"iOS","subtitle":"VDOM"},{"title":"iOS(Vapor)","group":"iOS","subtitle":"Vapor"},{"title":"HarmonyOS(VDOM)","group":"HarmonyOS","subtitle":"VDOM"},{"title":"HarmonyOS(Vapor)","group":"HarmonyOS","subtitle":"Vapor"}],"rows":[["5.31","5.31","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| module | string | 是 | UASM 插件路径 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| Promise\<any> | UASM 模块实例 |
 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/load-uasm/load-uasm.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/load-uasm/load-uasm.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/load-uasm/load-uasm

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/load-uasm/load-uasm

>示例
```vue
<template>
  <view class="page">
    <text class="title">Uasm 性能测试</text>

    <text class="text">uni.loadUasmSync：在 onReady 时同步加载 uasm 模块 uni_modules/test-uasm，加载完成后自动校验 add(1, 2) === 3、concat('uni', '-app') === 'uni-app'。</text>

    <button class="btn" @click="test_number">number(a + b) * 100</button>
    <text class="text">循环 100 次调用 2个数字相加(1, 2)，并显示总耗时。</text>
    <view class="line"></view>

    <button class="btn" @click="test_string">string(a + b) * 100</button>
    <text class="text">循环 100 次调用 2个字符串拼接('uni', '-app')，并显示总耗时。</text>

    <view class="line"></view>

    <text class="result">{{ result }}</text>

    <text class="error-message">{{ errorMessage }}</text>
  </view>
</template>

<script setup lang="ts">
  const result = ref("")
  const errorMessage = ref("")

  let libtestuasm = null

  function ensureLibLoaded() : boolean {
    if (libtestuasm == null) {
      errorMessage.value = "请先加载 libtestuasm"
      return false
    }
    return true
  }

  function resetError() {
    errorMessage.value = ""
  }

  function displayError(err : any | null) {
    if (err == null) {
      errorMessage.value = "未知错误"
      return
    }
    if (err.code) {
      errorMessage.value = err.code + " :\n" + err.message
    } else {
      errorMessage.value = err.message
    }
  }

  // One million calls gives a stable aggregate duration without making the test slow.
  const BENCHMARK_CALLS = 100;

  function benchmark(name, callback) {
    // 累积结果
    let sink = 0
    const start = Date.now()
    for (let i = 0; i < BENCHMARK_CALLS; i++) sink += callback(i)
    const elapsedMilliseconds = Date.now() - start

    result.value = `${name}: ${BENCHMARK_CALLS.toLocaleString()} calls in ` + `${elapsedMilliseconds.toFixed(2)} ms `
  }

  // number
  function test_number() {
    if (!ensureLibLoaded()) {
      return
    }

    resetError()

    try {
      benchmark('add', () => libtestuasm.add(1, 2))
    } catch (e) {
      displayError(e)
    }
  }

  // string
  function test_string() {
    if (!ensureLibLoaded()) {
      return
    }

    resetError()

    try {
      benchmark('concat', () => libtestuasm.concat('uni', '-app').length)
    } catch (e) {
      displayError(e)
    }
  }

  function assert_equal(a, b) {
    if (a != b) {
      errorMessage.value = `libtestuasm error: a=${a}, b=${b}`
    }
  }

  async function load_uasm() {
    resetError()
    try {
      libtestuasm = await uni.loadUasm("uni_modules/test-uasm")
      // 前置检查
      // #ifdef MP-ALIPAY
      assert_equal(await libtestuasm.add(1, 2), 3)
      assert_equal(await libtestuasm.concat('uni', '-app'), 'uni-app')
      // #endif
      // #ifndef MP-ALIPAY
      assert_equal(libtestuasm.add(1, 2), 3)
      assert_equal(libtestuasm.concat('uni', '-app'), 'uni-app')
      // #endif
    } catch (e) {
      displayError(e)
    }
  }

  onReady(() => {
    load_uasm()
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .text {
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 6px;
  }

  .btn {
    flex: 1;
    margin-top: 15px;
  }

  .line {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 1px;
    background-color: #ccc;
  }

  .error-message {
    color: red;
    margin-top: 20px;
  }
</style>

```

:::



### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/load-uasm/load-uasm.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/load-uasm/load-uasm.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/load-uasm/load-uasm

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/load-uasm/load-uasm

>示例
```vue
<template>
  <view class="page">
    <text class="title">Uasm 性能测试</text>

    <text class="text">uni.loadUasmSync：在 onReady 时同步加载 uasm 模块 uni_modules/test-uasm，加载完成后自动校验 add(1, 2) === 3、concat('uni', '-app') === 'uni-app'。</text>

    <button class="btn" @click="test_number">number(a + b) * 100</button>
    <text class="text">循环 100 次调用 2个数字相加(1, 2)，并显示总耗时。</text>
    <view class="line"></view>

    <button class="btn" @click="test_string">string(a + b) * 100</button>
    <text class="text">循环 100 次调用 2个字符串拼接('uni', '-app')，并显示总耗时。</text>

    <view class="line"></view>

    <text class="result">{{ result }}</text>

    <text class="error-message">{{ errorMessage }}</text>
  </view>
</template>

<script setup lang="ts">
  const result = ref("")
  const errorMessage = ref("")

  let libtestuasm = null

  function ensureLibLoaded() : boolean {
    if (libtestuasm == null) {
      errorMessage.value = "请先加载 libtestuasm"
      return false
    }
    return true
  }

  function resetError() {
    errorMessage.value = ""
  }

  function displayError(err : any | null) {
    if (err == null) {
      errorMessage.value = "未知错误"
      return
    }
    if (err.code) {
      errorMessage.value = err.code + " :\n" + err.message
    } else {
      errorMessage.value = err.message
    }
  }

  // One million calls gives a stable aggregate duration without making the test slow.
  const BENCHMARK_CALLS = 100;

  function benchmark(name, callback) {
    // 累积结果
    let sink = 0
    const start = Date.now()
    for (let i = 0; i < BENCHMARK_CALLS; i++) sink += callback(i)
    const elapsedMilliseconds = Date.now() - start

    result.value = `${name}: ${BENCHMARK_CALLS.toLocaleString()} calls in ` + `${elapsedMilliseconds.toFixed(2)} ms `
  }

  // number
  function test_number() {
    if (!ensureLibLoaded()) {
      return
    }

    resetError()

    try {
      benchmark('add', () => libtestuasm.add(1, 2))
    } catch (e) {
      displayError(e)
    }
  }

  // string
  function test_string() {
    if (!ensureLibLoaded()) {
      return
    }

    resetError()

    try {
      benchmark('concat', () => libtestuasm.concat('uni', '-app').length)
    } catch (e) {
      displayError(e)
    }
  }

  function assert_equal(a, b) {
    if (a != b) {
      errorMessage.value = `libtestuasm error: a=${a}, b=${b}`
    }
  }

  async function load_uasm() {
    resetError()
    try {
      libtestuasm = await uni.loadUasm("uni_modules/test-uasm")
      // 前置检查
      // #ifdef MP-ALIPAY
      assert_equal(await libtestuasm.add(1, 2), 3)
      assert_equal(await libtestuasm.concat('uni', '-app'), 'uni-app')
      // #endif
      // #ifndef MP-ALIPAY
      assert_equal(libtestuasm.add(1, 2), 3)
      assert_equal(libtestuasm.concat('uni', '-app'), 'uni-app')
      // #endif
    } catch (e) {
      displayError(e)
    }
  }

  onReady(() => {
    load_uasm()
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .text {
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 6px;
  }

  .btn {
    flex: 1;
    margin-top: 15px;
  }

  .line {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 1px;
    background-color: #ccc;
  }

  .error-message {
    color: red;
    margin-top: 20px;
  }
</style>

```

:::


::: sourceCode
## uni.loadUasmSync(module) @loaduasmsync

> issues: https://issues.dcloud.net.cn/?mid=api.uasm.loadUasmSync


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-uasm

:::

同步加载 UASM 模块

module 必须是编译时可确定的 uni_modules 插件路径，模块类型由编译器推导。


### loadUasmSync 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=loadUasmSync&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=loadUasmSync&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android(VDOM)","group":"Android","subtitle":"VDOM"},{"title":"Android(Vapor)","group":"Android","subtitle":"Vapor"},{"title":"iOS(VDOM)","group":"iOS","subtitle":"VDOM"},{"title":"iOS(Vapor)","group":"iOS","subtitle":"Vapor"},{"title":"HarmonyOS(VDOM)","group":"HarmonyOS","subtitle":"VDOM"},{"title":"HarmonyOS(Vapor)","group":"HarmonyOS","subtitle":"Vapor"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.31"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| module | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | UASM 插件路径 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| any | UASM 模块实例 | 否 |
 


<!-- UTSAPIJSON.loadUasmSync.example -->



<!-- UTSAPIJSON.loadUasmSync.example -->

<!-- UTSAPIJSON.uasm.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

