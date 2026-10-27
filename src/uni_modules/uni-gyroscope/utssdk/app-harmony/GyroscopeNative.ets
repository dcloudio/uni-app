import sensor from '@ohos.sensor'

export type GyroscopeUpdateListener = (x : number, y : number, z : number) => void

interface GyroscopePayload {
	x ?: number
	y ?: number
	z ?: number
}

export class GyroscopeNative {
	private static listener : GyroscopeUpdateListener | null = null
	private static started : boolean = false

	private static readonly sensorCallback = (data : GyroscopePayload) : void => {
		const callback = GyroscopeNative.listener
		if (callback == null) {
			return
		}
		callback(
			data.x != null ? data.x : 0,
			data.y != null ? data.y : 0,
			data.z != null ? data.z : 0
		)
	}

	static setListener(callback : GyroscopeUpdateListener | null) : void {
		GyroscopeNative.listener = callback
	}

	static removeListener() : void {
		GyroscopeNative.listener = null
	}

	static start(interval : string) : number {
		if (GyroscopeNative.started) {
			return 0
		}
		try {
			sensor.on(sensor.SensorType.SENSOR_TYPE_ID_GYROSCOPE, GyroscopeNative.sensorCallback, {
				interval: GyroscopeNative.mapInterval(interval)
			})
			GyroscopeNative.started = true
			return 0
		} catch (_e) {
			return 502
		}
	}

	static stop() : number {
		if (!GyroscopeNative.started) {
			return 0
		}
		try {
			sensor.off(sensor.SensorType.SENSOR_TYPE_ID_GYROSCOPE, GyroscopeNative.sensorCallback)
			GyroscopeNative.started = false
			return 0
		} catch (_e) {
			return 503
		}
	}

	private static mapInterval(interval : string) : number {
		switch (interval) {
			case 'game':
				return 20000000
			case 'ui':
				return 60000000
			default:
				return 200000000
		}
	}
}
