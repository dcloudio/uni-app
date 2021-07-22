var lookup = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 62, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 0, 0, 0, 0, 63, 0, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
]

function base64Decode (source, target) {
  var sourceLength = source.length
  var paddingLength = (source[sourceLength - 2] === '=' ? 2 : (source[sourceLength - 1] === '=' ? 1
    : 0))

  var tmp
  var byteIndex = 0
  var baseLength = (sourceLength - paddingLength) & 0xfffffffc

  for (var i = 0; i < baseLength; i += 4) {
    tmp = (lookup[source.charCodeAt(i)] << 18) |
      (lookup[source.charCodeAt(i + 1)] << 12) |
      (lookup[source.charCodeAt(i + 2)] << 6) |
      (lookup[source.charCodeAt(i + 3)])

    target[byteIndex++] = (tmp >> 16) & 0xFF
    target[byteIndex++] = (tmp >> 8) & 0xFF
    target[byteIndex++] = (tmp) & 0xFF
  }

  if (paddingLength === 1) {
    tmp = (lookup[source.charCodeAt(i)] << 10) |
      (lookup[source.charCodeAt(i + 1)] << 4) |
      (lookup[source.charCodeAt(i + 2)] >> 2)

    target[byteIndex++] = (tmp >> 8) & 0xFF
    target[byteIndex++] = tmp & 0xFF
  }

  if (paddingLength === 2) {
    tmp = (lookup[source.charCodeAt(i)] << 2) | (lookup[source.charCodeAt(i + 1)] >> 4)

    target[byteIndex++] = tmp & 0xFF
  }
}

export default {
  getRandomValues (arr) {
    if (!(
      arr instanceof Int8Array ||
        arr instanceof Uint8Array ||
        arr instanceof Int16Array ||
        arr instanceof Uint16Array ||
        arr instanceof Int32Array ||
        arr instanceof Uint32Array ||
        arr instanceof Uint8ClampedArray
    )) {
      throw new Error('Expected an integer array')
    }
    if (arr.byteLength > 65536) {
      throw new Error('Can only request a maximum of 65536 bytes')
    }
    var crypto = uni.requireNativePlugin('DCloud-Crypto')
    base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(arr.buffer, arr.byteOffset,
      arr.byteLength))
    return arr
  }
}
