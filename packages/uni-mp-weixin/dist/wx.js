const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function isFn(fn) {
  return typeof fn === 'function'
}

const objectKeys = [
  'env',
  'error',
  'version',
  'lanDebug',
  'cloud',
  'serviceMarket',
  'router',
  'worklet'
]
const oldWx = globalThis[['w', 'x'].join('')]

function initWx() {
  const WxProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key]
      }
      if (objectKeys.indexOf(key) > -1 || isFn(oldWx[key])) {
        return oldWx[key]
      }
    }
  }
  return new Proxy({}, WxProxyHandlers)
}
const wxProxy = initWx()
globalThis[['w', 'x'].join('')] = wxProxy
export default wxProxy
