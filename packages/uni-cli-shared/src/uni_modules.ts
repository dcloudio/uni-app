// 重要：此文件编译后的js，需同步至 vue2 编译器中 uni-cli-shared/lib/uts/uni_modules.js
import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import type { UniXCompiler } from '@dcloudio/uni-uts-v1'
import type { UTSTargetLanguage } from './uts'

export type DefineOptions = {
  name?: string
  app?:
    | boolean
    | {
        js?: boolean
        kotlin?: boolean
        swift?: boolean
      }
  [key: string]: any
}

export type Define =
  | string
  | string[]
  | Record<string, string | DefineOptions>
  | false
export type Defines = {
  [name: string]: Define
}

export interface Exports {
  [name: string]: Define | Defines | false
}

const extApiProviders: {
  plugin: string
  service: string
  name?: string
  servicePlugin?: string
}[] = []

const extApiPlugins = new Set<string>()

export function getUniExtApiProviders() {
  return extApiProviders
}

export function getUniExtApiPlugins() {
  return [...extApiPlugins].map((plugin) => {
    return { plugin }
  })
}

export function formatExtApiProviderName(service: string, name: string) {
  if (service === 'oauth') {
    service = 'OAuth'
  }
  return `Uni${capitalize(camelize(service))}${capitalize(
    camelize(name)
  )}ProviderImpl`
}

export function getUniExtApiProviderRegisters() {
  const result: {
    name: string
    plugin: string
    service: string
    class: string
  }[] = []
  extApiProviders.forEach((provider) => {
    if (provider.name && provider.service) {
      result.push({
        name: provider.name,
        plugin: provider.plugin,
        service: provider.service,
        class: `uts.sdk.modules.${camelize(
          provider.plugin
        )}.${formatExtApiProviderName(provider.service, provider.name)}`,
      })
    }
  })
  return result
}

export function parseUniExtApis(
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage = 'javascript'
) {
  if (!process.env.UNI_INPUT_DIR) {
    return {}
  }
  const uniModulesDir = path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules')
  if (!fs.existsSync(uniModulesDir)) {
    return {}
  }

  const injects: Injects = {}
  extApiProviders.length = 0
  extApiPlugins.clear()
  fs.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
    // 必须以 uni- 开头
    if (!uniModuleDir.startsWith('uni-')) {
      return
    }
    const uniModuleRootDir = path.resolve(uniModulesDir, uniModuleDir)
    const pkgPath = path.resolve(uniModuleRootDir, 'package.json')
    if (!fs.existsSync(pkgPath)) {
      return
    }
    try {
      let exports: Exports | undefined
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      if (pkg && pkg.uni_modules && pkg.uni_modules['uni-ext-api']) {
        exports = pkg.uni_modules['uni-ext-api']
      }
      if (exports) {
        const provider = exports.provider as any
        if (provider && provider.service) {
          provider.plugin = uniModuleDir
          extApiProviders.push(provider)
        }
        extApiPlugins.add(uniModuleDir)
        const curInjects = parseInjects(
          vite,
          platform,
          language,
          `@/uni_modules/${uniModuleDir}`,
          uniModuleRootDir,
          exports
        )
        Object.assign(injects, curInjects)
      }
    } catch (e) {}
  })
  return injects
}

export function parseUniExtApi(
  pluginDir: string,
  pluginId: string,
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage = 'javascript'
) {
  const pkgPath = path.resolve(pluginDir, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    return
  }
  let exports: Exports | undefined
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  if (pkg && pkg.uni_modules && pkg.uni_modules['uni-ext-api']) {
    exports = pkg.uni_modules['uni-ext-api']
  }
  if (exports) {
    return parseInjects(
      vite,
      platform,
      language,
      `@/uni_modules/${pluginId}`,
      pluginDir,
      exports
    )
  }
}

type Inject = string | string[]
export type Injects = {
  [name: string]:
    | string
    | [string, string]
    | [string, string, DefineOptions['app']]
    | false
}
/**
 *  uni:'getBatteryInfo'
 * import getBatteryInfo from '..'
 *
 * uni:['getBatteryInfo']
 * import { getBatteryInfo } from '..'
 *
 * uni:['openLocation','chooseLocation']
 * import { openLocation, chooseLocation } from '..'
 *
 * uni:{
 *  onUserCaptureScreen: "onCaptureScreen"
 *  offUserCaptureScreen: "offCaptureScreen"
 * }
 *
 * uni.getBatteryInfo = getBatteryInfo
 * @param source
 * @param globalObject
 * @param define
 * @returns
 */
export function parseInjects(
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage,
  source: string,
  uniModuleRootDir: string,
  exports: Exports = {}
) {
  if (platform === 'app-plus') {
    platform = 'app'
  }
  let rootDefines: Defines = {}
  Object.keys(exports).forEach((name) => {
    if (name.startsWith('uni')) {
      rootDefines[name] = exports[name] as Inject
    }
  })
  const injects: Injects = {}
  if (Object.keys(rootDefines).length) {
    const platformIndexFileName = path.resolve(
      uniModuleRootDir,
      'utssdk',
      platform
    )
    const rootIndexFileName = path.resolve(
      uniModuleRootDir,
      'utssdk',
      'index.uts'
    )
    let hasPlatformFile = uniModuleRootDir
      ? fs.existsSync(rootIndexFileName) || fs.existsSync(platformIndexFileName)
      : true
    if (!hasPlatformFile) {
      if (platform === 'app') {
        hasPlatformFile =
          fs.existsSync(
            path.resolve(uniModuleRootDir, 'utssdk', 'app-android')
          ) ||
          fs.existsSync(path.resolve(uniModuleRootDir, 'utssdk', 'app-ios')) ||
          fs.existsSync(path.resolve(uniModuleRootDir, 'utssdk', 'app-harmony'))
      }
    }
    // 其他平台修改source，直接指向目标文件，否则 uts2js 找不到类型信息
    if (
      platform !== 'app' &&
      platform !== 'app-android' &&
      platform !== 'app-ios' &&
      platform !== 'app-harmony'
    ) {
      if (fs.existsSync(platformIndexFileName)) {
        source = `${source}/utssdk/${platform}/index.uts`
      } else if (fs.existsSync(rootIndexFileName)) {
        source = `${source}/utssdk/index.uts`
      }
    } else if (process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js') {
      if (
        fs.existsSync(
          path.resolve(uniModuleRootDir, 'utssdk', 'app-js', 'index.uts')
        )
      ) {
        source = `${source}/utssdk/app-js/index.uts`
      }
    }

    for (const key in rootDefines) {
      Object.assign(
        injects,
        parseInject(
          vite,
          platform,
          language,
          source,
          'uni',
          rootDefines[key],
          hasPlatformFile
        )
      )
    }
  }
  return injects
}

function parseInject(
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage,
  source: string,
  globalObject: string,
  define: Define,
  hasPlatformFile: boolean
) {
  const injects: Injects = {}
  if (define === false) {
  } else if (typeof define === 'string') {
    // {'uni.getBatteryInfo' : '@dcloudio/uni-getbatteryinfo'}
    if (hasPlatformFile) {
      injects[globalObject + '.' + define] = vite ? source : [source, 'default']
    }
  } else if (Array.isArray(define)) {
    // {'uni.getBatteryInfo' : ['@dcloudio/uni-getbatteryinfo','getBatteryInfo]}
    if (hasPlatformFile) {
      define.forEach((d) => {
        injects[globalObject + '.' + d] = [source, d]
      })
    }
  } else {
    const keys = Object.keys(define)
    keys.forEach((d) => {
      if (typeof define[d] === 'string') {
        if (hasPlatformFile) {
          injects[globalObject + '.' + d] = [source, define[d] as string]
        }
      } else {
        const defineOptions = define[d] as DefineOptions
        const p =
          platform === 'app-android' ||
          platform === 'app-ios' ||
          platform === 'app-harmony'
            ? 'app'
            : platform
        if (!(p in defineOptions)) {
          if (hasPlatformFile) {
            injects[globalObject + '.' + d] = [source, defineOptions.name || d]
          }
        } else {
          if (defineOptions[p] !== false) {
            if (p === 'app') {
              const appOptions = defineOptions.app
              if (isPlainObject(appOptions)) {
                // js engine 下且存在 app-js，不检查
                const skipCheck =
                  process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js' &&
                  source.includes('app-js')
                if (!skipCheck) {
                  const targetLanguage =
                    language === 'javascript' ? 'js' : language
                  if (targetLanguage && appOptions[targetLanguage] === false) {
                    return
                  }
                }
              }
              injects[globalObject + '.' + d] = [
                source,
                defineOptions.name || d,
                defineOptions.app,
              ]
            } else {
              injects[globalObject + '.' + d] = [
                source,
                defineOptions.name || d,
              ]
            }
          }
        }
      }
    })
  }
  return injects
}

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)

function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

const camelizeRE = /-(\w)/g
/**
 * @private
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

/**
 * @private
 */
export const capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)

/**
 * 解析 UTS 类型的模块依赖列表
 * @param deps
 * @param inputDir
 * @returns
 */
export function parseUTSModuleDeps(deps: string[], inputDir: string): string[] {
  const modulesDir = path.resolve(inputDir, 'uni_modules')
  return deps.filter((dep) => {
    return fs.existsSync(path.resolve(modulesDir, dep, 'utssdk'))
  })
}

export async function compileUniModuleWithTsc(
  platform: 'app-android' | 'app-ios',
  pluginDir: string,
  uniXCompiler: UniXCompiler,
  preprocessors: Preprocessors
) {
  const inputDir = process.env.UNI_INPUT_DIR

  // 初始化编译器
  await uniXCompiler.init()
  // 同步资源
  await syncUniModuleFilesByCompiler(
    uniXCompiler,
    pluginDir,
    resolveOutputPluginDir(platform, inputDir, pluginDir),
    resolveUVueOutputPluginDir(platform, inputDir, pluginDir),
    preprocessors
  )

  // 添加入口
  const indexFileName = resolveTscUniModuleIndexFileName(
    platform,
    resolveOutputPluginDir(platform, inputDir, pluginDir)
  )
  if (indexFileName) {
    await uniXCompiler.addRootFile(indexFileName)
  }
  await uniXCompiler.close()
}

export async function syncUniModuleFilesByCompiler(
  compiler: UniXCompiler,
  pluginDir: string,
  outputPluginDir: string,
  uvueOutputPluginDir: string,
  preprocessors: Preprocessors
) {
  const start = Date.now()
  // 目前每次编译，都全量比对同步uni_modules目录下的文件，不然还要 watch dir
  const files = await syncUniModuleFiles(
    pluginDir,
    outputPluginDir,
    true,
    preprocessors
  )
  const staticFiles = await syncUniModuleStaticFiles(
    pluginDir,
    uvueOutputPluginDir,
    preprocessors
  )
  if (staticFiles.length) {
    files.push(...staticFiles)
  }
  // copy vue files
  const vueFiles = await syncUniModuleVueFiles(
    pluginDir,
    uvueOutputPluginDir,
    preprocessors
  )
  if (vueFiles.length) {
    // 如果有组件，那再 uts 文件 copy 到 .uvue 目录下，避免 tsc 不 emit 相关的 uts 文件
    // 如果 tsc emit 了，那就会再次覆盖
    await syncUniModuleFiles(
      pluginDir,
      uvueOutputPluginDir,
      false,
      preprocessors
    )
    compiler.debug(
      `${path.basename(pluginDir)} sync vue files(${vueFiles.length})`
    )
    files.push(...vueFiles)
  }
  compiler.debug(
    `${path.basename(pluginDir)} sync files(${files.length})`,
    Date.now() - start
  )
}

function resolveUniModuleGlobs() {
  const extname = `.{uts,ts,json}`
  const globs = [
    `*.uts`,
    // test-uts/common/**/*
    `common/**/*${extname}`,
    `utssdk/**/*${extname}`,
  ]
  return globs
}

function resolveUniModuleIgnoreGlobs() {
  const globs = [
    `utssdk/app-android/config.json`,
    `utssdk/app-ios/config.json`,
    `utssdk/app-harmony/**/*`,
    `utssdk/web/**/*`,
    `utssdk/mp-*/**/*`,
  ]
  return globs
}

function resolveUniModuleVueGlobs() {
  const extname = `.{vue,uvue}`
  const globs = [
    `utssdk/app-android/**/*${extname}`,
    `utssdk/app-ios/**/*${extname}`,
  ]
  return globs
}

async function syncUniModuleStaticFiles(
  pluginDir: string,
  outputPluginDir: string,
  preprocessors: Preprocessors
) {
  return fg(`static/**/*`, {
    cwd: pluginDir,
    absolute: false,
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModuleFile(
          fileName,
          pluginDir,
          outputPluginDir,
          false,
          preprocessors
        ).then(() => fileName)
      )
    )
  })
}

async function syncUniModuleVueFiles(
  pluginDir: string,
  outputPluginDir: string,
  preprocessors: Preprocessors
) {
  return fg(resolveUniModuleVueGlobs(), {
    cwd: pluginDir,
    absolute: false,
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModuleFile(
          fileName,
          pluginDir,
          outputPluginDir,
          false,
          preprocessors
        ).then(() => fileName)
      )
    )
  })
}

async function syncUniModuleFiles(
  pluginDir: string,
  outputPluginDir: string,
  rename: boolean,
  preprocessors: Preprocessors
) {
  return fg(resolveUniModuleGlobs(), {
    cwd: pluginDir,
    absolute: false,
    ignore: resolveUniModuleIgnoreGlobs(),
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModuleFile(
          fileName,
          pluginDir,
          outputPluginDir,
          rename,
          preprocessors
        ).then(() => fileName)
      )
    )
  })
}

export type Preprocessors = {
  '.json': (content: string) => string
}
async function syncUniModuleFile(
  relativeFileName: string,
  pluginDir: string,
  outputPluginDir: string,
  rename: boolean,
  preprocessors: Preprocessors
) {
  const src = path.resolve(pluginDir, relativeFileName)
  if (rename) {
    const extname = path.extname(relativeFileName)
    if (extname === '.uts') {
      // test.uts => test.uts.ts
      const dest = path.resolve(outputPluginDir, relativeFileName + '.ts')
      return copyFile(src, dest)
    } else if (extname === '.json') {
      return fs.outputFile(
        path.resolve(outputPluginDir, relativeFileName + '.ts'),
        preprocessors[extname](fs.readFileSync(src, 'utf-8'))
      )
    }
  }
  return copyFile(src, path.resolve(outputPluginDir, relativeFileName))
}

const utsModuleFileCaches = new Map<string, number>()

async function copyFile(src: string, dest: string) {
  const stat = await fs.stat(src)
  const key = src + ',' + dest
  if (utsModuleFileCaches.get(key) === stat.mtimeMs) {
    return
  }
  utsModuleFileCaches.set(key, stat.mtimeMs)
  return fs.copy(src, dest, { overwrite: true })
}

function resolveOutputPluginDir(
  platform: 'app-android' | 'app-ios',
  inputDir: string,
  pluginDir: string
) {
  return path.join(
    process.env.UNI_OUTPUT_DIR,
    '../.tsc',
    platform,
    path.relative(inputDir, pluginDir)
  )
}
function resolveUVueOutputPluginDir(
  platform: 'app-android' | 'app-ios',
  inputDir: string,
  pluginDir: string
) {
  return path.join(
    process.env.UNI_OUTPUT_DIR,
    '../.uvue',
    platform,
    path.relative(inputDir, pluginDir)
  )
}

export function resolveTscUniModuleIndexFileName(
  platform: 'app-android' | 'app-ios',
  pluginDir: string
) {
  let indexFileName = path.resolve(pluginDir, `utssdk/${platform}/index.uts.ts`)
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
  indexFileName = path.resolve(pluginDir, 'utssdk/index.uts.ts')
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
}
