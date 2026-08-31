## uni.onMemoryWarning(UTSCallback) @onmemorywarning

监听内存不足告警事件。当系统内存不足时，会触发该事件，开发者可以在回调函数中获取当前内存使用情况，并进行相应的处理。

### onMemoryWarning 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [MemoryWarningCallbackResult](#memorywarningcallbackresult-values)) => void | 是 | Web: x | 内存不足告警事件的监听函数 | 

### MemoryWarningCallbackResult 的属性值 @memorywarningcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| level | number | 否 | Web: x | 内存告警等级，只有 Android 才有，对应系统宏定义5(TRIM_MEMORY_RUNNING_MODERATE)、10(TRIM_MEMORY_RUNNING_LOW)、15(TRIM_MEMORY_RUNNING_CRITICAL)、20(TRIM_MEMORY_UI_HIDDEN)。 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.memory.onMemoryWarning)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/memory.html#onmemorywarning)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/memory/wx.onMemoryWarning.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onMemoryWarning&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onMemoryWarning&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onMemoryWarning&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onMemoryWarning&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onMemoryWarning)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onMemoryWarning&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offMemoryWarning(callback?) @offmemorywarning

取消监听内存不足告警事件。

### offMemoryWarning 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [MemoryWarningCallbackResult](#memorywarningcallbackresult-values)) => void | 否 | Web: x | onMemoryWarning 传入的监听函数。不传此参数则移除所有监听函数。 | 

### MemoryWarningCallbackResult 的属性值 @memorywarningcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| level | number | 否 | Web: x | 内存告警等级，只有 Android 才有，对应系统宏定义5(TRIM_MEMORY_RUNNING_MODERATE)、10(TRIM_MEMORY_RUNNING_LOW)、15(TRIM_MEMORY_RUNNING_CRITICAL)、20(TRIM_MEMORY_UI_HIDDEN)。 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.memory.offMemoryWarning)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/memory.html#offmemorywarning)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/memory/wx.offMemoryWarning.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offMemoryWarning&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offMemoryWarning&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offMemoryWarning&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offMemoryWarning&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offMemoryWarning)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offMemoryWarning&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/memory/memory.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/memory/memory.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/memory/memory
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h3">内存告警监听 uni.onMemoryWarning</text>
		<text class="margin-v notice">注意：内存不足时，系统可能直接结束应用或 activity，不一定会先触发本告警。</text>
		<text class="margin-v">当前状态：{{ state.status }}</text>
		<text class="margin-v">主动占用内存：{{ state.reservedMB }}MB</text>
		<button class="margin-v" @tap="startListen">开始监听</button>
		<button class="margin-v" @tap="stopListen">停止监听</button>
		<button class="margin-v" @tap="addMemoryPressure">增加 32MB 内存占用</button>
		<button class="margin-v" @tap="releaseMemory">释放已占用内存</button>

		<text class="uni-h4">最近事件：</text>
		<view class="log-list">
			<text class="log-item" v-for="(item, index) in state.records" :key="index">{{ item }}</text>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
  type PageState = {
    status: string
    records: string[]
    listening: boolean
    reservedMB: number
  }

  const state = reactive({
    status: '未开始监听',
    records: ['等待系统触发内存告警'],
    listening: false,
    reservedMB: 0
  } as PageState)

  let memoryWarningNativeCallback: OnMemoryWarningCallback | null = null
  let memoryPressureBuffers: ArrayBuffer[] = []

  const memoryBlockSizeMB = 32

  function appendRecord(message: string): void {
    state.records.unshift(message)
    if (state.records.length > 8) {
      state.records.splice(8)
    }
  }

  function formatLevel(level: number | null): string {
    if (level == null) {
      return '当前平台未返回等级'
    }
    if (level == 5) {
      return 'LOW(5)'
    }
    if (level == 10) {
      return 'MEDIUM(10)'
    }
    if (level == 15) {
      return 'CRITICAL(15)'
    }
    return 'LEVEL(' + level + ')'
  }

  function reserveMemoryChunk(sizeMB: number): void {
    const buffer = new ArrayBuffer(sizeMB * 1024 * 1024)
    const bytes = new Uint8Array(buffer)
    let index = 0
    while (index < bytes.length) {
      bytes[index] = 1
      index += 4096
    }
    memoryPressureBuffers.push(buffer)
    state.reservedMB += sizeMB
  }

  function startListen(): void {
    if (state.listening == true) {
      appendRecord('监听已开启，无需重复注册')
      return
    }
    const callback: OnMemoryWarningCallback = function (res: MemoryWarningCallbackResult): void {
      let levelText = '当前平台未返回等级'
      const level = res.level ?? null
      if (level != null) {
        levelText = formatLevel(level)
      }
      const message = '收到内存告警：' + levelText
      state.status = message
      appendRecord(message)
      console.log('onMemoryWarning', res)
    }
    memoryWarningNativeCallback = callback
    uni.onMemoryWarning(callback)
    state.listening = true
    state.status = '监听中，等待系统触发内存告警'
    appendRecord('已注册 uni.onMemoryWarning')
  }

  function stopListen(): void {
    if (memoryWarningNativeCallback == null) {
      uni.offMemoryWarning(null)
      state.listening = false
      state.status = '监听已停止'
      appendRecord('已清空所有监听器')
      return
    }
    const nativeCallback = memoryWarningNativeCallback!
    uni.offMemoryWarning(nativeCallback)
    memoryWarningNativeCallback = null
    state.listening = false
    state.status = '监听已停止'
    appendRecord('已移除当前页面监听器')
  }

  function addMemoryPressure(): void {
    try {
      reserveMemoryChunk(memoryBlockSizeMB)
      const message = '手动加压成功，当前约占用 ' + state.reservedMB + 'MB'
      state.status = message
      appendRecord('新增 32MB 内存占用')
    } catch (e) {
      const message = '加压失败，当前约占用 ' + state.reservedMB + 'MB'
      state.status = message
      appendRecord(message)
      console.error('addMemoryPressure', e)
    }
  }

  function releaseMemory(): void {
    memoryPressureBuffers = []
    state.reservedMB = 0
    state.status = '已释放示例页主动占用的内存'
    appendRecord(state.status)
  }

  onLoad(() => {
    memoryWarningNativeCallback = null
    memoryPressureBuffers = []
    state.listening = false
    state.reservedMB = 0
    state.status = '未开始监听'
  })

  onUnload(() => {
    if (memoryWarningNativeCallback != null) {
      const nativeCallback = memoryWarningNativeCallback!
      uni.offMemoryWarning(nativeCallback)
      memoryWarningNativeCallback = null
    }
    memoryPressureBuffers = []
    state.reservedMB = 0
  })

  defineExpose({
    state,
    startListen,
    stopListen,
    addMemoryPressure,
    releaseMemory
  })
</script>

<style>
.margin-v {
  margin: 5px 0;
}

.notice {
  color: #550000;
	font-size: 14px;
	font-style: italic;
}

.log-list {
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ccc;
}

.log-item {
  font-size: 14px;
  margin: 4px 0;
}
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

