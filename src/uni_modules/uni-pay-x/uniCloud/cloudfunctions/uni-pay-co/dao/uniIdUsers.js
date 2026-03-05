const dbName = {
	user: "uni-id-users"
}

const db = uniCloud.database();
const _ = db.command;

var dao = {};


/**
 * 获取 - 第三方支付订单数据
let userInfo = await dao.uniIdUsers.findById(id);
 */
dao.findById = async (id) => {
	let res = await db.collection(dbName.user).doc(id).get();
	if (res.data && res.data.length > 0) {
		return res.data[0];
	} else {
		return null;
	}
	return res;
};

module.exports = dao;
