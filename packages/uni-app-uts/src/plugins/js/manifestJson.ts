import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import {
  MANIFEST_JSON_UTS,
  parseJson,
  resolveUTSCompiler,
  validateThemeValue,
} from '@dcloudio/uni-cli-shared'
import {
  getExtApiComponents,
  isManifest,
  normalizeManifestJson,
  updateHarmonyManifestModules,
  updateManifestModules,
} from '../utils'

let outputManifestJson: Record<string, any> | undefined = undefined

const isXHarmony =
  process.env.UNI_APP_X === 'true' &&
  process.env.UNI_UTS_PLATFORM === 'app-harmony'

export function getOutputManifestJson() {
  return outputManifestJson
}

export function uniAppManifestPlugin(
  platform: 'app-ios' | 'app-harmony'
): Plugin {
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
        manifestJson = parseJson(code, false, id)
        return {
          code: `export default ${JSON.stringify(manifestJson)}`,
          map: {
            mappings: '',
          },
        }
      }
    },
    buildEnd() {
      outputManifestJson = normalizeManifestJson(platform, manifestJson)

      const manifest = outputManifestJson

      // 验证和处理主题配置
      const hasAppDefaultAppTheme = validateThemeValue(
        manifestJson.app?.defaultAppTheme
      )
      const hasDefaultAppTheme = validateThemeValue(
        manifestJson.defaultAppTheme
      )

      if (hasAppDefaultAppTheme || hasDefaultAppTheme) {
        // 记录主题配置的使用，便于调试和日志输出
        const selectedTheme = hasAppDefaultAppTheme
          ? manifestJson.app.defaultAppTheme
          : manifestJson.defaultAppTheme

        // 在开发模式下输出主题配置信息
        if (process.env.NODE_ENV === 'development') {
          console.log(`[${platform}] Using app theme: ${selectedTheme}`)
        }
      }
      if (process.env.NODE_ENV !== 'development' || isXHarmony) {
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
        const {
          parseInjectModules,
          getPluginInjectApis,
          getPluginInjectComponents,
        } = resolveUTSCompiler()
        const extApiComponents = getExtApiComponents()
        // uts 插件里使用的 ext api 和组件
        const pluginInjectApis = getPluginInjectApis()
        const pluginInjectComponents = getPluginInjectComponents()
        if (
          uniExtApis.size ||
          extApiComponents.size ||
          pluginInjectApis.length ||
          pluginInjectComponents.length
        ) {
          const modules = parseInjectModules(
            [...uniExtApis, ...pluginInjectApis],
            {},
            [...extApiComponents, ...pluginInjectComponents]
          )
          if (modules.length) {
            // 执行了摇树逻辑，就需要设置 modules 节点
            if (isXHarmony) {
              updateHarmonyManifestModules(manifest, modules)
            } else {
              updateManifestModules(platform, manifest, modules)
            }
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
