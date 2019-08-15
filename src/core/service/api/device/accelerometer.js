import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

const callbacks = []

onMethod('onAccelerometerChange', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

let isEnable = false
/**
 * 监听加速度
 * @param {*} callbackId
 */
export function onAccelerometerChange (callbackId) {
  // TODO 当没有 start 时，添加 on 需要主动 start?
  callbacks.push(callbackId)
  if (!isEnable) {
    startAccelerometer()
  }
}

export function startAccelerometer ({
  interval // TODO
} = {}) {
  if (isEnable) {
    return
  }
  isEnable = true
  return invokeMethod('enableAccelerometer', {
    enable: true
  })
}

export function stopAccelerometer () {
  isEnable = false
  return invokeMethod('enableAccelerometer', {
    enable: false
  })
}
