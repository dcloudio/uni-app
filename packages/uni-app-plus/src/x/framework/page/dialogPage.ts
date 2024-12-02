import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const homeDialogPages: UniDialogPage[] = []
export const homeSystemDialogPages: UniDialogPage[] = []

let currentNormalDialogPage: UniDialogPage | null = null
// When setupXPage is used, the client has not established the association between dialogPage and the parent page
// so this method is temporarily saved for obtaining during setupXPage
export function setCurrentNormalDialogPage(value: UniDialogPage | null) {
  currentNormalDialogPage = value
}
export function getCurrentNormalDialogPage() {
  return currentNormalDialogPage
}
