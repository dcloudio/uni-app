import apis from 'uni-helpers/apis'
import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'
import {
  promisify
} from 'uni-helpers/promise'

import api from 'uni-service-api'

export const uni = Object.create(null)

apis.forEach(name => {
  if (api[name]) {
    uni[name] = promisify(name, wrapper(name, api[name]))
  } else {
    uni[name] = wrapperUnimplemented(name)
  }
})
