import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const getStorage: MPProtocol = {
  returnValue: (res) => {
    return createUTSJSONObjectIfNeed(res)
  },
}
