/**
 * 微信支付相关函数
 */
var wxpay = {
	async getAccessToken(data) {
		let {
			appId,
			secret,
			force_refresh,
		} = data;
		let res = await uniCloud.httpclient.request("https://api.weixin.qq.com/cgi-bin/stable_token", {
			method: 'POST',
			data: {
				appid: appId,
				secret: secret,
				grant_type: "client_credential",
				force_refresh
			},
			contentType: 'json', 
			dataType: 'json' ,
		});
		let result = res.data || {};
		if (!result.access_token) {
			return {
				errCode: -1,
				errMsg: result.errmsg
			}
		}
		return {
			errCode: 0,
			errMsg: 'ok',
			accessToken: result.access_token,
			expiresIn: result.expires_in
		}
	},
	async getOpenid(data) {
		let {
			provider_pay_type
		} = data;
		if (provider_pay_type === "jsapi") {
			return this._getJsOpenid(data);
		} else {
			return this._getMpOpenid(data);
		}
	},
	async _getMpOpenid(data) {
		let {
			config = {},
				code,
				provider_pay_type
		} = data;
		if (!config.appId) throw new Error("uni-pay配置wxpay.mp节点下的appId不能为空");
		if (!config.secret) throw new Error("uni-pay配置wxpay.mp节点下的secret不能为空");
		let res = await uniCloud.httpclient.request("https://api.weixin.qq.com/sns/jscode2session", {
			method: 'GET',
			data: {
				appid: config.appId,
				secret: config.secret,
				js_code: code,
				grant_type: "authorization_code"
			},
			contentType: 'json', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		});
		if (res.data && !res.data.errcode && res.data.openid) {
			return {
				errCode: 0,
				errMsg: 'ok',
				openid: res.data.openid,
				unionid: res.data.unionid,
				session_key: res.data.session_key, // 此参数不可以暴露给前端
			}
		} else {
			return {
				errCode: -1,
				errMsg: res.data.errmsg
			}
		}
	},
	async _getJsOpenid(data) {
		let {
			config = {},
				code,
				provider_pay_type
		} = data;
		if (!config.appId) throw new Error("uni-pay配置wxpay.jsapi节点下的appId不能为空");
		if (!config.secret) throw new Error("uni-pay配置wxpay.jsapi节点下的secret不能为空");
		let res = await uniCloud.httpclient.request("https://api.weixin.qq.com/sns/oauth2/access_token", {
			method: 'GET',
			data: {
				appid: config.appId,
				secret: config.secret,
				code: code,
				grant_type: "authorization_code"
			},
			contentType: 'json', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		});
		if (res.data && !res.data.errcode && res.data.openid) {
			return {
				errCode: 0,
				errMsg: 'ok',
				openid: res.data.openid,
				unionid: res.data.unionid,
			}
		} else {
			return {
				errCode: -1,
				errMsg: res.data.errmsg
			}
		}
	}
};
module.exports = wxpay;
