/**
 * 通用公共函数
 */
var common = {};
/**
 * 日期格式化
 */
common.timeFormat = function(time, fmt = 'yyyy-MM-dd hh:mm:ss', targetTimezone = 8) {
	try {
		if (!time) {
			return "";
		}
		if (typeof time === "string" && !isNaN(time)) time = Number(time);
		// 其他更多是格式化有如下:
		// yyyy-MM-dd hh:mm:ss|yyyy年MM月dd日 hh时MM分等,可自定义组合
		let date;
		if (typeof time === "number") {
			if (time.toString().length == 10) time *= 1000;
			date = new Date(time);
		} else {
			date = time;
		}

		const dif = date.getTimezoneOffset();
		const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
		const east8time = date.getTime() + timeDif;

		date = new Date(east8time);
		let opt = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (let k in opt) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (opt[k]) : (("00" + opt[k]).substr(("" + opt[
					k]).length)));
			}
		}
		return fmt;
	} catch (err) {
		// 若格式错误,则原值显示
		return time;
	}
};
/**
 * 产生订单号，不依赖数据库，高并发时性能高（理论上会重复，但概率非常非常低）
 */
common.createOrderNo = function(prefix = "", num = 25) {
	// 获取当前时间字符串格式如20200803093000123
	let timeStr = common.timeFormat(Date.now(), "yyyyMMddhhmmssS");
	timeStr = timeStr.substring(2);
	let randomNum = num - (prefix + timeStr).length;
	return prefix + timeStr + common.random(randomNum, "123456789");
};

/**
 * 产生随机数
 */
common.random = function(length, list = "123456789") {
	let s = "";
	for (let i = 0; i < length; i++) {
		let code = list[Math.floor(Math.random() * list.length)];
		s += code;
	}
	return s;
};


/**
 * 休眠，等待（单位毫秒）
 * @param {Number} ms 毫秒
 * await common.sleep(1000);
 */
common.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取platform
 * let provider_pay_type = common.getPlatform(platform);
 */
common.getPlatform = function(platform) {
	if (["h5", "web"].indexOf(platform) > -1) {
		platform = "web";
	} else if (["app", "app-plus"].indexOf(platform) > -1) {
		platform = "app";
	}
	return platform;
};

/**
 * 获取 provider_pay_type
let provider_pay_type = common.getProviderPayType({
	platform,
	provider,
	ua,
	qr_code
});
 */
common.getProviderPayType = function(data) {
	let {
		platform,
		provider,
		ua,
		qr_code
	} = data;

	// 扫码支付
	if (qr_code) return "native";

	// 小程序支付
	if (platform.indexOf("mp") > -1) return "mp";

	// APP支付
	if (platform.indexOf("app") > -1) return "app";

	// 微信公众号支付

	if (platform === "web" && provider === "wxpay" && ua.toLowerCase().indexOf("micromessenger") > -1) return "jsapi";

	// 微信外部浏览器支付
	if (platform === "web" && provider === "wxpay" && ua.toLowerCase().indexOf("micromessenger") === -1) return "mweb";

	if (platform === "web" && provider === "alipay") return "native";

	throw new Error(`不支持的支付方式${provider}-${platform}`);
};
/**
 * 获取uniPay交易类型
let tradeType = common.getTradeType({ provider, provider_pay_type });
 */
common.getTradeType = function(data) {
	let { provider, provider_pay_type } = data;
	let pay_type = `${provider}_${provider_pay_type}`;
	let obj = {
		// 微信
		"wxpay_app": "APP", // 微信app支付
		"wxpay_mp": "JSAPI", // 微信小程序支付
		"wxpay_native": "NATIVE", // 微信扫码支付
		"wxpay_mweb": "MWEB", // 微信外部浏览器支付
		"wxpay_jsapi": "JSAPI", // 微信公众号支付
		// 支付宝
		"alipay_app": "APP", // 支付宝app支付
		"alipay_mp": "JSAPI", // 支付宝小程序支付
		"alipay_native": "NATIVE", // 支付宝扫码支付
		"alipay_mweb": "NATIVE", // 支付宝外部浏览器支付
	};
	return obj[pay_type];
};
/**
 * 给第三方服务器返回成功通知
 */
common.returnNotifySUCCESS = function(data) {
	let { provider, provider_pay_type } = data;
	if (provider === "wxpay") {
		// 微信支付需返回 xml 格式的字符串
		return {
			mpserverlessComposedResponse: true,
			statusCode: 200,
			headers: {
				'content-type': 'text/xml;charset=utf-8'
			},
			body: "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>"
		};
	} else if (provider === "alipay") {
		// 支付宝支付直接返回 success 字符串
		return {
			mpserverlessComposedResponse: true,
			statusCode: 200,
			headers: {
				'content-type': 'text/plain'
			},
			body: "success"
		}
	} else if (provider === "wxpay-virtual") {
		// 微信虚拟支付返回对象形式 { ErrCode: 0, ErrMsg: "success" }
		return {
			"ErrCode": 0,
			"ErrMsg": "success"
		}
	}
	return "success";
};
// 获取异步通知的参数,并转成json对象
common.getNotifyData = function(data) {
	let {
		provider,
		httpInfo
	} = data;
	let json = {};
	let body = httpInfo.body;
	if (httpInfo.isBase64Encoded) {
		body = Buffer.from(body, 'base64').toString('utf-8');
	}
	if (provider === "wxpay") {
		if (body.indexOf("<xml>") > -1) {
			// 微信支付v2
			json = common.parseXML(body);
		} else {
			// 微信支付v3
			json = typeof body === "string" ? JSON.parse(body) : body;
		}
	} else if (provider === "alipay") {
		// 支付宝支付
		json = common.urlStringToJson(body);
	} else if (provider === "wxpay-virtual") {
		// 微信小程序虚拟支付
		json = typeof body === "string" ? JSON.parse(body) : body;
		json.out_trade_no = json.OutTradeNo;
	}
	return json;
};
// 简易版XML转Object，只可在微信支付时使用，不支持嵌套
common.parseXML = function(xml) {
	const xmlReg = /<(?:xml|root).*?>([\s|\S]*)<\/(?:xml|root)>/
	const str = xmlReg.exec(xml)[1]
	const obj = {}
	const nodeReg = /<(.*?)>(?:<!\[CDATA\[){0,1}(.*?)(?:\]\]>){0,1}<\/.*?>/g
	let matches = null
	// eslint-disable-next-line no-cond-assign
	while ((matches = nodeReg.exec(str))) {
		obj[matches[1]] = matches[2]
	}
	return obj
};

// url参数转json
common.urlStringToJson = function(str) {
	let json = {};
	if (str != "" && str != undefined && str != null) {
		let arr = str.split("&");
		for (let i = 0; i < arr.length; i++) {
			let arrstr = arr[i].split("=");
			let k = arrstr[0];
			let v = arrstr[1];
			json[k] = v;
		}
	}
	return json;
};


const isSnakeCase = new RegExp('_(\\w)', 'g');
const isCamelCase = new RegExp('[A-Z]', 'g');

function parseObjectKeys(obj, type) {
	let parserReg;
	let parser;
	switch (type) {
		case 'snake2camel':
			parser = common.snake2camel
			parserReg = isSnakeCase
			break
		case 'camel2snake':
			parser = common.camel2snake
			parserReg = isCamelCase
			break
	}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (parserReg.test(key)) {
				const keyCopy = parser(key)
				obj[keyCopy] = obj[key]
				delete obj[key]
				if (Object.prototype.toString.call((obj[keyCopy])) === '[object Object]') {
					obj[keyCopy] = parseObjectKeys(obj[keyCopy], type)
				} else if (Array.isArray(obj[keyCopy])) {
					obj[keyCopy] = obj[keyCopy].map((item) => {
						return parseObjectKeys(item, type)
					})
				}
			}
		}
	}
	return obj
}

common.snake2camel = function(value) {
	return value.replace(isSnakeCase, (_, c) => (c ? c.toUpperCase() : ''))
}

common.camel2snake = function(value) {
	return value.replace(isCamelCase, str => '_' + str.toLowerCase())
}

// 转驼峰
common.snake2camelJson = function(obj) {
	return parseObjectKeys(obj, 'snake2camel');
};

// 转蛇形
common.camel2snakeJson = function(obj) {
	return parseObjectKeys(obj, 'camel2snake');
};


module.exports = common;
