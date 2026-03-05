const fs = require('fs');
const path = require('path')
module.exports = {
	// 统一 - 支付回调地址,格式为 "服务空间ID":"URL化地址"
	"notifyUrl": {
		// 测试环境服务空间-支付回调地址
		"mp-b267e273-19a7-7788-99c7-f6f27f9c5b77": "https://fc-mp-b267e273-19a7-7788-99c7-f6f27f9c5b77.next.bspapp.com/uni-pay-co",
		// 线上环境服务空间-支付回调地址（如果只有一个服务空间，则只需要配置线上环境服务空间即可）
		"mp-499e2a37-0c66-418a-82aa-3e5820ecb057": "https://fc-mp-499e2a37-0c66-418a-82aa-3e5820ecb057.next.bspapp.com/uni-pay-co",
	},
	"notifyKey": "", // 跨云函数通信时的加密密钥，建议手动改下，不要使用默认的密钥，长度保持在64位以上即可
	// 微信支付相关
	"wxpay": {
		"enable": true, // 是否启用微信支付
		// 微信 - 小程序支付
		"mp": {
			"appId": "", // 小程序的appid
			"secret": "", // 小程序的secret
			"mchId": "", // 商户id
			"key": "", // v2的api key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
		},
		// 微信 - APP支付
		"app": {
			"appId": "", // app开放平台下的应用的appid
			"secret": "", // app开放平台下的应用的secret
			"mchId": "", // 商户id
			"key": "", // v2的api key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
		},
		// 微信 - 扫码支付
		"native": {
			"appId": "", // 可以是小程序或公众号或app开放平台下的应用的任意一个appid
			"secret": "", // secret
			"mchId": "", // 商户id
			"key": "", // v2的api key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
		},
		// 微信 - 公众号支付
		"jsapi": {
			"appId": "", // 公众号的appid
			"secret": "", // 公众号的secret
			"mchId": "", // 商户id
			"key": "", // v2的api key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
		},
		// 微信 - 手机外部浏览器H5支付
		"mweb": {
			"appId": "", // 可以是小程序或公众号或app开放平台下的应用的任意一个appid
			"secret": "", // secret
			"mchId": "", // 商户id
			"key": "", // v2的api key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
			// 场景信息，必填
			"sceneInfo": {
				"h5_info": {
					"type": "Wap", // 此值固定Wap
					"wap_url": "", // 你的H5首页地址，必须和你发起支付的页面的域名一致。
					"wap_name": "", // 你的H5网站名称
				}
			}
		},
	},
	// 支付宝相关（加签方式选证书模式，加密算法选RSA2）
	"alipay": {
		"enable": true, // 是否启用支付宝支付
		// 支付宝 - 小程序支付配置
		"mp": {
			"appId": "", // 支付宝小程序appid
			"privateKey": "", // 支付宝商户私钥
			"appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
			"alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
			"alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
		},
		// 支付宝 - APP支付配置
		"app": {
			"appId": "", // 支付宝开放平台下应用的appid
			"privateKey": "", // 支付宝商户私钥
			"appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
			"alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
			"alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
		},
		// 支付宝 - H5支付配置（包含：网站二维码、手机H5，需申请支付宝当面付接口权限）
		"native": {
			"appId": "", // 支付宝开放平台下应用的appid
			"privateKey": "", // 支付宝商户私钥
			"appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
			"alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
			"alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
		}
	},
	// 苹果虚拟支付相关
	"appleiap": {
		// 苹果虚拟支付支付，参数获取地址：https://appstoreconnect.apple.com/access/integrations/api/subs
		"app": {
			"appId": "", // 密钥ID
			"issuerId": "", // Issuer ID
			"bundleId": "", // 正式包名（如果dev包名和正式包名一致，则只填bundleId即可）
			"devBundleId": "", // dev包名（如果dev包名和正式包名一致，则devBundleId可不填）
			"appCertPath": path.join(__dirname, 'appleiap/apiclient_cert.p8'), // 证书路径
			"sandbox": true, // 是否是沙箱环境
		},
	}
}
