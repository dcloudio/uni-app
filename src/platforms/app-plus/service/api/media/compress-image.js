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
  const { compressedWidth, compressedHeight } = options
  if (typeof compressedWidth === 'number') {
    options.width = compressedWidth + 'px'
  }
  if (typeof compressedHeight === 'number') {
    options.height = compressedHeight + 'px'
  }
  plus.zip.compressImage(Object.assign({}, options, {
    dst
  }), () => {
    invoke(callbackId, {
      errMsg: 'compressImage:ok',
      tempFilePath: dst
    })
  }, errorCallback)
}
