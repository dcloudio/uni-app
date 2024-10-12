import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import {
  MANIFEST_JSON_UTS,
  parseJson,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'
import {
  getExtApiComponents,
  isManifest,
  normalizeManifestJson,
  updateManifestModules,
} from '../utils'

let outputManifestJson: Record<string, any> | undefined = undefined

export function getOutputManifestJson() {
  return outputManifestJson
}

export function uniAppManifestPlugin(): Plugin {
  const manifestJsonPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    'manifest.json'
  )
  const manifestJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    MANIFEST_JSON_UTS
  )
  let manifestJson: Record<string, any> = {}
  return {
    name: 'uni:app-manifest',
    apply: 'build',
    resolveId(id) {
      if (isManifest(id)) {
        return manifestJsonUTSPath
      }
    },
    load(id) {
      if (isManifest(id)) {
        return fs.readFileSync(manifestJsonPath, 'utf8')
      }
    },
    transform(code, id) {
      if (isManifest(id)) {
        this.addWatchFile(
          path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
        )
        manifestJson = parseJson(code)
        return {
          code: `export default ${JSON.stringify(manifestJson)}`,
          map: {
            mappings: '',
          },
        }
      }
    },
    buildEnd() {
      outputManifestJson = normalizeManifestJson(manifestJson)

      const manifest = outputManifestJson
      if (process.env.NODE_ENV !== 'development') {
        // 生产模式，记录使用到的modules
        const ids = Array.from(this.getModuleIds())
        const uniExtApis = new Set<string>()
        ids.forEach((id) => {
          const moduleInfo = this.getModuleInfo(id)
          if (
            moduleInfo &&
            moduleInfo.meta &&
            Array.isArray(moduleInfo.meta.uniExtApis)
          ) {
            moduleInfo.meta.uniExtApis.forEach((api) => {
              uniExtApis.add(api)
            })
          }
        })
        const extApiComponents = getExtApiComponents()
        if (uniExtApis.size || extApiComponents.size) {
          const modules = resolveUTSCompiler().parseInjectModules(
            [...uniExtApis],
            {},
            [...extApiComponents]
          )
          if (modules.length) {
            // 执行了摇树逻辑，就需要设置 modules 节点
            updateManifestModules(manifest, modules)
          }
        }
      }

      fs.outputFileSync(
        path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
      )
    },
  }
}
