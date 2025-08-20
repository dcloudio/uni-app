import path from 'path'
import fs from 'fs-extra'
import type {
  AliasOptions,
  BuildOptions,
  Plugin,
  ResolveFn,
  ResolvedConfig,
} from 'vite'
import {
  initCheckEnv,
  parseUniModulesWithComponents,
} from '../uni_modules.cloud'
import { cleanUrl } from './plugins/vitejs/utils'
import type { CssUrlReplacer } from './plugins/vitejs/plugins/css'
import { resolveUTSCompiler } from '../uts'
import { normalizePath } from '../utils'
import { getUTSEasyComAutoImports } from '../easycom'

import {
  createAppAndroidUniModulesSyncFilePreprocessorOnce,
  createAppHarmonyUniModulesSyncFilePreprocessorOnce,
  createAppIosUniModulesSyncFilePreprocessorOnce,
} from './plugins/uts/uni_modules'
import { removePlugins } from './utils'
import { findChangedJsonFiles } from '../json'
import { getWorkers } from '../workers'

export function createEncryptCssUrlReplacer(
  resolve: ResolveFn
): CssUrlReplacer {
  return async (url, importer) => {
    if (url.startsWith('/') && !url.startsWith('//')) {
      // /static/logo.png => @/static/logo.png
      url = '@' + url
    }
    const resolved = await resolve(url, importer)
    if (resolved) {
      return (
        '@/' + normalizePath(path.relative(process.env.UNI_INPUT_DIR, resolved))
      )
    }
    return url
  }
}

// 处理静态资源加载（目前仅限非app-android）
export function uniEncryptUniModulesAssetsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:encrypt-uni-modules-assets',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
    },
    resolveId(id, importer) {
      if (resolvedConfig.assetsInclude(cleanUrl(id))) {
        id = normalizePath(id)
        if (importer && (id.startsWith('./') || id.startsWith('../'))) {
          id = normalizePath(path.resolve(path.dirname(importer), id))
        }
        if (path.isAbsolute(id)) {
          id = '@/' + path.relative(process.env.UNI_INPUT_DIR, id)
        }
        return `\0${id}`
      }
    },
    load(id) {
      if (resolvedConfig.assetsInclude(cleanUrl(id))) {
        return {
          code: `export default ${JSON.stringify(id.replace(/\0/g, ''))}`,
          moduleSideEffects: false,
        }
      }
    },
  }
}

export function uniEncryptUniModulesPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  const isMp = process.env.UNI_UTS_PLATFORM.startsWith('mp-')
  const encryptModuleOutputFiles: string[] = []
  return {
    name: 'uni:encrypt-uni-modules',
    apply: 'build',
    config() {
      const build = initEncryptUniModulesBuildOptions(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_INPUT_DIR
      )
      Object.keys(build.rollupOptions?.input || {}).forEach((key) => {
        encryptModuleOutputFiles.push(key + '.js')
      })
      return {
        resolve: {
          alias: initEncryptUniModulesAlias(),
        },
        build,
      }
    },
    configResolved(config) {
      const isMp = process.env.UNI_UTS_PLATFORM.startsWith('mp-')
      if (isMp) {
        // 云编译时，禁用了lib:false，但默认会生成 preload 等代码，需要主动移除该插件
        removePlugins(['vite:build-import-analysis'], config)
      }
      // 编译组件时，禁用内联资源
      config.build.assetsInlineLimit = 0
      config.build.rollupOptions.external = createExternal(config)
      resolvedConfig = config
    },
    resolveId(id, importer) {
      if (process.env.UNI_UTS_PLATFORM !== 'app-android') {
        if (resolvedConfig.assetsInclude(cleanUrl(id))) {
          id = normalizePath(id)
          if (importer && (id.startsWith('./') || id.startsWith('../'))) {
            id = normalizePath(path.resolve(path.dirname(importer), id))
          }
          if (path.isAbsolute(id)) {
            id = '@/' + path.relative(process.env.UNI_INPUT_DIR, id)
          }
          return `\0${id}`
        }
      }
    },
    load(id) {
      if (process.env.UNI_UTS_PLATFORM !== 'app-android') {
        if (resolvedConfig.assetsInclude(cleanUrl(id))) {
          return {
            code: `export default ${JSON.stringify(id.replace(/\0/g, ''))}`,
            moduleSideEffects: false,
          }
        }
      }
    },
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        if (fileName.endsWith('.module.js')) {
          const uniModuleId = path.basename(fileName).replace('.module.js', '')
          // app-android 不需要 js
          if (process.env.UNI_UTS_PLATFORM !== 'app-android') {
            const newFileName =
              'uni_modules/' +
              fileName.replace('.module.js', '/index.module.js')
            bundle[newFileName] = bundle[fileName]
            bundle[newFileName].fileName = newFileName
          }
          delete bundle[fileName]
          const pkg = `uni_modules/${uniModuleId}/package.json`
          bundle[pkg] = {
            type: 'asset',
            fileName: pkg,
            name: pkg,
            originalFileName: null,
            needsCodeReference: false,
            source: genUniModulesPackageJson(
              uniModuleId,
              process.env.UNI_INPUT_DIR,
              {
                env: initCheckEnv(),
              }
            ),
          }
        } else if (fileName.endsWith('.js')) {
          if (isMp) {
            const output = bundle[fileName]
            if (output.type === 'chunk') {
              // 组件 js 可能会引用 index.module.js，需要替换路径
              const relativePath = path.relative(
                path.dirname(fileName),
                'index.module.js'
              )
              let code = output.code
              encryptModuleOutputFiles.forEach((file) => {
                const relativeModulePath = relativePath.replace(
                  'index.module.js',
                  file
                )
                // import { TuiCharts } from "../../../../tui-xechars_2.0.0.module.js";
                if (code.includes(relativeModulePath)) {
                  code = code.replaceAll(
                    relativeModulePath,
                    relativeModulePath
                      .replace('../../', '')
                      .replace(file, 'index.module.js')
                  )
                }
              })
              output.code = code
            }
          }
        }
      })
      if (isMp) {
        findChangedJsonFiles(false).forEach((value, key) => {
          this.emitFile({
            type: 'asset',
            fileName: key + '.json',
            source: value,
          })
        })
      }
    },
    async writeBundle() {
      if (process.env.UNI_UTS_PLATFORM !== 'app-android') {
        return
      }
      const uniXKotlinCompiler =
        process.env.UNI_APP_X_TSC === 'true'
          ? resolveUTSCompiler().createUniXKotlinCompilerOnce({
              resolveWorkers: () => getWorkers(),
            })
          : null
      if (uniXKotlinCompiler) {
        const tscOutputDir = tscOutDir('app-android')
        const uniModulesDir = path.resolve(tscOutputDir, 'uni_modules')
        if (fs.existsSync(uniModulesDir)) {
          for (const plugin of fs.readdirSync(uniModulesDir)) {
            const indexFileName = path.join(
              uniModulesDir,
              plugin,
              'index.module.uts.ts'
            )
            if (fs.existsSync(indexFileName)) {
              await uniXKotlinCompiler.addRootFile(indexFileName)
            }
          }
        }
        await uniXKotlinCompiler.close()
      }

      // 编译所有 uni_modules 插件
      const tempOutputDir = uvueOutDir('app-android')
      const tempUniModulesDir = path.join(tempOutputDir, 'uni_modules')
      const tempUniModules: string[] = []
      if (fs.existsSync(tempUniModulesDir)) {
        fs.readdirSync(tempUniModulesDir).forEach((uniModuleDir) => {
          if (
            fs.existsSync(
              path.join(tempUniModulesDir, uniModuleDir, 'index.module.uts')
            )
          ) {
            tempUniModules.push(uniModuleDir)
          }
        })
      }
      const compiler = resolveUTSCompiler()
      for (const uniModule of tempUniModules) {
        const pluginDir = path.resolve(tempUniModulesDir, uniModule)

        // TODO 待优化autoImports，目前 uni-app x 的编译，autoImport 是在js层处理过，rust层基本不再使用
        // 但uts插件目前还是使用的rust层的autoImports
        const autoImports = {}
        const allAutoImports = getUTSEasyComAutoImports()
        Object.keys(allAutoImports).forEach((source) => {
          if (!source.startsWith(`@/uni_modules/${uniModule}/components/`)) {
            autoImports[source] = allAutoImports[source]
          }
        })
        const uni_modules: string[] = []
        const pkgJson = path.resolve(
          process.env.UNI_INPUT_DIR,
          'uni_modules',
          uniModule,
          'package.json'
        )
        if (fs.existsSync(pkgJson)) {
          try {
            const pkg = require(pkgJson)
            if (pkg.uni_modules?.dependencies) {
              uni_modules.push(...pkg.uni_modules.dependencies)
            }
          } catch (e) {
            console.error(e)
          }
        }

        const result = await compiler.compile(pluginDir, {
          isX: process.env.UNI_APP_X === 'true',
          isSingleThread: true,
          isPlugin: false,
          sourceMap: false,
          uni_modules,
          transform: {
            uvueClassNamePrefix: 'Gen',
            autoImports,
            uvueGenDefaultAs: '__sfc__',
          },
        })
        if (result) {
          const apis = result.inject_apis
          const scopedSlots = result.scoped_slots
          const customElements = result.custom_elements
          const components = getUniModulesExtApiComponents(uniModule)
          const modules = resolveUTSCompiler().parseInjectModules(
            apis,
            {},
            components
          )
          fs.writeFileSync(
            path.resolve(
              process.env.UNI_OUTPUT_DIR,
              'uni_modules',
              uniModule,
              'package.json'
            ),
            genUniModulesPackageJson(uniModule, process.env.UNI_INPUT_DIR, {
              env: initCheckEnv(),
              apis,
              components,
              modules,
              scopedSlots,
              customElements,
            })
          )
        }
      }
    },
  }
}

function tscOutDir(platform: 'app-android' | 'app-ios') {
  return path.join(process.env.UNI_APP_X_TSC_DIR, platform)
}

function uvueOutDir(platform: 'app-android' | 'app-ios') {
  return path.join(process.env.UNI_APP_X_UVUE_DIR, platform)
}

function createExternal(config: ResolvedConfig) {
  return function external(source) {
    if (
      [
        'vue',
        'plugin-vue:export-helper',
        'vue-router',
        'pinia',
        'vuex',
        'vue-i18n',
        'tslib',
      ].includes(source)
    ) {
      return true
    }
    if (source.startsWith('@vue/')) {
      return true
    }
    if (source.startsWith('@dcloudio/')) {
      return true
    }
    if (source.startsWith('@/uni_modules/')) {
      return true
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
  }
}

function initEncryptUniModulesAlias(): AliasOptions {
  return [
    {
      find: '\0plugin-vue:export-helper',
      replacement: 'plugin-vue:export-helper',
    },
  ]
}

function initEncryptUniModulesBuildOptions(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string
): BuildOptions {
  const modules = parseUniModulesWithComponents(inputDir, platform)
  const moduleNames = Object.keys(modules)
  if (!moduleNames.length) {
    throw new Error('No encrypt uni_modules found')
  }
  // 生成入口文件
  const input: { [entryAlias: string]: string } = {}
  moduleNames.forEach((module) => {
    const moduleDir = path.resolve(inputDir, 'uni_modules', module)
    const indexEncryptFile = path.resolve(moduleDir, 'index.module.uts')
    if (modules[module]) {
      fs.writeFileSync(indexEncryptFile, modules[module])
      // 输出 xxx.module ，确保相对路径的准确性，因为真正引用的时候，是从 @/uni_modules/xxx 引入的
      input[module + '.module'] = indexEncryptFile
    }
  })
  return {
    lib: false, // 不使用 lib 模式，lib模式会直接内联资源
    cssCodeSplit: false,
    // outDir: process.env.UNI_OUTPUT_DIR,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      input,
      output: {
        format: 'es',
        banner: ``,
        entryFileNames: '[name].js',
        assetFileNames(asset) {
          if (asset.name && path.isAbsolute(asset.name)) {
            const uniModuleId = parseUniModuleId(
              path.relative(inputDir, asset.name)
            )
            if (uniModuleId) {
              return `uni_modules/${uniModuleId}/assets/[name]-[hash][extname]`
            }
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  }
}

function genUniModulesPackageJson(
  uniModuleId: string,
  inputDir: string,
  artifacts: Record<string, any>
) {
  const pkg = require(path.resolve(
    inputDir,
    path.join('uni_modules', uniModuleId, 'package.json')
  ))
  return JSON.stringify(
    {
      id: pkg.id,
      version: pkg.version,
      uni_modules: {
        dependencies: pkg.uni_modules?.dependencies || [],
        artifacts,
      },
    },
    null,
    2
  )
}

function parseUniModuleId(relativeFilename: string) {
  const parts = normalizePath(relativeFilename).split('/', 2)
  if (parts[0] === 'uni_modules') {
    return parts[1]
  }
}

const uniModulesExtApiComponents: Map<string, Set<string>> = new Map()

export function addUniModulesExtApiComponents(
  relativeFilename: string,
  components: string[]
) {
  const uniModuleId = parseUniModuleId(relativeFilename)
  if (uniModuleId) {
    let extApiComponents = uniModulesExtApiComponents.get(uniModuleId)
    if (!extApiComponents) {
      extApiComponents = new Set()
      uniModulesExtApiComponents.set(uniModuleId, extApiComponents)
    }
    components.forEach((component) => extApiComponents!.add(component))
  }
}

function getUniModulesExtApiComponents(uniModuleId: string) {
  return [...(uniModulesExtApiComponents.get(uniModuleId) || [])]
}

export function compileCloudUniModuleWithTsc(
  platform: 'app-android' | 'app-ios' | 'app-harmony',
  pluginDir: string
) {
  const {
    compileUniModuleWithTsc,
    createUniXKotlinCompilerOnce,
    createUniXSwiftCompilerOnce,
    createUniXArkTSCompilerOnce,
  } = resolveUTSCompiler()
  const isX = process.env.UNI_APP_X === 'true'
  const resolveWorkers = () => getWorkers()
  return compileUniModuleWithTsc(
    platform,
    pluginDir,
    platform === 'app-android'
      ? createUniXKotlinCompilerOnce({ resolveWorkers })
      : platform === 'app-harmony'
      ? createUniXArkTSCompilerOnce({ resolveWorkers })
      : createUniXSwiftCompilerOnce({ resolveWorkers }),
    {
      rootFiles: [],
      preprocessor:
        platform === 'app-android'
          ? createAppAndroidUniModulesSyncFilePreprocessorOnce(isX)
          : platform === 'app-harmony'
          ? createAppHarmonyUniModulesSyncFilePreprocessorOnce(isX)
          : createAppIosUniModulesSyncFilePreprocessorOnce(isX),
    }
  )
}
