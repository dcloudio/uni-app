import { extend, isFunction } from '@vue/shared'
import { RPT2Options } from 'rollup-plugin-typescript2'
interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  extend(options, { clean: true })
  // TODO 开发阶段禁用缓存
  // @ts-expect-error
  if (isFunction(globalThis.uts2js)) {
    // @ts-expect-error
    return globalThis.uts2js(options)
  }
  return require('../../lib/javascript/compiler').uts2js(options)
}
