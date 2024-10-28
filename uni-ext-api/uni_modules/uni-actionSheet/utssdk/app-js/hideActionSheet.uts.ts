import { getCurrentPage } from '@dcloudio/uni-core'
import { closeNativeDialogPage } from "@dcloudio/uni-runtime";

export const hideActionSheet2 = () => {
  const page = getCurrentPage() as unknown as UniPage
  page.vm.$systemDialogPages.forEach((page) => {
    closeNativeDialogPage(page)
  })
  page.vm.$systemDialogPages = []
}
