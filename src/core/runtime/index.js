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

import * as eventApi from './event-bus'

import * as api from 'uni-platform/service/api/index.js'

import {
  protocols,
  todos,
  canIUses
} from 'uni-platform/service/api/protocols'

import createApp from './wrapper/create-app'
import createPage from './wrapper/create-page'
import createComponent from './wrapper/create-component'

todos.forEach(todoApi => {
  protocols[todoApi] = false
})

canIUses.forEach(canIUseApi => {
  const apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name
    : canIUseApi
  if (!__GLOBAL__.canIUse(apiName)) {
    protocols[canIUseApi] = false
  }
})

let uni = {}

if (typeof Proxy !== 'undefined' && __PLATFORM__ !== 'app-plus') {
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
      if (eventApi[name]) {
        return eventApi[name]
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

  Object.keys(eventApi).forEach(name => {
    uni[name] = eventApi[name]
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

if (__PLATFORM__ === 'app-plus') {
  if (typeof global !== 'undefined') {
    global.uni = uni
    global.UniEmitter = eventApi
  }
}

__GLOBAL__.createApp = createApp
__GLOBAL__.createPage = createPage
__GLOBAL__.createComponent = createComponent

export {
  createApp,
  createPage,
  createComponent
}

export default uni
