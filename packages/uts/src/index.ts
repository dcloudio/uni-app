import { bundleArkTS, bundleKotlin, bundleSwift } from './api'
import { type UTSBundleOptions, type UTSResult, UTSTarget } from './types'

export {
  UTSTarget,
  UTSResult,
  UTSBundleOptions,
  UTSInputOptions,
  UTSOutputOptions,
  UTSParseOptions,
} from './types'

export type UTSMode = 'dev' | 'build'

export const UTSTargetExtNames = {
  [UTSTarget.KOTLIN]: 'kt',
  [UTSTarget.SWIFT]: 'swift',
  [UTSTarget.ARKTS]: 'ets',
} as const
export interface ToOptions {
  /**
   * 为 true 时，禁用日志输出，默认为 false
   */
  silent?: boolean
  input: {
    /**
     * 插件根目录
     */
    dir: string
    /**
     * 文件后缀，默认 .uts
     */
    extname?: string
  }
  output: {
    /**
     * 输出目录
     */
    dir: string
    /**
     * 包名
     */
    package?: string
    /**
     * 自动导入的包
     */
    imports?: string[]
    /**
     * 是否生成 sourceMap，为 string 时，表示生成的 sourceMap 目标目录
     */
    sourceMap?: boolean | string
    /**
     * sourceMap 中是否包含源码
     */
    inlineSourcesContent?: boolean
    extname?: string
  }
}

export {
  parse,
  toArkTS,
  toCpp,
  toCppCode,
  toKotlin,
  toSwift,
  bundleArkTS,
  bundleKotlin,
  bundleSwift,
} from './api'

export function bundle(
  target: UTSTarget,
  opts: UTSBundleOptions
): Promise<UTSResult> {
  if (target === UTSTarget.KOTLIN) {
    return bundleKotlin(opts)
  } else if (target === UTSTarget.SWIFT) {
    return bundleSwift(opts)
  } else if (target === UTSTarget.ARKTS) {
    return bundleArkTS(opts)
  }
  return Promise.resolve({})
}
