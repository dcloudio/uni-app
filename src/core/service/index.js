import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'

import {
  promisify
} from 'uni-helpers/promise'

import todoApis from 'uni-platform/helpers/todo-api'

import baseApi from './api/index'

import platformApi from 'uni-platform/service/api'

const uni = Object.create(null)

/* eslint-disable no-undef */
uni.version = __VERSION__

todoApis.forEach(name => {
  uni[name] = wrapperUnimplemented(name)
})

Object.keys(baseApi).forEach(name => {
  uni[name] = promisify(name, wrapper(name, baseApi[name]))
})

Object.keys(platformApi).forEach(name => {
  uni[name] = promisify(name, wrapper(name, platformApi[name]))
})

export {
  getApp,
  getCurrentPages
}
  from './plugins/app'

export default uni
