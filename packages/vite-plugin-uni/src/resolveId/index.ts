import type { Plugin } from 'vite'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'

export function createResolveId(
  options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  const inputDir = normalizePath(options.inputDir)
  return function (id) {
    if (id.startsWith('@/')) {
      return inputDir + id.slice(1)
    } else if (id.startsWith('~@/')) {
      return inputDir + id.slice(2)
    }
  }
}
