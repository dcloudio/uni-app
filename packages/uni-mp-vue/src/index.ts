import plugin from './plugin'
// @ts-ignore
import { createVueApp } from '../lib/vue.runtime.esm.js'
export function createApp(rootComponent: unknown, rootProps = null) {
  rootComponent && ((rootComponent as any).mpType = 'app')
  return createVueApp(rootComponent, rootProps).use(plugin)
}
export const createSSRApp = createApp
export * from './helpers'
export { hyphenate } from '@vue/shared'
// @ts-ignore
export * from '../lib/vue.runtime.esm.js'
