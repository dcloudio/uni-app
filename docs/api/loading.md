<!-- ## uni.showLoading(options) @showloading -->

::: sourceCode
## uni.showLoading(options?) @showloading

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。

它是一个悬浮弹出的、非组件内嵌的加载中提示。

### showLoading 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的内容，长度与 icon 取值有关。 |
| mask | boolean | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 是否显示透明蒙层，防止触摸穿透，默认：false |
| success | (res: ShowLoadingSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading成功回调函数定义 |
| fail | (res: [ShowLoadingFail](#showloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading完成回调函数定义 | 

#### ShowLoadingFail 的属性值 @showloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调参数 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.showLoading.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.loading.showLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.hideLoading() @hideloading -->

::: sourceCode
## uni.hideLoading(options?) @hideloading

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

隐藏 loading 提示框。

### hideLoading 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| loadingPage | [UniPage](/api/unipage.md) | 否 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS 系统版本: 12; HarmonyOS: x | 期望隐藏的目标LoadingPage 如果为null 会关闭当前栈顶全部LoadingPage |
| success | (res: HideLoadingSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading成功回调函数定义 |
| fail | (res: [HideLoadingFail](#hideloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading完成回调函数定义 |
| noConflict | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.22.1`<br/><br/>目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性<br/> | 

#### HideLoadingFail 的属性值 @hideloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调参数 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.hideLoading.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.loading.hideLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/loading/loading.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/loading/loading.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/loading/loading

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/loading/loading

>示例
```vue
<template>
	<view>
		<page-head :title="data.title"></page-head>
		<view class="uni-list">
			<view class="uni-padding-wrap">
				<view class="uni-title uni-common-mt">
					<text class="uni-title-text"> 设置标题 </text>
				</view>
			</view>
			<view class="uni-list uni-common-pl">
				<radio-group @change="radioChange">
					<radio class="uni-list-cell uni-list-cell-pd radio" v-for="(item, index) in data.items"
						:key="item.value" :class="index < data.items.length - 1 ? 'uni-list-cell-line' : ''"
						:value="item.value" :checked="index === data.current">
						{{ item.name }}
					</radio>
				</radio-group>
			</view>
		</view>

<!-- 		<view class="uni-padding-wrap uni-common-mt" style="flex-direction: row; justify-content: space-between; align-items: center;">
			<text class="uni-title-text"> iOS 雪花样式 </text>
			<switch :checked="data.iosSpinner" @change="iosSpinnerChange" />
		</view> -->

		<view class="uni-padding-wrap">
			<view class="uni-btn-v">
				<button type="primary" @click="showLoading">显示 loading 提示框</button>
				<button @click="hideLoading">隐藏 loading 提示框</button>
				<text>为方便演示，loading弹出3秒后自动关闭</text>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<text>{{data.callbackText}}</text>
			<view class="uni-btn-v">
				<button type="primary" @click="closeSomeLoading">关闭指定loading</button>
				<button type="primary" @click="noParamLoading">无参数测试</button>
			</view>
		</view>
	</view>
</template>
<script setup lang="uts">
	type ItemType = {
		value : string
		name : string
	}

	type DataType = {
		title : string;
		items : ItemType[];
		current : number;
		callbackText : string[];
		titleSelect : string;
		iosSpinner : boolean;
	}

	const data = reactive({
		title: 'loading',
		items: [
			{
				value: 'null',
				name: '无标题',
			},
			{
				value: '三秒后自动关闭',
				name: '普通标题',
			},
			{
				value: '超长文本内容，测试超出范围-超长文本内容，测试超出范围-三秒后自动关闭',
				name: '长标题',
			},
		],
		callbackText: [] as Array<string>,
		current: 0,
		titleSelect: "null",
		iosSpinner: true
	} as DataType)

	const jest_getWindowInfo = () : GetWindowInfoResult => {
		return uni.getWindowInfo();
	}

	const radioChange = (e : UniRadioGroupChangeEvent) => {
		const selected = data.items.find((item) : boolean => {
			return item.value == e.detail.value
		})
		if (selected != null) {
			data.titleSelect = selected.value
		}
	}

	const iosSpinnerChange = (e : UniSwitchChangeEvent) => {
		data.iosSpinner = e.detail.value
	}

	const hideLoading = () => {
		uni.hideLoading();
	}
	const noParamLoading = () => {

		uni.showLoading()
		uni.showLoading({
			success: function (showRet : ShowLoadingSuccess) {
				data.callbackText.push("noParamLoading 1 success")
			}
		})
		uni.showLoading({
			complete: function (showRet : any) {
				data.callbackText.push("noParamLoading 2 complete")
			}
		})
		setTimeout(function () {
			uni.hideLoading({
				success: function (ret : HideLoadingSuccess) {
					data.callbackText.push("hide loading success")
				}
			})
		}, 2000)
	}
	/**
	 * 关闭指定loading
	 */
	const closeSomeLoading = () => {
		const loading1 = uni.showLoading({
			title: "第一个loading",
			iosSpinner: data.iosSpinner,
			success: function (res : ShowLoadingSuccess) {
				data.callbackText.push("showLoading 1 success")
				console.log("showLoading 1 success", res)
			},
			fail: function (res : ShowLoadingFail) {
				data.callbackText.push("showLoading 1 fail")
				console.log("showLoading 1 fail", res)
			},
			complete: function (res : any) {
				data.callbackText.push("showLoading 1 complete")
				console.log("showLoading 1 complete", res)
			},
		})
		const loading2 = uni.showLoading({
			title: "第二个loading",
			iosSpinner: data.iosSpinner,
			success: function (res : ShowLoadingSuccess) {
				data.callbackText.push("showLoading 2 success")
				console.log("showLoading 2 success", res)
			},
			fail: function (res : ShowLoadingFail) {
				data.callbackText.push("showLoading 2 fail")
				console.log("showLoading 2 fail", res)
			},
			complete: function (res : any) {
				data.callbackText.push("showLoading 2 complete")
				console.log("showLoading 2 complete", res)
			},
		})
		setTimeout(function () {
			uni.hideLoading({
				loadingPage: loading2,
				success: function (res : HideLoadingSuccess) {
					data.callbackText.push("hideLoading 2 success")
					console.log("hideLoading 2 success", res)
				},
				fail: function (res : HideLoadingFail) {
					data.callbackText.push("hideLoading 2 fail")
					console.log("hideLoading 2 fail", res)
				},
				complete: function (res : any) {
					data.callbackText.push("hideLoading 2 complete")
					console.log("hideLoading 2 complete", res)
				},
			})
		}, 1000)
		setTimeout(function () {
			uni.hideLoading({
				loadingPage: loading1,
				success: function (res : HideLoadingSuccess) {
					data.callbackText.push("hideLoading 1 success")
					console.log("hideLoading 1 success", res)
				},
				fail: function (res : HideLoadingFail) {
					data.callbackText.push("hideLoading 1 fail")
					console.log("hideLoading 1 fail", res)
				},
				complete: function (res : any) {
					data.callbackText.push("hideLoading 1 complete")
					console.log("hideLoading 1 complete", res)
				},
			})
		}, 3000)
	}
	const showLoading = () => {
		console.log(data.titleSelect)
		if (data.titleSelect == "null") {
			uni.showLoading({
				title: "",
				iosSpinner: data.iosSpinner,
			});
		} else {
			uni.showLoading({
				title: data.titleSelect,
				iosSpinner: data.iosSpinner,
			});
		}
		setTimeout(() => {
			hideLoading();
		}, 3000);
	}

	onLoad(() => {
		// uni.showLoading()
		// setTimeout(() => {
		// 	uni.hideLoading()
		// }, 2000);
	})

	defineExpose({
    data,
		showLoading,
		hideLoading,
    closeSomeLoading,
    noParamLoading,
	})
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Tips@tips

* 关于uni.showLoading和[loading组件](../component/loading.md)的区别：
	+ showLoading是一个简易的API，使用简单。因为它悬浮在页面上方、让页面整体失去响应。主流的App较少使用这种方式。
	+ loading组件是内置组件，无需在页面显式引入，可以嵌入页面中、按钮中。
* 从HBuilderX 5.0+，在App和Web平台，showLoading统一成一套代码，使用dialogPage的页面中显示一个loading组件来实现。dialogPage是模态的，不支持点击空白消失，但支持back关闭。需要非模态的使用场景时，请在页面中直接使用[loading组件](../component/loading.md)。
* showLoading 是和页面（包括 dialogPage）绑定的。
	+ 当showLoading执行时，会寻找当前页面栈顶的窗体（包括 dialogPage），找到后进行绑定，然后弹出loading。
	+ 在弹出loading后，再次打开新页面，新页面会覆盖原页面弹出的 loading。
		+ 如需在新页面（包括 dialogPage）弹出 loading，需要再次调用 showLoading
* 在HBuilderX 5.0以前，HarmonyOS 平台，showLoading 是和 App window 绑定的，目前未与页面关联，当打开新页面时，原页面弹出的 loading 不会被遮挡。HBuilderX 5.0拉齐了实现，与上条策略一致。
* 当前页面（包括 dialogPage）关闭时，弹出的 loading 都会被自动取消
	+ 如需在dialogPage关闭后，仍然弹出 Loading，需要在关闭dialogPage后再次调用 showLoading
+ 注意在支持 dialogPage 的平台（Web和App），[uni.showModal](./modal.md)、[uni.showActionSheet](./action-sheet.md) 也是 dialogPage 实现的，此时 showLoading 会绑定到这些 dialogPage 上
