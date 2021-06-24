import { createCallbacks, getCurrentPageId } from '@dcloudio/uni-core'
import {
  API_GET_SELECTED_TEXT_RANGE,
  API_TYPE_GET_SELECTED_TEXT_RANGE,
} from '../../protocols/keyboard/getSelectedTextRange'
import { defineAsyncApi } from '../../helpers/api'
import { once } from '@dcloudio/uni-shared'

const getSelectedTextRangeEventCallbacks = createCallbacks(
  'getSelectedTextRangeEvent'
)

const onGetSelectedTextRange = /*#__PURE__*/ once(() => {
  UniServiceJSBridge.subscribe(
    'onGetSelectedTextRange',
    ({ callbackId, data }: { callbackId: number; data: Data }) => {
      const callback = getSelectedTextRangeEventCallbacks.pop(callbackId)
      if (callback) {
        callback(data)
      }
    }
  )
})

export const getSelectedTextRange =
  defineAsyncApi<API_TYPE_GET_SELECTED_TEXT_RANGE>(
    API_GET_SELECTED_TEXT_RANGE,
    (_, { resolve, reject }) => {
      onGetSelectedTextRange()
      const pageId = getCurrentPageId()
      UniServiceJSBridge.publishHandler(
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
