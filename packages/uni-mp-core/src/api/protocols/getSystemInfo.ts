import { addSafeAreaInsets } from './addSafeAreaInsets'
import { useDeviceId } from './useDeviceId'
import { MPProtocol } from './types'

export const getSystemInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes)
    useDeviceId()(fromRes, toRes)
  },
}
