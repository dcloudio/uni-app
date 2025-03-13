import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const request: MPProtocol = {
  returnValue: (res) => {
    const { data } = res
    res.data = createUTSJSONObjectIfNeed(data)
    return res
  },
}
