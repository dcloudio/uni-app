import createCallbacks from 'uni-helpers/callbacks'
import {
  getCurrentPageId
} from '../../platform'
import {
  invoke
} from '../../bridge'

const getSelectedTextRangeEventCallbacks = createCallbacks('getSelectedTextRangeEvent')

UniServiceJSBridge.subscribe('onGetSelectedTextRange', ({
  callbackId,
  data
}) => {
  console.log('onGetSelectedTextRange')
  const callback = getSelectedTextRangeEventCallbacks.pop(callbackId)
  if (callback) {
    callback(data)
  }
})

export function getSelectedTextRange (_, callbackId) {
  const pageId = getCurrentPageId()
  UniServiceJSBridge.publishHandler('getSelectedTextRange', {
    pageId,
    callbackId: getSelectedTextRangeEventCallbacks.push(function (res) {
      invoke(callbackId, res)
    })
  }, pageId)
}
