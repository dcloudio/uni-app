let id = 0
const callbacks = {}

function warp (fn) {
  return function (options = {}) {
    const callbackId = String(id++)
    callbacks[callbackId] = {
      success: options.success,
      fail: options.fail,
      complete: options.complete
    }
    const data = Object.assign({}, options)
    delete data.success
    delete data.fail
    delete data.complete
    const res = fn.bind(this)(data, callbackId)
    if (res) {
      invoke(callbackId, res)
    }
  }
}

function invoke (callbackId, res) {
  const callback = callbacks[callbackId] || {}
  delete callbacks[callbackId]
  const errMsg = res.errMsg || ''
  if (new RegExp('\\:\\s*fail').test(errMsg)) {
    callback.fail && callback.fail(res)
  } else {
    callback.success && callback.success(res)
  }
  callback.complete && callback.complete(res)
}

export const callback = {
  warp,
  invoke
}
