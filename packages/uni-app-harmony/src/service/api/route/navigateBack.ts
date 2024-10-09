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
  useI18n,
} from '@dcloudio/uni-core'
import { ON_BACK_PRESS, ON_SHOW } from '@dcloudio/uni-shared'
import { setStatusBarStyle } from '../../../helpers/statusBar'

import {
  ANI_CLOSE,
  ANI_DURATION,
} from '@dcloudio/uni-app-plus/service/constants'
import { removePage } from '@dcloudio/uni-app-plus/service/framework/page/getCurrentPages'
import { backWebview, closeWebview } from './webview'
import {
  isDirectPage,
  reLaunchEntryPage,
} from '@dcloudio/uni-app-plus/service/api/route/direct'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    const page = getCurrentPage()
    if (!page) {
      return reject(`getCurrentPages is empty`)
    }
    const from = (args as any).from || 'navigateBack'
    if (
      invokeHook(page as ComponentPublicInstance, ON_BACK_PRESS, {
        from,
      })
    ) {
      return resolve()
    }
    if (uni.hideToast) {
      uni.hideToast()
    }
    if (uni.hideLoading) {
      uni.hideLoading()
    }
    if (page.$page.meta.isQuit) {
      quit()
    } else if (isDirectPage(page)) {
      reLaunchEntryPage()
    } else {
      const { delta, animationType, animationDuration } = args!
      back(delta!, animationType, animationDuration, from)
    }
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)

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
  animationDuration?: number,
  from?: string
) {
  const pages = getCurrentPages()
  const len = pages.length
  const currentPage = pages[len - 1]

  if (delta > 1) {
    // 中间页隐藏
    pages
      .slice(len - delta, len - 1)
      .reverse()
      .forEach((deltaPage) => {
        closeWebview(
          plus.webview.getWebviewById(deltaPage.$page.id + ''),
          'none',
          0
        )
      })
  }

  const backPage = function (webview: PlusWebviewWebviewObject) {
    if (animationType) {
      closeWebview(webview, animationType, animationDuration || ANI_DURATION)
    } else {
      if (currentPage.$page.openType === 'redirectTo') {
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

  const webview = plus.webview.getWebviewById(currentPage.$page.id + '')
  if (!(currentPage as any).__uniapp_webview || from === 'navigateBack') {
    return backPage(webview)
  }
  backWebview(webview, () => {
    backPage(webview)
  })
}
