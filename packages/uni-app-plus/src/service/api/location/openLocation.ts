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

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
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
