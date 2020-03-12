import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

const callbacks = []

onMethod('onUIStyleChange', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onUIStyleChange (callbackId) {
  callbacks.push(callbackId)
}
