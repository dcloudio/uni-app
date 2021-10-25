import { isArray, isObject, isString } from '@vue/shared'
import { warn } from 'vue'

export type VForItem = Record<string, unknown>

/**
 * v-for string
 * @private
 */
export function vFor(
  source: string,
  renderItem: (value: string, index: number) => VForItem
): VForItem[]

/**
 * v-for number
 */
export function vFor(
  source: number,
  renderItem: (value: number, index: number) => VForItem
): VForItem[]

/**
 * v-for array
 */
export function vFor<T>(
  source: T[],
  renderItem: (value: T, index: number) => VForItem
): VForItem[]

/**
 * v-for iterable
 */
export function vFor<T>(
  source: Iterable<T>,
  renderItem: (value: T, index: number) => VForItem
): VForItem[]

/**
 * v-for object
 */
export function vFor<T>(
  source: T,
  renderItem: <K extends keyof T>(
    value: T[K],
    key: K,
    index: number
  ) => VForItem
): VForItem[]

/**
 * Actual implementation
 */
export function vFor(
  source: any,
  renderItem: (...args: any[]) => VForItem
): VForItem[] {
  let ret: VForItem[]
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length)
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i)
    }
  } else if (typeof source === 'number') {
    if (__DEV__ && !Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`)
      return []
    }
    ret = new Array(source)
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i)
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator as any]) {
      ret = Array.from(source as Iterable<any>, (item, i) =>
        renderItem(item, i, i)
      )
    } else {
      const keys = Object.keys(source)
      ret = new Array(keys.length)
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        ret[i] = renderItem(source[key], key, i)
      }
    }
  } else {
    ret = []
  }

  return ret
}
