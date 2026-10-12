//#region Functions
import { effectScope, nextTick, reactive, watch } from 'vue'
import { extend } from '@vue/shared'
import {
  API_HIDE_LOADING,
  API_HIDE_TOAST,
  API_SHOW_LOADING,
  API_SHOW_TOAST,
  HideToastOptions,
  HideToastProtocol,
  ShowLoadingOptions,
  ShowLoadingProtocol,
  ShowToastOptions,
  ShowToastProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import Toast, { type ToastProps } from './toast'
import { createRootApp, ensureRoot } from './utils'
import { getCurrentPageId, useI18n } from '@dcloudio/uni-core'
import { onPageUnload } from '../../../../framework/setup/page'
//#endregion

//#region Type
import type {
  API_TYPE_HIDE_LOADING,
  API_TYPE_HIDE_TOAST,
  API_TYPE_SHOW_LOADING,
  API_TYPE_SHOW_TOAST,
} from '@dcloudio/uni-api'
//#endregion

type ToastType = 'onShowToast' | 'onShowLoading'

interface ToastController {
  state?: ToastProps
  type: ToastType | ''
  pageId?: number
  timeoutId?: ReturnType<typeof setTimeout>
  showTimerId?: ReturnType<typeof setTimeout>
  token: number
}

const pageToast: ToastController = { type: '', token: 0 }
const appToast: ToastController = { type: '', token: 0 }

const scope = /*#__PURE__*/ effectScope()

function resetToastTimeout(controller: ToastController) {
  clearTimeout(controller.timeoutId)
  if (controller.type !== 'onShowToast') {
    return
  }
  controller.timeoutId = setTimeout(
    () => hidePopup('onHideToast', controller),
    controller.state!.duration
  )
}

function watchVisible(controller: ToastController) {
  scope.run(() => {
    watch(
      () => controller.state!.visible,
      (visible) => {
        if (visible) {
          resetToastTimeout(controller)
        } else {
          clearTimeout(controller.timeoutId)
        }
      }
    )
  })
}

function createToast(
  controller: ToastController,
  args: ToastProps,
  type: ToastType,
  pageId?: number
) {
  clearTimeout(controller.timeoutId)
  clearTimeout(controller.showTimerId)
  controller.type = type
  controller.pageId = pageId
  controller.token++
  if (!controller.state) {
    controller.state = reactive(extend({}, args, { visible: false }))
    // 异步执行，避免干扰 getCurrentInstance
    nextTick(() => {
      watchVisible(controller)
      if (controller === pageToast) {
        UniServiceJSBridge.on('onHidePopup', () =>
          hidePopup('onHidePopup', pageToast)
        )
      }
      createRootApp(Toast, controller.state!, () => {}).mount(
        ensureRoot(controller === pageToast ? 'u-a-t' : 'u-a-at')
      )
    })
  } else {
    extend(controller.state, args)
  }

  const token = controller.token
  controller.showTimerId = setTimeout(() => {
    // 延迟一下 show 可解决窗口打开前调用 showToast 在 onHidePopup 之后触发
    if (token === controller.token) {
      controller.state!.visible = true
    }
  }, 10)
  if (controller.state?.visible) {
    resetToastTimeout(controller)
  }
}

export const showToast = defineAsyncApi<API_TYPE_SHOW_TOAST>(
  API_SHOW_TOAST,
  (args, { resolve, reject }) => {
    if (
      args.position !== undefined &&
      !['top', 'center', 'bottom'].includes(args.position)
    ) {
      args.position = 'center'
    }
    const controller = args.position === undefined ? pageToast : appToast
    createToast(
      controller,
      args as ToastProps,
      'onShowToast',
      controller === pageToast ? getCurrentPageId() : undefined
    )
    resolve()
  },
  ShowToastProtocol,
  ShowToastOptions
)
//#if !_X_
// 此项为抹平与showToast参数差距
const showLoadingDefaultState = {
  icon: 'loading',
  duration: 100000000,
  image: '',
}
export const showLoading = defineAsyncApi<API_TYPE_SHOW_LOADING>(
  API_SHOW_LOADING,
  (args, { resolve, reject }) => {
    extend(args, showLoadingDefaultState)
    createToast(pageToast, args as ToastProps, 'onShowLoading')
    resolve()
  },
  ShowLoadingProtocol,
  ShowLoadingOptions
)
//#endif

export const hideToast = defineAsyncApi<API_TYPE_HIDE_TOAST>(
  API_HIDE_TOAST,
  (args, { resolve, reject }) => {
    hidePopup('onHideToast', pageToast)
    if (args?.allType) {
      hidePopup('onHideToast', appToast)
    }
    resolve()
  },
  HideToastProtocol,
  HideToastOptions
)

//#if !_X_
export const hideLoading = defineAsyncApi<API_TYPE_HIDE_LOADING>(
  API_HIDE_LOADING,
  (args, { resolve, reject }) => {
    hidePopup('onHideLoading', pageToast)
    resolve()
  }
)
//#endif

function hidePopup(
  type: 'onHideToast' | 'onHideLoading' | 'onHidePopup',
  controller: ToastController
) {
  const { t } = useI18n()
  if (!controller.type) {
    return
  }
  let warnMsg = ''
  if (type === 'onHideToast' && controller.type !== 'onShowToast') {
    warnMsg = t('uni.showToast.unpaired')
  } else if (type === 'onHideLoading' && controller.type !== 'onShowLoading') {
    warnMsg = t('uni.showLoading.unpaired')
  }
  if (warnMsg) {
    return console.warn(warnMsg)
  }
  controller.type = ''
  controller.pageId = undefined
  clearTimeout(controller.timeoutId)
  clearTimeout(controller.showTimerId)
  const token = ++controller.token
  setTimeout(() => {
    // 与 show 对应延迟10ms，避免快速调用 show，hide 导致无法关闭
    if (token === controller.token) {
      controller.state!.visible = false
    }
  }, 10)
}

onPageUnload((pageId) => {
  if (pageToast.pageId === pageId && pageToast.type === 'onShowToast') {
    hidePopup('onHideToast', pageToast)
  }
})
