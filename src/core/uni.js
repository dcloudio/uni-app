import {
  promisify
} from './helpers/promise'

import {
  upx2px
} from './service/api/upx2px'

import * as api from 'uni-platform/service/api/index.js'

let uni = {}

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get (target, name) {
      if (name === 'upx2px') {
        return upx2px
      }
      if (api[name]) {
        return promisify(name, api[name])
      }
      if (!__GLOBAL__.hasOwnProperty(name)) {
        return
      }
      return promisify(name, __GLOBAL__[name])
    }
  })
} else {
  uni.upx2px = upx2px

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name])
  })

  Object.keys(__GLOBAL__).forEach(name => {
    if (__GLOBAL__.hasOwnProperty(name)) {
      uni[name] = promisify(name, __GLOBAL__[name])
    }
  })
}

export default uni
