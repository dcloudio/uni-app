/**
 * 全局错误码
 */
const ERROR = {
	50403: 50403,
	// 参数错误
	51001: 51001,
	51002: 51002,
	51003: 51003,
	51004: 51004,
	51005: 51005,
	51006: 51006,
	51007: 51007,
	51008: 51008,
	51009: 51009,
	51010: 51010,
	51011: 51011,
	51012: 51012,
	51013: 51013,
	// 数据不存在
	52001: 52001,
	52002: 52002,
	// 运行错误
	53001: 53001,
	53002: 53002,
	53003: 53003,
	53004: 53004,
	53005: 53005,
	54001: 54001,
	54002: 54002,
}

const errSubject = "uni-pay";

function isUniPayError(errCode) {
	return Object.values(ERROR).includes(errCode);
}

class UniCloudError extends Error {
	constructor(options = {}) {
		super(options.message);
		this.errMsg = options.message || '';
		this.code = this.errCode = options.code;
		this.errSubject = options.subject || errSubject;
		this.forceReturn = options.forceReturn || false;
		this.cause = options.cause;
	}

	toJson(level = 0) {
		if (level >= 10) {
			return
		}
		level++
		return {
			errCode: this.errCode,
			errMsg: this.errMsg,
			code: this.errCode,
			message: this.message,
			errSubject: this.errSubject,
			cause: this.cause && this.cause.toJson ? this.cause.toJson(level) : this.cause
		}
	}
}

module.exports = {
	ERROR,
	isUniPayError,
	UniCloudError
}
