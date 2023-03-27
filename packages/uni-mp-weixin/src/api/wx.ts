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

const singlePageDisableKey = ['lanDebug', 'router', 'worklet']
const launchOption = __GLOBAL__.getLaunchOptionsSync
  ? __GLOBAL__.getLaunchOptionsSync()
  : null

function isWxKey(key: string) {
  if (
    launchOption &&
    launchOption.scene === 1154 &&
    singlePageDisableKey.includes(key)
  ) {
    return false
  }
  return objectKeys.indexOf(key) > -1 || typeof __GLOBAL__[key] === 'function'
}

export function initWx() {
  let global = __GLOBAL__
  if (
    typeof globalThis !== 'undefined' &&
    globalThis.__GLOBAL__ &&
    __GLOBAL__ !== globalThis.__GLOBAL__
  ) {
    global = globalThis.__GLOBAL__
  }

  const newWx: Record<string, any> = {}
  for (const key in global) {
    if (isWxKey(key)) {
      // TODO wrapper function
      newWx[key] = global[key]
    }
  }
  if (typeof globalThis !== 'undefined') {
    ;(globalThis as any).wx = newWx
  }
  return newWx
}
