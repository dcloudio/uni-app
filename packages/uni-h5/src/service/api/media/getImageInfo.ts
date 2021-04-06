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
  ({ src }) => {
    const img = new Image()
    return new Promise((resolve, reject) => {
      img.onload = function () {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          path: src.indexOf('/') === 0 ? _getServiceAddress() + src : src,
        } as UniApp.GetImageInfoSuccessData) // orientation和type是可选的，但GetImageInfoSuccessData定义的不对，暂时强制转换
      }
      img.onerror = function () {
        reject()
      }
      img.src = src
    })
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
