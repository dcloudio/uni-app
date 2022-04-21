if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value
      })
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason
      })
    })
  }
}
if (uni.base64ToArrayBuffer) {
  ArrayBuffer = uni.base64ToArrayBuffer('').constructor
}
