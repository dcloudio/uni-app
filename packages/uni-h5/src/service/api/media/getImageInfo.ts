import {
  API_GET_IMAGE_INFO,
  type API_TYPE_GET_IMAGE_INFO,
  GetImageInfoOptions,
  GetImageInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

function getServiceAddress() {
  return window.location.protocol + '//' + window.location.host
}

export const getImageInfo = defineAsyncApi<API_TYPE_GET_IMAGE_INFO>(
  API_GET_IMAGE_INFO,
  ({ src }, { resolve, reject }) => {
    const img = new Image()
    img.onload = function () {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        path: src.indexOf('/') === 0 ? getServiceAddress() + src : src,
      })
    }
    img.onerror = function () {
      reject()
    }
    img.src = src
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
