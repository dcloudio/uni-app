import { useDeviceId, getGetDeviceType, getDeviceBrand, getOSInfo } from './enhance-system-info'
import { sortObject } from 'uni-shared'

export default {
  returnValue: function (result) {
    const { brand, model, system = '', platform = '' } = result
    const deviceType = getGetDeviceType(result, model)
    const deviceBrand = getDeviceBrand(brand)
    useDeviceId(result)

    const { osName, osVersion } = getOSInfo(system, platform)

    result = sortObject(Object.assign(result, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }))
  }
}
