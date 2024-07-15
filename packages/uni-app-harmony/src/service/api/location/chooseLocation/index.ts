import {
  API_CHOOSE_LOCATION,
  type API_TYPE_CHOOSE_LOCATION,
  ChooseLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import './LoctaionPickerPage'

export const chooseLocation = defineAsyncApi<API_TYPE_CHOOSE_LOCATION>(
  API_CHOOSE_LOCATION,
  (args, { resolve, reject }) => {
    const { keyword = '', latitude = '', longitude = '' } = args
    uni.navigateTo({
      url:
        '__uniappchooseLocation?keyword=' +
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
