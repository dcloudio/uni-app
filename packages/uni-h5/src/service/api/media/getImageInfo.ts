import {
  API_GET_IMAGE_INFO,
  API_TYPE_GET_IMAGE_INFO,
  defineAsyncApi,
  GetImageInfoOptions,
  GetImageInfoProtocol,
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
      } as UniApp.GetImageInfoSuccessData) // orientation和type是可选的，但GetImageInfoSuccessData定义的不对，暂时强制转换
    }
    img.onerror = function () {
      reject()
    }
    img.src = src
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
