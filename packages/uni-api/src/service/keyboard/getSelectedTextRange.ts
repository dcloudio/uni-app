import {
  createCallbacks,
  getCurrentPageId,
  ServiceJSBridge,
} from '@dcloudio/uni-core'
import {
  API_GET_SELECTED_TEXT_RANGE,
  API_TYPE_GET_SELECTED_TEXT_RANGE,
} from '../../protocols/keyboard/getSelectedTextRange'
import { defineAsyncApi } from '../../helpers/api'

const getSelectedTextRangeEventCallbacks = createCallbacks(
  'getSelectedTextRangeEvent'
)
ServiceJSBridge.subscribe &&
  ServiceJSBridge.subscribe(
    'onGetSelectedTextRange',
    ({ callbackId, data }: { callbackId: number; data: Data }) => {
      const callback = getSelectedTextRangeEventCallbacks.pop(callbackId)
      if (callback) {
        callback(data)
      }
    }
  )

export const getSelectedTextRange =
  defineAsyncApi<API_TYPE_GET_SELECTED_TEXT_RANGE>(
    API_GET_SELECTED_TEXT_RANGE,
    (_, { resolve, reject }) => {
      const pageId = getCurrentPageId()
      ServiceJSBridge.publishHandler &&
        ServiceJSBridge.publishHandler(
          'getSelectedTextRange',
          {
            pageId,
            callbackId: getSelectedTextRangeEventCallbacks.push(function (
              res: UniApp.GetSelectedTextRangeSuccessCallbackResult
            ) {
              if (
                typeof res.end === 'undefined' &&
                typeof res.start === 'undefined'
              ) {
                reject('no focused')
              } else {
                resolve(res)
              }
            }),
          },
          pageId
        )
    }
  )
