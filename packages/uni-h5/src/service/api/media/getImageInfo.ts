import {
  API_TYPE_ASYNC,
  createApi,
  GetImageInfoOptions,
  GetImageInfoProtocol
} from '@dcloudio/uni-api'

function _getServiceAddress() {
  return window.location.protocol + '//' + window.location.host
}

export const getImageInfo = createApi<typeof uni.getImageInfo>(
  { type: API_TYPE_ASYNC, name: 'getImageInfo', options: GetImageInfoOptions },
  ({ src }, callback?: Function) => {
    const img = new Image()
    img.onload = function() {
      callback!({
        errMsg: 'getImageInfo:ok',
        width: img.naturalWidth,
        height: img.naturalHeight,
        path: src.indexOf('/') === 0 ? _getServiceAddress() + src : src
      })
    }
    img.onerror = function() {
      callback!({
        errMsg: 'getImageInfo:fail'
      })
    }
    img.src = src
  },
  GetImageInfoProtocol
)
