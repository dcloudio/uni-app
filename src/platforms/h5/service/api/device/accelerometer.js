const callbacks = []
var listener
/**
 * 监听加速度
 * @param {*} callbackId
 */
export function onAccelerometerChange (callbackId) {
  callbacks.push(callbackId)
  if (!listener) {
    startAccelerometer()
  }
}
/**
 * 开始监听加速度数据
 */
export function startAccelerometer () {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (window.DeviceMotionEvent) {
    listener = function (event) {
      callbacks.forEach(callbackId => {
        const acceleration = event.acceleration || event.accelerationIncludingGravity
        invoke(callbackId, {
          x: acceleration.x || 0,
          y: acceleration.y || 0,
          z: acceleration.z || 0,
          errMsg: 'onAccelerometerChange:ok'
        })
      })
    }
    window.addEventListener('devicemotion', listener, false)
    return {}
  } else {
    throw new Error('device nonsupport devicemotion')
  }
}
/**
 * 停止监听加速度数据
 */
export function stopAccelerometer () {
  if (listener) {
    window.removeEventListener('devicemotion', listener, false)
    listener = null
  }
  return {}
}
