import { bundleKotlin, bundleSwift } from './api'
import { UtsBundleOptions, UtsResult, UtsTarget } from './types'

export { UtsTarget, UtsResult } from './types'

export type UtsMode = 'dev' | 'build'

export const UtsTargetExtNames = {
  [UtsTarget.KOTLIN]: 'kt',
  [UtsTarget.SWIFT]: 'swift',
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

export { parse, bundleKotlin, bundleSwift } from './api'

export function bundle(
  target: UtsTarget,
  opts: UtsBundleOptions
): Promise<UtsResult> {
  if (target === UtsTarget.KOTLIN) {
    return bundleKotlin(opts)
  } else if (target === UtsTarget.SWIFT) {
    return bundleSwift(opts)
  }
  return Promise.resolve({})
}
