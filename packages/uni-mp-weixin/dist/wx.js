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

const oldWx = globalThis[['w', 'x'].join('')]

function isWxKey(key) {
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function'
}

function initWx() {
  const newWx = {}
    for (const key in oldWx) {
      if (isWxKey(key)) {
        // TODO wrapper function
        newWx[key] = oldWx[key]
      }
    }
    return newWx
}
const wxProxy = initWx()
globalThis[['w', 'x'].join('')] = wxProxy
export default wxProxy
