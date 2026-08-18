import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const homeDialogPages: UniDialogPage[] = []
export const homeSystemDialogPages: UniDialogPage[] = []

type DevToolsPageChangedListener = () => void

let devToolsPageChangedListener: DevToolsPageChangedListener | undefined

export function getCurrentDevToolsPage(): UniPage | null {
  const pages = getCurrentPages() as UniPage[]
  const currentPage = pages[pages.length - 1] || null
  const dialogPages = homeDialogPages.length
    ? homeDialogPages
    : currentPage?.getDialogPages() || homeDialogPages
  for (let index = dialogPages.length - 1; index >= 0; index--) {
    const dialogPage = dialogPages[index]
    if (dialogPage.$vm) {
      return dialogPage
    }
  }
  return currentPage
}

export function isDevToolsDialogPage(page: UniPage): boolean {
  return page instanceof UniDialogPageImpl
}

export function setDevToolsPageChangedListener(
  listener?: DevToolsPageChangedListener
) {
  devToolsPageChangedListener = listener
}

export function hasDevToolsPageChangedListener(): boolean {
  return !!devToolsPageChangedListener
}

export function notifyDevToolsPageChanged() {
  try {
    devToolsPageChangedListener?.()
  } catch (error) {
    // DevTools 监听器异常不能影响 dialogPage 的业务生命周期。
    console.error(error)
  }
}

let currentNormalDialogPage: UniDialogPage | null = null
// When setupXPage is used, the client has not established the association between dialogPage and the parent page
// so this method is temporarily saved for obtaining during setupXPage
export function setCurrentNormalDialogPage(value: UniDialogPage | null) {
  currentNormalDialogPage = value
}
export function getCurrentNormalDialogPage() {
  return currentNormalDialogPage
}

let currentSystemDialogPage: UniDialogPage | null = null
// When open systemDialogPage in App onLaunch, currentPage is null, cannot get current systemDialogPage by current page
// so this method is temporarily saved for obtaining during setupXPage
export function setCurrentSystemDialogPage(value: UniDialogPage | null) {
  currentSystemDialogPage = value
}
export function getCurrentSystemDialogPage() {
  return currentSystemDialogPage
}
