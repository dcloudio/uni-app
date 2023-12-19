import { ComponentPublicInstance } from 'vue'
import {
  API_NAVIGATE_BACK,
  API_TYPE_NAVIGATE_BACK,
  defineAsyncApi,
  NavigateBackOptions,
  NavigateBackProtocol,
} from '@dcloudio/uni-api'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_BACK_PRESS, ON_SHOW } from '@dcloudio/uni-shared'
import { ANI_CLOSE, ANI_DURATION } from '../../../service/constants'
import { removePage } from '../../../service/framework/page/getCurrentPages'
import { closeWebview } from './webview'
import { IPage } from '@dcloudio/uni-app-x/types/native'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    const page = getCurrentPage()
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
    if (uni.hideToast) {
      uni.hideToast()
    }
    if (uni.hideLoading) {
      uni.hideLoading()
    }
    if (page.$page.meta.isQuit) {
      // TODO quit()
    }
    // TODO isDirectPage
    else {
      const { delta, animationType, animationDuration } = args!
      back(delta!, animationType, animationDuration)
    }
    return resolve()
  },
  NavigateBackProtocol,
  NavigateBackOptions
)

function back(
  delta: number,
  animationType?: string,
  animationDuration?: number
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
          __pageManager.findPageById(deltaPage.$page.id + '')!,
          'none',
          0
        )
      })
  }

  const backPage = function (webview: IPage) {
    if (animationType) {
      animationDuration = animationDuration || ANI_DURATION
    } else {
      if (currentPage.$page.openType === 'redirectTo') {
        // 如果是 redirectTo 跳转的，需要指定 back 动画
        animationType = ANI_CLOSE
        animationDuration = ANI_DURATION
      } else {
        animationType = 'auto'
      }
    }
    closeWebview(webview, animationType, animationDuration, () => {
      pages
        .slice(len - delta, len)
        .forEach((page) => removePage(page as ComponentPublicInstance))
      // 前一个页面触发 onShow
      invokeHook(ON_SHOW)
    })
    // TODO setStatusBarStyle()
  }

  const webview = __pageManager.findPageById(currentPage.$page.id + '')!
  // TODO 处理子 view
  backPage(webview)
}
