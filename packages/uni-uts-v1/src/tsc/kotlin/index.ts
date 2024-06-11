import { extend, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import { createBasicUtsOptions } from '../utils/options'
interface UTS2KotlinOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  sourcemap?: boolean
  isUTSFile?: (fileName: string) => boolean
  fileName?: (fileName: string) => string
  jsCode?: (code: string) => Promise<string>
}
type uts2kotlin = (options: UTS2KotlinOptions) => import('rollup').Plugin[]

export const uts2kotlin: uts2kotlin = (options) => {
  extend(options, createBasicUtsOptions(options.inputDir))
  if (isFunction(globalThis.uts2kotlin)) {
    return globalThis.uts2kotlin(options)
  }
  return require('../../../lib/kotlin').uts2kotlin(options)
}
