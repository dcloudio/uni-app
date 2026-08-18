# uni-requestMerchantTransfer
实现打开微信请求用户确认收款功能。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/request-merchant-transfer.html)  


# uni-requestMerchantTransfer

微信小程序平台参考：[微信小程序API规范](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestMerchantTransfer.html)

## uni.requestMerchantTransfer(options: RequestMerchantTransferOption)

商家转账用户确认模式下，在移动端应用APP中集成开放SDK调起微信请求用户确认收款。

### RequestMerchantTransferOption参数：

| 名称      | 类型     | 必备 | 描述                                                         |
|-----------|:---------:|:---------:|--------------------------------------------------------------|
| mchId     | string   | 是   | 商户号                                                       |
| subMchId  | string   | 否   | 子商户号，服务商模式下必填                                   |
| package   | string   | 是   | 商家转账付款单跳转收款页 pkg 信息,商家转账付款单受理成功时返回给商户 |
| appId     | string   | 否   | 商户 appId（微信平台appid），普通模式下必填，服务商模式下，appId 和 subAppId 二选一填写 |
| subAppId  | string   | 否   | 子商户 appId（微信平台子appid)，服务商模式下，appId 和 subAppId 二选一填写      |
| openId    | string   | 否   | 收款用户 openId， 对应传入的商户 appId 下，某用户的 openId    |
| success   | function | 否   | 接口调用成功的回调函数                                        |
| fail      | function | 否   | 接口调用失败的回调函数                                        |
| complete  | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）              |

### 示例：

```javascript
uni.requestMerchantTransfer({
	"mchId": "mchId",
	"appId": "微信开发者平台对应app的APPID",
	"package": "package",
	success: (res) => {
		console.log(res)
	},
	fail: (res) => {
		console.log(res.errMsg)
	},
	complete: (res) => {
		console.log(res.errMsg)
	}
})
```

## 注意事项

iOS平台必须在项目根目录下的 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoplist) 文件中配置微信开发者平台的APPID和通用链接，配置后需提交云端打包生效。

1. 在 `WeChat` 节点下配置 `appid` 和 `universalLink`
2. 在 `CFBundleURLTypes` 节点下配置 scheme 数据

示例如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>WeChat</key>
		<dict>
			<key>appid</key>
			<string>请填写微信开发者平台对应app的APPID</string>
			<key>universalLink</key>
			<string>请填写能唤起当前应用的Universal Links路径</string>
		</dict>

		<key>CFBundleURLTypes</key>
		<array>
			<dict>
				<key>CFBundleTypeRole</key>
				<string>Editor</string>
				<key>CFBundleURLName</key>
				<string>WeChat</string>
				<key>CFBundleURLSchemes</key>
				<array>
					<string>请填写微信开发者平台对应app的APPID</string>
				</array>
			</dict>
		</array>
	</dict>
</plist>
```

> 如果同时使用了微信支付、微信登录、微信分享模块时，appid 和 universalLink 的值需与 manifest.json 中配置的值保持一致。

## uts 语言介绍  
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序：编译为JavaScript  

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。


## uts 插件介绍
UTS 插件是一种特定的 uni_modules 插件，其核心目的是允许 uni-app/uni-app x 开发者使用 UTS 语法来调用扩展 API（封装原生系统的API或三方SDK）。  

UTS 插件的实现代码主要位于 utssdk 目录下，并按平台进行分离和组织：  
| 目录/文件 | 目标平台 | 实现语言 | 作用描述 |
| -- | -- | -- | -- |
|utssdk/app-android|Android|UTS, Kotlin, Java|存放 UTS 插件在 Android 平台上的具体实现源码|
|utssdk/app-ios|iOS|UTS, Swift|存放 UTS 插件在 iOS 平台上的具体实现源码|
|utssdk/app-harmony|HarmonyOS (鸿蒙)|UTS, ArkTS|存放 UTS 插件在 HarmonyOS 平台上的具体实现源码|
|utssdk/*.uts|多平台共用|UTS|存放使用 UTS 语言编写的、可供 所有平台 共用的实现源码|


## 参考文档  
- [uts 语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)
- [uts 和 ts 的差异](https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html)
- [uts 插件开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)
- [uts 插件原生语言混编开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html)
- [uts 插件 Android 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html)
- [uts 插件 iOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
- [uts 插件 HarmonyOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
