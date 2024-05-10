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
  genEncryptEasyComModuleIndex,
  initCheckEnv,
  parseUniModulesWithComponents,
} from '../uni_modules'
import { cleanUrl, normalizePath } from './plugins/vitejs/utils'
import type { CssUrlReplacer } from './plugins/vitejs/plugins/css'
import { resolveUTSCompiler } from '../uts'

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

export function uniEncryptUniModulesPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:encrypt-uni-modules',
    apply: 'build',
    config() {
      return {
        resolve: {
          alias: initEncryptUniModulesAlias(),
        },
        build: initEncryptUniModulesBuildOptions(process.env.UNI_INPUT_DIR),
      }
    },
    configResolved(config) {
      // 编译组件时，禁用内联资源
      config.build.assetsInlineLimit = 0
      config.build.rollupOptions.external = createExternal(config)
      resolvedConfig = config
    },
    resolveId(id) {
      if (resolvedConfig.assetsInclude(cleanUrl(id))) {
        return `\0${id}`
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
            needsCodeReference: false,
            source: genUniModulesPackageJson(
              uniModuleId,
              process.env.UNI_INPUT_DIR,
              {
                env: initCheckEnv(),
              }
            ),
          }
        }
      })
    },
    async writeBundle() {
      if (process.env.UNI_UTS_PLATFORM !== 'app-android') {
        return
      }
      // 编译所有 uni_modules 插件
      const tempOutputDir = uvueOutDir()
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
        const result = await compiler.compile(pluginDir, {
          isX: process.env.UNI_APP_X === 'true',
          isSingleThread: true,
          isPlugin: false,
          sourceMap: false,
          uni_modules: [],
        })
        if (result) {
          fs.writeFileSync(
            path.resolve(
              process.env.UNI_OUTPUT_DIR,
              'uni_modules',
              uniModule,
              'package.json'
            ),
            genUniModulesPackageJson(uniModule, tempOutputDir, {
              env: initCheckEnv(),
              apis: result.inject_apis,
              components: getUniModulesExtApiComponents(uniModule),
            })
          )
        }
      }
    },
  }
}

function uvueOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.uvue')
}

function createExternal(config: ResolvedConfig) {
  return function external(source) {
    if (
      // android 平台需要编译 assets 资源
      process.env.UNI_UTS_PLATFORM !== 'app-android' &&
      config.assetsInclude(cleanUrl(source))
    ) {
      return true
    }
    if (
      [
        'vue',
        'plugin-vue:export-helper',
        'vue-router',
        'pinia',
        'vuex',
        'vue-i18n',
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

const indexFiles = ['index.uts', 'index.ts', 'index.js']
function hasIndexFile(uniModuleDir: string) {
  return fs.readdirSync(uniModuleDir).some((file) => indexFiles.includes(file))
}

function initEncryptUniModulesBuildOptions(inputDir: string): BuildOptions {
  const modules = parseUniModulesWithComponents(inputDir)
  const moduleNames = Object.keys(modules)
  if (!moduleNames.length) {
    throw new Error('No encrypt uni_modules found')
  }
  // 生成入口文件
  const input: { [entryAlias: string]: string } = {}
  moduleNames.forEach((module) => {
    const indexEncryptFile = path.resolve(
      inputDir,
      'uni_modules',
      module,
      'index.module.uts'
    )
    const codes: string[] = []
    if (hasIndexFile(path.resolve(inputDir, 'uni_modules', module))) {
      codes.push(`export * from './index'`)
    }
    // easyCom
    if (modules[module].length) {
      codes.push(genEncryptEasyComModuleIndex(modules[module]))
    }
    if (codes.length) {
      fs.writeFileSync(indexEncryptFile, codes.join(`\n`))
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
