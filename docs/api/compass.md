## uni.onCompassChange(callback) @oncompasschange

监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听

### onCompassChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | iOS(VDOM) UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [OnCompassChangeCallbackResult](#oncompasschangecallbackresult-values)) => void | 是 | 支付宝小程序: x | 罗盘数据变化事件的监听函数 | 

### OnCompassChangeCallbackResult 的属性值 @oncompasschangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| direction | number | 是 | 微信小程序: 4.41; 支付宝小程序: x | 面对的方向度数 |
| accuracy | number \| string | 否 | 微信小程序: 4.41; 支付宝小程序: x | 精度 |
| errMsg | string | 否 | 微信小程序: 4.41; 支付宝小程序: x | 错误信息 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.onCompassChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/compass.html#oncompasschange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.onCompassChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onCompassChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onCompassChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onCompassChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onCompassChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onCompassChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onCompassChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offCompassChange(callback) @offcompasschange

取消监听罗盘数据

### offCompassChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | iOS(VDOM) UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [OnCompassChangeCallbackResult](#oncompasschangecallbackresult-values)) => void | 否 | 支付宝小程序: x | onCompassChange 传入的监听函数。不传此参数则移除所有监听函数。 | 

### OnCompassChangeCallbackResult 的属性值 @oncompasschangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| direction | number | 是 | 微信小程序: 4.41; 支付宝小程序: x | 面对的方向度数 |
| accuracy | number \| string | 否 | 微信小程序: 4.41; 支付宝小程序: x | 精度 |
| errMsg | string | 否 | 微信小程序: 4.41; 支付宝小程序: x | 错误信息 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.offCompassChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/compass.html#offcompasschange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.offCompassChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offCompassChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offCompassChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offCompassChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offCompassChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offCompassChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offCompassChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.startCompass(options?) @startcompass

开始监听罗盘数据


### startCompass 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StartCompassOptions** | 否 | 支付宝小程序: x | 开始监听罗盘数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [StartCompassSuccess](#startcompasssuccess-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 开始监听罗盘数据调用成功的回调函数 |
| fail | (res: [StartCompassFail](#startcompassfail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 开始监听罗盘数据调用失败的回调函数 |
| complete | (res: [StartCompassSuccess](#startcompasssuccess-values) \| [StartCompassFail](#startcompassfail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 开始监听罗盘数据调用结束的回调函数（调用成功、失败都会执行） | 

#### StartCompassSuccess 的属性值 @startcompasssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | 支付宝小程序: x |

#### StartCompassFail 的属性值 @startcompassfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | 支付宝小程序: x |  |
| errSubject | string | 是 | 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 501 | 支付宝小程序: x |
| 502 | 支付宝小程序: x |
| 503 | 支付宝小程序: x |
| 504 | 支付宝小程序: x |
| 601 | 支付宝小程序: x |
| 602 | 支付宝小程序: x |
| 603 | 支付宝小程序: x |
| 604 | 支付宝小程序: x |
| 701 | 支付宝小程序: x |
| 702 | 支付宝小程序: x |
| 703 | 支付宝小程序: x |
| 704 | 支付宝小程序: x |
| 801 | 支付宝小程序: x |
| 802 | 支付宝小程序: x |
| 803 | 支付宝小程序: x |
| 804 | 支付宝小程序: x |
| 901 | 支付宝小程序: x |

#### StartCompassSuccess 的属性值 @startcompasssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | 支付宝小程序: x |

#### StartCompassFail 的属性值 @startcompassfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | 支付宝小程序: x |  |
| errSubject | string | 是 | 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 501 | 支付宝小程序: x |
| 502 | 支付宝小程序: x |
| 503 | 支付宝小程序: x |
| 504 | 支付宝小程序: x |
| 601 | 支付宝小程序: x |
| 602 | 支付宝小程序: x |
| 603 | 支付宝小程序: x |
| 604 | 支付宝小程序: x |
| 701 | 支付宝小程序: x |
| 702 | 支付宝小程序: x |
| 703 | 支付宝小程序: x |
| 704 | 支付宝小程序: x |
| 801 | 支付宝小程序: x |
| 802 | 支付宝小程序: x |
| 803 | 支付宝小程序: x |
| 804 | 支付宝小程序: x |
| 901 | 支付宝小程序: x |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.startCompass)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/compass.html#startcompass)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.startCompass.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startCompass&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startCompass&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startCompass&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startCompass&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startCompass)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startCompass&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.stopCompass(options?) @stopcompass

停止监听罗盘数据


### stopCompass 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StopCompassOptions** | 否 | 支付宝小程序: x | 停止监听罗盘数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [StopCompassSuccess](#stopcompasssuccess-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 停止监听罗盘数据调用成功的回调函数 |
| fail | (res: [StopCompassFail](#stopcompassfail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 停止监听罗盘数据调用失败的回调函数 |
| complete | (res: [StopCompassSuccess](#stopcompasssuccess-values) \| [StopCompassFail](#stopcompassfail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 停止监听罗盘数据调用结束的回调函数（调用成功、失败都会执行） | 

#### StopCompassSuccess 的属性值 @stopcompasssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | 支付宝小程序: x |

#### StopCompassFail 的属性值 @stopcompassfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | 支付宝小程序: x |  |
| errSubject | string | 是 | 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 501 | 支付宝小程序: x |
| 502 | 支付宝小程序: x |
| 503 | 支付宝小程序: x |
| 504 | 支付宝小程序: x |
| 601 | 支付宝小程序: x |
| 602 | 支付宝小程序: x |
| 603 | 支付宝小程序: x |
| 604 | 支付宝小程序: x |
| 701 | 支付宝小程序: x |
| 702 | 支付宝小程序: x |
| 703 | 支付宝小程序: x |
| 704 | 支付宝小程序: x |
| 801 | 支付宝小程序: x |
| 802 | 支付宝小程序: x |
| 803 | 支付宝小程序: x |
| 804 | 支付宝小程序: x |
| 901 | 支付宝小程序: x |

#### StopCompassSuccess 的属性值 @stopcompasssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | 支付宝小程序: x |

#### StopCompassFail 的属性值 @stopcompassfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | 支付宝小程序: x |  |
| errSubject | string | 是 | 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 501 | 支付宝小程序: x |
| 502 | 支付宝小程序: x |
| 503 | 支付宝小程序: x |
| 504 | 支付宝小程序: x |
| 601 | 支付宝小程序: x |
| 602 | 支付宝小程序: x |
| 603 | 支付宝小程序: x |
| 604 | 支付宝小程序: x |
| 701 | 支付宝小程序: x |
| 702 | 支付宝小程序: x |
| 703 | 支付宝小程序: x |
| 704 | 支付宝小程序: x |
| 801 | 支付宝小程序: x |
| 802 | 支付宝小程序: x |
| 803 | 支付宝小程序: x |
| 804 | 支付宝小程序: x |
| 901 | 支付宝小程序: x |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.stopCompass)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/compass.html#stopcompass)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.stopCompass.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopCompass&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopCompass&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopCompass&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopCompass&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopCompass)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopCompass&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/compass/compass.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/compass/compass.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/compass/compass

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/compass/compass

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">罗盘 API</text>
		<text class="notice">演示 `uni.startCompass`、`uni.stopCompass`、`uni.onCompassChange`、`uni.offCompassChange` 的完整流程。靠近强磁场或金属物体时数据可能抖动，可做“8”字校准。Web平台需使用https</text>
		<text class="margin-v">先绑定监听，再启动采集，更容易观察回调是否生效。</text>

		<text class="uni-h3">实时信息</text>
		<view class="panel-list">
			<text class="panel-item" v-for="item in infoItems" :key="item.label">{{ item.label }}：{{ item.value }}</text>
		</view>

		<text class="uni-h3">当前方位</text>
		<view class="compass-card">
			<view class="bg-compass-line"></view>
			<image class="bg-compass" src="/static/compass.png" :style="compassStyle" />
			<view class="direction-center">
				<text class="direction-value">{{ directionText }}</text>
				<text class="direction-degree">{{ degreeText }}</text>
			</view>
		</view>

		<view class="uni-row">
			<button id="btn-bind-primary-listener" class="margin-v" @tap="bindPrimaryListener">注册罗盘Change</button>
			<button id="btn-remove-primary-listener" class="margin-v" style="margin-left: 3px;" @tap="removePrimaryListener">注销罗盘Change</button>
		</view>
		<view class="uni-row">
			<button id="btn-start-compass" class="margin-v" type="primary" @tap="startCompassListen">uni.startCompass</button>
			<button id="btn-stop-compass" class="margin-v" style="margin-left: 3px;" @tap="stopCompassListen">uni.stopCompass</button>
		</view>
		<text>重复绑定测试</text>
		<view class="uni-row">
			<button id="btn-bind-secondary-listener" class="margin-v" @tap="bindSecondaryListener">注册罗盘Change2</button>
			<button id="btn-remove-secondary-listener" class="margin-v" style="margin-left: 3px;" @tap="removeSecondaryListener">注销罗盘Change2</button>
		</view>
		<text class="uni-h3">监听日志</text>
		<view class="panel-list">
			<text class="panel-item" v-for="item in logItems" :key="item.id">{{ item.text }}</text>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type DisplayItem = {
		label : string
		value : string
	}

	type PageCompassAccuracy = number | string | null

	type LogItem = {
		id : number
		text : string
	}

	const statusText = ref('未启动')
	const direction = ref(0)
	const directionText = ref('北')
	const accuracyText = ref('null')
	const primaryBound = ref(false)
	const secondaryBound = ref(false)
	const lastAction = ref('等待调用')
	const lastStatus = ref('未执行')
	const lastPayload = ref('请先绑定监听并开始采集')
	const logItems = ref<Array<LogItem>>([])
	const logId = ref(0)
	
	const infoItems = computed(() : Array<DisplayItem> => {
		return [
			{ label: '监听状态', value: statusText.value },
			{ label: '主监听', value: primaryBound.value ? '已绑定' : '未绑定' },
			{ label: '额外监听', value: secondaryBound.value ? '已绑定' : '未绑定' },
			{ label: 'accuracy', value: accuracyText.value },
			{ label: '最近动作', value: lastAction.value },
			{ label: '状态', value: lastStatus.value },
			{ label: '说明', value: lastPayload.value }
		]
	})

	function pushLog(line : string) : void {
		logId.value = logId.value + 1
		const item : LogItem = {
			id: logId.value,
			text: line
		}
		logItems.value.unshift(item)
		if (logItems.value.length > 10) {
			logItems.value.splice(10)
		}
	}

	function updateResult(action : string, status : string, payload : string) : void {
		lastAction.value = action
		lastStatus.value = status
		lastPayload.value = payload
		pushLog(`${action} -> ${status}`)
	}

	function formatDirection(value : number) : string {
		return value.toFixed(1)
	}

	function formatAccuracy(value : PageCompassAccuracy) : string {
		if (value == null) {
			return 'null'
		}
		if (typeof value == 'number') {
			return value.toFixed(2)
		}
		return value
	}

	function resolveDirectionText(value : number) : string {
		if (value >= 337.5 || value < 22.5) {
			return '北'
		}
		if (value < 67.5) {
			return '东北'
		}
		if (value < 112.5) {
			return '东'
		}
		if (value < 157.5) {
			return '东南'
		}
		if (value < 202.5) {
			return '南'
		}
		if (value < 247.5) {
			return '西南'
		}
		if (value < 292.5) {
			return '西'
		}
		return '西北'
	}

	const compassStyle = computed(() : string => {
		return `transform: rotate(${-direction.value}deg);`
	})

	const degreeText = computed(() : string => {
		return `${formatDirection(direction.value)}°`
	})

	const primaryListener : OnCompassChangeCallback = (result : OnCompassChangeCallbackResult) => {
		direction.value = result.direction
		directionText.value = resolveDirectionText(result.direction)
		accuracyText.value = formatAccuracy(result.accuracy != null ? result.accuracy : null)
		statusText.value = '监听中'
	}

	const secondaryListener : OnCompassChangeCallback = (result : OnCompassChangeCallbackResult) => {
		pushLog(`额外监听 -> ${formatDirection(result.direction)}° / accuracy ${formatAccuracy(result.accuracy != null ? result.accuracy : null)}`)
	}

	function ensurePrimaryBound() : void {
		if (!primaryBound.value) {
			uni.onCompassChange(primaryListener)
			primaryBound.value = true
		}
	}

	function bindPrimaryListener() : void {
		ensurePrimaryBound()
		updateResult('onCompassChange(primary)', '已绑定', '主监听已注册')
	}

	function bindSecondaryListener() : void {
		if (!secondaryBound.value) {
			uni.onCompassChange(secondaryListener)
			secondaryBound.value = true
		}
		updateResult('onCompassChange(extra)', '已绑定', '额外监听已注册')
	}

	function removePrimaryListener() : void {
		uni.offCompassChange(primaryListener)
		primaryBound.value = false
		updateResult('offCompassChange(primary)', '已解绑', '主监听已移除')
	}

	function removeSecondaryListener() : void {
		uni.offCompassChange(secondaryListener)
		secondaryBound.value = false
		updateResult('offCompassChange(extra)', '已解绑', '额外监听已移除')
	}

	function startCompassListen() : void {
		ensurePrimaryBound()
		uni.startCompass({
			success: (res) => {
				statusText.value = '监听中'
				const message = res.errMsg != null ? res.errMsg as string : 'startCompass:ok'
				updateResult('startCompass', '成功', message)
			},
			fail: (error) => {
				statusText.value = '启动失败'
				const message = error.errMsg != null ? error.errMsg : 'startCompass:fail'
				updateResult('startCompass', `失败 (${error.errCode})`, message)
			}
		})
	}

	function stopCompassListen() : void {
		uni.stopCompass({
			success: (res) => {
				statusText.value = '已停止'
				const message = res.errMsg != null ? res.errMsg as string : 'stopCompass:ok'
				updateResult('stopCompass', '成功', message)
			},
			fail: (error) => {
				const message = error.errMsg != null ? error.errMsg : 'stopCompass:fail'
				updateResult('stopCompass', `失败 (${error.errCode})`, message)
			}
		})
	}

	onUnload(() => {
		uni.offCompassChange(primaryListener)
		uni.offCompassChange(secondaryListener)
		uni.stopCompass()
	});
	
	defineExpose({
		startCompassListen
	})
</script>

<style>
	.margin-v {
		margin: 5px 0;
	}

	.notice {
		color: #6b2d16;
		font-size: 14px;
	}

	.panel-list {
		margin: 5px 0;
		padding: 10px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
	}

	.panel-item {
		font-size: 14px;
		margin: 4px 0;
	}

	.compass-card {
		position: relative;
		margin: 12px auto;
		width: 270px;
		height: 270px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.direction-center {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.direction-value {
		font-size: 30px;
	}

	.direction-degree {
		font-size: 16px;
		margin-top: 6px;
	}

	.bg-compass {
		position: absolute;
		top: 0;
		left: 0;
		width: 270px;
		height: 270px;
		transition-duration: 0.1s;
	}

	.bg-compass-line {
		position: absolute;
		left: 134px;
		top: -5px;
		width: 3px;
		height: 28px;
		background-color: #1aad19;
		border-radius: 100px;
		z-index: 1;
	}
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 错误信息 |
