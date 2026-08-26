import { useDeviceId, getGetDeviceType, getDeviceBrand, getOSInfo, getPlatform } from './enhance-system-info'

/**
 * 目前仅 weixin、toutiao/douyin 支持 deviceInfo。
 * system: 操作系统及版本
 */
export default {
  returnValue: function (result) {
    let { brand, model, system = '', platform = '' } = result
    const deviceType = getGetDeviceType(result, model)
    const deviceBrand = getDeviceBrand(brand)
    useDeviceId(result)

    /**
     * alipay: 系统及版本，与文档不一致 (https://opendocs.alipay.com/mini/071680?pathHash=92d76c0e)
     */
    if (__PLATFORM__ === 'mp-alipay') {
      system = system.split(' ')[1]
    }

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
