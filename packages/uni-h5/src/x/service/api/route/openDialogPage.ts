import { createNormalizeUrl } from '@dcloudio/uni-api'

import {
  UniDialogPageImpl,
  decrementEscBackPageNum,
  homeDialogPages,
  homeSystemDialogPages,
  incrementEscBackPageNum,
} from '../../../framework/setup/page'
import { ON_HIDE, parseUrl, removeLeadingSlash } from '@dcloudio/uni-shared'
import type { OpenDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import {
  SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH,
  dialogPageTriggerPrevDialogPageLifeCycle,
  isSystemActionSheetDialogPage,
  isSystemDialogPage,
  normalizeRoute,
} from '@dcloudio/uni-core'
import { closePreSystemDialogPage } from './utils'
import type { UTSJSONObject } from '@dcloudio/uni-shared'
import { markRaw } from 'vue'

export const openDialogPage = (
  options: OpenDialogPageOptions
): UniDialogPage | null => {
  if (!options.url) {
    triggerFailCallback(options, 'url is required')
    return null
  }

  let { path, query } = parseUrl(options.url)
  path = normalizeRoute(path)
  const normalizeUrl = createNormalizeUrl('navigateTo')
  const errMsg = normalizeUrl(options.url, {})
  if (errMsg) {
    triggerFailCallback(options, errMsg)
    return null
  }
  const targetRoute = __uniRoutes.find((route) => {
    return route.path === path || `/${route.meta.route}` === path
  })
  const dialogPage = markRaw(
    new UniDialogPageImpl({
      route: removeLeadingSlash(path),
      // 忽略类型，不同环境UTSJSONObject表示不同类型。此处直接传普通object即可，获取options时再进行处理
      options: query as unknown as UTSJSONObject,
      $component: targetRoute!.component,
      getParentPage: () => null,
      $disableEscBack: options.disableEscBack,
      $triggerParentHide: !!options.triggerParentHide,
    })
  )

  let parentPage = options.parentPage
  const currentPages = getCurrentPages() as UniPage[]
  if (parentPage) {
    if (currentPages.indexOf(parentPage) === -1) {
      triggerFailCallback(options, 'parentPage is not a valid page')
      return null
    }
  }
  if (!isSystemDialogPage(dialogPage)) {
    if (!currentPages.length) {
      homeDialogPages.push(dialogPage)
    } else {
      if (!parentPage) {
        parentPage = currentPages[currentPages.length - 1]
      }
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE)
      dialogPage.getParentPage = () => parentPage!
      parentPage.getDialogPages().push(dialogPage)
    }
  } else {
    let targetSystemDialogPages: UniDialogPage[] = []
    if (!currentPages.length) {
      targetSystemDialogPages = homeSystemDialogPages
    } else {
      if (!parentPage) {
        parentPage = currentPages[currentPages.length - 1]
      }
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE)
      dialogPage.getParentPage = () => parentPage!
      targetSystemDialogPages =
        parentPage!.vm.$pageLayoutInstance?.$systemDialogPages.value
    }
    targetSystemDialogPages.push(dialogPage)
    if (isSystemActionSheetDialogPage(dialogPage)) {
      closePreSystemDialogPage(
        targetSystemDialogPages,
        SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH,
        (preSystemDialogPage) => {
          if (!preSystemDialogPage.$disableEscBack) {
            decrementEscBackPageNum()
          }
        }
      )
    }
  }

  if (!dialogPage.$disableEscBack) {
    incrementEscBackPageNum()
  }

  const successOptions = {
    errMsg: 'openDialogPage:ok',
  }
  options.success?.(successOptions)
  options.complete?.(successOptions)

  return dialogPage
}

function triggerFailCallback(options: OpenDialogPageOptions, errMsg: string) {
  const failOptions = new UniError(
    'uni-openDialogPage',
    4,
    `openDialogPage: fail, ${errMsg}`
  )
  // @ts-expect-error
  options.fail?.(failOptions)
  options.complete?.(failOptions)
}
