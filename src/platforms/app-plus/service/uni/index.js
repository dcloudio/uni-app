import './polyfill'

import {
  wrapper
} from 'uni-helpers/api'

import {
  promisify
} from 'uni-helpers/promise'

import api from 'uni-core/service/api'

const uni = Object.create(null)

Object.keys(api).forEach(name => {
  uni[name] = promisify(name, wrapper(name, api[name]))
})
