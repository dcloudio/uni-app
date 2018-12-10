const TODOS = [ //不支持的 API 列表
	'hideTabBar',
	'hideTabBarRedDot',
	'removeTabBarBadge',
	'setTabBarBadge',
	'setTabBarItem',
	'setTabBarStyle',
	'showTabBar',
	'showTabBarRedDot'
]

const protocols = { //需要做转换的 API 列表
	returnValue(methodName, res) { // 通用 returnValue 解析
		if (res.error || res.errorMessage) {
			res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`
			delete res.error
			delete res.errorMessage
		}
		return res
	},
	request: {
		name: 'httpRequest',
		args(fromArgs) {
			if (!fromArgs.header) { // 默认增加 header 参数，方便格式化 content-type
				fromArgs.header = {}
			}
			return {
				header(header = {}, toArgs) {
					const headers = {
						'content-type': 'application/json'
					}
					Object.keys(header).forEach(key => {
						headers[key.toLocaleLowerCase()] = header[key]
					})
					return {
						name: 'headers',
						value: headers
					}
				},
				method: 'method', // TODO 支付宝小程序仅支持 get,post
				responseType: false
			}
		},
		returnValue: {
			status: 'statusCode',
			headers: 'header'
		}
	},
	setNavigationBarColor: {
		name: 'setNavigationBar',
		args: {
			frontColor: false,
			animation: false
		}
	},
	setNavigationBarTitle: {
		name: 'setNavigationBar'
	},
	showModal({
		showCancel = true
	} = {}) {
		if (showCancel) {
			return {
				name: 'confirm',
				args: {
					cancelColor: false,
					confirmColor: false,
					cancelText: 'cancelButtonText',
					confirmText: 'confirmButtonText'
				},
				returnValue(fromRes, toRes) {
					toRes.confirm = fromRes.confirm
					toRes.cancel = !fromRes.confirm
				}
			}
		}
		return {
			name: 'alert',
			args: {
				confirmColor: false,
				confirmText: 'buttonText'
			},
			returnValue(fromRes, toRes) {
				toRes.confirm = true
				toRes.cancel = false
			}
		}
	},
	showToast({
		icon = 'success'
	} = {}) {
		const args = {
			title: 'content',
			icon: 'type',
			duration: false,
			image: false,
			mask: false
		}
		if (icon === 'loading') {
			return {
				name: 'showLoading',
				args
			}
		}
		return {
			name: 'showToast',
			args
		}
	},
	showActionSheet: {
		name: 'showActionSheet',
		args: {
			itemList: 'items',
			itemColor: false
		},
		returnValue: {
			index: 'tapIndex'
		}
	}
}

TODOS.forEach(todoApi => {
	protocols[todoApi] = false
})

export default protocols
