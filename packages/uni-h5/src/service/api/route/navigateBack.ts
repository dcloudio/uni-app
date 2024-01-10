import { invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_BACK,
  API_TYPE_NAVIGATE_BACK,
  defineAsyncApi,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'
import { ON_BACK_PRESS } from '@dcloudio/uni-shared'
//#if _X_
import { hideActionSheet } from '../ui/popup/showActionSheet'
import { hideModal } from '../ui/popup/showModal'
//#endif

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
    //#if _X_
    hideActionSheet()
    hideModal()
    uni.hideToast()
    uni.hideLoading()
    //#endif

    getApp().$router.go(-args!.delta!)
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)
