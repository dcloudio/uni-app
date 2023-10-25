import { extend, isFunction } from '@vue/shared'
import { RPT2Options } from 'rollup-plugin-typescript2'
interface UTS2KotlinOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  sourcemap?: boolean
  isUTSFile?: (fileName: string) => boolean
  fileName?: (fileName: string) => string
  jsCode?: (code: string) => Promise<string>
}
type uts2kotlin = (options: UTS2KotlinOptions) => import('rollup').Plugin[]

export const uts2kotlin: uts2kotlin = (options) => {
  extend(options, { clean: true })
  // TODO 开发阶段禁用缓存
  // @ts-expect-error
  if (isFunction(globalThis.uts2kotlin)) {
    // @ts-expect-error
    return globalThis.uts2kotlin(options)
  }
  return require('../../../lib/kotlin/compiler').uts2kotlin(options)
}
