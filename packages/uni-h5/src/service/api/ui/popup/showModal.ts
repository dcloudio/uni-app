import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_SHOW_MODAL,
  type API_TYPE_SHOW_MODAL,
  ShowModalOptions,
  ShowModalProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import modal, { type ModalProps } from './modal'

import { createRootApp, ensureRoot } from './utils'
import { once } from '@dcloudio/uni-shared'

let showModalState: ModalProps

const onHidePopupOnce = /*#__PURE__*/ once(() => {
  UniServiceJSBridge.on('onHidePopup', () => (showModalState.visible = false))
})

let currentShowModalResolve: UniApp.ShowModalOptions['success']

function onModalClose(type: 'cancel' | 'confirm', content: string) {
  const isConfirm = type === 'confirm'
  const res: UniApp.ShowModalRes = {
    confirm: isConfirm,
    cancel: type === 'cancel',
  }
  isConfirm && showModalState.editable && (res.content = content)
  currentShowModalResolve && currentShowModalResolve!(res)
}

export const hideModal = () => {
  if (showModalState) {
    showModalState.visible = false
  }
}

export const showModal = defineAsyncApi<API_TYPE_SHOW_MODAL>(
  API_SHOW_MODAL,
  (args, { resolve }) => {
    onHidePopupOnce()
    currentShowModalResolve = resolve
    if (!showModalState) {
      showModalState = reactive(args as ModalProps)
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(
        () => (
          createRootApp(modal, showModalState, onModalClose).mount(
            ensureRoot('u-a-m')
          ), //下一帧执行，确保首次显示时有动画效果
          nextTick(() => (showModalState.visible = true))
        )
      )
    } else {
      extend(showModalState, args)
      showModalState.visible = true
    }
  },
  ShowModalProtocol,
  ShowModalOptions
)
