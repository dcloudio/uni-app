import {
  isFn
} from 'uni-shared'

import providers from 'uni-platform/runtime/api/providers'

export function getProvider ({
  service,
  success,
  fail,
  complete
}) {
  let res = false
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service,
      provider: providers[service]
    }
    isFn(success) && success(res)
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    }
    isFn(fail) && fail(res)
  }
  isFn(complete) && complete(res)
}
