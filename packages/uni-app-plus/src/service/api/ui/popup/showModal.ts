import {
  API_SHOW_MODAL,
  API_TYPE_SHOW_MODAL,
  defineAsyncApi,
  ShowModalOptions,
  ShowModalProtocol,
} from '@dcloudio/uni-api'

export const showModal = defineAsyncApi<API_TYPE_SHOW_MODAL>(
  API_SHOW_MODAL,
  (
    {
      title = '',
      content = '',
      showCancel = true,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
    } = {},
    { resolve }
  ) => {
    content = content || ' '
    plus.nativeUI.confirm(
      content,
      (e) => {
        if (showCancel) {
          resolve({
            confirm: e.index === 1,
            cancel: e.index === 0 || e.index === -1,
          })
        } else {
          resolve({
            confirm: e.index === 0,
            cancel: false,
          })
        }
      },
      title as PlusNativeUIConfirmStyles,
      showCancel ? [cancelText!, confirmText!] : [confirmText!]
    )
  },
  ShowModalProtocol,
  ShowModalOptions
)
