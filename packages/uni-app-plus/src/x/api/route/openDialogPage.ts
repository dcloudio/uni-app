import { ON_HIDE, parseUrl } from '@dcloudio/uni-shared'
import {
  getCurrentPage,
  getRouteMeta,
  invokeHook,
  isSystemActionSheetDialogPage,
  isSystemDialogPage,
} from '@dcloudio/uni-core'

import { ANI_DURATION, ANI_SHOW } from '../../../service/constants'
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
import { OPEN_DIALOG_PAGE } from '../../constants'

export const openDialogPage = (
  options: OpenDialogPageOptions
): UniDialogPage | null => {
  const { url, animationType } = options
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
  dialogPage.getParentPage = () => parentPage
  dialogPage.$component = null
  dialogPage.$disableEscBack = false
  dialogPage.$triggerParentHide = !!options.triggerParentHide
  const systemDialog = isSystemDialogPage(dialogPage)
  if (!systemDialog) {
    if (!parentPage) {
      homeDialogPages.push(dialogPage)
    } else {
      const dialogPages = parentPage.getDialogPages()
      if (dialogPages.length) {
        invokeHook(dialogPages[dialogPages.length - 1].$vm!, ON_HIDE)
      }
      // When setupXPage is used, the client has not established the association between dialogPage and the parent page
      // so this method is temporarily saved for obtaining during setupXPage
      parentPage.vm.$currentDialogPage = dialogPage
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
  // @ts-expect-error
  const [aniType, aniDuration] = initAnimation(path, animationType)

  const noAnimation = aniType === 'none' || aniDuration === 0
  function callback(page: IPage) {
    showWebview(page, aniType, aniDuration, () => {
      beforeRoute()
    })
  }
  // 有动画时先执行 show
  const page = registerDialogPage(
    { url, path, query, openType: OPEN_DIALOG_PAGE },
    dialogPage,
    noAnimation ? undefined : callback,
    // 有动画时延迟创建 vm
    noAnimation ? 0 : 1
  )
  if (systemDialog) {
    // @ts-expect-error
    dialogPage.__nativeType = 'systemDialog'
  }

  if (noAnimation) {
    callback(page)
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

function initAnimation(path: string, animationType?: string) {
  // 首页去除动画
  if (!getCurrentPage()) {
    return ['none', 0] as const
  }
  const { globalStyle } = __uniConfig
  const meta = getRouteMeta(path)!
  let _animationType =
    animationType || meta.animationType || globalStyle.animationType || ANI_SHOW
  if (_animationType == 'pop-in') {
    _animationType = 'none'
  }
  return [
    _animationType,
    meta.animationDuration || globalStyle.animationDuration || ANI_DURATION,
  ] as const
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
