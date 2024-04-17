import type { MPProtocol } from './types'

export const getAppAuthorizeSetting: MPProtocol = {
  returnValue: function (fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes

    toRes.locationAccuracy = 'unsupported'
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = 'reduced'
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = 'full'
    }
  },
}
