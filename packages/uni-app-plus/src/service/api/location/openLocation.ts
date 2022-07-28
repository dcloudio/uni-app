import {
  API_OPEN_LOCATION,
  API_TYPE_OPEN_LOCATION,
  defineAsyncApi,
  OpenLocationProtocol,
  OpenLocationOptions,
  getLocale,
} from '@dcloudio/uni-api'
import { showPage } from '@dcloudio/uni-core'
import { extend } from '@vue/shared'

export const openLocation = <API_TYPE_OPEN_LOCATION>defineAsyncApi(
  API_OPEN_LOCATION,
  (data, { resolve, reject }) => {
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
