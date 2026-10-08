import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const homeDialogPages: UniDialogPage[] = []
export const homeSystemDialogPages: UniDialogPage[] = []

interface DialogPageNavigatorLock {
  release: () => void
  canceled: boolean
  released: boolean
  unloaded: boolean
  parentHideRegistered: boolean
  cancelPendingMount?: () => void
}

const dialogPageNavigatorLocks = new WeakMap<UniPage, DialogPageNavigatorLock>()
const parentHiddenDialogPages = new WeakMap<UniPage, Set<UniPage>>()

export function registerDialogPageNavigatorLock(
  dialogPage: UniPage,
  release: () => void
) {
  dialogPageNavigatorLocks.set(dialogPage, {
    release,
    canceled: false,
    released: false,
    unloaded: false,
    parentHideRegistered: false,
  })
}

export function registerDialogPagePendingMount(
  dialogPage: UniPage,
  cancel: () => void
) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  if (!state) {
    return
  }
  if (state.canceled) {
    cancel()
    return
  }
  state.cancelPendingMount = cancel
}

export function isDialogPageNavigatorLockCanceled(dialogPage: UniPage) {
  return dialogPageNavigatorLocks.get(dialogPage)?.canceled === true
}

function releaseDialogPageNavigatorLock(state: DialogPageNavigatorLock) {
  if (!state.released) {
    state.released = true
    state.release()
  }
}

export function cancelDialogPageNavigatorLock(dialogPage: UniPage) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  if (!state) {
    return
  }
  state.canceled = true
  state.cancelPendingMount?.()
  state.cancelPendingMount = undefined
  releaseDialogPageNavigatorLock(state)
}

export function completeDialogPageNavigatorLock(dialogPage: UniPage) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  if (!state) {
    return false
  }
  releaseDialogPageNavigatorLock(state)
  if (state.canceled) {
    return false
  }
  return true
}

export function shouldTriggerDialogPageParentHide(dialogPage: UniPage) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  if (
    !state ||
    state.canceled ||
    !(dialogPage as UniDialogPage).$triggerParentHide
  ) {
    return !state?.canceled
  }
  const parentPage = dialogPage.getParentPage()
  if (!parentPage) {
    return true
  }
  const dialogPages = parentHiddenDialogPages.get(parentPage)
  if (!dialogPages?.size) {
    return true
  }
  dialogPages.add(dialogPage)
  state.parentHideRegistered = true
  return false
}

export function markDialogPageParentHidden(dialogPage: UniPage) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  const parentPage = dialogPage.getParentPage()
  if (!state || state.canceled || !parentPage) {
    return
  }
  let dialogPages = parentHiddenDialogPages.get(parentPage)
  if (!dialogPages) {
    dialogPages = new Set<UniPage>()
    parentHiddenDialogPages.set(parentPage, dialogPages)
  }
  dialogPages.add(dialogPage)
  state.parentHideRegistered = true
}

function unregisterDialogPageParentHide(
  dialogPage: UniPage,
  state: DialogPageNavigatorLock
) {
  if (!state.parentHideRegistered) {
    return false
  }
  state.parentHideRegistered = false
  const parentPage = dialogPage.getParentPage()
  if (!parentPage) {
    return false
  }
  const dialogPages = parentHiddenDialogPages.get(parentPage)
  if (!dialogPages) {
    return false
  }
  dialogPages.delete(dialogPage)
  if (dialogPages.size) {
    return false
  }
  parentHiddenDialogPages.delete(parentPage)
  return true
}

export function shouldTriggerDialogPageParentShow(dialogPage: UniPage) {
  const state = dialogPageNavigatorLocks.get(dialogPage)
  if (!state) {
    return true
  }
  if (state.unloaded) {
    return false
  }
  state.unloaded = true
  state.canceled = true
  state.cancelPendingMount?.()
  state.cancelPendingMount = undefined
  releaseDialogPageNavigatorLock(state)
  return unregisterDialogPageParentHide(dialogPage, state)
}

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
