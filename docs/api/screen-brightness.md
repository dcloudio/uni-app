<!-- ## uni.getScreenBrightness(options) @getscreenbrightness -->

::: sourceCode
## uni.getScreenBrightness(options) @getscreenbrightness

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-screenBrightness


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-screenBrightness

:::

获取屏幕亮度。

### getScreenBrightness 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 4.81 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetScreenBrightnessOptions** | 是 | Web: x | 获取屏幕亮度的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [GetScreenBrightnessSuccess](#getscreenbrightnesssuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 成功返回的回调函数 |
| fail | (result: [GetScreenBrightnessFail](#getscreenbrightnessfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 失败的回调函数 |
| complete | (result: [GetScreenBrightnessSuccess](#getscreenbrightnesssuccess-values) \| [GetScreenBrightnessFail](#getscreenbrightnessfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 结束的回调函数（调用成功、失败都会执行） | 

#### GetScreenBrightnessSuccess 的属性值 @getscreenbrightnesssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| value | number | 是 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 屏幕亮度值，范围 0~1，0 最暗，1 最亮。 |

#### GetScreenBrightnessFail 的属性值 @getscreenbrightnessfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 统一错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |




<!-- UTSAPIJSON.getScreenBrightness.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.screenBrightness.getScreenBrightness)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/brightness.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.getScreenBrightness.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getScreenBrightness&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getScreenBrightness&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getScreenBrightness&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getScreenBrightness&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getScreenBrightness)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getScreenBrightness&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setScreenBrightness(options) @setscreenbrightness -->

::: sourceCode
## uni.setScreenBrightness(options) @setscreenbrightness

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-screenBrightness


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-screenBrightness

:::

设置屏幕亮度。

### setScreenBrightness 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 4.81 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **SetScreenBrightnessOptions** | 是 | Web: x | 设置屏幕亮度的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| value | number | 是 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 屏幕亮度值，范围 0~1，0 最暗，1 最亮 |
| success | (result: SetScreenBrightnessSuccess) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用成功的回调函数 |
| fail | (result: [SetScreenBrightnessFail](#setscreenbrightnessfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用失败的回调函数 |
| complete | (result: SetScreenBrightnessSuccess \| [SetScreenBrightnessFail](#setscreenbrightnessfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SetScreenBrightnessFail 的属性值 @setscreenbrightnessfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 统一错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |




<!-- UTSAPIJSON.setScreenBrightness.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.screenBrightness.setScreenBrightness)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/brightness.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.setScreenBrightness.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setScreenBrightness&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setScreenBrightness&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setScreenBrightness&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setScreenBrightness&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setScreenBrightness)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setScreenBrightness&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setKeepScreenOn(options) @setkeepscreenon -->

::: sourceCode
## uni.setKeepScreenOn(options) @setkeepscreenon

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-screenBrightness


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-screenBrightness

:::

设置是否保持常亮状态。仅在当前应用生效，离开应用后设置失效。

### setKeepScreenOn 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 4.41 | 5.08 | 5.08 | 4.81 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **SetKeepScreenOnOptions** | 是 | 设置是否保持常亮状态的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| keepScreenOn | boolean | 是 | Web: 5.08; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 是否保持屏幕常亮 |
| success | (result: [SetKeepScreenOnSuccess](#setkeepscreenonsuccess-values)) => void | 否 | Web: 5.08; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用成功的回调函数 |
| fail | (result: [SetKeepScreenOnFail](#setkeepscreenonfail-values)) => void | 否 | Web: 5.08; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用失败的回调函数 |
| complete | (result: [SetKeepScreenOnSuccess](#setkeepscreenonsuccess-values) \| [SetKeepScreenOnFail](#setkeepscreenonfail-values)) => void | 否 | Web: 5.08; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SetKeepScreenOnSuccess 的属性值 @setkeepscreenonsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: 5.08; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 调用结果 |

#### SetKeepScreenOnFail 的属性值 @setkeepscreenonfail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 统一错误码 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |




<!-- UTSAPIJSON.setKeepScreenOn.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.screenBrightness.setKeepScreenOn)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/brightness.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.setKeepScreenOn.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setKeepScreenOn&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setKeepScreenOn&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setKeepScreenOn&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setKeepScreenOn&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setKeepScreenOn)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setKeepScreenOn&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/screen-brightness/screen-brightness.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/screen-brightness/screen-brightness.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/screen-brightness/screen-brightness

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/screen-brightness/screen-brightness

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view class="page-scroll">
	<!-- #endif -->
		<view class="page-body">
			<view class="panel">
				<text class="panel-title">接口说明</text>
				<text class="panel-text">`uni.setScreenBrightness`：设置当前页面亮度，示例覆盖 value、success、fail、complete。</text>
				<text class="panel-text">`uni.getScreenBrightness`：读取当前亮度，示例覆盖 success、fail、complete。</text>
				<text class="panel-text">`uni.setKeepScreenOn`：设置常亮，示例覆盖 keepScreenOn、success、fail、complete。Web 平台使用 Screen Wake Lock API。</text>
			</view>

			<view class="panel">
				<text class="panel-title">setScreenBrightness 示例（Web不支持）</text>
				<text class="panel-text">自定义亮度值：{{ brightnessInput }}</text>
				<text class="panel-text">Android/鸿蒙上此亮度设置仅影响当前页面/小程序，离开后会恢复为系统亮度</text>
				<input class="input-box" v-model="brightnessInput" placeholder="请输入 0 到 1 的值" />
				<view class="button-row">
					<button id="btn-set-brightness-0" class="action-button" @click="setPresetBrightness(0)">设置 0</button>
					<button id="btn-set-brightness-05" class="action-button" @click="setPresetBrightness(0.5)">设置 0.5</button>
					<button id="btn-set-brightness-045" class="action-button" @click="setPresetBrightness(0.45)">设置 0.45</button>
					<button id="btn-set-brightness-1" class="action-button" @click="setPresetBrightness(1)">设置 1</button>
				</view>
				<view class="button-row">
					<button id="btn-set-brightness-custom" class="action-button" @click="setCustomBrightness">提交自定义值</button>
					<button id="btn-set-brightness-overflow" class="action-button" @click="setOverflowBrightness">传入 1.5</button>
				</view>
				<text id="set-brightness-success" class="result-text">success：{{ setBrightnessSuccessText }}</text>
				<text id="set-brightness-fail" class="result-text">fail：{{ setBrightnessFailText }}</text>
				<text id="set-brightness-complete" class="result-text">complete：{{ setBrightnessCompleteText }}</text>
			</view>

			<view class="panel">
				<text class="panel-title">getScreenBrightness 示例（Web不支持）</text>
				<text class="result-text">如果设备是自动调节亮度，Android只能获取到自动调节前的亮度。亮度有效范围为0~1</text>
				<button id="btn-get-brightness" class="action-button" @click="getCurrentBrightness">读取当前亮度</button>
				<text id="get-brightness-value" class="result-text">当前亮度：{{ getBrightnessValueText }}</text>
				<text id="get-brightness-fail" class="result-text">fail：{{ getBrightnessFailText }}</text>
				<text id="get-brightness-complete" class="result-text">complete：{{ getBrightnessCompleteText }}</text>
			</view>

			<view class="panel">
				<text class="panel-title">setKeepScreenOn 示例</text>
				<text class="result-text">浏览器需要https下才能生效</text>
				<view class="button-row">
					<button id="btn-keep-screen-on" class="action-button" @click="updateKeepScreenOn(true)">keepScreenOn = true</button>
					<button id="btn-keep-screen-off" class="action-button" @click="updateKeepScreenOn(false)">keepScreenOn = false</button>
				</view>
				<text id="keep-screen-state" class="result-text">当前状态：{{ keepScreenOnStateText }}</text>
				<text id="keep-screen-success" class="result-text">success：{{ keepScreenOnSuccessText }}</text>
				<text id="keep-screen-fail" class="result-text">fail：{{ keepScreenOnFailText }}</text>
				<text id="keep-screen-complete" class="result-text">complete：{{ keepScreenOnCompleteText }}</text>
			</view>

			<view class="panel">
				<text class="panel-title">最近回调日志</text>
				<view v-for="item in logs" :key="item" class="log-item">
					<text class="log-text">{{ item }}</text>
				</view>
			</view>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">

	const brightnessInput = ref<string>('0.66')
	const setBrightnessSuccessText = ref<string>('尚未调用')
	const setBrightnessFailText = ref<string>('尚未调用')
	const setBrightnessCompleteText = ref<string>('尚未调用')
	const getBrightnessValueText = ref<string>('尚未读取')
	const getBrightnessFailText = ref<string>('尚未调用')
	const getBrightnessCompleteText = ref<string>('尚未调用')
	const keepScreenOnStateText = ref<string>('未设置')
	const keepScreenOnSuccessText = ref<string>('尚未调用')
	const keepScreenOnFailText = ref<string>('尚未调用')
	const keepScreenOnCompleteText = ref<string>('尚未调用')
	const logs = ref<Array<string>>([])

	function appendLog(text : string) {
		logs.value.unshift(`${Date.now()} ${text}`)
		if (logs.value.length > 8) {
			logs.value.pop()
		}
	}

	function describeSetScreenBrightnessComplete(result : SetScreenBrightnessComplete) : string {
		if (result instanceof UniError) {
			return `${result.errMsg} (${result.errCode})`
		}
		return '已完成'
	}

	function describeGetScreenBrightnessComplete(result : GetScreenBrightnessComplete) : string {
		if (result instanceof UniError) {
			return `${result.errMsg} (${result.errCode})`
		}
		return '已完成'
	}

	function describeSetKeepScreenOnComplete(result : SetKeepScreenOnComplete) : string {
		if (result instanceof UniError) {
			return `${result.errMsg} (${result.errCode})`
		}
		return '已完成'
	}

	function setBrightnessWithValue(value : number) {
		uni.setScreenBrightness({
			value: value,
			success: () => {
				setBrightnessSuccessText.value = `设置成功，value=${value}`
				setBrightnessFailText.value = '本次未触发'
				appendLog(`setScreenBrightness success value=${value}`)
			},
			fail: (err) => {
				setBrightnessFailText.value = `${err.errMsg} (${err.errCode})`
				appendLog(`setScreenBrightness fail ${err.errMsg}`)
			},
			complete: (result) => {
				setBrightnessCompleteText.value = describeSetScreenBrightnessComplete(result)
			}
		})
	}

	function setPresetBrightness(value : number) {
		brightnessInput.value = `${value}`
		setBrightnessWithValue(value)
	}

	function setCustomBrightness() {
		const value = parseFloat(brightnessInput.value)
		if (isNaN(value)) {
			setBrightnessFailText.value = '输入值不是有效数字，未发起调用'
			setBrightnessCompleteText.value = '未调用'
			appendLog('setScreenBrightness skip invalid input')
			return
		}
		setBrightnessWithValue(value)
	}

	function setOverflowBrightness() {
		brightnessInput.value = '1.5'
		setBrightnessWithValue(1.5)
	}

	function getCurrentBrightness() {
		uni.getScreenBrightness({
			success: (result) => {
				// console.log('getScreenBrightness success', result)
				getBrightnessValueText.value = `${result.value}`
				getBrightnessFailText.value = '本次未触发'
				appendLog(`getScreenBrightness success value=${result.value}`)
			},
			fail: (err) => {
				getBrightnessFailText.value = `${err.errMsg} (${err.errCode})`
				appendLog(`getScreenBrightness fail ${err.errMsg}`)
			},
			complete: (result) => {
				getBrightnessCompleteText.value = describeGetScreenBrightnessComplete(result)
			}
		})
	}

	function updateKeepScreenOn(keepScreenOn : boolean) {
		uni.setKeepScreenOn({
			keepScreenOn: keepScreenOn,
			success: (result) => {
				keepScreenOnStateText.value = keepScreenOn ? '已开启常亮' : '已关闭常亮'
				keepScreenOnSuccessText.value = result.errMsg
				keepScreenOnFailText.value = '本次未触发'
				appendLog(`setKeepScreenOn success keepScreenOn=${keepScreenOn}`)
			},
			fail: (err) => {
				keepScreenOnFailText.value = `${err.errMsg} (${err.errCode})`
				appendLog(`setKeepScreenOn fail ${err.errMsg}`)
			},
			complete: (result) => {
				keepScreenOnCompleteText.value = describeSetKeepScreenOnComplete(result)
			}
		})
	}

	onUnmounted(() => {
		uni.setKeepScreenOn({
			keepScreenOn: false,
			success: () => {},
			fail: () => {},
			complete: () => {}
		})
	})
</script>

<style>
	.page-scroll {
		flex: 1;
	}

	.page-body {
		padding: 12px;
	}

	.panel {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 12px;
		margin-bottom: 12px;
	}

	.panel-title {
		font-size: 15px;
		color: #222222;
		margin-bottom: 10px;
	}

	.panel-text {
		font-size: 13px;
		color: #666666;
		line-height: 20px;
		margin-bottom: 6px;
	}

	.input-box {
		height: 40px;
		border-width: 1px;
		border-style: solid;
		border-color: #d9d9d9;
		border-radius: 8px;
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 10px;
	}

	.button-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 8px;
	}

	.action-button {
		margin-right: 8px;
		margin-bottom: 8px;
		font-size: 13px;
	}

	.result-text {
		font-size: 12px;
		color: #444444;
		line-height: 18px;
		margin-top: 4px;
	}

	.log-item {
		padding-top: 6px;
		padding-bottom: 6px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #f0f0f0;
	}

	.log-text {
		font-size: 12px;
		color: #555555;
		line-height: 18px;
	}
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

