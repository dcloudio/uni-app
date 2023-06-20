export function requireGlobal () {
  const list = [
    'ArrayBuffer',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array'
  ]
  const object = {}
  for (let i = 0; i < list.length; i++) {
    const key = list[i]
    object[key] = global[key]
  }
  return object
}
