import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs-extra'
import { hash } from '../../utils'
import { parseJson } from '../../json'
import { M } from '../../messages'

const emittedHashMap = new WeakMap<ResolvedConfig, Map<string, string>>()

export function uniStatsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  let isManifestChanged = false
  const shouldTrackManifestChange =
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_PLATFORM === 'app-harmony'

  let isVapor =
    shouldTrackManifestChange && process.env.UNI_APP_X_DOM2 === 'true'

  return {
    name: 'uni:app-stats',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
      emittedHashMap.set(resolvedConfig, new Map<string, string>())
    },
    watchChange(id) {
      if (shouldTrackManifestChange && id.endsWith('manifest.json')) {
        isManifestChanged = true
        try {
          const manifest = parseJson(
            fs.readFileSync(id, 'utf-8'),
            true,
            'manifest.json'
          )
          const uniAppX = manifest['uni-app-x'] || {}
          if (uniAppX.vapor !== isVapor) {
            isVapor = uniAppX.vapor === true
            console.warn(M['dev.watching.restart.vapor'])
          }
        } catch (e) {}
      }
    },
    writeBundle(_, bundle) {
      if (resolvedConfig.isProduction) {
        // 仅dev生效
        return
      }
      const emittedHash = emittedHashMap.get(resolvedConfig)!
      const changedFiles: string[] = []
      Object.keys(bundle).forEach((filename) => {
        // 不处理sourcemap
        if (filename.endsWith('.map')) {
          return
        }
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
      if (isManifestChanged) {
        isManifestChanged = false
        changedFiles.unshift('manifest.json')
      }
      process.env.UNI_APP_CHANGED_FILES = changedFiles.length
        ? JSON.stringify(changedFiles)
        : ''
    },
  }
}
