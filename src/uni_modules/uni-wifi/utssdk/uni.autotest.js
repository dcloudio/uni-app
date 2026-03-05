export function startWifi() {
	return new Promise((resolve, reject) => {
		uni.startWifi({
			success: () => {
				console.log('startWifi success');
				resolve()
			},
			complete: () => {
				console.log('startWifi fail');
				resolve()
			}
		})
	})
}

export function stopWifi() {
	return new Promise((resolve, reject) => {
		uni.stopWifi({
			complete: resolve
		})
	})
}

export function onGetWifiListAfter() {
	return new Promise((resolve, reject) => {
		uni.getWifiList({
			success() {
				setTimeout(resolve, 500)
			},
			complete() {
				stopWifi().finally(resolve)
			}
		})
	})
}