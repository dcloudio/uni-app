import {
  API_VIBRATE_SHORT,
  API_VIBRATE_LONG,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  API_TYPE_VIBRATE_SHORT,
  API_TYPE_VIBRATE_LONG,
} from '@dcloudio/uni-api'

const _isSupport = !!window.navigator.vibrate

export const vibrateShort = defineAsyncApi<API_TYPE_VIBRATE_SHORT>(
  API_VIBRATE_SHORT,
  (args, { resolve, reject }) => {
    if (_isSupport && window.navigator.vibrate(15)) {
      resolve()
    } else {
      reject('vibrateLong:fail')
    }
  }
)

export const vibrateLong = defineAsyncApi<API_TYPE_VIBRATE_LONG>(
  API_VIBRATE_LONG,
  (args, { resolve, reject }) => {
    if (_isSupport && window.navigator.vibrate(400)) {
      resolve()
    } else {
      reject('vibrateLong:fail')
    }
  }
)
