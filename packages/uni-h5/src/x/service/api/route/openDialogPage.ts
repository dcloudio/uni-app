import { createNormalizeUrl } from '@dcloudio/uni-api'

import {
  UniDialogPageImpl,
  homeDialogPages,
  homeSystemDialogPages,
  incrementEscBackPageNum,
} from '../../../framework/setup/page'
import { parseUrl } from '@dcloudio/uni-shared'
import type { OpenDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import {
  isSystemActionSheetDialogPage,
  isSystemDialogPage,
} from '@dcloudio/uni-core'

export const openDialogPage = (
  options: OpenDialogPageOptions
): UniDialogPage | null => {
  if (!options.url) {
    triggerFailCallback(options, 'url is required')
    return null
  }

  const { path, query } = parseUrl(options.url)
  const normalizeUrl = createNormalizeUrl('navigateTo')
  const errMsg = normalizeUrl(path, {})
  if (errMsg) {
    triggerFailCallback(options, errMsg)
    return null
  }
  const targetRoute = __uniRoutes.find((route) => {
    return path.indexOf(route.meta.route) !== -1
  })
  const dialogPage = new UniDialogPageImpl({
    route: path,
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
      dialogPage.getParentPage = () => parentPage!
      parentPage.getDialogPages().push(dialogPage)
    }

    if (!options.disableEscBack) {
      incrementEscBackPageNum()
    }
  } else {
    if (!currentPages.length) {
      homeSystemDialogPages.push(dialogPage)
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(homeSystemDialogPages)
      }
    } else {
      if (!parentPage) {
        parentPage = currentPages[currentPages.length - 1]
      }
      dialogPage.getParentPage = () => parentPage!
      parentPage!.vm.$pageLayoutInstance?.$systemDialogPages.value.push(
        dialogPage
      )
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(
          parentPage!.vm.$pageLayoutInstance?.$systemDialogPages.value
        )
      }
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

function closePreActionSheet(dialogPages: UniDialogPage[]) {
  const actionSheets = dialogPages.filter((page): boolean =>
    isSystemActionSheetDialogPage(page)
  )
  if (actionSheets.length > 1) {
    setTimeout(() => {
      dialogPages.splice(dialogPages.indexOf(actionSheets[0]), 1)
    }, 100)
  }
}
