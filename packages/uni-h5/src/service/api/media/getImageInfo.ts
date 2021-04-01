import {
  API_GET_IMAGE_INFO,
  defineAsyncApi,
  GetImageInfoOptions,
  GetImageInfoProtocol,
} from '@dcloudio/uni-api'

function _getServiceAddress() {
  return window.location.protocol + '//' + window.location.host
}

export const getImageInfo = defineAsyncApi<typeof uni.getImageInfo>(
  API_GET_IMAGE_INFO,
  ({ src }, callback?: Function) => {
    const img = new Image()
    img.onload = function () {
      callback!({
        errMsg: `${API_GET_IMAGE_INFO}:ok`,
        width: img.naturalWidth,
        height: img.naturalHeight,
        path: src.indexOf('/') === 0 ? _getServiceAddress() + src : src,
      })
    }
    img.onerror = function () {
      callback!({
        errMsg: `${API_GET_IMAGE_INFO}:fail`,
      })
    }
    img.src = src
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
