import { MPProtocol } from './types'
import {
  getGetDeviceType,
  getDeviceBrand,
  useDeviceId,
} from './enhanceSystemInfo'
import { extend } from '@vue/shared'

export const getDeviceInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes
    let deviceType = getGetDeviceType(fromRes, model)
    let deviceBrand = getDeviceBrand(brand, model)
    useDeviceId()(fromRes, toRes)

    extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
    })
  },
}
