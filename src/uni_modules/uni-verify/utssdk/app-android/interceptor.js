export function initGetUniVerifyManager(originalGetUniVerifyManager) {
	return function() {
		const manager = originalGetUniVerifyManager();
		if (manager) {
			const oldCustomLogin = manager.customLogin;
			return new Proxy(manager, {
				get(target, p) {
					if (p === 'customLogin') {
						return function(options) {
							const privacyCheckBoxElementChecked = options.privacyCheckBoxElement && options.privacyCheckBoxElement.checked;
							options.privacyCheckBoxElementChecked = privacyCheckBoxElementChecked;
							return oldCustomLogin.call(this, options);
						}
					}
					return manager[p]
				}
			})
		}
	}
}