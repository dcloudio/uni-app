import { once } from '@dcloudio/uni-shared'
import UniOpenLocationPage from '@/uni_modules/uni-openLocation/pages/openLocation/openLocation.vue'
import {
  openLocation as openLocationApi,
  // @ts-expect-error
} from '@/uni_modules/uni-openLocation'
import {
  API_OPEN_LOCATION,
  type API_TYPE_OPEN_LOCATION,
  OpenLocationOptions,
  OpenLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'
import { extend } from '@vue/shared'

const registerOpenLocationOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:openLocation', UniOpenLocationPage)
})

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (args, { resolve, reject }) => {
    registerOpenLocationOnce()
    openLocationApi(
      extend({}, args, {
        success: (res) => resolve(res),
        fail: (err) => reject(err.errMsg, err),
      })
    )
  },
  OpenLocationProtocol,
  OpenLocationOptions
)
