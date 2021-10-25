import {
  callApiSync
} from '../util'

import {
  invoke
} from '../../bridge'

import {
  t
} from 'uni-core/helpers/i18n'

let toast
let toastType
let timeout

export function showLoading (args) {
  return callApiSync(showToast, Object.assign({}, args, {
    type: 'loading'
  }), 'showToast', 'showLoading')
}

export function hideLoading () {
  return callApiSync(hide, 'loading', 'hide', 'hideLoading')
}

export function showToast ({
  title = '',
  icon = 'success',
  image = '',
  duration = 1500,
  mask = false,
  position = '',
  type = 'toast',
  style
} = {}) {
  hide(null)
  toastType = type
  if (['top', 'center', 'bottom'].includes(position)) {
    // 仅可以关闭 richtext 类型，但 iOS 部分情况换行显示有问题
    plus.nativeUI.toast(title, {
      verticalAlign: position
    })
    toast = true
  } else {
    if (icon && !~['success', 'loading', 'error', 'none'].indexOf(icon)) {
      icon = 'success'
    }
    const waitingOptions = {
      modal: mask,
      back: 'transmit',
      padding: '10px',
      size: '16px' // 固定字体大小
    }
    if (!image && (!icon || icon === 'none')) { // 无图
      //       waitingOptions.width = '120px'
      //       waitingOptions.height = '40px'
      waitingOptions.loading = {
        display: 'none'
      }
    } else { // 有图
      waitingOptions.width = '140px'
      waitingOptions.height = '112px'
    }
    if (image) {
      waitingOptions.loading = {
        display: 'block',
        height: '55px',
        icon: image,
        interval: duration
      }
    } else {
      if (['success', 'error'].indexOf(icon) !== -1) {
        waitingOptions.loading = {
          display: 'block',
          height: '55px',
          icon: icon === 'success' ? '__uniappsuccess.png' : '__uniapperror.png',
          interval: duration
        }
      }
    }

    toast = plus.nativeUI.showWaiting(title, Object.assign(waitingOptions, style))
  }

  timeout = setTimeout(() => {
    hide(null)
  }, duration)
  return {
    errMsg: 'showToast:ok'
  }
}

export function hideToast () {
  return callApiSync(hide, 'toast', 'hide', 'hideToast')
}

export function hide (type = 'toast') {
  if (type && type !== toastType) {
    return
  }
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  if (toast === true) {
    plus.nativeUI.closeToast()
  } else if (toast && toast.close) {
    toast.close()
  }
  toast = null
  toastType = null
  return {
    errMsg: 'hide:ok'
  }
}
export function showModal ({
  title = '',
  content = '',
  showCancel = true,
  cancelText,
  cancelColor,
  confirmText,
  confirmColor,
  editable = false,
  placeholderText	= ''
} = {}, callbackId) {
  const buttons = showCancel ? [cancelText, confirmText] : [confirmText]
  const tip = editable ? placeholderText : buttons

  content = content || ' '
  plus.nativeUI[editable ? 'prompt' : 'confirm'](content, (e) => {
    if (showCancel) {
      const isConfirm = e.index === 1
      const res = {
        errMsg: 'showModal:ok',
        confirm: isConfirm,
        cancel: e.index === 0 || e.index === -1
      }
      isConfirm && editable && (res.content = e.value)
      invoke(callbackId, res)
    } else {
      const res = {
        errMsg: 'showModal:ok',
        confirm: e.index === 0,
        cancel: false
      }
      editable && (res.content = e.value)
      invoke(callbackId, res)
    }
  }, title, tip, buttons)
}
export function showActionSheet ({
  itemList = [],
  itemColor = '#000000',
  title = '',
  popover
}, callbackId) {
  const options = {
    buttons: itemList.map(item => ({
      title: item,
      color: itemColor
    }))
  }
  if (title) {
    options.title = title
  }

  options.cancel = t('uni.showActionSheet.cancel')

  plus.nativeUI.actionSheet(Object.assign(options, {
    popover
  }), (e) => {
    if (e.index > 0) {
      invoke(callbackId, {
        errMsg: 'showActionSheet:ok',
        tapIndex: e.index - 1
      })
    } else {
      invoke(callbackId, {
        errMsg: 'showActionSheet:fail cancel'
      })
    }
  })
}
