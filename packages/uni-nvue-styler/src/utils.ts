import type { Declaration, Source } from 'postcss'

export type TransformDecl = (decl: Declaration) => Declaration[]

export type Normalize = (v: string | number) => {
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
  return {
    type: 'decl',
    prop,
    value: value + (important ? ' !important' : ''),
    raws,
    source,
  } as Declaration
}

export const NUM_REGEXP = /^[-]?\d*\.?\d+$/
export const LENGTH_REGEXP = /^[-+]?\d*\.?\d+(\S*)$/
export const SUPPORT_CSS_UNIT = ['px', 'pt', 'wx', 'upx', 'rpx']

export const extend = Object.assign
export const isArray = Array.isArray
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is string => typeof val === 'number'
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const serialize = (val: unknown) => JSON.parse(JSON.stringify(val))

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as any
}

const camelizeRE = /-(\w)/g
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateRE = /([A-Z])/g
export const hyphenate = cacheStringFunction((str: string) =>
  str
    .replace(hyphenateRE, (_, m) => {
      if (typeof m === 'string') {
        return '-' + m.toLowerCase()
      }
      return m
    })
    .toLowerCase()
)
