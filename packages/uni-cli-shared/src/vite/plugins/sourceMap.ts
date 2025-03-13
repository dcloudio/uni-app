import fs from 'fs-extra'
import path from 'path'
import type { OutputAsset, OutputChunk } from 'rollup'
import type { Plugin } from 'vite'

import debug from 'debug'
import crypto from 'crypto'

import { enableSourceMap, normalizePath } from '../../utils'

const debugSourceMap = debug('uni:sourcemap')

export function uniSourceMapPlugin(options: {
  sourceMapDir: string
  relativeSourceMapDir: string
}): Plugin {
  // 使用 WeakMap 存储文件内容的哈希值，避免内存泄漏
  const contentHashMap = new Map<string, string>()

  return {
    name: 'uni:sourcemap',
    enforce: 'post',
    async generateBundle(_, bundle) {
      if (!enableSourceMap()) {
        return
      }

      // 批量处理所有 sourcemap 文件
      const tasks = Object.entries(bundle)
        .filter(([file]) => file.endsWith('.js.map'))
        .map(async ([file, asset]) => {
          const source = (asset as OutputAsset).source as string
          const targetPath = path.resolve(options.sourceMapDir, file)

          // 快速计算内容哈希
          const hash = crypto
            .createHash('md5') // xxhash 比 md5 快很多
            .update(source)
            .digest('hex')

          let needsUpdate = true

          try {
            // 使用 stat 检查文件是否存在，比 pathExists 更快
            const stat = await fs.stat(targetPath)
            if (stat.isFile()) {
              const oldHash = contentHashMap.get(file)
              needsUpdate = !oldHash || oldHash !== hash
            }
          } catch {
            // 文件不存在，需要写入
            needsUpdate = true
          }

          if (needsUpdate) {
            await fs.outputFile(targetPath, source)
            contentHashMap.set(file, hash)
            debugSourceMap.enabled &&
              debugSourceMap('write sourcemap file %s', file)
          } else {
            debugSourceMap.enabled &&
              debugSourceMap('skip unchanged sourcemap file %s', file)
          }

          // 更新引用
          const jsFile = file.replace('.js.map', '.js')
          const outputChunk = bundle[jsFile] as OutputChunk
          if (outputChunk) {
            outputChunk.code = outputChunk.code.replace(
              /\/\/# sourceMappingURL=.*/,
              `//# sourceMappingURL=${normalizePath(
                path.relative(file, options.relativeSourceMapDir)
              )}/${file}`
            )
          }

          delete bundle[file]
        })

      // 使用 Promise.all 并行处理所有文件
      await Promise.all(tasks)
    },
  }
}
