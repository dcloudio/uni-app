import {
  ON_HIDE,
  isSystemActionSheetDialogPage,
  isSystemDialogPage,
  parseUrl,
} from '@dcloudio/uni-shared'
import { invokeHook } from '@dcloudio/uni-core'

import { showWebview } from './webview'
import { beforeRoute, createNormalizeUrl } from '@dcloudio/uni-api'
import {
  homeDialogPages,
  homeSystemDialogPages,
} from '../../framework/page/dialogPage'
import { registerDialogPage } from '../../framework/page/register'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import type { OpenDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import { closeNativeDialogPage } from './utils'

export const openDialogPage = (
  options: OpenDialogPageOptions
): UniDialogPage | null => {
  const { url } = options
  if (!options.url) {
    triggerFailCallback(options, 'url is required')
    return null
  }
  const { path, query } = parseUrl(url)
  const normalizeUrl = createNormalizeUrl('navigateTo')
  const errMsg = normalizeUrl(path, {})
  if (errMsg) {
    triggerFailCallback(options, errMsg)
    return null
  }

  let parentPage = options.parentPage || null
  const currentPages = getCurrentPages() as UniPage[]
  if (parentPage) {
    if (currentPages.indexOf(parentPage) === -1) {
      triggerFailCallback(options, 'parentPage is not a valid page')
      return null
    }
  }
  if (currentPages.length && !parentPage) {
    parentPage = currentPages[currentPages.length - 1]
  }

  const dialogPage = new UniDialogPageImpl()
  dialogPage.route = path
  // @ts-expect-error
  dialogPage.optionsByJS = query
  dialogPage.getParentPage = () => parentPage
  dialogPage.$component = null
  dialogPage.$disableEscBack = false
  const systemDialog = isSystemDialogPage(dialogPage)
  if (!systemDialog) {
    if (!parentPage) {
      homeDialogPages.push(dialogPage)
    } else {
      const dialogPages = parentPage.getDialogPages()
      if (dialogPages.length) {
        invokeHook(dialogPages[dialogPages.length - 1].$vm!, ON_HIDE)
      }
      dialogPages.push(dialogPage)
    }
  } else {
    if (!parentPage) {
      homeSystemDialogPages.push(dialogPage)
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(homeSystemDialogPages)
      }
    } else {
      if (!parentPage.vm.$systemDialogPages) {
        parentPage.vm.$systemDialogPages = []
      }
      parentPage.vm.$systemDialogPages.push(dialogPage)
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(parentPage.vm.$systemDialogPages)
      }
    }
  }
  function callback(page: IPage) {
    showWebview(page, 'none', 0, () => {
      beforeRoute()
    })
  }
  // 有动画时先执行 show
  const page = registerDialogPage(
    { url, path, query, openType: 'openDialogPage' },
    dialogPage,
    undefined,
    0
  )
  // @ts-expect-error
  dialogPage.__nativePageId = page.pageId
  if (systemDialog) {
    // @ts-expect-error
    dialogPage.__nativeType = 'systemDialog'
  }

  callback(page)

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
      closeNativeDialogPage(actionSheets[0])
      dialogPages.splice(dialogPages.indexOf(actionSheets[0]), 1)
    }, 150)
  }
}
