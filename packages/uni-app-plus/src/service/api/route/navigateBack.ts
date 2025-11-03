import type { ComponentPublicInstance } from 'vue'
import {
  API_NAVIGATE_BACK,
  type API_TYPE_NAVIGATE_BACK,
  NavigateBackOptions,
  NavigateBackProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  getCurrentPage,
  initI18nAppMsgsOnce,
  invokeHook,
} from '@dcloudio/uni-core'
import { useI18n } from '@dcloudio/uni-core'
import { ON_BACK_PRESS, ON_SHOW } from '@dcloudio/uni-shared'

import { ANI_CLOSE, ANI_DURATION } from '../../constants'
import {
  getCurrentBasePages,
  getPage$BasePage,
  removePage,
} from '../../framework/page/getCurrentPages'
import { setStatusBarStyle } from '../../statusBar'
import { backWebview, closeWebview } from './webview'
import { isDirectPage, reLaunchEntryPage } from './direct'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    const page = __X__
      ? (getCurrentPage() as unknown as UniPage).vm
      : getCurrentPage()
    if (!page) {
      return reject(`getCurrentPages is empty`)
    }
    if (
      invokeHook(page as ComponentPublicInstance, ON_BACK_PRESS, {
        from: (args as any).from || 'navigateBack',
      })
    ) {
      return resolve()
    }
    uni.hideToast()
    uni.hideLoading()
    if (getPage$BasePage(page).meta.isQuit) {
      _backWebview(page, quit)
    } else if (isDirectPage(page)) {
      reLaunchEntryPage()
    } else {
      const { delta, animationType, animationDuration } = args!
      back(delta!, animationType, animationDuration)
    }
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)

function _backWebview(
  page: ComponentPublicInstance,
  callback: (webview: PlusWebviewWebviewObject) => void
) {
  const webview = plus.webview.getWebviewById(`${getPage$BasePage(page).id}`)
  if (!(page as any).__uniapp_webview) {
    return callback(webview)
  }
  backWebview(webview, () => callback(webview))
}

let firstBackTime = 0
function quit() {
  initI18nAppMsgsOnce()
  if (!firstBackTime) {
    firstBackTime = Date.now()
    plus.nativeUI.toast(useI18n().t('uni.app.quit'))
    setTimeout(() => {
      firstBackTime = 0
    }, 2000)
  } else if (Date.now() - firstBackTime < 2000) {
    plus.runtime.quit()
  }
}

function back(
  delta: number,
  animationType?: string,
  animationDuration?: number
) {
  const pages = getCurrentBasePages()
  const len = pages.length
  const currentPage = pages[len - 1]

  if (delta > 1) {
    // 中间页隐藏
    pages
      .slice(len - delta, len - 1)
      .reverse()
      .forEach((deltaPage) => {
        closeWebview(
          plus.webview.getWebviewById(`${getPage$BasePage(deltaPage).id}`),
          'none',
          0
        )
      })
  }

  const backPage = function (webview: PlusWebviewWebviewObject) {
    if (animationType) {
      closeWebview(webview, animationType, animationDuration || ANI_DURATION)
    } else {
      if (getPage$BasePage(currentPage).openType === 'redirectTo') {
        // 如果是 redirectTo 跳转的，需要指定 back 动画
        closeWebview(webview, ANI_CLOSE, ANI_DURATION)
      } else {
        closeWebview(webview, 'auto')
      }
    }
    pages
      .slice(len - delta, len)
      .forEach((page) => removePage(page as ComponentPublicInstance))
    setStatusBarStyle()
    // 前一个页面触发 onShow
    invokeHook(ON_SHOW)
  }

  _backWebview(currentPage, backPage)
}
