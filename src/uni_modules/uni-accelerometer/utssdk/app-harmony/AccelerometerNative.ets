import sensor from '@ohos.sensor'

export type AccelerometerUpdateListener = (x : number, y : number, z : number) => void

interface AccelerometerPayload {
	x ?: number
	y ?: number
	z ?: number
}

export class AccelerometerNative {
	private static listener : AccelerometerUpdateListener | null = null
	private static started : boolean = false

	private static readonly sensorCallback = (data : AccelerometerPayload) : void => {
		const callback = AccelerometerNative.listener
		if (callback == null) {
			return
		}
		callback(
			data.x != null ? data.x : 0,
			data.y != null ? data.y : 0,
			data.z != null ? data.z : 0
		)
	}

	static setListener(callback : AccelerometerUpdateListener | null) : void {
		AccelerometerNative.listener = callback
	}

	static removeListener() : void {
		AccelerometerNative.listener = null
	}

	static start(interval : string) : number {
		if (AccelerometerNative.started) {
			return 0
		}
		try {
			sensor.on(sensor.SensorType.SENSOR_TYPE_ID_ACCELEROMETER, AccelerometerNative.sensorCallback, {
				interval: AccelerometerNative.mapIntervalToNanoseconds(interval)
			})
			AccelerometerNative.started = true
			return 0
		} catch (_e) {
			return 502
		}
	}

	static stop() : number {
		if (!AccelerometerNative.started) {
			return 0
		}
		try {
			sensor.off(sensor.SensorType.SENSOR_TYPE_ID_ACCELEROMETER, AccelerometerNative.sensorCallback)
			AccelerometerNative.started = false
			return 0
		} catch (_e) {
			return 503
		}
	}

	private static mapIntervalToNanoseconds(interval : string) : number {
		switch (interval) {
			case 'game':
				return 20000000
			case 'ui':
				return 20000000
			default:
				return 200000000
		}
	}
}
