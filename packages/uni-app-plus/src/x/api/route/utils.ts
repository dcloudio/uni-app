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
import closeNativeDialogPage from './closeNativeDialogPage'

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
  const dialogPages = (page.$page as UniPage).getDialogPages()
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i])
  }
  if ((page as unknown as ComponentInternalInstance).$systemDialogPages) {
    const systemDialogPages = (page as unknown as ComponentInternalInstance)
      .$systemDialogPages!.value
    for (let i = 0; i < systemDialogPages.length; i++) {
      closeNativeDialogPage(systemDialogPages[i])
    }
    ;(page as unknown as ComponentInternalInstance).$systemDialogPages!.value =
      []
  }
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i])
  }
  const nativePage = page.$nativePage
  nativePage && closeWebview(nativePage, animationType, animationDuration)
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

export function closePreSystemDialogPage(
  dialogPages: UniDialogPage[],
  type: string
) {
  const targetSystemDialogPages = dialogPages.filter((page): boolean =>
    page.route.startsWith(type)
  )
  if (targetSystemDialogPages.length > 1) {
    setTimeout(() => {
      closeNativeDialogPage(targetSystemDialogPages[0])
      dialogPages.splice(dialogPages.indexOf(targetSystemDialogPages[0]), 1)
    }, 150)
  }
}
