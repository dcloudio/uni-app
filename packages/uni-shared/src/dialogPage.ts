import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const SYSTEM_DIALOG_PAGE_PATH_STARTER = 'uni:'
export const SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = 'uni:actionSheet'

export function isSystemDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)
}
export function isSystemActionSheetDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH)
}
