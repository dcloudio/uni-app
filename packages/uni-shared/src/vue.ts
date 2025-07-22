import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  RendererNode,
  VNode,
} from 'vue'
import {
  camelize,
  hyphenate,
  isArray,
  isString,
  parseStringStyle,
  normalizeClass as vueNormalizeClass,
  normalizeStyle as vueNormalizeStyle,
} from '@vue/shared'
import type { NormalizedStyle } from '@vue/shared'
import { isBuiltInComponent } from './tags'
import { SLOT_DEFAULT_NAME } from './constants'
import { getGlobal } from './utils'

export function isComponentInternalInstance(
  vm: unknown
): vm is ComponentInternalInstance {
  return !!(vm as ComponentInternalInstance).appContext
}

export function resolveComponentInstance(
  instance?: ComponentInternalInstance | ComponentPublicInstance
) {
  return (
    instance &&
    (isComponentInternalInstance(instance) ? instance.proxy! : instance)
  )
}

export function resolveOwnerVm(vm: ComponentInternalInstance) {
  if (!vm) {
    return
  }
  let componentName = vm.type.name
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.parent!
    componentName = vm.type.name
  }
  return vm.proxy!
}

function isElement(el: Element) {
  // Element
  return el.nodeType === 1
}
export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi: true
): RendererNode[]
export function resolveOwnerEl(
  instance: ComponentInternalInstance
): RendererNode | null
export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi: boolean = false
): RendererNode | null {
  const { vnode } = instance
  if (isElement(vnode.el as Element)) {
    return multi ? (vnode.el ? [vnode.el] : []) : vnode.el
  }
  const { subTree } = instance
  // ShapeFlags.ARRAY_CHILDREN = 1<<4
  if (subTree.shapeFlag & 16) {
    const elemVNodes = (subTree.children as VNode[]).filter(
      (vnode) => vnode.el && isElement(vnode.el as Element)
    )
    if (elemVNodes.length > 0) {
      if (multi) {
        return elemVNodes.map((node) => node.el)
      }
      return elemVNodes[0].el
    }
  }
  return multi ? (vnode.el ? [vnode.el] : []) : vnode.el
}

export function dynamicSlotName(name: string) {
  return name === 'default' ? SLOT_DEFAULT_NAME : name
}

const customizeRE = /:/g

export function customizeEvent(str: string) {
  return camelize(str.replace(customizeRE, '-'))
}

export function normalizeStyle(
  value: unknown
): NormalizedStyle | string | undefined {
  const g = getGlobal()
  if (g && g.UTSJSONObject && value instanceof g.UTSJSONObject) {
    const styleObject: NormalizedStyle = {}
    g.UTSJSONObject.keys(value).forEach((key: string) => {
      styleObject[key] = (value as Record<string, any>)[key]
    })
    return vueNormalizeStyle(styleObject)
  } else if (value instanceof Map) {
    const styleObject: NormalizedStyle = {}
    value.forEach((value, key) => {
      styleObject[key] = value
    })
    return vueNormalizeStyle(styleObject)
  } else if (isString(value)) {
    return parseStringStyle(value as string)
  } else if (isArray(value)) {
    const res: NormalizedStyle = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle)
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key]
        }
      }
    }
    return res
  } else {
    return vueNormalizeStyle(value)
  }
}

export function normalizeClass(value: unknown): string {
  let res = ''
  const g = getGlobal()
  if (g && g.UTSJSONObject && value instanceof g.UTSJSONObject) {
    g.UTSJSONObject.keys(value).forEach((key: string) => {
      if ((value as Record<string, any>)[key]) {
        res += key + ' '
      }
    })
  } else if (value instanceof Map) {
    ;(value as Map<string, any>).forEach((value, key) => {
      if (value) {
        res += key + ' '
      }
    })
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + ' '
      }
    }
  } else {
    res = vueNormalizeClass(value)
  }
  return res.trim()
}

export function normalizeProps(props: Record<string, any> | null) {
  if (!props) return null
  let { class: klass, style } = props
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass)
  }
  if (style) {
    props.style = normalizeStyle(style)
  }
  return props
}
