import type { Declaration, Source } from 'postcss'
import { hasOwn } from '@vue/shared'

export const COMBINATORS_RE =
  /^((?:(?:\.[A-Za-z0-9_\-]+)+[\+\~\> ])*)((?:\.[A-Za-z0-9_\-\:]+)+)$/

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
    harmony?: {
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
    type: 'decl',
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
  if (uniPlatform?.app.harmony?.unixVer !== 'x') {
    supportedPlatforms.push('app-harmony')
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

// http://www.w3.org/TR/css3-color/#svg-color
export const EXTENDED_COLOR_KEYWORDS: Record<string, string> = {
  aliceblue: '#F0F8FF',
  antiquewhite: '#FAEBD7',
  aqua: '#00FFFF',
  aquamarine: '#7FFFD4',
  azure: '#F0FFFF',
  beige: '#F5F5DC',
  bisque: '#FFE4C4',
  black: '#000000',
  blanchedalmond: '#FFEBCD',
  blue: '#0000FF',
  blueviolet: '#8A2BE2',
  brown: '#A52A2A',
  burlywood: '#DEB887',
  cadetblue: '#5F9EA0',
  chartreuse: '#7FFF00',
  chocolate: '#D2691E',
  coral: '#FF7F50',
  cornflowerblue: '#6495ED',
  cornsilk: '#FFF8DC',
  crimson: '#DC143C',
  cyan: '#00FFFF',
  darkblue: '#00008B',
  darkcyan: '#008B8B',
  darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9',
  darkgreen: '#006400',
  darkgrey: '#A9A9A9',
  darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B',
  darkolivegreen: '#556B2F',
  darkorange: '#FF8C00',
  darkorchid: '#9932CC',
  darkred: '#8B0000',
  darksalmon: '#E9967A',
  darkseagreen: '#8FBC8F',
  darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F',
  darkslategrey: '#2F4F4F',
  darkturquoise: '#00CED1',
  darkviolet: '#9400D3',
  deeppink: '#FF1493',
  deepskyblue: '#00BFFF',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1E90FF',
  firebrick: '#B22222',
  floralwhite: '#FFFAF0',
  forestgreen: '#228B22',
  fuchsia: '#FF00FF',
  gainsboro: '#DCDCDC',
  ghostwhite: '#F8F8FF',
  gold: '#FFD700',
  goldenrod: '#DAA520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#ADFF2F',
  grey: '#808080',
  honeydew: '#F0FFF0',
  hotpink: '#FF69B4',
  indianred: '#CD5C5C',
  indigo: '#4B0082',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavender: '#E6E6FA',
  lavenderblush: '#FFF0F5',
  lawngreen: '#7CFC00',
  lemonchiffon: '#FFFACD',
  lightblue: '#ADD8E6',
  lightcoral: '#F08080',
  lightcyan: '#E0FFFF',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#D3D3D3',
  lightgreen: '#90EE90',
  lightgrey: '#D3D3D3',
  lightpink: '#FFB6C1',
  lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA',
  lightskyblue: '#87CEFA',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#B0C4DE',
  lightyellow: '#FFFFE0',
  lime: '#00FF00',
  limegreen: '#32CD32',
  linen: '#FAF0E6',
  magenta: '#FF00FF',
  maroon: '#800000',
  mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE',
  mediumspringgreen: '#00FA9A',
  mediumturquoise: '#48D1CC',
  mediumvioletred: '#C71585',
  midnightblue: '#191970',
  mintcream: '#F5FFFA',
  mistyrose: '#FFE4E1',
  moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD',
  navy: '#000080',
  oldlace: '#FDF5E6',
  olive: '#808000',
  olivedrab: '#6B8E23',
  orange: '#FFA500',
  orangered: '#FF4500',
  orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA',
  palegreen: '#98FB98',
  paleturquoise: '#AFEEEE',
  palevioletred: '#DB7093',
  papayawhip: '#FFEFD5',
  peachpuff: '#FFDAB9',
  peru: '#CD853F',
  pink: '#FFC0CB',
  plum: '#DDA0DD',
  powderblue: '#B0E0E6',
  purple: '#800080',
  red: '#FF0000',
  rosybrown: '#BC8F8F',
  royalblue: '#4169E1',
  saddlebrown: '#8B4513',
  salmon: '#FA8072',
  sandybrown: '#F4A460',
  seagreen: '#2E8B57',
  seashell: '#FFF5EE',
  sienna: '#A0522D',
  silver: '#C0C0C0',
  skyblue: '#87CEEB',
  slateblue: '#6A5ACD',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#FFFAFA',
  springgreen: '#00FF7F',
  steelblue: '#4682B4',
  tan: '#D2B48C',
  teal: '#008080',
  thistle: '#D8BFD8',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  wheat: '#F5DEB3',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
  yellow: '#FFFF00',
  yellowgreen: '#9ACD32',
}
// from uni-api/ canvas
export function checkColor(e: string | undefined) {
  // 其他开发者适配的echarts会传入一个undefined到这里
  e = e || '#000000'
  let t: RegExpExecArray | null = null
  if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
    const n = parseInt(t[1].slice(0, 2), 16)
    const o = parseInt(t[1].slice(2, 4), 16)
    const r = parseInt(t[1].slice(4), 16)
    return [n, o, r, 255]
  }
  if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
    let n: string | number = t[1].slice(0, 1)
    let o: string | number = t[1].slice(1, 2)
    let r: string | number = t[1].slice(2, 3)
    n = parseInt(n + n, 16)
    o = parseInt(o + o, 16)
    r = parseInt(r + r, 16)
    return [n, o, r, 255]
  }
  if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
    return t[1]
      .split(',')
      .map(function (e) {
        return Math.min(255, parseInt(e.trim()))
      })
      .concat(255)
  }
  if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e, t) {
      return t === 3
        ? Math.floor(255 * parseFloat(e.trim()))
        : Math.min(255, parseInt(e.trim()))
    })
  }
  var i = e.toLowerCase()
  if (hasOwn(EXTENDED_COLOR_KEYWORDS, i)) {
    t = /^#([0-9|A-F|a-f]{6,8})$/.exec(EXTENDED_COLOR_KEYWORDS[i])
    const n = parseInt(t![1].slice(0, 2), 16)
    const o = parseInt(t![1].slice(2, 4), 16)
    const r = parseInt(t![1].slice(4, 6), 16)
    let a = parseInt(t![1].slice(6, 8), 16)
    a = a >= 0 ? a : 255
    return [n, o, r, a]
  }
  console.error('unsupported color:' + e)
  return [0, 0, 0, 255]
}
