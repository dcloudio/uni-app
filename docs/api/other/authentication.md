### 生物认证说明

生物认证，又称活体检测。它包含指纹识别、人脸识别这两部分。即通过人体身体特征来进行身份认证识别。

各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。（APP端自`HBuilderX 2.3.9-alpha`开始支持生物认证）

### uni.startSoterAuthentication(OBJECT)

开始 SOTER 生物认证。

**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|头条小程序	|QQ小程序	|
|:-	|:-	|:-					|:-						|:-					|:-					|:-				|
|√（HBuilderX 2.3.9+）	|x	|√					|x						|x					|x					|x				|

**OBJECT参数说明**

|属性							|类型			|默认值	|必填	|说明																																																																																																		| 平台差异说明	|
|:-								|:-				|:-			|:-		|:-																																																																																																			|:-							|
|requestAuthModes	|Array		|				|是		|请求使用的可接受的生物认证方式																																																																																					|APP、微信小程序|
|challenge				|String		|				|是		|挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键识别信息，将作为 resultJSON 的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。	|微信小程序			|
|authContent			|String		|''			|否		|验证描述，即识别过程中显示在界面上的对话框提示内容																																																																											|APP、微信小程序|
|success					|Function	|				|否		|接口调用成功的回调函数																																																																																									|								|
|fail							|Function	|				|否		|接口调用失败的回调函数																																																																																									|								|
|complete					|Function	|				|否		|接口调用结束的回调函数（调用成功、失败都会执行）																																																																												|								|

**OBJECT.requestAuthModes说明**

|值					|说明			|
|:-					|:-				|
|fingerPrint|指纹识别	|
|facial			|人脸识别	|

**OBJECT.success返回值说明**

|属性								|类型		|说明																																																																						|平台差异说明		|
|:-									|:-			|:-																																																																							|:-							|
|authMode						|string	|生物认证方式																																																																		|APP、微信小程序|
|resultJSON					|string	|在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）。具体说明见下文							|微信小程序			|
|resultJSONSignature|string	|用SOTER安全密钥对 resultJSON 的签名(SHA256 with RSA/PSS, saltlen=20)																																						|微信小程序			|
|errCode						|number	|错误码																																																																					|								|
|errMsg							|string	|错误信息																																																																				|								|

**resultJSON说明**

此数据为设备TEE中，将传入的challenge和TEE内其他安全信息组成的数据进行组装而来的JSON，对下述字段的解释如下表。例子如下：

|字段名	|说明																																											|
|:-			|:-																																												|
|raw		|调用者传入的challenge																																		|
|fid		|（仅Android支持）本次生物识别认证的生物信息编号（如指纹识别则是指纹信息在本设备内部编号）|
|counter|防重放特征参数																																						|
|tee_n	|TEE名称（如高通或者trustonic等）																													|
|tee_v	|TEE版本号																																								|
|fp_n		|指纹以及相关逻辑模块提供商（如FPC等）																										|
|fp_v		|指纹以及相关模块版本号																																		|
|cpu_id	|机器唯一识别ID																																						|
|uid		|概念同Android系统定义uid，即应用程序编号																									|

**错误码说明**

|错误码	|错误码说明																				|
|:-			|:-																								|
|0			|识别成功																					|
|90001	|本设备不支持生物认证														|
|90002	|用户未授权使用该生物认证接口											|
|90003	|请求使用的生物认证方式不支持											|
|90004	|未传入challenge或challenge长度过长（最长512字符）|
|90005	|auth_content长度超过限制（最长42个字符）					|
|90007	|内部错误																					|
|90008	|用户取消授权																			|
|90009	|识别失败																					|
|90010	|重试次数过多被冻结																|
|90011	|用户未录入所选识别方式														|

### uni.checkIsSupportSoterAuthentication(OBJECT)

获取本机支持的 SOTER 生物认证方式

**OBJECT参数说明**

|属性			|类型			|默认值	|必填	|说明																							|
|:-				|:-				|:-			|:-		|:-																								|
|success	|function	|				|否		|接口调用成功的回调函数														|
|fail			|function	|				|否		|接口调用失败的回调函数														|
|complete	|function	|				|否		|接口调用结束的回调函数（调用成功、失败都会执行）	|

**OBJECT.success返回值说明**

|属性				|类型	|说明																		|
|:-					|:-		|:-																			|
|supportMode|Array|该设备支持的可被SOTER识别的生物识别方式|

### uni.checkIsSoterEnrolledInDevice(OBJECT)

获取设备内是否录入如指纹等生物信息的接口

**OBJECT参数说明**

|属性					|类型			|默认值	|必填	|说明																							|
|checkAuthMode|string		|				|是		|认证方式																					|
|success			|function	|				|否		|接口调用成功的回调函数														|
|fail					|function	|				|否		|接口调用失败的回调函数														|
|complete			|function	|				|否		|接口调用结束的回调函数（调用成功、失败都会执行）	|

**OBJECT.checkAuthMode合法值**

|值					|说明			|
|:-					|:-				|
|fingerPrint|指纹识别	|
|facial			|人脸识别	|

**OBJECT.success返回值说明**

|属性				|类型		|说明						|
|:-					|:-			|:-							|
|isEnrolled	|boolean|是否已录入信息	|
|errMsg			|string	|错误信息				|

#### 代码示例

```html

<template>
	<view class="content">
		<button type="primary" @click="checkIsSupportSoterAuthentication">检查支持的认证方式</button>
		<button type="primary" @click="checkIsSoterEnrolledInDeviceFingerPrint">检查是否录入指纹</button>
		<button type="primary" @click="checkIsSoterEnrolledInDeviceFaceID">检查是否录入FaceID</button>
		<button type="primary" @click="startSoterAuthenticationFingerPrint">开始指纹认证</button>
		<button type="primary" @click="startSoterAuthenticationFaceID">开始FaceID认证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			checkIsSupportSoterAuthentication() {
				uni.checkIsSupportSoterAuthentication({
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			checkIsSoterEnrolledInDeviceFingerPrint() {
				uni.checkIsSoterEnrolledInDevice({
					checkAuthMode: 'fingerPrint',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			checkIsSoterEnrolledInDeviceFaceID() {
				uni.checkIsSoterEnrolledInDevice({
					checkAuthMode: 'facial',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			startSoterAuthenticationFingerPrint() {
				uni.startSoterAuthentication({
					requestAuthModes: ['fingerPrint'],
					challenge: '123456',
					authContent: '请用指纹解锁',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			startSoterAuthenticationFaceID() {
				uni.startSoterAuthentication({
					requestAuthModes: ['facial'],
					challenge: '123456',
					authContent: '请用FaceID解锁',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
					},
					complete(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	button {
		width: 200px;
		margin: 20px auto;
	}
</style>


```

#### 注意事项

- APP端自`HBuilderX 2.3.9-alpha`开始支持生物认证
- 微信小程序如果使用腾讯云的SDK，可参考[网友分享](https://segmentfault.com/a/1190000020102601)
- 支付宝小程序只支持人脸识别，[规范详情](https://docs.alipay.com/mini/api/facecapture)
- 百度小程序只支持人脸识别，[规范详情](https://smartprogram.baidu.com/docs/develop/api/ai_face/#swan-ai-faceDetect/)
