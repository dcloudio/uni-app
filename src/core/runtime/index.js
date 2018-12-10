import {
  hasOwn
} from 'uni-shared'

import {
  promisify
} from '../helpers/promise'

import {
  upx2px
} from '../service/api/upx2px'

import wrapper from './wrapper'

import todoApi from './todo'

import * as extraApi from './extra'

import * as api from 'uni-platform/service/api/index.js'

import protocols from 'uni-platform/service/api/protocols'

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
      if (extraApi[name]) {
        return promisify(name, extraApi[name])
      }
      if (todoApi[name]) {
        return promisify(name, todoApi[name])
      }
      if (!hasOwn(__GLOBAL__, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, __GLOBAL__[name]))
    }
  })
} else {
  uni.upx2px = upx2px

  Object.keys(todoApi).forEach(name => {
    uni[name] = promisify(name, todoApi[name])
  })

  Object.keys(extraApi).forEach(name => {
    uni[name] = promisify(name, todoApi[name])
  })

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name])
  })

  Object.keys(__GLOBAL__).forEach(name => {
    if (hasOwn(__GLOBAL__, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, __GLOBAL__[name]))
    }
  })
}

export default uni
