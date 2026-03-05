const service = require('./service/index.js');

class UniMap {

	// 构造函数
	constructor(data = {}) {
		let {
			provider, // 平台 weixin-mp 微信小程序 weixin-h5 微信公众号
			key, // 密钥
			needOriginalResult = false, // 是否需要返回原始信息，默认false
		} = data;

		let runService = service[provider];
		if (!runService) {
			throw new Error(`不支持平台：${provider}`);
		}
		this.service = new runService({
			provider,
			key,
			needOriginalResult
		});
		//return this.service;
	}

	// API - 逆地址解析（坐标转地址）
	async location2address(data = {}) {
		let res = await this._call("location2address", data);
		return res;
	}

	// API - 地址解析（地址转坐标）
	async address2location(data = {}) {
		let res = await this._call("address2location", data);
		return res;
	}

	// API - 坐标转换
	async translate(data = {}) {
		let res = await this._call("translate", data);
		return res;
	}

	// API - IP定位
	async ip2location(data = {}) {
		let res = await this._call("ip2location", data);
		return res;
	}

	// API - 关键词输入提示
	async inputtips(data = {}) {
		let res = await this._call("inputtips", data);
		return res;
	}
	
	// API - 周边搜索
	async search(data = {}) {
		let res = await this._call("search", data);
		return res;
	}
	
	// API - 行政区划
	async districtSearch(data = {}) {
		let res = await this._call("districtSearch", data);
		return res;
	}
	
	// API - 路线规划（驾车/步行/骑行/电动车/公交）
	async route(data = {}) {
		let urlObj = {
			"driving": "drivingRoute",
			"walking": "walkingRoute",
			"bicycling": "bicyclingRoute",
			"ebicycling": "ebicyclingRoute",
			"transit": "transitRoute"
		};
		let res = await this._call(urlObj[data.mode], data);
		res.result.mode = data.mode;
		return res;
	}

	// 私有函数
	async _call(name, data = {}) {
		let runFunction = this.service[name];
		if (!runFunction) {
			throw new Error(`平台：${this.service.config.provider} 不支持API：${name}`);
		}
		let res = await runFunction.call(this.service, data); // 此处需要使用call，防止里面的this作用域被意外改变
		if (!this.service.config.needOriginalResult) {
			delete res.originalResult;
		}
		//res = JSON.parse(JSON.stringify(res));
		return {
			provider: this.service.config.provider,
			...res
		};
	}

}

module.exports = UniMap;