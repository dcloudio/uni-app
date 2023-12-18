import path from 'node:path'
import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  UniViteCopyPluginOptions,
  UniVitePlugin,
  initI18nOptions,
  injectAssetPlugin,
  normalizeNodeModules,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import { Plugin, ResolvedConfig } from 'vite'

export function createUniOptions(): UniVitePlugin['uni'] {
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
  'vite:json',
  // 'vite:asset', // replace
  'vite:wasm-fallback',
  'vite:define',
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
