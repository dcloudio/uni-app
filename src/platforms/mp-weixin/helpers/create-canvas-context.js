export default {
  returnValue (fromRes, toRes) {
    const measureText = fromRes.measureText
    toRes.measureText = function (text, callback) {
      const textMetrics = measureText.call(this, text)
      if (typeof callback === 'function') {
        setTimeout(() => callback(textMetrics), 0)
      }
      return textMetrics
    }
  }
}
