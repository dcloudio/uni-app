import {
  addSafeAreaInsets,
  populateParameters,
  useDeviceId,
} from './enhanceSystemInfo'
import type { MPProtocol } from './types'

export const getSystemInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes)
    useDeviceId()(fromRes, toRes)
    populateParameters(fromRes, toRes)
  },
}
