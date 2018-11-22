export function getImageInfo ({
  src
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  const img = new Image()
  img.onload = function () {
    invoke(callbackId, {
      errMsg: 'getImageInfo:ok',
      width: img.naturalWidth,
      height: img.naturalHeight
    })
  }
  img.onerror = function (e) {
    invoke(callbackId, {
      errMsg: 'getImageInfo:fail'
    })
  }
  img.src = src
}
