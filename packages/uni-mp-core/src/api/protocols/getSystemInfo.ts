import {
  useDeviceId,
  addSafeAreaInsets,
  populateParameters,
} from './enhanceSystemInfo'
import { MPProtocol } from './types'

export const getSystemInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes)
    useDeviceId()(fromRes, toRes)
    populateParameters(fromRes, toRes)
  },
}
