import type { ComponentInternalInstance } from 'vue'

export const DIALOG_TAG = 'dialog'
export const SYSTEM_DIALOG_TAG = 'systemDialog'

export function isDialogPageInstance(vm: ComponentInternalInstance) {
  return isNormalDialogPageInstance(vm) || isSystemDialogPageInstance(vm)
}
export function isNormalDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs.type === DIALOG_TAG
}
export function isSystemDialogPageInstance(vm: ComponentInternalInstance) {
  return vm.attrs.type === SYSTEM_DIALOG_TAG
}
