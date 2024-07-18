import type { IApp } from '@dcloudio/uni-app-x/types/native'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { setEnterOptionsSync } from '../../api/base/getEnterOptionsSync'
import type { GetLaunchOptionsSync } from '@dcloudio/uni-app-x/types/uni'
import { getNativeApp } from './app'
import { extend } from '@vue/shared'

export function initOn(app: IApp) {
  app.addEventListener(ON_SHOW, function (event) {
    const app = getNativeApp()
    const schemaLink = app.getLaunchOptionsSync()

    const showOptions: ReturnType<GetLaunchOptionsSync> = extend(
      {},
      {
        path: __uniConfig.entryPagePath as string,
      },
      schemaLink
    )
    console.log('showOptions', showOptions)
    // enter options
    setEnterOptionsSync(showOptions)

    const page = getCurrentPage()
    invokeHook(getApp() as ComponentPublicInstance, ON_SHOW, showOptions)
    if (page) {
      invokeHook(page as ComponentPublicInstance, ON_SHOW)
    }
  })
  app.addEventListener(ON_HIDE, function () {
    const page = getCurrentPage()
    invokeHook(getApp() as ComponentPublicInstance, ON_HIDE)
    if (page) {
      invokeHook(page as ComponentPublicInstance, ON_HIDE)
    }
  })
}

export function initService(app: IApp) {
  initOn(app)
}
