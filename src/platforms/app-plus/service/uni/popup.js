let waiting
let waitingTimeout
let toast = false
let toastTimeout
// 此处设计不对
export default function initPopup (on, {
  plus
}) {
  on('onShowToast', showToast)
  on('onHideToast', hideToast)
  on('onShowLoading', showToast)
  on('onHideLoading', hideToast)
  on('onShowModal', showModal)
  on('onShowActionSheet', showActionSheet)

  function showToast ({
    title = '',
    icon = 'success',
    image = '',
    duration = 1500,
    mask = false,
    position = ''
  }) {
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
        let richText = `<span>${title}</span>`
        plus.nativeUI.toast(richText, {
          verticalAlign: position,
          type: 'richtext'
        })
        toast = true
        toastTimeout = setTimeout(() => {
          hideToast()
        }, 2000)
        return
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
  }

  function hideToast () {
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
  }

  function showModal ({
    title = '',
    content = '',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#000000',
    confirmText = '确定',
    confirmColor = '#3CC51F'
  }, callback) {
    plus.nativeUI.confirm(content, (e) => {
      if (showCancel) {
        callback(e.index === 1 ? 'confirm' : 'cancel')
      } else {
        callback(e.index === 0 ? 'confirm' : 'cancel')
      }
    }, title, showCancel ? [cancelText, confirmText] : [confirmText])
  }

  function showActionSheet ({
    itemList = [],
    itemColor = '#000000',
    title = ''
  }, callback) {
    const options = {
      buttons: itemList.map(item => ({
        title: item
      }))
    }
    if (title) {
      options.title = title
    }

    if (plus.os.name === 'iOS') {
      options.cancel = '取消'
    }

    plus.nativeUI.actionSheet(options, (e) => {
      if (e.index > 0) {
        callback(e.index - 1)
      } else {
        callback(-1)
      }
    })
  }
}
