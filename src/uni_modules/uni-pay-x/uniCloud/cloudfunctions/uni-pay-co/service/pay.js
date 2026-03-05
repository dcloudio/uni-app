/**
 * uni-pay-co 统一支付服务实现
 */

const crypto = require("crypto");

const uniPay = require("uni-pay");

const configCenter = require("uni-config-center");

const config = configCenter({ pluginId: 'uni-pay' }).requireFile('config.js');

const dao = require('../dao');

const libs = require('../libs');

const { UniCloudError, isUniPayError, ERROR } = require('../common/error')

const db = uniCloud.database();
const _ = db.command;

const notifyPath = "/payNotify/";

class service {
	constructor(obj) {

	}

	/**
	 * 获取支付插件的完整配置
	 */
	getConfig() {
		return config;
	}

	/**
	 * 支付成功 - 异步通知
	 */
	async paymentNotify(data = {}) {
		let {
			httpInfo,
			clientInfo,
			cloudInfo,
			isWxpayVirtual
		} = data;
		console.log('httpInfo: ', httpInfo);
		let path = httpInfo.path;
		let pay_type = path.substring(notifyPath.length);
		let provider = pay_type.split("-")[0]; // 获取支付供应商
		let provider_pay_type = pay_type.split("-")[1]; // 获取支付方式
		if (isWxpayVirtual) {
			// 微信虚拟支付固定参数
			provider = "wxpay-virtual";
			provider_pay_type = "mp";
		}
		// 初始化uniPayInstance
		let uniPayInstance = await this.initUniPayInstance({ provider, provider_pay_type });
		let notifyType = await uniPayInstance.checkNotifyType(httpInfo);
		console.log('notifyType: ', notifyType)
		if (notifyType === "token") {
			let verifyResult = await uniPayInstance.verifyTokenNotify(httpInfo);
			console.log('verifyResult: ', verifyResult)
			if (!verifyResult) {
				console.log('---------!签名验证未通过!---------');
				return;
			}
			// 校验token的测试接口，直接返回echostr
			return verifyResult.echostr;
		}
		if (notifyType !== "payment") {
			// 非支付通知直接返回成功
			console.log(`---------!非支付通知!---------`);
			return libs.common.returnNotifySUCCESS({ provider, provider_pay_type });
		}
		// 支付通知，验证签名
		let verifyResult = await uniPayInstance.verifyPaymentNotify(httpInfo);
		if (!verifyResult) {
			console.log('---------!签名验证未通过!---------');
			console.log('---------!签名验证未通过!---------');
			console.log('---------!签名验证未通过!---------');
			return {}
		}
		console.log('---------!签名验证通过!---------');
		verifyResult = JSON.parse(JSON.stringify(verifyResult)); // 这一句代码有用，请勿删除。
		console.log('verifyResult: ', verifyResult)
		let {
			outTradeNo,
			totalFee,
			transactionId,
			resultCode, // 微信支付v2和支付宝支付判断成功的字段
			openid,
			appId,
			tradeState, // 微信支付v3和微信虚拟支付判断支付成功的字段
		} = verifyResult;
		if (resultCode == "SUCCESS" || tradeState === "SUCCESS") {
			let time = Date.now();
			let payOrderInfo = await dao.uniPayOrders.updateAndReturn({
				whereJson: {
					status: 0, // status:0 为必须条件，防止重复推送时的错误
					out_trade_no: outTradeNo, // 商户订单号
				},
				dataJson: {
					status: 1, // 设置为已付款
					transaction_id: transactionId, // 第三方支付单号
					pay_date: time, // 更新支付时间（暂无法准确获取到支付时间，故用通知时间代替支付时间）
					notify_date: time, // 更新通知时间
					openid,
					provider, // 更新provider
					provider_pay_type, // 更新provider_pay_type
					original_data: httpInfo, // http回调信息，便于丢单时手动触发回调
				}
			});
			//console.log('payOrderInfo: ', payOrderInfo)
			if (payOrderInfo) {
				// 只有首次推送才执行用户自己的逻辑处理。
				// 用户自己的逻辑处理 开始-----------------------------------------------------------
				let userOrderSuccess = false;
				let orderPaySuccess;
				try {
					// 加载自定义异步回调函数
					orderPaySuccess = require(`../notify/${payOrderInfo.type}`);
				} catch (err) {
					console.log(err);
				}
				if (typeof orderPaySuccess === "function") {
					console.log('用户自己的回调逻辑 - 开始执行');
					userOrderSuccess = await orderPaySuccess({
						verifyResult,
						data: payOrderInfo,
						clientInfo,
						cloudInfo
					});
					console.log('用户自己的回调逻辑 - 执行完成');
				}
				console.log('userOrderSuccess', userOrderSuccess);
				// 用户自己的逻辑处理 结束-----------------------------------------------------------

				await dao.uniPayOrders.updateAndReturn({
					whereJson: {
						status: 1,
						out_trade_no: outTradeNo,
					},
					dataJson: {
						user_order_success: userOrderSuccess,
					}
				});

			} else {
				console.log('---------！注意：本次回调非首次回调，已被插件拦截，插件不会执行你的回调函数！---------');
				console.log('---------！注意：本次回调非首次回调，已被插件拦截，插件不会执行你的回调函数！---------');
				console.log('---------！注意：本次回调非首次回调，已被插件拦截，插件不会执行你的回调函数！---------');
				console.log('verifyResult:', verifyResult);
			}
		} else {
			console.log('verifyResult:', verifyResult);
		}

		return libs.common.returnNotifySUCCESS({ provider, provider_pay_type });
	}

	/**
	 * 微信虚拟支付异步通知
	 */
	async wxpayVirtualNotify(data = {}) {
		return this.paymentNotify({
			...data,
			isWxpayVirtual: true
		});
	}

	/**
	 * 统一支付 - 创建支付订单
	 */
	async createOrder(data = {}) {
		let {
			provider, // 支付供应商
			total_fee, // 支付金额
			user_id, // 用户user_id（统计需要）
			openid, // 用户openid
			order_no, // 订单号
			out_trade_no, // 支付插件订单号
			description, // 订单描述
			type, // 回调类型
			qr_code, // 是否强制使用扫码支付
			custom, // 自定义参数（不会发送给第三方支付服务器）
			other, // 其他请求参数（会发送给第三方支付服务器）
			clientInfo, // 客户端信息
			cloudInfo, // 云端信息
			wxpay_virtual, // 仅用于微信虚拟支付
			apple_virtual, // 仅用于苹果虚拟支付
		} = data;
		let subject = description;
		let body = description;
		if (!out_trade_no) out_trade_no = libs.common.createOrderNo();
		if (!order_no || typeof order_no !== "string") {
			throw { errCode: ERROR[51003] };
		}
		if (!type || typeof type !== "string") {
			throw { errCode: ERROR[51004] };
		}
		if (provider === "wxpay-virtual") {
			if (typeof wxpay_virtual !== "object") {
				throw { errCode: ERROR[51011] };
			}
			if (typeof wxpay_virtual.buy_quantity !== "number" || wxpay_virtual.buy_quantity <= 0) {
				throw { errCode: ERROR[51012] };
			}
		} else if (provider === "appleiap") {
			if (typeof apple_virtual !== "object") {
				throw { errCode: ERROR[51013] };
			}
			if (typeof apple_virtual.buy_quantity !== "number" || apple_virtual.buy_quantity <= 0) {
				throw { errCode: ERROR[51012] };
			}
		} else {
			if (typeof total_fee !== "number" || total_fee <= 0 || total_fee % 1 !== 0) {
				throw { errCode: ERROR[51005] };
			}
		}
		if (!description || typeof description !== "string") {
			throw { errCode: ERROR[51006] };
		}
		if (!provider || typeof provider !== "string") {
			throw { errCode: ERROR[51007] };
		}
		if (!clientInfo) {
			throw { errCode: ERROR[51008] };
		}
		if (!cloudInfo) {
			throw { errCode: ERROR[51009] };
		}
		let res = { errCode: 0, errMsg: 'ok', order_no, out_trade_no, provider };

		let {
			clientIP: client_ip,
			userAgent: ua,
			appId: appid,
			deviceId: device_id,
			platform
		} = clientInfo;
		let {
			spaceId, // 服务空间ID
		} = cloudInfo;
		let {
			notifyUrl = {}
		} = config;
		// 业务逻辑开始-----------------------------------------------------------
		// 以下代码是为了兼容公测版迁移到正式版的空间
		let notifySpaceId = spaceId;
		if (!notifyUrl[notifySpaceId]) {
			if (notifySpaceId.indexOf("mp-") === 0) {
				notifySpaceId = notifySpaceId.substring(3);
			} else {
				notifySpaceId = `mp-${notifySpaceId}`
			}
		}
		// 以上代码是为了兼容公测版迁移到正式版的空间
		let currentNotifyUrl = notifyUrl[notifySpaceId] || notifyUrl["default"]; // 异步回调地址
		if (!currentNotifyUrl || currentNotifyUrl.indexOf("http") !== 0) {
			throw { errCode: ERROR[52002] };
		}
		platform = libs.common.getPlatform(platform);
		// 如果需要二维码支付模式，则清空下openid
		if (qr_code) {
			openid = undefined;
			res.qr_code = qr_code;
		}
		// 获取并自动匹配支付供应商的支付类型
		let provider_pay_type = libs.common.getProviderPayType({
			platform,
			provider,
			ua,
			qr_code
		});
		res.provider_pay_type = provider_pay_type;
		// 拼接实际异步回调地址
		let finalNotifyUrl = `${currentNotifyUrl}${notifyPath}${provider}-${provider_pay_type}`;

		// 获取uniPay交易类型
		let tradeType = libs.common.getTradeType({ provider, provider_pay_type });

		let uniPayConifg = await this.getUniPayConfig({ provider, provider_pay_type });
		// 初始化uniPayInstance
		let uniPayInstance = await this.initUniPayInstance({ provider, provider_pay_type });

		// 获取支付信息
		let getOrderInfoParam = {
			openid: openid,
			subject: subject,
			body: body,
			outTradeNo: out_trade_no,
			totalFee: total_fee,
			notifyUrl: finalNotifyUrl,
			tradeType: tradeType
		};
		if (provider === "wxpay" && provider_pay_type === "mweb") {
			getOrderInfoParam.spbillCreateIp = client_ip;
			if (uniPayConifg.version !== 3) {
				// v2版本
				getOrderInfoParam.sceneInfo = uniPayConifg.sceneInfo;
			} else {
				// v3版本特殊处理
				getOrderInfoParam.sceneInfo = JSON.parse(JSON.stringify(uniPayConifg.sceneInfo));
				if (getOrderInfoParam.sceneInfo.h5_info.wap_url) {
					getOrderInfoParam.sceneInfo.h5_info.app_url = getOrderInfoParam.sceneInfo.h5_info.wap_url;
					delete getOrderInfoParam.sceneInfo.h5_info.wap_url;
				}
				if (getOrderInfoParam.sceneInfo.h5_info.wap_name) {
					getOrderInfoParam.sceneInfo.h5_info.app_name = getOrderInfoParam.sceneInfo.h5_info.wap_name;
					delete getOrderInfoParam.sceneInfo.h5_info.wap_name;
				}
			}
		}
		let expand_data;
		try {
			// 如果是苹果内购，不需要执行uniPayInstance.getOrderInfo等操作
			if (provider !== "appleiap") {
				// 第三方支付服务器返回的订单信息
				let orderInfo;
				if (other) {
					// other 内的键名转驼峰
					other = libs.common.snake2camelJson(other);
					getOrderInfoParam = Object.assign(getOrderInfoParam, other);
				}
				getOrderInfoParam = JSON.parse(JSON.stringify(getOrderInfoParam)); // 此为去除undefined的参数
				if (provider === "wxpay-virtual") {
					// 微信虚拟支付扩展数据
					expand_data = {
						mode: wxpay_virtual.mode, // short_series_coin 代币充值; short_series_goods 道具直购
						buy_quantity: wxpay_virtual.buy_quantity,
						rate: uniPayConifg.rate || 100,
						sandbox: uniPayConifg.sandbox,
					};
					if (wxpay_virtual.mode === "short_series_goods") {
						expand_data.product_id = wxpay_virtual.product_id;
						expand_data.goods_price = wxpay_virtual.goods_price;
					}
					// 获取用户的sessionKey
					let { session_key } = await dao.opendbOpenData.getSessionKey({
						appId: uniPayConifg.appId,
						platform: "weixin-mp",
						openid: openid
					});
					getOrderInfoParam.sessionKey = session_key;
					getOrderInfoParam.mode = expand_data.mode;
					getOrderInfoParam.buyQuantity = expand_data.buy_quantity;
					getOrderInfoParam.productId = expand_data.product_id;
					getOrderInfoParam.goodsPrice = expand_data.goods_price;
					if (getOrderInfoParam.mode === "short_series_coin") {
						// 计算支付金额
						total_fee = expand_data.buy_quantity / (expand_data.rate || 100) * 100;
					} else if (getOrderInfoParam.mode === "short_series_goods") {
						// 计算支付金额
						total_fee = expand_data.buy_quantity * expand_data.goods_price;
					}
				}
				orderInfo = await uniPayInstance.getOrderInfo(getOrderInfoParam);
				if (qr_code && orderInfo.codeUrl) {
					res.qr_code_image = await libs.qrcode.toDataURL(orderInfo.codeUrl, {
						type: "image/png",
						width: 200,
						margin: 1,
						scale: 1,
						color: {
							dark: "#000000",
							light: "#ffffff",
						},
						errorCorrectionLevel: "Q",
						quality: 1
					});
				}
				// 支付宝支付参数特殊处理
				if (provider === "alipay") {
					if (typeof orderInfo === "object" && orderInfo.code && orderInfo.code !== "10000") {
						res.errCode = orderInfo.code;
						res.errMsg = orderInfo.subMsg;
					}
				}
				res.order = orderInfo;
			}
		} catch (err) {
			let errMsg = err.errorMessage || err.message;
			console.error("data: ", data);
			console.error("getOrderInfoParam: ", getOrderInfoParam);
			console.error("err: ", err);
			console.error("errMsg: ", errMsg);
			throw { errCode: ERROR[53001], errMsg };
		}
		// 尝试获取下订单信息
		let payOrderInfo = await dao.uniPayOrders.find({
			order_no,
			out_trade_no
		});
		let create_date = Date.now();
		// 如果订单不存在，则添加
		if (!payOrderInfo) {
			// 添加数据库(数据库的out_trade_no字段需设置为唯一索引)
			let stat_platform = clientInfo.platform;
			if (stat_platform === "app") {
				stat_platform = clientInfo.os;
			}
			let nickname;
			if (user_id) {
				// 获取nickname（冗余昵称）
				let userInfo = await dao.uniIdUsers.findById(user_id);
				if (userInfo) nickname = userInfo.nickname;
			}
			let appleiap_account_token;
			if (provider === "appleiap") {
				appleiap_account_token = libs.crypto.generateUUID();
				res.appleiap_account_token = appleiap_account_token;
			}
			await dao.uniPayOrders.add({
				provider,
				provider_pay_type,
				uni_platform: platform,
				status: 0,
				type,
				order_no,
				out_trade_no,
				user_id,
				nickname,
				device_id,
				client_ip,
				openid,
				description,
				total_fee,
				refund_fee: 0,
				refund_count: 0,
				provider_appid: uniPayConifg.appId,
				appid,
				custom,
				create_date,
				expand_data,
				appleiap_account_token, // 苹果虚拟支付专用字段
				stat_data: {
					platform: stat_platform,
					app_version: clientInfo.appVersion,
					app_version_code: clientInfo.appVersionCode,
					app_wgt_version: clientInfo.appWgtVersion,
					os: clientInfo.os,
					ua: clientInfo.ua,
					channel: clientInfo.channel ? clientInfo.channel : String(clientInfo.scene),
					scene: clientInfo.scene
				}
			});
		} else {
			// 如果订单已经存在，则修改下支付方式（用户可能先点微信支付，未付款，又点了支付宝支付）
			await dao.uniPayOrders.updateById(payOrderInfo._id, {
				provider,
				provider_pay_type,
			});
		}
		// 自动删除3天前的订单（未付款订单）
		// await dao.uniPayOrders.deleteExpPayOrders();
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
	/**
	 * 统一支付结果查询
	 * @description 根据商户订单号或者平台订单号查询订单信息，主要用于未接收到支付通知时可以使用此接口进行支付结果验证
	 */
	async getOrder(data = {}) {
		let {
			out_trade_no, // 支付插件订单号
			transaction_id, // 支付平台的交易单号
			await_notify = false, // 是否需要等待异步通知执行完成才返回前端支付结果
		} = data;
		let res = { errCode: 0, errMsg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		if (!out_trade_no && !transaction_id) {
			throw { errCode: ERROR[51010] };
		}
		let payOrderInfo;
		if (transaction_id) {
			payOrderInfo = await dao.uniPayOrders.find({
				transaction_id
			});
		} else if (out_trade_no) {
			payOrderInfo = await dao.uniPayOrders.find({
				out_trade_no
			});
		}
		if (!payOrderInfo) {
			throw { errCode: ERROR[52001] };
		}
		// 初始化uniPayInstance
		let uniPayInstance = await this.initUniPayInstance(payOrderInfo);
		let orderQueryJson = {};
		if (out_trade_no) {
			orderQueryJson.outTradeNo = out_trade_no;
		} else {
			orderQueryJson.transactionId = transaction_id;
		}
		if (payOrderInfo.provider === "wxpay-virtual") {
			orderQueryJson.openid = payOrderInfo.openid;
		}
		let queryRes;
		if (typeof uniPayInstance.orderQuery === "function") {
			queryRes = await uniPayInstance.orderQuery(orderQueryJson);
			console.log('queryRes: ', queryRes)
		} else {
			// 无uniPayInstance.orderQuery函数时的兼容处理
			if ([1, 2].indexOf(payOrderInfo.status) > -1) {
				queryRes = {
					tradeState: "SUCCESS",
					tradeStateDesc: "订单已支付"
				};
			} else if ([3].indexOf(payOrderInfo.status) > -1) {
				queryRes = {
					tradeState: "REFUNDED",
					tradeStateDesc: "订单已退款"
				};
			} else {
				queryRes = {
					tradeState: "NOPAY",
					tradeStateDesc: "订单未支付"
				};
			}
		}
		if (queryRes.tradeState === 'SUCCESS' || queryRes.tradeState === 'FINISHED') {
			if (typeof payOrderInfo.user_order_success == "undefined" && await_notify) {
				let whileTime = 0; // 当前循环已执行的时间（毫秒）
				let whileInterval = 500; // 每次循环间隔时间（毫秒）
				let maxTime = 20000; // 循环执行时间超过此值则退出循环（毫秒）
				while (typeof payOrderInfo.user_order_success == "undefined" && whileTime <= maxTime) {
					await libs.common.sleep(whileInterval);
					whileTime += whileInterval;
					payOrderInfo = await dao.uniPayOrders.find({
						out_trade_no
					});
				}
			}
			res = {
				errCode: 0,
				errMsg: "ok",
				has_paid: true, // 标记用户是否已付款成功（此参数只能表示用户确实付款了，但系统的异步回调逻辑可能还未执行完成）
				out_trade_no, // 支付插件订单号
				transaction_id, // 支付平台订单号
				status: payOrderInfo.status, // 标记当前支付订单状态 -1：已关闭 0：未支付 1：已支付 2：已部分退款 3：已全额退款
				user_order_success: payOrderInfo.user_order_success, // 用户异步通知逻辑是否全部执行完成，且无异常（建议前端通过此参数是否为true来判断是否支付成功）
				pay_order: payOrderInfo,
			}
		} else {
			let errMsg = queryRes.tradeStateDesc || "未支付或已退款";
			if (errMsg.indexOf("订单发生过退款") > -1) {
				errMsg = "订单已退款";
			}
			res = {
				errCode: -1,
				errMsg: errMsg,
				has_paid: false,
				out_trade_no, // 支付插件订单号
				transaction_id, // 支付平台订单号
			}
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

	/**
	 * 统一退款
	 * @description 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家。
	 */
	async refund(data = {}) {
		let {
			out_trade_no, // 插件支付单号
			out_refund_no, // 退款单号（若不传，则自动生成）
			refund_desc = "用户申请退款",
			refund_fee: myRefundFee,
			refund_fee_type = "CNY"
		} = data;

		let res = { errCode: 0, errMsg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		if (!out_trade_no) {
			throw { errCode: ERROR[51001] };
		}
		let payOrderInfo = await dao.uniPayOrders.find({
			out_trade_no
		});
		if (!payOrderInfo) {
			throw { errCode: ERROR[52001] };
		}
		let refund_count = payOrderInfo.refund_count || 0;
		refund_count++;
		// 生成退款订单号
		let outRefundNo = out_refund_no ? out_refund_no : `${out_trade_no}-${refund_count}`;
		// 订单总金额
		let totalFee = payOrderInfo.total_fee;
		// 退款总金额
		let refundFee = myRefundFee || totalFee;
		let provider = payOrderInfo.provider;
		let uniPayConifg = await this.getUniPayConfig(payOrderInfo);
		let uniPayInstance = await this.initUniPayInstance(payOrderInfo);
		let refundParams = {
			outTradeNo: out_trade_no,
			outRefundNo,
			totalFee,
			refundFee,
			refundDesc: refund_desc,
			refundFeeType: refund_fee_type
		};
		if (payOrderInfo.provider === "wxpay-virtual") {
			refundParams.openid = payOrderInfo.openid;
			refundParams.refundReason = "3"; // 0-暂无描述 1-产品问题，影响使用或效果不佳 2-售后问题，无法满足需求 3-意愿问题，用户主动退款 4-价格问题 5-其他原因
			refundParams.reqFrom = "2"; // 当前只支持"1"-人工客服退款，即用户电话给客服，由客服发起退款流程 "2"-用户自己发起退款流程 "3"-其他
			// 查询当前可退款金额
			refundParams.leftFee = totalFee - (payOrderInfo.refund_fee || 0);
			// 实时查询当前可退款金额（此处注释可省一次请求）
			// const orderQueryRes = await uniPayInstance.orderQuery({
			// 	openid: payOrderInfo.openid,
			// 	outTradeNo: payOrderInfo.out_trade_no
			// });
			// refundParams.leftFee = orderQueryRes.leftFee;
		}
		console.log(`---- ${out_trade_no} -- ${outRefundNo} -- ${totalFee/100} -- ${refundFee/100}`)
		// 退款操作
		try {
			res.result = await uniPayInstance.refund(refundParams);
		} catch (err) {
			console.error(err);
			let errMsg = err.message;
			if (errMsg) {
				if (errMsg.indexOf("verify failure") > -1) {
					throw { errCode: ERROR[53005] };
				}
				if (errMsg.indexOf("header too long") > -1) {
					throw { errCode: ERROR[53005] };
				}
			}
			return { errCode: -1, errMsg: errMsg, err }
		}
		if (res.result.refundFee) {
			res.errCode = 0;
			res.errMsg = "ok";
			// 修改数据库
			try {
				let time = Date.now();
				// 修改订单状态
				payOrderInfo = await dao.uniPayOrders.updateAndReturn({
					whereJson: {
						_id: payOrderInfo._id,
						"refund_list.out_refund_no": _.neq(outRefundNo)
					},
					dataJson: {
						status: 2,
						refund_fee: _.inc(refundFee),
						refund_count: refund_count,
						refund_date: time, // 更新最近一次退款时间
						// 记录每次的退款详情
						refund_list: _.unshift({
							refund_date: time,
							refund_fee: refundFee,
							out_refund_no: outRefundNo,
							refund_desc
						})
					}
				});
				if (payOrderInfo && payOrderInfo.refund_fee >= payOrderInfo.total_fee) {
					// 修改订单状态为已全额退款
					await dao.uniPayOrders.updateById(payOrderInfo._id, {
						status: 3,
						refund_fee: payOrderInfo.total_fee,
					});
				}
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('res.result: ', res.result);
			throw { errCode: ERROR[53002] };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

	/**
	 * 查询退款（查询退款情况）
	 * @description 提交退款申请后，通过调用该接口查询退款状态。
	 */
	async getRefund(data = {}) {
		let {
			out_trade_no, // 插件支付单号
		} = data;
		if (!out_trade_no) {
			throw { errCode: ERROR[51001] };
		}
		let payOrderInfo = await dao.uniPayOrders.find({
			out_trade_no
		});
		if (!payOrderInfo) {
			throw { errCode: ERROR[52001] };
		}
		let provider = payOrderInfo.provider;
		let uniPayInstance = await this.initUniPayInstance(payOrderInfo);
		let queryRes;
		try {
			let refundQueryJson = {
				outTradeNo: out_trade_no,
				outRefundNo: payOrderInfo.refund_list[0].out_refund_no
			};
			if (provider === "wxpay-virtual") {
				refundQueryJson.openid = payOrderInfo.openid;
			}
			queryRes = await uniPayInstance.refundQuery(refundQueryJson);
		} catch (err) {
			throw { errCode: ERROR[53003], errMsg: err.errMsg };
		}
		let orderInfo = {
			total_fee: payOrderInfo.total_fee,
			refund_fee: payOrderInfo.refund_fee,
			refund_count: payOrderInfo.refund_count,
			refund_list: payOrderInfo.refund_list,
			provider: payOrderInfo.provider,
			provider_pay_type: payOrderInfo.provider_pay_type,
			status: payOrderInfo.status,
			type: payOrderInfo.type,
			out_trade_no: payOrderInfo.out_trade_no,
			transaction_id: payOrderInfo.transaction_id,
		};
		if (queryRes.refundFee > 0) {
			let msg = "ok";
			if (payOrderInfo.refund_list && payOrderInfo.refund_list.length > 0) {
				msg = `合计退款 ${payOrderInfo.refund_fee/100}\r\n`;
				for (let i in payOrderInfo.refund_list) {
					let item = payOrderInfo.refund_list[i];
					let index = Number(i) + 1;
					let timeStr = libs.common.timeFormat(item.refund_date, "yyyy-MM-dd hh:mm:ss");
					msg += `${index}、 ${timeStr} \r\n退款 ${item.refund_fee/100} \r\n`;
				}
			}
			return {
				errCode: 0,
				errMsg: msg,
				pay_order: orderInfo,
				result: queryRes
			}
		} else {
			throw { errCode: ERROR[53003] };
		}
	}

	/**
	 * 关闭订单
	 * @description 用于交易创建后，用户在一定时间内未进行支付，可调用该接口直接将未付款的交易进行关闭，避免重复支付。
	 * 注意
	 * 微信支付：订单生成后不能马上调用关单接口，最短调用时间间隔为 5 分钟。
	 * 微信虚拟支付：不支持关闭订单
	 */
	async closeOrder(data = {}) {
		let {
			out_trade_no, // 插件支付单号
		} = data;
		if (!out_trade_no) {
			throw { errCode: ERROR[51001] };
		}
		let payOrderInfo = await dao.uniPayOrders.find({
			out_trade_no
		});
		if (!payOrderInfo) {
			throw { errCode: ERROR[52001] };
		}
		let { provider } = payOrderInfo;
		let uniPayInstance = await this.initUniPayInstance(payOrderInfo);
		let closeOrderRes = await uniPayInstance.closeOrder({
			outTradeNo: out_trade_no
		});
		let wxpayResult = (provider === "wxpay" && closeOrderRes.resultCode === "SUCCESS");
		let alipayResult = (provider === "alipay" && closeOrderRes.code === "10000");

		if (wxpayResult || alipayResult) {
			// 修改订单状态为已取消
			await dao.uniPayOrders.update({
				whereJson: {
					_id: payOrderInfo._id,
					status: 0
				},
				dataJson: {
					status: -1,
					cancel_date: Date.now()
				}
			});
			return {
				errCode: 0,
				errMsg: "订单关闭成功",
				result: closeOrderRes
			}
		} else {
			throw { errCode: ERROR[53004] };
		}
	}

	/**
	 * 根据code获取openid
	 */
	async getOpenid(data = {}) {
		let {
			provider, // 支付供应商
			code, // 用户登录获取的code
			clientInfo, // 客户端环境
		} = data;
		if (!code) {
			throw { errCode: ERROR[51002] };
		}
		let { platform, ua } = clientInfo;
		// 获取并自动匹配支付供应商的支付类型
		let provider_pay_type = libs.common.getProviderPayType({
			provider,
			platform,
			ua
		});
		let needCacheSessionKey = false;
		let uniPayConifg = await this.getUniPayConfig({ provider, provider_pay_type });
		if (provider === "wxpay") {
			try {
				// 如果配置了微信虚拟支付，则使用微信虚拟支付的配置作为微信获取openid的配置
				let wxpayVirtualPayConifg = await this.getUniPayConfig({ provider: "wxpay-virtual", provider_pay_type: "mp" });
				if (wxpayVirtualPayConifg && wxpayVirtualPayConifg.appId && wxpayVirtualPayConifg.secret) {
					uniPayConifg = wxpayVirtualPayConifg;
					needCacheSessionKey = true;
				}
			} catch (err) {}

			let res = await libs.wxpay.getOpenid({
				config: uniPayConifg,
				code,
				provider_pay_type,
			});
			if (needCacheSessionKey) {
				// 将session_key保存到缓存表中
				let cacheKey = {
					appId: uniPayConifg.appId,
					platform: "weixin-mp",
					openid: res.openid
				}
				let session_key = res.session_key;
				delete res.session_key;
				await dao.opendbOpenData.setSessionKey(cacheKey, { session_key }, 30 * 24 * 60 * 60);
			}
			return res;
		} else if (provider === "alipay") {
			return await libs.alipay.getOpenid({
				config: uniPayConifg,
				code,
			});
		}
	}


	/**
	 * 获取支持的支付方式
	 * let payTypes = await service.pay.getPayProviderFromCloud();
	 */
	async getPayProviderFromCloud() {
		let wxpay = config.wxpay && config.wxpay.enable ? true : false;
		let alipay = config.alipay && config.alipay.enable ? true : false;
		let provider = [];
		if (wxpay) provider.push("wxpay");
		if (alipay) provider.push("alipay");
		return {
			errCode: 0,
			errMsg: "ok",
			wxpay,
			alipay,
			provider
		};
	}

	/**
	 * 验证iosIap苹果内购支付凭据
	 * let payTypes = await service.pay.verifyReceiptFromAppleiap();
	 */
	async verifyReceiptFromAppleiap(data) {
		let {
			out_trade_no,
			appleiap_account_token,
			transaction_receipt,
			transaction_identifier,
			clientInfo,
		} = data;
		if (!out_trade_no) {
			if (!appleiap_account_token) {
				return {
					errCode: 0,
					errMsg: "Invalid out_trade_no"
				}
			}
			appleiap_account_token = appleiap_account_token.toLowerCase(); // 转小写
			let payOrderInfo = await dao.uniPayOrders.find({
				provider: "appleiap",
				appleiap_account_token
			});
			if (!payOrderInfo || !payOrderInfo.out_trade_no) {
				return {
					errCode: 0,
					errMsg: "Invalid out_trade_no"
				}
			}
			out_trade_no = payOrderInfo.out_trade_no;
		}

		let payOrderInfo = await dao.uniPayOrders.find({
			out_trade_no,
		});
		if (!payOrderInfo) {
			throw { errCode: ERROR[52001] };
		}
		const verifyReceipt = async (uniPayConifg) => {
			const jwt = libs.jsonwebtoken;
			const fs = require('fs');
			const privateKey = fs.readFileSync(uniPayConifg.appCertPath, 'utf8');
			const header = {
				alg: 'ES256',
				kid: uniPayConifg.appId, // 替换为您的密钥ID
				typ: "JWT"
			};
			const nowTime = Date.now();
			const bundleId = uniPayConifg.sandbox ? uniPayConifg.devBundleId || uniPayConifg.bundleId : uniPayConifg.bundleId;
			const payload = {
				iss: uniPayConifg.issuerId, // 替换为您的团队ID
				iat: Math.floor(nowTime / 1000), // 当前时间戳
				exp: Math.floor(nowTime / 1000) + 3600, // 当前时间戳加1小时
				aud: 'appstoreconnect-v1',
				bid: bundleId
			};

			const iapToken = jwt.sign(payload, privateKey, {
				algorithm: 'ES256',
				header: header
			});
			const serviceUrl = uniPayConifg.sandbox ? "https://api.storekit-sandbox.itunes.apple.com" : "https://api.appstoreconnect.apple.com";
			const url = `${serviceUrl}/inApps/v1/transactions/${transaction_identifier}`;
			let requestRes;

			// 如果请求苹果服务器失败，则重试5次
			for (let i = 0; i <= 5; i++) {
				try {
					requestRes = await uniCloud.request({
						method: "GET",
						header: {
							'Authorization': `Bearer ${iapToken}`,
							'Content-Type': 'application/json'
						},
						url
					});
					break;
				} catch (err) {
					// console.log('errCode: ', err.code || err.errCode, 'errMsg: ', err.message || err.errMsg)
				}
			}

			if (requestRes.statusCode !== 200) {
				return {};
			}

			const signedInfoTokenArr = requestRes.data.signedTransactionInfo.split('.');
			const signedInfoString = Buffer.from(signedInfoTokenArr[1], 'base64').toString('utf8');
			const verifyReceiptRes = JSON.parse(signedInfoString);
			const appAccountToken = verifyReceiptRes.appAccountToken.toLowerCase();
			verifyReceiptRes.tradeState = verifyReceiptRes.inAppOwnershipType === "PURCHASED" && payOrderInfo.appleiap_account_token === appAccountToken ? "SUCCESS" : "fail";
			return verifyReceiptRes;
		};

		let uniPayConifg = await this.getUniPayConfig({ provider: "appleiap", provider_pay_type: "app" });
		let verifyReceiptRes = await verifyReceipt(uniPayConifg);
		let userOrderSuccess = false;
		let pay_date;
		if (verifyReceiptRes.tradeState !== "SUCCESS") {
			// 尝试使用相反的环境再次验证
			console.log('尝试使用相反的环境再次验证: ');
			verifyReceiptRes = await verifyReceipt({
				...uniPayConifg,
				sandbox: !uniPayConifg.sandbox
			});
			if (verifyReceiptRes.tradeState !== "SUCCESS") {
				// 如果还是不成功，则校验不通过
				throw { errCode: ERROR[54002] };
			}
		}

		//console.log('verifyReceiptRes: ', verifyReceiptRes)

		let isSubscribe = false;
		if (["Auto-Renewable Subscription"].indexOf(verifyReceiptRes.type) > -1) {
			isSubscribe = true; // 标记为自动订阅订单
		}

		// 支付成功
		pay_date = Number(verifyReceiptRes.purchaseDate);
		let quantity = verifyReceiptRes.quantity; // 购买数量
		let product_id = verifyReceiptRes.productId; // 对应的内购产品id
		let transaction_id = verifyReceiptRes.transactionId; // 本次交易id
		let original_transaction_id = verifyReceiptRes.originalTransactionId; // 原始交易id
		if ((Date.now() - 1000 * 3600 * 72) > pay_date && !isSubscribe) {
			// 非自动订阅订单，若超72小时，不做处理，通知前端直接关闭订单。
			return {
				errCode: 0,
				errMsg: "ok"
			};
		}
		if (isSubscribe && original_transaction_id !== transaction_id) {
			let findOrderInfo = await dao.uniPayOrders.find({
				appleiap_account_token: payOrderInfo.appleiap_account_token,
				user_order_success: _.exists(true)
			});
			if (findOrderInfo) {
				// 自动订阅产品自动续期时需要创建新的支付订单
				let quantity = verifyReceiptRes.quantity;
				let goods_price = parseFloat((verifyReceiptRes.price / 1000).toFixed(2));
				let total_fee = parseFloat((goods_price * 100 * quantity).toFixed(2));
				let description = "[自动续期]" + payOrderInfo.description.replace(/\[自动续期\]/g, '');
				// 添加数据库(数据库的out_trade_no字段需设置为唯一索引)
				let stat_platform = clientInfo.platform;
				if (stat_platform === "app") {
					stat_platform = clientInfo.os;
				}
				// 创建新的支付订单
				let addId = await dao.uniPayOrders.add({
					provider: payOrderInfo.provider,
					provider_pay_type: payOrderInfo.provider_pay_type,
					uni_platform: clientInfo.platform,
					status: 0,
					type: payOrderInfo.type,
					order_no: payOrderInfo.order_no,
					out_trade_no: transaction_id,
					user_id: payOrderInfo.user_id,
					nickname: payOrderInfo.nickname,
					device_id: clientInfo.deviceId,
					client_ip: clientInfo.client_ip,
					openid: payOrderInfo.openid,
					description,
					total_fee,
					refund_fee: 0,
					refund_count: 0,
					provider_appid: uniPayConifg.appId,
					appid: clientInfo.appId,
					custom: payOrderInfo.custom,
					create_date: Date.now(),
					expand_data: payOrderInfo.expand_data,
					appleiap_account_token, // 苹果虚拟支付专用字段
					stat_data: {
						platform: stat_platform,
						app_version: clientInfo.appVersion,
						app_version_code: clientInfo.appVersionCode,
						app_wgt_version: clientInfo.appWgtVersion,
						os: clientInfo.os,
						ua: clientInfo.ua,
						channel: clientInfo.channel ? clientInfo.channel : String(clientInfo.scene),
						scene: clientInfo.scene
					}
				});
				payOrderInfo = await dao.uniPayOrders.find({
					_id: addId,
				});
				out_trade_no = transaction_id;
			}
		}

		// 查询该transaction_id是否使用过，如果已使用，则不做处理，通知前端直接关闭订单。
		let findOrderInfo = await dao.uniPayOrders.find({
			transaction_id,
		});
		const repeatReceipt = () => {
			return {
				errCode: 0,
				errMsg: "ok",
				repeat: true, // 代表重复通知了
			};
		};
		if (findOrderInfo) {
			// 不允许重复通知
			return repeatReceipt();
		}
		// 否则，执行用户回调
		// 用户自己的逻辑处理 开始-----------------------------------------------------------
		let orderPaySuccess;
		try {
			// 加载自定义异步回调函数
			orderPaySuccess = require(`../notify/${payOrderInfo.type}`);
		} catch (err) {
			console.log(err);
		}
		if (typeof orderPaySuccess === "function") {
			let newPayOrderInfo = await dao.uniPayOrders.updateAndReturn({
				whereJson: {
					status: 0, // status:0 为必须条件，防止重复推送时的错误
					out_trade_no: out_trade_no, // 商户订单号
				},
				dataJson: {
					status: 1, // 设置为已付款
					transaction_id: transaction_id, // 第三方支付单号
					pay_date: pay_date,
					notify_date: pay_date,
					original_data: verifyReceiptRes
				}
			});
			if (!newPayOrderInfo) {
				// 不允许重复通知
				return repeatReceipt();
			}
			payOrderInfo = newPayOrderInfo;
			console.log('用户自己的回调逻辑 - 开始执行');
			userOrderSuccess = await orderPaySuccess({
				verifyResult: verifyReceiptRes,
				data: payOrderInfo,
			});
			console.log('用户自己的回调逻辑 - 执行完成');
			payOrderInfo = await dao.uniPayOrders.updateAndReturn({
				whereJson: {
					status: 1,
					out_trade_no,
				},
				dataJson: {
					user_order_success: userOrderSuccess,
				}
			});
		} else {
			payOrderInfo = await dao.uniPayOrders.find({
				out_trade_no,
			});
		}
		console.log('userOrderSuccess', userOrderSuccess);
		// 用户自己的逻辑处理 结束-----------------------------------------------------------

		//console.log('verifyReceiptRes: ', verifyReceiptRes);
		return {
			errCode: 0,
			errMsg: "ok",
			has_paid: true, // 标记用户是否已付款成功（此参数只能表示用户确实付款了，但系统的异步回调逻辑可能还未执行完成）
			out_trade_no, // 支付插件订单号
			transaction_id, // 支付平台订单号
			status: payOrderInfo.status, // 标记当前支付订单状态 -1：已关闭 0：未支付 1：已支付 2：已部分退款 3：已全额退款
			user_order_success: payOrderInfo.user_order_success, // 用户异步通知逻辑是否全部执行完成，且无异常（建议前端通过此参数是否为true来判断是否支付成功）
			pay_order: payOrderInfo,
			is_subscribe: isSubscribe
		};
	}

	/**
	 * 获取对应支付配置
	 * let uniPayConifg = await this.getUniPayConfig({ provider, provider_pay_type });
	 */
	async getUniPayConfig(data = {}) {
		let {
			provider,
			provider_pay_type,
		} = data;
		if (config && config[provider] && config[provider][provider_pay_type]) {
			let uniPayConfig = config[provider][provider_pay_type];
			if (!uniPayConfig.appId && provider !== "appleiap") {
				throw new Error(`uni-pay配置${provider}.${provider_pay_type}节点下的appId不能为空`);
			}
			return uniPayConfig;
		} else {
			throw new Error(`${provider}_${provider_pay_type} : 商户支付配置错误`);
		}
	}

	/**
	 * 初始化uniPayInstance
	 * let uniPayInstance = await service.pay.initUniPayInstance({ provider, provider_pay_type });
	 */
	async initUniPayInstance(data = {}) {
		let {
			provider,
		} = data;
		let uniPayConifg = await this.getUniPayConfig(data);
		let uniPayInstance;
		if (provider === "wxpay") {
			// 微信
			if (uniPayConifg.version === 3) {
				try {
					uniPayInstance = uniPay.initWeixinV3(uniPayConifg);
				} catch (err) {
					console.error(err);
					let errMsg = err.message;
					if (errMsg && errMsg.indexOf("invalid base64 body") > -1) {
						throw { errCode: ERROR[53005] };
					}
					throw err;
				}
			} else {
				uniPayInstance = uniPay.initWeixin(uniPayConifg);
			}
		} else if (provider === "alipay") {
			// 支付宝
			uniPayInstance = uniPay.initAlipay(uniPayConifg);
		} else if (provider === "appleiap") {
			// 苹果虚拟支付
			uniPayInstance = uniPay.initAppleIapPayment(uniPayConifg);
		} else if (provider === "wxpay-virtual") {
			// 微信虚拟支付
			// 还需要额外传accessToken
			uniPayConifg.accessToken = await this.getAccessToken(data);
			uniPayInstance = uniPay.initWeixinVirtualPayment(uniPayConifg);
		} else {
			throw new Error(`${provider} : 不支持的支付方式`);
		}
		return uniPayInstance;
	}

	/**
	 * 获取accessToken
	 * let uniPayInstance = await service.pay.getAccessToken({ provider, provider_pay_type });
	 */
	async getAccessToken(data = {}) {
		let uniPayConifg = await this.getUniPayConfig(data);
		let cacheKey = {
			appId: uniPayConifg.appId,
			platform: "weixin-mp"
		}
		let cacheInfo = await dao.opendbOpenData.getAccessToken(cacheKey);
		if (cacheInfo) {
			// 缓存有值
			return cacheInfo.access_token;
		} else {
			// 缓存无值
			let getAccessTokenRes = await libs.wxpay.getAccessToken(uniPayConifg);
			let accessToken = getAccessTokenRes.accessToken;
			// 缓存accessToken
			await dao.opendbOpenData.setAccessToken(cacheKey, {
				access_token: getAccessTokenRes.accessToken,
			}, getAccessTokenRes.expiresIn);
			return accessToken;
		}
	}

	/**
	 * 获取sessionKey
	 * let sessionKey = await service.pay.getSessionKey({ provider, provider_pay_type, openid });
	 */
	async getSessionKey(data = {}) {
		let {
			openid,
		} = data;
		// 获取用户的sessionKey
		let uniPayConifg = await this.getUniPayConfig(data);
		let { session_key } = await dao.opendbOpenData.getSessionKey({
			appId: uniPayConifg.appId,
			platform: "weixin-mp",
			openid
		});
		return session_key;
	}

	/**
	 * 请求微信小程序虚拟支付API
	 * let res = await service.pay.requestWxpayVirtualApi(data);
	 */
	async requestWxpayVirtualApi(options = {}) {
		let {
			method,
			data = {}
		} = options;
		// 微信虚拟支付固定参数
		let provider = "wxpay-virtual";
		let provider_pay_type = "mp";
		// 获得微信小程序虚拟支付实例
		let uniPayInstance = await this.initUniPayInstance({ provider, provider_pay_type });
		// 调用微信小程序虚拟支付云端API

		if (["currencyPay"].indexOf(method) > -1) {
			if (!data.sessionKey) {
				data.sessionKey = await this.getSessionKey({ ...data, provider, provider_pay_type });
			}
		}

		let res = await uniPayInstance[method](data);
		return res;
	}

}


module.exports = new service();