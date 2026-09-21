import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const getStorageSync = (): MPProtocol => {
  let isUTS = false

  return {
    args(fromArgs) {
      isUTS = fromArgs[1]
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
