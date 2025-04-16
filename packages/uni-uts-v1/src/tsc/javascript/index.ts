import { extend, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import { createBasicUtsOptions } from '../utils/options'
interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  version: string
  modules: Record<string, any>
  sourceMap?: boolean
}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  extend(options, createBasicUtsOptions(options.inputDir, !!options.sourceMap))
  extend(options.tsconfigOverride.compilerOptions, {
    downlevelIteration: true,
  })
  if (isFunction(globalThis.uts2js)) {
    return globalThis.uts2js(options)
  }
  return require('../../../lib/javascript').uts2js(options)
}
