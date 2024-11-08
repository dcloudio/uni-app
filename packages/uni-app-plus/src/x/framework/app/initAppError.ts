import { invokeHook } from '@dcloudio/uni-core'
import { ON_ERROR } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'

export function initAppError(appVm: ComponentPublicInstance, nativeApp: IApp) {
  nativeApp.addEventListener(ON_ERROR, function (errorEvent: any) {
    invokeHook(appVm, ON_ERROR, errorEvent.error)
  })
}
