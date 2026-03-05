# 云打包

::: tip 离线打包
离线打包需在原生工程环境中进行配置
- Android平台离线打包参考[Android平台原生工程配置](../native/use/android.md)
- iOS平台离线打包参考[iOS平台原生工程配置](../native/use/ios.md)
:::

在HBuilderX中开发完成后，提交到云端打包生成发布安装包。
可点击菜单 “发行” -> “App-Android/iOS-云打包” 打开 “App打包”界面：

![](https://web-ext-storage.dcloud.net.cn/doc/app/cloudpackage/package.png)

## Android平台

云端打包需配置包名、证书以及安装包格式信息。

### Android包名
在Android中，包名（Package Name）是应用的唯一标识符。采用反写域名命名规则（如com.xxx.xxx形式），可以包含大写或小写字母、数字和下划线（“_”）。不过，各个名称部分只能以字母开头。

### 证书类型
#### 云证书 @servercert
由DCloud服务器根据你的appid自动生成证书，生成证书后可登录[DCloud开发者中心](https://dev.dcloud.net.cn/)查看证书详情或下载证书文件。

云证书的优势是开发方便。但在发布商业应用时，商业组织往往会分离开发证书和发布证书，发布证书仅少数人掌管。

DCloud建议开发阶段使用云证书，开发者打包出apk后，交给掌管发布证书的人员使用发布证书自行重签，再上架应用商店。

**注意**
- DCloud不对开发者证书管理行为不规范引发的问题负责
- 服务器生成的证书会自动填写证书信息，不支持自定义证书信息，有效期为100年

#### 自选证书 @customcert
开发者如果已经有自己的安卓签名证书，可直接使用。
如果没有证书，使用JDK的keytool工具生成一个，不像Apple证书那样收费，制作Android证书没有费用，参考[Android平台签名证书(.keystore)生成指南](https://ask.dcloud.net.cn/article/35777)。

在 “证书类型” 中勾选 “云端证书”：

![](https://web-ext-storage.dcloud.net.cn/doc/app/cloudpackage/package-android.png)

- 证书库文件
	选择要使用的证书库文件
- 证书库密码
	输入访问证书库的密码
- 证书别名
	选择用于签名的证书别名
- 证书密码
	输入访问选择别名对应证书的密码

**注意**
- 证书别名使用英文字母或数字，避免使用中文
- 提交云端打包后，打包机会立即删除的证书，不会保存或泄露证书，请放心使用

### 打包格式

> HBuilder4.31版本新增支持

#### APK安装包
生成apk格式的安装包，国内应用市场支持使用此格式。

#### AAB安装包（HBuilderX4.31+支持）@aab
生成aab格式的安装包，Google Play 应用市场要求必须使用此格式。勾选此格式固定渠道为“google”。

**注意**
- aab格式不支持通过adb命令安装到手机，可参考[本地离线打包支持Android App Bundle (AAB)](https://ask.dcloud.net.cn/article/39052#install)进行安装测试

### 渠道包 @channel

> HBuilder4.31版本新增支持

APK格式安装包支持配置渠道信息，默认提供以下渠道配置项：

| 渠道名称     | 渠道标识 |
| ------------ | -------- |
| 华为   |  huawei   |
| OPPO   |  oppo     |
| VIVO   |  vivo     |
| 小米   |  xiaomi   |
| 荣耀   |  honor    |
| 应用宝 |  yyb      |

**注意**
- 应用中可通过 [uni.getAppBaseInfo](../api/get-app-base-info.md#getappbaseinfo) 返回的 channel 属性获取应用的渠道信息
- 勾选“无”表示不使用渠道信息，[uni.getAppBaseInfo](../api/get-app-base-info.md#getappbaseinfo) 返回的 channel 属性值为空字符串

#### 自定义渠道
如果默认的渠道信息不够使，想要更多渠道，可在 [manifest.json](../collocation/manifest.md) 的 `源码视图` 配置 "__hbuilderx" -> "channel_list"，如下：
```json
{
  //其它数据
  //根节点下配置__hbuilderx如下
  "__hbuilderx": {
    "channel_list":[
      {
        "id":"lenovo",
        "name":"联想"
      }
    ]
  }
}
```

保存后，重新打开“App打包”界面，在“APK渠道包”项中会列出新增加的自定义渠道，勾选后提交云端打包才能生效。

## iOS平台

云端打包需配置Bundle ID、支持的设备、证书信息。

![](https://web-ext-storage.dcloud.net.cn/doc/app/cloudpackage/package-ios.png)

### Bundle ID
Bundle ID （Bundle identifier）也叫 App ID 或者应用ID，是每个 iOS 应用的唯一标识。通常以反转的域名格式命名（如：com.example.appname），只能包含字母、数字、中划线和点号（.），不能包含特殊字符或空格，Bundle ID不区分大小写，推荐使用权小写字母。
申请 iOS 证书、打包 ipa 和在 itunesconnect 创建 App 都要用到 Bundle ID， 整个 App 上架流程就是靠这个 Bundle ID 关联在一起。

### 支持的设备

必须勾选支持iPhone、支持iPad中的至少一项。

- 支持iPhone
	勾选此项才能安装到iPhone设备，不勾选则无法安装到iPhone设备。

- 支持iPad
	勾选此项才能在iPad设备全屏运行，不勾选此项也可以安装到iPad设备，但运行时会有黑边。

### 证书信息

打包iOS安装必须使用Apple证书，需到 Apple 开发者网站申请，详情参考[Apple证书申请](https://ask.dcloud.net.cn/article/152)。

- 私钥证书
	选择在 Apple 开发者网站申请的证书
- 证书私钥密码
	访问私钥证书的密码
- 证书Profile文件
	选择与证书关联的Profile文件

## 制作自定义调试基座

HBuilderX中内置“使用标准基座运行”功能，是DCloud为方便开发者低门槛调试而提供的，此基座App使用的是DCloud的包名、证书和三方SDK配置。
如果要自定义原生层能力（如三方SDK配置），则需要走一遍iOS或Android的打包流程，由XCode或Android studio编译打包生成ipa或apk安装包。但发布打包后无法方便调试，不能热重载和显示控制台日志。所以HBuilder在打包时提供了一个特殊选项，打包“自定义运行基座”。

自定义调试基座可以生效的配置（主要是manifest.json的配置），包括：
- App名称、图标、封面splash、包名、证书
- App模块配置、三方sdk配置（如微信、推送、地图、语音识别等三方sdk配置）
- App权限配置
- uni原生插件
- 其他manifest.json文档提到的需打包生效的配置

生成自定义调试基座后，可参考[使用自定义调试基座真机运行](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)

**注意**
- 自定义调试基座生成的安装包不能用于提交应用市场上架审核

## 广告联盟 @uniad

> HBuilder4.31版本新增支持

用于配置 uni-AD 需要使用的广告，使用前需申请开通 uni-AD，详情参考[uni-AD开发文档](https://uniapp.dcloud.net.cn/uni-ad/) 。
勾选则表示开通/集成渠道：

![](https://web-ext-storage.dcloud.net.cn/doc/app/cloudpackage/package-uniad.png)

### 开通DCloud快捷广告

- 快捷开屏广告
  DCloud自营开屏广告
- uniMP激励视频广告

**注意**
开通DCloud快捷广告后需登录[uni-ad 广告联盟](https://uniad.dcloud.net.cn/)关闭。

### 集成渠道SDK广告SDK

勾选云打包需要使用的广告渠道，支持以下广告平台：

| 广告平台名称						|Web|Android|iOS	|
| :-										|:-	|:-			|:-		|
| 腾讯优量汇							|x	|3.99		|4.22	|
| 穿山甲GroMore					|x	|3.99		|4.22	|
| 快手广告联盟						|x	|3.99		|4.22	|
| 百度百青藤广告联盟			|x	|4.31		|4.31	|
| 华为广告联盟						|x	|4.31		|x		|
| Sigmob广告联盟					|x	|3.99		|4.22	|
| Octopus章鱼移动广告		|x	|4.31		|4.31	|
| AdScope倍孜广告				|x	|4.31		|x		|
| 泛连									|x	|4.31		|x		|
| 聚力阅盟								|x	|4.31		|x		|
| Pangle(海外穿山甲)			|x	|4.31		|4.31	|
| Google AdMob					|x	|4.31		|4.31	|
| unity									|x	|4.31		|4.31	|
| liftoff								|x	|4.31		|4.31	|
| inmobi								|x	|4.31		|4.31	|
| ironsource						|x	|4.31		|4.31	|
| mintegral							|x	|4.31		|4.31	|

**注意**
- 勾选后需提交云端打包后才能生效
