<!-- ## uni.hideKeyboard(options) @hidekeyboard -->

::: sourceCode
## uni.hideKeyboard(options?) @hidekeyboard

> issues: https://issues.dcloud.net.cn/?mid=api.device.keyboard.hideKeyboard


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-keyboard

:::

隐藏键盘


### hideKeyboard 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.71; iOS: 4.71; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **HideKeyboardOptions** | 否 | uni.hideKeyboard参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| success | (res: HideKeyboardSuccess) => void | 否 | uni.hideKeyboard成功回调函数定义 |
| fail | (res: HideKeyboardFail) => void | 否 | uni.hideKeyboard失败回调函数定义 |
| complete | (res: any) => void | 否 | uni.hideKeyboard完成回调函数定义 | 




<!-- UTSAPIJSON.hideKeyboard.example -->



<!-- ## uni.onKeyboardHeightChange(callback) @onkeyboardheightchange -->

::: sourceCode
## uni.onKeyboardHeightChange(callback) @onkeyboardheightchange

> issues: https://issues.dcloud.net.cn/?mid=api.device.keyboard.onKeyboardHeightChange


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-keyboard

:::

监听键盘高度变化事件

在input和textarea组件上也有事件用于监听键盘高度变化。本API为全局API，可以全局监听键盘弹出收起和高度变化，尤其是App内嵌web-view中的键盘变化，无法在组件上监听，只能使用本API全局监听。

### onKeyboardHeightChange 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/keyboard/wx.onKeyboardHeightChange.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=onKeyboardHeightChange&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","4.71","4.71","5.08"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [OnKeyboardHeightChangeCallbackResult](#onkeyboardheightchangecallbackresult-values)) => void | 是 | Web: x | uni.onKeyboardHeightChange参数定义 | 

### OnKeyboardHeightChangeCallbackResult 的属性值 @onkeyboardheightchangecallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| height | number | 是 | Web: x | 键盘高度 |


### 返回值 

| 类型 |
| :- |
| number |
 


**注意**
微信小程序不支持返回值。

<!-- UTSAPIJSON.onKeyboardHeightChange.example -->



<!-- ## uni.offKeyboardHeightChange(id) @offkeyboardheightchange -->

::: sourceCode
## uni.offKeyboardHeightChange(id?) @offkeyboardheightchange

> issues: https://issues.dcloud.net.cn/?mid=api.device.keyboard.offKeyboardHeightChange


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-keyboard

:::

移除键盘高度变化事件的监听函数

### offKeyboardHeightChange 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/keyboard/wx.offKeyboardHeightChange.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=offKeyboardHeightChange&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","4.71","4.71","5.08"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| id | number | 否 | Web: x | 


**注意**
微信小程序不支持 number 类型的参数，需传入 callback。



<!-- UTSAPIJSON.offKeyboardHeightChange.example -->



## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/keyboard/keyboard.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/keyboard/keyboard.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/keyboard/keyboard

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/keyboard/keyboard

>示例
```vue
<template>
	<view class="container uni-theme-root">
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

<script setup lang="ts">

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
	--keyboard-border-color: #ccc;
	--keyboard-text-color: #333;
	padding: 20px;
}
.input-section {
	margin-bottom: 20px;
}
.input-box {
	width: 100%;
	height: 40px;
	border: 1px solid var(--keyboard-border-color, #ccc);
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
	color: var(--keyboard-text-color, #333);
}

@media (prefers-color-scheme: dark) {
	.container {
		--keyboard-border-color: rgba(255, 255, 255, 0.1);
		--keyboard-text-color: #ffffff;
	}
}
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

