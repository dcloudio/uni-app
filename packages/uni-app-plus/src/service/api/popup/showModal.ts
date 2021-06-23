import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_SHOW_MODAL,
  API_TYPE_SHOW_MODAL,
  defineAsyncApi,
  ShowModalOptions,
  ShowModalProtocol,
} from '@dcloudio/uni-api'

import { ModalProps } from '../../../../../uni-h5/src/service/api/ui/popup/modal'

let showModalState: ModalProps

let currentShowModalResolve: UniApp.ShowModalOptions['success']

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
    currentShowModalResolve = resolve
    if (!showModalState) {
      showModalState = reactive({
        title,
        content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
      } as ModalProps)
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
        showCancel ? [cancelText, confirmText] : [confirmText]
      )
      //下一帧执行，确保首次显示时有动画效果
      nextTick(() => (showModalState.visible = true))
    } else {
      extend(showModalState, {
        title,
        content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
      })
      showModalState.visible = true
    }
  },
  ShowModalProtocol,
  ShowModalOptions
)
