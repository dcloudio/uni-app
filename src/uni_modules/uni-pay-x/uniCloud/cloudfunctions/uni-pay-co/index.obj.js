/**
 * uni-pay-co 统一支付云对象
 */

// 加载服务
const service = require('./service');
// 加载全局错误码
const { UniCloudError, isUniPayError, ERROR } = require('./common/error');
// 加载全局中间件
const middleware = require('./middleware/index');
// 加载uniId公共模块
const uniIdCommon = require('uni-id-common');

module.exports = {
	/**
	 * 中间件（请求前执行）
	 */
	async _before() {
		const params = this.getParams();
		let clientInfo;
		if (params && params[0] && params[0].clientInfo) {
			clientInfo = params[0].clientInfo;
		} else {
			clientInfo = this.getClientInfo();
		}

		// 挂载uni-id实例到this上，方便后续调用
		this.uniIdCommon = uniIdCommon.createInstance({
			clientInfo
		});

		// 国际化开始
		const i18n = uniCloud.initI18n({
			locale: clientInfo.locale || 'zh-Hans',
			fallbackLocale: 'zh-Hans',
			messages: require('./lang/index')
		})
		this.t = i18n.t.bind(i18n);
		// 国际化结束

		// 挂载中间件
		this.middleware = {}
		for (const mwName in middleware) {
			this.middleware[mwName] = middleware[mwName].bind(this);
		}
		const methodName = this.getMethodName();
		// 支付回调接口没有token，不需要获取用户信息
		if (methodName !== "payNotify") {
			// 尝试从token获取用户信息
			await this.middleware.auth(false);
			// 通用权限校验模块
			await this.middleware.accessControl();
		}
		// 设置全局获取userId公共函数（可在此云对象的任意其他函数内通过 this.getUserId() 获取当前登录用户的id
		this.getUserId = () => {
			return this.authInfo && this.authInfo.uid ? this.authInfo.uid : undefined;
		}
	},
	/**
	 * 中间件（请求后执行）
	 */
	_after(error, result) {
		if (error) {
			if (error.errCode) {
				let errCode = error.errCode
				if (!isUniPayError(errCode)) {
					// 如果不是插件预设的错误码，则原样返回错误信息
					return error;
				}
				return new UniCloudError({
					code: errCode,
					message: error.errMsg || this.t(errCode, error.errMsgValue),
				});
			}
			throw error
		}
		return result;
	},

	/**
	 * 创建支付订单
	 */
	async createOrder(data) {
		let {
			provider, // 支付供应商 如 wxpay alipay 参考 https://uniapp.dcloud.net.cn/api/plugins/provider.html#
			total_fee, // 订单总金额，单位为分，100等于1元
			openid, // 发起支付的用户openid
			order_no, // 业务系统订单号 建议控制在20-28位(不可以是24位,24位在阿里云空间可能会有问题)(可重复,代表1个业务订单会有多次付款的情况)
			out_trade_no, // 支付插件订单号（需控制唯一，不传则由插件自动生成）
			description, // 支付描述，如：uniCloud个人版包月套餐
			type, // 订单类型 goods：订单付款 recharge：余额充值付款 vip：vip充值付款 等等，可自定义
			qr_code, // true 强制开启二维码支付模式
			custom, // 自定义参数（不会发送给第三方支付服务器）（由于custom在前端调用时是不可信任的，因此此参数后续需要优化）
			other, // 其他请求参数（会发送给第三方支付服务器）
			clientInfo, // 兼容云对象调用云对象模式
			cloudInfo, // 兼容云对象调用云对象模式
			wxpay_virtual, // 仅用于微信虚拟支付
			apple_virtual, // 仅用于苹果虚拟支付
		} = data;

		if (!clientInfo) clientInfo = this.getClientInfo();
		if (!cloudInfo) cloudInfo = this.getCloudInfo();

		// 获取当前登录的user_id
		let user_id = this.getUserId();

		let res = await service.pay.createOrder({
			provider,
			total_fee,
			user_id,
			openid,
			order_no,
			out_trade_no,
			description,
			type,
			qr_code,
			custom,
			other,
			clientInfo,
			cloudInfo,
			wxpay_virtual,
			apple_virtual,
		});
		// uniappx-特殊处理
		if (typeof res.order === "object" && typeof res.order["timestamp"] === "string") {
			res.order["timestamp"] = parseFloat(res.order["timestamp"]);
		}
		return res;
	},
	/**
	 * 接收支付异步通知
	 */
	async payNotify(data) {
		const httpInfo = this.getHttpInfo();
		const clientInfo = this.getClientInfo();
		const cloudInfo = this.getCloudInfo();
		return service.pay.paymentNotify({
			httpInfo,
			clientInfo,
			cloudInfo
		});
	},
	/**
	 * 查询支付状态
	 */
	async getOrder(data) {
		let {
			out_trade_no, // 插件订单号
			transaction_id, // 第三方支付交易单号
			await_notify = false, // 是否需要等待异步通知执行完成，若为了响应速度，可以设置为false，若需要等待异步回调执行完成，则设置为true
		} = data;

		res = await service.pay.getOrder({
			out_trade_no,
			transaction_id,
			await_notify
		});

		return res;
	},

	/**
	 * 发起退款
	 * 此api只有admin角色可以访问
	 */
	async refund(data) {
		let {
			out_trade_no, // 插件订单号
			out_refund_no, // 插件退款订单号
			refund_desc, // 退款描述
			refund_fee, // 退款金额
		} = data;

		res = await service.pay.refund({
			out_trade_no,
			out_refund_no,
			refund_desc,
			refund_fee,
		});

		return res;
	},

	/**
	 * 查询退款（查询退款情况）
	 */
	async getRefund(data) {
		let {
			out_trade_no, // 插件订单号
		} = data;

		res = await service.pay.getRefund({
			out_trade_no,
		});

		return res;
	},

	/**
	 * 关闭订单（只有订单未支付时，才可以关闭，关闭后，用户即使在付款页面也无法付款）
	 */
	async closeOrder(data) {
		let {
			out_trade_no, // 插件订单号
		} = data;

		res = await service.pay.closeOrder({
			out_trade_no,
		});

		return res;
	},

	/**
	 * 根据code获取openid
	 */
	async getOpenid(data = {}) {
		let {
			provider,
			code,
			clientInfo, // 兼容云对象调用云对象模式
		} = data;

		if (!clientInfo) clientInfo = this.getClientInfo();

		res = await service.pay.getOpenid({
			provider,
			code,
			clientInfo
		});

		return res;
	},

	/**
	 * 获取当前支持的支付方式
	 */
	async getPayProviderFromCloud() {
		return await service.pay.getPayProviderFromCloud();
	},

	/**
	 * 获取支付配置内的appid（主要用于获取获取微信公众号的appid，用以获取code）
	 */
	async getProviderAppId(data) {
		let {
			provider,
			provider_pay_type
		} = data;
		// 注意，前往不要直接把 conifg 内的所有内容返回给前端
		let conifg = service.pay.getConfig();
		try {
			return {
				errorCode: 0,
				appid: conifg[provider][provider_pay_type].appId,
			}
		} catch (err) {
			return {
				errorCode: 0,
				appid: null
			};
		}
	},

	/**
	 * 验证iosIap苹果内购支付凭据
	 */
	async verifyReceiptFromAppleiap(data) {
		let {
			out_trade_no,
			appleiap_account_token,
			transaction_receipt,
			transaction_identifier,
		} = data;
		const clientInfo = this.getClientInfo();
		return await service.pay.verifyReceiptFromAppleiap({
			out_trade_no,
			appleiap_account_token,
			transaction_receipt,
			transaction_identifier,
			clientInfo,
		});
	},

	/**
	 * 接收微信小程序虚拟支付异步通知
	 */
	async wxpayVirtualNotify(data) {
		const httpInfo = this.getHttpInfo();
		const clientInfo = this.getClientInfo();
		const cloudInfo = this.getCloudInfo();
		return service.pay.wxpayVirtualNotify({
			httpInfo,
			clientInfo,
			cloudInfo
		});
	},
	/**
	 * 请求微信小程序虚拟支付API
	 */
	async requestWxpayVirtualApi(data) {
		const clientInfo = this.getClientInfo();
		if (clientInfo.source !== "function") {
			throw new Error("requestWxpayVirtualApi只能通过云端调云端的方式调用");
		}
		let res = await service.pay.requestWxpayVirtualApi(data);
		return res;
	},
	
	/**
	 * 测试请求，仅为了确保是否请求能调通
	 */
	async test(data) {
		return {
			errCode: 0,
			errMsg: "ok"
		};
	},

}