// 引入uni-map-common公共模块
const UniMap = require('uni-map-common');

const configCenter = require("uni-config-center");

// 读取配置中心地图配置
var UniMapConfig = configCenter({ pluginId: 'uni-map' }).requireFile('config.js');

// 本地地图配置
var LocalMapConfig = {
	"default": "", // 默认使用的平台
	"key": {
		"qqmap": "", // 腾讯地图key
		"amap": "", // 高德地图key
	}
}

const db = uniCloud.database();
const _ = db.command;
const $ = _.aggregate;

const opendbPoiDB = db.collection("opendb-poi");

class MyError extends Error {
	constructor(errMsg, errCode = -1) {
		super(errMsg);
		this.err = {
			errCode,
			errMsg
		}
	}
}

module.exports = {
	_before: function() {
		// 如果配置中心不存在地图配置，则使用本地地图配置
		if (!UniMapConfig) {
			UniMapConfig = LocalMapConfig;
		}
		let defaultProvider = UniMapConfig.default || "qqmap";
		let params = this.getParams();
		let {
			provider = defaultProvider,
				needOriginalResult = false
		} = params[0] || {};
		const key = UniMapConfig.key[provider] || LocalMapConfig.key[provider];
		if (!key) {
			throw { errCode: -1, errMsg: `请在uni-config-center/uni-map/config.js中或LocalMapConfig中配置地图供应商${provider}对应的key` };
		}
		// 初始化实例
		let uniMap = new UniMap({
			provider: provider, // 指定使用哪家地图供应商
			key: key,
			needOriginalResult
		});
		this.uniMap = uniMap;
		// // 在这里可以做一些统一的前置处理，比如权限校验、参数校验等
		// let {
		//   payload, // payload参数为前端传递的参数，可以在前端调用uni.chooseLocation时传递
		// } = this.getParams()[0] || {};
		// if (!payload) {
		//   throw new MyError("payload参数不能为空", -1);
		// }
		// // 如果业务在uniCloud上，则直接在这里写判断逻辑即可
		// if (true) {
		// 	throw new MyError("权限不足", -1);
		// }

		// // 如果业务不在uniCloud上，可通过 uniCloud.request 调用自己的服务进行校验
		// const requestRes = await uniCloud.request({
		//   method: 'POST',
		//   url: '你自己的接口地址',
		//   data: payload,
		// });
		// // 约定errCode不为0代表校验失败，errMsg为失败原因
		// if (requestRes.data.errCode !== 0) {
		//   throw new MyError(requestRes.data.errMsg, requestRes.data.errCode);
		// }

	},
	_after: function(err, res) {
		if (err) {
			if (err.err) {
				return err.err;
			}
			if (err.errCode) {
				return err;
			}
			throw err; // 如果方法抛出错误，也直接抛出不处理
		}
		console.log("result", res.result);
		return res;
	},
	// 函数chooseLocation是给uni.chooseLocation使用，请勿修改chooseLocation函数的代码
	async chooseLocation(parame = {}) {
		let res = {};
		let {
			action,
			data,
			needOriginalResult
		} = parame;
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap[action](data);
		res.result = needOriginalResult ? result.originalResult : result;
		// 模拟错误
		// res.errCode = 121;
		// res.errMsg = '此key每日调用量已达到上限'
		return res;
	},
	// 经纬度坐标转地址
	async location2address(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.location2address(data);
		res.result = result;
		return res;
	},
	// 地址转经纬度坐标
	async address2location(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.address2location(data);
		res.result = result;
		return res;
	},
	// 坐标系转换
	async translate(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.translate(data);
		res.result = result;
		return res;
	},
	// ip定位
	async ip2location(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.ip2location(data);
		res.result = result;
		return res;
	},
	// 输入提示
	async inputtips(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.inputtips(data);
		res.result = result;
		return res;
	},

	// 搜索
	async search(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.search(data);
		res.result = result;
		return res;
	},

	// 行政区划
	async districtSearch(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.districtSearch(data);
		res.result = result;
		return res;
	},

	// 路径规划
	async route(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.route(data);
		res.result = result;
		return res;
	},

	// 演示用 - 清空所有的测试POI
	async clearPoi(data = {}) {
		let res = { errCode: 0 };
		const db = uniCloud.database();
		await db.collection("opendb-poi").where({
			is_random: true
		}).remove();
		return res;
	},

	// 演示用 - 初始化静态001场景演示数据
	async initStatic001(data = {}) {
		let res = { errCode: 0 };
		const category = "static-001";
		// 先删除
		await opendbPoiDB.where({
			category: category
		}).remove();
		// 后添加随机数据

		// 以天安门为中心
		let tiananmen = {
			longitude: 116.39747,
			latitude: 39.908823,
		};
		let time = Date.now();

		// 随机生成6个门店地址
		let list = [];
		for (let i = 1; i <= 6; i++) {
			let randomCoordinate = getRandomCoordinateWithinRadius(tiananmen.longitude, tiananmen.latitude, 10); // 随机生成在天安门方圆X KM内的坐标
			list.push({
				category: category, // 场景值，用于区分这些POI所属哪张地图
				type: "门店",
				title: `随机门店-${i}`,
				location: new db.Geo.Point(randomCoordinate.longitude, randomCoordinate.latitude),
				create_date: time,
				visible: true,
				is_random: true, // 表示此为随机生成的点，方便删除
				level: i
			});
		}
		// 随机生成1个总部地址
		let randomCoordinate = getRandomCoordinateWithinRadius(tiananmen.longitude, tiananmen.latitude, 1); // 随机生成在天安门方圆X KM内的坐标
		list.push({
			category: category, // 场景值，用于区分这些POI所属哪张地图
			type: "总部",
			title: `随机总部`,
			location: new db.Geo.Point(randomCoordinate.longitude, randomCoordinate.latitude),
			create_date: time,
			visible: true,
			is_random: true, // 表示此为随机生成的点，方便删除
			level: 7
		});

		// 添加到数据库
		await opendbPoiDB.add(list);

		return res;
	},

	// 演示用 - 初始化动态001场景演示数据（模拟送外卖场景）
	async initDynamics001(data = {}) {
		let res = { errCode: 0 };

		const category = "dynamics-001";

		// 先删除
		await opendbPoiDB.where({
			category: category
		}).remove();
		// 后添加随机数据

		// 以天安门为中心
		let tiananmen = {
			longitude: 116.39747,
			latitude: 39.908823,
		};

		let time = Date.now();

		// 随机生成配送员坐标
		let randomCoordinate1 = getRandomCoordinateWithinRadius(tiananmen.longitude, tiananmen.latitude, 2); // 随机生成在天安门方圆X KM内的坐标
		let data1 = {
			category: category, // 场景值，用于区分这些POI所属哪张地图
			type: "配送员",
			title: "配送员",
			location: new db.Geo.Point(randomCoordinate1.longitude, randomCoordinate1.latitude),
			create_date: time,
			visible: true,
			is_random: true, // 表示此为随机生成的点，方便删除
		}
		// 随机生成目的地坐标
		let randomCoordinate2 = getRandomCoordinateWithinRadius(tiananmen.longitude, tiananmen.latitude, 2); // 随机生成在天安门方圆X KM内的坐标
		let data2 = {
			category: category, // 场景值，用于区分这些POI所属哪张地图
			type: "目的地",
			title: "配送目的地",
			location: new db.Geo.Point(randomCoordinate2.longitude, randomCoordinate2.latitude),
			create_date: time,
			visible: true,
			is_random: true, // 表示此为随机生成的点，方便删除
		}
		let list = [data1, data2];
		// 添加到数据库
		await opendbPoiDB.add(list);

		// 获取配送路线
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用电瓶车路径规划API
		let result = await uniMap.route({
			mode: "ebicycling",
			from: `${randomCoordinate1.latitude},${randomCoordinate1.longitude}`,
			to: `${randomCoordinate2.latitude},${randomCoordinate2.longitude}`,
			alternative_route: 1
		});

		let route = result.result.routes[0];
		let { steps = [] } = route;
		let points = [];
		steps.map((step) => {
			let {
				polyline = ""
			} = step;
			let arr = polyline.split(";");
			arr.map((item) => {
				let arr2 = item.split(",");
				points.push({
					latitude: arr2[0],
					longitude: arr2[1],
				});
			});
		});
		let polyline = {
			points,
			color: "#19b411",
			width: 6,
			dottedLine: false,
			arrowLine: true,
			borderWidth: 1,
			borderColor: "#000000",
		};
		res.polyline = [polyline];
		return res;
	},

	// 演示用 - 获取配送员配送路径
	async getPolyline(data = {}) {
		let res = { errCode: 0 };

		const category = "dynamics-001";

		let getRes1 = await opendbPoiDB.where({
			category: category,
			type: "配送员",
			visible: true
		}).get();
		let poi1 = getRes1.data[0];

		let getRes2 = await opendbPoiDB.where({
			category: category,
			type: "目的地",
			visible: true
		}).get();
		let poi2 = getRes2.data[0];
		if (!poi2) {
			return {
				errCode: 0,
				end: true
			}
		}

		let coordinate1 = {
			longitude: poi1.location.coordinates[0],
			latitude: poi1.location.coordinates[1]
		};

		let coordinate2 = {
			longitude: poi2.location.coordinates[0],
			latitude: poi2.location.coordinates[1]
		};

		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用电瓶车路径规划API
		let result = await uniMap.route({
			mode: "ebicycling",
			from: `${coordinate1.latitude},${coordinate1.longitude}`,
			to: `${coordinate2.latitude},${coordinate2.longitude}`,
			alternative_route: 1
		});

		let route = result.result.routes[0];
		//console.log('route: ', route)
		let { steps = [], distance, duration } = route;
		let points = [];
		let dir_desc;
		steps.map((step) => {
			let {
				polyline = ""
			} = step;
			if (!dir_desc) dir_desc = step.dir_desc;
			if (polyline) {
				let arr = polyline.split(";");
				arr.map((item) => {
					let arr2 = item.split(",");
					if (!isNaN(arr2[0]) && !isNaN(arr2[1])) {
						points.push({
							latitude: Number(arr2[0]),
							longitude: Number(arr2[1]),
						});
					}
				});
			}
		});
		let polyline = {
			points,
			color: "#19b411",
			width: 6,
			dottedLine: false,
			arrowLine: true,
			borderWidth: 1,
			borderColor: "#000000",
		};
		res.polyline = [polyline];
		if (distance <= 30 || duration <= 0) {
			await opendbPoiDB.doc(poi1._id).update({
				title: `配送员已到达目的地`,
				location: new db.Geo.Point(Number(coordinate2.longitude), Number(coordinate2.latitude)),
				rotate: 0
			});
			// 隐藏目的地
			await opendbPoiDB.doc(poi2._id).update({
				visible: false,
			});
			return {
				errCode: 0,
				end: true
			}
		} else {
			// 从最近2个点计算出当前行驶方向
			let rotate = 0;
			if (points && points.length >= 2) {
				rotate = calculateDirectionAngle(points[0], points[1]);
			}
			await opendbPoiDB.doc(poi1._id).update({
				title: `配送员正在配送\r\n还有 ${distance} 米\r\n预计 ${duration} 分钟送达`,
				rotate: rotate, // 设置角度，0°的图片方向应朝左(西) 故90° 朝上(北) 180° 朝右(东) 270° 朝下(南)
			});
		}
		return res;
	},
	// 演示用 - 模拟上报配送员坐标
	async updateMyLocation(data = {}) {
		let res = {};

		const category = "dynamics-001";

		let {
			longitude,
			latitude
		} = data;

		let getRes1 = await opendbPoiDB.where({
			category: category,
			type: "配送员",
			visible: true
		}).get();
		let poi1 = getRes1.data[0];

		await opendbPoiDB.doc(poi1._id).update({
			location: new db.Geo.Point(Number(longitude), Number(latitude))
		});
		return res;
	},

	// 演示用 - xxxx
	async test(data = {}) {
		let res = {};
		// 获取uniMap实例
		const uniMap = this.uniMap;
		// 调用API
		let result = await uniMap.location2address({

		});
		res.result = result;
		return res;
	}
}



/**
 * 生成在指定经纬度圆内的随机坐标

const latitude = 39.908823; // 指定纬度
const longitude = 116.39747; // 指定经度
const radiusInKm = 10; // 指定圆的半径（单位：千米）

const randomCoordinate = getRandomCoordinateWithinRadius(latitude, longitude, radiusInKm);
console.log(randomCoordinate);

 */
function getRandomCoordinateWithinRadius(longitude, latitude, radiusInKm) {
	// 地球半径（单位：千米）
	const earthRadius = 6371;

	// 将圆的半径转换为弧度
	const radiusInRad = radiusInKm / earthRadius;

	// 生成随机的方位角（弧度，0到2π）
	const randomAngleRad = Math.random() * 2 * Math.PI;

	// 生成随机的距离（弧度，0到圆的半径）
	const randomDistanceRad = Math.acos(Math.random() * (Math.cos(radiusInRad) - 1) + 1);

	// 使用球面三角学计算随机点的纬度和经度
	const randomLatitudeRad = latitude * (Math.PI / 180) + randomDistanceRad * Math.cos(randomAngleRad);
	const randomLongitudeRad = longitude * (Math.PI / 180) + randomDistanceRad * Math.sin(randomAngleRad) / Math.cos(latitude * (Math.PI / 180));

	// 转换为度，并保留6位小数
	const randomLatitude = parseFloat((randomLatitudeRad * (180 / Math.PI)).toFixed(6));
	const randomLongitude = parseFloat((randomLongitudeRad * (180 / Math.PI)).toFixed(6));

	return { latitude: randomLatitude, longitude: randomLongitude };
}


/**
 * 计算坐标B在坐标A的方向，0代表正西方 90 代表正北方

const latitude = 39.908823; // 指定纬度
const longitude = 116.39747; // 指定经度
const radiusInKm = 10; // 指定圆的半径（单位：千米）

const randomCoordinate = getRandomCoordinateWithinRadius(latitude, longitude, radiusInKm);
console.log(randomCoordinate);

 */
function calculateDirectionAngle(coordA, coordB) {
	const toRadians = (angle) => angle * (Math.PI / 180);
	const toDegrees = (angle) => angle * (180 / Math.PI);

	const lat1 = toRadians(coordA.latitude);
	const lon1 = toRadians(coordA.longitude);
	const lat2 = toRadians(coordB.latitude);
	const lon2 = toRadians(coordB.longitude);

	const dLon = lon2 - lon1;
	const y = Math.sin(dLon) * Math.cos(lat2);
	const x =
		Math.cos(lat1) * Math.sin(lat2) -
		Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
	const angleRadians = Math.atan2(y, x);

	let angleDegrees = toDegrees(angleRadians);
	angleDegrees = (angleDegrees + 360) % 360;

	angleDegrees = (angleDegrees > 180) ? angleDegrees - 180 : angleDegrees + 180;
	angleDegrees -= 90; // 以正西方为0°表示，因此需要-90
	return angleDegrees;
}
