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
  '__webpack_require_UNI_MP_PLUGIN__'
]
const singlePageDisableKey = [
  'lanDebug',
  'router',
  'worklet'
]
const target = typeof globalThis !== 'undefined' ? globalThis : (function () {
  return this
})()

const key = ['w', 'x'].join('')
const oldWx = target[key]
const launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null

function isWxKey (key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function'
}

function initWx () {
  const newWx = {}
  for (const key in oldWx) {
    if (isWxKey(key)) {
      // TODO wrapper function
      newWx[key] = oldWx[key]
    }
  }
  return newWx
}
target[key] = initWx()
export default target[key]
