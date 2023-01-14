const objectKeys = [
  'qy',
  'env',
  'error',
  'version',
  'lanDebug',
  'cloud',
  'serviceMarket',
  'router',
  'worklet',
]

function isWxKey(key: string) {
  return objectKeys.indexOf(key) > -1 || typeof __GLOBAL__[key] === 'function'
}

export function initWx() {
  const newWx: Record<string, any> = {}
  for (const key in __GLOBAL__) {
    if (isWxKey(key)) {
      // TODO wrapper function
      newWx[key] = __GLOBAL__[key]
    }
  }
  return newWx
}
