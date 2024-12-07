import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import {
  API_NAVIGATE_BACK,
  type API_TYPE_NAVIGATE_BACK,
  NavigateBackOptions,
  NavigateBackProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_BACK_PRESS, ON_SHOW } from '@dcloudio/uni-shared'
import { ANI_CLOSE, ANI_DURATION } from '../../../service/constants'
import {
  getCurrentBasePages,
  getPage$BasePage,
  removePage,
} from '../../../service/framework/page/getCurrentPages'
import { closeWebview } from './webview'
import type { IPage } from '@dcloudio/uni-app-x/types/native'
import { getNativeApp } from '../../framework/app/app'
import { setStatusBarStyle } from '../../statusBar'
import { isDirectPage, reLaunchEntryPage } from './direct'
import closeNativeDialogPage from './closeNativeDialogPage'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    const page = (getCurrentPage() as unknown as UniPage).vm
    if (!page) {
      return reject(`getCurrentPages is empty`)
    }
    if (
      // popGesture 时不触发 onBackPress 事件，避免引发半屏弹窗这种冲突情况
      (args as any).from !== 'popGesture'
    ) {
      let onBackPressRes = invokeHook(
        page as ComponentPublicInstance,
        ON_BACK_PRESS,
        {
          from: (args as any).from || 'navigateBack',
        }
      )
      if (onBackPressRes !== true) {
        const dialogPages = page.$page.getDialogPages()
        if (dialogPages.length > 0) {
          const dialogPage = dialogPages[dialogPages.length - 1]
          onBackPressRes = invokeHook(dialogPage.$vm, ON_BACK_PRESS, {
            from: (args as any).from || 'navigateBack',
          })
        }
      }
      if (onBackPressRes === true) {
        return reject('cancel')
      }
    }
    // TODO ext api
    try {
      uni.hideToast()
      uni.hideLoading()
    } catch (error) {
      console.warn(error)
    }
    if (getPage$BasePage(page).meta.isQuit) {
      // TODO quit()
    }
    // TODO isDirectPage
    else {
      if (isDirectPage(page as ComponentPublicInstance)) {
        return reLaunchEntryPage()
      } else {
        const { delta, animationType, animationDuration } = args!
        back(delta!, animationType, animationDuration)
      }
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
  const pages = getCurrentBasePages()
  const len = pages.length
  const currentPage = pages[len - 1]

  if (delta > 1) {
    // 中间页隐藏
    pages
      .slice(len - delta, len - 1)
      .reverse()
      .forEach((deltaPage) => {
        const dialogPages = (deltaPage.$page as UniPage).getDialogPages()
        for (let i = dialogPages.length - 1; i >= 0; i--) {
          const dialogPage = dialogPages[i]
          closeNativeDialogPage(dialogPage)
        }
        closeWebview(
          getNativeApp().pageManager.findPageById(deltaPage.$basePage.id + '')!,
          'none',
          0
        )
      })
  }

  const backPage = function (webview: IPage) {
    if (animationType) {
      animationDuration = animationDuration || ANI_DURATION
    } else {
      if (currentPage.$basePage.openType === 'redirectTo') {
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
      setStatusBarStyle()
    })
  }

  const webview = getNativeApp().pageManager.findPageById(
    currentPage.$basePage.id + ''
  )!
  const dialogPages = (currentPage.$page as UniPage).getDialogPages()
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    const dialogPage = dialogPages[i]
    closeNativeDialogPage(dialogPage)
    if (i > 0) {
      invokeHook(dialogPages[i - 1].$vm!, ON_SHOW)
    }
  }
  const systemDialogPages =
    (currentPage as unknown as ComponentInternalInstance).$systemDialogPages ||
    []
  for (let i = 0; i < systemDialogPages.length; i++) {
    closeNativeDialogPage(systemDialogPages[i])
  }
  ;(currentPage as unknown as ComponentInternalInstance).$systemDialogPages = []
  // TODO 处理子 view
  backPage(webview)
}
