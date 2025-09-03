import { invokeHook } from '@dcloudio/uni-core'
import { injectAppHooks } from '@dcloudio/uni-api'
import { ON_LAUNCH, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { initLaunchOptions } from '@dcloudio/uni-app-plus/service/framework/app/utils'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  injectAppHooks(appVm.$)
  const { entryPagePath, entryPageQuery, referrerInfo, appScheme, appLink } =
    __uniConfig
  const args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo: referrerInfo,
    appScheme,
    appLink,
  })
  invokeHook(appVm, ON_LAUNCH, args)
  invokeHook(appVm, ON_SHOW, args)
}
