import { useDeviceId, getGetDeviceType, getDeviceBrand } from './enhance-system-info';

export default {
  returnValue: function (result) {
    const { brand, model } = result
    let deviceType = getGetDeviceType(result, model)
    let deviceBrand = getDeviceBrand(brand, model)
    useDeviceId(result)

    Object.assign(result, {
      deviceType,
      deviceBrand,
      deviceModel: model,
    })
  }
}
