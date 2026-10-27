// chooseLocation({
// 	action: "location2address",
// 	needOriginalResult: true,
// 	data: {
// 			location: "39.908815,116.397507",
// 			get_poi: 1,
// 			poi_options: {
// 				address_format: "short",
// 				radius: 5000,
// 				policy: 4,
// 				//poitype: "010101",
// 				roadlevel: 1,
// 				homeorcorp: 1,
// 				page_index: 1,
// 				page_size: 1,
// 			}
// 	}
// })

// location2address({
// 	location: "39.908815,116.397507",
// 	get_poi: 1,
// 	poi_options: {
// 		address_format: "short",
// 		radius: 5000,
// 		policy: 4,
// 		//poitype: "010101",
// 		roadlevel: 1,
// 		homeorcorp: 1
// 	}
// });

address2location({
	address: "北京市海淀区彩和坊路海淀西大街74号",
	city: "北京"
});

// translate({
// 	locations: [
// 		{ lat: 39.908815, lng: 116.397507 },
// 		{ lat: 39.908815, lng: 116.397107 }
// 	],
// 	type: 3
// });

// ip定位
// ip2location({
// 	ip: "111.206.145.41"
// });

// 输入提示
// inputtips({
// 	keyword: "人民医院",
// 	city: "北京市",
// 	datatype: "all",
// 	get_subpois: 1
// });

// 周边搜索
// search({
// 	keyword: "酒店",
// 	location: {
// 		lat: 39.908815,
// 		lng: 116.397507
// 	},
// 	radius: 1000,
// 	auto_extend: 1,
// 	get_subpois: 1,
// 	orderby: "weight",
// 	page_index: 1,
// 	page_size: 20,
// 	city: "北京市"
// });

// 行政区划
// districtSearch({
// 	adcode: "110000",
// 	get_polygon: 2,
// 	max_offset: 500,
// 	subdistrict: 2
// });

// 导航 - 驾车
// route({
// 	mode: "driving",
// 	from: "39.808815,116.387507",
// 	to: "39.908815,116.397507",
// 	get_mp: 1,
// });

// 导航 - 步行
// route({
// 	mode: "walking",
// 	from: "40.034852,116.319820",
// 	to: "39.771075,116.351395",
// 	alternative_route: 3
// });

// 导航 - 骑行
// route({
// 	mode: "bicycling",
// 	from: "40.034852,116.319820",
// 	to: "39.771075,116.351395",
// 	alternative_route: 3
// });

// 导航 - 电动车
// route({
// 	mode: "ebicycling",
// 	from: "40.034852,116.319820",
// 	to: "39.771075,116.351395",
// 	alternative_route: 3
// });

// 导航 - 公交
// route({
// 	mode: "transit",
// 	from: "40.034852,116.319820",
// 	to: "29.771075,116.351395",
// 	//alternative_route: 3,
// 	city1: "010",
// 	city2: "0792",
// });