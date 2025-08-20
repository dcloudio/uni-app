import { once } from '@dcloudio/uni-shared'
import UniActionSheetPage from '@/uni_modules/uni-actionSheet/pages/actionSheet/actionSheet.vue'
import {
  hideActionSheet as hideActionSheetApi,
  showActionSheet as showActionSheetApi,
  // @ts-expect-error
} from '@/uni_modules/uni-actionSheet'
import {
  API_SHOW_ACTION_SHEET,
  type API_TYPE_SHOW_ACTION_SHEET,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'
import { extend } from '@vue/shared'

const registerActionSheetOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:actionSheet', UniActionSheetPage)
})

export const hideActionSheet = () => {
  registerActionSheetOnce()
  hideActionSheetApi()
}

export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  (args, { resolve, reject }) => {
    registerActionSheetOnce()
    showActionSheetApi(
      extend(
        {
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          },
        },
        args
      )
    )
  }
)
