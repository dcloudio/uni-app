import {
  invoke,
  remove
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

let callback

onMethod('onKeyboardHeightChange', res => {
  if (callback) {
    invoke(callback, res)
  }
})

export function onKeyboardHeightChange (callbackId) {
  // 与微信小程序一致仅保留最后一次监听
  remove(callback)
  callback = callbackId
}

export function offKeyboardHeightChange () {
  // 与微信小程序一致移除最后一次监听
  callback = null
}
