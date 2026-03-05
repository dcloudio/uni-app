const wxpay = require('./wxpay');
const alipay = require('./alipay');
const common = require('./common');
const qrcode = require('./qrcode'); // 此源码为npm i qrcode的压缩版本
const crypto = require('./crypto');
const jsonwebtoken = require('./jsonwebtoken');

module.exports = {
	wxpay,
	alipay,
	common,
	qrcode,
	crypto,
	jsonwebtoken
};
