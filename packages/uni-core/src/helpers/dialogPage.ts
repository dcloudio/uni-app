import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import { invokeHook } from './hook'

export const SYSTEM_DIALOG_PAGE_PATH_STARTER = 'uni:'
export const SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = 'uni:actionSheet'

export function isSystemDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)
}
export function isSystemActionSheetDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH)
}

export function dialogPageTriggerParentHide(dialogPage: UniDialogPage) {
  dialogPageTriggerParentLifeCycle(dialogPage, ON_HIDE)
}

export function dialogPageTriggerParentShow(
  dialogPage: UniDialogPage,
  triggerParentHideDialogPageNum = 0
) {
  dialogPageTriggerParentLifeCycle(
    dialogPage,
    ON_SHOW,
    triggerParentHideDialogPageNum
  )
}

function dialogPageTriggerParentLifeCycle(
  dialogPage: UniDialogPage,
  lifeCycle: string,
  triggerParentHideDialogPageNum = 0
) {
  if (!dialogPage.$triggerParentHide) return
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as unknown as UniPage
  if (!currentPage) return
  const parentPage = dialogPage.getParentPage()
  if (!parentPage) return
  if (parentPage !== currentPage) return
  const dialogPages = currentPage.getDialogPages() as UniDialogPage[]
  for (let i = 0; i < dialogPages.length; i++) {
    if (!!dialogPages[i].$triggerParentHide) {
      triggerParentHideDialogPageNum++
      if (triggerParentHideDialogPageNum > 1) {
        return
      }
    }
  }
  if (triggerParentHideDialogPageNum <= 1) {
    const systemDialogPage = getSystemDialogPages(parentPage)
    for (let i = 0; i < systemDialogPage.length; i++) {
      if (!!systemDialogPage[i].$triggerParentHide) {
        triggerParentHideDialogPageNum++
        if (triggerParentHideDialogPageNum > 1) {
          return
        }
      }
    }
  }
  invokeHook(currentPage.vm, lifeCycle)
}

function getSystemDialogPages(parentPage: UniPage) {
  return (parentPage as UniNormalPageImpl).$getSystemDialogPages()
}

export function dialogPageTriggerPrevDialogPageLifeCycle(
  parentPage: UniPage | null | undefined,
  lifeCycle: string
) {
  if (!parentPage) return
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as unknown as UniPage
  if (!currentPage || parentPage !== currentPage) return
  const dialogPages = currentPage.getDialogPages() as UniDialogPage[]
  const systemDialogPage = getSystemDialogPages(parentPage)
  const lastSystemDialogPage = systemDialogPage[systemDialogPage.length - 1]
  const lastDialogPage = dialogPages[dialogPages.length - 1]
  let prevDialogPage
  if (!lastDialogPage) {
    prevDialogPage = lastSystemDialogPage
  } else if (!lastSystemDialogPage) {
    prevDialogPage = lastDialogPage
  } else {
    const lastSystemDialogPageId =
      lastSystemDialogPage.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
    const lastDialogPageId =
      lastDialogPage.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
    prevDialogPage =
      lastSystemDialogPageId > lastDialogPageId
        ? lastSystemDialogPage
        : lastDialogPage
  }
  prevDialogPage && invokeHook(prevDialogPage.vm, lifeCycle)
}
