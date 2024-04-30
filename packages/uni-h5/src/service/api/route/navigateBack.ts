import { invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_BACK,
  type API_TYPE_NAVIGATE_BACK,
  NavigateBackOptions,
  NavigateBackProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { ON_BACK_PRESS } from '@dcloudio/uni-shared'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    let canBack = true
    if (
      invokeHook(ON_BACK_PRESS, {
        from: (args as any).from || 'navigateBack',
      }) === true
    ) {
      canBack = false
    }
    if (!canBack) {
      return reject(ON_BACK_PRESS)
    }

    getApp().$router.go(-args!.delta!)
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)
