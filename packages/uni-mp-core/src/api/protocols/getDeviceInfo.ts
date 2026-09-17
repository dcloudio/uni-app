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
    let { brand, model, system = '', platform = '' } = fromRes
    let deviceType = getGetDeviceType(fromRes, model)
    let deviceBrand = getDeviceBrand(brand)
    useDeviceId()(fromRes, toRes)

    /**
     * alipay: 系统及版本，与文档不一致 (https://opendocs.alipay.com/mini/071680?pathHash=92d76c0e)
     */
    if (__PLATFORM__ === 'mp-alipay') {
      system = (system as string).split(' ')[1]
    }

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
