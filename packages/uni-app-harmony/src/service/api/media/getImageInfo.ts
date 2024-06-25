import { _getImageInfo } from './media'
import {
  API_GET_IMAGE_INFO,
  type API_TYPE_GET_IMAGE_INFO,
  GetImageInfoOptions,
  GetImageInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

// TODO 网络图片
export const getImageInfo: API_TYPE_GET_IMAGE_INFO =
  defineAsyncApi<API_TYPE_GET_IMAGE_INFO>(
    API_GET_IMAGE_INFO,
    function ({ src }, { resolve, reject }) {
      _getImageInfo(src).then(resolve, reject)
    },
    GetImageInfoProtocol,
    GetImageInfoOptions
  )
