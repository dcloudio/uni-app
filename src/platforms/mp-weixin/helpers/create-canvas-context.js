export default {
  returnValue (fromRes, toRes) {
    const measureText = fromRes.measureText
    toRes.measureText = function (width, callback) {
      const textMetrics = measureText.call(this, width)
      if (typeof callback === 'function') {
        setTimeout(() => callback(textMetrics), 0)
      }
      return textMetrics
    }
  }
}
