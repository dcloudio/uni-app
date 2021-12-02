import { extend } from '@vue/shared'
import { ON_READY } from '@dcloudio/uni-shared'
import {
  MPComponentInstance,
  CreateLifetimesOptions,
  nextSetDataTick,
} from '@dcloudio/uni-mp-core'

import { $destroyComponent } from '@dcloudio/uni-mp-core'

import { initLifetimes as initComponentLifetimes } from './componentLifetimes'
import { instances } from './parseComponentOptions'

export function initLifetimes(lifetimesOptions: CreateLifetimesOptions) {
  return extend(initComponentLifetimes(lifetimesOptions), {
    ready(this: MPComponentInstance) {
      if (this.$vm && lifetimesOptions.isPage(this)) {
        if (this.pageinstance) {
          this.__webviewId__ = (this.pageinstance as any).__pageId__
        }
        this.$vm.$callCreatedHook()
        nextSetDataTick(this, () => {
          this.$vm!.$callHook('mounted')
          this.$vm!.$callHook(ON_READY)
        })
      } else {
        this.is && console.warn(this.is + ' is not ready')
      }
    },
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
