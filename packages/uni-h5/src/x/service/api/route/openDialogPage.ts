import { createNormalizeUrl } from '@dcloudio/uni-api'

import {
  UniDialogPageImpl,
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
  const errMsg = normalizeUrl(path, {})
  if (errMsg) {
    triggerFailCallback(options, errMsg)
    return null
  }
  const targetRoute = __uniRoutes.find((route) => {
    return route.path === path || `/${route.meta.route}` === path
  })
  const dialogPage = new UniDialogPageImpl({
    route: removeLeadingSlash(path),
    options: new UTSJSONObject(query),
    $component: targetRoute!.component,
    getParentPage: () => null,
    $disableEscBack: options.disableEscBack,
    $triggerParentHide: !!options.triggerParentHide,
  })

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

    if (!options.disableEscBack) {
      incrementEscBackPageNum()
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
        SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH
      )
    }
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
