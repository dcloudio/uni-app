## 配置

根据编译出来的`unpackage/resource/app-android/{appid}/www/manifest.json`中`app->distribute->modules`节点的模块配置，在下方的API与对应的库参照表中找到对应模块，完成以下配置。

注意：配置本地依赖库和配置线上依赖库都需要配置。

### 配置本地依赖库

将参照表中本地依赖库对应的aar拷贝到app模块的libs目录下。

### 配置线上依赖库

将参照表中的线上依赖库添加到app模块的build.gradle中。以`uni-network`为例，参考：

::: preview

> build.gradle

```groovy
	dependencies {
		implementation 'com.squareup.okhttp3:okhttp:3.12.12'
	}
```

> build.gradle.kts

```groovy
	dependencies {
		implementation("com.squareup.okhttp3:okhttp:3.12.12")
	}
```

:::

### 插件注册

将参照表中的`插件注册`内容拷贝到build.gradle的defaultConfig节点下。以`uni-previewImage`为例，参考：

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

::: warning 注意
如果多个模块需要配置同名的`buildConfigField`，不能分别声明（后声明的会覆盖先声明的），需要将这些配置的JSON合并到同一个数组中。以`uni-picker`为例，参考：
:::

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiComponentsRegister\",\"method\":\"register\"},{\"class\":\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"},{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

## API与对应的库参照表

### uni-createRequestPermissionListener

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-createRequestPermissionListener-release.aar</td></tr>
</table>

### uni-createWebviewContext

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-createWebviewContext-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.webkit:webkit:1.6.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.webkit:webkit:1.6.0")
}
```

:::

### uni-fileSystemManager

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-fileSystemManager-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'org.brotli:dec:0.1.2'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("org.brotli:dec:0.1.2")
}
```

:::

### uni-getNetworkType

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-getNetworkType-release.aar</td></tr>
</table>

### uni-installApk

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-installApk-release.aar</td></tr>
</table>

### uni-network

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-network-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.squareup.okhttp3:okhttp:3.12.12'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.squareup.okhttp3:okhttp:3.12.12")
}
```

:::

### uni-websocket

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-websocket-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.squareup.okhttp3:okhttp:3.12.12'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.squareup.okhttp3:okhttp:3.12.12")
}
```

:::

### uni-cloud-client

::: warning 注意
该模块仅支持 VDOM模式，蒸汽模式（Vapor）已移除，无需配置。
:::

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-cloud-client-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-network<br/>uni-storage<br/>uni-prompt<br/>uni-media<br/>uni-websocket<br/>uni-secure-network<br/>uni-modal<br/>uni-showLoading</td></tr>
</table>

### uni-media

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-media-release.aar<br/>nativeobj-preview-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-prompt<br/>uni-actionSheet</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.github.bumptech.glide:glide:4.9.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.activity:activity-ktx:1.9.2'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.github.bumptech.glide:glide:4.9.0")
    implementation("androidx.recyclerview:recyclerview:1.0.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.activity:activity-ktx:1.9.2")
}
```

:::

### uni-privacy

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-privacy-release.aar</td></tr>
</table>

### uni-getProvider

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-getProvider-release.aar</td></tr>
</table>

### uni-shareWithSystem

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-shareWithSystem-release.aar</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String[]', 'UTSHooksClassArray', '{"uts.sdk.modules.uniShareWithSystem.ShareWithSystemHook"}'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String[]", "UTSHooksClassArray", "{\"uts.sdk.modules.uniShareWithSystem.ShareWithSystemHook\"}")
}
```

:::

### uni-createInnerAudioContext

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-createInnerAudioContext-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.google.android.exoplayer:exoplayer-core:2.18.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.google.android.exoplayer:exoplayer-core:2.18.0")
}
```

:::

### uni-getBackgroundAudioManager

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-getBackgroundAudioManager-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-network</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.google.android.exoplayer:exoplayer-core:2.18.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.google.android.exoplayer:exoplayer-core:2.18.0")
}
```

:::

### uni-chooseLocation

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-chooseLocation-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-theme<br/>uni-getLocation<br/>uni-cloud-client<br/>uni-getLocation<br/>uni-map-tencent</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniChooseLocation.UniChooseLocationExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniChooseLocation.UniChooseLocationExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-actionSheet

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-actionSheet-release.aar</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniActionSheet.UniActionSheetExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniActionSheet.UniActionSheetExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-previewImage

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-previewImage-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-media<br/>uni-network<br/>uni-fileSystemManager<br/>uni-storage<br/>uni-prompt<br/>uni-modal<br/>uni-actionSheet</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-chooseMedia

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-chooseMedia-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-modal<br/>uni-actionSheet</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.activity:activity-ktx:1.9.2'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.activity:activity-ktx:1.9.2")
}
```

:::

### uni-arrayBufferToBase64

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-arrayBufferToBase64-release.aar</td></tr>
</table>

### uni-base64ToArrayBuffer

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-base64ToArrayBuffer-release.aar</td></tr>
</table>

### uni-sse

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-sse-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.squareup.okhttp3:okhttp-sse:3.12.12'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.squareup.okhttp3:okhttp-sse:3.12.12")
}
```

:::

### uni-modal

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-modal-release.aar</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniModal.UniModalExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniModal.UniModalExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-camera

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-camera-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-media</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.camera:camera-core:1.4.1'
    implementation 'androidx.camera:camera-camera2:1.4.1'
    implementation 'androidx.camera:camera-lifecycle:1.4.1'
    implementation 'androidx.camera:camera-view:1.4.1'
    implementation 'androidx.appcompat:appcompat:1.7.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.camera:camera-core:1.4.1")
    implementation("androidx.camera:camera-camera2:1.4.1")
    implementation("androidx.camera:camera-lifecycle:1.4.1")
    implementation("androidx.camera:camera-view:1.4.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
}
```

:::

**插件注册**

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniCamera.UniCameraElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniCamera.UniCameraElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniCamera.UniCameraExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniCamera.UniCameraExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-requestMerchantTransfer

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-requestMerchantTransfer-release.aar</td></tr>
</table>

**配置线上依赖库**

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

### uni-recorder

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-recorder-release.aar<br/>audio-mp3aac-release.aar</td></tr>
</table>

### uni-makePhoneCall

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-makePhoneCall-release.aar</td></tr>
</table>

### uni-clipboard

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-clipboard-release.aar</td></tr>
</table>

### uni-keyboard

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-keyboard-release.aar</td></tr>
</table>

### uni-openDocument

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-openDocument-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-fileSystemManager</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String[]', 'UTSHooksClassArray', '{"uts.sdk.modules.DCloudUniOpenDocument.UniOpenDocumentHookProxy"}'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String[]", "UTSHooksClassArray", "{\"uts.sdk.modules.DCloudUniOpenDocument.UniOpenDocumentHookProxy\"}")
}
```

:::

### uni-barcode-scanning

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-barcode-scanning-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-camera<br/>uni-getSystemInfo</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.camera:camera-core:1.4.1'
    implementation 'com.google.mlkit:barcode-scanning:17.2.0'
    implementation 'com.github.albfernandez:juniversalchardet:2.0.4'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.camera:camera-core:1.4.1")
    implementation("com.google.mlkit:barcode-scanning:17.2.0")
    implementation("com.github.albfernandez:juniversalchardet:2.0.4")
}
```

:::

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String[]', 'UTSHooksClassArray', '{"uts.sdk.modules.DCloudUniBarcodeScanning.AppHookProxy"}'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String[]", "UTSHooksClassArray", "{\"uts.sdk.modules.DCloudUniBarcodeScanning.AppHookProxy\"}")
}
```

:::

### uni-match-media

::: warning 注意
该模块仅支持 VDOM模式，蒸汽模式（Vapor）已移除，无需配置。
:::

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-match-media-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-getDeviceInfo</td></tr>
</table>

**插件注册**

HBuilderX 5.0及之后版本配置：

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"type\":\"customElement\",\"name\":\"match-media\",\"class\":\"uts.sdk.modules.DCloudUniMatchMedia.UniMatchMediaElementRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"type\\\":\\\"customElement\\\",\\\"name\\\":\\\"match-media\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniMatchMedia.UniMatchMediaElementRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-scanCode

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-scanCode-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-camera<br/>uni-barcode-scanning<br/>uni-media<br/>uni-getSystemInfo</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.camera:camera-core:1.4.1'
    implementation 'androidx.appcompat:appcompat:1.7.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.camera:camera-core:1.4.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
}
```

:::

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniScanCode.UniScanCodeExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniScanCode.UniScanCodeExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-rich-text

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库（蒸汽模式）</td><td>richtext-release.aar</td></tr>
  <tr><td>本地依赖库（VDOM模式）</td><td>uni-rich-text-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-arrayBufferToBase64<br/>uni-web-view</td></tr>
</table>

**插件注册（VDOM模式）**

HBuilderX 5.0之前版本配置：

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"type\":\"customElement\",\"name\":\"rich-text\",\"class\":\"uts.sdk.modules.DCloudUniRichText.UniRichTextElementRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"type\\\":\\\"customElement\\\",\\\"name\\\":\\\"rich-text\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniRichText.UniRichTextElementRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

HBuilderX 5.0及之后版本配置：

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniRichText.UniRichTextExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniRichText.UniRichTextExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

**蒸汽模式（Vapor）说明**

蒸汽模式（Vapor）下对应模块为 `uni-rich-text-native`，本地依赖库为 `richtext-release.aar`，无需插件注册。支持的 ABI 架构：`armeabi-v7a`、`arm64-v8a`、`x86`、`x86_64`。

### uni-live-player

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-live-player-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.qiniu:qplayer2-core:1.5.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.qiniu:qplayer2-core:1.5.0")
}
```

:::

**插件注册**

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniLivePlayer.UniLivePlayerElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniLivePlayer.UniLivePlayerElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniLivePlayer.UniLivePlayerExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLivePlayer.UniLivePlayerExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-live-pusher

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-live-pusher-release.aar<br/>pldroid-media-streaming-3.1.6.jar</td></tr>
  <tr><td>依赖的模块</td><td>uni-fileSystemManager<br/>uni-network</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.core:core:1.10.1'
    implementation 'android.arch.lifecycle:extensions:1.1.1'
    implementation 'com.qiniu:happy-dns:1.0.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.core:core:1.10.1")
    implementation("android.arch.lifecycle:extensions:1.1.1")
    implementation("com.qiniu:happy-dns:1.0.0")
}
```

:::

**插件注册**

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniLivePusher.UniLivePusherElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniLivePusher.UniLivePusherElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniLivePusher.UniLivePusherExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLivePusher.UniLivePusherExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-loading

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-loading-release.aar</td></tr>
</table>

**插件注册**

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniLoading.UniLoadingElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniLoading.UniLoadingElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniLoading.UniLoadingExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLoading.UniLoadingExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-showLoading

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-showLoading-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-theme<br/>uni-getSystemInfo<br/>uni-loading</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniShowLoading.UniShowLoadingExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniShowLoading.UniShowLoadingExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-web-view

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-web-view-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'androidx.webkit:webkit:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.1.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("androidx.webkit:webkit:1.6.0")
    implementation("androidx.appcompat:appcompat:1.1.0")
}
```

:::

**插件注册**

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniWebView.UniWebViewElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniWebView.UniWebViewElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniWebView.UniWebViewExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniWebView.UniWebViewExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-page-container(hx5.15起不需要配)

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-page-container-release.aar</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniPageContainer.UniPageContainerExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPageContainer.UniPageContainerExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-accelerometer

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-accelerometer-release.aar</td></tr>
</table>

### uni-authentication

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-authentication-release.aar</td></tr>
</table>

### uni-calendar

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-calendar-release.aar</td></tr>
</table>

### uni-compass

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-compass-release.aar</td></tr>
</table>

### uni-editor

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-editor-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-web-view</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniEditor.UniEditorExtApiComponentsRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniEditor.UniEditorExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-gyroscope

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-gyroscope-release.aar</td></tr>
</table>

### uni-memory

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-memory-release.aar</td></tr>
</table>

### uni-phoneContact

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-phoneContact-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-media<br/>uni-getAppBaseInfo<br/>uni-actionSheet</td></tr>
</table>

### uni-picker

::: warning 注意
该模块仅支持 VDOM模式，蒸汽模式（Vapor）已移除，无需配置。
:::

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-picker-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-theme<br/>uni-getSystemInfo<br/>uni-getAppBaseInfo<br/>uni-getDeviceInfo</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiComponentsRegister\",\"method\":\"register\"},{\"class\":\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"},{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPicker.UniPickerExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

### uni-screenBrightness

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-screenBrightness-release.aar</td></tr>
</table>

### uni-vibrate

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-vibrate-release.aar</td></tr>
</table>

### uni-openLocation

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-openLocation-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-actionSheet<br/>uni-getAppBaseInfo<br/>uni-theme<br/>uni-prompt<br/>uni-getSystemInfo<br/>uni-map-tencent</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '"[{\"class\":\"uts.sdk.modules.DCloudUniOpenLocation.UniOpenLocationExtApiPagesRegister\",\"method\":\"register\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniOpenLocation.UniOpenLocationExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

## 仅蒸汽模式（Vapor）支持的模块

以下模块仅支持 蒸汽模式（Vapor），VDOM模式不包含。

### uni-form

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-form-release.aar</td></tr>
  <tr><td>依赖的模块</td><td>uni-theme<br/>uni-getSystemInfo<br/>uni-dialogPage<br/>uni-event</td></tr>
</table>

**插件注册**

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniForm.UniInputElementRegister\"},{\"delegateClass\":\"uts.sdk.modules.DCloudUniForm.UniTextareaElementRegister\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniForm.UniInputElementRegister\\\"},{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniForm.UniTextareaElementRegister\\\"}]\"")
}
```

:::

### uni-requestSystemPermission

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-requestSystemPermission-release.aar</td></tr>
</table>

**配置线上依赖库**

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.github.getActivity:XXPermissions:18.63'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.github.getActivity:XXPermissions:18.63")
}
```

:::

<!--
### uni-uasm

<table>
  <tr><th>属性</th><th>内容</th></tr>
  <tr><td>本地依赖库</td><td>uni-uasm-release.aar</td></tr>
</table>
-->

各模块对应的API可参考文档[App端支持的内置模块列表](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#utsmodules)

## 其他模块

### canvas

**本地依赖库**

|模式							|名称														|
|:--							|:--														|
|蒸汽模式（Vapor）							|uni-canvas-dom2-release.aar<br/>uni-canvas-component-release.aar	|
|VDOM模式							|uni-canvas-release.aar<br/>uni-canvas-component-release.aar	|

**组件注册**

将以下内容添加到主模块的build.gradle，详见[根据configjson配置应用](../../use/androiduts.md#utscomponents)。

::: preview

> build.gradle（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSComponents', '"[{\"delegateClass\":\"uts.sdk.modules.DCloudUniCanvasDom2.UniCanvasElementRegister\"}]"'
}
```

> build.gradle.kts（蒸汽模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSComponents", "\"[{\\\"delegateClass\\\":\\\"uts.sdk.modules.DCloudUniCanvasDom2.UniCanvasElementRegister\\\"}]\"")
}
```

> build.gradle（VDOM模式）

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"canvas\\\",\\\"class\\\":\\\"io.dcloud.canvas.CanvasComponent\\\",\\\"node\\\":\\\"io.dcloud.canvas.UniCanvasElementImpl\\\"}]\""
}
```

> build.gradle.kts（VDOM模式）

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"canvas\\\",\\\"class\\\":\\\"io.dcloud.canvas.CanvasComponent\\\",\\\"node\\\":\\\"io.dcloud.canvas.UniCanvasElementImpl\\\"}]\"")
}
```

:::

[uni-ad](/native/modules/android/uni-ad.md)

[uni-video](/native/modules/android/uni-video.md)

[uni-push](/native/modules/android/uni-push.md)

[uni-facialRecognitionVerify](/native/modules/android/uni-facialRecognitionVerify.md)

[uni-verify](/native/modules/android/uni-verify.md)

[uni-payment](/native/modules/android/uni-payment.md)

[uni-map-tencent](/native/modules/android/uni-map-tencent.md)

[uni-getLocation](/native/modules/android/uni-getLocation.md)

[uni-oauth](native/modules/android/uni-oauth.md)

[uni-share](native/modules/android/uni-share.md)
