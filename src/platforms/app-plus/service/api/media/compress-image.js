import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

import {
  warpPlusErrorCallback,
  getFileName
} from '../util'

export function compressImage (options, callbackId) {
  const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`
  const errorCallback = warpPlusErrorCallback(callbackId, 'compressImage')
  plus.zip.compressImage(Object.assign({}, options, {
    dst
  }), () => {
    invoke(callbackId, {
      errMsg: 'compressImage:ok',
      tempFilePath: dst
    })
  }, errorCallback)
}
