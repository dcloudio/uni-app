import {
  invoke
} from '../../bridge'

export function getImageInfo ({
  src
} = {}, callbackId) {
  // fixed by hxy
  plus.io.getImageInfo({
    src,
    success (imageInfo) {
      invoke(callbackId, {
        errMsg: 'getImageInfo:ok',
        ...imageInfo
      })
    },
    fail () {
      invoke(callbackId, {
        errMsg: 'getImageInfo:fail'
      })
    }
  })
}
