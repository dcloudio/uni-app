import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance } from 'vue'
import type { IPage } from '@dcloudio/uni-app-x/types/native'

interface UniPageFix extends IPage {
  applyStatusBarStyle(): void
}

export function setStatusBarStyle() {
  let page: ComponentPublicInstance
  if (__X__) {
    const currentPage = getCurrentPage() as unknown as UniPage
    const dialogPages = currentPage?.getDialogPages()
    const systemDialogPages = currentPage.__$$getSystemDialogPages()
    if (systemDialogPages?.length && dialogPages?.length) {
      const lastSystemDialogPage =
        systemDialogPages[systemDialogPages.length - 1]
      const lastDialogPage = dialogPages[dialogPages.length - 1]
      page =
        // @ts-expect-error
        Number(lastSystemDialogPage.__nativePageId) >
        Number((lastDialogPage as any).__nativePageId)
          ? lastSystemDialogPage.vm
          : lastDialogPage.vm
    } else if (dialogPages?.length) {
      page = dialogPages[dialogPages.length - 1].vm
    } else if (systemDialogPages?.length) {
      page = systemDialogPages[systemDialogPages.length - 1].vm
    } else {
      page = currentPage.vm
    }
  } else {
    page = getCurrentPage() as ComponentPublicInstance
  }
  if (page) {
    const nativePage = page.$nativePage as UniPageFix
    nativePage.applyStatusBarStyle()
  }
}
