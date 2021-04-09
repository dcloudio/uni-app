import { invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_BACK,
  defineAsyncApi,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'

export const navigateBack = defineAsyncApi<typeof uni.navigateBack>(
  API_NAVIGATE_BACK,
  ({ delta }, { resolve, reject }) => {
    let canBack = true
    if (invokeHook('onBackPress') === true) {
      canBack = false
    }
    if (!canBack) {
      return reject('onBackPress')
    }
    getApp().$router.go(-delta!)
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)
