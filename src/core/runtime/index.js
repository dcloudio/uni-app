import {
  hasOwn
} from 'uni-shared'

import {
  promisify
} from '../helpers/promise'

import {
  upx2px
} from './upx2px'

import wrapper from './wrapper'

import todoApi from './todo'

import * as extraApi from './extra'

import * as api from 'uni-platform/service/api/index.js'

import { protocols, todos, canIUses } from 'uni-platform/service/api/protocols'

todos.forEach(todoApi => {
  protocols[todoApi] = false
})

canIUses.forEach(canIUseApi => {
  const apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi
  if (!__GLOBAL__.canIUse(apiName)) {
    protocols[canIUseApi] = false
  }
})

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
      if (__PLATFORM__ !== 'app-plus') {
        if (extraApi[name]) {
          return promisify(name, extraApi[name])
        }
        if (todoApi[name]) {
          return promisify(name, todoApi[name])
        }
      }
      if (!hasOwn(__GLOBAL__, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, __GLOBAL__[name]))
    }
  })
} else {
  uni.upx2px = upx2px

  if (__PLATFORM__ !== 'app-plus') {
    Object.keys(todoApi).forEach(name => {
      uni[name] = promisify(name, todoApi[name])
    })
    Object.keys(extraApi).forEach(name => {
      uni[name] = promisify(name, todoApi[name])
    })
  }

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name])
  })

  Object.keys(__GLOBAL__).forEach(name => {
    if (hasOwn(__GLOBAL__, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, __GLOBAL__[name]))
    }
  })
}

export * from './wrapper/create-app'
export * from './wrapper/create-page'
export * from './wrapper/create-component'

export default uni
