import {
  type Node,
  type Program,
  isArrayExpression,
  isIdentifier,
  isObjectProperty,
  isStringLiteral,
} from '@babel/types'
import { walk } from 'estree-walker'

const externalClassesCache = new Map<
  string,
  { mtime: number; classes: string[] }
>()

/**
 * 页面使用的 externalClasses 信息
 * - staticClasses: 静态绑定的 class 值集合，如 my-class="foo" 中的 "foo"
 * - hasDynamic: 是否存在动态绑定，如 :my-class="bar"
 */
export interface PageExternalClassesInfo {
  staticClasses: Set<string>
  hasDynamic: boolean
}

const pageExternalClassesCache = new Map<string, PageExternalClassesInfo>()

export function findPageExternalClasses(filename: string) {
  return pageExternalClassesCache.get(filename)
}

export function updatePageExternalClasses(
  filename: string,
  info: PageExternalClassesInfo
) {
  pageExternalClassesCache.set(filename, info)
}

export function addPageExternalClasses(
  filename: string,
  staticClasses: string[],
  hasDynamic: boolean
) {
  let info = pageExternalClassesCache.get(filename)
  if (!info) {
    info = { staticClasses: new Set(), hasDynamic: false }
    pageExternalClassesCache.set(filename, info)
  }
  staticClasses.forEach((cls) => info!.staticClasses.add(cls))
  if (hasDynamic) {
    info.hasDynamic = true
  }
}

export function clearPageExternalClasses(filename: string) {
  pageExternalClassesCache.delete(filename)
}

export function hasExternalClasses(code: string) {
  return code.includes('externalClasses')
}

export function findMiniProgramComponentExternalClasses(filename: string) {
  return externalClassesCache.get(filename)
}

export function updateMiniProgramComponentExternalClasses(
  filename: string,
  value: { mtime: number; classes: string[] }
) {
  externalClassesCache.set(filename, value)
}

export function parseExternalClasses(ast: Program) {
  const classes: string[] = []
  ;(walk as any)(ast, {
    enter(child: Node, parent: Node) {
      if (!isIdentifier(child) || child.name !== 'externalClasses') {
        return
      }
      // export default { externalClasses: ['my-class'] }
      if (!isObjectProperty(parent)) {
        return
      }
      if (!isArrayExpression(parent.value)) {
        return
      }
      parent.value.elements.forEach((element) => {
        if (isStringLiteral(element)) {
          classes.push(element.value)
        }
      })
    },
  })
  return classes
}
