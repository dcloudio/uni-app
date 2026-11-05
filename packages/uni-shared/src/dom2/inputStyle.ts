import { normalizeRpx } from '../rpx'

// Web Vapor Input 的编译器与运行时共享原生伪元素样式协议。
export const INPUT_PLACEHOLDER_CLASS = 'data-uni-placeholder-class'
export const INPUT_SELECTION_CLASS = 'data-uni-selection-class'
export const INPUT_PLACEHOLDER_STYLE = 'data-uni-placeholder-style'
export const INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX = 'uni-input-style-'
export const INPUT_PLACEHOLDER_CLASS_LAYER = 'uni-input-placeholder-class'
export const INPUT_PLACEHOLDER_IMPORTANT_LAYER =
  'uni-input-placeholder-inline-important'
export const INPUT_SELECTION_PROBE = '::before'
export const INPUT_SELECTION_BACKGROUND = '--uni-input-selection-background'
export const INPUT_SELECTION_PROBE_BACKGROUND =
  '--uni-input-selection-probe-background'
export const INPUT_SELECTION_ATTRIBUTE = 'data-uni-input-selection'
export const UNI_SSR_INPUT_STYLES = '__uniInputStyles'
const customPropertyRE =
  /^--(?:[\w-]|[^\x00-\x7f]|\\(?:[\da-fA-F]{1,6}(?:\r\n|[ \t\r\n\f])?|[^\r\n\f]))+$/

export function inputStyleDeclarations(
  prop: string,
  value: string,
  selection = false
): [string, string][] {
  if (prop.startsWith('--'))
    return customPropertyRE.test(prop) ? [[prop, value]] : []
  if (selection) {
    return prop === 'background' ||
      prop === 'background-color' ||
      prop === 'color'
      ? [[prop, value]]
      : []
  }
  return inputPlaceholderStyleProperties.has(prop) ? [[prop, value]] : []
}

export interface InputPlaceholderStyle {
  readonly key: string
  readonly normal: string
  readonly important: string
}

const emptyPlaceholderStyle: InputPlaceholderStyle = Object.freeze({
  key: '',
  normal: '',
  important: '',
})
// 限制条目数和原始文本长度，避免高频动态样式或长 URL 长期占用缓存。
const placeholderStyleCacheLimit = 256
const placeholderStyleCacheMaxLength = 4096
const placeholderStyleCache = new Map<string, InputPlaceholderStyle>()

export function createInputPlaceholderStyle(
  style: string | null | undefined
): InputPlaceholderStyle {
  const raw = style ?? ''
  if (!raw) return emptyPlaceholderStyle
  const cacheable = raw.length <= placeholderStyleCacheMaxLength
  if (cacheable) {
    const cached = placeholderStyleCache.get(raw)
    if (cached) {
      placeholderStyleCache.delete(raw)
      placeholderStyleCache.set(raw, cached)
      return cached
    }
  }
  const normal: string[] = []
  const important: string[] = []
  for (const [rawProp, value] of parseInputStyle(normalizeRpx(raw))) {
    const prop = rawProp.startsWith('--') ? rawProp : rawProp.toLowerCase()
    for (const [name, normalized] of inputStyleDeclarations(prop, value)) {
      ;(/!\s*important\s*$/i.test(normalized) ? important : normal).push(
        `${name}:${normalized};`
      )
    }
  }
  const result = {
    key: '',
    normal: normal.join(''),
    important: important.join(''),
  }
  const source = result.normal + result.important
  if (source) {
    let first = 2166136261
    let second = 5381
    for (let i = 0; i < source.length; i++) {
      const code = source.charCodeAt(i)
      first = Math.imul(first ^ code, 16777619)
      second = Math.imul(second, 33) ^ code
    }
    result.key = `${source.length.toString(36)}-${(first >>> 0).toString(
      36
    )}-${(second >>> 0).toString(36)}`
  }
  const parsed = result.key ? Object.freeze(result) : emptyPlaceholderStyle
  if (cacheable) {
    placeholderStyleCache.set(raw, parsed)
    if (placeholderStyleCache.size > placeholderStyleCacheLimit) {
      placeholderStyleCache.delete(placeholderStyleCache.keys().next().value!)
    }
  }
  return parsed
}

export function stringifyInputStyles(styles: Iterable<InputPlaceholderStyle>) {
  let normal = ''
  let important = ''
  for (const style of styles) {
    const selector = `input:where([uni-input]).${INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX}${style.key}::placeholder`
    if (style.normal) normal += `${selector}{${style.normal}}`
    if (style.important) important += `${selector}{${style.important}}`
  }
  // 正常 inline 声明在 class 层之外；important inline 声明位于最先声明的层。
  // 保留原生 CSS 的无效声明过滤、简写、变量、初始值及层叠语义。
  // 伪元素没有独立的 inline 样式层；revert-layer !important 按此处的规则层回退，
  // 不承诺复刻旧 style 属性的回退行为，此组合不在兼容范围内。
  const css = `@layer ${INPUT_PLACEHOLDER_IMPORTANT_LAYER}{${important}}${normal}`
  // 同一序列化用于 SSR 和浏览器；防止字符串/URL 中的 </style> 提前结束 HTML。
  return css.replace(
    /(\\*)<(?=\/style(?:[\s/>]|$))/gi,
    (_, escapes: string) => escapes + (escapes.length % 2 ? '3c ' : '\\3c ')
  )
}

// 保留重复声明与顺序，让浏览器过滤无效值并展开 font/background/text-decoration。
export function parseInputStyle(style: string): [string, string][] {
  // 按 CSS 输入预处理归一换行，保证转义的 CRLF 仍作为一次合法续行处理。
  style = style.replace(/\r\n?|\f/g, '\n')
  const declarations: [string, string][] = []
  let part = '',
    colon = -1,
    quote = '',
    invalid = false
  const brackets: string[] = []
  const append = () => {
    if (colon >= 0 && !invalid && !quote && !brackets.length) {
      const prop = part.slice(0, colon).trim()
      const value = part.slice(colon + 1).trim()
      if (prop && (value || prop.startsWith('--')))
        declarations.push([prop, value])
    }
    part = ''
    colon = -1
    invalid = false
  }
  for (let i = 0; i < style.length; i++) {
    const ch = style[i]
    if (ch === '\\') {
      part += ch + (style[++i] || '')
      continue
    }
    if (quote) {
      if (ch === quote) quote = ''
      // 浏览器会把未转义换行解析为 bad-string。整条声明不再输出，
      // 防止其中的注释或括号被重新解释并污染共享样式表。
      else if (ch === '\n') invalid = true
    } else if (ch === '"' || ch === "'") quote = ch
    else if (ch === '/' && style[i + 1] === '*') {
      const end = style.indexOf('*/', i + 2)
      if (end < 0) break
      part += ' '
      i = end + 1
      continue
    } else if (ch === '(' || ch === '[' || ch === '{') brackets.push(ch)
    else if (ch === ')' || ch === ']' || ch === '}') {
      const opening = ch === ')' ? '(' : ch === ']' ? '[' : '{'
      if (brackets[brackets.length - 1] === opening) brackets.pop()
      else invalid = true
    } else if (!brackets.length && ch === ';') {
      append()
      continue
    } else if (!brackets.length && ch === ':' && colon < 0) colon = part.length
    part += ch
  }
  append()
  return declarations
}

const inputPlaceholderStyleProperties = new Set([
  'color',
  'opacity',
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'font-stretch',
  'font-variant',
  'font-feature-settings',
  'font-variation-settings',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-align',
  'text-indent',
  'text-transform',
  'text-shadow',
  'text-decoration',
  'text-decoration-line',
  'text-decoration-color',
  'text-decoration-style',
  'text-decoration-thickness',
  'background',
  'background-color',
  'background-image',
  'background-position',
  'background-size',
  'background-repeat',
  'background-origin',
  'background-clip',
  'background-attachment',
])
