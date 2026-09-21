import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const getStorageSync = (): MPProtocol => {
  let isUTS = false

  return {
    args(fromArgs, toArgs, restArgs) {
      isUTS = restArgs[0]
    },
    returnValue(fromRes) {
      if (isUTS) {
        return createUTSJSONObjectIfNeed(fromRes)
      } else {
        return fromRes
      }
    },
  }
}
