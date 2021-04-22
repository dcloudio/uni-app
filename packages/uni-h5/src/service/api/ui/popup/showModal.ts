import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_SHOW_MODAL,
  API_TYPE_SHOW_MODAL,
  defineAsyncApi,
  ShowModalOptions,
  ShowModalProtocol,
} from '@dcloudio/uni-api'

import modal, { ModalProps } from './modal'

import { ensureRoot, createRootApp } from './utils'

let showModalState: ModalProps

let currentShowModalResolve: UniApp.ShowModalOptions['success']

function onModalClose(type: 'cancel' | 'confirm') {
  currentShowModalResolve &&
    currentShowModalResolve!({
      confirm: type === 'confirm',
      cancel: type === 'cancel',
    })
}

export const showModal = defineAsyncApi<API_TYPE_SHOW_MODAL>(
  API_SHOW_MODAL,
  (args, { resolve }) => {
    currentShowModalResolve = resolve
    if (!showModalState) {
      showModalState = reactive(args as ModalProps)
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(() =>
        createRootApp(modal, showModalState, onModalClose).mount(
          ensureRoot('u-a-m')
        )
      )
    } else {
      extend(showModalState, args)
    }
    showModalState.visible = true
  },
  ShowModalProtocol,
  ShowModalOptions
)
