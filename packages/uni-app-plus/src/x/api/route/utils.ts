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
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const SYSTEM_DIALOG_PAGE_PATH_STARTER = 'uni:'
export const SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = 'uni:actionSheet'

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
  const dialogPages = page.$page.getDialogPages()
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
  callback?: () => void
) {
  const webview = getNativeApp().pageManager.findPageById(
    dialogPage.$vm!.$basePage.id + ''
  )!
  closeWebview(webview, animationType || 'none', 0, callback)
}

export function isSystemDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)
}
export function isSystemActionSheetDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH)
}
