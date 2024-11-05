import {
  camelize,
  extend,
  hyphenate,
  normalizeClass,
  toDisplayString,
} from '@vue/shared'
import { vOn } from './vOn'
import { type VForItem, vFor } from './vFor'
import { renderSlot } from './renderSlot'
import { withScopedSlot } from './withScopedSlot'
import { stringifyStyle } from './style'
import { dynamicSlot } from './dynamicSlot'
import { setRef } from './ref'
import { renderProps } from './renderProps'
import { withModelModifiers } from './withModelModifiers'
import { setUniElementId, withUniElementStyle } from './uniElement'

export { setupDevtoolsPlugin } from './devtools'

export { findComponentPropsData, pruneComponentPropsCache } from './renderProps'

export const o: typeof vOn = (value, key) => vOn(value, key)
export const f: typeof vFor = (
  source: any,
  renderItem: (...args: any[]) => VForItem
) => vFor(source, renderItem)
export const d: typeof dynamicSlot = (names) => dynamicSlot(names)
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
export const p: typeof renderProps = (props) => renderProps(props)
export const sr: typeof setRef = (ref, id, opts) => setRef(ref, id, opts)
export const m: typeof withModelModifiers = (
  fn,
  modifiers,
  isComponent = false
) => withModelModifiers(fn, modifiers, isComponent)

export const j = (obj: unknown) => JSON.stringify(obj)

export const sei = setUniElementId
export const us = withUniElementStyle
