import {
  type Node,
  type Program,
  isArrayExpression,
  isIdentifier,
  isObjectProperty,
  isStringLiteral,
} from '@babel/types'
import { walk } from 'estree-walker'
import { normalizePath } from '../utils'
import type { SFCStyleBlock } from '@vue/compiler-sfc'

const externalClassesCache = new Map<
  string,
  { mtime: number; classes: string[] }
>()

/**
 * 页面使用的 externalClasses 信息
 * - staticClasses: 静态绑定的 class 值集合，如 my-class="foo" 中的 "foo"
 * - hasDynamic: 是否存在动态绑定，如 :my-class="bar"
 * - hasAppAndPageStyle: 是否存在 styleIsolation: 'app-and-page'
 */
export interface PageExternalClassesInfo {
  staticClasses: Set<string>
  hasDynamic: boolean
  hasAppAndPageStyle?: boolean
}

export type StyleIsolation = 'isolated' | 'app' | 'app-and-page'

const pageStyleIsolationCache = new Map<
  string,
  {
    styleIsolation: StyleIsolation
    isPage: boolean
  }
>()

const pageExternalClassesCache = new Map<string, PageExternalClassesInfo>()

export function findPageExternalClasses(filename: string) {
  return pageExternalClassesCache.get(normalizePath(filename))
}

export function updatePageExternalClasses(
  filename: string,
  info: PageExternalClassesInfo
) {
  pageExternalClassesCache.set(normalizePath(filename), info)
}

export function addPageExternalClasses(
  filename: string,
  staticClasses: string[],
  hasDynamic: boolean,
  hasAppAndPageStyle?: boolean
) {
  const normalizedFilename = normalizePath(filename)
  let info = pageExternalClassesCache.get(normalizedFilename)
  if (!info) {
    info = { staticClasses: new Set(), hasDynamic: false }
    pageExternalClassesCache.set(normalizedFilename, info)
  }
  staticClasses.forEach((cls) => info!.staticClasses.add(cls))
  if (hasDynamic) {
    info.hasDynamic = true
  }
  if (hasAppAndPageStyle) {
    info.hasAppAndPageStyle = true
  }
}

export function clearPageExternalClasses(filename: string) {
  pageExternalClassesCache.delete(normalizePath(filename))
}

export function hasExternalClasses(code: string) {
  return code.includes('externalClasses')
}

export function findMiniProgramComponentExternalClasses(filename: string) {
  return externalClassesCache.get(normalizePath(filename))
}

export function updateMiniProgramComponentExternalClasses(
  filename: string,
  value: { mtime: number; classes: string[] }
) {
  externalClassesCache.set(normalizePath(filename), value)
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

export function parseStyleIsolation(ast: Program): StyleIsolation | '' {
  let styleIsolationValue: StyleIsolation | '' = ''
  ;(walk as any)(ast, {
    enter(child: Node, parent: Node) {
      if (!isIdentifier(child) || child.name !== 'styleIsolation') {
        return
      }
      if (!isObjectProperty(parent)) {
        return
      }
      if (!isStringLiteral(parent.value)) {
        return
      }
      if (
        parent.value.value === 'app' ||
        parent.value.value === 'app-and-page' ||
        parent.value.value === 'isolated'
      ) {
        styleIsolationValue = parent.value.value
      }
      return parent.value.value
    },
  })
  return styleIsolationValue
}

/**
 * 目前只有小程序平台才会走这个逻辑
 * @param pagePahth
 * @param value
 * @param isPage
 */
export function updateMiniProgramComponentStyleIsolation(
  pagePahth: string,
  value: StyleIsolation,
  isPage = false
) {
  pageStyleIsolationCache.set(normalizePath(pagePahth), {
    styleIsolation: value,
    isPage,
  })
}

export function findMiniProgramComponentStyleIsolation(pagePahth: string) {
  return pageStyleIsolationCache.get(normalizePath(pagePahth))
}

export function createDefaultSFCStyleBlock(source: string): SFCStyleBlock {
  const offset = source.length
  return {
    type: 'style',
    content: '',
    attrs: {},
    loc: {
      source: '',
      start: { line: 1, column: 1, offset },
      end: { line: 1, column: 1, offset },
    },
  }
}
