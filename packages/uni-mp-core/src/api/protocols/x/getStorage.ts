import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

function isGetStorageSuccessResult(
  res: WechatMiniprogram.GeneralCallbackResult
): res is WechatMiniprogram.GetStorageSuccessCallbackResult {
  return 'data' in res
}

export const getStorage: MPProtocol = {
  args(
    fromArgs: UniApp.GetStorageOptions & { isUTS: boolean },
    toArgs: WechatMiniprogram.GetStorageOption
  ) {
    if (fromArgs.isUTS) {
      if (fromArgs.success) {
        toArgs.success = (res) => {
          res.data = createUTSJSONObjectIfNeed(res.data)
          fromArgs.success!(res)
        }
      }
      if (fromArgs.complete) {
        toArgs.complete = (res: WechatMiniprogram.GeneralCallbackResult) => {
          if (isGetStorageSuccessResult(res)) {
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
