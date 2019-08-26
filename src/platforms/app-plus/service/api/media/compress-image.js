import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

export function compressImage ({
  src,
  quality
}, callbackId) {
  var dst = TEMP_PATH + '/compressed/' + Date.now() + (src.match(/\.\S+$/) || [''])[0]
  plus.zip.compressImage({
    src,
    dst,
    quality
  }, () => {
    invoke(callbackId, {
      errMsg: `compressImage:ok`,
      tempFilePath: dst
    })
  }, () => {
    invoke(callbackId, {
      errMsg: `compressImage:fail`
    })
  })
}
