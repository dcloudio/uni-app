import { invokeHook } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  const args = {
    path: __uniConfig.entryPagePath,
    query: {},
    scene: 1001,
  }
  invokeHook(appVm, 'onLaunch', args)
  invokeHook(appVm, 'onShow', args)
}
