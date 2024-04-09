import { extend } from '@vue/shared'
import {
  API_HIDE_LOADING,
  API_HIDE_TOAST,
  API_SHOW_LOADING,
  API_SHOW_TOAST,
  type API_TYPE_HIDE_LOADING,
  type API_TYPE_HIDE_TOAST,
  type API_TYPE_SHOW_LOADING,
  type API_TYPE_SHOW_TOAST,
  ShowLoadingOptions,
  ShowLoadingProtocol,
  ShowToastOptions,
  ShowToastProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

type Resolve = (res?: any) => void
type Reject = (errMsg?: string, errRes?: any) => void
type CallBacks = { resolve: Resolve; reject: Reject }

type ToastType = 'loading' | 'toast' | ''

let toast: PlusNativeUIWaitingObj | null
let isShowToast: boolean = false
let toastType: ToastType = ''
let timeout: ReturnType<typeof setTimeout> | null

export const showLoading = defineAsyncApi<API_TYPE_SHOW_LOADING>(
  API_SHOW_LOADING,
  (args, callbacks) =>
    _showToast(
      extend({}, args, {
        type: 'loading' as ToastType,
        icon: 'loading' as UniApp.ShowToastOptions['icon'],
      }),
      callbacks
    ),
  ShowLoadingProtocol,
  ShowLoadingOptions
)

interface _ShowToast extends UniApp.ShowToastOptions {
  type?: ToastType
  style?: PlusNativeUIWaitingStyles
}

const _showToast = (
  {
    title = '',
    icon = 'success',
    image = '',
    duration = 1500,
    mask = false,
    position,
    type = 'toast',
    style,
  }: _ShowToast,
  { resolve, reject }: CallBacks
) => {
  hide('')
  toastType = type
  if (['top', 'center', 'bottom'].includes(String(position))) {
    // 仅可以关闭 richtext 类型，但 iOS 部分情况换行显示有问题
    plus.nativeUI.toast(title, {
      verticalAlign: position,
    })
    isShowToast = true
  } else {
    if (icon && !~['success', 'loading', 'error', 'none'].indexOf(icon)) {
      icon = 'success'
    }
    const waitingOptions: PlusNativeUIWaitingStyles = {
      modal: mask,
      back: 'transmit',
      padding: '10px',
      size: '16px', // 固定字体大小
    }
    if (!image && (!icon || icon === 'none')) {
      // 无图
      // waitingOptions.width = '120px'
      // waitingOptions.height = '40px'
      waitingOptions.loading = {
        display: 'none',
      }
    } else {
      waitingOptions.width = '140px'
      waitingOptions.height = '112px'
    }
    if (image) {
      waitingOptions.loading = {
        display: 'block',
        height: '55px',
        icon: image,
        interval: duration,
      }
    } else {
      if (['success', 'error'].indexOf(icon) !== -1) {
        waitingOptions.loading = {
          display: 'block',
          height: '55px',
          icon:
            icon === 'success' ? '__uniappsuccess.png' : '__uniapperror.png',
          interval: duration,
        }
      }
    }

    try {
      toast = plus.nativeUI.showWaiting(title, extend(waitingOptions, style))
    } catch (error) {
      reject(`${error}`)
    }
  }

  if (toastType === 'toast')
    timeout = setTimeout(() => {
      hide('')
    }, duration)
  return resolve()
}
export const showToast = defineAsyncApi<API_TYPE_SHOW_TOAST>(
  API_SHOW_TOAST,
  _showToast,
  ShowToastProtocol,
  ShowToastOptions
)

export const hideToast = defineAsyncApi<API_TYPE_HIDE_TOAST>(
  API_HIDE_TOAST,
  (_, callbacks) => hide('toast', callbacks)
)

export const hideLoading = defineAsyncApi<API_TYPE_HIDE_LOADING>(
  API_HIDE_LOADING,
  (_, callbacks) => hide('loading', callbacks)
)

function hide(type: ToastType = 'toast', callbacks?: CallBacks) {
  if (type && type !== toastType) {
    // 应该不需要失败回调，在页面后退时，会主动 hideToast 和 hideLoading，如果 reject 会出异常。
    return callbacks && callbacks.resolve()
  }
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  if (isShowToast) {
    plus.nativeUI.closeToast()
  } else if (toast && toast.close) {
    toast.close()
  }
  toast = null
  isShowToast = false
  toastType = ''
  return callbacks && callbacks.resolve()
}
