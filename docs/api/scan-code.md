<!-- ## uni.scanCode(options?) @scancode -->

::: sourceCode
## uni.scanCode(options?) @scancode

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-scanCode


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-scanCode

:::

扫码（包括一维码和二维码）

### scanCode 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.71 | 4.71 | 4.71 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ScanCodeOptions** | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.scanCode参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onlyFromCamera | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否只能从相机扫码，不允许从相册选择图片 |
| scanType | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 扫码类型 |
| success | (res: [ScanCodeSuccess](#scancodesuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.scanCode成功回调函数定义 |
| fail | (res: ScanCodeFail) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.scanCode失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.scanCode完成回调函数定义 | 

##### scanType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| barCode | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| qrCode | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| datamatrix | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pdf417 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### ScanCodeSuccess 的属性值 @scancodesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| result | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| scanType | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| charSet | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 所扫码的字符集<br/> |
| path | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path<br/> |
| rawData | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 原始数据，base64编码<br/> |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/scan-code/scan-code.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/scan-code/scan-code.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/scan-code/scan-code
```uvue
<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">扫码结果：</view>
			<view v-if="result" class="scan-result">
				{{result}}
			</view>
			<view class="uni-btn-v">
				<button type="primary" @click="scan">扫一扫</button>
			</view>
		</view>
	</view>
</template>
<script setup lang="uts">
	const title = ref('scanCode')
	const result = ref('')
	const scan = () => {
		uni.scanCode({
			success: (res: ScanCodeSuccess) => {
        console.log('res: ',res);
				result.value = res.result
			},
			fail: (err: ScanCodeFail) => {
        console.log('err: ',err);
				// 需要注意的是小程序扫码不需要申请相机权限
			}
		});
	}
</script>

<style>
	.scan-result {
		min-height: 25px;
		line-height: 25px;
	}
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.scanCode)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/barcode.html#scancode)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=scanCode&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=scanCode&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=scanCode&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=scanCode&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=scanCode)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=scanCode&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


### 平台实现说明
- uni-app x的Android/iOS平台的扫码基于Google的机器学习库，对各种一维、二维码都有较好的识别效果。超过了uni-app的扫码。
	扫码API，其实是一个开源的uvue页面，页面中内嵌了[camera组件](../component/camera.md)，camera组件提供扫码模式。源码在文档上方点击右侧gitcode或github。\
	如需连续扫码，推荐使用[camera组件](../component/camera.md)
- 鸿蒙、小程序直接调用了其平台提供的扫码API，UI不可自定义。但各种一维、二维码均可识别。

### 依赖库版本

Android端实现扫码所使用的依赖库
```
"androidx.camera:camera-core:1.4.1",
"com.google.mlkit:barcode-scanning:17.2.0",
"com.github.albfernandez:juniversalchardet:2.0.4"
```
iOS端实现扫码所使用的依赖库
```
pod 'GoogleMLKit/BarcodeScanning', '6.0.0'
```
