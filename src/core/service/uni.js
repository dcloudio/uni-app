import apis from 'uni-helpers/apis'
import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'
import {
  promisify
} from 'uni-helpers/promise'

const api = Object.create(null)

export const uni = Object.create(null)

const baseApis = require.context(
  './api',
  true,
  /\.js$/
)

baseApis.keys().forEach(function (key) {
  Object.assign(api, baseApis(key))
})

const platformApis = require.context(
  '../../platforms/' + __PLATFORM__ + '/service/api',
  true,
  /\.js$/
)
platformApis.keys().forEach(function (key) {
  Object.assign(api, platformApis(key))
})

/* eslint-disable no-undef */
uni.version = __VERSION__

apis.forEach(name => {
  if (api[name]) {
    uni[name] = promisify(name, wrapper(name, api[name]))
  } else {
    uni[name] = wrapperUnimplemented(name)
  }
})

export function invokeMethod (name, ...args) {
  return api[name](...args)
}
