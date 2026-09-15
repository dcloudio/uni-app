import { closeDialogPage } from './closeDialogPage'

export function clearDialogPages(uniPage: UniPage) {
  // closeDialogPage 会修改弹页数组，因此倒序关闭。
  const dialogPages = uniPage.getDialogPages()
  for (let i = dialogPages.length - 1; i >= 0; i--) {
    closeDialogPage({ dialogPage: dialogPages[i] })
  }
  const systemDialogPages =
    uniPage.vm.$pageLayoutInstance?.$systemDialogPages?.value
  if (systemDialogPages) {
    for (let i = systemDialogPages.length - 1; i >= 0; i--) {
      closeDialogPage({ dialogPage: systemDialogPages[i] })
    }
  }
}

export function closePreSystemDialogPage(
  dialogPages: UniDialogPage[],
  type: string
) {
  const targetSystemDialogPages = dialogPages.filter((page): boolean =>
    page.route.startsWith(type)
  )
  if (targetSystemDialogPages.length > 1) {
    setTimeout(() => {
      dialogPages.splice(dialogPages.indexOf(targetSystemDialogPages[0]), 1)
    }, 150)
  }
}
