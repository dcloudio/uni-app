import { getCurrentPageId } from '@dcloudio/uni-core'
import {
  API_GET_SELECTED_TEXT_RANGE,
  API_TYPE_GET_SELECTED_TEXT_RANGE,
} from '../../protocols/keyboard/getSelectedTextRange'
import { defineAsyncApi } from '../../helpers/api'

export const getSelectedTextRange =
  defineAsyncApi<API_TYPE_GET_SELECTED_TEXT_RANGE>(
    API_GET_SELECTED_TEXT_RANGE,
    (_, { resolve, reject }) => {
      UniServiceJSBridge.invokeViewMethod<
        {},
        UniApp.GetSelectedTextRangeSuccessCallbackResult
      >(API_GET_SELECTED_TEXT_RANGE, {}, getCurrentPageId(), (res) => {
        if (
          typeof res.end === 'undefined' &&
          typeof res.start === 'undefined'
        ) {
          reject('no focused')
        } else {
          resolve(res)
        }
      })
    }
  )
