import {
  API_SHOW_MODAL,
  type API_TYPE_SHOW_MODAL,
  ShowModalOptions,
  ShowModalProtocol,
  defineAsyncApi,
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
      editable = false,
      placeholderText = '',
    } = {},
    { resolve }
  ) => {
    const buttons = showCancel ? [cancelText, confirmText] : [confirmText]
    const tip = editable ? placeholderText : buttons
    content = content || ' '
    plus.nativeUI[editable ? 'prompt' : 'confirm'](
      content,
      (e) => {
        if (showCancel) {
          const isConfirm = e.index === 1
          const res: UniApp.ShowModalRes = {
            confirm: isConfirm,
            cancel: e.index === 0 || e.index === -1,
          }
          isConfirm && editable && (res.content = e.value)
          resolve(res)
        } else {
          const res: UniApp.ShowModalRes = {
            confirm: e.index === 0,
            cancel: false,
          }
          editable && (res.content = e.value)
          resolve(res)
        }
      },
      title,
      <string & string[]>tip,
      <string[]>buttons
    )
  },
  ShowModalProtocol,
  ShowModalOptions
)
