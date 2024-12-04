import { extend } from '@vue/shared'
import type {
  CreateLifetimesOptions,
  MPComponentInstance,
} from '@dcloudio/uni-mp-core'

import { $destroyComponent } from '@dcloudio/uni-mp-core'

import { initLifetimes as initComponentLifetimes } from './componentLifetimes'
import { instances } from './parseComponentOptions'

export function initLifetimes(lifetimesOptions: CreateLifetimesOptions) {
  return extend(initComponentLifetimes(lifetimesOptions), {
    detached(this: MPComponentInstance) {
      this.$vm && $destroyComponent(this.$vm)
      // 清理
      const webviewId = this.__webviewId__
      webviewId &&
        Object.keys(instances).forEach((key) => {
          if (key.indexOf(webviewId + '_') === 0) {
            delete instances[key]
          }
        })
    },
  })
}
