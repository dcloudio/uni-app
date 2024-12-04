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
  if (parentPage && parentPage !== currentPage) return
  const dialogPages = currentPage.getDialogPages() as UniDialogPage[]
  for (let i = 0; i < dialogPages.length; i++) {
    if (!!dialogPages[i].$triggerParentHide) {
      triggerParentHideDialogPageNum++
      if (triggerParentHideDialogPageNum > 1) {
        return
      }
    }
  }
  invokeHook(currentPage.vm, lifeCycle)
}
