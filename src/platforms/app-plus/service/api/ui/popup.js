import {
  callApiSync
} from '../util'

import {
  invoke
} from '../../bridge'

let toast
let toastType
let timeout

export function showLoading (args) {
  return callApiSync(showToast, Object.assign({}, args, { type: 'loading' }), 'showToast', 'showLoading')
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
  type = 'toast'
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
    if (icon && !~['success', 'loading', 'none'].indexOf(icon)) {
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
      if (icon === 'success') {
        waitingOptions.loading = {
          display: 'block',
          height: '55px',
          icon: '__uniappsuccess.png',
          interval: duration
        }
      }
    }

    toast = plus.nativeUI.showWaiting(title, waitingOptions)
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
  cancelText = '取消',
  cancelColor = '#000000',
  confirmText = '确定',
  confirmColor = '#3CC51F'
} = {}, callbackId) {
  content = content || ' '
  plus.nativeUI.confirm(content, (e) => {
    if (showCancel) {
      invoke(callbackId, {
        errMsg: 'showModal:ok',
        confirm: e.index === 1,
        cancel: e.index === 0 || e.index === -1
      })
    } else {
      invoke(callbackId, {
        errMsg: 'showModal:ok',
        confirm: e.index === 0,
        cancel: false
      })
    }
  }, title, showCancel ? [cancelText, confirmText] : [confirmText])
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

  if (plus.os.name === 'iOS') {
    options.cancel = ''
  }

  plus.nativeUI.actionSheet(Object.assign(options, { popover }), (e) => {
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
