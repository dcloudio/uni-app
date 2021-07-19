import { invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_BACK,
  API_TYPE_NAVIGATE_BACK,
  defineAsyncApi,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'
import { ON_BACK_PRESS } from '@dcloudio/uni-shared'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  ({ delta }, { resolve, reject }) => {
    let canBack = true
    if (invokeHook(ON_BACK_PRESS) === true) {
      canBack = false
    }
    if (!canBack) {
      return reject(ON_BACK_PRESS)
    }
    getApp().$router.go(-delta!)
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)
