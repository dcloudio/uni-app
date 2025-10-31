import { once } from '@dcloudio/uni-shared'
import UniLoadingPage from '@/uni_modules/uni-showLoading/pages/showLoading/showLoading.vue'
import {
  hideLoading as hideLoadingApi,
  showLoading as showLoadingApi,
  // @ts-expect-error
} from '@/uni_modules/uni-showLoading'
import {
  API_SHOW_LOADING,
  type API_TYPE_SHOW_LOADING,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'
import { extend } from '@vue/shared'

const API_HIDE_LOADING = 'hideLoading'
type API_TYPE_HIDE_MODAL = (options: unknown | null) => void

const registerLoadingOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:showLoading', UniLoadingPage)
})

export const hideLoading = defineAsyncApi<API_TYPE_HIDE_MODAL>(
  API_HIDE_LOADING,
  (args, { resolve, reject }) => {
    registerLoadingOnce()
    hideLoadingApi(
      // 拷贝参数，避免 defineAsyncApi 处理 args 影响传入参数
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

export const showLoading = defineAsyncApi<API_TYPE_SHOW_LOADING>(
  API_SHOW_LOADING,
  (args, { resolve, reject }) => {
    registerLoadingOnce()
    showLoadingApi(
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
