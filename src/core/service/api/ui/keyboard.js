import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

const callbacks = []

onMethod('onKeyboardHeightChange', res => {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onKeyboardHeightChange (callbackId) {
  callbacks.push(callbackId)
}
