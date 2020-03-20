import {
  onMethod,
  invokeMethod
} from '../../platform'

const longPressActionsCallbackId = 'longPressActionsCallback'

let longPressActions = {}

onMethod(longPressActionsCallbackId, function (res) {
  const errMsg = res.errMsg || ''
  if (new RegExp('\\:\\s*fail').test(errMsg)) {
    longPressActions.fail && longPressActions.fail(res)
  } else {
    longPressActions.success && longPressActions.success(res)
  }
  longPressActions.complete && longPressActions.complete(res)
})

export function previewImage (args = {}) {
  longPressActions = args.longPressActions || {}
  if (longPressActions.success || longPressActions.fail || longPressActions.complete) {
    longPressActions.callbackId = longPressActionsCallbackId
  }

  return invokeMethod('previewImagePlus', args)
}
