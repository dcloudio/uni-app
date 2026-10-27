/**
 * 升级中心测试参数（测试项目侧维护）
 * 测试时通过 checkUpdate(CHECK_UPDATE_OPTIONS) 注入；正式运行不传参则读取真实应用信息
 */
export const CHECK_UPDATE_OPTIONS = {
	appid: '__TEST_UPGRADE_CENTER__',
	appVersion: '2.1.6',
	appWgtVersion: '2.1.6'
}
