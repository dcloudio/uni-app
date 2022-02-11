import {
  API_OPEN_LOCATION,
  API_TYPE_OPEN_LOCATION,
  defineAsyncApi,
  OpenLocationProtocol,
  OpenLocationOptions,
} from '@dcloudio/uni-api'
import { showPage } from '@dcloudio/uni-core'

export const openLocation = <API_TYPE_OPEN_LOCATION>defineAsyncApi(
  API_OPEN_LOCATION,
  (data, { resolve, reject }) => {
    showPage({
      url: '__uniappopenlocation',
      data,
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
