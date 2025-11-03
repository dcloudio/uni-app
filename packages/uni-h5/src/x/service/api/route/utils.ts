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
