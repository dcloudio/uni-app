import {
  publish
} from '../../bridge'

let listener

export function enableAccelerometer ({
  enable
}) {
  return enable ? startAccelerometer() : stopAccelerometer()
}

/**
 * 开始监听加速度数据
 */
function startAccelerometer () {
  if (window.DeviceMotionEvent) {
    listener = function (event) {
      const acceleration = event.acceleration || event.accelerationIncludingGravity
      publish('onAccelerometerChange', {
        x: acceleration.x || 0,
        y: acceleration.y || 0,
        z: acceleration.z || 0,
        errMsg: 'onAccelerometerChange:ok'
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
function stopAccelerometer () {
  if (listener) {
    window.removeEventListener('devicemotion', listener, false)
    listener = null
  }
  return {}
}
