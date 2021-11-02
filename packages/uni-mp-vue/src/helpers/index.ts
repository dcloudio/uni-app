import {
  camelize,
  extend,
  hyphenate,
  normalizeClass,
  toDisplayString,
} from '@vue/shared'
import { vOn } from './vOn'
import { vFor, VForItem } from './vFor'
import { renderSlot } from './renderSlot'
import { withScopedSlot } from './withScopedSlot'
import { stringifyStyle } from './style'

export { setupDevtoolsPlugin } from './devtools'

export const o: typeof vOn = (value) => vOn(value)
export const f: typeof vFor = (
  source: any,
  renderItem: (...args: any[]) => VForItem
) => vFor(source, renderItem)
export const r: typeof renderSlot = (name, props, key) =>
  renderSlot(name, props, key)
export const w: typeof withScopedSlot = (fn, options) =>
  withScopedSlot(fn, options)
export const s: typeof stringifyStyle = (value) => stringifyStyle(value)

export const c: typeof camelize = (str) => camelize(str)
export const e: typeof extend = (target: object, ...sources: any[]) =>
  extend(target, ...sources)
export const h: typeof hyphenate = (str) => hyphenate(str)
export const n: typeof normalizeClass = (value) => normalizeClass(value)
export const t: typeof toDisplayString = (val) => toDisplayString(val)
