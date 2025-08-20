import type { Plugin, ResolvedConfig } from 'vite'
import { hash } from '../../utils'

const emittedHashMap = new WeakMap<ResolvedConfig, Map<string, string>>()

export function uniStatsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:app-stats',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
      emittedHashMap.set(resolvedConfig, new Map<string, string>())
    },
    writeBundle(_, bundle) {
      if (resolvedConfig.isProduction) {
        // 仅dev生效
        return
      }
      const emittedHash = emittedHashMap.get(resolvedConfig)!
      const changedFiles: string[] = []
      Object.keys(bundle).forEach((filename) => {
        const outputFile = bundle[filename]
        let outputFileHash = ''
        if (outputFile.type === 'asset') {
          outputFileHash = hash(outputFile.source)
        } else {
          outputFileHash = hash(outputFile.code)
        }
        if (emittedHash.get(filename) !== outputFileHash) {
          emittedHash.set(filename, outputFileHash)
          changedFiles.push(filename)
        }
      })
      process.env.UNI_APP_CHANGED_FILES = changedFiles.length
        ? JSON.stringify(changedFiles)
        : ''
    },
  }
}
