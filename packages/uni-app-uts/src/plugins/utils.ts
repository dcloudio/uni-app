import path from 'node:path'
import { isAppIOSUVueNativeTag } from '@dcloudio/uni-shared'
import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  type UniViteCopyPluginOptions,
  type UniVitePlugin,
  initI18nOptions,
  injectAssetPlugin,
  matchUTSComponent,
  normalizeNodeModules,
  normalizePath,
  parseUTSComponent,
  transformTapToClick,
  transformUTSComponent,
} from '@dcloudio/uni-cli-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import type { Plugin, ResolvedConfig } from 'vite'
import { ElementTypes, NodeTypes } from '@vue/compiler-core'

export function createUniOptions(
  platform: 'android' | 'ios'
): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      const platform = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      const targets: UniViteCopyPluginOptions['targets'] = []
      // 自动化测试时，不启用隐私政策
      if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
        if (process.env.UNI_UTS_PLATFORM === 'app-android') {
          targets.push({
            src: 'androidPrivacy.json',
            dest: outputDir,
            transform(source) {
              const options = initI18nOptions(platform, inputDir, false, true)
              if (!options) {
                return
              }
              return compileI18nJsonStr(source.toString(), options)
            },
          })
        }
      }
      return {
        assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        targets,
      }
    },
    compilerOptions:
      platform === 'ios'
        ? {
            isNativeTag(tag) {
              return matchUTSComponent(tag) || isAppIOSUVueNativeTag(tag)
            },
            nodeTransforms: [
              transformTapToClick,
              transformUTSComponent,
              // TODO 合并复用安卓插件逻辑
              function (node, context) {
                if (node.type === 2) {
                  const parent = context.parent
                  if (parent && parent.type === 1 && parent.tag === 'text') {
                    // 解析文本节点转义，暂时仅处理换行
                    node.content = node.content.replace(
                      /[\\]+n/g,
                      function (match) {
                        return JSON.parse(`"${match}"`)
                      }
                    )
                  }
                }
              },
              (node) => {
                // 收集可能的 extApiComponents
                if (
                  node.type === NodeTypes.ELEMENT &&
                  node.tagType === ElementTypes.ELEMENT
                ) {
                  if (!parseUTSComponent(node.tag, 'swift')) {
                    addExtApiComponents([node.tag])
                  }
                }
              },
            ],
          }
        : {},
  }
}

export function isManifest(id: string) {
  return id.endsWith(MANIFEST_JSON_UTS)
}

export function isPages(id: string) {
  return id.endsWith(PAGES_JSON_UTS)
}

// TODO vite 升级需要考虑调整以下列表
const REMOVED_PLUGINS = [
  'vite:build-metadata',
  'vite:modulepreload-polyfill',
  // 'vite:css', // iOS replace
  'vite:esbuild',
  'vite:wasm-helper',
  'vite:worker',
  // 'vite:json',
  // 'vite:asset', // replace
  'vite:wasm-fallback',
  // 'vite:define',
  // 'vite:css-post', // iOS replace
  'vite:build-html',
  'vite:html-inline-proxy',
  'vite:worker-import-meta-url',
  'vite:asset-import-meta-url',
  'vite:force-systemjs-wrap-complete',
  'vite:watch-package-data',
  'commonjs',
  'vite:data-uri',
  'vite:dynamic-import-vars',
  'vite:import-glob',
  'vite:build-import-analysis',
  'vite:esbuild-transpile',
  'vite:terser',
  'vite:reporter',
]

export function configResolved(config: ResolvedConfig, isAndroidX = false) {
  const plugins = config.plugins as Plugin[]
  const len = plugins.length
  const removedPlugins = REMOVED_PLUGINS.slice(0)
  if (isAndroidX) {
    removedPlugins.push('vite:css')
    removedPlugins.push('vite:css-post')
  }
  for (let i = len - 1; i >= 0; i--) {
    const plugin = plugins[i]
    if (removedPlugins.includes(plugin.name)) {
      plugins.splice(i, 1)
    }
  }
  // console.log(plugins.map((p) => p.name))
  // 强制不inline
  config.build.assetsInlineLimit = 0
  injectAssetPlugin(config, { isAndroidX })
}

export function relativeInputDir(filename: string) {
  const inputDir = process.env.UNI_INPUT_DIR
  filename = normalizeNodeModules(filename)
  if (filename.startsWith(inputDir)) {
    return normalizePath(path.relative(inputDir, filename))
  }
  return filename
}

export function normalizeManifestJson(userManifestJson: Record<string, any>) {
  const app = userManifestJson.app || {}
  const x = userManifestJson['uni-app-x'] || {}
  x.compilerVersion = process.env.UNI_COMPILER_VERSION || ''
  const pageOrientation = getGlobalPageOrientation()

  if (pageOrientation) {
    if (!app.distribute) {
      app.distribute = {}
    }
    app.distribute['_uni-app-x_'] = {
      pageOrientation,
    }
  }

  return {
    id: userManifestJson.appid || '',
    name: userManifestJson.name || '',
    description: userManifestJson.description || '',
    version: {
      name: userManifestJson.versionName || '',
      code: userManifestJson.versionCode || '',
    },
    'uni-app-x': x,
    app,
  }
}

export function updateManifestModules(
  manifest: Record<string, any>,
  modules: string[]
) {
  // 执行了摇树逻辑，就需要设置 modules 节点
  const app = manifest.app
  if (!app.distribute) {
    app.distribute = {}
  }
  if (!app.distribute.modules) {
    app.distribute.modules = {}
  }
  if (modules) {
    modules.forEach((name) => {
      const value = app.distribute.modules[name]
      app.distribute.modules[name] =
        typeof value === 'object' && value !== null ? value : {}
    })
  }
  return manifest
}

let pageOrientation = ''

export function setGlobalPageOrientation(value: string) {
  pageOrientation = value
}

export function getGlobalPageOrientation() {
  return pageOrientation
}

const extApiComponents: Set<string> = new Set()
export function addExtApiComponents(components: string[]) {
  components.forEach((component) => {
    extApiComponents.add(component)
  })
}

export function getExtApiComponents() {
  return extApiComponents
}

export function uvueOutDir(platform: 'app-android' | 'app-ios') {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.uvue', platform)
}

export function tscOutDir(platform: 'app-android' | 'app-ios') {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.tsc', platform)
}
