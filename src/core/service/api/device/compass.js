import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

const callbacks = []

onMethod('onCompassChange', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

let isEnable = false
/**
 * 监听加速度
 * @param {*} callbackId
 */
export function onCompassChange (callbackId) {
  // TODO 当没有 start 时，添加 on 需要主动 start?
  callbacks.push(callbackId)
  if (!isEnable) {
    startCompass()
  }
}

export function startCompass ({
  interval // TODO
} = {}) {
  if (isEnable) {
    return
  }
  isEnable = true
  return invokeMethod('enableCompass', {
    enable: true
  })
}

export function stopCompass () {
  isEnable = false
  return invokeMethod('enableCompass', {
    enable: false
  })
}
