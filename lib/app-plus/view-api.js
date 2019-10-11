export {
  upx2px
}
  from 'uni-core/service/api/base/upx2px'

export {
  getSystemInfoSync
}
  from '../../src/platforms/h5/service/api/device/get-system-info'

export function canIUse (schema) {
  if (schema === 'css.var') {
    return window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)
  }
  return true
}
