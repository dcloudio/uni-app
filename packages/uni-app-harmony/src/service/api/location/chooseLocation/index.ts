import {
  API_CHOOSE_LOCATION,
  type API_TYPE_CHOOSE_LOCATION,
  ChooseLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  ROUTE_LOCATION_PICKER_PAGE,
  initLocationPickerPageOnce,
} from './LoctaionPickerPage'

export const chooseLocation = defineAsyncApi<API_TYPE_CHOOSE_LOCATION>(
  API_CHOOSE_LOCATION,
  (args, { resolve, reject }) => {
    initLocationPickerPageOnce()
    const { keyword = '', latitude = '', longitude = '' } = args
    uni.navigateTo({
      url:
        '/' +
        ROUTE_LOCATION_PICKER_PAGE +
        '?keyword=' +
        keyword +
        '&latitude=' +
        latitude +
        '&longitude=' +
        longitude,
      events: {
        close: (res) => {
          if (res && res.latitude) {
            resolve(res)
          } else {
            reject('cancel')
          }
        },
      },
      fail: (err) => {
        reject(err.errMsg || 'cancel')
      },
    })
  },
  ChooseLocationProtocol
)
