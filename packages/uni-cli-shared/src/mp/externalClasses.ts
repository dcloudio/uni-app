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
import { isAppVue } from '../utils'
import { isUniPageFile } from '../json/pages'
import type { SFCStyleBlock } from '@vue/compiler-sfc'

const externalClassesCache = new Map<
  string,
  { mtime: number; classes: string[] }
>()

// 支付宝 ACSS 不支持微信小程序使用的 [class] 隔离方案，因此使用来源前缀作为隔离键。
export const ALIPAY_CLASS_MASK_APP = 1
export const ALIPAY_CLASS_MASK_PAGE = 1 << 1
export const ALIPAY_CLASS_MASK_COMPONENT = 1 << 2
export const ALIPAY_STYLE_CLASS_PREFIXES = ['-a-', '-p-', '-c-'] as const

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

export function clearMiniProgramComponentStyleIsolation(pagePahth: string) {
  pageStyleIsolationCache.delete(normalizePath(pagePahth))
}

export function isAlipayXStyleIsolation() {
  return (
    process.env.UNI_PLATFORM === 'mp-alipay' &&
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_APP_STYLE_ISOLATION_VERSION === '2'
  )
}

/**
 * 将 styleIsolation 转换为模板节点需要携带的来源 mask。
 * mask 在编译期确定，SJS 运行时只做字符串展开，避免在视图层重复判断组件配置。
 */
export function getAlipayStyleIsolationClassMask(filename: string) {
  if (isAppVue(filename)) {
    return ALIPAY_CLASS_MASK_APP
  }
  const isolation = findMiniProgramComponentStyleIsolation(filename)
  const isPage = isolation?.isPage || isUniPageFile(filename)
  const styleIsolation = isolation?.styleIsolation
  if (isPage) {
    return styleIsolation === 'isolated'
      ? ALIPAY_CLASS_MASK_PAGE
      : ALIPAY_CLASS_MASK_APP | ALIPAY_CLASS_MASK_PAGE
  }
  if (styleIsolation === 'app') {
    return ALIPAY_CLASS_MASK_APP | ALIPAY_CLASS_MASK_COMPONENT
  }
  if (styleIsolation === 'app-and-page') {
    return (
      ALIPAY_CLASS_MASK_APP |
      ALIPAY_CLASS_MASK_PAGE |
      ALIPAY_CLASS_MASK_COMPONENT
    )
  }
  return ALIPAY_CLASS_MASK_COMPONENT
}

export function isAlipayStyleIsolationClass(value: string) {
  return ALIPAY_STYLE_CLASS_PREFIXES.some((prefix) => value.startsWith(prefix))
}

/**
 * 静态 class 在编译期直接展开，避免把可提前完成的字符串处理留到 SJS 运行时。
 * 保留前缀属于支付宝隔离实现的内部协议，静态可识别的用户 class 必须及时报错。
 */
export function formatAlipayStyleIsolationClasses(
  value: string,
  mask: number,
  keepRaw = true
) {
  const result: string[] = []
  const classes = value.split(/\s+/).filter(Boolean)
  for (const clazz of classes) {
    if (isAlipayStyleIsolationClass(clazz)) {
      throw new Error(`支付宝小程序样式隔离不允许 class 使用保留前缀：${clazz}`)
    }
    // externalClass 跨组件传递时不能保留原名，否则子组件会将其误认为本地 class 再补组件前缀。
    if (keepRaw) {
      result.push(clazz)
    }
    if (mask & ALIPAY_CLASS_MASK_APP) {
      result.push('-a-' + clazz)
    }
    if (mask & ALIPAY_CLASS_MASK_PAGE) {
      result.push('-p-' + clazz)
    }
    if (mask & ALIPAY_CLASS_MASK_COMPONENT) {
      result.push('-c-' + clazz)
    }
  }
  return result.join(' ')
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
