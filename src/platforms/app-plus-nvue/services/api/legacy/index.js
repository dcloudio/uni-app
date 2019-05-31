import {
  hasOwn
} from 'uni-shared'

import {
  promisify
} from 'uni-core/helpers/promise'

import * as apis from './api'

export default function initUni (uni, nvue) {
  if (typeof Proxy !== 'undefined') {
    return new Proxy({}, {
      get (target, name) {
        if (apis[name]) {
          return apis[name]
        }
        if (name === 'requireNativePlugin') {
          return nvue.requireModule
        }
        if (!hasOwn(uni, name)) {
          return
        }
        return promisify(name, uni[name])
      }
    })
  }
  const ret = {
    requireNativePlugin: nvue.requireModule
  }
  Object.keys(apis).forEach(name => {
    ret[name] = apis[name]
  })
  Object.keys(uni).forEach(name => {
    ret[name] = promisify(name, uni[name])
  })
  return ret
}
