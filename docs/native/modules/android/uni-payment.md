## uni-payment

### 微信支付

项目应用下的build.gradle添加：

```
dependencies {
    implementation 'com.tencent.mm.opensdk:wechat-sdk-android:6.8.0'
}
```

|本地依赖库名称									|
|:--											|
|uni-payment-release.aar	|
|uni-payment-wxpay-release.aar	|

#### 插件注册

将以下内容添加到主模块的build.gradle。

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '\"[{\\\"name\\\":\\\"wxpay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentWxpay.UniPaymentWxpayProviderImpl\\\"}]\"'
}
```

### 支付宝支付

项目应用下的build.gradle添加：

```
dependencies {
    implementation 'com.alipay.sdk:alipaysdk-android:15.8.17'
}
```

|本地依赖库名称					|
|:--							|
|uni-payment-release.aar		|
|uni-payment-alipay-release.aar	|


将本地依赖库复制到app项目的libs下

#### 插件注册

将以下内容添加到主模块的build.gradle。

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '\"[{\\\"name\\\":\\\"alipay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentAlipay.UniPaymentAlipayProviderImpl\\\"}]\"'
}
```


### 注意

1. 如果已经存在了`UTSRegisterProviders`只需要将二者合并即可，参考：
```groovy
'\"[{\\\"name\\\":\\\"alipay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentAlipay.UniPaymentAlipayProviderImpl\\\"},{\\\"name\\\":\\\"wxpay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentWxpay.UniPaymentWxpayProviderImpl\\\"}]\"'
```