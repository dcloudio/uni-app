import sensor from '@ohos.sensor'

export type CompassUpdateListener = (direction : number, accuracy : number | null) => void

interface OrientationPayload {
	x ?: number
	y ?: number
	z ?: number
	alpha ?: number
	azimuth ?: number
	accuracy ?: number
}

export class CompassNative {
	private static listener : CompassUpdateListener | null = null
	private static started : boolean = false

	private static readonly orientationCallback = (data : OrientationPayload) : void => {
		const direction = CompassNative.normalizeDirection(CompassNative.extractDirection(data))
		const callback = CompassNative.listener
		if (callback != null) {
			callback(direction, data.accuracy != null ? data.accuracy : null)
		}
	}

	static getOrientationSensorId() : number {
		return sensor.SensorId.ORIENTATION as number
	}

	static isSupported() : boolean {
		try {
			const sensorInfo = sensor.getSingleSensor(CompassNative.getOrientationSensorId())
			return sensorInfo != null
		} catch (e) {
			return false
		}
	}

	static setListener(callback : CompassUpdateListener | null) : void {
		CompassNative.listener = callback
	}

	static removeListener() : void {
		CompassNative.listener = null
	}

	static start() : number {
		if (CompassNative.started) {
			return 0
		}
		try {
			if (!CompassNative.isSupported()) {
				return 501
			}
			sensor.on(CompassNative.getOrientationSensorId(), CompassNative.orientationCallback, {
				interval: 200000000
			})
			CompassNative.started = true
			return 0
		} catch (e) {
			return 502
		}
	}

	static stop() : number {
		if (!CompassNative.started) {
			return 0
		}
		try {
			sensor.off(CompassNative.getOrientationSensorId(), CompassNative.orientationCallback)
			CompassNative.started = false
			return 0
		} catch (e) {
			return 503
		}
	}

	static extractDirection(data : OrientationPayload) : number {
		if (data.azimuth != null) {
			return data.azimuth
		}
		if (data.alpha != null) {
			return data.alpha
		}
		if (data.x != null) {
			return data.x
		}
		if (data.z != null) {
			return data.z
		}
		return 0
	}

	static normalizeDirection(value : number) : number {
		let result = value % 360
		if (result < 0) {
			result += 360
		}
		return result
	}
}
