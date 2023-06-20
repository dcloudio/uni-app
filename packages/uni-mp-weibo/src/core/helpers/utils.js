import {
  isFn
} from 'uni-shared'

import {
  tryCatch
} from './catch'

export function getApiCallbacks (params) {
  const apiCallbacks = {}
  for (const name in params) {
    const param = params[name]
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param)
      delete params[name]
    }
  }
  return apiCallbacks
}
