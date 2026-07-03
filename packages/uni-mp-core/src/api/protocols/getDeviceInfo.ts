import type { MPProtocol } from './types'
import {
  getDeviceBrand,
  getGetDeviceType,
  getOSInfo,
  getPlatform,
  useDeviceId,
} from './enhanceSystemInfo'
import { extend } from '@vue/shared'

/**
 * 目前仅 weixin、toutiao/douyin 支持 deviceInfo。
 * system: 操作系统及版本
 */
export const getDeviceInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = '', platform = '' } = fromRes
    let deviceType = getGetDeviceType(fromRes, model)
    let deviceBrand = getDeviceBrand(brand)
    useDeviceId()(fromRes, toRes)

    const { osName, osVersion } = getOSInfo(system, platform)

    toRes = extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion,
      platform: getPlatform(platform),
    })
  },
}
