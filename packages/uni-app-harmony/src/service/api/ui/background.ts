import type { ComponentPublicInstance } from 'vue'
import {
  API_SET_BACKGROUND_COLOR,
  API_SET_BACKGROUND_TEXT_STYLE,
  type API_TYPE_SET_BACKGROUND_COLOR,
  type API_TYPE_SET_BACKGROUND_TEXT_STYLE,
  SetBackgroundColorProtocol,
  SetBackgroundTextStyleProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { isString } from '@vue/shared'
import { getWebview } from '@dcloudio/uni-app-plus/src/service/utils'

interface SetBackgroundColorOptions extends UniApp.SetBackgroundColorOptions {
  __page__?: ComponentPublicInstance
}

export const setBackgroundColor = defineAsyncApi<API_TYPE_SET_BACKGROUND_COLOR>(
  API_SET_BACKGROUND_COLOR,
  (
    { __page__, backgroundColor }: SetBackgroundColorOptions,
    { resolve, reject }
  ) => {
    if (isString(backgroundColor)) {
      const webview = getWebview(__page__)
      if (webview) {
        webview.setStyle({
          background: backgroundColor,
        })
        resolve()
      } else {
        reject()
      }
    } else {
      reject('options backgroundColor must be a string')
    }
  },
  SetBackgroundColorProtocol
)

interface SetBackgroundTextStyleOptions
  extends UniApp.SetBackgroundTextStyleOptions {
  __page__?: ComponentPublicInstance
}

export const setBackgroundTextStyle =
  defineAsyncApi<API_TYPE_SET_BACKGROUND_TEXT_STYLE>(
    API_SET_BACKGROUND_TEXT_STYLE,
    (
      { __page__, textStyle }: SetBackgroundTextStyleOptions,
      { resolve, reject }
    ) => {
      if (isString(textStyle)) {
        const webview = getWebview(__page__)
        if (webview) {
          webview.setStyle({
            // @ts-expect-error
            backgroundTextStyle: textStyle,
          })
          resolve()
        } else {
          reject()
        }
      } else {
        reject('options textStyle must be a string')
      }
    },
    SetBackgroundTextStyleProtocol
  )
