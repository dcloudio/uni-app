const {
  emit,
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

export function showModal (args, callbackId) {
  emit('onShowModal', args, function (type) {
    invoke(callbackId, {
      [type]: true
    })
  })
}

export function showToast (args) {
  emit('onShowToast', args)
  return {}
}

export function hideToast () {
  emit('onHideToast')
  return {}
}

export function showLoading (args) {
  emit('onShowLoading', args)
  return {}
}

export function hideLoading () {
  emit('onHideLoading')
  return {}
}

export function showActionSheet (args, callbackId) {
  emit('onShowActionSheet', args, function (tapIndex) {
    if (tapIndex === -1) {
      invoke(callbackId, {
        errMsg: 'showActionSheet:fail cancel'
      })
    } else {
      invoke(callbackId, {
        tapIndex
      })
    }
  })
}
