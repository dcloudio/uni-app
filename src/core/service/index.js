import apis from 'uni-helpers/apis'

import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'

import {
  promisify
} from 'uni-helpers/promise'

import {
  api
} from './api'

const uni = Object.create(null)

/* eslint-disable no-undef */
uni.version = __VERSION__

apis.forEach(name => {
  if (api[name]) {
    uni[name] = promisify(name, wrapper(name, api[name]))
  } else {
    uni[name] = wrapperUnimplemented(name)
  }
})

export {
  getApp,
  getCurrentPages
}
  from './plugins/app'

export default uni
