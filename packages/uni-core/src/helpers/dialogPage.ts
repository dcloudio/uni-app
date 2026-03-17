import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import { invokeHook } from './hook'
import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentInternalInstance } from 'vue'

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
    const systemDialogPages = getSystemDialogPages(parentPage)
    for (let i = 0; i < systemDialogPages.length; i++) {
      if (!!systemDialogPages[i].$triggerParentHide) {
        triggerParentHideDialogPageNum++
        if (triggerParentHideDialogPageNum > 1) {
          return
        }
      }
    }
  }
  invokeHook(currentPage.vm, lifeCycle)
}

export function getSystemDialogPages(
  parentPage: UniPage | null
): UniDialogPage[] {
  if (!parentPage) return []
  if (__PLATFORM__ === 'app') {
    // $getSystemDialogPages harmony __$$getSystemDialogPages ios
    return typeof parentPage.__$$getSystemDialogPages === 'undefined'
      ? (parentPage.$getSystemDialogPages() as UniDialogPage[])
      : (parentPage.__$$getSystemDialogPages() as UniDialogPage[])
  }
  return parentPage.$getSystemDialogPages() as UniDialogPage[]
}

export function dialogPageTriggerPrevDialogPageLifeCycle(
  parentPage: UniPage | null | undefined,
  lifeCycle: string
) {
  if (!parentPage) return
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as unknown as UniPage
  if (!currentPage || parentPage !== currentPage) return

  let prevDialogPage: UniDialogPage | null = getLastDialogPage(currentPage)
  prevDialogPage && invokeHook(prevDialogPage.vm, lifeCycle)
}

export function getLastDialogPage(
  parentPage: UniPage | null | undefined
): UniDialogPage | null {
  if (!parentPage) return null
  const dialogPages = parentPage.getDialogPages() as UniDialogPage[]
  const systemDialogPages = getSystemDialogPages(parentPage)
  const lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1]
  const lastDialogPage = dialogPages[dialogPages.length - 1]
  if (!lastDialogPage) return lastSystemDialogPage
  if (!lastSystemDialogPage) return lastDialogPage
  const lastSystemDialogPageId =
    lastSystemDialogPage.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
  const lastDialogPageId =
    lastDialogPage.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
  return lastSystemDialogPageId > lastDialogPageId
    ? lastSystemDialogPage
    : lastDialogPage
}

export function invokeLastDialogPageHookByUniPage(
  parentPage: UniPage | null | undefined,
  hook: string
) {
  const lastDialogPage = getLastDialogPage(parentPage)
  if (lastDialogPage) {
    invokeHook(lastDialogPage.vm, hook)
  }
}

export function invokeNewDialogPageHook(page: UniDialogPage, hook: string) {
  // app launch 时 openDialogPage，可能存在没有 currentPage 的情况，此时不触发父页面生命周期
  const currentPage = getCurrentPage() as unknown as UniPage
  if (!currentPage) return

  let shouldInvoke = false
  if (isSystemDialogPage(page)) {
    const systemDialogPages = getSystemDialogPages(currentPage)
    shouldInvoke = systemDialogPages.includes(page as UniDialogPage)
  } else {
    const dialogPages = currentPage.getDialogPages()
    shouldInvoke = dialogPages.includes(page as UniDialogPage)
  }
  shouldInvoke && invokeHook(page.vm, hook)
}

export function getPageInstanceByChild(child: ComponentInternalInstance) {
  if (__PLATFORM__ === 'app') {
    // @ts-expect-error
    return child.ctx.$basePage
  }
  let pageInstance: ComponentInternalInstance | null = child
  while (pageInstance && pageInstance.type?.name !== 'Page') {
    pageInstance = pageInstance.parent
  }
  return pageInstance
}

export const DIALOG_TAG = 'dialog'
export const SYSTEM_DIALOG_TAG = 'systemDialog'

export function isDialogPageInstance(vm: ComponentInternalInstance | null) {
  if (!vm) return false
  if (__PLATFORM__ === 'app') {
    // @ts-expect-error
    return vm.openType === 'openDialogPage'
  }

  return isNormalDialogPageInstance(vm) || isSystemDialogPageInstance(vm)
}
export function isNormalDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs['data-type'] === DIALOG_TAG
}
export function isSystemDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs['data-type'] === SYSTEM_DIALOG_TAG
}
