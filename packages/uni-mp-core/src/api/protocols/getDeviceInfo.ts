import type { MPProtocol } from './types'
import {
  getDeviceBrand,
  getGetDeviceType,
  useDeviceId,
} from './enhanceSystemInfo'
import { extend } from '@vue/shared'
import { sortObject } from '@dcloudio/uni-shared'

export const getDeviceInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes
    let deviceType = getGetDeviceType(fromRes, model)
    let deviceBrand = getDeviceBrand(brand)
    useDeviceId()(fromRes, toRes)

    toRes = sortObject(
      extend(toRes, {
        deviceType,
        deviceBrand,
        deviceModel: model,
      })
    )
  },
}
