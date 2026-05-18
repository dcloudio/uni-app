import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs-extra'
import { hash } from '../../utils'
import { parseJson } from '../../json'
import { M } from '../../messages'

const emittedHashMap = new WeakMap<ResolvedConfig, Map<string, string>>()

type VaporRenderTarget = 'bytecode' | 'nativecode'

function normalizeVaporRenderTarget(
  target: unknown
): VaporRenderTarget | undefined {
  if (typeof target !== 'string') {
    return
  }
  if (target.includes('bytecode')) {
    return 'bytecode'
  }
  if (target.includes('nativecode')) {
    return 'nativecode'
  }
}

function formatVaporRenderTarget(target: VaporRenderTarget) {
  return M[`view.render.compiler.target.${target}`]
}

function getManifestVaporRenderTarget(manifest: Record<string, any>) {
  return normalizeVaporRenderTarget(
    manifest['uni-app-x']?.['vapor-render-target']
  )
}

export function uniStatsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  let isManifestChanged = false
  const shouldTrackManifestChange =
    process.env.UNI_PLATFORM === 'app' ||
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
          const vaporRenderTarget = getManifestVaporRenderTarget(manifest)
          const runtimeVaporRenderTarget = normalizeVaporRenderTarget(
            process.env.UNI_APP_X_VAPOR_RENDER_TARGET
          )
          if (
            vaporRenderTarget &&
            runtimeVaporRenderTarget &&
            vaporRenderTarget !== runtimeVaporRenderTarget
          ) {
            console.warn(
              M['dev.watching.vapor.render.target']
                .replace(
                  '{manifestTarget}',
                  formatVaporRenderTarget(vaporRenderTarget)
                )
                .replace(
                  '{runtimeTarget}',
                  formatVaporRenderTarget(runtimeVaporRenderTarget)
                )
            )
          }
          if (uniAppX.vapor !== isVapor) {
            isVapor = uniAppX.vapor === true
            console.warn(M['dev.watching.restart.vapor'])
            // 主动退出，避免后续会打印正在编译中等日志
            process.exit(0)
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
