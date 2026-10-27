/**
 * 权限验证中间件，一般情况下，无需修改此处的代码
 */
const methodPermission = require('../config/permission');
const { ERROR } = require('../common/error');

function isAccessAllowed(user = {}, setting) {
	const {
		role: userRole = [],
		permission: userPermission = []
	} = user
	const {
		role: settingRole = [],
		permission: settingPermission = []
	} = setting
	if (userRole.includes('admin')) {
		return;
	}
	if (settingRole.length > 0 && settingRole.every(item => !userRole.includes(item))) {
		throw { errCode: ERROR[50403] };
	}
	if (settingPermission.length > 0 && settingPermission.every(item => !userPermission.includes(item))) {
		throw { errCode: ERROR[50403] };
	}
}

module.exports = async function() {
	const methodName = this.getMethodName();
	if (!(methodName in methodPermission)) {
		return;
	}
	const {
		auth,
		role,
		permission
	} = methodPermission[methodName];
	if (auth || role || permission) {
		await this.middleware.auth();
	}
	if (role && role.length === 0) {
		throw new Error('[AccessControl]Empty role array is not supported');
	}
	if (permission && permission.length === 0) {
		throw new Error('[AccessControl]Empty permission array is not supported');
	}
	return isAccessAllowed(this.authInfo, {
		role,
		permission
	})
}
