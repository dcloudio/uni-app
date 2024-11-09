import { type ComponentInternalInstance, getCurrentInstance, toRaw } from 'vue'
import { SetUniElementIdTagType } from '@dcloudio/uni-shared'
import { findUniElement } from '../dom/utils'
import type { UniCSSStyleDeclaration } from '../dom/UniCSSStyleDeclaration'
import type { VNodeRef } from './ref'
import { stringifyStyle } from './style'
import { isString } from '@vue/shared'

export function setUniElementId(
  id: string,
  options:
    | {
        name: string
        type?: SetUniElementIdTagType
      }
    | string,
  ref?: VNodeRef,
  refOpts?: {
    k?: string
    f?: boolean
  }
) {
  const ins = getCurrentInstance()
  if (ins) {
    let tagName: string
    let tagType: SetUniElementIdTagType | undefined
    if (isString(options)) {
      tagName = options
    } else {
      tagName = options.name
      tagType = options.type
    }
    const { $uniElementIds } = ins
    id = toRaw(id)
    // 仅保留第一个，其他忽略
    if (!$uniElementIds.has(id)) {
      $uniElementIds.set(id, { name: tagName })
    }
    if (ref) {
      // 指定了ref，则需要存储ref，使得 this.$refs 和 setup 的 ref 生效
      setUniElementRef(
        ins,
        ref,
        id,
        {
          k: refOpts?.k,
          f: refOpts?.f,
          n: tagName,
        },
        tagType
      )
    }
    if (tagType === SetUniElementIdTagType.BuiltInRootElement && ins.props.id) {
      const parent = ins.parent
      if (parent) {
        // 从当前实例中找到元素，并设置到父实例中
        const uniElement = findUniElement(id, ins)
        if (uniElement) {
          parent.$uniElements.set(ins.props.id as string, uniElement as any)
          const existTemplateRef = parent.$templateUniElementRefs.find(
            (t) => t.i === ins.props.id
          )
          if (existTemplateRef) {
            existTemplateRef.v = uniElement as any
          }
        }
      }
    }
  }
  return id
}

export function setUniElementStyle(id: string, style: unknown = '') {
  const ins = getCurrentInstance()
  if (!ins) {
    return ''
  }
  if (style) {
    style = stringifyStyle(style)
  }

  if (style) {
    ins.$templateUniElementStyles[id] = style as string
  }
  // 当 patch 的时候，需要增加 $eS 的更新，而 element 的 style 是直接更新到 mp 的 $eS 上
  // 从缓存中获取元素，作用域插槽？
  const el = ins.$uniElements.get(id)
  if (!el) {
    ins.$eS[id] = style as string
  } else {
    const cssText = (el.style as unknown as UniCSSStyleDeclaration).cssText
    ins.$eS[id] = style ? `${style};${cssText}` : cssText
  }
  return ''
}

function setUniElementRef(
  ins: ComponentInternalInstance,
  ref: VNodeRef,
  id: string,
  opts: {
    k?: string
    f?: boolean
    n: string // 标签名称
  },
  tagType?: SetUniElementIdTagType
): void {
  const { $templateUniElementRefs } = ins as ComponentInternalInstance

  if (tagType === SetUniElementIdTagType.BuiltInComponent) {
    const existTemplateRef = $templateUniElementRefs.find((t) => t.r === ref)
    if (!existTemplateRef) {
      $templateUniElementRefs.push({
        i: id,
        r: ref,
        k: opts.k,
        f: opts.f,
        v: null,
      })
    }
    // 不需要处理后续逻辑，交给BuiltInRootElement处理
    return
  }
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
