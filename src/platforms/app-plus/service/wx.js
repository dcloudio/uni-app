import apis from '../../../../lib/apis'
import {
  wrapper,
  wrapperUnimplemented
} from 'uni-helpers/api'

import api from 'uni-service-api'

export const wx = Object.create(null)

apis.forEach(name => {
  if (api[name]) {
    wx[name] = wrapper(name, api[name])
  } else {
    wx[name] = wrapperUnimplemented(name)
  }
})
