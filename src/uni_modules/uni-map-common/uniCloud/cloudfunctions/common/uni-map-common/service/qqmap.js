const libs = require('../libs');

class Service {

	// 构造函数
	constructor(data = {}) {
		let {
			key,
			needOriginalResult = false, // 是否需要返回原始信息，默认false
		} = data;

		this.config = {
			provider: "qqmap",
			key,
			needOriginalResult,
			serviceUrl: "https://apis.map.qq.com"
		}
	}

	async request(obj = {}) {
		let {
			url,
			data = {}
		} = obj;
		if (url.indexOf("http") !== 0) {
			url = `${this.config.serviceUrl}/${url}`
		}
		if (this.config.key && !data.key) {
			data.key = this.config.key;
		}
		obj.data = JSON.parse(JSON.stringify(obj.data));
		let requestRes = await uniCloud.httpclient.request(url, obj);
		let result = this.getResult(requestRes);
		if (result.errCode != 0) {
			throw new libs.error.UniCloudError(result);
		}
		return result;
	}

	getResult(requestRes) {
		let {
			data: originalResult = {}
		} = requestRes;

		let res = {
			errCode: originalResult.status == 0 ? 0 : this.getErrCode(originalResult.status),
			errMsg: originalResult.message,
			originalResult,
		};

		return res;
	}

	getErrCode(errCode) {
		return errCode;
	}

	// API - 逆地址解析（坐标转地址）
	async location2address(data = {}) {
		let {
			location,
			get_poi,
			poi_options
		} = data;

		let _poi_options = "";
		if (typeof poi_options === "object") {
			let {
				address_format,
				radius,
				policy,
				page_index,
				page_size
			} = poi_options;
			if (address_format && address_format !== "long") {
				_poi_options += `address_format=${address_format};`
			}
			if (radius) {
				_poi_options += `radius=${radius};`
			}
			if (policy) {
				_poi_options += `policy=${policy};`
			}
			if (page_index) {
				_poi_options += `page_index=${page_index};`
			}
			if (page_size) {
				_poi_options += `page_size=${page_size};`
			}
			
			if (_poi_options.lastIndexOf(";") === _poi_options.length - 1) {
				_poi_options = _poi_options.substring(0, _poi_options.length - 1);
			}
		}
		if (!_poi_options) _poi_options = undefined;
		let requestRes = await this.request({
			method: "GET",
			url: "ws/geocoder/v1/",
			dataType: "json",
			data: {
				location,
				get_poi,
				poi_options: _poi_options,
			}
		});
		let originalResult = requestRes.originalResult.result;
		let pois;
		if (originalResult.pois) {
			pois = originalResult.pois.map((item) => {
				return {
					id: item.id,
					title: item.title,
					address: item.address,
					location: item.location,
					distance: item._distance,
					direction: item._dir_desc,
					category: item.category
				}
			});
		}
		let result = {
			formatted_addresses: originalResult.address,
			country: originalResult.address_component.nation,
			province: originalResult.address_component.province,
			city: originalResult.address_component.city,
			district: originalResult.address_component.district,
			street: originalResult.address_component.street,
			street_number: originalResult.address_component.street_number,
			adcode: originalResult.ad_info.adcode,
			pois
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 地址解析（地址转坐标）
	async address2location(data = {}) {
		let {
			address,
			city,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: "ws/geocoder/v1/",
			dataType: "json",
			data: {
				address: address,
				region: city,
			}
		});
		let originalResult = requestRes.originalResult.result;

		let result = {
			location: originalResult.location,
			adcode: originalResult.ad_info.adcode,
			province: originalResult.address_components.province,
			city: originalResult.address_components.city,
			district: originalResult.address_components.district,
			street: originalResult.address_components.street,
			street_number: originalResult.address_components.street_number,
		};
		let res = {
			result,
			...requestRes
		};

		return res;
	}

	// API - 坐标转换
	async translate(data = {}) {
		let {
			locations,
			type,
		} = data;
		let locationsStr = "";
		locations.map((item, index) => {
			if (index > 0) {
				locationsStr += ";";
			}
			locationsStr += libs.common.getLocation(item, "object", "lat,lng");
		})

		let requestRes = await this.request({
			method: "GET",
			url: "ws/coord/v1/translate",
			dataType: "json",
			data: {
				locations: locationsStr,
				type
			}
		});
		let originalResult = requestRes.originalResult;

		let result = {
			locations: originalResult.locations
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - IP定位
	async ip2location(data = {}) {
		let {
			ip,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: "ws/location/v1/ip",
			dataType: "json",
			data: {
				ip
			}
		});
		let originalResult = requestRes.originalResult.result;
		let result = {
			location: libs.common.getLocation(originalResult.location, "object", "object"),
			nation: originalResult.ad_info.nation,
			nation_code: originalResult.ad_info.nation_code,
			adcode: originalResult.ad_info.adcode,
			province: originalResult.ad_info.province,
			city: originalResult.ad_info.city,
			district: originalResult.ad_info.district
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 关键词输入提示
	async inputtips(data = {}) {
		let {
			keyword,
			city,
			citylimit,
			location,
			get_subpois,
			policy,
			filter,
			address_format,
			page_index,
			page_size
		} = data;

		let requestData = {
			keyword,
			region: city,
			region_fix: citylimit ? 1 : 0,
			get_subpois,
			policy,
			filter,
			address_format,
			page_index,
			page_size
		};
		if (location) {
			requestData.location = libs.common.getLocation(location, "object", "lat,lng");
		}

		let requestRes = await this.request({
			method: "GET",
			url: "ws/place/v1/suggestion",
			dataType: "json",
			data: requestData
		});
		let originalResult = requestRes.originalResult;

		let _data = originalResult.data.map((item) => {
			
			let children;
			if (originalResult.sub_pois) {
				children = [];
				originalResult.sub_pois.map((item2) => {
					if (item2.parent_id === item.id) {
						children.push({
							parent_id: item.id,
							id: item2.id,
							title: item2.title,
							address: item2.address,
							category: item2.category,
							location: item2.location,
							adcode: String(item2.adcode),
							city: item2.city,
						});
					}
				});
			}
			
			return {
				id: item.id,
				title: item.title,
				address: item.address,
				category: item.category,
				type: item.type,
				location: item.location,
				adcode: item.adcode,
				province: item.province,
				city: item.city,
				district: item.district,
				children
			}
		});

		let result = {
			data: _data
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 周边搜索
	async search(data = {}) {
		let {
			keyword,
			location,
			radius = 1000,
			auto_extend = 1,
			get_subpois,
			orderby,
			page_index = 1,
			page_size = 20,
			filter
		} = data;

		if (radius < 10) radius = 10;

		let boundary = `nearby(${location.lat},${location.lng},${radius},${auto_extend})`;

		let requestData = {
			keyword,
			boundary,
			get_subpois,
			filter,
			orderby: orderby ===  "distance" ? "_distance" : undefined,
			page_index,
			page_size
		};

		let requestRes = await this.request({
			method: "GET",
			url: "ws/place/v1/search",
			dataType: "json",
			data: requestData
		});
		let originalResult = requestRes.originalResult;

		let _data = originalResult.data.map((item) => {
			let children;
			if (originalResult.sub_pois) {
				children = [];
				originalResult.sub_pois.map((item2) => {
					if (item2.parent_id === item.id) {
						children.push({
							parent_id: item.id,
							id: item2.id,
							title: item2.title,
							address: item2.address,
							category: item2.category,
							location: item2.location,
							tel: item2.tel,
							adcode: String(item2.ad_info.adcode),
							province: item2.ad_info.province,
							city: item2.ad_info.city,
							district: item2.ad_info.district,
						});
					}
				});
			}
			
			return {
				id: item.id,
				title: item.title,
				tel: item.tel,
				address: item.address,
				category: item.category,
				type: item.type,
				location: item.location,
				distance: item._distance,
				adcode: String(item.ad_info.adcode),
				province: item.ad_info.province,
				city: item.ad_info.city,
				district: item.ad_info.district,
				children
			}
		});

		let result = {
			data: _data
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}
	
	// API - 行政区划
	async districtSearch(data = {}) {
		let {
			adcode,
			get_polygon,
			max_offset
		} = data;
		
		let requestData = {
			id: adcode,
			get_polygon,
			max_offset
		};
	
		let requestRes = await this.request({
			method: "GET",
			url: "ws/district/v1/getchildren",
			dataType: "json",
			data: requestData
		});
		let originalResult = requestRes.originalResult;
		let _data = originalResult.result[0].map((item) => {
			return {
				adcode: item.id,
				name: item.name || item.fullname,
				fullname: item.fullname,
				location: item.location,
				pinyin: item.pinyin,
				cidx: item.cidx,
				polygon: item.polygon,
			}
		});
	
		let result = {
			data: _data,
			data_version: originalResult.data_version
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 路线规划（驾车）
	async drivingRoute(data = {}) {
		let {
			mode,
			from,
			to,
			from_poi,
			to_poi,
			policy,
			waypoints,
			avoid_polygons,
			road_type,
			plate_number,
			cartype,
			heading,
			speed,
			accuracy,
			from_track,
			get_mp,
			no_step
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `ws/direction/v1/driving`,
			dataType: "json",
			data: {
				from,
				to,
				from_poi,
				to_poi,
				policy,
				waypoints,
				avoid_polygons,
				road_type,
				plate_number,
				cartype,
				heading,
				speed,
				accuracy,
				from_track,
				get_mp,
				get_speed: 1,
				added_fields: "cities",
				no_step
			}
		});

		let originalResult = requestRes.originalResult.result;
		let routes = originalResult.routes.map((item) => {
			let waypoints;
			if (item.waypoints) {
				waypoints = item.waypoints.map((item2) => {
					return {
						title: item2.title,
						location: item2.location,
						duration: item2.duration,
						distance: item2.distance,
						polyline: this.getPolyline(item.polyline, item2.polyline_idx),
						polyline_idx: item2.polyline_idx,
					}
				});
			}
			let steps = item.steps.map((item2) => {
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.dir_desc,
					distance: item2.distance,
					act_desc: item2.act_desc,
					accessorial_desc: item2.accessorial_desc,
					polyline: this.getPolyline(item.polyline, item2.polyline_idx),
					polyline_idx: item2.polyline_idx,
				}
			});

			let speed = item.speed.map((item2) => {
				return {
					distance: item2.distance,
					level: item2.level,
					polyline: this.getPolyline(item.polyline, item2.polyline_idx),
					polyline_idx: item2.polyline_idx,
				}
			});

			return {
				mode: "driving",
				tags: item.tags,
				distance: item.distance,
				duration: item.duration,
				traffic_light_count: item.traffic_light_count,
				restriction_status: item.restriction.status,
				polyline: this.polylineFormat(item.polyline),
				waypoints,
				taxi_cost: item.taxi_fare.fare,
				cities: item.cities,
				steps,
				speed
			}
		});
		let result = {
			routes
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 路线规划（步行）
	async walkingRoute(data = {}) {
		let {
			mode,
			from,
			to,
			to_poi
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `ws/direction/v1/walking`,
			dataType: "json",
			data: {
				from,
				to,
				to_poi
			}
		});

		let originalResult = requestRes.originalResult.result;
		let routes = originalResult.routes.map((item) => {
			let steps = item.steps.map((item2) => {
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.dir_desc,
					distance: item2.distance,
					act_desc: item2.act_desc,
					type: item2.type,
					polyline: this.getPolyline(item.polyline, item2.polyline_idx),
					polyline_idx: item2.polyline_idx,
				}
			});

			return {
				mode: "walking",
				distance: item.distance,
				duration: item.duration,
				direction: item.direction,
				polyline: this.polylineFormat(item.polyline),
				steps
			}
		});
		let result = {
			routes
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 路线规划（骑行）
	async bicyclingRoute(data = {}) {
		let {
			mode,
			from,
			to,
			to_poi
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `ws/direction/v1/bicycling`,
			dataType: "json",
			data: {
				from,
				to,
				to_poi
			}
		});

		let originalResult = requestRes.originalResult.result;
		let routes = originalResult.routes.map((item) => {
			let steps = item.steps.map((item2) => {
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.dir_desc,
					distance: item2.distance,
					act_desc: item2.act_desc,
					polyline: this.getPolyline(item.polyline, item2.polyline_idx),
					polyline_idx: item2.polyline_idx
				}
			});

			return {
				mode: "bicycling",
				distance: item.distance,
				duration: item.duration,
				direction: item.direction,
				polyline: this.polylineFormat(item.polyline),
				steps
			}
		});
		let result = {
			routes
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 路线规划（电动车）
	async ebicyclingRoute(data = {}) {
		let {
			mode,
			from,
			to,
			to_poi
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `ws/direction/v1/ebicycling`,
			dataType: "json",
			data: {
				from,
				to,
				to_poi
			}
		});

		let originalResult = requestRes.originalResult.result;
		let routes = originalResult.routes.map((item) => {
			let steps = item.steps.map((item2) => {
				return {
					instruction: item2.instruction,
					polyline_idx: item2.polyline_idx,
					road_name: item2.road_name,
					dir_desc: item2.dir_desc,
					distance: item2.distance,
					act_desc: item2.act_desc,
					polyline: this.getPolyline(item.polyline, item2.polyline_idx)
				}
			});

			return {
				mode: "ebicycling",
				distance: item.distance,
				duration: item.duration,
				direction: item.direction,
				polyline: this.polylineFormat(item.polyline),
				steps
			}
		});
		let result = {
			routes
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// API - 路线规划（公交）
	async transitRoute(data = {}) {
		let {
			mode,
			from,
			to,
			from_poi,
			to_poi,
			departure_time,
			policy
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `ws/direction/v1/transit`,
			dataType: "json",
			data: {
				from,
				to,
				from_poi,
				to_poi,
				departure_time,
				policy
			}
		});

		let originalResult = requestRes.originalResult.result;
		let routes = originalResult.routes.map((item) => {
			let steps = item.steps.map((item2) => {
				let mode = item2.mode.toLowerCase();
				if (mode === "walking") {
					// 步行
					return {
						mode: mode,
						distance: item2.distance,
						duration: item2.duration,
						direction: item2.direction,
						polyline: this.polylineFormat(item2.polyline),
						steps: item2.steps ? item2.steps.map((item3) => {
							return {
								instruction: item3.instruction,
								road_name: item3.road_name,
								act_desc: item3.dir_desc,
								distance: item3.distance,
								polyline: this.getPolyline(item2.polyline, item3.polyline_idx),
								polyline_idx: item3.polyline_idx,
							}
						}) : undefined,
					}
				} else {
					// 非步行
					return {
						mode: mode,
						lines: item2.lines.map((item3) => {
							return {
								...item3,
								price: item3.vehicle !== "RAIL" ? this.priceFormat(item3.price) : item3.price,
								polyline: this.polylineFormat(item3.polyline)
							}
						})
					}
				}
			});

			return {
				mode: "transit",
				distance: item.distance,
				duration: item.duration,
				bounds: item.bounds,
				steps
			}
		});
		let result = {
			routes
		};
		let res = {
			result,
			...requestRes
		};
		return res;
	}

	// 格式化polyline，将压缩的polyline还原成完整的经纬度
	polylineFormat(polyline) {
		try {
			let coors = JSON.parse(JSON.stringify(polyline));
			for (let i = 2; i < coors.length; i++) {
				coors[i] = parseFloat((coors[i - 2] + coors[i] / 1000000).toFixed(6));
			}
			return coors;
		} catch (err) {
			return "";
		}
	}

	// 格式化价格，将以分为单位的价格转元，保留2位小数
	priceFormat(price) {
		try {
			if (price === "" || price == -1) {
				return -1;
			} else {
				return parseFloat((price / 100).toFixed(2));
			}
		} catch (err) {
			return -1;
		}
	}

	getPolyline(polyline, polyline_idx) {
		let polylineArr = this.polylineFormat(polyline);
		if (typeof polyline_idx == "object") {
			let arr = polylineArr.slice(polyline_idx[0], polyline_idx[1] + 1);
			let str = "";
			arr.map((item, index) => {
				if (index % 2 === 0) {
					str += `${item}`
				} else {
					str += `,${item};`
				}
			});
			// 去除最后一个;
			if (str.lastIndexOf(";") === str.length - 1) {
				str = str.substring(0, str.length - 1);
			}
			return str;
		} else {
			return polylineArr[polyline_idx] + "," + polylineArr[polyline_idx + 1];
		}

	}

}
module.exports = Service;