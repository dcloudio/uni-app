import { once } from '@dcloudio/uni-shared'
import UniChooseLocationPage from '@/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue'
import {
  chooseLocation as chooseLocationApi,
  // @ts-expect-error
} from '@/uni_modules/uni-chooseLocation'
import {
  API_CHOOSE_LOCATION,
  type API_TYPE_CHOOSE_LOCATION,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'

const registerChooseLocationOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:chooseLocation', UniChooseLocationPage)
})

export const chooseLocation = defineAsyncApi<API_TYPE_CHOOSE_LOCATION>(
  API_CHOOSE_LOCATION,
  (args, { resolve, reject }) => {
    registerChooseLocationOnce()
    chooseLocationApi(args, {
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  }
)
