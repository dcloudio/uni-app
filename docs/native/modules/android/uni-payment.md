## uni-payment

### 微信支付

项目应用下的build.gradle添加：

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.tencent.mm.opensdk:wechat-sdk-android:6.8.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.tencent.mm.opensdk:wechat-sdk-android:6.8.0")
}
```

:::

|本地依赖库名称									|
|:--											|
|uni-payment-release.aar	|
|uni-payment-wxpay-release.aar	|

#### 插件注册

以下配置在 VDOM 和 蒸汽模式（Vapor）下均适用，将内容添加到主模块的build.gradle。

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '\"[{\\\"name\\\":\\\"wxpay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentWxpay.UniPaymentWxpayProviderImpl\\\"}]\"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"wxpay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentWxpay.UniPaymentWxpayProviderImpl\\\"}]\"")
}
```

:::

蒸汽模式（Vapor）还需依赖 `uni-event`。

### 支付宝支付

项目应用下的build.gradle添加：

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.alipay.sdk:alipaysdk-android:15.8.17'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.alipay.sdk:alipaysdk-android:15.8.17")
}
```

:::

|本地依赖库名称					|
|:--							|
|uni-payment-release.aar		|
|uni-payment-alipay-release.aar	|


将本地依赖库复制到app项目的libs下

#### 插件注册

以下配置在 VDOM 和 蒸汽模式（Vapor）下均适用，将内容添加到主模块的build.gradle。

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '\"[{\\\"name\\\":\\\"alipay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentAlipay.UniPaymentAlipayProviderImpl\\\"}]\"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"alipay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentAlipay.UniPaymentAlipayProviderImpl\\\"}]\"")
}
```

:::


### 注意

1. 如果已经存在了`UTSRegisterProviders`只需要将二者合并即可，参考：
```groovy
'\"[{\\\"name\\\":\\\"alipay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentAlipay.UniPaymentAlipayProviderImpl\\\"},{\\\"name\\\":\\\"wxpay\\\",\\\"service\\\":\\\"payment\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPaymentWxpay.UniPaymentWxpayProviderImpl\\\"}]\"'
```