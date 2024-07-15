import {
  API_OPEN_LOCATION,
  type API_TYPE_OPEN_LOCATION,
  OpenLocationOptions,
  OpenLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  ROUTE_LOCATION_VIEW_PAGE,
  initLocationViewPageOnce,
} from './LocationViewPage'

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (args, { resolve, reject }) => {
    initLocationViewPageOnce()
    const { latitude = '', longitude = '' } = args
    uni.navigateTo({
      url:
        '/' +
        ROUTE_LOCATION_VIEW_PAGE +
        '?latitude=' +
        latitude +
        '&longitude=' +
        longitude,
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
