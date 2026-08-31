## uni-ad

### aar说明

|广告SDK			|aar依赖																																										|线上依赖																																																																							|仓库地址																								|说明						|
|:--			|:--																																										|:--																																																																							|-																									|:--						|
|基础模块			|uni-ad-release.aar（VDOM模式）<br/>uni-ad-dom2-release.aar（蒸汽模式）<br/>uni-ad-splash-release.aar<br/>uniad-native-release.aar																								|-																																																																								|-																									|广告基础模块及开屏广告，必选	|
|优量汇			|uniad-gdt-release.aar<br/>GDTSDK.unionNormal.aar																															|-																																																																								|-																									|可选，国内广告				|
|GroMore		|uniad-gromore-release.aar<br/>open_ad_sdk.aar																																|-																																																																								|-																									|可选，国内广告				|
|快手			|uniad-ks-release.aar<br/>ks_adsdk-ad.aar																																	|-																																																																								|-																									|可选，国内广告				|
|百度			|uniad-bd-release.aar<br/>Baidu_MobAds_SDK.aar																																|-																																																																								|-																									|可选，国内广告				|
|sigmob			|uniad-sgm-release.aar<br/>windAd.aar<br/>wind-common.aar																													|-																																																																								|-																									|可选，国内广告				|
|华为			|uniad-hw-release.aar																																						|com.huawei.hms:ads-lite:13.4.66.300																																																															|maven {url 'https://developer.huawei.com/repo/?ha_source=Dcloud&ha_sourceId=89000448'}				|可选，国内广告				|
|章鱼			|octopus_ad_sdk_2.6.5.18.aar<br/>uniad-zy-release.aar																														|-																																																																								|-																									|可选，国内广告				|
|倍孜			|beizi_fusion_sdk_5.5.0.3.aar<br/>uniad_bz-adapter-5.5.0.1.aar																												|-																																																																								|-																									|可选，国内广告				|
|泛连			|Funlink_29003_20260507_release.aar<br/>funlink_29104_20260428_release.aar<br/>Funlink_adapter_fl_29003_20260507_release.aar<br/>Funlink_adapter_uniad_2.9.0_77278214.aar	|-																																																																								|-																									|可选，国内广告				|
|华夏乐游			|adalliance_adn_sdk.4.7.6.aar<br/>uniad-custom-yt-4.7.5.aar																													|com.squareup.okhttp3:okhttp:3.12.0<br/>com.squareup.okhttp3:logging-interceptor:3.12.0<br/>com.google.code.gson:gson:2.8.0<br/>com.github.bumptech.glide:glide:4.7.1<br/>commons-codec:commons-codec:1.15																						|-																									|可选，国内广告				|
|佳投			|advista-1.9.2-release.aar<br/>advista-uniad-adapter-1.0.4-release.aar																										|androidx.appcompat:appcompat:1.6.1<br/>"com.google.android.material:material:1.10.0"<br/>"androidx.activity:activity:1.8.0<br/>androidx.constraintlayout:constraintlayout:2.1.4																												|-																									|可选，国内广告				|
|旺脉			|mm_adapter_uniad_1.0.2.aar<br/>wm_ad_sdk_7.9.17.19_android.aar																												|androidx.appcompat:appcompat:1.2.0<br/>com.google.android.material:material:1.10.0<br/>androidx.activity:activity:1.8.0<br/>com.android.support.constraint:constraint-layout:2.0.4<br/>com.squareup.okhttp3:okhttp:4.12.0<br/>com.squareup.okio:okio:3.6.0<br/>com.google.code.gson:gson:2.8.5	|-																									|可选，国内广告				|
|google AdMob	|uniad-google-release.aar																																					|androidx.constraintlayout:constraintlayout:2.1.3<br/>com.google.android.gms:play-services-ads:23.3.0																																															|-																									|可选，国际广告				|
|Pangle			|admob-pangle-adapter.aar<br/>uniad-pangle-release.aar<br/>open_ad_sdk_pg.aar																								|com.google.android.gms:play-services-ads-identifier:18.0.0																																																										|-																									|可选，国际广告				|
|InMobi			|-																																											|com.google.ads.mediation:inmobi:10.7.5.0																																																														|-																									|可选，国际广告				|
|ironSource		|-																																											|com.google.ads.mediation:ironsource:8.2.1.0																																																													|maven {url = uri("https://android-sdk.is.com/")}													|可选，国际广告				|
|Liftoff		|-																																											|com.google.ads.mediation:vungle:7.4.0.1																																																														|-																									|可选，国际广告				|
|Mintegral		|-																																											|com.google.ads.mediation:mintegral:16.8.41.0																																																													|maven {url = uri("https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea")}	|可选，国际广告				|
|Unity Ads		|-																																											|com.unity3d.ads:unity-ads:4.12.1<br/>com.google.ads.mediation:unity:4.12.2.0																																																					|-																									|可选，国际广告				|

广告需要根据[uni-AD后台](https://uniad.dcloud.net.cn/)按照广告开通情况将对应的广告渠道aar拷贝到libs下。**基础模块必须添加。**

***
注意：国际广告需要在[uni-AD后台](https://uniad.dcloud.net.cn/)后台审核通过之后才可以集成。审核通过之后可以连续客服获取国际广告SDK及配置。
***

### 添加联盟ID

在主项目的build.gradle的下添加联盟ID：

::: preview

> build.gradle

```groovy
defaultConfig {
    ...
    buildConfigField "String", "DCLOUDUnionId", "\"联盟ID\""
}
```

> build.gradle.kts

```groovy
defaultConfig {
    ...
    buildConfigField("String", "DCLOUDUnionId", "\"联盟ID\"")
}
```

:::

***
说明：联盟ID位于：[uni-AD后台](https://uniad.dcloud.net.cn/)->首页->联盟ID
***

### 组件注册

将以下内容添加到主模块的build.gradle，详见[根据configjson配置应用](../../use/androiduts.md#utscomponents)。

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSMethodRegister', '"uts.sdk.modules.DCloudUniAdDom2.UniUTSMethodRegister"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSMethodRegister", "\"uts.sdk.modules.DCloudUniAdDom2.UniUTSMethodRegister\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterComponents", '\"[{\\\"name\\\":\\\"ad\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniAd.AdComponent\\\"}]\"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"ad\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniAd.AdComponent\\\"}]\"")
}
```

:::

