import { useDeviceId, getGetDeviceType, getDeviceBrand, getOSInfo } from './enhance-system-info'

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
      osVersion
    })
  }
}
