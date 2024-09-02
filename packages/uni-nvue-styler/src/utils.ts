import type { Source, Declaration as _Declaration } from 'postcss'

export const COMBINATORS_RE =
  /^((?:(?:\.[A-Za-z0-9_\-]+)+[\+\~\> ])*)((?:\.[A-Za-z0-9_\-\:]+)+)$/

export type Declaration = _Declaration

export type TransformDecl = (decl: Declaration) => Declaration[]

export interface NormalizeOptions {
  logLevel?: 'NOTE' | 'WARNING' | 'ERROR'
  type?: 'nvue' | 'uvue'
  platform?: typeof process.env.UNI_UTS_PLATFORM
}

export type Normalize = (
  v: string | number,
  options: NormalizeOptions,
  declInfo?: {
    atRule: string
  }
) => {
  value: string | number | null
  reason?: (
    k: string,
    v: string | number,
    result: string | number | null
  ) => string
}

export const enum Restriction {
  ANGLE = 'angle', // "角度"
  BOX = 'box', // "区域"
  COLOR = 'color', // "颜色"
  ENUM = 'enum', // "枚举"
  FONT = 'font', // "字体"
  GEOMETRY_BOX = 'geometry-box', // "几何框"
  IDENTIFIER = 'identifier', // "标识符"
  IMAGE = 'image', // "图片"
  INTEGER = 'integer', // "整数"
  LENGTH = 'length', // "长度"
  LINE_STYLE = 'line-style', // "样式"
  LINE_WIDTH = 'line-width', // "长度"
  NUMBER = 'number', // "数字"
  NUMBER_0_1 = 'number(0-1)', // "数字"
  PERCENTAGE = 'percentage', // "百分比"
  POSITION = 'position', // "位置"
  PROPERTY = 'property', // "属性"
  REPEAT = 'repeat', // "重复"
  SHAPE = 'shape', // "区域大小"
  STRING = 'string', // "字符串"
  TIME = 'time', // "时间"
  TIMING_FUNCTION = 'timing-function', // "时间函数"
  UNICODE_RANGE = 'unicode-range', // "编码范围"
  URL = 'url', // "超链接"
  GRADIENT = 'gradient', // "渐变"
}

export interface UniPlatform {
  app: {
    android?: {
      osVer?: string
      uniVer?: string
      unixVer?: string
    }
    ios?: {
      osVer?: string
      uniVer?: string
      unixVer?: string
    }
  }
}

export interface PropertyValue {
  name: string
  uniPlatform?: UniPlatform
}

export interface Property {
  name: string
  shorthand?: boolean
  restrictions: Restriction[]
  values?: PropertyValue[]
  uniPlatform?: UniPlatform
  unixTags?: string[]
}

export interface CssJSON {
  version: number
  properties: Property[]
}

export function createDecl(
  prop: string,
  value: string,
  important: boolean,
  raws: Record<string, unknown>,
  source?: Source
) {
  const decl = {
    // type: 'decl',
    prop,
    value: value.toString(),
    raws,
    source,
  } as Declaration
  if (important) {
    decl.important = true
  }
  return decl
}

export const NUM_REGEXP = /^[-]?\d*\.?\d+$/
export const LENGTH_REGEXP = /^[-+]?\d*\.?\d+(\S*)$/
export const SUPPORTED_VALUES_REGEXP = /supported values are: ([^)]+)/
export const SUPPORT_CSS_UNIT = ['px', 'pt', 'wx', 'upx', 'rpx']

export const isNumber = (val: unknown): val is string => typeof val === 'number'

export const serialize = (val: unknown) => JSON.parse(JSON.stringify(val))

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as any
}

const hyphenateRE = /([A-Z])/g

export const hyphenateStyleProperty = cacheStringFunction((str: string) =>
  str
    .replace(hyphenateRE, (_, m) => {
      if (typeof m === 'string') {
        return '-' + m.toLowerCase()
      }
      return m
    })
    .toLowerCase()
)

export function autofixedReason(
  v: string | number,
  result: string | number | null
) {
  return 'NOTE: property value `' + v + '` is autofixed to `' + result + '`'
}

export function validReason(k: string, v: string | number) {
  return (
    'ERROR: property value `' +
    v +
    '` is not valid for `' +
    hyphenateStyleProperty(k) +
    '`'
  )
}

export function defaultValueReason(k: string, v: string | number) {
  return (
    'NOTE: property value `' +
    v +
    '` is the DEFAULT value for `' +
    hyphenateStyleProperty(k) +
    '` (could be removed)'
  )
}

export function supportedEnumReason(
  k: string,
  v: string | number,
  items: unknown[]
) {
  return (
    'ERROR: property value `' +
    v +
    '` is not supported for `' +
    hyphenateStyleProperty(k) +
    '` (supported values are: `' +
    items.join('`|`') +
    '`)'
  )
}

export function supportedValueWithTipsReason(
  k: string,
  v: string | number,
  tips?: string
) {
  return (
    'ERROR: property value `' +
    v +
    '` is not supported for `' +
    hyphenateStyleProperty(k) +
    '` ' +
    tips
  )
}

export function supportedUnitWithAutofixedReason(
  unit: string,
  v: string | number,
  result: string | number | null
) {
  return (
    'NOTE: unit `' +
    unit +
    '` is not supported and property value `' +
    v +
    '` is autofixed to `' +
    result +
    '`'
  )
}

export function compatibilityReason(k: string) {
  return (
    'NOTE: the ' +
    hyphenateStyleProperty(k) +
    ' property may have compatibility problem on native'
  )
}

export function supportedPropertyReason(k: string) {
  return (
    'WARNING: `' +
    hyphenateStyleProperty(k) +
    '` is not a standard property name (may not be supported)'
  )
}

export function getSupportedPlatforms(uniPlatform: UniPlatform | undefined) {
  const supportedPlatforms: string[] = []
  if (uniPlatform?.app?.android?.unixVer !== 'x') {
    supportedPlatforms.push('app-android')
  }
  if (uniPlatform?.app.ios?.unixVer !== 'x') {
    supportedPlatforms.push('app-ios')
  }
  return supportedPlatforms
}

export function normalizeReasons(
  reasons: string[],
  k: string,
  v: string | number
) {
  let enums: string[] = []
  for (let i = 0; i < reasons.length; i++) {
    const reason = reasons[i]
    if (SUPPORTED_VALUES_REGEXP.test(reason)) {
      const match = reason.match(SUPPORTED_VALUES_REGEXP)
      if (match) {
        const values = match[1]
          .split('|')
          .map((item) => item.replace(/`/g, ''))
          .filter(Boolean)
        enums.push(...values)
        reasons.splice(i, 1)
        i--
      }
    }
  }
  if (enums.length > 0) {
    enums = [...new Set(enums)]
    reasons.push(supportedEnumReason(k, v, enums))
  }
  return reasons
}
