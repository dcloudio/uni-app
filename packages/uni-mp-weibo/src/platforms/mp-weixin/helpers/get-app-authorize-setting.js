export default {
  returnValue: function (result) {
    const { locationReducedAccuracy } = result

    result.locationAccuracy = 'unsupported'
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced'
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full'
    }
  }
}
