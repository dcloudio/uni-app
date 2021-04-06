import {
  API_NAVIGATE_BACK,
  defineAsyncApi,
  getCurrentPageVm,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'

export const navigateBack = defineAsyncApi<typeof uni.navigateBack>(
  API_NAVIGATE_BACK,
  ({ delta }) =>
    new Promise((resolve, reject) => {
      let canBack = true
      const vm = getCurrentPageVm()
      if (vm && vm.$callHook('onBackPress') === true) {
        canBack = false
      }
      if (!canBack) {
        return reject('onBackPress')
      }
      getApp().$router.go(-delta!)
      resolve()
    }),
  NavigateBackProtocol,
  NavigateBackOptions
)
