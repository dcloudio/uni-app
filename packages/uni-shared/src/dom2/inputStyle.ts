import { normalizeRpx } from '../rpx'

// Web Vapor Input 的编译器与运行时共享原生伪元素样式协议。
export const INPUT_PLACEHOLDER_CLASS_PREFIX = 'uni-input-ph-'
export const INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX = 'uni-input-style-'
export const INPUT_PLACEHOLDER_STYLE_ATTRIBUTE = 'data-uni-input-styles'
export const INPUT_PLACEHOLDER_CLASS_LAYER = 'uni-input-placeholder-class'
export const INPUT_PLACEHOLDER_IMPORTANT_LAYER =
  'uni-input-placeholder-inline-important'
export const INPUT_PLACEHOLDER_LEGACY_CONDITION = 'not (color: revert-layer)'
export const UNI_SSR_INPUT_STYLES = '__uniInputStyles'
const customPropertyRE =
  /^--(?:[\w-]|[^\x00-\x7f]|\\(?:[\da-fA-F]{1,6}(?:\r\n|[ \t\r\n\f])?|[^\r\n\f]))+$/

export function isInputPlaceholderStyleProperty(prop: string) {
  return prop.startsWith('--')
    ? customPropertyRE.test(prop)
    : inputPlaceholderStyleProperties.has(prop)
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

export function createInputPlaceholderStyle(
  style: string | null | undefined
): InputPlaceholderStyle {
  if (!style) return emptyPlaceholderStyle
  const normal: string[] = []
  const important: string[] = []
  for (const [rawProp, value] of parseInputStyle(normalizeRpx(style))) {
    const prop = rawProp.startsWith('--') ? rawProp : rawProp.toLowerCase()
    if (!isInputPlaceholderStyleProperty(prop)) continue
    const declarations = /!\s*important\s*$/i.test(value) ? important : normal
    declarations.push(`${prop}:${value};`)
  }
  const normalCss = normal.join('')
  const importantCss = important.join('')
  const source = normalCss + importantCss
  if (!source) return emptyPlaceholderStyle

  // 服务端和客户端为相同声明生成同一个选择器。
  let hash = 2166136261
  for (let i = 0; i < source.length; i++) {
    hash = Math.imul(hash ^ source.charCodeAt(i), 16777619)
  }
  return {
    key: `${source.length.toString(36)}-${(hash >>> 0).toString(36)}`,
    normal: normalCss,
    important: importantCss,
  }
}

export function stringifyInputStyle({
  key,
  normal,
  important,
}: InputPlaceholderStyle) {
  const className = `.${INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX}${key}`
  const selector = `input:where([uni-input])${className}::placeholder`
  // 普通声明放在类样式层之外，important 声明放在最先声明的层。
  const importantRule = important
    ? `@layer ${INPUT_PLACEHOLDER_IMPORTANT_LAYER}{${selector}{${important}}}`
    : ''
  const normalRule = normal ? `${selector}{${normal}}` : ''
  // 旧浏览器没有层叠层，提高权重以覆盖常见的 scoped 类和后代占位规则。
  const legacySelector = `input[uni-input]${className.repeat(3)}::placeholder`
  const legacyRule =
    normal || important
      ? `@supports ${INPUT_PLACEHOLDER_LEGACY_CONDITION}{${legacySelector}{${normal}${important}}}`
      : ''
  const css = importantRule + normalRule + legacyRule
  // 同一序列化用于 SSR 和浏览器；防止字符串/URL 中的 </style> 提前结束 HTML。
  return css.replace(/<(?=\/style(?:[\s/>]|$))/gi, (_, offset: number) => {
    // 仅在命中闭合标签时回扫相邻反斜杠，每段反斜杠最多扫描一次。
    let start = offset
    while (start > 0 && css[start - 1] === '\\') start--
    return (offset - start) % 2 ? '3c ' : '\\3c '
  })
}

// 保留重复声明与顺序，让浏览器过滤无效值并展开 font/background/text-decoration。
function parseInputStyle(style: string): [string, string][] {
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
