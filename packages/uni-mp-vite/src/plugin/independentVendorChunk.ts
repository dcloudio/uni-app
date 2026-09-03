/**
 * 独立分包 npm vendor 落点。
 * 微信独立分包不能 require 主包 JS；仅当全部 importer 落在同一个独立分包根下时，
 * 才把该 npm 打进 `{root}common/vendor`，否则保持主包 common/vendor。
 */
import path from 'path'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/entry'

export namespace IndependentVendorChunk {
  export function resolveImporterFile(
    importer: string,
    inputDir: string
  ): string {
    const raw = normalizePath(importer)
    if (isUniPageUrl(raw)) {
      return normalizePath(path.resolve(inputDir, parseVirtualPagePath(raw)))
    }
    if (isUniComponentUrl(raw)) {
      return normalizePath(
        path.resolve(inputDir, parseVirtualComponentPath(raw))
      )
    }
    return raw.split('?')[0]
  }

  /**
   * 微信独立分包不能引用主包 JS。
   * 仅当全部 importer 落在同一个独立分包根下时，把 npm 打进 `{root}common/vendor`。
   */
  export function resolve(
    importers: readonly string[],
    inputDir: string,
    independentRoots: readonly string[]
  ): string | undefined {
    if (!importers.length || !independentRoots.length) {
      return
    }
    const normalizedInput = normalizePath(inputDir)
    const matched = new Set<string>()
    for (const importer of importers) {
      const file = resolveImporterFile(importer, normalizedInput)
      const root = independentRoots.find((subPackagePath) =>
        file.startsWith(`${normalizedInput}/${subPackagePath}`)
      )
      if (!root) {
        return
      }
      matched.add(root)
    }
    if (matched.size !== 1) {
      return
    }
    return `${[...matched][0]}common/vendor`
  }
}
