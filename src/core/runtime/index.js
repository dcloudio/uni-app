import {
  promisify
} from '../helpers/promise'

import {
  upx2px
} from '../service/api/upx2px'

import todoApi from './todo'

import * as baseApi from './base'

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
      if (baseApi[name]) {
        return promisify(name, baseApi[name])
      }
      if (todoApi[name]) {
        return promisify(name, todoApi[name])
      }
      if (!__GLOBAL__.hasOwnProperty(name)) {
        return
      }
      return promisify(name, __GLOBAL__[name])
    }
  })
} else {
  uni.upx2px = upx2px

  Object.keys(todoApi).forEach(name => {
    uni[name] = promisify(name, todoApi[name])
  })

  Object.keys(baseApi).forEach(name => {
    uni[name] = promisify(name, todoApi[name])
  })

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
