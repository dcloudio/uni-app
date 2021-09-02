import {
  TEMP_PATH
} from '../constants'

import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
  getFileName
} from '../util'

export function compressVideo (options, callbackId) {
  const filename = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`
  const successCallback = warpPlusSuccessCallback(callbackId, 'compressVideo')
  const errorCallback = warpPlusErrorCallback(callbackId, 'compressVideo')
  plus.zip.compressVideo(Object.assign({}, options, {
    filename
  }), successCallback, errorCallback)
}
