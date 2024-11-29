import { isNormalCompileTarget } from '../../utils'
import type { ResolvedConfig } from 'vite'

export * from './ast'
export * from './url'
export * from './plugin'
export * from './utils'

// 内置组件css列表，h5平台需要合并进去首页css中
export const buildInCssSet = new Set<string>()

export function isCombineBuiltInCss(config: ResolvedConfig) {
  if (!isNormalCompileTarget()) {
    return false
  }
  return config.command === 'build' && config.build.cssCodeSplit
}
