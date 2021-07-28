import { addSafeAreaInsets } from './addSafeAreaInsets'
import { MPProtocol } from './types'

export const getSystemInfo: MPProtocol = {
  returnValue: addSafeAreaInsets,
}
