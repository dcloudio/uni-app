import { injectHook } from 'vue'
import { ON_ERROR } from '@dcloudio/uni-shared'
import type { MPProtocol } from './types'

export const onError: MPProtocol = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {}
    if (!app.$vm) {
      if (!__GLOBAL__.$onErrorHandlers) {
        __GLOBAL__.$onErrorHandlers = []
      }
      __GLOBAL__.$onErrorHandlers.push(fromArgs)
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm)
    }
  },
}

export const offError: MPProtocol = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {}
    if (!app.$vm) {
      if (!__GLOBAL__.$onErrorHandlers) {
        return
      }
      const index = __GLOBAL__.$onErrorHandlers.findIndex(
        (fn) => fn === fromArgs
      )
      if (index !== -1) {
        __GLOBAL__.$onErrorHandlers.splice(index, 1)
      }
    } else if (fromArgs.__weh) {
      const index = app.$vm[ON_ERROR].indexOf(fromArgs.__weh)
      if (index > -1) {
        app.$vm[ON_ERROR].splice(index, 1)
      }
    }
  },
}
