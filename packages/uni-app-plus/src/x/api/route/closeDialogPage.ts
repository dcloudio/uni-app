import { ON_SHOW } from '@dcloudio/uni-shared'
import { invokeHook, isSystemDialogPage } from '@dcloudio/uni-core'
import closeNativeDialogPage from './closeNativeDialogPage'
import type { CloseDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import { ANI_DURATION } from '../../../service/constants'

export const closeDialogPage = (options?: CloseDialogPageOptions) => {
  const currentPages = getCurrentPages() as UniPage[]
  const currentPage = currentPages[currentPages.length - 1]
  if (!currentPage) {
    triggerFailCallback(options, 'currentPage is null')
    return
  }
  // @ts-expect-error
  if (options?.animationType === 'pop-out') {
    options.animationType = 'none'
  }

  if (options?.dialogPage) {
    const dialogPage = options?.dialogPage!
    if (!(dialogPage instanceof UniDialogPageImpl)) {
      triggerFailCallback(options, 'dialogPage is not a valid page')
      return
    }
    const parentPage = dialogPage.getParentPage()
    if (!isSystemDialogPage(dialogPage)) {
      if (parentPage && currentPages.indexOf(parentPage) !== -1) {
        const parentDialogPages = parentPage.getDialogPages()
        const index = parentDialogPages.indexOf(dialogPage)
        parentDialogPages.splice(index, 1)
        closeNativeDialogPage(
          dialogPage,
          options?.animationType || 'auto',
          options?.animationDuration || ANI_DURATION
        )
        if (index > 0 && index === parentDialogPages.length) {
          invokeHook(
            parentDialogPages[parentDialogPages.length - 1].vm!,
            ON_SHOW
          )
        }
      } else {
        triggerFailCallback(options, 'dialogPage is not a valid page')
        return
      }
    } else {
      const systemDialogPages = parentPage?.vm?.$systemDialogPages?.value
      if (systemDialogPages) {
        const index = systemDialogPages.indexOf(dialogPage)
        if (index > -1) {
          systemDialogPages.splice(index, 1)
          closeNativeDialogPage(
            dialogPage,
            options?.animationType || 'auto',
            options?.animationDuration || ANI_DURATION
          )
        } else {
          triggerFailCallback(options, 'dialogPage is not a valid page')
        }
      }
      return
    }
  } else {
    const dialogPages = currentPage.getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      closeNativeDialogPage(
        dialogPages[i],
        options?.animationType || 'auto',
        options?.animationDuration || ANI_DURATION
      )
      if (i > 0) {
        invokeHook(dialogPages[i - 1].$vm!, ON_SHOW)
      }
      // @ts-expect-error
      dialogPages[i] = null
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
    'uni-openDialogPage',
    4,
    `openDialogPage: fail, ${errMsg}`
  )
  // @ts-expect-error
  options?.fail?.(failOptions)
  options?.complete?.(failOptions)
}
