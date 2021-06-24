import { extend } from '@vue/shared'
import { ComponentPublicInstance, getCurrentInstance } from 'vue'

export function useCurrentPageId() {
  return getCurrentInstance()!.root.proxy!.$page.id
}

export function getPageIdByVm(vm: ComponentPublicInstance) {
  if (!vm.$) {
    return
  }
  const rootProxy = vm.$.root.proxy
  if (rootProxy && rootProxy.$page) {
    return rootProxy.$page.id
  }
}

const PAGE_META_KEYS = ['navigationBar', 'refreshOptions'] as const

function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}))
}

export function mergePageMeta(
  id: number,
  pageMeta: UniApp.PageRouteMeta
): UniApp.PageRouteMeta {
  const globalStyle = initGlobalStyle()
  const res = extend({ id }, globalStyle, pageMeta)
  PAGE_META_KEYS.forEach((name) => {
    ;(res as any)[name] = extend({}, globalStyle[name], pageMeta[name])
  })
  return res
}
