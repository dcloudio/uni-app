import { useDeviceId, getGetDeviceType, getDeviceBrand } from './enhance-system-info'

export default {
  returnValue: function (result) {
    const { brand, model } = result
    const deviceType = getGetDeviceType(result, model)
    const deviceBrand = getDeviceBrand(brand, model)
    useDeviceId(result)

    Object.assign(result, {
      deviceType,
      deviceBrand,
      deviceModel: model
    })
  }
}
