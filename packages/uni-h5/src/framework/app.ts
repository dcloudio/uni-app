import { ComponentPublicInstance } from 'vue'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function getCurrentPages() {
  return []
}
