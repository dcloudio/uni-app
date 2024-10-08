import { createNormalizeUrl } from '@dcloudio/uni-api'

import {
  UniDialogPageImpl,
  homeDialogPages,
  incrementEscBackPageNum,
} from '../../../framework/setup/page'
import { EventChannel, parseUrl } from '@dcloudio/uni-shared'
import type { OpenDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'

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
  })

  let parentPage = options.parentPage
  const currentPages = getCurrentPages() as UniPage[]
  if (parentPage) {
    if (currentPages.indexOf(parentPage) === -1) {
      triggerFailCallback(options, 'parentPage is not a valid page')
      return null
    }
  }
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

  const successOptions = {
    errMsg: 'openDialogPage: ok',
    eventChannel: new EventChannel(0, options.events),
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
