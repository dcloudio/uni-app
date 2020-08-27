import {
  invoke
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
  callback = callbackId
}
