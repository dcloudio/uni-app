import {
  callApiSync
} from '../util'

import {
  invoke
} from '../../bridge'

let waiting
let waitingTimeout
let toast = false
let toastTimeout

export function showLoading (args) {
  return callApiSync(showToast, args, 'showToast', 'showLoading')
}

export function hideLoading () {
  return callApiSync(hideToast, Object.create(null), 'hideToast', 'hideLoading')
}

export function showToast ({
  title = '',
  icon = 'success',
  image = '',
  duration = 1500,
  mask = false,
  position = ''
} = {}) {
  if (position) {
    if (toast) {
      toastTimeout && clearTimeout(toastTimeout)
      plus.nativeUI.closeToast()
    }
    if (waiting) {
      waitingTimeout && clearTimeout(waitingTimeout)
      waiting.close()
    }
    if (~['top', 'center', 'bottom'].indexOf(position)) {
      const richText = `<span>${title}</span>`
      plus.nativeUI.toast(richText, {
        verticalAlign: position,
        type: 'richtext'
      })
      toast = true
      toastTimeout = setTimeout(() => {
        hideToast()
      }, 2000)
      return {
        errMsg: 'showToast:ok'
      }
    }
    console.warn('uni.showToast 传入的 "position" 值 "' + position + '" 无效')
  }

  if (duration) {
    if (waiting) {
      waitingTimeout && clearTimeout(waitingTimeout)
      waiting.close()
    }
    if (toast) {
      toastTimeout && clearTimeout(toastTimeout)
      plus.nativeUI.closeToast()
    }
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

    waiting = plus.nativeUI.showWaiting(title, waitingOptions)
    waitingTimeout = setTimeout(() => {
      hideToast()
    }, duration)
  }
  return {
    errMsg: 'showToast:ok'
  }
}

export function hideToast () {
  if (toast) {
    toastTimeout && clearTimeout(toastTimeout)
    plus.nativeUI.closeToast()
    toast = false
  }
  if (waiting) {
    waitingTimeout && clearTimeout(waitingTimeout)
    waiting.close()
    waiting = null
    waitingTimeout = null
  }
  return {
    errMsg: 'hideToast:ok'
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
