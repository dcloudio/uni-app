import { once } from '@dcloudio/uni-shared'
import UniModalPage from '@/uni_modules/uni-modal/pages/uniModal/uniModal.vue'
import {
  hideModal as hideModalApi,
  showModal as showModalApi,
  // @ts-expect-error
} from '@/uni_modules/uni-modal'
import {
  API_SHOW_MODAL,
  type API_TYPE_SHOW_MODAL,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'

const API_HIDE_MODAL = 'hideModal'
type API_TYPE_HIDE_MODAL = (options: unknown | null) => void

const registerModalOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:uniModal', UniModalPage)
})

export const hideModal = defineAsyncApi<API_TYPE_HIDE_MODAL>(
  API_HIDE_MODAL,
  (args, { resolve, reject }) => {
    registerModalOnce()
    hideModalApi(args, {
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  }
)

export const showModal = defineAsyncApi<API_TYPE_SHOW_MODAL>(
  API_SHOW_MODAL,
  (args, { resolve, reject }) => {
    registerModalOnce()
    showModalApi(args, {
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  }
)
