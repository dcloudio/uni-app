import type { MPProtocol } from './types'
import { extend } from '@vue/shared'
import { addSafeAreaInsets } from './enhanceSystemInfo'
import { sortObject } from '@dcloudio/uni-shared'

export const getWindowInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes)

    toRes = sortObject(
      extend(toRes, {
        windowTop: 0,
        windowBottom: 0,
      })
    )
  },
}
