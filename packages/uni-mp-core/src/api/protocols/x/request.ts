import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const request: MPProtocol = {
  args(
    fromArgs: UniApp.RequestOptions & { isUTS: boolean },
    toArgs: WechatMiniprogram.RequestOption
  ) {
    if (fromArgs.isUTS) {
      if (fromArgs.success) {
        toArgs.success = (res) => {
          res.data = createUTSJSONObjectIfNeed(res.data)
          fromArgs.success!(res as UniApp.RequestSuccessCallbackResult)
        }
      }
    }
  },
}
