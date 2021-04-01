import {
  API_NAVIGATE_BACK,
  defineAsyncApi,
  getCurrentPageVm,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'

export const navigateBack = defineAsyncApi<typeof uni.navigateBack>(
  API_NAVIGATE_BACK,
  (options) => {
    let canBack = true
    const vm = getCurrentPageVm()
    if (vm && vm.$callHook('onBackPress') === true) {
      canBack = false
    }
    if (!canBack) {
      return {
        errMsg: `${API_NAVIGATE_BACK}:fail onBackPress`,
      }
    }
    getApp().$router.go(-options.delta!)
  },
  NavigateBackProtocol,
  NavigateBackOptions
)
