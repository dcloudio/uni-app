/**
 * 加密模块
 */

/*
加密解密示例
const payCrypto = require('../libs/crypto.js'); // 获取加密服务（注意文件所在相对路径）
let ciphertext = { a:1,b:2 };
let encrypted = payCrypto.aes.encrypt({
	data: ciphertext, // 待加密的原文
});

let decrypted = payCrypto.aes.decrypt({
	data: encrypted, // 待解密的原文
});
// 最终解密得出 decrypted = { a:1,b:2 } 
*/

const configCenter = require("uni-config-center");
const config = configCenter({ pluginId: 'uni-pay' }).requireFile('config.js');
const crypto = require("crypto");

var util = {};
util.aes = {};
/**
 * aes加密
 * @param {Object} data 待加密的原文
 * @param {Object} key 密钥，如不传，自动取config
 * @param {String} mode 默认为aes192支持64位或64以上密钥 其他可选（aes-256-ecb 兼容java等其他后端语言）
 * 调用示例
let encrypted = crypto.aes.encrypt({
	mode: "aes192",
	data: "", // 待加密的原文
});
 */
util.aes.encrypt = function(obj) {
	let {
		data, // 待加密的原文
		key, // 密钥，如不传，自动取config
		mode = "aes192",
	} = obj;
	if (!key) key = config.notifyKey;
	if (typeof data === "object") data = JSON.stringify(data);
	if (mode === "aes-256-ecb") {
		// aes-256-ecb算法
		return encryptUseAes256Ecb(data, key);
	} else {
		return encryptUseAes192(data, key);
	}
};

/**
 * aes解密
 * @param {Object} data 待解密的原文
 * @param {Object} key 密钥，如不传，自动取config
 * @param {String} mode 默认为aes192支持64位或64以上密钥 其他可选（aes-256-ecb 兼容java等其他后端语言）
 * 调用示例
let decrypted = crypto.aes.decrypt({
	mode: "aes192",
	data: "", // 待解密的原文
});
 */
util.aes.decrypt = function(obj) {
	let {
		data, // 待解密的原文
		key, // 密钥，如不传，自动取config
		mode = "aes192",
	} = obj;
	if (typeof data === "undefined") {
		throw "待解密原文不能为空";
	}
	if (!key) key = config.notifyKey;
	// 解密
	let decrypted;
	if (mode === "aes-256-ecb") {
		// aes-256-ecb算法
		return decryptUseAes256Ecb(data, key);
	} else {
		return decryptUseAes192(data, key);
	}
	// decrypted 为解密后的内容，即最开始需要加密的原始数据文本data
	return decrypted;
};

util.generateUUID = function() {
	// 获取当前时间戳
	let timestamp = Date.now().toString(16);
	while (timestamp.length < 16) {
		timestamp = timestamp + "0";
	}
	// 生成随机数部分
	const randomHex = crypto.randomBytes(10).toString('hex');
	// 结合时间戳和随机数，并按照UUID格式排列
	const uuid = `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-${randomHex.slice(0, 4)}-${randomHex.slice(4, 8)}-${randomHex.slice(8)}`;
	return uuid.toLowerCase();
};

module.exports = util;

// aes192算法 - 加密
function encryptUseAes192(data, key) {
	const cipher = crypto.createCipher('aes192', key);
	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	// encrypted 为加密后的内容
	return encrypted;
}

// aes192算法 - 解密
function decryptUseAes192(data, key) {
	// aes192 算法
	let decrypted;
	try {
		const decipher = crypto.createDecipher('aes192', key);
		decrypted = decipher.update(data, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		try {
			decrypted = JSON.parse(decrypted);
		} catch (err) {}
	} catch (err) {
		throw "解密失败";
	}
	// decrypted 为解密后的内容，即最开始需要加密的原始数据文本data
	return decrypted;
}

// aes-256-ecb算法 - 加密
function encryptUseAes256Ecb(data, key) {
	let paddedData = Buffer.from(data);
	let paddedkey = key;
	if (paddedkey.length > 32) {
		paddedkey = paddedkey.substring(0, 32);
	}
	paddedkey = Buffer.from(paddedkey);
	const cipher = crypto.createCipheriv('aes-256-ecb', paddedkey, '');
	cipher.setAutoPadding(false);
	const blockSize = 16; // AES块大小为16字节
	const paddingSize = blockSize - (paddedData.length % blockSize);
	const paddingBuffer = Buffer.alloc(paddingSize, paddingSize);
	paddedData = Buffer.concat([paddedData, paddingBuffer]);
	let encrypted = cipher.update(paddedData, null, 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
}

// aes-256-ecb算法 - 解密
function decryptUseAes256Ecb(data, key) {
	let paddedkey = key;
	if (paddedkey.length > 32) {
		paddedkey = paddedkey.substring(0, 32);
	}
	paddedkey = Buffer.from(paddedkey);
	let decrypted;
	try {
		const decipher = crypto.createDecipheriv('aes-256-ecb', paddedkey, '');
		decipher.setAutoPadding(false);

		let decrypted = decipher.update(data, 'base64');
		decrypted += decipher.final();

		const lastByte = decrypted.charCodeAt(decrypted.length - 1);
		const paddingSize = lastByte;
		decrypted = decrypted.slice(0, decrypted.length - paddingSize);
		try {
			decrypted = JSON.parse(decrypted);
		} catch (err) {}
		return decrypted;
	} catch (err) {
		throw "解密失败";
	}
	return decrypted;
}