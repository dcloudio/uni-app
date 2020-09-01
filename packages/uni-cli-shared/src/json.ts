import stripJsonComments from 'strip-json-comments'
// @ts-ignore
import { preprocess } from '../lib/preprocess'

const jsContext = {
  APP_PLUS: false,
  H5: true,
  MP_360: false,
  MP_ALIPAY: false,
  MP_BAIDU: false,
  MP_QQ: false,
  MP_TOUTIAO: false,
  MP_WEIXIN: false,
  QUICKAPP_NATIVE: false,
  QUICKAPP_WEBVIEW: false,
  MP: false,
  APP: false,
  APP_PLUS_NVUE: false,
  APP_VUE: false,
  APP_NVUE: false
}

export function parseJson(jsonStr: string, shouldPreprocess: boolean = false) {
  return JSON.parse(
    stripJsonComments(
      shouldPreprocess
        ? preprocess(jsonStr, jsContext, { type: 'js' })
        : jsonStr
    )
  )
}
