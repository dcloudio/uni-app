import {
  wrapper
} from 'uni-helpers/api'

import {
  promisify
} from 'uni-helpers/promise'

import * as api from './api'

const uni = Object.create(null)

Object.keys(api).forEach(name => {
  uni[name] = promisify(name, wrapper(name, api[name]))
})
