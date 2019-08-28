`manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。

### 配置项列表

|属性|类型|默认值|描述|最低版本|
|:-|:-|:-|:-|:-|
|name|String||应用名称||
|appid|String|新建 uni-app 项目时，DCloud 云端分配。用途[详见](https://ask.dcloud.net.cn/article/35907)|应用标识|| 
|description|String||应用描述||
|versionName|String||版本名称，例如：1.0.0。详见下方Tips说明||
|versionCode|String||版本号，例如：36||
|transformPx|Boolean|true|是否转换项目的px，为true时将px转换为rpx，为false时，px为传统的实际像素||
|networkTimeout|Object||网络超时时间，[详见](/collocation/manifest?id=networktimeout)||
|debug|Boolean|false|是否开启 debug 模式，开启后调试信息以 ``info`` 的形式给出，其信息有页面的注册，页面路由，数据更新，事件触发等||
|app-plus|Object||[5+App 特有配置](/collocation/manifest?id=app-plus)||
|h5|Object||[H5 特有配置](/collocation/manifest?id=h5)||
|quickapp|Object||快应用特有配置，即将支持||
|mp-weixin|Object||[微信小程序特有配置](/collocation/manifest?id=mp-weixin)||
|mp-alipay|Object||[支付宝小程序未提供可配置项](/collocation/manifest?id=mp-alipay)|
|mp-baidu|Object||[百度小程序特有配置](/collocation/manifest?id=mp-baidu)||
|mp-toutiao|Object||[头条小程序特有配置](/collocation/manifest?id=mp-toutiao)|1.6.0|
|mp-qq|Object||[qq 小程序特有配置](/collocation/manifest?id=mp-qq)|2.1.0|
**Tips**

- uni-app 的 `appid` 由 DCloud 云端分配，主要用于 DCloud 相关的云服务，请勿自行修改。[详见](https://ask.dcloud.net.cn/article/35907)
- 注意区分 uni-app 的 `appid` 与微信小程序、iOS 等其它平台分配的 `appid`，以及第三方 SDK 的 `appid`。
- versionName在云打包App和生成wgt应用资源时会使用。如需升级App版本，先修改此处再云打包。导出wgt资源用于离线打包和热更新时也会以此版本为依据。
- 在本地打包时和热更新时，App版本和wgt应用资源版本将不再保持一致。此时通过[plus.runtime.version](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.version)可获取App版本，通过[plus.runtime.getProperty](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.getProperty)获取wgt资源版本。

#### networkTimeout

各类网络请求的超时时间，单位均为毫秒。

|属性|类型|必填|默认值|说明|
|--|--|--|--|--|
|request|Number|否|6000|uni.request 的超时时间，单位毫秒。|
|connectSocket|Number|否|6000|uni.connectSocket 的超时时间，单位毫秒。|
|uploadFile|Number|否|6000|uni.uploadFile 的超时时间，单位毫秒。|
|downloadFile|Number|否|6000|uni.downloadFile 的超时时间，单位毫秒。|

### app-plus

|属性|类型|说明|最低版本|
|:-|:-|:-|:-|
|splashscreen|Object|5+App 启动界面信息，[详见](/collocation/manifest?id=splashscreen)||
|modules|Object|权限模块，[详见](/collocation/manifest?id=modules)||
|distribute|Object|5+App 发布信息，[详见](/collocation/manifest?id=distribute)||
|usingComponents|Boolean|是否启用自定义组件模式，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)|1.9.0|
|nvueCompiler|String|切换 nvue 编译模式，可选值，`weex` ：老编译模式，`uni-app`： 新编译模式，默认为 `weex` 。[编译模式区别详情](http://ask.dcloud.net.cn/article/36074)|2.0.3 Alpha|
|renderer|String|可不加载基于 webview 的运行框架，减少包体积、提升启动速度。可选值 `native`| App-nvue 2.2.0+|
|nvue|Object|nvue 页面布局初始配置，[详见](/collocation/manifest?id=nvue)|2.0.3 Alpha|
PS：这里只列出了核心部分，更多内容请参考 [完整的 manifest.json](/collocation/manifest?id=完整-manifestjson)。

**Tips**

- manifest.json 文件的配置，推荐在 HBuilderX 提供的可视化操作界面完成。
- 部分配置在打包时的操作界面补全，例如：证书等信息。
- Native.js 权限部分会根据配置的模块权限，在打包后自动填充。
- 部分 modules 是默认的，不需要进行配置。
- 微信小程序的 `appid` 等信息，需要配置在 `mp-weixin` 节点下。`sdkConfigs` 下出现的 `weixin` 节点，配置的是 5+ App 的第三方 SDK 信息。


#### App Splashscreen@splashscreen

splash（启动封面）是App必然存在的、不可取消的。

|属性|类型|默认值|描述|最低版本|
|:-|:-|:-|:-|:-|
|alwaysShowBeforeRender|Boolean|true|首页白屏时不关闭启动界面|1.6.0|
|autoclose|Boolean|true|是否自动关闭程序启动界面。如果需要手动关闭启动界面，需将 alwaysShowBeforeRender 及 autoclose 均设置为 false。||
|waiting|Boolean|true|是否在程序启动界面显示等待圈或雪花||
|delay|Number|0|启动界面在应用的首页面加载完毕后延迟关闭的时间，autoclose 为 true 时生效。|&nbsp;|

**注意**
- 如果不配置自己的splash图，App端会默认把App的icon放到splash中
- splash只能是标准png，不要用jpg改名为png。也不支持gif等动画
- 相关改动，云打包生效，真机运行不生效。本地打包需自行在原生工程中配置
- App启动图中iOS的MAX等大屏设备的splash图若不配，会导致iOS认为此App没有为MAX优化，App将无法全屏，四周会有黑边
- Android的splash支持.9.png，[详见](https://ask.dcloud.net.cn/article/35527)


#### App Modules@modules
模块选择是为了控制App的包体积，不需要的模块可以在打包时剔除。

|名称|描述|
|:-|:-|
|Bluetooth|BLE蓝牙|
|Contacts|系统通讯录|
|Fingerprint|指纹识别|
|iBeacon|iBeacon|
|LivePusher|直播推流|
|Maps|地图|
|Messaging|短彩邮件消息|
|OAuth|登录授权|
|Payment|支付|
|Push|消息推送|
|Share|社交分享|
|Speech|语音识别|
|SQLite|SQLite数据库|
|Statistic|统计|
|VideoPlayer|视频播放|

**注意**
- 仅App云打包生效。本地打包需自行在原生工程中配置。
- 
#### App Distribute@distribute

|属性|类型|描述|
|:-|:-|:-|
|android|Object|Android 应用配置，详见: [完整 manifest.json](/collocation/manifest?id=完整-manifestjson)|
|ios|Object|iOS 应用配置，详见: [完整 manifest.json](/collocation/manifest?id=完整-manifestjson)|
|sdkConfigs|Object|SDK配置，仅打包生效 [详见](/collocation/manifest?id=sdkConfigs)|
|orientation|Array|重力感应、横竖屏配置，可取值："portrait-primary"：竖屏正方向；"portrait-secondary"：竖屏反方向；"landscape-primary"：横屏正方向；"landscape-secondary"：横屏反方向。|

##### App SdkConfigs@sdkConfigs

三方原生SDK配置。三方SDK的使用需要向这些SDK提供商申请，并配置参数到此处。可在HBuilderX可视化界面（App SDK配置）输入配置，此配置仅**云打包后生效**，本地打包需自行在原生工程中配置。

|属性|类型|描述|
|:-|:-|:-|
|oauth|Object|授权登录，配置后可调用 [uni.login](/api/plugins/login?id=login) 进行登录操作，目前支持的授权登录平台有：[QQ](http://open.qq.com/)、[微信](https://open.weixin.qq.com/)、[新浪微博](http://open.weibo.com/)。|
|share|Object|分享，配置后可调用 [uni.share](/api/plugins/share?id=share) 进行分享，目前支持QQ、微信、新浪微博等分享， 具体配置 [详见](/api/plugins/share?id=app-端各平台分享配置说明)。|
|push|Object|push配置，使用方式 [详见](http://ask.dcloud.net.cn/article/34)，目前支持：[uniPush](http://ask.dcloud.net.cn/article/35716)、[个推](http://www.igetui.com/)、[小米推送](https://dev.mi.com/console/appservice/push.html)，注意App仅支持一种 push 方式，配置多个 push 无效，建议使用 uniPush，支持多厂商推送。|
|payment|Object|三方支付配置，配置后可调用 [uni.payment](/api/plugins/payment?id=payment) 进行支付，目前支持微信支付、支付宝支付、苹果内购， 具体配置 [详见](/api/plugins/payment?id=uni-app-app-平台支付流程)。|
|statics|Object|统计配置，目前仅支付友盟统计，[详见](http://ask.dcloud.net.cn/article/74)，在uni-app中只用 [plus.statistic](http://www.html5plus.org/doc/zh_cn/statistic.html) 进行调用。|
|speech|Object|语音识别配置，支持讯飞语音、百度语音，[详见](http://ask.dcloud.net.cn/article/35059)，在uni-app中只用 [plus.speech](http://www.html5plus.org/doc/zh_cn/speech.html) 进行调用。|
|maps|Object|原生地图配置，目前仅支持 [高德地图](http://lbs.amap.com/)，申请方式可参考：[地图插件配置](http://ask.dcloud.net.cn/article/29)。|


#### nvue@nvue
`nvue` 页面布局初始设置

|属性|类型|描述|
|:-|:-|:-|
|flex-direction|String| flex 成员项的排列方向，支持项，row：从左到右； row-reverse：从下到上；column：从上到下；column-reverse：与 row 相反，默认值 column。|


### h5
|属性|类型|说明|
|:-|:-|:-|
|title|String|页面标题，默认使用 manifest.json 的 name|
|template|String|index.html模板路径，相对于应用根目录，可定制生成的 html 代码。参考：[自定义模板](collocation/manifest?id=h5-template)|
|router|Object|参考：[router](collocation/manifest?id=h5-router)|
|async|Object|参考：[async](collocation/manifest?id=h5-async)|
|devServer|Object|开发环境 server 配置，参考：[devServer](collocation/manifest?id=devserver)|
|publicPath|String|引用资源的地址前缀，仅发布时生效。参考：[publicPath](collocation/manifest?id=publicPath)|
|sdkConfigs|String|SDK配置，例如地图...  参考：[sdkConfigs](collocation/manifest?id=h5sdkconfig)|
|optimization|Object|打包优化配置（HBuilderX 2.1.5 以上支持），参考[optimization](collocation/manifest?id=optimization)|


#### 自定义模板@h5-template
需要使用自定义模板的场景，通常有以下几种情况：

- 调整页面 head 中的 meta 配置
- 补充 SEO 相关的一些配置（仅首页）
- 加入百度统计等三方js

使用自定义模板时，1. 工程根目录下新建一个html文件；2. 复制下面的基本模板内容，到这个html文件，在此基础上修改meta和引入js；3. 在 `manifest.json->h5->template` 节点中关联这个html文件的路径。
```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<title>
			<%= htmlWebpackPlugin.options.title %>
		</title>
		<script>
			document.addEventListener('DOMContentLoaded', function() {
				document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px'
			})
		</script>
		<link rel="stylesheet" href="<%= BASE_URL %>static/index.css" />
	</head>
	<body>
		<noscript>
			<strong>Please enable JavaScript to continue.</strong>
		</noscript>
		<div id="app"></div>
		<!-- built files will be auto injected -->
	</body>
</html>
```

在hello uni-app示例中有一个`template.h5.html`文件，即是此用途。

**关于SEO的补充说明**

H5平台是SPA单页应用，普通的SEO信息即加meta字段只能在，自定义的模板html里配置首页。

但SEO的时代在变，现在更有效的方式，是用uni-app同时发布一版百度小程序，这个搜索权重更高。DCloud的ask社区的H5版也是uni-app做的，同时发布了百度小程序，权重更高，每天来自百度的搜索量非常多。是一个可现身说法的好案例。

#### router@h5-router
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|mode|String|hash|路由跳转模式，支持 hash、history|
|base|String|/|应用基础路径，例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"|

**注意：**`history` 模式发行需要后台配置支持，详见：[history 模式的后端配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

#### async@h5-async
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|loading|String|AsyncLoading|页面 js 加载时使用的组件（需注册为全局组件）|
|error|String|AsyncError|页面 js 加载失败时使用的组件（需注册为全局组件）|
|delay|Number|200|展示 loading 加载组件的延时时间（页面 js 若在 delay 时间内加载完成，则不会显示 loading 组件）|
|timeout|Number|3000|页面 js 加载超时时间（超时后展示 error 对应的组件）|

#### devServer
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|https|Boolean|false|启用 https 协议|
|disableHostCheck|Boolean|false|禁用 Host 检查|

Tips：`uni-app` 中 `manifest.json->h5->devServer` 实际上对应 `webpack` 的 [devServer](https://webpack.js.org/configuration/dev-server/)，鉴于 manifest 为 json 文件，故 `webpack.config.js->devServer` 配置项下的简单类型属性均可在`manifest.json->h5->devServer`节点下配置，funciton 等复杂类型暂不支持。

#### publicPath
配置 publicPath 为 cdn 资源地址前缀，这样编译出来的 html 文件，引用的 js，css 路径会自动变成 cdn 上的地址。

**示例**

以 hello-uniapp 发布 H5 时为例

未配置 publicPath 时，发布时 index.html 中的结果：

```html
<script src=/h5/static/js/chunk-vendors.803ce52d.js></script>
<script src=/h5/static/js/index.34e8497d.js>
```
配置 publicPath 为 `https://www.cdn.com/h5/`（无效地址仅用作示例） 后，发布时 index.html 中的结果：

```html
<script src=https://www.cdn.com/h5/static/js/chunk-vendors.803ce52d.js></script>
<script src=https://www.cdn.com/h5/static/js/index.34e8497d.js>
```

**注意**
- 打包部署后，在服务器上开启 gzip 可以进一步压缩文件。具体的配置，可以参考网上的分享：https://juejin.im/post/5af003286fb9a07aac24611b

#### sdkconfig@h5sdkconfig


**示例**

```json
"h5": {
	"sdkConfigs": {
		"maps": {
			"qqmap": {
				//腾讯地图秘钥（key）
				"key": "XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2"
			}
		}
	}
}
```

#### optimization

|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|prefetch|Boolean|false|资源预取|
|preload|Boolean|false|资源预加载|
|treeShaking|Object||摇树优化，根据项目需求，动态打包框架所需的组件及API，保持框架代码最精简化，参考[treeShaking](collocation/manifest?id=treeshaking)|

##### treeShaking

|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|enable|Boolean|false|是否启用摇树优化|

**示例：**
```json
"h5": {
    "optimization": {
        "treeShaking": {
            "enable": true
        }
    }
}
```

Tips：关于摇树优化（treeShaking）原理及优化结果，参考：[https://ask.dcloud.net.cn/article/36279](https://ask.dcloud.net.cn/article/36279)

### mp-weixin

|属性|类型|说明|
|:-|:-|:-|
|appid|String|微信小程序的AppID，登录 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 申请|
|usingComponents|Boolean| 是否启用自定义组件模式，`v1.8.0+`，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)|
|setting|Object|微信小程序项目设置，参考[setting](/collocation/manifest?id=setting)|
|functionalPages|Boolean|微信小程序是否启用插件功能页，默认关闭|
|requiredBackgroundModes|Array|微信小程序需要在后台使用的能力,[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#requiredbackgroundmodes)|
|plugins|Object|使用到的插件，[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)|
|resizable|Boolean|在iPad上小程序是否支持屏幕旋转，默认关闭|
|navigateToMiniProgramAppIdList|Array|需要跳转的小程序列表，[详见](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html)|
|permission|Object|微信小程序接口权限相关设置，比如申请位置权限必须填此处[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)|
|workers|String|Worker 代码放置的目录，**HBuilderX 2.0.0+ Alpha** 支持。 [详见](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)|

#### setting

编译到微信小程序平台下的项目设置。

|属性|类型|说明|
|:-|:-|:-|
|urlCheck|Boolean|是否检查安全域名和 TLS 版本|
|es6|Boolean|ES6 转 ES5|
|postcss|Boolean|上传代码时样式是否自动补全|
|minified|Boolean|上传代码时是否自动压缩|

### mp-alipay

|属性|类型|说明|
|:-|:-|:-|
|usingComponents|Boolean| 是否启用自定义组件模式，`v2.0+`，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)|

### mp-baidu

|属性|类型|说明|
|:-|:-|:-|
|appid|String|百度小程序的 AppID，登录 [https://smartprogram.baidu.com/docs/introduction/enter_application/](https://smartprogram.baidu.com/docs/introduction/enter_application/) 申请|
|usingComponents|Boolean| 是否启用自定义组件模式，`v2.0+`，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)|

### mp-toutiao

|属性|类型|说明|
|:-|:-|:-|
|appid|String|头条小程序的 AppID，登录 [https://developer.toutiao.com/](https://developer.toutiao.com/) 申请|
|setting|Object|头条小程序项目设置，参考[头条小程序项目设置](/collocation/manifest?id=mp-toutiao-setting)|
|usingComponents|Boolean| 是否启用自定义组件模式，`v2.0+`，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)|

#### 头条小程序项目设置@mp-toutiao-setting

|属性|类型|说明|
|:-|:-|:-|
|urlCheck|Boolean|是否检查安全域名和 TLS 版本|
|es6|Boolean|ES6 转 ES5|
|postcss|Boolean|上传代码时样式是否自动补全|
|minified|Boolean|上传代码时是否自动压缩|

### mp-qq

|属性|类型|说明|
|:-|:-|:-|
|appid|String|qq 小程序的 AppID，登录 [https://q.qq.com](https://q.qq.com) 申请|
|usingComponents|Boolean| 是否启用自定义组件模式，`v2.0+`，默认为false，[编译模式区别详情](https://ask.dcloud.net.cn/article/35843)。mp-qq只支持自定义组件模式|


### 完整 manifest.json

```javascript
{
	"appid": "__UNI__XXXXXX，创建应用时云端分配的，不要修改。",
	"name": "应用名称，如uni-app",
	"description": "应用描述",
	"versionName": "1.0.0",
	"versionCode": "100",
	// app-plus 节点是 5+App 特有配置，推荐在 HBuilderX 的 manifest.json 可视化界面操作完成配置。
	"app-plus": {
		// HBuilderX->manifest.json->模块权限配置
		"modules": {
			"Contacts": {},
			"Fingerprint": {},
			"Maps": {},
			"Messaging": {},
			"OAuth": {},
			"Payment": {},
			"Push": {},
			"Share": {},
			"Speech": {},
			"Statistic": {},
			"VideoPlayer": {},
			"LivePusher": {}
		},
		"distribute": {
			// Android 与 iOS 证书相关信息均在打包时完成配置
			"android": {
				"packagename": "Android应用包名，如io.dcloud.uniapp",
				"keystore": "Android应用打包使用的密钥库文件",
				"password": "Android应用打包使用密钥库中证书的密码",
				"aliasname": "Android应用打包使用密钥库中证书的别名",
				"schemes": [
					"应用支持的scheme，大小写相关，推荐使用小写"
				],
				"theme": "程序使用的主题",
				"android:name": "自定义程序入口类名",
				"custompermissions": "Boolean类型，是否自定义android权限，true表示自定义权限，只使用permissions下指定的android权限，不根据用户使用的5+模块自动添加android权限，false表示自动根据用户使用的5+模块自动添加android权限",
				"permissions": [
					"要添加的额外的android权限，如<uses-permission android:name=\"com.android.launcher.permission.INSTALL_SHORTCUT\" />",
					"<uses-permission android:name=\"com.android.launcher.permission.UNINSTALL_SHORTCUT\" />"
				],
				"minSdkVersion": "apk支持的最低版本，默认值为14",
				"targetSdkVersion": "apk的目标版本，默认值为21"
			},
			"ios": {
				"appid": "iOS应用标识，苹果开发网站申请的appid，如io.dcloud.uniapp",
				"mobileprovision": "iOS应用打包配置文件",
				"password": "iOS应用打包个人证书导入密码",
				"p12": "iOS应用打包个人证书，打包配置文件关联的个人证书",
				"devices": "iOS应用支持的设备类型，可取值iphone/ipad/universal",
				"urltypes": [{
						"urlschemes": [
							"hbuilder",
							"必选，程序所支持的自定义协议名称"
						],
						"id": "可选，自定义协议的标识",
						"icon": "可选，打开程序时显示的图标"
					},
					{
						"urlschemes": [
							"http",
							"https",
							"必选，程序所支持的自定义协议名称，大小写无关，推荐使用小写"
						],
						"id": "可选，自定义协议的标识",
						"icon": "可选，打开程序时显示的图标"
					}
				],
				"frameworks": ["使用native.js调用API要引用的库文件名称，如CoreLocation.framework", "QuartzCore.framework"],
				"idfa": "true|false，是否使用广告标识符，默认值为false",
				"plistcmds": [
					"Set :权限 使用权限的原因",
					"Set :NSCameraUsageDescription 说明使用用户相机的原因"
				]
			},
			// HBuilderX->manifest.json->SDK配置
			"sdkConfigs": {
				"maps": {
					// 地图只能选一个，这里选的是百度。
					"baidu": {
						"appkey_ios": "",
						"appkey_android": ""
					}
				},
				"oauth": {
					// 微信登录
					"weixin": {
						"appid": "",
						"appsecret": ""
					},
					// QQ登录
					"qq": {
						"appid": ""
					},
					// 新浪微博登录
					"sina": {
						"appkey": "",
						"appsecret": "",
						"redirect_uri": ""
					},
					// 小米登录
					"xiaomi": {
						"appid_ios": "",
						"appsecret_ios": "",
						"redirect_uri_ios": "",
						"appid_android": "",
						"appsecret_android": "",
						"redirect_uri_android": ""
					}
				},
				"payment": {
					// Apple应用内支付
					"appleiap": {},
					// 支付宝支付
					"alipay": {
						"scheme": ""
					},
					// 微信支付
					"weixin": {
						"appid": ""
					}
				},
				"push": {
					// 推送只能选择一个，这里选的是个推。
					"igexin": {
						"appid": "",
						"appkey": "",
						"appsecret": ""
					}
				},
				"share": {
					// 微信分享
					"weixin": {
						"appid": "",
						"appsecret": ""
					},
					// 新浪微博分享
					"sina": {
						"appkey": "",
						"appsecret": "",
						"redirect_uri": ""
					},
					// 分享到QQ好友
					"qq": {
						"appid": ""
					},
					// 腾讯微博分享
					"tencent": {
						"appkey": "",
						"appsecret": "",
						"redirect_uri": ""
					}
				},
				"statics": {
					// 友盟统计
					"umeng": {
						"appkey_ios": "",
						"channelid_ios": "",
						"appkey_android": "",
						"channelid_android": ""
					}
				}
			},
			"orientation": [
				"portrait-primary",
				"landscape-primary",
				"portrait-secondary",
				"landscape-secondary"
			],
			// HBuilderX->manifest.json->图标配置
			"icons": {
				"ios": {
					"appstore": "必选, 1024x1024, 提交app sotre使用的图标",
					"iphone": {
						"app@2x": "可选，120x120，iOS7-11程序图标（iPhone4S/5/6/7/8）",
						"app@3x": "可选，180x180，iOS7-11程序图标（iPhone6plus/7plus/8plus/X）",
						"spotlight@2x": "可选，80x80，iOS7-11 Spotlight搜索图标（iPhone5/6/7/8）",
						"spotlight@3x": "可选，120x120，iOS7-11 Spotlight搜索图标（iPhone6plus/7plus/8plus/X）",
						"settings@2x": "可选，58x58，iOS5-11 Settings设置图标（iPhone5/6/7/8）",
						"settings@3x": "可选，87x87，iOS5-11 Settings设置图标（iPhone6plus/7plus/8plus/X）",
						"notification@2x": "可选，40x40，iOS7-11 通知栏图标（iPhone5/6/7/8）",
						"notification@3x": "可选，60x60，iOS7-11 通知栏图标（iPhone6plus/7plus/8plus/X）"
					},
					"ipad": {
						"app": "可选，76x76，iOS7-11程序图标",
						"app@2x": "可选，152x152，iOS7-11程序图标（高分屏）",
						"proapp@2x": "可选，167x167，iOS9-11程序图标（iPad Pro）",
						"spotlight": "可选，40x40，iOS7-11 Spotlight搜索图标",
						"spotlight@2x": "可选，80x80，iOS7-11 Spotlight搜索图标（高分屏）",
						"settings": "可选，29x29，iOS5-11 设置图标",
						"settings@2x": "可选，58x58，iOS5-11 设置图标（高分屏）",
						"notification": "可选，20x20，iOS7-11 通知栏图标",
						"notification@2x": "可选，40x40，iOS7-11 通知栏图标（高分屏）"
					}
				},
				"android": {
					"mdpi": "必选，48x48，普通屏程序图标",
					"ldpi": "必选，48x48，大屏程序图标",
					"hdpi": "必选，72x72，高分屏程序图标",
					"xhdpi": "必选，96x96，720P高分屏程序图标",
					"xxhdpi": "必选，144x144，1080P高分屏程序图标",
					"xxxhdpi": "可选，192x192"
				}
			},
			// HBuilderX->manifest.json->启动图配置
			"splashscreen": {
				"ios": {
					"iphone": {
						"retina35": "可选，640x960，3.5英寸设备(iPhone4)启动图片",
						"retina40": "可选，640x1136，4.0英寸设备(iPhone5)启动图片",
						"retina40l": "可选，1136x640，4.0英寸设备(iPhone5)横屏启动图片",
						"retina47": "可选，750x1334，4.7英寸设备（iPhone6）启动图片",
						"retina47l": "可选，1334x750，4.7英寸设备（iPhone6）横屏启动图片",
						"retina55": "可选，1242x2208，5.5英寸设备（iPhone6Plus）启动图片",
						"retina55l": "可选，2208x1242，5.5英寸设备（iPhone6Plus）横屏启动图片",
						"iphonex": "可选，1125x2436，iPhoneX启动图片",
						"iphonexl": "可选，2436x1125，iPhoneX横屏启动图片"
					},
					"ipad": {
						"portrait": "可选，768x1004，需支持iPad时必选，iPad竖屏启动图片",
						"portrait-retina": "可选，1536x2008，需支持iPad时必选，iPad高分屏竖屏图片",
						"landscape": "可选，1024x748，需支持iPad时必选，iPad横屏启动图片",
						"landscape-retina": "可选，2048x1496，需支持iPad时必选，iPad高分屏横屏启动图片",
						"portrait7": "可选，768x1024，需支持iPad iOS7时必选，iPad竖屏启动图片",
						"portrait-retina7": "可选，1536x2048，需支持iPad iOS7时必选，iPad高分屏竖屏图片",
						"landscape7": "可选，1024x768，需支持iPad iOS7时必选，iPad横屏启动图片",
						"landscape-retina7": "可选，2048x1536，需支持iPad iOS7时必选，iPad高分屏横屏启动图片"
					}
				},
				"android": {
					"mdpi": "必选，240x282，普通屏启动图片",
					"ldpi": "必选，320x442，大屏启动图片",
					"hdpi": "必选，480x762，高分屏启动图片",
					"xhdpi": "必选，720x1242，720P高分屏启动图片",
					"xxhdpi": "必选，1080x1882，1080P高分屏启动图片"
				}
			}
		},
		// HBuilderX->manifest.json->启动图配置->启动界面选项
		"splashscreen": {
			"waiting": true,
			"autoclose": true,
			"delay": 0
		},
		"error": {
			"url": "页面加载错误时打开的页面地址，可以是网络地址，也可以是本地地址"
		},
		"useragent": {
			"value": "自定义ua字符串",
			"concatenate": "是否为追加模式"
		},
		"useragent_ios": {
			"value": "与useragent的value一致，仅在iOS平台生效，当useragent和useragent_ios同时存在时优先级useragent_ios>useragent",
			"concatenate": "与useragent的concatenate一致，仅iOS平台生效"
		},
		"useragent_android": {
			"value": "与useragent的value一致，仅在Android平台生效，当useragent和useragent_android同时存在时优先级useragent_android>useragent",
			"concatenate": "与useragent的concatenate一致，仅Android平台生效"
		},
		"ssl": "accept|refuse|warning，访问https网络时对非受信证书的处理逻辑",
		"runmode": "normal",
		"appWhitelist": [
			"Android平台下载apk地址白名单列表",
			"iOS平台跳转appstore地址白名单列表"
		],
		"schemeWhitelist": [
			"URL Scheme白名单列表，如：mqq" //iOS要求预先指定要打开的App名单，不能随意调用任何App
		],
		"channel": "渠道标记，可在DCloud开发者中心查看各渠道应用的统计数据",
		"adid": "广告联盟会员id，在DCloud开发者中心申请后填写",
		"safearea": { //安全区域配置，仅iOS平台生效  
			"background": "#CCCCCC", //安全区域外的背景颜色，默认值为"#FFFFFF"  
			"bottom": { // 底部安全区域配置  
				"offset": "none|auto" // 底部安全区域偏移，"none"表示不空出安全区域，"auto"自动计算空出安全区域，默认值为"none"  
			},
			"left": { //左侧安全区域配置（横屏显示时有效）  
				"offset": "none|auto"
			},
			"right": { //右侧安全区域配置（横屏显示时有效）  
				"offset": "none|auto"
			}
		},
		"softinput": {
			"navBar": "auto", //是否显示iOS软键盘上的“完成”导航条
			"mode": "adjustResize|adjustPan" //软键盘弹出模式，
		}
	},
	// 快应用特有配置
	"quickapp": {},
	// 微信小程序特有配置
	"mp-weixin": {
		"appid": "wx开头的微信小程序appid"
	},
	// 百度小程序特有配置
	"mp-baidu": {
		"appid": "百度小程序appid"
	},
	// 头条小程序特有配置
	"mp-toutiao": {
		"appid": "头条小程序appid"
	},
	"h5": {
		"title": "演示", //页面标题，默认使用 manifest.json 的 name
		"template": "index.html", //index.html模板路径，相对于应用根目录，可定制生成的 html 代码
		"router": {
			"mode": "history", //路由跳转模式，支持 hash|history ,默认 hash
			"base": "/hello/" //应用基础路径，例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
		},
		"async": { //页面js异步加载配置
			"loading": "AsyncLoading", //页面js加载时使用的组件（需注册为全局组件）
			"error": "AsyncError", //页面js加载失败时使用的组件（需注册为全局组件）
			"delay": 200, //展示 loading 加载组件的延时时间（页面 js 若在 delay 时间内加载完成，则不会显示 loading 组件）
			"timeout": 3000 //页面js加载超时时间（超时后展示 error 对应的组件）
		}
	}
}
```
更多配置相关的说明，请参考 [manifest.json文档说明](https://ask.dcloud.net.cn/article/94) 中的描述。可能节点的位置与普通的 5+App 有差异，请按照配置的名称进行对应。

# FAQ
Q：iOS 应用调用相机等权限时，弹出的提示语如何修改？
A：在 manifest.json 可视化界面-App模块权限配置-iOS隐私信息访问的许可描述
