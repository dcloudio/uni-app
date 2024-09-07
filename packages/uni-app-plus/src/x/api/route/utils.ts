import type { ComponentPublicInstance } from 'vue'
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

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
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
  dialogPage: UniDialogPage,
  animationType: string,
  callback?: () => void
) {
  const webview = getNativeApp().pageManager.findPageById(
    dialogPage.$vm!.$page.id + ''
  )!
  closeWebview(webview, animationType, 0, callback)
}
