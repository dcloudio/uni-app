import type { Declaration, Source } from 'postcss'
import { NormalizeOptions } from './normalize'

export const COMBINATORS_RE =
  /^((?:(?:\.[A-Za-z0-9_\-]+)+[\+\~\> ])*)((?:\.[A-Za-z0-9_\-\:]+)+)$/

export type TransformDecl = (decl: Declaration) => Declaration[]

export type Normalize = (
  v: string | number,
  options: NormalizeOptions
) => {
  value: string | number | null
  reason?: (
    k: string,
    v: string | number,
    result: string | number | null
  ) => string
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
