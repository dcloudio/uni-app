import path from 'path'
import fs from 'fs-extra'
import type { ResolvedConfig } from 'vite'
import { extend, isString } from '@vue/shared'
import type { ChangeEvent } from 'rollup'
import {
  type UniVitePlugin,
  buildUniExtApis,
  emptyDir,
  enableSourceMap,
  getCssDepMap,
  getCurrentCompiledUTSPlugins,
  getUniExtApiProviderRegisters,
  getUniXPagePaths,
  initUTSKotlinAutoImportsOnce,
  isNormalCompileTarget,
  normalizeEmitAssetFileName,
  normalizePath,
  parseKotlinPackageWithPluginId,
  parseManifestJsonOnce,
  parseUniExtApiNamespacesOnce,
  parseUniModulesArtifacts,
  parseVueRequest,
  resolveMainPathOnce,
  resolveUTSCompiler,
  rewriteUniModulesConsoleExpr,
  tscOutDir,
  uvueOutDir,
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
} from './utils'
import { getOutputManifestJson } from './manifestJson'
import {
  configResolved,
  createUniOptions,
  getExtApiComponents,
  updateManifestModules,
} from '../utils'

const uniCloudSpaceList = getUniCloudSpaceList()

let isFirst = true
let isFirstBundleSuccess = false
export function uniAppPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // const uniModulesDir = normalizePath(path.resolve(inputDir, 'uni_modules'))
  const mainUTS = resolveMainPathOnce(inputDir)
  const pagesJsonPath = normalizePath(path.resolve(inputDir, 'pages.json'))
  const uvueOutputDir = uvueOutDir('app-android')
  const tscOutputDir = tscOutDir('app-android')

  const manifestJson = parseManifestJsonOnce(inputDir)
  // 预留一个口子，方便切换测试
  const split = manifestJson['uni-app-x']?.split
  // 开始编译时，清空输出目录
  function emptyOutDir() {
    // ext-api 编译时，需要同时编译多个平台，并保留多个平台的输出目录
    if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
      return
    }
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

  const uniXKotlinCompiler =
    process.env.UNI_APP_X_TSC === 'true'
      ? resolveUTSCompiler().createUniXKotlinCompilerOnce()
      : null
  const changedFiles: { fileName: string; event: ChangeEvent }[] = []

  const uniExtApiUniModulesDeps: string[] =
    process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? JSON.parse(process.env.UNI_COMPILE_EXT_API_UNI_MODULES_DEPS || '[]')
      : []

  const uniExtApiUniModulesExternals = uniExtApiUniModulesDeps.map(
    (dep) => `@/uni_modules/${dep}`
  )

  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions('app-android'),
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
              if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
                // 比如 uni-scanCode 依赖了 uni-camera
                if (uniExtApiUniModulesExternals.includes(source)) {
                  return true
                }
              }
              // 相对目录
              if (source.startsWith('@/') || source.startsWith('.')) {
                return false
              }
              if (path.isAbsolute(source)) {
                return false
              }
              // 'virtual:uno.css'
              if (source.includes(':')) {
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
      if (uniXKotlinCompiler) {
        await uniXKotlinCompiler.init()
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
          await transformAutoImport(
            transformUniCloudMixinDataCom(
              rewriteUniModulesConsoleExpr(id, code)
            ),
            id
          )
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
      return {
        code,
        map: {
          mappings: '',
        },
      }
    },
    generateBundle(_, bundle) {
      if (!isNormalCompileTarget()) {
        return
      }
      // 开发者仅在 script 中引入了 easyCom 类型，但模板里边没用到，此时额外生成一个辅助的.uvue文件
      // checkUTSEasyComAutoImports(inputDir, bundle, this)
    },
    watchChange(fileName, change) {
      if (uniXKotlinCompiler) {
        // watcher && watcher.watch(3000)
        fileName = normalizePath(fileName)
        if (fileName === pagesJsonPath) {
          // pages.json 被注入了main.uts，需要触发main.uts的重新编译
          changedFiles.push({
            fileName: normalizePath(mainUTS),
            event: change.event,
          })
        } else {
          // 主工程可能引入uni_modules中的文件
          // if (fileName.startsWith(uniModulesDir)) {
          //   // 忽略uni_modules uts原生插件中的文件
          //   const plugin = fileName
          //     .slice(uniModulesDir.length + 1)
          //     .split('/')[0]
          //   if (getCurrentCompiledUTSPlugins().has(plugin)) {
          //     return
          //   }
          // }
          const depMap = getCssDepMap()
          if (depMap.has(fileName)) {
            for (const id of depMap.get(fileName)!) {
              changedFiles.push({ fileName: id, event: change.event })
            }
          }
        }
        changedFiles.push({ fileName, event: change.event })
      }
    },
    async writeBundle() {
      const { compileApp } = resolveUTSCompiler()
      if (!isNormalCompileTarget()) {
        if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
          if (uniXKotlinCompiler) {
            await uniXKotlinCompiler.addRootFile(
              path.join(tscOutputDir, 'main.uts.ts')
            )
            await uniXKotlinCompiler.close()
            const res = await compileApp(path.join(uvueOutputDir, 'main.uts'), {
              pageCount: 0,
              split: false,
              disableSplitManifest: process.env.NODE_ENV !== 'development',
              inputDir: uvueOutputDir,
              outputDir: outputDir,
              outFilename: `${
                process.env.UNI_COMPILE_EXT_API_OUT_FILE_NAME || 'components'
              }.kt`,
              package: parseKotlinPackageWithPluginId(
                process.env.UNI_COMPILE_EXT_API_PLUGIN_ID!,
                true
              ),
              sourceMap: false,
              uni_modules: uniExtApiUniModulesDeps,
              pages: getUniXPagePaths(),
              extApiComponents: [],
              uvueClassNamePrefix: UVUE_CLASS_NAME_PREFIX,
              transform: {
                uvueClassNamePrefix: 'Uni',
                uvueClassNameOnlyBasename: true,
              },
            })
            if (res?.error) {
              throw res.error
            }
          }
        }
        return
      }
      if (uniXKotlinCompiler) {
        // 如果 main.uts.ts 没有被添加到 uniXKotlinCompiler 中，则添加
        // 有可能首次编译失败，并没有走到这里，二次编译导致了changedFiles有内容
        const mainFile = path.join(tscOutputDir, 'main.uts.ts')
        if (!uniXKotlinCompiler.hasRootFile(mainFile)) {
          await uniXKotlinCompiler.addRootFile(mainFile)
        }
        if (changedFiles.length) {
          const files = changedFiles.splice(0)
          await uniXKotlinCompiler.invalidate(files)
        }
      }
      let pageCount = 0
      if (isFirst) {
        isFirst = false
      }
      // 首次编译成功后，不再显示页面数量进度条
      if (!isFirstBundleSuccess) {
        // 自动化测试时，不显示页面数量进度条
        // if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
        pageCount = parseInt(process.env.UNI_APP_X_PAGE_COUNT) || 0
        // }
      }
      // x 上暂时编译所有uni ext api，不管代码里是否调用了
      await buildUniExtApis()
      const uniCloudObjectInfo = getUniCloudObjectInfo(uniCloudSpaceList)
      if (uniCloudObjectInfo.length > 0) {
        process.env.UNI_APP_X_UNICLOUD_OBJECT = 'true'
      } else {
        process.env.UNI_APP_X_UNICLOUD_OBJECT = 'false'
      }
      const res = await compileApp(path.join(uvueOutputDir, 'main.uts'), {
        pageCount,
        uniCloudObjectInfo,
        split: split !== false,
        disableSplitManifest: process.env.NODE_ENV !== 'development',
        inputDir: uvueOutputDir,
        outputDir: outputDir,
        package:
          'uni.' + (manifestJson.appid || DEFAULT_APPID).replace(/_/g, ''),
        sourceMap: enableSourceMap(),
        uni_modules: [...getCurrentCompiledUTSPlugins()],
        pages: getUniXPagePaths(),
        extApis: parseUniExtApiNamespacesOnce(
          process.env.UNI_UTS_PLATFORM,
          process.env.UNI_UTS_TARGET_LANGUAGE
        ),
        extApiComponents: [...getExtApiComponents()],
        uvueClassNamePrefix: UVUE_CLASS_NAME_PREFIX,
        autoImports: await initUTSKotlinAutoImportsOnce(),
        extApiProviders: parseUniExtApiProviders(),
        uniModulesArtifacts: parseUniModulesArtifacts(),
        env: parseProcessEnv(resolvedConfig),
      })
      if (uniXKotlinCompiler && process.env.NODE_ENV !== 'development') {
        await uniXKotlinCompiler.close()
      }
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
      isFirstBundleSuccess = true
    },
  }
}

function normalizeFilename(filename: string, isMain = false) {
  if (isMain) {
    return 'main.uts'
  }
  return parseUTSRelativeFilename(filename, process.env.UNI_INPUT_DIR)
}

function commentUnoCssImport(code) {
  // 使用正则表达式匹配 'import 'virtual:uno.css'' 语句
  const regex = /^import\s+['"]virtual:uno\.css['"];?/gm
  return code.replace(regex, '// $&')
}

function normalizeCode(code: string, isMain = false) {
  code = commentUnoCssImport(code)
  if (!isNormalCompileTarget()) {
    return code
  }
  if (!isMain) {
    return code
  }
  const automatorCode =
    process.env.UNI_AUTOMATOR_WS_ENDPOINT &&
    process.env.UNI_AUTOMATOR_APP_WEBVIEW !== 'true'
      ? 'initAutomator();\n'
      : ''
  return `${code}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    ${automatorCode}(createApp()['app'] as VueApp).mount(app, ${UVUE_CLASS_NAME_PREFIX}UniApp());
}
`
}

function parseUniExtApiProviders(): [string, string, string][] {
  const providers: [string, string, string][] = []
  const customProviders = getUniExtApiProviderRegisters()
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
