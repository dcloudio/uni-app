import type { UniCustomElement } from '../components'

export function patchClass(el: UniCustomElement, clazz: string) {
  // wxs
  const { __wxsAddClass, __wxsRemoveClass } = el
  if (__wxsRemoveClass && __wxsRemoveClass.length) {
    clazz = clazz
      .split(/\s+/)
      .filter((v) => __wxsRemoveClass.indexOf(v) === -1)
      .join(' ')
    __wxsRemoveClass.length = 0
  }
  if (__wxsAddClass && __wxsAddClass.length) {
    clazz = clazz + ' ' + __wxsAddClass.join(' ')
  }
  el.className = clazz
}
