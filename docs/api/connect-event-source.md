<!-- ## uni.connectEventSource(options) @connecteventsource -->

::: sourceCode
## uni.connectEventSource(options) @connecteventsource

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-sse


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-sse

:::

连接 SSE

SSE，全称是Server-sent Events，一种服务器基于http向客户端推送文本消息的技术。

提供本API（uni.connectEventSource）的主要目的是兼容Web的SSE规范。但如果开发者需要接收AI大语言模型的数据，实际上无法使用SSE。

因为SSE仅支持get，无法post数据。LLM是用户post一个prompt，然后流式获取结果。

所以LLM流式接收数据的场景，应该使用uni.request的Chunk，而不是使用本API（uni.connectEventSource）。[详见](request.md)

### connectEventSource 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.51 | 4.63 | 4.63 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


Web端暂未兼容uni.connectEventSource API，请使用标准的Web API。

小程序不支持SSE，替代方案也是使用uni.request的Chunk。


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ConnectEventSourceOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: x | 服务器地址 |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | - | Web: x; 微信小程序: -; Android: 4.61; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: x | 请求头 | 


### 返回值 

| 类型 |
| :- |
| [UniEventSource](#unieventsource-values) |

#### UniEventSource 的方法 @unieventsource-values 

#### onMessage(callback : ConnectEventSourceCallback) : void @onmessage
onMessage
message 事件，会在通过事件源收到数据时触发。
##### onMessage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.51 | 4.63 | 4.63 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (ev: [UniMessageEvent](#unimessageevent-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 事件回调 | 

##### UniMessageEvent 的属性值 @unimessageevent-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: x | 事件类型。 |
| data | any | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: x | 消息发射器发出的数据。 |
| lastEventId | string | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: x | 一个字符串，表示事件的唯一 ID。 |


#### onError(callback : ConnectEventSourceErrorCallback) : void @onerror
onError
onerror 是当发生错误且这个错误事件（error）被 UniEventSource 触发时调用的一个事件处理函数。
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.51 | 4.63 | 4.63 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (error: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 事件回调 | 


#### onOpen(callback : ConnectEventSourceCallback) : void @onopen
onOpen
一个事件处理器，它在收到 open 事件时被调用，在那时，连接刚被打开。
##### onOpen 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.51 | 4.63 | 4.63 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (ev: [UniMessageEvent](#unimessageevent-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 事件回调 | 


#### close() : void @close
close
关闭当前的连接
##### close 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.51 | 4.63 | 4.63 | x |


 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/connect-event-source/connect-event-source.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/connect-event-source/connect-event-source.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/connect-event-source/connect-event-source
```uvue
<template>

  <page-head :title="data.title"></page-head>
	<button class="button" type="primary" @click="connect">连接</button>
	<button class="button" type="primary" @click="close">关闭</button>

	<!-- #ifdef APP -->
	<scroll-view style="flex:1">
	<!-- #endif -->
		<view>
			<text style="width: 100%; text-align: center; margin-bottom: 5px;">
			  显示简易操作日志(可滚动查看)
			</text>
			<button size="mini" @click="data.logList = []">清空日志</button>
			<view style="margin-top: 10px;">
				<view v-for="(item, index) in data.logList" :key="index">
					<text style="margin-left: 20px; margin-right: 20px;">
						{{ item }}
					</text>
				</view>
			</view>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type DataType = {
		logList: string[];
		title: string;
		url: string;
		eventSource: UniEventSource | null;
		open: boolean;
		receiveMessage: boolean;
	}

	const data = reactive({
		logList: [] as string[],
		title: 'sse',
		url: 'https://request.dcloud.net.cn/api/sse/connect',
		eventSource: null,
		open: false,
		receiveMessage: false
	} as DataType)

	onUnmounted(() => {
		if (data.eventSource != null) {
			data.eventSource?.close()
		}
	})

	const connect = () => {
		console.log('connect start')
		uni.showLoading({
			title: "",
			mask: true
		})
		data.eventSource?.close()
		let headers : UTSJSONObject = new UTSJSONObject()
		headers.set("header1", "value1")
		headers.set("header2", "value3")
		data.eventSource = uni.connectEventSource({
			url: data.url,
			header: headers
		})
		data.eventSource?.onMessage((ev) => {
			const log = 'onMessage callback:' + '\n' + 'type: ' + ev.type + '\n' + 'data: ' + ev.data + '\n\n'
			data.logList.push(log)
			data.receiveMessage = true
			uni.hideLoading()
		})
		data.eventSource?.onOpen((ev) => {
			const log = 'onOpen callback: ' + ev.type + '\n\n'
			data.logList.push(log)
			data.open = true
		})
		data.eventSource?.onError((err) => {
			const log = `onError callback: ${err} \n\n`
			data.logList.push(log)
			uni.hideLoading()
		})
	}

	const close = () => {
		data.eventSource?.close()
		const log = 'connect close' + '\n\n'
		data.logList.push(log)
	}

	defineExpose({
    data,
		connect
	})
</script>

<style>
	.button {
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 15px;
	}
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.connectEventSource)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=connectEventSource&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=connectEventSource&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=connectEventSource&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=connectEventSource&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=connectEventSource&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=connectEventSource)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=connectEventSource&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/connect-event-source/connect-event-source.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/connect-event-source/connect-event-source.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/connect-event-source/connect-event-source
```uvue
<template>

  <page-head :title="data.title"></page-head>
	<button class="button" type="primary" @click="connect">连接</button>
	<button class="button" type="primary" @click="close">关闭</button>

	<!-- #ifdef APP -->
	<scroll-view style="flex:1">
	<!-- #endif -->
		<view>
			<text style="width: 100%; text-align: center; margin-bottom: 5px;">
			  显示简易操作日志(可滚动查看)
			</text>
			<button size="mini" @click="data.logList = []">清空日志</button>
			<view style="margin-top: 10px;">
				<view v-for="(item, index) in data.logList" :key="index">
					<text style="margin-left: 20px; margin-right: 20px;">
						{{ item }}
					</text>
				</view>
			</view>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type DataType = {
		logList: string[];
		title: string;
		url: string;
		eventSource: UniEventSource | null;
		open: boolean;
		receiveMessage: boolean;
	}

	const data = reactive({
		logList: [] as string[],
		title: 'sse',
		url: 'https://request.dcloud.net.cn/api/sse/connect',
		eventSource: null,
		open: false,
		receiveMessage: false
	} as DataType)

	onUnmounted(() => {
		if (data.eventSource != null) {
			data.eventSource?.close()
		}
	})

	const connect = () => {
		console.log('connect start')
		uni.showLoading({
			title: "",
			mask: true
		})
		data.eventSource?.close()
		let headers : UTSJSONObject = new UTSJSONObject()
		headers.set("header1", "value1")
		headers.set("header2", "value3")
		data.eventSource = uni.connectEventSource({
			url: data.url,
			header: headers
		})
		data.eventSource?.onMessage((ev) => {
			const log = 'onMessage callback:' + '\n' + 'type: ' + ev.type + '\n' + 'data: ' + ev.data + '\n\n'
			data.logList.push(log)
			data.receiveMessage = true
			uni.hideLoading()
		})
		data.eventSource?.onOpen((ev) => {
			const log = 'onOpen callback: ' + ev.type + '\n\n'
			data.logList.push(log)
			data.open = true
		})
		data.eventSource?.onError((err) => {
			const log = `onError callback: ${err} \n\n`
			data.logList.push(log)
			uni.hideLoading()
		})
	}

	const close = () => {
		data.eventSource?.close()
		const log = 'connect close' + '\n\n'
		data.logList.push(log)
	}

	defineExpose({
    data,
		connect
	})
</script>

<style>
	.button {
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 15px;
	}
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

