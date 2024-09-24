import {
  API_OPEN_LOCATION,
  type API_TYPE_OPEN_LOCATION,
  OpenLocationOptions,
  OpenLocationProtocol,
  defineAsyncApi,
  getLocale,
} from '@dcloudio/uni-api'
import { showPage } from '@dcloudio/uni-core'
import { extend } from '@vue/shared'
import {
  ROUTE_LOCATION_VIEW_PAGE,
  initLocationViewPageOnce,
} from './LocationViewPage'

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (data, { resolve, reject }) => {
    if (__uniConfig.qqMapKey) {
      initLocationViewPageOnce()
      const { latitude = '', longitude = '' } = data || {}
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
      return
    }
    showPage({
      url: '__uniappopenlocation',
      data: extend({}, data, {
        locale: getLocale(),
      }),
      style: {
        titleNView: {
          type: 'transparent',
        },
        popGesture: 'close',
        backButtonAutoControl: 'close',
      },
      onClose() {
        reject('cancel')
      },
    })
    return resolve()
  },
  OpenLocationProtocol,
  OpenLocationOptions
)
