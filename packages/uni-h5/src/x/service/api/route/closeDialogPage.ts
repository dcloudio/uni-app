import { decrementEscBackPageNum } from '../../../framework/setup/page'
import {
  dialogPageTriggerParentShow,
  invokeHook,
  isSystemDialogPage,
} from '@dcloudio/uni-core'
import { ON_SHOW, ON_UNLOAD } from '@dcloudio/uni-shared'
import type { CloseDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const closeDialogPage = (options?: CloseDialogPageOptions) => {
  const currentPages = getCurrentPages() as UniPage[]
  const currentPage = currentPages[currentPages.length - 1]
  if (!currentPage) {
    triggerFailCallback(options, 'currentPage is null')
    return
  }

  if (options?.dialogPage) {
    const dialogPage = options?.dialogPage! as UniDialogPage
    const parentPage = dialogPage.getParentPage()
    if (!isSystemDialogPage(dialogPage)) {
      if (parentPage && currentPages.indexOf(parentPage) !== -1) {
        const parentDialogPages = parentPage.getDialogPages()
        const index = parentDialogPages.indexOf(dialogPage)
        parentDialogPages.splice(index, 1)
        invokeHook(dialogPage.vm!, ON_UNLOAD)
        if (index > 0 && index === parentDialogPages.length) {
          invokeHook(
            parentDialogPages[parentDialogPages.length - 1].vm!,
            ON_SHOW
          )
        }
        dialogPageTriggerParentShow(dialogPage, 1)
        if (!dialogPage.$disableEscBack) {
          decrementEscBackPageNum()
        }
      } else {
        triggerFailCallback(options, 'dialogPage is not a valid page')
        return
      }
    } else {
      const parentSystemDialogPages =
        parentPage!.vm.$pageLayoutInstance!.$systemDialogPages.value
      const index = parentSystemDialogPages.indexOf(dialogPage)
      parentSystemDialogPages.splice(index, 1)
      return
    }
  } else {
    const dialogPages = currentPage.getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      invokeHook(dialogPages[i].vm!, ON_UNLOAD)
      if (i > 0) {
        invokeHook(dialogPages[i - 1].vm!, ON_SHOW)
      }
      dialogPageTriggerParentShow(dialogPages[i] as UniDialogPage, 1)
      if ((!dialogPages[i] as unknown as UniDialogPage).$disableEscBack) {
        decrementEscBackPageNum()
      }
    }
    dialogPages.length = 0
  }

  const successOptions = { errMsg: 'closeDialogPage: ok' }
  options?.success?.(successOptions)
  options?.complete?.(successOptions)
}

function triggerFailCallback(
  options: CloseDialogPageOptions | undefined,
  errMsg: string
) {
  const failOptions = new UniError(
    'uni-closeDialogPage',
    4,
    `closeDialogPage: fail, ${errMsg}`
  )
  // @ts-expect-error
  options?.fail?.(failOptions)
  options?.complete?.(failOptions)
}
