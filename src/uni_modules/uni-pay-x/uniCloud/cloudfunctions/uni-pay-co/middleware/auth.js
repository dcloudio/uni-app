module.exports = async function(key = true) {
	if (this.authInfo) { // 多次执行auth时如果第一次成功后续不再执行
		return;
	}
	// 获取请求参数
	const params = this.getParams();
	// 获取token
	let token = this.getUniIdToken();
	// 如果没有token，尝试从参数中获取
	if (!token && params[0]) {
		token = params[0].uniIdToken || params[0].uni_id_token;
	}
	const payload = await this.uniIdCommon.checkToken(token);
	if (payload.errCode) {
		if (key) {
			throw payload;
		} else {
			return;
		}
	}
	this.authInfo = payload;
	if (payload.token && typeof this.response === "object") {
		this.response.newToken = {
			token: payload.token,
			tokenExpired: payload.tokenExpired
		}
	}
}
