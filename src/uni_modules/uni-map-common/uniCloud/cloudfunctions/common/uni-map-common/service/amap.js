const libs = require('../libs');

// https://lbs.amap.com/api/webservice/guide/tools/info

const ERRCODE = {
	"10000": 0,
	"10001": 190,
	"10002": 113,
	"10003": 121,
	"10004": 120,
	"10005": 112,
	"10006": 110,
	"10007": 111,
	"10008": 111,
	"10009": 110,
	"10010": 122,
	"10011": 311,
	"10012": 113,
	"10013": 190,
	"10014": 500,
	"10015": 500,
	"10016": 500,
	"10017": 500,
	"10019": 500,
	"10020": 500,
	"10021": 500,
	"10026": 110,
	"10029": 500,
	"10041": 110,
	"10044": 121,
	"10045": 121,
	"20000": 395,
	"20001": 300,
	"20002": 500,
	"20003": 500,
	"20011": 395,
	"20012": 395,
	"20801": 395,
	"20802": 395,
	"20803": 373,
	"40000": 123,
	"40001": 123,
	"40002": 123,
	"40003": 123
};

class Service {

	// 构造函数
	constructor(data = {}) {
		let {
			key,
			needOriginalResult = false, // 是否需要返回原始信息，默认false
		} = data;

		this.config = {
			provider: "amap",
			key,
			needOriginalResult,
			serviceUrl: "https://restapi.amap.com"
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
			errCode: originalResult.infocode == "10000" ? 0 : this.getErrCode(originalResult.infocode),
			errMsg: originalResult.info,
			originalResult,
		};
		return res;
	}

	getErrCode(errCode) {
		return ERRCODE[errCode] || errCode;
	}

	// API - 逆地址解析（坐标转地址）
	async location2address(data = {}) {
		let {
			location,
			get_poi,
			poi_options,
		} = data;

		let requestData = {
			location: libs.common.getLocation(location, "lat,lng", "lng,lat"),
			extensions: get_poi ? "all" : "base",
		};

		if (get_poi && typeof poi_options == "object") {
			let {
				poitype,
				radius,
				roadlevel,
				homeorcorp
			} = poi_options;
			requestData = Object.assign(requestData, {
				poitype,
				radius,
				roadlevel,
				homeorcorp
			})
		}

		let requestRes = await this.request({
			method: "GET",
			url: "v3/geocode/regeo",
			dataType: "json",
			data: requestData
		});

		let originalResult = requestRes.originalResult.regeocode;
		let pois;
		if (originalResult.pois) {
			pois = originalResult.pois.map((item) => {
				return {
					id: item.id,
					title: item.name,
					address: item.address,
					location: libs.common.getLocation(item.location, "lng,lat", "object"),
					distance: item.distance,
					direction: item.direction,
					category: item.type
				}
			});
		}

		let roads;
		if (originalResult.roads) {
			roads = originalResult.roads.map((item) => {
				return {
					id: item.id,
					title: item.name,
					distance: Number(item.distance),
					direction: item.direction,
					location: libs.common.getLocation(item.location, "lng,lat", "object")
				}
			});
		}

		let roadinters;
		if (originalResult.roadinters) {
			roadinters = originalResult.roadinters.map((item) => {
				return {
					distance: Number(item.distance),
					direction: item.direction,
					first_id: item.first_id,
					first_name: item.first_name,
					second_id: item.second_id,
					second_name: item.second_name,
					location: libs.common.getLocation(item.location, "lng,lat", "object")
				}
			});
		}

		let result = {
			formatted_addresses: originalResult.formatted_address,
			country: originalResult.addressComponent.country,
			province: originalResult.addressComponent.province,
			city: JSON.stringify(originalResult.addressComponent.city) === "[]" || !originalResult.addressComponent.city ? originalResult.addressComponent.province : originalResult
				.addressComponent.city,
			district: originalResult.addressComponent.district,
			street: originalResult.addressComponent.country,
			street_number: originalResult.addressComponent.streetNumber.street + originalResult.addressComponent.streetNumber.number,
			adcode: originalResult.addressComponent.adcode,
			pois,
			roads,
			roadinters
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
			url: "v3/geocode/geo",
			dataType: "json",
			data: {
				address,
				city
			}
		});

		let originalResult = requestRes.originalResult.geocodes[0];
		let result = {
			location: libs.common.getLocation(originalResult.location, "lng,lat", "object"),
			adcode: originalResult.adcode,
			province: originalResult.province,
			city: originalResult.city,
			district: originalResult.district,
			street: originalResult.street,
			street_number: originalResult.number,
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
			locationsStr += libs.common.getLocation(item, "object", "lng,lat");
		})

		let coordsys = {
			"1": "gps",
			"4": "mapbar",
			"3": "baidu",
			"": "autonavi",
		} [type + ""];
		let requestRes = await this.request({
			method: "GET",
			url: "v3/assistant/coordinate/convert",
			dataType: "json",
			data: {
				locations: locationsStr,
				coordsys
			}
		});
		let originalResult = requestRes.originalResult;
		let returnLocationsStr = originalResult.locations;
		let arr = returnLocationsStr.split(";");

		let returnLocations = arr.map((item) => {
			return libs.common.getLocation(item, "lng,lat", "object");
		});

		let result = {
			locations: returnLocations
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
			url: "v3/ip",
			dataType: "json",
			data: {
				ip
			}
		});
		let originalResult = requestRes.originalResult;
		let result = {
			adcode: originalResult.adcode,
			province: originalResult.province,
			city: originalResult.city,
			rectangle: originalResult.rectangle
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
			datatype,
		} = data;

		let requestData = {
			keywords: keyword,
			city,
			citylimit,
			datatype
		};
		if (location) {
			requestData.location = libs.common.getLocation(location, "object", "lng,lat");
		}

		let requestRes = await this.request({
			method: "GET",
			url: "v3/assistant/inputtips",
			dataType: "json",
			data: requestData,
		});

		let originalResult = requestRes.originalResult;

		let _data = originalResult.tips.map((item) => {
			return {
				id: item.id,
				name: item.name,
				address: item.address,
				location: libs.common.getLocation(item.location, "lng,lat", "object"),
				adcode: item.adcode,
				district: item.district
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
			types,
			city
		} = data;
	
		let requestData = {
			keywords: keyword,
			types,
			location: libs.common.getLocation(location, "object", "lng,lat"),
			radius,
			sortrule: orderby,
			region: city,
			city_limit: auto_extend ? false : true,
			page_num: page_index,
			page_size,
			show_fields: get_subpois ? "children,business,navi,photos" : "business,navi,photos"
		};
	
		let requestRes = await this.request({
			method: "GET",
			url: "v5/place/around",
			dataType: "json",
			data: requestData
		});
		let originalResult = requestRes.originalResult;
	
		let _data = originalResult.pois.map((item) => {
			return {
				id: item.id,
				title: item.name,
				tel: item.business.tel,
				address: item.address,
				category: item.type,
				location: libs.common.getLocation(item.location, "lng,lat", "object"),
				distance: Number(item.distance),
				adcode: item.adcode,
				province: item.pname,
				city: item.cityname,
				district: item.adname,
				children: item.children ? item.children.map((item2) => {
					return {
						parent_id: item.id,
						id: item2.id,
						title: item2.name,
						address: item2.address,
						category: item2.subtype,
						location: libs.common.getLocation(item2.location, "lng,lat", "object")
					}
				}) : get_subpois ? [] : undefined,
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
			page_index,
			page_size,
			filter,
			subdistrict
		} = data;
		
		let requestData = {
			keywords: adcode,
			subdistrict,
			page: page_index,
			offset: page_size,
			filter
		};
		
		let requestRes = await this.request({
			method: "GET",
			url: "v3/config/district",
			dataType: "json",
			data: requestData
		});
		let originalResult = requestRes.originalResult;
		
		const formatDistricts = (list) => {
			return list.map((item) => {
				return {
					adcode: item.adcode,
					name: item.name,
					fullname: item.name,
					location: libs.common.getLocation(item.center, "lng,lat", "object"),
					level: item.level,
					children: typeof item.districts !== "undefined" ? formatDistricts(item.districts): undefined,
					//polygon: item.polyline,
				}
			});
		}
		let _data = formatDistricts(originalResult.districts[0].districts);
	
		let result = {
			data: _data
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
			avoidroad,
			ferry,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `v5/direction/driving`,
			dataType: "json",
			data: {
				origin: libs.common.getLocation(from, "lat,lng", "lng,lat"),
				destination: libs.common.getLocation(to, "lat,lng", "lng,lat"),
				origin_id: from_poi,
				destination_id: to_poi,
				strategy: policy,
				waypoints: libs.common.getReversalLocation(waypoints),
				avoidpolygons: libs.common.getReversalLocation(avoid_polygons),
				origin_type: road_type,
				plate: plate_number,
				cartype,
				avoidroad,
				ferry,
				show_fields: "cost,tmcs,navi,cities,polyline"
			}
		});

		let originalResult = requestRes.originalResult.route;
		let routes = originalResult.paths.map((item) => {
			let steps = item.steps.map((item2) => {
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.orientation,
					distance: Number(item2.step_distance),
					act_desc: item2.navi.action,
					accessorial_desc: item2.navi.assistant_action,
					cost: this.costFormat(item2.cost),
					speed: item2.tmcs ? item2.tmcs.map((item3) => {
						let levelIndex = {
							"畅通": 0,
							"缓行": 1,
							"拥堵": 2,
							"未知": 3,
							"严重拥堵": 4,
						}
						return {
							distance: Number(item3.tmc_distance),
							level: levelIndex[item3.tmc_status],
							polyline: this.polylineFormat(item3.tmc_polyline),
						}
					}) : undefined,
					cities: item2.cities,
					polyline: this.polylineFormat(item2.polyline),
				}
			});
			return {
				mode: "driving",
				distance: Number(item.distance),
				restriction_status: Number(item.restriction),
				taxi_cost: Number(originalResult.taxi_cost),
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

	// API - 路线规划（步行）
	async walkingRoute(data = {}) {
		let {
			mode,
			from,
			to,
			alternative_route,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `v5/direction/walking`,
			dataType: "json",
			data: {
				origin: libs.common.getLocation(from, "lat,lng", "lng,lat"),
				destination: libs.common.getLocation(to, "lat,lng", "lng,lat"),
				alternative_route,
				show_fields: "cost,navi,polyline", // 此处强制传，为了和腾讯地图字段对齐
			}
		});
		let originalResult = requestRes.originalResult.route;
		let routes = originalResult.paths.map((item) => {
			let duration1 = 0;
			let steps = item.steps.map((item2) => {
				let duration2 = this.durationFormat(item2.cost.duration);
				duration1 += duration2;
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.orientation,
					distance: Number(item2.step_distance),
					act_desc: item2.navi.action || item2.navi.assistant_action,
					taxi_cost: item2.cost.taxi ? this.priceFormat(item2.cost.taxi) : undefined,
					duration: duration2,
					polyline: this.polylineFormat(item2.polyline),
				}
			});

			return {
				mode: "walking",
				distance: Number(item.distance),
				duration: duration1,
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
			alternative_route,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `v5/direction/bicycling`,
			dataType: "json",
			data: {
				origin: libs.common.getLocation(from, "lat,lng", "lng,lat"),
				destination: libs.common.getLocation(to, "lat,lng", "lng,lat"),
				alternative_route,
				show_fields: "cost,navi,polyline", // 此处强制传，为了和腾讯地图字段对齐
			}
		});
		let originalResult = requestRes.originalResult.route;
		let routes = originalResult.paths.map((item) => {
			let duration1 = 0;
			let steps = item.steps.map((item2) => {
				let duration2 = this.durationFormat(item2.cost.duration);
				duration1 += duration2;
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.orientation,
					distance: Number(item2.step_distance),
					act_desc: item2.navi.action || item2.navi.assistant_action,
					duration: duration2,
					polyline: this.polylineFormat(item2.polyline),
				}
			});

			return {
				mode: "walking",
				distance: Number(item.distance),
				duration: duration1,
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
			alternative_route,
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `v5/direction/electrobike`,
			dataType: "json",
			data: {
				origin: libs.common.getLocation(from, "lat,lng", "lng,lat"),
				destination: libs.common.getLocation(to, "lat,lng", "lng,lat"),
				alternative_route,
				show_fields: "cost,navi,polyline", // 此处强制传，为了和腾讯地图字段对齐
			}
		});
		let originalResult = requestRes.originalResult.route;
		let routes = originalResult.paths.map((item) => {
			let duration1 = 0;
			let steps = item.steps.map((item2) => {
				let duration2 = this.durationFormat(item2.cost.duration);
				duration1 += duration2;
				return {
					instruction: item2.instruction,
					road_name: item2.road_name,
					dir_desc: item2.orientation,
					distance: Number(item2.step_distance),
					act_desc: item2.navi.action || item2.navi.assistant_action,
					duration: duration2,
					polyline: this.polylineFormat(item2.polyline),
				}
			});

			return {
				mode: "walking",
				distance: Number(item.distance),
				duration: duration1,
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
			policy,
			ad1,
			ad2,
			city1,
			city2,
			alternative_route,
			multiexport,
			max_trans,
			nightflag,
			date,
			time
		} = data;

		let requestRes = await this.request({
			method: "GET",
			url: `v5/direction/transit/integrated`,
			dataType: "json",
			data: {
				origin: libs.common.getLocation(from, "lat,lng", "lng,lat"),
				destination: libs.common.getLocation(to, "lat,lng", "lng,lat"),
				originpoi: from_poi,
				destinationpoi: to_poi,
				strategy: policy,
				ad1,
				ad2,
				city1,
				city2,
				AlternativeRoute: alternative_route,
				multiexport,
				max_trans,
				nightflag,
				date,
				time,
				show_fields: "cost,navi,polyline", // 此处强制传，为了和腾讯地图字段对齐
			}
		});

		let originalResult = requestRes.originalResult.route;
		let routes = originalResult.transits.map((item) => {
			let stepsItem = this.getSteps(item.segments);
			let steps = stepsItem.map((item2) => {
				let mode = item2.mode.toLowerCase();
				if (mode === "walking") {
					// 步行
					return {
						mode: "walking",
						distance: Number(item2.distance),
						duration: this.durationFormat(item2.cost.duration),
						steps: item2.steps.map((item3) => {
							return {
								instruction: item3.instruction,
								road_name: item3.road,
								distance: Number(item3.distance),
								act_desc: item3.navi.action || item3.navi.assistant_action,
								polyline: this.polylineFormat(item3.polyline)
							}
						}),
					}
				} else if (mode === "bus") {
					return {
						mode: "transit",
						lines: item2.buslines.map((item3) => {
							return {
								vehicle: item3.type.indexOf("地铁") > -1 ? "SUBWAY" : "BUS",
								id: item3.id,
								title: item3.name,
								type: item3.type,
								station_count: Number(item3.via_num),
								distance: Number(item3.distance),
								duration: this.durationFormat(item3.cost.duration),
								polyline: this.polylineFormat(item3.polyline),
								start_time: item3.start_time,
								end_time: item3.end_time,
								geton: {
									id: item3.departure_stop.id,
									title: item3.departure_stop.name,
									location: libs.common.getLocation(item3.departure_stop.location, "lng,lat", "object"),
								},
								getoff: {
									id: item3.arrival_stop.id,
									title: item3.arrival_stop.name,
									location: libs.common.getLocation(item3.arrival_stop.location, "lng,lat", "object"),
								},
								stations: item3.via_stops.map((item4) => {
									return {
										id: item4.id,
										title: item4.name,
										location: libs.common.getLocation(item4.location, "lng,lat", "object"),
									}
								})
							}
						}),
					}
				} else if (mode === "railway") {
					// 火车
					let item3 = item2;
					return {
						mode: "transit",
						lines: [{
							vehicle: "RAIL",
							id: item3.id,
							title: item3.name,
							type: item3.type,
							distance: Number(item3.distance),
							duration: this.durationFormat(item3.time),
							geton: {
								id: item3.departure_stop.id,
								title: item3.departure_stop.name,
								location: libs.common.getLocation(item3.departure_stop.location, "lng lat", "object"),
								adcode: item3.departure_stop.adcode,
								time: item3.departure_stop.time,
								start: Number(item3.departure_stop.start),
							},
							getoff: {
								id: item3.arrival_stop.id,
								title: item3.arrival_stop.name,
								location: libs.common.getLocation(item3.arrival_stop.location, "lng lat", "object"),
								adcode: item3.arrival_stop.adcode,
								time: item3.arrival_stop.time,
								end: Number(item3.arrival_stop.end),
							},
							spaces: item3.spaces ? item3.spaces.map((item4) => {
								return {
									code: item4.code,
									cost: this.priceFormat(item4.cost),
								}
							}) : undefined
						}],
					}
				} else if (mode === "taxi") {
					// 打车
					let item3 = item2;
					return {
						mode: "transit",
						lines: [{
							vehicle: "TAXI",
							distance: Number(item3.distance),
							price: this.priceFormat(item3.price),
							drivetime: this.durationFormat(item3.drivetime),
							polyline: this.polylineFormat(item3.polyline),
							startpoint: libs.common.getLocation(item3.startpoint, "lng,lat", "lat,lng"),
							startname: item3.startname,
							endpoint: libs.common.getLocation(item3.endpoint, "lng,lat", "lat,lng"),
							endname: item3.endname
						}]
					}
				}
			});

			return {
				mode: "transit",
				distance: Number(item.distance),
				duration: this.durationFormat(item.cost.duration),
				transit_fee: this.priceFormat(item.cost.transit_fee),
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

	getSteps(segments) {
		let steps = [];
		segments.map((item, index) => {
			for (let mode in item) {
				steps.push({
					mode,
					...item[mode]
				});
			}
		});
		return steps;
	}

	// 格式化价格，将字符串价格转成数值，保留2位小数
	priceFormat(price) {
		try {
			if (price === "") {
				return -1;
			} else {
				return parseFloat(Number(price).toFixed(2));
			}
		} catch (err) {
			return -1;
		}
	}

	// 格式化cost
	costFormat(cost = {}) {
		let {
			duration,
			taxi_cost,
			transit_fee,
			tolls,
			toll_distance,
			toll_road,
			traffic_lights
		} = cost;
		let res = {};
		if (typeof duration !== "undefined") res.duration = this.durationFormat(duration);
		if (typeof taxi_cost !== "undefined") res.taxi_cost = this.priceFormat(taxi_cost);
		if (typeof transit_fee !== "undefined") res.transit_fee = this.priceFormat(transit_fee);
		if (typeof tolls !== "undefined") res.tolls = this.priceFormat(tolls);
		if (typeof toll_distance !== "undefined") res.toll_distance = Number(toll_distance);
		if (typeof toll_road !== "undefined") res.toll_road = toll_road;
		if (typeof traffic_lights !== "undefined") res.traffic_lights = Number(traffic_lights);

		return res;
	}

	// 格式化polyline，将原本polyline.polyline转成polyline
	polylineFormat(polyline = {}) {
		if (polyline.polyline) {
			return libs.common.getReversalLocation(polyline.polyline);
		} else if (typeof polyline === "string") {
			return libs.common.getReversalLocation(polyline);
		} else {
			return "";
		}
	}

	// 格式化时间（秒转分，向上进1）
	durationFormat(duration) {
		try {
			return Math.ceil(Number(duration) / 60);
		} catch (err) {
			return undefined;
		}
	}

}
module.exports = Service;