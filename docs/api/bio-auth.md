<!-- ## uni.startSoterAuthentication(options) @startsoterauthentication -->

::: sourceCode
## uni.startSoterAuthentication(options) @startsoterauthentication

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-authentication


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-authentication

:::

开始 SOTER 生物认证


### startSoterAuthentication 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **StartSoterAuthenticationOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| requestAuthModes | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 请求使用的可接受的生物认证方式 |
| challenge | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 挑战因子 |
| authContent | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 验证描述，即识别过程中显示在界面上的对话框提示内容 |
| success | (result: [StartSoterAuthenticationSuccess](#startsoterauthenticationsuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [StartSoterAuthenticationFail](#startsoterauthenticationfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### requestAuthModes 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| fingerPrint | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 指纹识别 |
| facial | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 人脸识别 |
| speech | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 声纹识别（暂未支持） |

#### StartSoterAuthenticationSuccess 的属性值 @startsoterauthenticationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 错误码 |
| authMode | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 生物认证方式 |
| resultJSON | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 在设备安全区域（TEE）内获得的本机安全信息以及本次认证信息 |
| resultJSONSignature | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 用SOTER安全密钥对 resultJSON 的签名(SHA256 with RSA/PSS, saltlen=20) |
| errMsg | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结果 |

#### authMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| fingerPrint | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 指纹识别 |
| facial | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 人脸识别 |
| speech | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 声纹识别（暂未支持） |

#### StartSoterAuthenticationFail 的属性值 @startsoterauthenticationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误描述信息 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| name | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| message | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.startSoterAuthentication.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.bioAuth.startSoterAuthentication)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/authentication.html#startsoterauthentication)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startSoterAuthentication&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startSoterAuthentication&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startSoterAuthentication&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startSoterAuthentication&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startSoterAuthentication)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startSoterAuthentication&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.checkIsSupportSoterAuthentication(options) @checkissupportsoterauthentication -->

::: sourceCode
## uni.checkIsSupportSoterAuthentication(options) @checkissupportsoterauthentication

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-authentication


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-authentication

:::

获取本机支持的 SOTER 生物认证方式


### checkIsSupportSoterAuthentication 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CheckIsSupportSoterAuthenticationOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [CheckIsSupportSoterAuthenticationSuccess](#checkissupportsoterauthenticationsuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [CheckIsSupportSoterAuthenticationFail](#checkissupportsoterauthenticationfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### CheckIsSupportSoterAuthenticationSuccess 的属性值 @checkissupportsoterauthenticationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| supportMode | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| errMsg | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结果 |

#### supportMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| fingerPrint | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 指纹识别 |
| facial | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 人脸识别 |
| speech | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 声纹识别（暂未支持） |

#### CheckIsSupportSoterAuthenticationFail 的属性值 @checkissupportsoterauthenticationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误描述信息 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| name | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| message | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.checkIsSupportSoterAuthentication.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.bioAuth.checkIsSupportSoterAuthentication)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/authentication.html#checkissupportsoterauthentication)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSupportSoterAuthentication.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=checkIsSupportSoterAuthentication&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=checkIsSupportSoterAuthentication&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=checkIsSupportSoterAuthentication&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=checkIsSupportSoterAuthentication&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=checkIsSupportSoterAuthentication)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=checkIsSupportSoterAuthentication&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.checkIsSoterEnrolledInDevice(options) @checkissoterenrolledindevice -->

::: sourceCode
## uni.checkIsSoterEnrolledInDevice(options) @checkissoterenrolledindevice

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-authentication


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-authentication

:::

获取设备内是否录入如指纹等生物信息


### checkIsSoterEnrolledInDevice 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CheckIsSoterEnrolledInDeviceOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| checkAuthMode | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 生物认证方式 |
| success | (result: [CheckIsSoterEnrolledInDeviceSuccess](#checkissoterenrolledindevicesuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [CheckIsSoterEnrolledInDeviceFail](#checkissoterenrolledindevicefail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### checkAuthMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| fingerPrint | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 指纹识别 |
| facial | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 人脸识别 |
| speech | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 声纹识别（暂未支持） |

#### CheckIsSoterEnrolledInDeviceSuccess 的属性值 @checkissoterenrolledindevicesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| isEnrolled | boolean | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 是否已录入信息 |
| errMsg | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 错误信息 |

#### CheckIsSoterEnrolledInDeviceFail 的属性值 @checkissoterenrolledindevicefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误描述信息 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| name | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| message | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.checkIsSoterEnrolledInDevice.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.bioAuth.checkIsSoterEnrolledInDevice)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/authentication.html#checkissoterenrolledindevice)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=checkIsSoterEnrolledInDevice&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=checkIsSoterEnrolledInDevice&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=checkIsSoterEnrolledInDevice&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=checkIsSoterEnrolledInDevice&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=checkIsSoterEnrolledInDevice)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=checkIsSoterEnrolledInDevice&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/bio-auth/bio-auth.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/bio-auth/bio-auth.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 
```uvue
<template>
  <view class="uni-container">
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <text class="uni-title-text">设备支持情况：</text>
      <text class="uni-subtitle-text">{{ supportStatus }}</text>
    </view>
    <view class="uni-common-mt">
      <text class="uni-title-text">认证结果：</text>
      <text class="uni-subtitle-text">{{ authResult }}</text>
    </view>
    <button @click="checkSupport" class="uni-common-mt">检查支持的认证方式</button>
    <button @click="checkAuth('fingerPrint')" class="uni-common-mt">检查指纹</button>
    <button @click="checkAuth('facial')" class="uni-common-mt">检查FaceID</button>
    <button @click="startAuth('fingerPrint')"  type="primary" class="uni-common-mt">指纹认证</button>
    <button @click="startAuth('facial')"  type="primary" class="uni-common-mt">FaceID认证</button>
  </view>
</template>

<script setup lang="uts">
const title = '生物认证'
const supportStatus = ref('未检查')
const authResult = ref('等待认证')

const checkSupport = () => {
  uni.checkIsSupportSoterAuthentication({
    success: (res) => {
      supportStatus.value = res.supportMode.length > 0 ?
        `支持: ${res.supportMode.join(', ')}` :
        '不支持任何生物认证'
    },
    fail: () => {
      supportStatus.value = '检查失败'
    }
  })
}

const checkAuth = (mode: string) => {
  uni.checkIsSoterEnrolledInDevice({
    checkAuthMode: mode,
    success: (res) => {
      console.log('res: ',res);
      authResult.value = `${mode === 'fingerPrint' ? '指纹' : 'FaceID'}${res.isEnrolled ? '已录入' : '未录入'}`
    },
    fail: (err) => {
      console.log('err: ',err);
      authResult.value = `${mode === 'fingerPrint' ? '指纹' : 'FaceID'}检查失败，${err}`
    }
  })
}

const startAuth = (mode: string) => {
  uni.startSoterAuthentication({
    requestAuthModes: [mode],
    challenge: '123456',
    authContent: `请用${mode === 'fingerPrint' ? '指纹' : 'FaceID'}解锁`,
    success: (res) => {
      console.log('res: ',res);
      authResult.value = `${res.authMode === 'fingerPrint' ? '指纹' : 'FaceID'}认证成功`
    },
    fail: (err) => {
      console.log('err: ',err);
      authResult.value = `${mode === 'fingerPrint' ? '指纹' : 'FaceID'}认证失败，${err}`
    }
  })
}
</script>

```

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

