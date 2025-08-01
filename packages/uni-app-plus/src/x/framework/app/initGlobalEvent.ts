import type { IApp } from '@dcloudio/uni-app-x/types/native'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { ON_BACK_PRESS } from '@dcloudio/uni-shared'
import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { backbuttonListener } from '../../../service/framework/app/utils'
import { ON_BACK_BUTTON } from '../../constants'

import { closeDialogPage } from '../../api/route/closeDialogPage'

export function initGlobalEvent(app: IApp) {
  app.addKeyEventListener(ON_BACK_BUTTON, () => {
    // 目前app-ios和app-harmony均会执行此逻辑，但是app-ios理论上始终不会触发以下dialogPage逻辑
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage) {
      const systemDialogPages = currentPage.__$$getSystemDialogPages()
      const dialogPages = currentPage.getDialogPages()
      if (systemDialogPages.length > 0 || dialogPages.length > 0) {
        const lastSystemDialog = systemDialogPages[systemDialogPages.length - 1]
        const lastDialog = dialogPages[dialogPages.length - 1]

        if (!systemDialogPages.length) {
          handleDialogPageBack(lastDialog as UniDialogPage)
        } else if (!dialogPages.length) {
          handleDialogPageBack(lastSystemDialog as UniDialogPage)
        } else {
          handleDialogPageBack(
            (parseInt(lastDialog.vm!.$nativePage!.pageId) >
            parseInt(lastSystemDialog.vm!.$nativePage!.pageId)
              ? lastDialog
              : lastSystemDialog) as UniDialogPage
          )
        }
        return true
      }
    }
    backbuttonListener()
    return true
  })
}

function handleDialogPageBack(dialogPage: UniDialogPage) {
  const onBackPressRes = invokeHook(dialogPage.vm, ON_BACK_PRESS, {
    from: 'navigateBack',
  })
  if (onBackPressRes !== true) {
    closeDialogPage({
      dialogPage,
      animationType: 'auto',
    })
  }
}
