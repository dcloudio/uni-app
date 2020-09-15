import {
  createApi,
  GetImageInfoOptions,
  GetImageInfoProtocol
} from '@dcloudio/uni-api'

function _getServiceAddress() {
  return window.location.protocol + '//' + window.location.host
}

export const getImageInfo = createApi<typeof uni.getImageInfo>(
  ({ src }, callbackId?: number) => {
    const { invokeCallbackHandler: invoke } = UniServiceJSBridge
    const img = new Image()
    const realPath = src
    img.onload = function() {
      invoke(callbackId, {
        errMsg: 'getImageInfo:ok',
        width: img.naturalWidth,
        height: img.naturalHeight,
        path:
          realPath.indexOf('/') === 0
            ? _getServiceAddress() + realPath
            : realPath
      })
    }
    img.onerror = function() {
      invoke(callbackId, {
        errMsg: 'getImageInfo:fail'
      })
    }
    img.src = src
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
