const dbName = {
	openData: "opendb-open-data" // 数据库表名 - 缓存表
}

const db = uniCloud.database();
const _ = db.command;

var dao = {};

/**
 * 获取
let cacheInfo = await dao.opendbOpenData.get(key);
 */
dao.get = async (key) => {
	let res = await db.collection(dbName.openData).doc(key).get();
	let cacheInfo = res.data && res.data.length > 0 ? res.data[0] : null;
	if (!cacheInfo) {
		// 缓存不存在
		return null;
	}
	if (cacheInfo.expired > 0 && Date.now() > cacheInfo.expired) {
		// 缓存过期了
		return null;
	}
	// 缓存存在且未过期
	let value;
	try {
		value = JSON.parse(cacheInfo.value);
	} catch (err) {
		value = cacheInfo.value;
	}
	return value;
};

/**
 * 设置缓存
await dao.opendbOpenData.set(key, value, expired);
 */
dao.set = async (key, value, expired = 0) => {
	if (expired > 0) {
		expired = Date.now() + expired * 1000;
	}
	let res = await db.collection(dbName.openData).doc(key).set({
		value: JSON.stringify(value),
		expired
	});
	return res.id ? res.id : null;
};

/**
 * 获取accessToken
let cacheInfo = await dao.opendbOpenData.getAccessToken({
	appId: "wx123",
	platform: "weixin-mp"
});
 */
dao.getAccessToken = async (key = {}) => {
	let { appId, platform } = key;
	let cacheKey = `uni-id:${platform}:${appId}:access-token`;
	return await dao.get(cacheKey);
};
/**
 * 获取accessToken
await dao.opendbOpenData.setAccessToken({
	appId: "wx123",
	platform: "weixin-mp"
}, value, expired);
 */
dao.setAccessToken = async (key, value, expired) => {
	let { appId, platform } = key;
	let cacheKey = `uni-id:${platform}:${appId}:access-token`;
	return await dao.set(cacheKey, value, expired);
};

/**
 * 获取sessionKey
let cacheInfo = await dao.opendbOpenData.getSessionKey({
	appId: "wx123",
	platform: "weixin-mp",
	openid: "o123"
});
 */
dao.getSessionKey = async (key = {}) => {
	let { appId, platform, openid } = key;
	let cacheKey = `uni-id:${platform}:${appId}:${openid}:session-key`;
	return await dao.get(cacheKey);
};
/**
 * 设置sessionKey
await dao.opendbOpenData.setSessionKey({
	appId: "wx123",
	platform: "weixin-mp",
	openid: "o123"
}, value, expired);
 */
dao.setSessionKey = async (key = {}, value, expired) => {
	let { appId, platform, openid } = key;
	let cacheKey = `uni-id:${platform}:${appId}:${openid}:session-key`;
	return await dao.set(cacheKey, value, expired);
};



module.exports = dao;