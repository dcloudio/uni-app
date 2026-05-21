import { useDeviceId, getGetDeviceType, getDeviceBrand, getOSInfo, getPlatform } from './enhance-system-info'

/**
 * 目前仅 weixin、toutiao/douyin 支持 deviceInfo。
 * system: 操作系统及版本
 */
export default {
  returnValue: function (result) {
    const { brand, model, system = '', platform = '' } = result
    const deviceType = getGetDeviceType(result, model)
    const deviceBrand = getDeviceBrand(brand)
    useDeviceId(result)

    const { osName, osVersion } = getOSInfo(system, platform)

    result = Object.assign(result, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion,
      platform: getPlatform(platform)
    })
  }
}
