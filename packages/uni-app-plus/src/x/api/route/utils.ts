import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { removePage } from '../../../service/framework/page/getCurrentPages'
import { closeWebview } from './webview'
import { removeTabBarPage } from '../../framework/app/tabBar'
import {
  entryPageState,
  navigateToPagesBeforeEntryPages,
  reLaunchPagesBeforeEntryPages,
  redirectToPagesBeforeEntryPages,
  switchTabPagesBeforeEntryPages,
} from '../../framework/app'
import { $navigateTo } from './navigateTo'
import { $switchTab } from './switchTab'
import { _redirectTo } from './redirectTo'
import { $reLaunch } from './reLaunch'
import { getCurrentPage } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { getNativeApp } from '../../framework/app/app'
import { setStatusBarStyle } from '../../statusBar'

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
  const dialogPages = (page.$page as UniPage).getDialogPages()
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i])
  }
  const systemDialogPages =
    (page as unknown as ComponentInternalInstance).$systemDialogPages || []
  for (let i = 0; i < systemDialogPages.length; i++) {
    closeNativeDialogPage(systemDialogPages[i])
  }
  ;(page as unknown as ComponentInternalInstance).$systemDialogPages = []
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i])
  }
  closeWebview(page.$nativePage!, animationType, animationDuration)
  removePage(page)
  removeTabBarPage(page)
}

export function updateEntryPageIsReady(path: string) {
  if (
    !getCurrentPage() &&
    path === addLeadingSlash(__uniConfig.entryPagePath!)
  ) {
    entryPageState.isReady = true
  }
}

export function handleBeforeEntryPageRoutes() {
  if (entryPageState.handledBeforeEntryPageRoutes) {
    return
  }
  entryPageState.handledBeforeEntryPageRoutes = true

  const navigateToPages = [...navigateToPagesBeforeEntryPages]
  navigateToPagesBeforeEntryPages.length = 0
  // @ts-expect-error
  navigateToPages.forEach(({ args, handler }) => $navigateTo(args, handler))

  const switchTabPages = [...switchTabPagesBeforeEntryPages]
  switchTabPagesBeforeEntryPages.length = 0
  switchTabPages.forEach(({ args, handler }) => $switchTab(args, handler))

  const redirectToPages = [...redirectToPagesBeforeEntryPages]
  redirectToPagesBeforeEntryPages.length = 0
  redirectToPages.forEach(({ args, handler }) =>
    _redirectTo(args).then(handler.resolve).catch(handler.reject)
  )

  const reLaunchPages = [...reLaunchPagesBeforeEntryPages]
  reLaunchPagesBeforeEntryPages.length = 0
  reLaunchPages.forEach(({ args, handler }) => $reLaunch(args, handler))
}

export function closeNativeDialogPage(
  dialogPage: UniPage,
  animationType?: string,
  animationDuration?: number,
  callback?: () => void
) {
  const webview = getNativeApp().pageManager.findPageById(
    dialogPage.$vm!.$basePage.id + ''
  )
  if (webview) {
    closeWebview(
      webview,
      animationType || 'none',
      animationDuration || 0,
      callback
    )
    setStatusBarStyle()
  }
}
