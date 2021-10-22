import plugin from './plugin'
// @ts-ignore
import { createVueApp } from '../lib/vue.runtime.esm.js'
export function createApp(rootComponent: unknown, rootProps = null) {
  rootComponent && ((rootComponent as any).mpType = 'app')
  return createVueApp(rootComponent, rootProps).use(plugin)
}
export const createSSRApp = createApp
export {
  vOn as o,
  vFor as f,
  stringifyStyle as s,
  setupDevtoolsPlugin,
} from './helpers'
export {
  camelize as c,
  extend as e,
  hyphenate as h,
  normalizeClass as n,
  toDisplayString as t,
} from '@vue/shared'
// @ts-ignore
export * from '../lib/vue.runtime.esm.js'
