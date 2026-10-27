export function getBatteryInfo(options) {
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const res = {
				errCode: 0,
				errSubject: "uni-getBatteryInfo",
                errMsg: 'getBatteryInfo:ok',
                level: battery.level * 100,
                isCharging: battery.charging
            }
            options.success && options.success(res)
            options.complete && options.complete(res)
        })
    } else {
        const res = {
			errCode: 1002,
			errSubject: "uni-getBatteryInfo",
            errMsg: 'getBatteryInfo:fail navigator.getBattery is unsupported'
        }
        options.fail && options.fail(res)
        options.complete && options.complete(res)
    }
}
