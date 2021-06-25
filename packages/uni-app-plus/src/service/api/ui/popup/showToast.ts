import { extend } from '@vue/shared'
import { callApiSync } from '../../../../helpers/plus'
import {
  defineAsyncApi,
  ShowToastOptions,
  ShowToastProtocol,
  ShowLoadingProtocol,
  ShowLoadingOptions,
  API_TYPE_SHOW_TOAST,
  API_TYPE_SHOW_LOADING,
  API_TYPE_HIDE_LOADING,
  API_TYPE_HIDE_TOAST,
  API_SHOW_TOAST,
  API_SHOW_LOADING,
  API_HIDE_TOAST,
  API_HIDE_LOADING,
} from '@dcloudio/uni-api'

type ToastType = 'loading' | 'toast' | ''

let toast: PlusNativeUIWaitingObj | null
let isShowToast: boolean = false
let toastType: ToastType = ''
let timeout: number | null

export const showLoading = defineAsyncApi<API_TYPE_SHOW_LOADING>(
  API_SHOW_LOADING,
  (args, { resolve, reject }) => {
    callApiSync<typeof showToast>(
      showToast,
      extend({}, args, {
        type: 'loading',
      }),
      resolve,
      reject
    )
  },
  ShowLoadingProtocol,
  ShowLoadingOptions
)

export const hideLoading = defineAsyncApi<API_TYPE_HIDE_LOADING>(
  API_HIDE_LOADING,
  (_, { resolve, reject }) => {
    callApiSync<typeof hide>(hide, 'loading', resolve, reject)
  }
)

export const showToast = defineAsyncApi<API_TYPE_SHOW_TOAST>(
  API_SHOW_TOAST,
  (
    {
      title = '',
      icon = 'success',
      image = '',
      duration = 1500,
      mask = false,
      position,
      // @ts-ignore ToastType
      type = 'toast',
      // @ts-ignore PlusNativeUIWaitingStyles
      style,
    },
    { resolve, reject }
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

    timeout = setTimeout(() => {
      hide('')
    }, duration)
    return resolve()
  },
  ShowToastProtocol,
  ShowToastOptions
)

export const hideToast = defineAsyncApi<API_TYPE_HIDE_TOAST>(
  API_HIDE_TOAST,
  (_, { resolve, reject }) => {
    callApiSync<typeof hide>(hide, 'toast', resolve, reject)
  }
)

export function hide(type: string = 'toast') {
  if (type && type !== toastType) {
    return
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
  return {
    errMsg: 'hide:ok',
  }
}
