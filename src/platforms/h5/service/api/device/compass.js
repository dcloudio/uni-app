const callbacks = []
var listener
/**
 * 监听罗盘数据
 * @param {*} callbackId
 */
export function onCompassChange (callbackId) {
  callbacks.push(callbackId)
  if (!listener) {
    startCompass()
  }
}
/**
 * 开始监听罗盘数据
 */
export function startCompass () {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (window.DeviceOrientationEvent) {
    listener = function (event) {
      var direction = 360 - event.alpha
      callbacks.forEach(callbackId => {
        invoke(callbackId, {
          errMsg: 'onCompassChange:ok',
          direction: direction || 0
        })
      })
    }
    window.addEventListener('deviceorientation', listener, false)
    return {}
  } else {
    throw new Error('device nonsupport deviceorientation')
  }
}
/**
 * 停止监听罗盘数据
 */
export function stopCompass () {
  if (listener) {
    window.removeEventListener('deviceorientation', listener, false)
    listener = null
  }
  return {}
}
