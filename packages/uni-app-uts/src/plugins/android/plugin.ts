import path from 'path'
import fs from 'fs-extra'
import type { ResolvedConfig } from 'vite'
import { extend, isString } from '@vue/shared'
import type { ChangeEvent, OutputBundle, PluginContext } from 'rollup'
import {
  type UniVitePlugin,
  buildUniExtApis,
  createUniXCompilerOnce,
  emptyDir,
  formatExtApiProviderName,
  getCurrentCompiledUTSPlugins,
  getUTSComponentAutoImports,
  getUTSEasyComAutoImports,
  getUniExtApiProviderRegisters,
  normalizeEmitAssetFileName,
  normalizePath,
  parseManifestJsonOnce,
  parseUniExtApiNamespacesOnce,
  parseUniModulesArtifacts,
  parseVueRequest,
  resolveMainPathOnce,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'
import {
  DEFAULT_APPID,
  UVUE_CLASS_NAME_PREFIX,
  createTryResolve,
  getUniCloudObjectInfo,
  getUniCloudSpaceList,
  parseImports,
  parseUTSRelativeFilename,
  transformAutoImport,
  transformUniCloudMixinDataCom,
  tscOutDir,
  uvueOutDir,
} from './utils'
import { getOutputManifestJson } from './manifestJson'
import {
  configResolved,
  createUniOptions,
  getExtApiComponents,
  updateManifestModules,
} from '../utils'

import { genClassName } from '../..'

const uniCloudSpaceList = getUniCloudSpaceList()

let isFirst = true
export function uniAppPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const uniModulesDir = normalizePath(path.resolve(inputDir, 'uni_modules'))
  const mainUTS = resolveMainPathOnce(inputDir)
  const uvueOutputDir = uvueOutDir()
  const tscOutputDir = tscOutDir()

  const manifestJson = parseManifestJsonOnce(inputDir)
  // 预留一个口子，方便切换测试
  const split = manifestJson['uni-app-x']?.split
  // 开始编译时，清空输出目录
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  emptyOutDir()
  function emptyUVueDir() {
    if (fs.existsSync(uvueOutputDir)) {
      emptyDir(uvueOutputDir)
    }
  }
  emptyUVueDir()
  function emptyTscDir() {
    if (fs.existsSync(tscOutputDir)) {
      emptyDir(tscOutputDir)
    }
  }
  emptyTscDir()

  let resolvedConfig: ResolvedConfig

  const uniXCompiler =
    process.env.UNI_APP_X_TSC === 'true' ? createUniXCompilerOnce() : null
  const changedFiles: { fileName: string; event: ChangeEvent }[] = []

  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions('android'),
    config() {
      return {
        base: '/', // 强制 base
        build: {
          // 手动清理
          emptyOutDir: false,
          outDir:
            process.env.UNI_APP_X_TSC === 'true' ? tscOutputDir : uvueOutputDir,
          lib: {
            // 必须使用 lib 模式
            fileName: 'output',
            entry: resolveMainPathOnce(inputDir),
            formats: ['cjs'],
          },
          rollupOptions: {
            external(source) {
              if (
                ['vue', 'vuex', 'pinia', '@dcloudio/uni-app'].includes(source)
              ) {
                return true
              }
              // 相对目录
              if (source.startsWith('@/') || source.startsWith('.')) {
                return false
              }
              if (path.isAbsolute(source)) {
                return false
              }
              // android 系统库，三方库，iOS 的库呢？一般不包含.
              if (source.includes('.')) {
                return true
              }
              return false
            },
            output: {
              chunkFileNames(chunk) {
                // if (chunk.isDynamicEntry && chunk.facadeModuleId) {
                //   const { filename } = parseVueRequest(chunk.facadeModuleId)
                //   if (filename.endsWith('.nvue')) {
                //     return (
                //       removeExt(
                //         normalizePath(path.relative(inputDir, filename))
                //       ) + '.js'
                //     )
                //   }
                // }
                return '[name].js'
              },
            },
          },
        },
      }
    },
    async configResolved(config) {
      configResolved(config, true)
      resolvedConfig = config
      if (uniXCompiler) {
        await uniXCompiler.init()
      }
    },
    async transform(code, id) {
      const { filename } = parseVueRequest(id)
      if (!filename.endsWith('.uts') && !filename.endsWith('.ts')) {
        if (filename.endsWith('.json')) {
          this.emitFile({
            type: 'asset',
            fileName: normalizeEmitAssetFileName(normalizeFilename(id, false)),
            source: code,
          })
        }
        return
      }
      // 仅处理 uts 文件
      // 忽略 uni-app-uts/lib/automator/index.uts
      if (!filename.includes('uni-app-uts')) {
        code = (
          await transformAutoImport(transformUniCloudMixinDataCom(code), id)
        ).code
        const isMainUTS = normalizePath(id) === mainUTS
        this.emitFile({
          type: 'asset',
          fileName: normalizeEmitAssetFileName(
            normalizeFilename(id, isMainUTS)
          ),
          source: normalizeCode(code, isMainUTS),
        })
      }
      code = await parseImports(
        code,
        createTryResolve(id, this.resolve.bind(this))
      )
      return code
    },
    generateBundle(_, bundle) {
      if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
        return
      }
      // 开发者仅在 script 中引入了 easyCom 类型，但模板里边没用到，此时额外生成一个辅助的.uvue文件
      // checkUTSEasyComAutoImports(inputDir, bundle, this)
    },
    watchChange(fileName, change) {
      if (uniXCompiler) {
        // watcher && watcher.watch(3000)
        fileName = normalizePath(fileName)
        if (fileName.startsWith(uniModulesDir)) {
          // 忽略uni_modules uts原生插件中的文件
          const plugin = fileName.slice(uniModulesDir.length + 1).split('/')[0]
          if (getCurrentCompiledUTSPlugins().has(plugin)) {
            return
          }
        }
        changedFiles.push({ fileName, event: change.event })
      }
    },
    async writeBundle() {
      if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
        return
      }
      if (uniXCompiler) {
        if (changedFiles.length) {
          const files = changedFiles.splice(0)
          await uniXCompiler.invalidate(files)
        } else if (isFirst) {
          await uniXCompiler.addRootFile(path.join(tscOutputDir, 'main.uts.ts'))
        }
      }
      let pageCount = 0
      if (isFirst) {
        isFirst = false
        // 自动化测试时，不显示页面数量进度条
        if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
          pageCount = parseInt(process.env.UNI_APP_X_PAGE_COUNT) || 0
        }
      }
      // x 上暂时编译所有uni ext api，不管代码里是否调用了
      await buildUniExtApis()
      const uniCloudObjectInfo = getUniCloudObjectInfo(uniCloudSpaceList)
      if (uniCloudObjectInfo.length > 0) {
        process.env.UNI_APP_X_UNICLOUD_OBJECT = 'true'
      } else {
        process.env.UNI_APP_X_UNICLOUD_OBJECT = 'false'
      }
      const { compileApp } = resolveUTSCompiler()
      const res = await compileApp(path.join(uvueOutputDir, 'main.uts'), {
        pageCount,
        uniCloudObjectInfo,
        split: split !== false,
        disableSplitManifest: process.env.NODE_ENV !== 'development',
        inputDir: uvueOutputDir,
        outputDir: outputDir,
        package:
          'uni.' + (manifestJson.appid || DEFAULT_APPID).replace(/_/g, ''),
        sourceMap:
          process.env.NODE_ENV === 'development' &&
          process.env.UNI_COMPILE_TARGET !== 'uni_modules',
        uni_modules: [...getCurrentCompiledUTSPlugins()],
        extApis: parseUniExtApiNamespacesOnce(
          process.env.UNI_UTS_PLATFORM,
          process.env.UNI_UTS_TARGET_LANGUAGE
        ),
        extApiComponents: [...getExtApiComponents()],
        uvueClassNamePrefix: UVUE_CLASS_NAME_PREFIX,
        autoImports: initAutoImports(),
        extApiProviders: parseUniExtApiProviders(manifestJson),
        uniModulesArtifacts: parseUniModulesArtifacts(),
        env: parseProcessEnv(resolvedConfig),
      })
      if (res) {
        if (process.env.NODE_ENV === 'development') {
          const files: string[] = []
          if (process.env.UNI_APP_UTS_CHANGED_FILES) {
            try {
              files.push(...JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES))
            } catch (e) {}
          }
          if (res.changed) {
            // 触发了kotlinc编译，且没有编译成功
            if (!res.changed.length && res.kotlinc) {
              throw new Error('编译失败')
            }
            files.push(...res.changed)
          }
          process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([
            ...new Set(files),
          ])
        } else {
          // 生产环境，记录使用到的modules
          const modules = res.inject_modules
          const manifest = getOutputManifestJson()!
          if (manifest) {
            // 执行了摇树逻辑，就需要设置 modules 节点
            updateManifestModules(manifest, modules)
            fs.outputFileSync(
              path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'),
              JSON.stringify(manifest, null, 2)
            )
          }
        }
      }
    },
  }
}

function initAutoImports() {
  const utsComponents = getUTSComponentAutoImports()
  const autoImports: Record<string, [[string, string?]]> = {}
  Object.keys(utsComponents).forEach((source) => {
    if (autoImports[source]) {
      autoImports[source].push(...utsComponents[source])
    } else {
      autoImports[source] = utsComponents[source]
    }
  })
  return autoImports
}

function normalizeFilename(filename: string, isMain = false) {
  if (isMain) {
    return 'main.uts'
  }
  return parseUTSRelativeFilename(filename, process.env.UNI_INPUT_DIR)
}

function normalizeCode(code: string, isMain = false) {
  if (!isMain) {
    return code
  }
  const automatorCode =
    process.env.UNI_AUTOMATOR_WS_ENDPOINT &&
    process.env.UNI_AUTOMATOR_APP_WEBVIEW !== 'true'
      ? 'initAutomator();'
      : ''
  return `${code}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    ${automatorCode}
    (createApp()['app'] as VueApp).mount(app);
}
`
}

// @ts-expect-error
function _checkUTSEasyComAutoImports(
  inputDir: string,
  bundle: OutputBundle,
  ctx: PluginContext
) {
  const res = getUTSEasyComAutoImports()
  const uvueOutputDir = uvueOutDir()
  Object.keys(res).forEach((fileName) => {
    if (fileName.endsWith('.vue') || fileName.endsWith('.uvue')) {
      if (fileName.startsWith('@/')) {
        fileName = fileName.slice(2)
      }
      const relativeFileName = parseUTSRelativeFilename(fileName, inputDir)
      if (
        !bundle[relativeFileName] &&
        // tsc 模式带ts后缀
        !bundle[relativeFileName + '.ts']
      ) {
        const className = genClassName(relativeFileName, UVUE_CLASS_NAME_PREFIX)
        const assetFileName = normalizeEmitAssetFileName(relativeFileName)
        const assetSource = `function ${className}Render(): any | null { return null }
const ${className}Styles = []`
        if (process.env.UNI_APP_X_TSC === 'true') {
          const fileName = path.resolve(uvueOutputDir, assetFileName)
          if (!fs.existsSync(fileName)) {
            fs.outputFileSync(fileName.replace(/\.ts$/, ''), assetSource)
          }
        } else {
          ctx.emitFile({
            type: 'asset',
            fileName: assetFileName,
            source: assetSource,
          })
        }
      }
    }
  })
  return res
}

function parseUniExtApiProviders(
  manifestJson: Record<string, any>
): [string, string, string][] {
  const providers: [string, string, string][] = []
  const customProviders = getUniExtApiProviderRegisters()
  const userModules = manifestJson.app?.distribute?.modules || {}
  const userModuleNames = Object.keys(userModules)
  if (userModuleNames.length) {
    const systemProviders = resolveUTSCompiler().parseExtApiProviders()
    userModuleNames.forEach((moduleName) => {
      const systemProvider = systemProviders[moduleName]
      if (systemProvider) {
        const userModule = userModules[moduleName]
        Object.keys(userModule).forEach((providerName) => {
          if (systemProvider.providers.includes(providerName)) {
            if (
              !customProviders.find(
                (customProvider) =>
                  customProvider.service === systemProvider.service &&
                  customProvider.name === providerName
              )
            ) {
              providers.push([
                systemProvider.service,
                providerName,
                formatExtApiProviderName(systemProvider.service, providerName),
              ])
            }
          }
        })
      }
    })
  }
  customProviders.forEach((provider) => {
    providers.push([provider.service, provider.name, provider.class])
  })
  return providers
}

function parseProcessEnv(resolvedConfig: ResolvedConfig) {
  const env: Record<string, unknown> = {}
  const defines: Record<string, unknown> = {}
  const userDefines = resolvedConfig.define!
  Object.keys(userDefines).forEach((key) => {
    if (key.startsWith('process.env.')) {
      defines[key.replace('process.env.', '')] = userDefines[key]
    }
  })
  extend(defines, resolvedConfig.env)
  Object.keys(defines).forEach((key) => {
    let value = defines[key]
    if (isString(value)) {
      try {
        value = JSON.parse(value)
      } catch (e: unknown) {}
    }
    if (!isString(value)) {
      value = JSON.stringify(value)
    }
    env[key] = value
  })
  return env
}
