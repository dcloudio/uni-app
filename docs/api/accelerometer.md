## uni.onAccelerometerChange(callback) @onaccelerometerchange

监听加速度数据变化事件

### onAccelerometerChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (result: [OnAccelerometerChangeCallbackResult](#onaccelerometerchangecallbackresult-values)) => void | 是 | 加速度数据事件的监听函数 | 

### OnAccelerometerChangeCallbackResult 的属性值 @onaccelerometerchangecallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| x | number | 是 | X 轴加速度数据 |
| y | number | 是 | Y 轴加速度数据 |
| z | number | 是 | Z 轴加速度数据 |




<!-- UTSAPIJSON.onAccelerometerChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.onAccelerometerChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/accelerometer.html#onaccelerometerchange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.onAccelerometerChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onAccelerometerChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onAccelerometerChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onAccelerometerChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onAccelerometerChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onAccelerometerChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onAccelerometerChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意

<md-hperm :permissions="[{ name: 'ohos.permission.ACCELEROMETER', desc: '注册监听时如果当前未启动，会自动调用 startAccelerometer()，因此间接触发权限申请。' }]" />

## uni.offAccelerometerChange(callback) @offaccelerometerchange

监听加速度数据变化事件

### offAccelerometerChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (result: [OnAccelerometerChangeCallbackResult](#onaccelerometerchangecallbackresult-values)) => void | 否 | onAccelerometerChange 传入的监听函数。不传此参数则移除所有监听函数。 | 

### OnAccelerometerChangeCallbackResult 的属性值 @onaccelerometerchangecallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| x | number | 是 | X 轴加速度数据 |
| y | number | 是 | Y 轴加速度数据 |
| z | number | 是 | Z 轴加速度数据 |




<!-- UTSAPIJSON.offAccelerometerChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.offAccelerometerChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/accelerometer.html#offaccelerometerchange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.offAccelerometerChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offAccelerometerChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offAccelerometerChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offAccelerometerChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offAccelerometerChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offAccelerometerChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offAccelerometerChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.startAccelerometer(options) @startaccelerometer

开始监听加速度数据变化事件


### startAccelerometer 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **StartAccelerometerOptions** | 否 | 开始监听加速度数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| interval | string | 否 | 监听加速度数据回调函数的执行频率 |
| success | (res: [StartAccelerometerSuccess](#startaccelerometersuccess-values)) => void | 否 | 监听加速度数据调用成功的回调函数 |
| fail | (res: [StartAccelerometerFail](#startaccelerometerfail-values)) => void | 否 | 监听加速度数据调用失败的回调函数 |
| complete | (res: [StartAccelerometerSuccess](#startaccelerometersuccess-values) \| [StartAccelerometerFail](#startaccelerometerfail-values)) => void | 否 | 监听加速度数据调用结束的回调函数（调用成功、失败都会执行） | 

##### interval 的属性描述

| 合法值 | 描述 |
| :- | :- |
| 'game' | 适用于更新游戏的回调频率，约 20ms/次 左右 |
| ui | 适用于更新 UI 的回调频率，约 60ms/次 左右 |
| normal | 普通的回调频率，约 200ms/次 左右 |

#### StartAccelerometerSuccess 的属性值 @startaccelerometersuccess-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 否 |

#### StartAccelerometerFail 的属性值 @startaccelerometerfail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 |  |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

#### errCode 的属性描述

| 合法值 |
| :- |
| 601 |
| 602 |
| 603 |
| 604 |
| 701 |
| 702 |
| 703 |
| 801 |
| 802 |
| 803 |
| 804 |
| 501 |
| 502 |
| 503 |
| 901 |




<!-- UTSAPIJSON.startAccelerometer.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.startAccelerometer)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/accelerometer.html#startaccelerometer)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startAccelerometer&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startAccelerometer&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startAccelerometer&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startAccelerometer&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startAccelerometer)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startAccelerometer&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意

<md-hperm permissions="ohos.permission.ACCELEROMETER" />

## uni.stopAccelerometer(options) @stopaccelerometer

停止监听加速度数据变化事件


### stopAccelerometer 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **StopAccelerometerOptions** | 否 | 停止监听加速度数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| success | (res: [StopAccelerometerSuccess](#stopaccelerometersuccess-values)) => void | 否 | 停止监听加速度数据调用成功的回调函数 |
| fail | (res: [StopAccelerometerFail](#stopaccelerometerfail-values)) => void | 否 | 停止监听加速度数据调用失败的回调函数 |
| complete | (res: [StopAccelerometerSuccess](#stopaccelerometersuccess-values) \| [StopAccelerometerFail](#stopaccelerometerfail-values)) => void | 否 | 停止监听加速度数据调用结束的回调函数（调用成功、失败都会执行） | 

#### StopAccelerometerSuccess 的属性值 @stopaccelerometersuccess-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 否 |

#### StopAccelerometerFail 的属性值 @stopaccelerometerfail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 |  |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

#### errCode 的属性描述

| 合法值 |
| :- |
| 601 |
| 602 |
| 603 |
| 604 |
| 701 |
| 702 |
| 703 |
| 801 |
| 802 |
| 803 |
| 804 |
| 501 |
| 502 |
| 503 |
| 901 |




<!-- UTSAPIJSON.stopAccelerometer.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.stopAccelerometer)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/accelerometer.html#stopaccelerometer)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopAccelerometer&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopAccelerometer&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopAccelerometer&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopAccelerometer&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopAccelerometer)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopAccelerometer&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/accelerometer/accelerometer.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/accelerometer/accelerometer.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/accelerometer/accelerometer

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/accelerometer/accelerometer

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">加速度计</text>
		<text>开始监听后可实时查看设备在 X、Y、Z 轴上的加速度数据。</text>
		<text class="margin-v">当前状态：{{ statusText }}</text>

		<text class="uni-h3">采样频率</text>
		<radio-group class="option-group" @change="handleIntervalChange">
			<view class="option-item" v-for="item in intervalOptions" :key="item.value">
				<view class="option-content">
					<radio :value="item.value" :checked="activeInterval == item.value" />
					<text class="option-text">{{ item.label }}</text>
				</view>
			</view>
		</radio-group>
		<button class="margin-v" type="primary" @tap="startListen">开始监听</button>
		<button class="margin-v" @tap="stopListen">停止监听</button>
		<button class="margin-v" @tap="navigateToShake">跳转摇一摇</button>

		<text class="uni-h3">实时数据</text>
		<view class="log-list">
			<text class="log-item" v-for="item in axisItems" :key="item.key">{{ item.key }}：{{ item.value }}</text>
		</view>

	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type PageAccelerometerInterval = 'game' | 'ui' | 'normal'

	type IntervalOption = {
		value : PageAccelerometerInterval
		label : string
	}

	type AxisItem = {
		key : string
		value : string
	}

	const intervalOptions : IntervalOption[] = [
		{ value: 'normal', label: 'normal' },
		{ value: 'ui', label: 'ui' },
		{ value: 'game', label: 'game' }
	]
	const activeInterval = ref<PageAccelerometerInterval>('normal')
	const statusText = ref('未启动')
	const axisX = ref('0.000')
	const axisY = ref('0.000')
	const axisZ = ref('0.000')
	const axisItems = computed((): AxisItem[] => {
		return [
			{ key: 'X', value: axisX.value },
			{ key: 'Y', value: axisY.value },
			{ key: 'Z', value: axisZ.value }
		]
	})

	function formatAxisValue(value : number) : string {
		return value.toFixed(3)
	}

	const accelerometerListener : OnAccelerometerChangeCallback = (result : OnAccelerometerChangeCallbackResult) => {
		axisX.value = formatAxisValue(result.x)
		axisY.value = formatAxisValue(result.y)
		axisZ.value = formatAxisValue(result.z)
	}

	function handleIntervalChange(event : UniRadioGroupChangeEvent) : void {
		activeInterval.value = event.detail.value as PageAccelerometerInterval
	}

	function startListen() : void {
		uni.onAccelerometerChange(accelerometerListener)
		uni.startAccelerometer({
			interval: activeInterval.value,
			success: () => {
				statusText.value = `监听中 (${activeInterval.value})`
			},
			fail: (error) => {
				statusText.value = error.errMsg != null ? error.errMsg : '启动失败'
				console.error('startAccelerometer:fail', error)
			}
		})
	}

	function stopListen() : void {
		uni.stopAccelerometer({
			success: () => {
				statusText.value = '已停止'
			}
		})
	}

	function navigateToShake() : void {
		uni.navigateTo({
			url: '/pages/API/accelerometer/shake'
		})
	}

	onUnload(() => {
		uni.offAccelerometerChange(accelerometerListener)
		uni.stopAccelerometer()
	})
</script>

<style>
	.margin-v {
		margin: 5px 0;
	}

	.option-group {
		margin: 5px 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.option-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 18px;
		margin-top: 8px;
	}

	.option-content {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.option-text {
		font-size: 14px;
	}

	.log-list {
		margin: 5px 0;
		padding: 10px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
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


### tips
- 5.08版本，app和微信小程序平台有个差异，app 平台调用 `uni.onAccelerometerChange` 时不会自动启动加速器，需要调用 `uni.startAccelerometer()` 才能正常启动加速器。`5.09+` 版本app 平台拉齐了和微信小程序的表现。