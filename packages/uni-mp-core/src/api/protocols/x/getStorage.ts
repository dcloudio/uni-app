import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

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
    }
  },
}
