import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

function isRequestSuccessResult(
  res: WechatMiniprogram.GeneralCallbackResult
): res is WechatMiniprogram.RequestSuccessCallbackResult {
  return 'data' in res
}

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
      if (fromArgs.complete) {
        toArgs.complete = (res: WechatMiniprogram.GeneralCallbackResult) => {
          if (isRequestSuccessResult(res)) {
            res.data = createUTSJSONObjectIfNeed(res.data)
            fromArgs.complete!(res)
          } else {
            fromArgs.complete!(res)
          }
        }
      }
    }
  },
}
