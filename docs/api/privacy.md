## 隐私API
因为uni-app下开发者的js代码执行较晚，所以框架提供了原生隐私协议框，但自定义性较差。

uni-app x并不需要这套机制，开发者的代码就是原生代码，执行时机很早，可以自己弹出隐私协议政策。（如在app launch生命周期中弹出dialogPage的协议框）

但应用开发者和插件开发者，需要监听和共享隐私协议是否同意。所以提供了如下一批能力。

- `uni.getPrivacySetting`：获取用户是否同意了隐私协议
- `uni.resetPrivacyAuthorization`：重置隐私协议状态。适用于隐私协议变更，需要重新同意的场景
- `uni.onPrivacyAuthorizationChange`、`uni.offPrivacyAuthorizationChange`：监听和取消监听用户是否同意隐私协议
- 在 [button组件](../component/button.md)中，提供了属性open-type="agreePrivacyAuthorization"。之所以同意隐私协议是按钮，而不是API，是因为需要用户真实的同意。避免插件作者通过API非正常设置隐私协议为同意。所以开发者务必在隐私协议的同意按钮处使用 open-type="agreePrivacyAuthorization" 的 button组件。
- `manifest.json`中， `app` 节点下`initPrivacyAuthorization` 为 `auto` 时，安卓、鸿蒙平台隐私状态初始值为 `disagree`，iOS平台隐私状态初始值为 `agree`

<!-- ## uni.getPrivacySetting(options) @getprivacysetting -->

::: sourceCode
## uni.getPrivacySetting(options) @getprivacysetting

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-privacy


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-privacy

:::

获取隐私协议状态

### getPrivacySetting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetPrivacySettingOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [GetPrivacySettingSuccessResult](#getprivacysettingsuccessresult-values)) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: any) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetPrivacySettingSuccessResult 的属性值 @getprivacysettingsuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| needAuthorization | boolean | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否需要用户授权隐私协议(用户之前同意过返回false，没同意过则返回true) |
| privacyContractName | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 隐私授权协议的名称<br/> |




<!-- UTSAPIJSON.getPrivacySetting.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.privacy.getPrivacySetting)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/privacy/wx.getPrivacySetting.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getPrivacySetting&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getPrivacySetting&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getPrivacySetting&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getPrivacySetting&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getPrivacySetting)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getPrivacySetting&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.resetPrivacyAuthorization() @resetprivacyauthorization -->

::: sourceCode
## uni.resetPrivacyAuthorization() @resetprivacyauthorization

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-privacy


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-privacy

:::

重置隐私协议状态为未同意

适用于隐私协议变更，需要重新同意的场景。

### resetPrivacyAuthorization 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |






<!-- UTSAPIJSON.resetPrivacyAuthorization.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.privacy.resetPrivacyAuthorization)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=resetPrivacyAuthorization&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=resetPrivacyAuthorization&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=resetPrivacyAuthorization&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=resetPrivacyAuthorization&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=resetPrivacyAuthorization&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=resetPrivacyAuthorization)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=resetPrivacyAuthorization&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.onPrivacyAuthorizationChange(callback) @onprivacyauthorizationchange -->

::: sourceCode
## uni.onPrivacyAuthorizationChange(callback) @onprivacyauthorizationchange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-privacy


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-privacy

:::

开启监听隐私协议状态改变

### onPrivacyAuthorizationChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [PrivacyChangeResult](#privacychangeresult-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### PrivacyChangeResult 的属性值 @privacychangeresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| needAuthorization | boolean | 是 | - | Web: x; 微信小程序: -; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否需要用户授权隐私协议(用户之前同意过返回false，没同意过则返回true) |


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onPrivacyAuthorizationChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.privacy.onPrivacyAuthorizationChange)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onPrivacyAuthorizationChange&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onPrivacyAuthorizationChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onPrivacyAuthorizationChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onPrivacyAuthorizationChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onPrivacyAuthorizationChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onPrivacyAuthorizationChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onPrivacyAuthorizationChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.offPrivacyAuthorizationChange(id) @offprivacyauthorizationchange -->

::: sourceCode
## uni.offPrivacyAuthorizationChange(id) @offprivacyauthorizationchange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-privacy


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-privacy

:::

取消监听隐私协议状态改变

### offPrivacyAuthorizationChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开启监听隐私协议状态改变返回的id | 




<!-- UTSAPIJSON.offPrivacyAuthorizationChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.privacy.offPrivacyAuthorizationChange)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=offPrivacyAuthorizationChange&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offPrivacyAuthorizationChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offPrivacyAuthorizationChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offPrivacyAuthorizationChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offPrivacyAuthorizationChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offPrivacyAuthorizationChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offPrivacyAuthorizationChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/privacy/privacy.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/privacy/privacy.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/privacy/privacy
```uvue
<template>
	<view class="uni-padding-wrap">
		<page-head :title="title"></page-head>
    <view class="item-box">
      <text>当前应用隐私授权状态:</text>
      <text>{{ appPrivacy }}</text>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="item-box">
      <text>隐私授权协议的名称:</text>
      <text>{{ privacyContractName }}</text>
    </view>
    <!-- #endif -->
    <view>
      <button class="privacy-button" type="primary" @tap="getPrivacySetting">
        获取隐私协议授权状态
      </button>
      <button class="privacy-button" type="primary" open-type="agreePrivacyAuthorization">
        同意隐私协议专用按钮
      </button>
      <!-- #ifdef APP -->
      <button class="privacy-button" type="primary" @tap="resetPrivacyAuthorization">
        重置隐私协议授权状态
      </button>
      <button class="privacy-button" @tap="openPrivacyDialog">
        显示隐私政策弹框
      </button>
      <!-- #endif -->
    </view>
	</view>
</template>

<script setup lang="uts">
	const title = ref('隐私信息授权')
	const appPrivacy = ref('未获取')
	const privacyContractName = ref("")
	const listenId = ref(0)

	const getPrivacySetting = () => {
		uni.getPrivacySetting({
			success: (res) => {
				appPrivacy.value = res.needAuthorization ? "未同意" : "已同意"
				// #ifdef MP-WEIXIN
				privacyContractName.value = res.privacyContractName
				// #endif
			}
		})
	}

	const resetPrivacyAuthorization = () => {
		uni.resetPrivacyAuthorization()
	}

	const openPrivacyDialog = () => {
		uni.openDialogPage({
			url: '/pages/component/button/privacy',
		})
	}

	onReady(() => {
		// #ifdef APP
		//添加 隐私协议监听
		const id = uni.onPrivacyAuthorizationChange((res) => {
			appPrivacy.value = res.needAuthorization ? "未同意" : "已同意"
			const privacyState = "监听到隐私协议状态已变更为 " + appPrivacy.value;
			uni.showToast({
				"position": "bottom",
				"title": privacyState
			})
		})
		listenId.value = id;
		uni.showToast({
			"position": "bottom",
			"title": "开启监听隐私协议状态"
		})
		// #endif
	})

	onUnload(() => {
		// #ifdef APP
		//注销监听
		uni.offPrivacyAuthorizationChange(listenId.value)
		listenId.value = 0;
		uni.showToast({
			"position": "bottom",
			"title": "已停止监听隐私协议状态"
		})
		// #endif
	})

</script>

<style>
.item-box {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
.privacy-button{
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

