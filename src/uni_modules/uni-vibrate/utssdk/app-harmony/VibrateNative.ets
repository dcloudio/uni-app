import vibrator from '@ohos.vibrator'

type VibrateShortType = 'heavy' | 'medium' | 'light'

interface HarmonyBusinessError extends Error {
	code?: number
}

const VIBRATE_ATTRIBUTE: vibrator.VibrateAttribute = {
	usage: 'touch'
}

const VIBRATE_SUCCESS = 0
const VIBRATE_UNSUPPORTED = 9001002
const VIBRATE_FAILED = 9001003

const SHORT_LIGHT_DURATION = 15
const SHORT_MEDIUM_DURATION = 25
const SHORT_HEAVY_DURATION = 35
const LONG_DURATION = 400

export class VibrateNative {
	static vibrateShort(type: string): number {
		return VibrateNative.startTimeVibration(VibrateNative.resolveShortDuration(type))
	}

	static vibrateLong(): number {
		return VibrateNative.startTimeVibration(LONG_DURATION)
	}

	private static resolveShortDuration(type: string): number {
		switch (type as VibrateShortType) {
			case 'heavy':
				return SHORT_HEAVY_DURATION
			case 'medium':
				return SHORT_MEDIUM_DURATION
			case 'light':
			default:
				return SHORT_LIGHT_DURATION
		}
	}

	private static startTimeVibration(duration: number): number {
		try {
			vibrator.startVibration({
				type: 'time',
				duration
			}, VIBRATE_ATTRIBUTE).catch((error: HarmonyBusinessError) => {
				console.error('[uni-vibrate] harmony startVibration failed', error.code ?? VIBRATE_FAILED)
			})
			return VIBRATE_SUCCESS
		} catch (error) {
			return VibrateNative.mapErrorCode(error as HarmonyBusinessError)
		}
	}

	private static mapErrorCode(error: HarmonyBusinessError): number {
		switch (error.code) {
			case 801:
				return VIBRATE_UNSUPPORTED
			case 201:
			case 14600101:
			default:
				return VIBRATE_FAILED
		}
	}
}
