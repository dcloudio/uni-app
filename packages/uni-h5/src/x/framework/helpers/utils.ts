import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import type { ComponentInternalInstance } from 'vue'

export const DIALOG_TAG = 'dialog'
export const SYSTEM_DIALOG_TAG = 'systemDialog'
export const SYSTEM_DIALOG_PAGE_PATH_STARTER = 'uni:'
export const SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = 'uni:actionSheet'

export function isDialogPageInstance(vm: ComponentInternalInstance) {
  return isNormalDialogPageInstance(vm) || isSystemDialogPageInstance(vm)
}
export function isNormalDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs['data-type'] === DIALOG_TAG
}
export function isSystemDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs['data-type'] === SYSTEM_DIALOG_TAG
}
export function isSystemDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)
}
export function isSystemActionSheetDialogPage(page: UniDialogPage) {
  return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH)
}
