import { getCurrentPage, isSystemActionSheetDialogPage } from '@dcloudio/uni-runtime'


export const hideActionSheet2 = () => {
  const page = getCurrentPage() as unknown as UniPage
  if (!page) return
  const systemDialogPages = page.vm.$pageLayoutInstance?.$systemDialogPages.value
  for (let i = 0;i < systemDialogPages.length;i++) {
    if (isSystemActionSheetDialogPage(systemDialogPages[i])) {
      systemDialogPages.splice(i, 1)
      return
    }
  }
}
