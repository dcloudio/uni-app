import {
  API_OPEN_LOCATION,
  type API_TYPE_OPEN_LOCATION,
  OpenLocationOptions,
  OpenLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import './LocationViewPage'

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (args, { resolve, reject }) => {
    const { latitude = '', longitude = '' } = args
    uni.navigateTo({
      url:
        '__uniappopenlocation?latitude=' + latitude + '&longitude=' + longitude,
      success: (res) => {
        resolve()
      },
      fail: (err) => {
        reject(err.errMsg || 'cancel')
      },
    })
  },
  OpenLocationProtocol,
  OpenLocationOptions
)
