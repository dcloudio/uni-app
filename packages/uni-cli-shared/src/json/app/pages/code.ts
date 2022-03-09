export const polyfillCode = `
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
if(uni&&uni.base64ToArrayBuffer){
  ArrayBuffer = uni.base64ToArrayBuffer('').constructor
}
`
export const restoreGlobalCode = `
if(uni.restoreGlobal){
  uni.restoreGlobal(Vue,weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
`

const GLOBALS = [
  'global',
  'window',
  'document',
  'frames',
  'self',
  'location',
  'navigator',
  'localStorage',
  'history',
  'Caches',
  'screen',
  'alert',
  'confirm',
  'prompt',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'webkit',
  'print',
]

export const globalCode = GLOBALS.map((g) => `${g}:u`).join(',')
