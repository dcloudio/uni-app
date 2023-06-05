//#region Functions
import { reactive, nextTick, watch, effectScope } from 'vue'
import { extend } from '@vue/shared'
import {
  defineAsyncApi,
  ShowToastOptions,
  ShowToastProtocol,
  ShowLoadingProtocol,
  ShowLoadingOptions,
  API_SHOW_TOAST,
  API_SHOW_LOADING,
  API_HIDE_TOAST,
  API_HIDE_LOADING,
} from '@dcloudio/uni-api'
import Toast, { ToastProps } from './toast'
import { ensureRoot, createRootApp } from './utils'
import { useI18n } from '@dcloudio/uni-core'
//#endregion

//#region Type
import type {
  API_TYPE_SHOW_LOADING,
  API_TYPE_HIDE_TOAST,
  API_TYPE_HIDE_LOADING,
  API_TYPE_SHOW_TOAST,
} from '@dcloudio/uni-api'
//#endregion

let showToastState: ToastProps
let showType: 'onShowToast' | 'onShowLoading' | '' = ''
let timeoutId: ReturnType<typeof setTimeout>

const scope = /*#__PURE__*/ effectScope()

function watchVisible() {
  scope.run(() => {
    watch(
      [() => showToastState.visible, () => showToastState.duration],
      ([visible, duration]) => {
        if (visible) {
          timeoutId && clearTimeout(timeoutId)
          if (showType === 'onShowLoading') return
          timeoutId = setTimeout(() => {
            hidePopup('onHideToast')
          }, duration)
        } else {
          timeoutId && clearTimeout(timeoutId)
        }
      }
    )
  })
}

function createToast(args: ToastProps) {
  if (!showToastState) {
    showToastState = reactive(extend(args, { visible: false }))
    // 异步执行，避免干扰 getCurrentInstance
    nextTick(() => {
      watchVisible()
      UniServiceJSBridge.on('onHidePopup', () => hidePopup('onHidePopup'))
      createRootApp(Toast, showToastState, () => {}).mount(ensureRoot('u-a-t'))
    })
  } else {
    extend(showToastState, args)
  }

  setTimeout(() => {
    // 延迟一下 show 可解决窗口打开前调用 showToast 在 onHidePopup 之后触发
    showToastState.visible = true
  }, 10)
}

export const showToast = defineAsyncApi<API_TYPE_SHOW_TOAST>(
  API_SHOW_TOAST,
  (args, { resolve, reject }) => {
    createToast(args as ToastProps)
    showType = 'onShowToast'
    resolve()
  },
  ShowToastProtocol,
  ShowToastOptions
)

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
    createToast(args as ToastProps)
    showType = 'onShowLoading'
    resolve()
  },
  ShowLoadingProtocol,
  ShowLoadingOptions
)

export const hideToast = defineAsyncApi<API_TYPE_HIDE_TOAST>(
  API_HIDE_TOAST,
  (args, { resolve, reject }) => {
    hidePopup('onHideToast')
    resolve()
  }
)

export const hideLoading = defineAsyncApi<API_TYPE_HIDE_LOADING>(
  API_HIDE_LOADING,
  (args, { resolve, reject }) => {
    hidePopup('onHideLoading')
    resolve()
  }
)

function hidePopup(type: 'onHideToast' | 'onHideLoading' | 'onHidePopup') {
  const { t } = useI18n()
  if (!showType) {
    return
  }
  let warnMsg = ''
  if (type === 'onHideToast' && showType !== 'onShowToast') {
    warnMsg = t('uni.showToast.unpaired')
  } else if (type === 'onHideLoading' && showType !== 'onShowLoading') {
    warnMsg = t('uni.showLoading.unpaired')
  }
  if (warnMsg) {
    return console.warn(warnMsg)
  }
  showType = ''
  setTimeout(() => {
    // 与 show 对应延迟10ms，避免快速调用 show，hide 导致无法关闭
    showToastState.visible = false
  }, 10)
}
