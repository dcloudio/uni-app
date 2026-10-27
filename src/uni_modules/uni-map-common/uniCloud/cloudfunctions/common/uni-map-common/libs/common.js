/**
 * 通用公共函数
 */
var common = {};

// 经纬度表示形式转换
common.getLocation = function(location = "", type = "", returnType = "") {
	let lat;
	let lng;
	// 去除所有空格
	type = type.trim();
	returnType = returnType.replace(/\s+/g, '');
	if (type === "lat,lng") {
		location = location.replace(/\s+/g, '');
		let arr = location.split(",");
		lat = arr[0];
		lng = arr[1];
	} else if (type === "lng,lat") {
		location = location.replace(/\s+/g, '');
		let arr = location.split(",");
		lat = arr[1];
		lng = arr[0];
	} else if (type === "lat lng") {
		let arr = location.split(" ");
		lat = arr[0];
		lng = arr[1];
	} else if (type === "lng lat") {
		let arr = location.split(" ");
		lat = arr[1];
		lng = arr[0];
	} else {
		lat = location.lat;
		lng = location.lng;
	}
	if (returnType == "lng,lat") {
		return `${lng},${lat}`;
	} else if (returnType == "lat,lng") {
		return `${lat},${lng}`;
	} else {
		return {
			lat: Number(lat),
			lng: Number(lng)
		}
	}
};

// 字符串格式的坐标经纬度反转
common.getReversalLocation = function(input="") {
	// 按分隔符拆分字符串
	let parts = input.split("|");

	// 遍历每个部分进行值交换
	for (let i = 0; i < parts.length; i++) {
		let pairs = parts[i].split(";");
		for (let j = 0; j < pairs.length; j++) {
			let values = pairs[j].split(",");
			// 交换两个值
			let temp = values[0];
			values[0] = values[1];
			values[1] = temp;
			// 更新交换后的值
			pairs[j] = values.join(",");
		}
		// 更新交换后的部分
		parts[i] = pairs.join(";");
	}

	// 返回交换后的结果
	return parts.join("|");
};



module.exports = common;