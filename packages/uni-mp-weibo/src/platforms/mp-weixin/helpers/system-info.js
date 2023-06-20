import { useDeviceId, addSafeAreaInsets, populateParameters } from './enhance-system-info'

export default {
  returnValue: function (result) {
    useDeviceId(result)
    addSafeAreaInsets(result)
    populateParameters(result)
  }
}
