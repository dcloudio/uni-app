::: sourceCode
## uni.startGyroscope(options?) @startgyroscope

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-gyroscope


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-gyroscope

:::

开始监听陀螺仪数据。

### startGyroscope 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StartGyroscopeOptions** | 否 | Web: x | 开始监听陀螺仪数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| interval | string | 否 | Web: x | 监听陀螺仪数据回调函数的执行频率 |
| success | (res: [StartGyroscopeSuccess](#startgyroscopesuccess-values)) => void | 否 | Web: x | 接口调用成功的回调函数 |
| fail | (res: [StartGyroscopeFail](#startgyroscopefail-values)) => void | 否 | Web: x | 接口调用失败的回调函数 |
| complete | (res: [StartGyroscopeSuccess](#startgyroscopesuccess-values) \| [StartGyroscopeFail](#startgyroscopefail-values)) => void | 否 | Web: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### interval 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 'game' | Web: x | 适用于更新游戏的回调频率，约 20ms/次 左右 |
| ui | Web: x | 适用于更新 UI 的回调频率，在 60ms/次 左右 |
| normal | Web: x | 普通的回调频率，在 200ms/次 左右 |

#### StartGyroscopeSuccess 的属性值 @startgyroscopesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | Web: x |

#### StartGyroscopeFail 的属性值 @startgyroscopefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x |
| 602 | Web: x |
| 603 | Web: x |
| 604 | Web: x |
| 701 | Web: x |
| 702 | Web: x |
| 703 | Web: x |
| 704 | Web: x |
| 801 | Web: x |
| 802 | Web: x |
| 803 | Web: x |
| 804 | Web: x |
| 501 | Web: x |
| 502 | Web: x |
| 503 | Web: x |
| 504 | Web: x |
| 901 | Web: x |






<!-- UTSAPIJSON.startGyroscope.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.gyroscope.startGyroscope)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/gyroscope.html#startgyroscope)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.startGyroscope.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startGyroscope&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startGyroscope&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startGyroscope&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startGyroscope&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startGyroscope)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startGyroscope&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意

<md-hperm permissions="ohos.permission.GYROSCOPE" />

::: sourceCode
## uni.stopGyroscope(options?) @stopgyroscope

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-gyroscope


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-gyroscope

:::

停止监听陀螺仪数据变化事件。

### stopGyroscope 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StopGyroscopeOptions** | 否 | Web: x | 停止监听陀螺仪数据的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [StopGyroscopeSuccess](#stopgyroscopesuccess-values)) => void | 否 | Web: x | 接口调用成功的回调函数 |
| fail | (res: [StopGyroscopeFail](#stopgyroscopefail-values)) => void | 否 | Web: x | 接口调用失败的回调函数 |
| complete | (res: [StopGyroscopeSuccess](#stopgyroscopesuccess-values) \| [StopGyroscopeFail](#stopgyroscopefail-values)) => void | 否 | Web: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### StopGyroscopeSuccess 的属性值 @stopgyroscopesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | Web: x |

#### StopGyroscopeFail 的属性值 @stopgyroscopefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x |
| 602 | Web: x |
| 603 | Web: x |
| 604 | Web: x |
| 701 | Web: x |
| 702 | Web: x |
| 703 | Web: x |
| 704 | Web: x |
| 801 | Web: x |
| 802 | Web: x |
| 803 | Web: x |
| 804 | Web: x |
| 501 | Web: x |
| 502 | Web: x |
| 503 | Web: x |
| 504 | Web: x |
| 901 | Web: x |






<!-- UTSAPIJSON.stopGyroscope.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.gyroscope.stopGyroscope)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/gyroscope.html#stopgyroscope)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.stopGyroscope.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopGyroscope&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopGyroscope&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopGyroscope&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopGyroscope&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopGyroscope)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopGyroscope&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.onGyroscopeChange(callback) @ongyroscopechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-gyroscope


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-gyroscope

:::

监听陀螺仪数据变化事件
支付宝小程序频率为 500ms/次，微信小程序频率根据 uni.startGyroscope 的 interval 参数设置。事件只有在调用 uni.startGyroscope 后才会开始监听，使用 uni.stopGyroscope 可以停止监听。

### onGyroscopeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | iOS(VDOM) UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [OnGyroscopeChangeCallbackResult](#ongyroscopechangecallbackresult-values)) => void | 是 | Web: x | 陀螺仪数据事件的监听函数 | 

### OnGyroscopeChangeCallbackResult 的属性值 @ongyroscopechangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| x | number | 是 | Web: x | x 轴的角速度 |
| y | number | 是 | Web: x | y 轴的角速度 |
| z | number | 是 | Web: x | z 轴的角速度 |






<!-- UTSAPIJSON.onGyroscopeChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.gyroscope.onGyroscopeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/gyroscope.html#ongyroscopechange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.onGyroscopeChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onGyroscopeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onGyroscopeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onGyroscopeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onGyroscopeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onGyroscopeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onGyroscopeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意

<md-hperm :permissions="[{ name: 'ohos.permission.GYROSCOPE', desc: '注册监听时如果当前未启动，会自动调用 startGyroscope()，因此间接触发权限申请和传感器启动。' }]" />

::: sourceCode
## uni.offGyroscopeChange(callback?) @offgyroscopechange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-gyroscope


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-gyroscope

:::

停止监听陀螺仪数据变化事件

### offGyroscopeChange 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | iOS(VDOM) UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [OnGyroscopeChangeCallbackResult](#ongyroscopechangecallbackresult-values)) => void | 否 | Web: x | onGyroscopeChange 传入的监听函数。不传此参数则移除所有监听函数。 | 

### OnGyroscopeChangeCallbackResult 的属性值 @ongyroscopechangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| x | number | 是 | Web: x | x 轴的角速度 |
| y | number | 是 | Web: x | y 轴的角速度 |
| z | number | 是 | Web: x | z 轴的角速度 |






<!-- UTSAPIJSON.offGyroscopeChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.gyroscope.offGyroscopeChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/gyroscope.html#offgyroscopechange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.offGyroscopeChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offGyroscopeChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offGyroscopeChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offGyroscopeChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offGyroscopeChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offGyroscopeChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offGyroscopeChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/gyroscope/gyroscope.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/gyroscope/gyroscope.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/gyroscope/gyroscope
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">陀螺仪 API</text>
		<text class="margin-v">演示 `uni.startGyroscope`、`uni.stopGyroscope`、`uni.onGyroscopeChange`、`uni.offGyroscopeChange` 的完整用法。</text>
		<text class="margin-v">`x / y / z` 表示各轴角速度。</text>

		<text class="uni-h3">实时状态</text>
		<view class="log-list">
			<text class="log-item" v-for="item in statusItems" :key="item.label">{{ item.label }}：{{ item.value }}</text>
			<text class="log-item" v-for="item in axisItems" :key="item.label">{{ item.label }}：{{ item.value }}</text>
		</view>

		<text class="uni-h3">调用结果</text>
		<view class="log-list">
			<text class="log-item" v-for="item in resultItems" :key="item.label">{{ item.label }}：{{ item.value }}</text>
		</view>

		<text class="uni-h3">开始 / 停止</text>
		<text class="margin-v">先注册监听函数，再按不同 interval 启动；停止后会继续保留已绑定监听，直到显式 off。</text>
		<radio-group class="option-group" @change="handleIntervalChange">
			<view class="option-item" v-for="item in intervalOptions" :key="item.value">
				<radio :value="item.value" :checked="activeInterval == item.value">
					<text class="option-text">{{ item.label }}</text>
				</radio>
			</view>
		</radio-group>
		<button id="btn-start-gyroscope" class="margin-v" type="primary" @tap="startListening">开始监听</button>
		<button id="btn-stop-gyroscope" class="margin-v" @tap="stopListening">停止监听</button>
		<button id="btn-bind-primary-listener" class="margin-v" @tap="registerSingleListener">绑定主监听</button>
		<button id="btn-bind-extra-listener" class="margin-v" @tap="registerExtraListener">再绑一个监听</button>
		<button id="btn-remove-primary-listener" class="margin-v" @tap="removeSingleListener">off 指定监听</button>
		<button id="btn-remove-all-listeners" class="margin-v" @tap="removeAllListeners">off 全部监听</button>
		<button id="btn-open-panorama" class="margin-v" @tap="navigateToPanorama">跳转全景示例</button>

		<text class="uni-h3">监听日志</text>
		<view class="log-list">
			<text class="log-item" v-for="item in logItems" :key="item">{{ item }}</text>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type GyroscopeErrorItem = {
		code : number
		title : string
		description : string
	}

	type IntervalOption = {
		value : GyroscopeInterval
		label : string
	}

	type DisplayItem = {
		label : string
		value : string
	}

	const activeInterval = ref<GyroscopeInterval>('normal')
	const statusText = ref('未启动')
	const axisX = ref('0.0000')
	const axisY = ref('0.0000')
	const axisZ = ref('0.0000')
	const lastAction = ref('等待调用')
	const lastStatus = ref('未执行')
	const lastPayload = ref('请先绑定监听后开始')
	const logItems = ref<Array<string>>([])
	const primaryBound = ref(false)
	const extraBound = ref(false)
	const intervalOptions : Array<IntervalOption> = [
		{ value: 'game', label: 'game' },
		{ value: 'ui', label: 'ui' },
		{ value: 'normal', label: 'normal' }
	]
	const statusItems = computed((): Array<DisplayItem> => {
		return [
			{ label: '监听状态', value: statusText.value },
			{ label: '当前频率', value: activeInterval.value }
		]
	})
	const axisItems = computed((): Array<DisplayItem> => {
		return [
			{ label: 'X', value: axisX.value },
			{ label: 'Y', value: axisY.value },
			{ label: 'Z', value: axisZ.value }
		]
	})
	const resultItems = computed((): Array<DisplayItem> => {
		return [
			{ label: '最近动作', value: lastAction.value },
			{ label: '状态', value: lastStatus.value },
			{ label: '说明', value: lastPayload.value }
		]
	})

	const errorItems : Array<GyroscopeErrorItem> = [
		{ code: 601, title: '不支持', description: '设备或平台没有陀螺仪能力。' },
		{ code: 602, title: '启动失败', description: '权限、初始化或浏览器授权被拒。' },
		{ code: 603, title: '停止失败', description: '停止订阅或销毁资源失败。' },
		{ code: 604, title: '内部错误', description: '插件内部出现未分类异常。' },
		{ code: 701, title: 'Android SensorManager 不可用', description: 'Android 无法获取传感器服务。' },
		{ code: 702, title: 'Android 陀螺仪不存在', description: 'Android 设备不含 TYPE_GYROSCOPE。' },
		{ code: 703, title: 'Android 注册失败', description: 'Android 注册监听器失败。' },
		{ code: 704, title: 'Android 数据异常', description: 'Android 原生数据回调不完整。' },
		{ code: 801, title: 'iOS 不支持', description: 'iOS 设备没有 gyro 能力。' },
		{ code: 802, title: 'iOS 初始化失败', description: 'iOS MotionManager 创建失败。' },
		{ code: 803, title: 'iOS 启动失败', description: 'iOS startGyroUpdates 未成功激活。' },
		{ code: 804, title: 'iOS 停止失败', description: 'iOS stopGyroUpdates 后状态异常。' },
		{ code: 501, title: 'Harmony 不支持', description: '鸿蒙设备无法获取 gyroscope 传感器。' },
		{ code: 502, title: 'Harmony 订阅失败', description: '鸿蒙订阅传感器失败。' },
		{ code: 503, title: 'Harmony 取消订阅失败', description: '鸿蒙停止监听失败。' },
		{ code: 504, title: 'Harmony 数据异常', description: '鸿蒙传感器数据内容异常。' },
		{ code: 901, title: 'Web 不支持', description: '浏览器没有真实 gyroscope / rotationRate。' }
	]

	function pushLog(line : string) : void {
		logItems.value.unshift(line)
		if (logItems.value.length > 10) {
			logItems.value.splice(10)
		}
    console.log('logItems.value.length', logItems.value.length)
	}

	function updateResult(action : string, status : string, payload : string) : void {
		lastAction.value = action
		lastStatus.value = status
		lastPayload.value = payload
		pushLog(`${action} -> ${status}`)
	}

	function formatAxisValue(value : number) : string {
		return value.toFixed(4)
	}

	const primaryListener : OnGyroscopeChangeCallback = (result) => {
		axisX.value = formatAxisValue(result.x)
		axisY.value = formatAxisValue(result.y)
		axisZ.value = formatAxisValue(result.z)
		statusText.value = `监听中 (${activeInterval.value})`
	}

	const extraListener : OnGyroscopeChangeCallback = (result) => {
		pushLog(`额外监听 -> ${formatAxisValue(result.x)}, ${formatAxisValue(result.y)}, ${formatAxisValue(result.z)}`)
	}

	function selectInterval(interval : GyroscopeInterval) : void {
		activeInterval.value = interval
		updateResult('selectInterval', '已切换', interval)
	}

	function handleIntervalChange(event : UniRadioGroupChangeEvent) : void {
		selectInterval(event.detail.value as GyroscopeInterval)
	}

	function registerSingleListener() : void {
		if (!primaryBound.value) {
			uni.onGyroscopeChange(primaryListener)
			primaryBound.value = true
		}
		updateResult('onGyroscopeChange(primary)', '已绑定', '主监听已注册')
	}

	function registerExtraListener() : void {
		if (!extraBound.value) {
			uni.onGyroscopeChange(extraListener)
			extraBound.value = true
		}
		updateResult('onGyroscopeChange(extra)', '已绑定', '额外监听已注册')
	}

	function removeSingleListener() : void {
		uni.offGyroscopeChange(primaryListener)
		primaryBound.value = false
		updateResult('offGyroscopeChange(listener)', '已解绑', '仅移除主监听')
	}

	function removeAllListeners() : void {
		uni.offGyroscopeChange()
		primaryBound.value = false
		extraBound.value = false
		updateResult('offGyroscopeChange()', '已解绑', '所有监听函数已移除')
	}

	function navigateToPanorama() {
		uni.navigateTo({
			url: '/pages/API/gyroscope/panorama'
		})
	}

	function startListening() : void {
		if (!primaryBound.value) {
			registerSingleListener()
		}
		uni.startGyroscope({
			interval: activeInterval.value,
			success: (res) => {
				const errMsg : string = res.errMsg != null ? res.errMsg as string : 'startGyroscope:ok'
				statusText.value = `监听中 (${activeInterval.value})`
				updateResult('startGyroscope', '成功', errMsg)
			},
			fail: (error) => {
				statusText.value = '启动失败'
				updateResult('startGyroscope', `失败 (${error.errCode})`, error.errMsg != null ? error.errMsg : 'startGyroscope:fail')
			}
		})
	}

	function stopListening() : void {
		uni.stopGyroscope({
			success: (res) => {
				const errMsg : string = res.errMsg != null ? res.errMsg as string : 'stopGyroscope:ok'
				statusText.value = '已停止'
				updateResult('stopGyroscope', '成功', errMsg)
			},
			fail: (error) => {
				updateResult('stopGyroscope', `失败 (${error.errCode})`, error.errMsg != null ? error.errMsg : 'stopGyroscope:fail')
			}
		})
	}

	onUnload(() => {
		uni.offGyroscopeChange()
		uni.stopGyroscope()
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
		margin-top: 8px;
		margin-right: 18px;
	}

	.option-text {
		font-size: 14px;
	}

	.error-list {
		margin: 5px 0;
		display: flex;
		flex-direction: column;
	}

	.error-item {
		margin: 5px 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.error-text {
		font-size: 14px;
	}

	.mini-button {
		margin-top: 5px;
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
- 和微信小程序平台不同，app 平台调用 `uni.onGyroscopeChange` 时不会自动启动陀螺仪，需要调用 `uni.startGyroscope()` 才能正常启动陀螺仪。这个问题会在后续版本处理，app 平台在 `5.09+` 版本中将和微信小程序行为保持一致。