import { ON_HIDE, parseUrl } from '@dcloudio/uni-shared'
import {
  SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH,
  dialogPageTriggerParentHide,
  dialogPageTriggerPrevDialogPageLifeCycle,
  getCurrentPage,
  getRouteMeta,
  isSystemActionSheetDialogPage,
  isSystemDialogPage,
  normalizeRoute,
} from '@dcloudio/uni-core'

import { ANI_DURATION, ANI_SHOW } from '../../../service/constants'
import { showWebview } from './webview'
import { beforeRoute, createNormalizeUrl } from '@dcloudio/uni-api'
import {
  homeDialogPages,
  homeSystemDialogPages,
  setCurrentNormalDialogPage,
  setCurrentSystemDialogPage,
} from '../../framework/page/dialogPage'
import { registerDialogPage } from '../../framework/page/register'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import type { OpenDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import { OPEN_DIALOG_PAGE } from '../../constants'
import { closePreSystemDialogPage } from './utils'

export const openDialogPage = (
  options: OpenDialogPageOptions
): UniDialogPage | null => {
  const { url, animationType, animationDuration } = options
  if (!options.url) {
    triggerFailCallback(options, 'url is required')
    return null
  }
  let { path, query } = parseUrl(url)
  path = normalizeRoute(path)
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
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE)
      // iOS normal dialogPage 数据框架不需要存储，由客户端管理
      // 预期仅在鸿蒙上生效
      dialogPages.push(dialogPage)
    }
    setCurrentNormalDialogPage(dialogPage)
  } else {
    let targetSystemDialogPages: UniDialogPage[] = []
    if (!parentPage) {
      targetSystemDialogPages = homeSystemDialogPages
    } else {
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE)
      // system dialogPages 数据 ios 端不需要框架处理，预期仅在鸿蒙上生效
      targetSystemDialogPages = (
        parentPage as UniNormalPageImpl
      ).$getSystemDialogPages()
    }
    targetSystemDialogPages.push(dialogPage)
    if (isSystemActionSheetDialogPage(dialogPage)) {
      closePreSystemDialogPage(
        targetSystemDialogPages,
        SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH
      )
    }
    setCurrentSystemDialogPage(dialogPage)
  }
  const [aniType, aniDuration] = initAnimation(
    path,
    // @ts-expect-error
    animationType,
    animationDuration
  )

  const noAnimation = aniType === 'none' || aniDuration === 0
  function callback(page: IPage) {
    showWebview(page, aniType, aniDuration, () => {
      beforeRoute()
      dialogPageTriggerParentHide(dialogPage)
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

function initAnimation(
  path: string,
  animationType?: string,
  animationDuration?: number
) {
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
    animationDuration ||
      meta.animationDuration ||
      globalStyle.animationDuration ||
      ANI_DURATION,
  ] as const
}
