import { MPProtocol } from './types'
import { extend } from '@vue/shared'
import { addSafeAreaInsets } from './enhanceSystemInfo'

export const getWindowInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes)

    extend(toRes, {
      windowTop: 0,
      windowBottom: 0,
    })
  },
}
