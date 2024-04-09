import type { IApp } from '@dcloudio/uni-app-x/types/native'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'

export function initOn(app: IApp) {
  app.addEventListener(ON_SHOW, function (event) {
    const page = getCurrentPage()
    invokeHook(getApp() as ComponentPublicInstance, ON_SHOW, {
      path: __uniConfig.entryPagePath,
    })
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
