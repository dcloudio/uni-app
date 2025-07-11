import type { IApp } from '@dcloudio/uni-app-x/types/native'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_EXIT, ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { setEnterOptionsSync } from '../../api/base/getEnterOptionsSync'
import { getNativeApp } from './app'
import { extend } from '@vue/shared'
import { clearWebviewReady } from './subscriber/webviewReady'
import { resetWebviewId } from '../../../service/framework/webview/utils'
import { getAllPages } from '../../../service/framework/page/getCurrentPages'
import { closePage } from '../../api/route/utils'
import { clearTabBarStatus } from './tabBar'

export function initOn(app: IApp, unregisterApp: () => void) {
  app.addEventListener(ON_SHOW, async function (event) {
    const app = getNativeApp()
    const MAX_TIMEOUT = 200

    function getNewIntent() {
      return new Promise((resolve, reject) => {
        let callbackWrapper: UniCallbackWrapper | null = null

        const handleNewIntent = (newIntent) => {
          clearTimeout(timeout)
          app.removeEventListener('onNewIntent', callbackWrapper!)
          resolve({
            appScheme: newIntent.appScheme ?? null,
            appLink: newIntent.appLink ?? null,
          })
        }
        callbackWrapper = app.addEventListener('onNewIntent', handleNewIntent)

        const timeout = setTimeout(() => {
          app.removeEventListener('onNewIntent', callbackWrapper!)
          // 等 timeout 无返回值，视为无值
          const appLink = {
            appScheme: null,
            appLink: null,
          }
          resolve(appLink)
        }, MAX_TIMEOUT)
      })
    }

    const schemaLink = (await getNewIntent()) as ReturnType<
      typeof app.getLaunchOptionsSync
    >

    const showOptions = extend(
      {
        path: __uniConfig.entryPagePath as string,
      },
      schemaLink
    )
    // enter options
    setEnterOptionsSync(showOptions)

    const page = (getCurrentPage() as unknown as UniPage)?.vm
    invokeHook(getApp().vm as ComponentPublicInstance, ON_SHOW, showOptions)
    if (page) {
      invokeHook(page, ON_SHOW)
    }
  })
  app.addEventListener(ON_HIDE, function () {
    const page = (getCurrentPage() as unknown as UniPage)?.vm
    invokeHook(getApp().vm as ComponentPublicInstance, ON_HIDE)
    if (page) {
      invokeHook(page, ON_HIDE)
    }
  })
  app.addEventListener(ON_EXIT, function () {
    const appInstance = getApp().vm as ComponentPublicInstance
    const pages = getAllPages().slice(0)
    pages.forEach((page) => closePage(page, 'none'))
    clearTabBarStatus()
    clearWebviewReady()
    resetWebviewId()
    invokeHook(appInstance, ON_EXIT)
    unregisterApp()
  })
}

export function initService(app: IApp, unregisterApp: () => void) {
  initOn(app, unregisterApp)
}
