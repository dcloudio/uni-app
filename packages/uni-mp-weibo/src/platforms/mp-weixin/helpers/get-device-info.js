import { useDeviceId, getGetDeviceType, getDeviceBrand } from './enhance-system-info'
import { sortObject } from 'uni-shared'

export default {
  returnValue: function (result) {
    const { brand, model } = result
    const deviceType = getGetDeviceType(result, model)
    const deviceBrand = getDeviceBrand(brand)
    useDeviceId(result)

    result = sortObject(Object.assign(result, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }))
  }
}
