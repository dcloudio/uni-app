import { type ComponentInternalInstance, getCurrentInstance, toRaw } from 'vue'
import { findUniElement } from '../dom/utils'
import type { UniCSSStyleDeclaration } from '../dom/UniCSSStyleDeclaration'
import type { VNodeRef } from './ref'

export function setUniElementId(
  id: string,
  tagName: string,
  ref?: VNodeRef,
  refOpts?: {
    k?: string
    f?: boolean
  }
) {
  const ins = getCurrentInstance()
  if (ins) {
    const { $uniElementIds } = ins
    id = toRaw(id)
    // 仅保留第一个，其他忽略
    if (!$uniElementIds.has(id)) {
      $uniElementIds.set(id, { name: tagName })
    }
    if (ref) {
      setUniElementRef(ins, ref, id, {
        k: refOpts?.k,
        f: refOpts?.f,
        n: tagName,
      })
    }
  }
  return id
}

export function withUniElementStyle(id: string, style: string = '') {
  // 从缓存中获取元素，作用域插槽？
  const el = getCurrentInstance()?.$uniElements.get(id)
  if (!el) {
    return style
  }
  const cssText = (el.style as unknown as UniCSSStyleDeclaration).cssText
  return style ? `${style};${cssText}` : cssText
}

function setUniElementRef(
  ins: ComponentInternalInstance,
  ref: VNodeRef,
  id: string,
  opts: {
    k?: string
    f?: boolean
    n: string // 标签名称
  }
): void {
  const { $templateUniElementRefs } = ins as ComponentInternalInstance

  const uniElement = findUniElement(id, ins) as any

  const existTemplateRef = $templateUniElementRefs.find((t) => t.r === ref)
  if (existTemplateRef) {
    if (opts.f) {
      ;(existTemplateRef.v as Array<UniElement | null>).push(uniElement)
    } else {
      existTemplateRef.v = uniElement
    }
  } else {
    $templateUniElementRefs.push({
      i: id,
      r: ref,
      k: opts.k,
      f: opts.f,
      v: opts.f ? [uniElement] : uniElement,
    })
  }
}
