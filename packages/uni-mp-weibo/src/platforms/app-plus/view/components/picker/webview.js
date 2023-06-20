const PICKER_ID = '__UNIAPP_PICKER'
export const PICKER_PATH = '_www/__uniapppicker.html'

let pickerWebview = null
let pickerWebviewCreated = false

let _exists = null
let callbacks = null
export function exists (callback) {
  if (_exists !== null) {
    callback(_exists)
    return
  }
  if (callbacks) {
    callbacks.push(callback)
    return
  }
  callbacks = [callback]
  function success (exists) {
    _exists = exists
    callbacks.forEach(callback => callback(exists))
    callbacks = null
  }
  plus.io.resolveLocalFileSystemURL(PICKER_PATH, () => {
    success(true)
  }, () => {
    success(false)
  })
}

let _pickerHideCallback
export function initPicker () {
  if (pickerWebview) {
    return
  }
  pickerWebview = plus.webview.getWebviewById(PICKER_ID)
  if (pickerWebview) {
    pickerWebviewCreated = true
  } else {
    pickerWebview = plus.webview.create(PICKER_PATH, PICKER_ID, {
      popGesture: 'none',
      background: 'transparent',
      backButtonAutoControl: 'hide',
      render: 'always',
      kernel: 'WKWebview',
      bounce: 'none',
      cachemode: 'noCache'
    })
    window.__pickerCallback = function () {
      delete window.__pickerCallback
      pickerWebviewCreated = true
    }
  }
  pickerWebview.addEventListener('hide', () => {
    _pickerHideCallback && _pickerHideCallback()
    _pickerHideCallback = null
  })
}

export function showPicker (data = {}, callback) {
  data.id = plus.webview.currentWebview().id
  pickerWebview.show('fade-in')
  let res
  _pickerHideCallback = function () {
    callback(res || {
      event: 'cancel'
    })
  }
  window.__pickerCallback = function ({
    event = 'cancel',
    column,
    value = -1
  }) {
    if (event === 'created' && pickerWebview) {
      pickerWebviewCreated = true
      pickerWebview.evalJS(`showPicker(${JSON.stringify(data)})`)
      return
    }
    if (event === 'columnchange' && pickerWebview) {
      callback({
        event,
        column,
        value
      })
    }
    if (event === 'change' || event === 'cancel') {
      // 赋值为空函数避免 picker-webview 产生多余通讯报错
      window.__pickerCallback = function () { }
      res = {
        event,
        value
      }
      pickerWebview.hide('fade-out', 100)
    }
  }
  if (pickerWebviewCreated) {
    pickerWebview.evalJS(`showPicker(${JSON.stringify(data)})`)
  }
}

export function updatePicker (data) {
  if (pickerWebviewCreated) {
    pickerWebview.evalJS(`showPicker(${JSON.stringify(data)})`)
  }
}
