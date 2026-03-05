<!-- ## uni.hideKeyboard(options) @hidekeyboard -->

::: sourceCode
## uni.hideKeyboard(options?) @hidekeyboard

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-keyboard


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-keyboard

:::

隐藏键盘


### hideKeyboard 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.71 | 4.71 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideKeyboardOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.hideKeyboard参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: HideKeyboardSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideKeyboard成功回调函数定义 |
| fail | (res: HideKeyboardFail) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideKeyboard失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideKeyboard完成回调函数定义 | 




<!-- UTSAPIJSON.hideKeyboard.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.keyboard.hideKeyboard)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/key.html#hidekeyboard)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/keyboard/wx.hideKeyboard.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideKeyboard&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideKeyboard&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideKeyboard&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideKeyboard&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideKeyboard)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideKeyboard&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.onKeyboardHeightChange(callback) @onkeyboardheightchange -->

::: sourceCode
## uni.onKeyboardHeightChange(callback) @onkeyboardheightchange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-keyboard


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-keyboard

:::

监听键盘高度变化事件

在input和textarea组件上也有事件用于监听键盘高度变化。本API为全局API，可以全局监听键盘弹出收起和高度变化，尤其是App内嵌web-view中的键盘变化，无法在组件上监听，只能使用本API全局监听。

### onKeyboardHeightChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | 4.71 | 4.71 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [OnKeyboardHeightChangeCallbackResult](#onkeyboardheightchangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.onKeyboardHeightChange参数定义 | 

### OnKeyboardHeightChangeCallbackResult 的属性值 @onkeyboardheightchangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| height | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 键盘高度 |


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onKeyboardHeightChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.keyboard.onKeyboardHeightChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/key.html#onkeyboardheightchange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/key.html#onkeyboardheightchange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/keyboard/wx.onKeyboardHeightChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onKeyboardHeightChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onKeyboardHeightChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onKeyboardHeightChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onKeyboardHeightChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onKeyboardHeightChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onKeyboardHeightChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.offKeyboardHeightChange(id) @offkeyboardheightchange -->

::: sourceCode
## uni.offKeyboardHeightChange(id?) @offkeyboardheightchange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-keyboard


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-keyboard

:::

移除键盘高度变化事件的监听函数

### offKeyboardHeightChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | 4.71 | 4.71 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 否 | - | - |  | 




<!-- UTSAPIJSON.offKeyboardHeightChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.keyboard.offKeyboardHeightChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/key.html#offkeyboardheightchange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/key.html#offkeyboardheightchange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/keyboard/wx.offKeyboardHeightChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offKeyboardHeightChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offKeyboardHeightChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offKeyboardHeightChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offKeyboardHeightChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offKeyboardHeightChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offKeyboardHeightChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/keyboard/keyboard.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/keyboard/keyboard.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/keyboard/keyboard

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/keyboard/keyboard

>示例
```vue
<template>
	<view class="container">
		<view class="input-section">
			<input id="uni-input-box" class="input-box" type="text" :value="data.inputValue" placeholder="点击输入框显示键盘" :focus="data.isFocus" hold-keyboard="true" />
			<button class="btn" @click="hideKeyboard">隐藏键盘</button>
		</view>
		<view class="info-section">
			<text class="info-text">键盘高度: {{data.keyboardHeight}}px</text>
			<text class="info-text">键盘状态: {{data.keyboardStatus}}</text>
		</view>
	</view>
</template>

<script setup lang="uts">

type DataType = {
  inputValue: string,
  isFocus: boolean,
  keyboardHeight: number,
  keyboardStatus: string,
}

// 使用reactive包装数据，便于自动化测试获取
const data = reactive({
  inputValue: '',
  isFocus: false,
  keyboardHeight: 0,
  keyboardStatus: '未显示',
} as DataType)

function hideKeyboard() {
  uni.hideKeyboard();
}

onLoad(() => {
  // 监听键盘高度变化
  uni.onKeyboardHeightChange(res => {
    data.keyboardHeight = res.height;
    data.keyboardStatus = res.height > 0 ? '显示中' : '已隐藏';
  });
})

onUnload(() => {
  // 页面卸载时移除监听
  uni.offKeyboardHeightChange();
})

defineExpose({
  data,
  hideKeyboard
})
</script>

<style>
.container {
	padding: 20px;
}
.input-section {
	margin-bottom: 20px;
}
.input-box {
	width: 100%;
	height: 40px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 0 10px;
	margin-bottom: 10px;
}
.btn {
	background-color: #007AFF;
	color: #fff;
}
.info-section {
	margin-top: 20px;
}
.info-text {
	width: 100%;
	margin-bottom: 10px;
	font-size: 16px;
	color: #333;
}
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

