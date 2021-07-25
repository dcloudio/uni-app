import slash from 'slash'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createResolveId(
  options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  const inputDir = slash(options.inputDir)
  return function (id) {
    if (id.startsWith('@/')) {
      return inputDir + id.substr(1)
    } else if (id.startsWith('~@/')) {
      return inputDir + id.substr(2)
    }
  }
}
