export type StoreListItem = {
	enable : boolean
	id : string
	name : string
	scheme : string
	priority : number // 优先级
}

export type UniUpgradeCenterResult = {
	_id : string
	appid : string
	name : string
	title : string
	contents : string
	url : string // 安装包下载地址
	platform : Array<string> // Array<'Android' | 'iOS' | 'Harmony'>
	version : string // 版本号 1.0.0
	uni_platform : string // "android" | "ios" | 'harmony'
	stable_publish : boolean // 是否是稳定版
	is_mandatory : boolean // 是否强制更新
	is_silently : boolean | null	// 是否静默更新
	create_env : string // "upgrade-center"
	create_date : number
	message : string
	code : number

	type : string // "native_app" | "wgt"
	store_list : StoreListItem[] | null
	min_uni_version : string | null  // 升级 wgt 的最低 uni-app 版本
}

export default function () : Promise<UniUpgradeCenterResult> {
	// #ifdef APP
	return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
		const systemInfo = uni.getSystemInfoSync()
		const appId = systemInfo.appId
		const appVersion = systemInfo.appVersion //systemInfo.appVersion
		// #ifndef UNI-APP-X
		if (typeof appId === 'string' && typeof appVersion === 'string' && appId.length > 0 && appVersion.length > 0) {
			plus.runtime.getProperty(appId, function (widgetInfo) {
				if (widgetInfo.version) {
					let data = {
						action: 'checkVersion',
						appid: appId,
						appVersion: appVersion,
						wgtVersion: widgetInfo.version
					}
					uniCloud.callFunction({
						name: 'uni-upgrade-center',
						data,
						success: (e) => {
							resolve(e.result as UniUpgradeCenterResult)
						},
						fail: (error) => {
							reject(error)
						}
					})
				} else {
					reject('widgetInfo.version is EMPTY')
				}
			})
		} else {
			reject('plus.runtime.appid is EMPTY')
		}
		// #endif
		// #ifdef UNI-APP-X
		if (typeof appId === 'string' && typeof appVersion === 'string' && appId.length > 0 && appVersion.length > 0) {
			let data = {
				action: 'checkVersion',
				appid: appId,
				appVersion: appVersion,
				is_uniapp_x: true,
				wgtVersion: '0.0.0.0.0.1'
			}
			try {
				uniCloud.callFunction({
					name: 'uni-upgrade-center',
					data: data
				}).then(res => {
					const code = res.result['code']
					const codeIsNumber = ['Int', 'Long', 'number'].includes(typeof code)
					if (codeIsNumber) {
					  if ((code as number) == 0) {
					    reject({
					      code: res.result['code'],
					      message: res.result['message']
					    })
					  } else if ((code as number) < 0) {
					    reject({
					      code: res.result['code'],
					      message: res.result['message']
					    })
					  } else {
              const result = JSON.parse<UniUpgradeCenterResult>(JSON.stringify(res.result)) as UniUpgradeCenterResult
              resolve(result)
            }
					}
				}).catch<void>((err : any | null) => {
					const error = err as UniCloudError
					if (error.errMsg == '未匹配到云函数[uni-upgrade-center]')
						error.errMsg = '【uni-upgrade-center-app】未配置uni-upgrade-center，无法升级。参考: https://uniapp.dcloud.net.cn/uniCloud/upgrade-center.html'
					reject(error.errMsg)
				})
			} catch (e) {
				reject(e.message)
			}
		} else {
			reject('invalid appid or appVersion')
		}
		// #endif
	})
	// #endif
	// #ifndef APP
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
