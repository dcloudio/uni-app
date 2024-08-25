import { invokeHook } from '@dcloudio/uni-core'
import { injectAppHooks } from '@dcloudio/uni-api'
import { ON_LAUNCH } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { initLaunchOptions } from '@dcloudio/uni-app-plus/service/framework/app/utils'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  injectAppHooks(appVm.$)
  const { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig
  const args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo: referrerInfo,
  })
  invokeHook(appVm, ON_LAUNCH, args)
  // invokeHook(appVm, ON_SHOW, args) // 鸿蒙应用启动时会在EntryAbility触发一次onForeground事件，不需要在initAppLaunch触发onShow
}
