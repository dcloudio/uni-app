import apis from 'uni-helpers/apis'
import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'
import {
  promisify
} from 'uni-helpers/promise'

const api = Object.create(null)

const uni = Object.create(null)

const baseApis = require.context(
  '../../../core/service/api',
  true,
  /\.js$/
)

baseApis.keys().forEach(function (key) {
  Object.assign(api, baseApis(key))
})

const platformApis = require.context(
  './api',
  true,
  /\.js$/
)
platformApis.keys().forEach(function (key) {
  Object.assign(api, platformApis(key))
})

apis.forEach(name => {
  if (api[name]) {
    uni[name] = promisify(name, wrapper(name, api[name]))
  } else {
    uni[name] = wrapperUnimplemented(name)
  }
})
