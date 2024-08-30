// 重要，该文件编译后的 js 需要同步到 vue2 编译器 uni-cli-shared/lib/uts
import fs from 'fs-extra'
import path from 'path'
import glob from 'fast-glob'
import type * as UTSCompiler from '@dcloudio/uni-uts-v1'

import { isInHBuilderX } from './hbx'
import {
  camelize,
  capitalize,
  installDepTips,
  isArray,
  normalizeNodeModules,
  normalizePath,
} from './utils'

import { type Injects, parseUniExtApis } from './uni_modules'
import type { EasycomMatcher } from './easycom'
import type { CompilerOptions } from 'typescript'

function once<T extends (...args: any[]) => any>(
  fn: T,
  ctx: unknown = null
): T {
  let res: any
  return ((...args: any[]) => {
    if (fn) {
      res = fn.apply(ctx, args)
      fn = null as any
    }
    return res
  }) as T
}

/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
export function resolveUTSAppModule(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  id: string,
  importer: string,
  includeUTSSDK = true
) {
  id = path.resolve(importer, id)
  if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (
      parentDir === 'uni_modules' ||
      (includeUTSSDK && parentDir === 'utssdk')
    ) {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      if (process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js') {
        // js engine
        if (parentDir === 'uni_modules') {
          const appJsIndex = path.resolve(id, basedir, 'app-js', 'index.uts')
          if (fs.existsSync(appJsIndex)) {
            return appJsIndex
          }
        }
      }
      if (fs.existsSync(path.resolve(id, basedir, 'index.uts'))) {
        return id
      }
      const fileName = id.split('?')[0]
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(fileName, basedir, p)
      }
      const extname = ['.uts', '.vue', '.uvue']
      if (platform === 'app-harmony') {
        if (resolveUTSFile(resolvePlatformDir(platform), extname)) {
          return id
        }
        return
      }
      if (resolveUTSFile(resolvePlatformDir('app-android'), extname)) {
        return id
      }
      if (resolveUTSFile(resolvePlatformDir('app-ios'), extname)) {
        return id
      }
    }
  }
}

// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
export function resolveUTSModule(
  id: string,
  importer: string,
  includeUTSSDK = true
) {
  if (
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-plus' ||
    process.env.UNI_PLATFORM === 'app-harmony'
  ) {
    return resolveUTSAppModule(process.env.UNI_UTS_PLATFORM, id, importer)
  }
  id = path.resolve(importer, id)
  if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (
      parentDir === 'uni_modules' ||
      (includeUTSSDK && parentDir === 'utssdk')
    ) {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, basedir, p)
      }

      let index = resolveUTSFile(
        resolvePlatformDir(process.env.UNI_UTS_PLATFORM)
      )
      if (index) {
        return index
      }
      index = path.resolve(id, basedir, 'index.uts')
      if (fs.existsSync(index)) {
        return index
      }
    }
  }
}

function resolveUTSFile(
  dir: string,
  extensions: string[] = ['.uts', '.ts', '.js']
) {
  for (let i = 0; i < extensions.length; i++) {
    const indexFile = path.join(dir, 'index' + extensions[i])
    if (fs.existsSync(indexFile)) {
      return indexFile
    }
  }
}

function resolveUniXCompilerUniModulesPaths(
  platform: 'app-android' | 'app-ios',
  inputDir: string,
  tscInputDir: string
) {
  const paths: CompilerOptions['paths'] = {}
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  if (fs.existsSync(uniModulesDir)) {
    fs.readdirSync(uniModulesDir).forEach((dir) => {
      const pluginPath = `@/uni_modules/${dir}`
      const pluginDir = path.resolve(uniModulesDir, dir)
      const utssdkDir = path.resolve(pluginDir, 'utssdk')
      const tscUtsSdkDir = path.resolve(
        tscInputDir,
        'uni_modules',
        dir,
        'utssdk'
      )
      // utssdk 插件
      if (fs.existsSync(utssdkDir)) {
        // 加密插件
        if (fs.existsSync(path.resolve(pluginDir, 'encrypt'))) {
          if (fs.existsSync(path.resolve(utssdkDir, 'interface.uts'))) {
            paths[pluginPath] = [path.resolve(tscUtsSdkDir, 'interface.uts.ts')]
          }
        } else {
          // 非加密插件
          // utssdk/app-android/index.uts
          if (fs.existsSync(path.resolve(utssdkDir, platform, 'index.uts'))) {
            paths[pluginPath] = [
              path.resolve(tscUtsSdkDir, platform, 'index.uts.ts'),
            ]
            // utssdk/index.uts
          } else if (fs.existsSync(path.resolve(utssdkDir, 'index.uts'))) {
            paths[pluginPath] = [path.resolve(tscUtsSdkDir, 'index.uts.ts')]
          }
        }
      }
    })
  }
  return paths
}

export const createUniXKotlinCompilerOnce = once(() => {
  const { createUniXCompiler } = resolveUTSCompiler()
  const tscInputDir = path.join(
    process.env.UNI_OUTPUT_DIR,
    '../.tsc/app-android'
  )
  genUniExtApiDeclarationFileOnce(tscInputDir)
  return createUniXCompiler(
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
    'Kotlin',
    {
      inputDir: tscInputDir,
      cacheDir: path.resolve(process.env.UNI_APP_X_CACHE_DIR, 'tsc'),
      outputDir: path.join(process.env.UNI_OUTPUT_DIR, '../.uvue/app-android'),
      paths: resolveUniXCompilerUniModulesPaths(
        'app-android',
        process.env.UNI_INPUT_DIR,
        tscInputDir
      ),
      normalizeFileName: normalizeNodeModules,
    }
  )
})

export const createUniXSwiftCompilerOnce = once(() => {
  const { createUniXCompiler } = resolveUTSCompiler()
  const tscInputDir = path.join(process.env.UNI_OUTPUT_DIR, '../.tsc/app-ios')
  return createUniXCompiler(
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
    'Swift',
    {
      inputDir: tscInputDir,
      cacheDir: path.resolve(process.env.UNI_APP_X_CACHE_DIR, 'tsc'),
      outputDir: path.join(process.env.UNI_OUTPUT_DIR, '../.uvue/app-ios'),
      paths: resolveUniXCompilerUniModulesPaths(
        'app-ios',
        process.env.UNI_INPUT_DIR,
        tscInputDir
      ),
      normalizeFileName: normalizeNodeModules,
    }
  )
})

export function resolveUTSCompiler(): typeof UTSCompiler {
  let compilerPath: string = ''
  if (isInHBuilderX()) {
    try {
      compilerPath = require.resolve(
        path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts-v1')
      )
    } catch (e) {}
  }
  if (!compilerPath) {
    try {
      compilerPath = require.resolve('@dcloudio/uni-uts-v1', {
        paths: [process.env.UNI_CLI_CONTEXT],
      })
    } catch (e) {
      let utsCompilerVersion = ''
      try {
        utsCompilerVersion = require('../package.json').version
      } catch (e) {
        try {
          // vue2
          utsCompilerVersion = require('../../package.json').version
        } catch (e) {}
      }
      if (utsCompilerVersion.startsWith('2.0.')) {
        utsCompilerVersion = '^3.0.0-alpha-3060920221117001'
      }
      console.error(
        installDepTips(
          'devDependencies',
          '@dcloudio/uni-uts-v1',
          utsCompilerVersion
        )
      )
      process.exit(0)
    }
  }
  return require(compilerPath)
}

interface UTSComponentMeta {
  source: string
  kotlinPackage: string
  swiftModule: string
}

const utsComponents = new Map<string, UTSComponentMeta>()

export function isUTSComponent(name: string) {
  return utsComponents.has(name)
}

export function getUTSComponentAutoImports() {
  const utsComponentAutoImports: Record<string, [[string]]> = {}
  utsComponents.forEach(({ kotlinPackage }, name) => {
    const className = capitalize(camelize(name)) + 'Element'
    if (!utsComponentAutoImports[kotlinPackage]) {
      utsComponentAutoImports[kotlinPackage] = [[className]]
    } else {
      if (
        !utsComponentAutoImports[kotlinPackage].find(
          (item) => item[0] === className
        )
      ) {
        utsComponentAutoImports[kotlinPackage].push([className])
      }
    }
  })
  return utsComponentAutoImports
}

export function parseUTSComponent(name: string, type: 'kotlin' | 'swift') {
  const meta = utsComponents.get(name)
  if (meta) {
    const namespace =
      meta[type === 'swift' ? 'swiftModule' : 'kotlinPackage'] || ''
    const className = capitalize(camelize(name)) + 'Component'
    return {
      className,
      namespace,
      source: meta.source,
    }
  }
}

export function initUTSComponents(
  inputDir: string,
  platform: UniApp.PLATFORM
): EasycomMatcher[] {
  utsComponents.clear()
  const components: EasycomMatcher[] = []
  const isApp = platform === 'app' || platform === 'app-plus'
  const easycomsObj: Record<
    string,
    { source: string; kotlinPackage: string; swiftModule: string }
  > = {}
  const dirs = resolveUTSComponentDirs(inputDir)
  dirs.forEach((dir) => {
    const is_uni_modules_utssdk = dir.endsWith('utssdk')
    const is_ussdk =
      !is_uni_modules_utssdk && path.dirname(dir).endsWith('utssdk')

    const pluginId = is_uni_modules_utssdk
      ? path.basename(path.dirname(dir))
      : path.basename(dir)
    if (is_uni_modules_utssdk || is_ussdk) {
      glob
        .sync('**/*.vue', {
          cwd: dir,
          absolute: true,
        })
        .forEach((file) => {
          let name = parseVueComponentName(file)
          if (!name) {
            if (file.endsWith('index.vue')) {
              name = path.basename(
                is_uni_modules_utssdk ? path.dirname(dir) : dir
              )
            }
          }
          if (name) {
            const source =
              '@/' +
              normalizePath(
                isApp
                  ? path.relative(
                      inputDir,
                      is_uni_modules_utssdk ? path.dirname(dir) : dir
                    )
                  : path.relative(inputDir, file)
              )

            easycomsObj[`^${name}$`] = {
              source: isApp ? `${source}?uts-proxy` : source,
              kotlinPackage: parseKotlinPackageWithPluginId(
                pluginId,
                is_uni_modules_utssdk
              ),
              swiftModule: parseSwiftPackageWithPluginId(
                pluginId,
                is_uni_modules_utssdk
              ),
            }
          }
        })
    }
  })
  Object.keys(easycomsObj).forEach((name) => {
    const obj = easycomsObj[name]
    const componentName = name.slice(1, -1)
    components.push({
      name: componentName,
      pattern: new RegExp(name),
      replacement: obj.source,
    })
    utsComponents.set(componentName, {
      source: obj.source,
      kotlinPackage: obj.kotlinPackage,
      swiftModule: obj.swiftModule,
    })
  })
  return components
}

function resolveUTSComponentDirs(inputDir: string) {
  const utssdkDir = path.resolve(inputDir, 'utssdk')
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  return glob
    .sync('*', {
      cwd: utssdkDir,
      absolute: true,
      onlyDirectories: true,
    })
    .concat(
      glob.sync('*/utssdk', {
        cwd: uniModulesDir,
        absolute: true,
        onlyDirectories: true,
      })
    )
}

const nameRE = /name\s*:\s*['|"](.*)['|"]/
function parseVueComponentName(file: string) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(nameRE)
  if (matches) {
    return matches[1]
  }
}

function prefix(id: string) {
  if (
    process.env.UNI_UTS_MODULE_PREFIX &&
    !id.startsWith(process.env.UNI_UTS_MODULE_PREFIX)
  ) {
    return process.env.UNI_UTS_MODULE_PREFIX + '-' + id
  }
  return id
}

export function parseKotlinPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + camelize(prefix(id))
}

export function parseSwiftPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return (
    'UTSSDK' +
    (is_uni_modules ? 'Modules' : '') +
    capitalize(camelize(prefix(id)))
  )
}

export type UTSTargetLanguage = typeof process.env.UNI_UTS_TARGET_LANGUAGE

async function parseUniExtApiAutoImports(
  uniExtApiAutoImports: Record<string, [string, string?][]>,
  extApis: Injects,
  parseSource: (pluginId: string) => string
) {
  if (Object.keys(extApis).length) {
    const { parseExportIdentifiers } = resolveUTSCompiler()
    for (const name in extApis) {
      const options = extApis[name]
      if (isArray(options) && options.length >= 2) {
        const pluginId = path.basename(options[0])
        const source = parseSource(pluginId)
        if (uniExtApiAutoImports[source]) {
          continue
        }
        uniExtApiAutoImports[source] = []
        const filename = `uni_modules/${pluginId}/utssdk/interface.uts`
        const interfaceFileName = path.resolve(
          process.env.UNI_INPUT_DIR,
          filename
        )
        if (fs.existsSync(interfaceFileName)) {
          const ids = await parseExportIdentifiers(interfaceFileName)
          ids
            // 过滤掉 Uni
            .filter((id) => id !== 'Uni')
            .forEach((id) => {
              uniExtApiAutoImports[source].push([id])
            })
        }
      }
    }
  }
  return uniExtApiAutoImports
}

let uniExtApiKotlinAutoImports: Record<string, [string, string?][]> | null =
  null
async function parseUniExtApiKotlinAutoImportsOnce(extApis: Injects) {
  if (uniExtApiKotlinAutoImports) {
    return uniExtApiKotlinAutoImports
  }
  uniExtApiKotlinAutoImports = {}
  return parseUniExtApiAutoImports(
    uniExtApiKotlinAutoImports,
    extApis,
    (pluginId) => {
      return parseKotlinPackageWithPluginId(pluginId, true)
    }
  )
}

let uniExtApiSwiftAutoImports: Record<string, [string, string?][]> | null = null
async function parseUniExtApiSwiftAutoImportsOnce(extApis: Injects) {
  if (uniExtApiSwiftAutoImports) {
    return uniExtApiSwiftAutoImports
  }
  uniExtApiSwiftAutoImports = {}
  return parseUniExtApiAutoImports(
    uniExtApiSwiftAutoImports,
    extApis,
    (pluginId) => {
      return parseSwiftPackageWithPluginId(pluginId, true)
    }
  )
}

export const parseUniExtApiNamespacesOnce = once(
  (
    platform: typeof process.env.UNI_UTS_PLATFORM,
    language: UTSTargetLanguage
  ) => {
    const extApis = parseUniExtApiNamespacesJsOnce(platform, language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      let source = options[0]
      const pluginId = path.basename(options[0])
      if (language === 'kotlin') {
        source = parseKotlinPackageWithPluginId(pluginId, true)
      } else if (language === 'swift') {
        source = parseSwiftPackageWithPluginId(pluginId, true)
      }
      namespaces[name] = [source, options[1]]
    })
    return namespaces
  }
)

export const parseUniExtApiNamespacesJsOnce = once(
  (
    platform: typeof process.env.UNI_UTS_PLATFORM,
    language: UTSTargetLanguage
  ) => {
    const extApis = parseUniExtApis(true, platform, language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      if (isArray(options) && options.length >= 2) {
        namespaces[name.replace('uni.', '')] = [options[0], options[1]]
      }
    })
    return namespaces
  }
)

export function resolveUniTypeScript() {
  if (isInHBuilderX()) {
    return require(path.resolve(
      process.env.UNI_HBUILDERX_PLUGINS,
      'uniapp-uts-v1',
      'node_modules',
      '@dcloudio',
      'uni-uts-v1',
      'lib',
      'typescript'
    ))
  }
  return require('@dcloudio/uni-uts-v1/lib/typescript')
}

async function initUTSAutoImports(
  autoImports: Record<string, [string, string?][]>,
  platform: 'app-android' | 'app-ios',
  language: 'kotlin' | 'swift'
) {
  const utsComponents = getUTSComponentAutoImports()
  Object.keys(utsComponents).forEach((source) => {
    if (autoImports[source]) {
      autoImports[source].push(...utsComponents[source])
    } else {
      autoImports[source] = utsComponents[source]
    }
  })

  const extApis = parseUniExtApis(true, platform, language)
  const extApiImports = await (language === 'kotlin'
    ? parseUniExtApiKotlinAutoImportsOnce
    : parseUniExtApiSwiftAutoImportsOnce)(extApis)
  Object.keys(extApiImports).forEach((source) => {
    if (autoImports[source]) {
      autoImports[source].push(...extApiImports[source])
    } else {
      autoImports[source] = extApiImports[source]
    }
  })
  return autoImports
}
let autoKotlinImports: Record<string, [string, string?][]> | null = null
export async function initUTSKotlinAutoImportsOnce() {
  if (autoKotlinImports) {
    return autoKotlinImports
  }
  autoKotlinImports = {}
  return initUTSAutoImports(autoKotlinImports, 'app-android', 'kotlin')
}

let autoSwiftImports: Record<string, [string, string?][]> | null = null
export async function initUTSSwiftAutoImportsOnce() {
  if (autoSwiftImports) {
    return autoSwiftImports
  }
  autoSwiftImports = {}
  return initUTSAutoImports(autoSwiftImports, 'app-ios', 'swift')
}

const genUniExtApiDeclarationFileOnce = once((tscInputDir: string) => {
  const extApis = parseUniExtApis(true, 'app-android', 'kotlin')
  // 之所以往上一级写，是因为 tscInputDir 会被 empty，目前时机有问题，比如先生成了d.ts，又被empty
  const fileName = path.resolve(tscInputDir, '../uni-ext-api.d.ts')
  if (fs.existsSync(fileName)) {
    try {
      // 先删除
      fs.unlinkSync(fileName)
    } catch (e) {}
  }
  if (Object.keys(extApis).length) {
    const apis: string[] = []
    for (const name in extApis) {
      const options = extApis[name]
      if (isArray(options) && options.length >= 2) {
        const api = name.replace('uni.', '')
        apis.push(
          '  ' + api + `: typeof import("${options[0]}")["${options[1]}"]`
        )
      }
    }
    if (apis.length) {
      fs.outputFileSync(
        fileName,
        `
interface Uni {
${apis.join('\n')}
}
`
      )
    }
  }
})
