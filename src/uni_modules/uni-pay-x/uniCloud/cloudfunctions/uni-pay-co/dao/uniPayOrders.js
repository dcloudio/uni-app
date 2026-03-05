const dbName = {
	payOrders: "uni-pay-orders" // 数据库表名 - 第三方支付订单表
}

const db = uniCloud.database();
const _ = db.command;

var dao = {};

/**
 * 添加 - 第三方支付订单数据
await dao.uniPayOrders.add({
	
});
 */
dao.add = async (dataJson = {}) => {
	// 数据库操作开始-----------------------------------------------------------
	let res = await db.collection(dbName.payOrders).add(dataJson);
	// 数据库操作结束-----------------------------------------------------------
	return res.id ? res.id : null;
};

/**
 * 获取 - 第三方支付订单数据
let payOrderInfo = await dao.uniPayOrders.find({
	order_no,
	out_trade_no
});
 */
dao.find = async (where) => {
	let res = await db.collection(dbName.payOrders)
		.where(where)
		.limit(1)
		.get();
	if (res.data && res.data.length > 0) {
		return res.data[0];
	} else {
		return null;
	}
	return res;
};

/**
 * 修改 - 第三方支付订单数据
await dao.uniPayOrders.updateById(id, {

});
 */
dao.updateById = async (id = "___", dataJson) => {
	// 数据库操作开始-----------------------------------------------------------
	let res = await db.collection(dbName.payOrders).doc(id).update(dataJson);
	// 数据库操作结束-----------------------------------------------------------
	return res ? res.updated : 0;
};
/**
 * 修改 - 第三方支付订单数据
await dao.uniPayOrders.update({
	whereJson:{
		
	},
	dataJson:{

	}
});
 */
dao.update = async (obj) => {
	let { whereJson, dataJson } = obj;
	// 数据库操作开始-----------------------------------------------------------
	let res = await db.collection(dbName.payOrders).where(whereJson).update(dataJson);
	// 数据库操作结束-----------------------------------------------------------
	return res ? res.updated : 0;
};
/**
 * 修改 - 第三方支付订单数据
await dao.uniPayOrders.updateAndReturn({
	whereJson:{
		
	},
	dataJson:{

	}
});
 */
dao.updateAndReturn = async (obj) => {
	let { whereJson, dataJson } = obj;
	// 数据库操作开始-----------------------------------------------------------
	let res = await db.collection(dbName.payOrders).where(whereJson).updateAndReturn(dataJson);
	// 数据库操作结束-----------------------------------------------------------
	return res.doc ? res.doc : null;
};
/**
 * 删除超过3天还未支付款的订单
await dao.uniPayOrders.deleteExpPayOrders();
 */
dao.deleteExpPayOrders = async () => {
	// 数据库操作开始-----------------------------------------------------------
	let time = Date.now() - 1000 * 3600 * 24 * 3;
	let res = await db.collection(dbName.payOrders)
		.where({
			status: _.in([-1,0]),
			create_date: _.lt(time)
		})
		.remove();
	// 数据库操作结束-----------------------------------------------------------
	return res ? res.updated : 0;
};

module.exports = dao;
