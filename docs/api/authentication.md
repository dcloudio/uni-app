::: sourceCode
## uni.startSoterAuthentication(options) @startsoterauthentication

> issues: https://issues.dcloud.net.cn/?mid=api.device.authentication.startSoterAuthentication


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-authentication

:::

开始  生物认证

### startSoterAuthentication 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=startSoterAuthentication&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.08","5.08","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StartSoterAuthenticationOptions** | 是 | Web: x; 支付宝小程序: x | 开始生物认证参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| requestAuthModes | Array&lt;string&gt; | 是 | Web: x; 支付宝小程序: x | 请求使用的可接受的生物认证方式 |
| challenge | string | 否 | Web: x; 支付宝小程序: x | 挑战因子 |
| authContent | string | 否 | Web: x; 支付宝小程序: x | 验证描述，即识别过程中显示在界面上的对话框提示内容 |
| success | (result: [StartSoterAuthenticationSuccess](#startsoterauthenticationsuccess-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用成功的回调函数 |
| fail | (result: [StartSoterAuthenticationFail](#startsoterauthenticationfail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: [StartSoterAuthenticationSuccess](#startsoterauthenticationsuccess-values) \| [StartSoterAuthenticationFail](#startsoterauthenticationfail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### requestAuthModes 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "fingerPrint" | Web: x; 支付宝小程序: x | 指纹识别 |
| "facial" | Web: x; 支付宝小程序: x | 人脸识别 |
| "speech" | Web: x; 支付宝小程序: x | 声纹识别（暂未支持） |

#### StartSoterAuthenticationSuccess 的属性值 @startsoterauthenticationsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x | 错误码 |
| authMode | string | 是 | Web: x; 支付宝小程序: x | 生物认证方式 |
| resultJSON | string | 否 | Web: x; 支付宝小程序: x | 在设备安全区域（TEE）内获得的本机安全信息以及本次认证信息 |
| resultJSONSignature | string | 否 | Web: x; 支付宝小程序: x | 用安全密钥对 resultJSON 的签名(SHA256 with RSA/PSS, saltlen=20) |
| errMsg | string | 是 | Web: x; 支付宝小程序: x | 接口调用结果 |

#### authMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "fingerPrint" | Web: x; 支付宝小程序: x | 指纹识别 |
| "facial" | Web: x; 支付宝小程序: x | 人脸识别 |
| "speech" | Web: x; 支付宝小程序: x | 声纹识别（暂未支持） |

#### StartSoterAuthenticationFail 的属性值 @startsoterauthenticationfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x | 统一错误码 |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |






<!-- UTSAPIJSON.startSoterAuthentication.example -->



### 注意
<md-hperm permissions="ohos.permission.ACCESS_BIOMETRIC" />

::: sourceCode
## uni.checkIsSupportSoterAuthentication(options) @checkissupportsoterauthentication

> issues: https://issues.dcloud.net.cn/?mid=api.device.authentication.checkIsSupportSoterAuthentication


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-authentication

:::

获取本机支持的  生物认证方式

### checkIsSupportSoterAuthentication 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSupportSoterAuthentication.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=checkIsSupportSoterAuthentication&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.08","5.08","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CheckIsSupportSoterAuthenticationOptions** | 是 | Web: x; 支付宝小程序: x | 开始生物认证的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [CheckIsSupportSoterAuthenticationSuccess](#checkissupportsoterauthenticationsuccess-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用成功的回调函数 |
| fail | (result: [CheckIsSupportSoterAuthenticationFail](#checkissupportsoterauthenticationfail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: [CheckIsSupportSoterAuthenticationSuccess](#checkissupportsoterauthenticationsuccess-values) \| [CheckIsSupportSoterAuthenticationFail](#checkissupportsoterauthenticationfail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### CheckIsSupportSoterAuthenticationSuccess 的属性值 @checkissupportsoterauthenticationsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| supportMode | Array&lt;string&gt; | 是 | Web: x; 支付宝小程序: x | 支持的生物认证方式 |
| errMsg | string | 是 | Web: x; 支付宝小程序: x | 接口调用结果 |

#### supportMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "fingerPrint" | Web: x; 支付宝小程序: x | 指纹识别 |
| "facial" | Web: x; 支付宝小程序: x | 人脸识别 |
| "speech" | Web: x; 支付宝小程序: x | 声纹识别（暂未支持） |

#### CheckIsSupportSoterAuthenticationFail 的属性值 @checkissupportsoterauthenticationfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x | 统一错误码 |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |






<!-- UTSAPIJSON.checkIsSupportSoterAuthentication.example -->



### 注意
<md-hperm permissions="ohos.permission.ACCESS_BIOMETRIC" />

::: sourceCode
## uni.checkIsSoterEnrolledInDevice(options) @checkissoterenrolledindevice

> issues: https://issues.dcloud.net.cn/?mid=api.device.authentication.checkIsSoterEnrolledInDevice


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-authentication

:::

获取设备内是否录入如指纹等生物信息


### checkIsSoterEnrolledInDevice 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=checkIsSoterEnrolledInDevice&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","5.08","5.08","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CheckIsSoterEnrolledInDeviceOptions** | 是 | Web: x; 支付宝小程序: x | 获取本机支持的生物认证方式的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| checkAuthMode | string | 是 | Web: x; 支付宝小程序: x | 生物认证方式 |
| success | (result: [CheckIsSoterEnrolledInDeviceSuccess](#checkissoterenrolledindevicesuccess-values)) => void | 否 | Web: x; 支付宝小程序: x | 支持的生物认证方式 |
| fail | (result: [CheckIsSoterEnrolledInDeviceFail](#checkissoterenrolledindevicefail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: [CheckIsSoterEnrolledInDeviceSuccess](#checkissoterenrolledindevicesuccess-values) \| [CheckIsSoterEnrolledInDeviceFail](#checkissoterenrolledindevicefail-values)) => void | 否 | Web: x; 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### checkAuthMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "fingerPrint" | Web: x; 支付宝小程序: x | 指纹识别 |
| "facial" | Web: x; 支付宝小程序: x | 人脸识别 |
| "speech" | Web: x; 支付宝小程序: x | 声纹识别（暂未支持） |

#### CheckIsSoterEnrolledInDeviceSuccess 的属性值 @checkissoterenrolledindevicesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| isEnrolled | boolean | 是 | Web: x; 支付宝小程序: x | 是否已录入信息 |
| errMsg | string | 是 | Web: x; 支付宝小程序: x | 错误信息 |

#### CheckIsSoterEnrolledInDeviceFail 的属性值 @checkissoterenrolledindevicefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x | 统一错误码 |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |






<!-- UTSAPIJSON.checkIsSoterEnrolledInDevice.example -->



### 注意
<md-hperm permissions="ohos.permission.ACCESS_BIOMETRIC" />

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/authentication/authentication.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/authentication/authentication.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/authentication/authentication
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">生物认证</text>
		<text class="notice">低版本安卓仅支持指纹，高版本 Android 指纹和人脸会弹出统一认证框。</text>

		<text class="uni-h3">设备支持情况</text>
		<text class="log-text">{{ supportStatus }}</text>
		<button class="margin-v" @tap="checkSupport">检查支持的认证方式</button>

		<text class="uni-h3">录入状态检查</text>
		<button class="margin-v" @tap="checkAuth('fingerPrint')">检查指纹</button>
		<button class="margin-v" @tap="checkAuth('facial')">检查人脸识别</button>

		<text class="uni-h3">认证结果</text>
		<text class="log-text">{{ authResult }}</text>
		<button class="margin-v" @tap="startAuth('fingerPrint')" type="primary">指纹认证</button>
		<button class="margin-v" @tap="startAuth('facial')" type="primary">人脸认证</button>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="ts">

type AuthMode = 'fingerPrint' | 'facial'

const supportStatus = ref('未检查')
const authResult = ref('等待认证')

const getModeLabel = (mode: AuthMode): string => {
  return mode == 'fingerPrint' ? '指纹' : '人脸'
}

const checkSupport = () => {
  uni.checkIsSupportSoterAuthentication({
    success: (res) => {
      supportStatus.value = res.supportMode.length > 0 ?
        `支持: ${res.supportMode.join(', ')}` :
        '不支持任何生物认证'
    },
    fail: (err) => {
			console.log('err: ', err);
      supportStatus.value = `检查失败：[${err.errCode}]${err.errMsg}`
    }
  })
}

const checkAuth = (mode: AuthMode) => {
  uni.checkIsSoterEnrolledInDevice({
    checkAuthMode: mode,
    success: (res) => {
      // console.log('res: ',res);
      authResult.value = `${getModeLabel(mode)}${res.isEnrolled ? '已录入' : '未录入'}`
    },
    fail: (err) => {
      console.log('err: ', err);
      authResult.value = `${getModeLabel(mode)}检查失败：[${err.errCode}]${err.errMsg}`
    }
  })
}

const startAuth = (mode: AuthMode) => {
  uni.startSoterAuthentication({
    requestAuthModes: [mode],
    challenge: '123456', // 正常逻辑应该由服务器生成挑战因子
    authContent: `请用${getModeLabel(mode)}解锁`,
    success: (res) => {
      // console.log('res: ',res);
      authResult.value = `${getModeLabel(res.authMode as AuthMode)}认证成功`
    },
    fail: (err) => {
      console.log('err: ',err);
      authResult.value = `${getModeLabel(mode)}认证失败，[${err.errCode}]${err.errMsg}`
    }
  })
}
</script>

<style>
  .margin-v {
    margin: 5px 0;
  }

	.log-text {
    padding: 10px;
		font-size: 14px;
    border: 1px solid #ccc;
  }

	.notice {
	  color: #550000;
		font-size: 14px;
		font-style: italic;
	}
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |
