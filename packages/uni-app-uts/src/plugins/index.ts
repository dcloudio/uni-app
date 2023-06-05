import path from 'path'
import fs from 'fs-extra'
import {
  UniViteCopyPluginOptions,
  UniVitePlugin,
  emptyDir,
  initI18nOptions,
  normalizeNodeModules,
  normalizePath,
  parseManifestJsonOnce,
  parseVueRequest,
  resolveMainPathOnce,
  resolveUTSCompiler,
  utsPlugins,
} from '@dcloudio/uni-cli-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import type { Plugin } from 'vite'
import { parseImports, uvueOutDir } from './utils'

const REMOVED_PLUGINS = [
  'vite:build-metadata',
  'vite:modulepreload-polyfill',
  'vite:css',
  'vite:esbuild',
  'vite:json',
  'vite:wasm-helper',
  'vite:worker',
  'vite:asset',
  'vite:wasm-fallback',
  'vite:define',
  'vite:css-post',
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

export function uniAppUTSPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const mainUTS = resolveMainPathOnce(inputDir)
  const tempOutputDir = uvueOutDir()
  const manifestJson = parseManifestJsonOnce(inputDir)

  // 开始编译时，清空输出目录
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  emptyOutDir()
  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions(),
    config() {
      return {
        base: '/', // 强制 base
        build: {
          outDir: tempOutputDir,
          lib: {
            // 必须使用 lib 模式
            fileName: 'output',
            entry: resolveMainPathOnce(inputDir),
            formats: ['cjs'],
          },
          rollupOptions: {
            external(source) {
              if (['vue', 'vuex', 'pinia'].includes(source)) {
                return true
              }
              // 相对目录
              if (source.startsWith('@/') || source.startsWith('.')) {
                return false
              }
              if (path.isAbsolute(source)) {
                return false
              }
              // android 系统库，三方库
              if (source.includes('.')) {
                return true
              }
              return false
            },
          },
        },
      }
    },
    configResolved(config) {
      const plugins = config.plugins as Plugin[]
      const len = plugins.length
      for (let i = len - 1; i >= 0; i--) {
        const plugin = plugins[i]
        if (REMOVED_PLUGINS.includes(plugin.name)) {
          plugins.splice(i, 1)
        }
      }
    },
    async transform(code, id) {
      const { filename } = parseVueRequest(id)
      if (!filename.endsWith('.uts')) {
        return
      }
      // 仅处理 uts 文件
      // 忽略 uni-app-uts/lib/automator/index.uts
      if (!filename.includes('uni-app-uts')) {
        const isMainUTS = normalizePath(id) === mainUTS
        const fileName = path.relative(inputDir, id)
        this.emitFile({
          type: 'asset',
          fileName: normalizeFilename(fileName, isMainUTS),
          source: normalizeCode(code, isMainUTS),
        })
      }
      code = await parseImports(code)
      return code
    },
    async writeBundle() {
      const res = await resolveUTSCompiler().compileApp(
        path.join(tempOutputDir, 'index.uts'),
        {
          inputDir: tempOutputDir,
          outputDir: outputDir,
          package: 'uni.' + (manifestJson.appid || '').replace(/_/g, ''),
          sourceMap: true,
          uni_modules: [...utsPlugins],
        }
      )
      if (res) {
        const files: string[] = []
        if (process.env.UNI_APP_UTS_CHANGED_FILES) {
          try {
            files.push(...JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES))
          } catch (e) {}
        }
        if (res.changed && res.changed.length) {
          files.push(...res.changed)
        }
        process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([
          ...new Set(files),
        ])
      }
    },
  }
}

function normalizeFilename(filename: string, isMain = false) {
  if (isMain) {
    return 'index.uts'
  }
  return normalizeNodeModules(filename)
}

function normalizeCode(code: string, isMain = false) {
  if (!isMain) {
    return code
  }
  const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT
    ? 'initAutomator();'
    : ''
  return `
${code}  
export function main(app: IApp) {
    defineAppConfig();
    definePageRoutes();
    ${automatorCode}
    (createApp()['app'] as VueApp).mount(app);
}
`
}

function createUniOptions(): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      const platform = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      const targets: UniViteCopyPluginOptions['targets'] = []
      // 自动化测试时，不启用隐私政策
      if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
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
        const debugFilename = '__nvue_debug__'
        if (fs.existsSync(path.resolve(inputDir, debugFilename))) {
          targets.push({
            src: debugFilename,
            dest: outputDir,
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
