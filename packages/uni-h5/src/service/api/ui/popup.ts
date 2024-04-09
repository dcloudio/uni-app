import {
  API_HIDE_LOADING,
  API_HIDE_TOAST,
  API_SHOW_ACTION_SHEET,
  API_SHOW_LOADING,
  API_SHOW_MODAL,
  API_SHOW_TOAST,
  type API_TYPE_HIDE_LOADING,
  type API_TYPE_HIDE_TOAST,
  type API_TYPE_SHOW_ACTION_SHEET,
  type API_TYPE_SHOW_LOADING,
  type API_TYPE_SHOW_MODAL,
  type API_TYPE_SHOW_TOAST,
  ShowActionSheetOptions,
  ShowActionSheetProtocol,
  ShowLoadingOptions,
  ShowLoadingProtocol,
  ShowModalOptions,
  ShowModalProtocol,
  ShowToastOptions,
  ShowToastProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const showModal = defineAsyncApi<API_TYPE_SHOW_MODAL>(
  API_SHOW_MODAL,
  () => {},
  ShowModalProtocol,
  ShowModalOptions
)
export const showToast = defineAsyncApi<API_TYPE_SHOW_TOAST>(
  API_SHOW_TOAST,
  () => {},
  ShowToastProtocol,
  ShowToastOptions
)
export const hideToast = defineAsyncApi<API_TYPE_HIDE_TOAST>(
  API_HIDE_TOAST,
  () => {}
)
export const showLoading = defineAsyncApi<API_TYPE_SHOW_LOADING>(
  API_SHOW_LOADING,
  () => {},
  ShowLoadingProtocol,
  ShowLoadingOptions
)
export const hideLoading = defineAsyncApi<API_TYPE_HIDE_LOADING>(
  API_HIDE_LOADING,
  () => {}
)
export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  () => {},
  ShowActionSheetProtocol,
  ShowActionSheetOptions
)
