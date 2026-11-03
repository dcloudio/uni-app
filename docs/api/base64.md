<!-- ## uni.base64ToArrayBuffer(base64) @base64toarraybuffer -->

::: sourceCode
## uni.base64ToArrayBuffer(base64) @base64toarraybuffer

> issues: https://issues.dcloud.net.cn/?mid=api.base.base64.base64ToArrayBuffer


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-base64ToArrayBuffer

:::

将 Base64 字符串转成 ArrayBuffer 对象


### base64ToArrayBuffer 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.51; iOS: 4.61; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| base64 | string | 是 | 


### 返回值 

| 类型 |
| :- |
| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) |
 




<!-- ## uni.arrayBufferToBase64(arrayBuffer) @arraybuffertobase64 -->

::: sourceCode
## uni.arrayBufferToBase64(arrayBuffer) @arraybuffertobase64

> issues: https://issues.dcloud.net.cn/?mid=api.base.base64.arrayBufferToBase64


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-arrayBufferToBase64

:::

将 ArrayBuffer 对象转成 Base64 字符串


### arrayBufferToBase64 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.51; iOS: 4.61; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | 


### 返回值 

| 类型 |
| :- |
| string |
 




## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/base64/base64.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/base64/base64.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/base64/base64

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/base64/base64

>示例
```vue
<template>
	<view>
		<view>
			<button class="btnstyle" type="primary" @tap="arrayBufferToBase64"> arrayBufferToBase64 </button>
			<button class="btnstyle" type="primary" @tap="base64ToArrayBuffer"> base64ToArrayBuffer </button>
		</view>
	</view>
</template>

<script setup lang="ts">
	type DataType = {
		arrayBufferToBase64Res: string;
		base64ToArrayBufferRes: string;
	}

	const data = reactive({
		arrayBufferToBase64Res: '',
		base64ToArrayBufferRes: ''
	} as DataType)

	const arrayBufferToBase64 = () => {
		const arraybuffer = new ArrayBuffer(3)
		const uint8 = new Uint8Array(arraybuffer)
		uint8.set([11, 22, 33])
		const base64 = uni.arrayBufferToBase64(arraybuffer)
		console.log(base64) //CxYh
		data.arrayBufferToBase64Res = base64
		uni.showToast({
			title: data.arrayBufferToBase64Res
		})
	}

	const base64ToArrayBuffer = () => {
		const base64 = 'CxYh'
		const arrayBuffer = uni.base64ToArrayBuffer(base64)
		const uint8 = new Uint8Array(arrayBuffer)
		console.log(uint8.toString())//11, 22, 33
		data.base64ToArrayBufferRes = uint8.toString()
		uni.showToast({
			title: data.base64ToArrayBufferRes
		})
	}

	defineExpose({
		data,
		arrayBufferToBase64,
		base64ToArrayBuffer
	})
</script>

<style>
	.logo {
		height: 100px;
		width: 100px;
		margin: 100px auto 25px auto;
	}

	.title {
		font-size: 18px;
		color: #8f8f94;
		text-align: center;
	}

  .btnstyle {
  	margin: 4px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

