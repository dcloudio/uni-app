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
  '__webpack_require_UNI_MP_PLUGIN__',
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
  const newWx: Record<string, any> = {}
  for (const key in __GLOBAL__) {
    if (isWxKey(key)) {
      // TODO wrapper function
      newWx[key] = __GLOBAL__[key]
    }
  }
  if (
    typeof globalThis !== 'undefined' &&
    typeof requireMiniProgram === 'undefined'
  ) {
    ;(globalThis as any).wx = newWx
    // #if _X_
    // 不同平台globalThis表现可能有差异，暂时在这里设置__uniX
    ;(globalThis as any).__uniX = true
    // #endif
  }
  return newWx
}
