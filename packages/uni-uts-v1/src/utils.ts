import path, { basename, resolve } from 'path'
import fs from 'fs-extra'
import type {
  UTSOutputOptions,
  UTSResult,
  UTSTarget,
  bundle,
  parse,
} from '@dcloudio/uts'
import {
  camelize,
  capitalize,
  hasOwn,
  isArray,
  isPlainObject,
  isString,
} from '@vue/shared'
import glob from 'fast-glob'
import type { Module, ModuleItem } from '../types/types'
import {
  installHBuilderXPlugin,
  isInHBuilderX,
  normalizePath,
  parseJson,
  resolveSourceMapPath,
  runByHBuilderX,
} from './shared'
import type { ClassMeta } from './code'
import { uvueOutDir } from './uvue'

type UTSPluginPlatform = 'app-android' | 'app-ios' | 'app-harmony'
interface ToOptions {
  inputDir: string
  outputDir: string
  outFilename?: string
  sourceMap: boolean
  components: Record<string, string>
  isX: boolean
  isSingleThread: boolean
  isPlugin: boolean
  isExtApi?: boolean
  isModule?: boolean
  extApis?: Record<string, [string, string]>
  transform?: UTSOutputOptions['transform']
  uniModules: string[]
}
export type ToKotlinOptions = ToOptions
export type ToSwiftOptions = ToOptions

export const ERR_MSG_PLACEHOLDER = `___ERR_MSG___`

export interface RunOptions {
  components: Record<string, string>
  extApis?: Record<string, [string, string]>
  isPlugin: boolean
  isSingleThread: boolean
  isX: boolean
  isExtApi?: boolean
  sourceMap: boolean
  transform?: UTSOutputOptions['transform']
  uniModules: string[]
}

export interface RunProdOptions extends RunOptions {
  isModule?: boolean
  hookClass: string
  uniModuleId: string
  outFilename?: string
}

export interface RunDevOptions extends RunOptions {
  cacheDir: string
  pluginRelativeDir: string
  is_uni_modules: boolean
}

export function resolveUTSSourceMapPath() {
  return resolveSourceMapPath()
}

export function getUTSCompiler(): {
  parse: typeof parse
  bundle: typeof bundle
  UTSTarget: typeof UTSTarget
} {
  // eslint-disable-next-line no-restricted-globals
  return require('@dcloudio/uts')
}

function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, array: T[]) => unknown
) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }
  return -1
}

export function resolvePackage(filename: string) {
  const parts = normalizePath(filename).split('/')

  const isUniModules = parts.includes('uni_modules')
  const index = isUniModules
    ? findLastIndex(parts, (part) => part === 'uni_modules')
    : findLastIndex(parts, (part) => part === 'utssdk')
  if (index > -1) {
    const id = parts[index + 1]
    const name = camelize(prefix(id))
    return {
      id,
      name,
      namespace: 'UTSSDK' + (isUniModules ? 'Modules' : '') + capitalize(name),
      is_uni_modules: isUniModules,
      extname: '.uts',
    }
  }
}

const GARBAGE_REGEX = /(?:Thumbs\.db|\.DS_Store)$/i
const isGarbageFile = (file: string) => GARBAGE_REGEX.test(file)

// 删除所有空子目录，需要考虑到.DS_Store等文件
function removeAllEmptySubDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }

  try {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        removeAllEmptySubDir(filePath)

        const subFiles = fs.readdirSync(filePath)
        if (subFiles.length === 0 || subFiles.every(isGarbageFile)) {
          fs.rmSync(filePath, { recursive: true, force: true })
        }
      }
    }
  } catch {}
}

export function copyPlatformFiles(
  utsInputDir: string,
  utsOutputDir: string,
  extname: string[]
) {
  const files: string[] = []
  if (fs.existsSync(utsInputDir)) {
    fs.copySync(utsInputDir, utsOutputDir, {
      filter(src) {
        if (fs.statSync(src).isDirectory()) {
          return true
        }
        if (extname.includes(path.extname(src))) {
          files.push(src)
          return true
        }
        return false
      },
    })
  }
  return files
}

export interface UTSPlatformResourceOptions {
  isX: boolean
  pluginId: string
  inputDir: string
  outputDir: string
  platform: typeof process.env.UNI_UTS_PLATFORM
  extname: '.kt' | '.swift'
  components: Record<string, string>
  package: string
  hookClass: string
  result: UTSResult
  provider?: { name: string; service: string; class: string }
  uniModules: string[]
}

export function genUTSPlatformResource(
  filename: string,
  options: UTSPlatformResourceOptions
) {
  const platformFile = resolveUTSPlatformFile(filename, options)
  const { platform } = options
  const utsInputDir = resolveUTSPlatformDir(filename, platform)
  const utsOutputDir = resolveUTSPlatformDir(platformFile, platform)

  const extname: string[] =
    options.extname === '.kt' ? ['.kt', '.java'] : [options.extname]
  const configJsonFile = normalizePath(path.resolve(utsInputDir, 'config.json'))
  // 拷贝所有非uts,vue文件及目录
  if (fs.existsSync(utsInputDir)) {
    fs.copySync(utsInputDir, utsOutputDir, {
      filter(src) {
        // ignore config.json
        if (normalizePath(src) === configJsonFile) {
          return false
        }
        if (extname.includes(path.extname(src))) {
          return false
        }
        return !['.uts', '.vue'].includes(path.extname(src))
      },
    })
  }

  if (options.uniModules && options.uniModules.length) {
    const pkgJsonFile = path.resolve(
      options.inputDir,
      'uni_modules',
      options.pluginId,
      'package.json'
    )
    if (fs.existsSync(pkgJsonFile)) {
      fs.copyFileSync(
        pkgJsonFile,
        path.resolve(
          options.outputDir,
          'uni_modules',
          options.pluginId,
          'package.json'
        )
      )
    }
  }

  copyConfigJson(
    platform,
    options.isX,
    utsInputDir,
    utsOutputDir,
    options.hookClass,
    options.components,
    options.package,
    options.provider
  )

  // 生产模式下，需要将生成的平台文件转移到 src 下
  const srcDir = path.resolve(utsOutputDir, 'src')
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true })
  }
  if (fs.existsSync(platformFile)) {
    fs.moveSync(
      platformFile,
      path.resolve(utsOutputDir, 'src/index' + options.extname),
      {
        overwrite: true,
      }
    )
    copyPlatformFiles(utsInputDir, path.join(utsOutputDir, 'src'), extname)
  }

  if (options.result.chunks) {
    options.result.chunks.forEach((chunk) => {
      const chunkFile = path.resolve(utsOutputDir, chunk)
      if (fs.existsSync(chunkFile)) {
        fs.moveSync(chunkFile, path.resolve(utsOutputDir, 'src', chunk), {
          overwrite: true,
        })
      }
    })
  }
  removeAllEmptySubDir(utsOutputDir)
}

export function moveRootIndexSourceMap(
  filename: string,
  {
    inputDir,
    platform,
    extname,
  }: Omit<UTSPlatformResourceOptions, 'hookClass' | 'pluginId' | 'uniModules'>
) {
  if (isRootIndex(filename, platform)) {
    const sourceMapFilename = path
      .resolve(resolveUTSSourceMapPath(), path.relative(inputDir, filename))
      .replace(path.extname(filename), extname + '.map')
    if (fs.existsSync(sourceMapFilename)) {
      const newSourceMapFilename = path.resolve(
        path.dirname(sourceMapFilename),
        platform,
        path.basename(sourceMapFilename)
      )
      fs.moveSync(sourceMapFilename, newSourceMapFilename, {
        overwrite: true,
      })
    }
  }
}

export function isRootIndex(
  filename: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  return path.basename(path.dirname(filename)) !== platform
}

export function resolveAndroidDir(filename: string) {
  return resolveUTSPlatformDir(filename, 'app-android')
}

export function resolveIOSDir(filename: string) {
  return resolveUTSPlatformDir(filename, 'app-ios')
}

function resolveUTSPlatformDir(
  filename: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  const maybePlatformDir = path.dirname(filename)
  if (isRootIndex(filename, platform)) {
    return path.join(maybePlatformDir, platform)
  }
  return maybePlatformDir
}

export function resolveUTSPlatformFile(
  filename: string,
  {
    inputDir,
    outputDir,
    platform,
    extname,
  }: Omit<UTSPlatformResourceOptions, 'hookClass' | 'pluginId' | 'uniModules'>
) {
  let platformFile = path
    .resolve(outputDir, path.relative(inputDir, filename))
    .replace(path.extname(filename), extname)
  // 如果是根目录的 index.uts 编译出来的 index.kt，则移动到平台目录下
  if (isRootIndex(filename, platform)) {
    if (fs.existsSync(platformFile)) {
      const newPlatformFile = path.resolve(
        path.dirname(platformFile),
        platform + '/index' + extname
      )
      fs.moveSync(platformFile, newPlatformFile, {
        overwrite: true,
      })
      platformFile = newPlatformFile
    }
  }
  return platformFile
}

function resolveTypeAliasDeclNames(items: ModuleItem[]) {
  const names: string[] = []
  items.forEach((item) => {
    if (item.type === 'TsTypeAliasDeclaration') {
      names.push(item.id.value)
    } else if (
      item.type === 'ExportDeclaration' &&
      item.declaration.type === 'TsTypeAliasDeclaration'
    ) {
      names.push(item.declaration.id.value)
    }
  })
  return names
}

export function createResolveTypeReferenceName(
  namespace: string,
  ast: Module,
  interfaceTypes: Record<string, ClassMeta>
) {
  const names = resolveTypeAliasDeclNames(ast.body)
  return (name: string) => {
    if (names.includes(name) || hasOwn(interfaceTypes, name)) {
      return namespace + capitalize(name) + 'JSONObject'
    }
    return name
  }
}

export type CompilerServer = {}
export function getCompilerServer<T extends CompilerServer>(
  pluginName: 'uts-development-ios' | 'uniapp-runextension'
): T | undefined {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    console.error(`HBuilderX is not found`)
    return
  }
  const isAndroid = pluginName === 'uniapp-runextension'
  const compilerServerPath = path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    `${pluginName}/out/${isAndroid ? 'main.js' : 'external.js'}`
  )
  const installed = isAndroid
    ? fs.existsSync(compilerServerPath) &&
      fs.existsSync(
        path.resolve(
          process.env.UNI_HBUILDERX_PLUGINS,
          `uts-development-android/out/external.js`
        )
      )
    : fs.existsSync(compilerServerPath)
  if (installed) {
    // eslint-disable-next-line no-restricted-globals
    return require(compilerServerPath)
  } else {
    if (runByHBuilderX()) {
      installHBuilderXPlugin(isAndroid ? 'uts-development-android' : pluginName)
    } else {
      console.error(compilerServerPath + ' is not found')
    }
  }
}

function resolveComponents(
  platform: 'app-android' | 'app-ios',
  pluginDir: string,
  is_uni_modules: boolean
) {
  const components: Record<string, string> = {}
  const platformDir = path.resolve(
    pluginDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  if (fs.existsSync(platformDir)) {
    glob
      .sync('**/*.vue', { cwd: platformDir, absolute: true })
      .forEach((file) => {
        let name = parseVueComponentName(file)
        if (!name) {
          if (file.endsWith('index.vue')) {
            name = path.basename(pluginDir)
          }
        }
        if (name && !components[name]) {
          components[name] = file
        }
      })
  }
  return components
}

export function resolveAndroidComponents(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolveComponents('app-android', pluginDir, is_uni_modules)
}

export function resolveIOSComponents(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolveComponents('app-ios', pluginDir, is_uni_modules)
}

const nameRE = /export\s+default\s+[\s\S]*?name\s*:\s*['|"](.*?)['|"]/
function parseVueComponentName(file: string) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(nameRE)
  if (matches) {
    return matches[1]
  }
}

export function genComponentsCode(
  filename: string,
  components: Record<string, string>,
  isX: boolean
) {
  const codes: string[] = []
  const dirname = path.dirname(filename)
  Object.keys(components).forEach((name) => {
    const source = normalizePath(path.relative(dirname, components[name]))
    const className = capitalize(camelize(name))
    codes.push(
      `export { default as ${className}Component${
        isX
          ? `, ${process.env.UNI_UTS_MODULE_PREFIX ? 'Uni' : className}Element`
          : ''
      } } from '${source.startsWith('.') ? source : './' + source}'`
    )
  })
  return codes.join('\n')
}

export function genConfigJson(
  platform: 'app-android' | 'app-ios',
  isX: boolean,
  hookClass: string,
  components: Record<string, string>,
  pluginRelativeDir: string,
  is_uni_modules: boolean,
  inputDir: string,
  outputDir: string,
  provider?: { name: string; service: string; class: string }
) {
  // 不过滤了，只要有，就copy
  // if (!Object.keys(components).length && !hookClass && !provider) {
  //   return
  // }
  const pluginId = basename(pluginRelativeDir)
  const utsInputDir = resolve(
    inputDir,
    pluginRelativeDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  const utsOutputDir = resolve(
    outputDir,
    pluginRelativeDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  copyConfigJson(
    platform,
    isX,
    utsInputDir,
    utsOutputDir,
    hookClass,
    components,
    platform === 'app-android'
      ? parseKotlinPackageWithPluginId(pluginId, is_uni_modules) + '.'
      : parseSwiftPackageWithPluginId(pluginId, is_uni_modules),
    provider
  )
}

function copyConfigJson(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  isX: boolean,
  inputDir: string,
  outputDir: string,
  hookClass: string,
  componentsObj: Record<string, string>,
  namespace: string,
  provider?: { name: string; service: string; class: string }
) {
  const configJsonFilename = resolve(inputDir, 'config.json')
  const outputConfigJsonFilename = resolve(outputDir, 'config.json')
  const hasComponents = !!Object.keys(componentsObj).length
  const hasHookClass = !!hookClass
  const hasProvider = !!provider
  if (hasComponents || hasHookClass || hasProvider) {
    const configJson: Record<string, any> = fs.existsSync(configJsonFilename)
      ? parseJson(fs.readFileSync(configJsonFilename, 'utf8'))
      : {}
    //存在组件
    if (hasComponents) {
      configJson.components = genComponentsConfigJson(
        platform,
        isX,
        componentsObj,
        namespace
      )
    }
    if (hasHookClass) {
      configJson.hooksClass = hookClass
    }
    if (hasProvider) {
      configJson.provider = provider
    }
    fs.outputFileSync(
      outputConfigJsonFilename,
      JSON.stringify(configJson, null, 2)
    )
  } else {
    if (fs.existsSync(configJsonFilename)) {
      fs.copySync(configJsonFilename, outputConfigJsonFilename)
    }
  }
}

function genComponentsConfigJson(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  isX: boolean,
  components: Record<string, string>,
  namespace: string
) {
  const res: { name: string; class: string; delegateClass?: string }[] = []
  Object.keys(components).forEach((name) => {
    const normalized = capitalize(camelize(name))
    const options: (typeof res)[0] = {
      name,
      class: namespace + normalized + 'Component',
    }
    if (isX && platform === 'app-ios') {
      options['delegateClass'] = normalized + 'ComponentRegister'
    }
    res.push(options)
  })
  return res
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

export function isColorSupported() {
  if ('NO_COLOR' in process.env || isInHBuilderX()) {
    return false
  }
  return true
}

export function relative(filename: string, inputDir: string) {
  if (path.isAbsolute(filename)) {
    return normalizePath(path.relative(inputDir, filename))
  }
  return filename
}

export function resolveSourceMapFile(outputDir: string, kotlinFile: string) {
  return (
    path.resolve(resolveSourceMapPath(), path.relative(outputDir, kotlinFile)) +
    '.map'
  )
}

export function resolveUniAppXSourceMapPath(tempRootDir: string) {
  return path.resolve(tempRootDir, 'sourcemap')
}

export function resolveUniAppXSourceMapFile(
  tempRootDir: string,
  outputDir: string,
  kotlinFile: string
) {
  return (
    path.resolve(
      resolveUniAppXSourceMapPath(tempRootDir),
      path.relative(outputDir, kotlinFile)
    ) + '.map'
  )
}

export function isUniCloudSupported() {
  if (!process.env.UNI_CLOUD_SPACES) {
    return false
  }
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (Array.isArray(spaces) && spaces.length > 0) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

// 是否应自动引入uniCloud模块
export function shouldAutoImportUniCloud() {
  return (
    isUniCloudSupported() ||
    process.env.UNI_APP_X_UNICLOUD_OBJECT === 'true' ||
    process.env.NODE_ENV !== 'production'
  )
}

export function parseExtApiDefaultParameters() {
  return normalizeExtApiDefaultParameters(
    require('../lib/ext-api/default-parameters.json')
  )
}

export function normalizeExtApiDefaultParameters(json: Record<string, any>) {
  const res: Record<string, string[]> = {}
  Object.keys(json).forEach((key) => {
    const module = json[key]
    Object.keys(module).forEach((api) => {
      const value = module[api]
      if (isArray(value)) {
        const newValue = value.map((v) => v ?? '')
        res[api] = newValue
      } else {
        res[api] = [value]
      }
    })
  })
  return res
}

export function parseInjectModules(
  inject_apis: string[],
  localExtApis: Record<string, [string, string]>,
  extApiComponents: string[]
) {
  const modules = new Set<string>()
  const extApiModules = parseExtApiModules()
  inject_apis.forEach((api) => {
    if (api.startsWith('uniCloud.')) {
      modules.add('uni-cloud-client')
    } else {
      if (
        extApiModules[api] &&
        // 非本地
        !hasOwn(localExtApis, api.replace('uni.', ''))
      ) {
        modules.add(extApiModules[api])
      }
    }
  })
  extApiComponents.forEach((component) => {
    const name = 'component.' + component
    if (extApiModules[name]) {
      modules.add(extApiModules[name])
    }
  })
  return [...modules]
}

function readExtApiModulesJson() {
  const json = require('../lib/ext-api/modules.json')
  if (!json['uni-canvas']) {
    json['uni-canvas'] = {}
  }
  json['uni-canvas']['components'] = ['canvas']
  return json
}

export function parseExtApiModules() {
  return normalizeExtApiModules(readExtApiModulesJson())
}

export function parseExtApiProviders() {
  const modules = readExtApiModulesJson()
  const providers: {
    [name: string]: {
      service: string
      providers: string[]
    }
  } = {}
  const moduleNames = Object.keys(modules)
  // 第一遍，先遍历出来所有的service
  moduleNames.forEach((name) => {
    const module = modules[name]
    const providerOptions = module.provider
    if (providerOptions?.service && !providerOptions?.name) {
      providers[name] = {
        service: providerOptions.service,
        providers: [],
      }
    }
  })
  // 第二遍，遍历所有provider
  moduleNames.forEach((name) => {
    const module = modules[name]
    const providerOptions = module.provider
    if (providerOptions?.name && providerOptions?.service) {
      const moduleName = Object.keys(providers).find(
        (moduleName) =>
          providers[moduleName].service === providerOptions.service
      )
      if (moduleName) {
        providers[moduleName].providers.push(providerOptions.name)
      }
    }
  })
  return providers
}

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

export function normalizeExtApiModules(json: Record<string, any>) {
  const res: Record<string, string> = {}
  Object.keys(json).forEach((module) => {
    const options = json[module] as { uni?: Define; components?: string[] }
    if (isPlainObject(options)) {
      if (options.uni) {
        const uniApis = options.uni
        if (isString(uniApis)) {
          res['uni.' + uniApis] = module
        } else if (isArray(uniApis)) {
          uniApis.forEach((api) => {
            res['uni.' + api] = module
          })
        } else if (isPlainObject(uniApis)) {
          Object.keys(uniApis).forEach((api) => {
            res['uni.' + api] = module
          })
        }
      }
      if (isArray(options.components)) {
        options.components.forEach((component) => {
          res['component.' + component] = module
        })
      }
    }
  })
  return res
}

export function resolveConfigProvider(
  platform: 'app-android' | 'app-ios',
  plugin: string,
  transform: UTSOutputOptions['transform']
) {
  if (transform?.uniExtApiProviderName && transform?.uniExtApiProviderService) {
    return {
      name: transform.uniExtApiProviderName,
      service: transform.uniExtApiProviderService,
      class:
        (platform === 'app-android'
          ? parseKotlinPackageWithPluginId(plugin, true) + '.'
          : parseSwiftPackageWithPluginId(plugin, true)) +
        formatExtApiProviderName(
          transform.uniExtApiProviderService,
          transform.uniExtApiProviderName
        ),
    }
  }
}

export function formatUniProviderName(service: string) {
  if (service === 'oauth') {
    service = 'OAuth'
  }
  return `Uni${capitalize(camelize(service))}Provider`
}

function formatExtApiProviderName(service: string, name: string) {
  if (service === 'oauth') {
    service = 'OAuth'
  }
  return `Uni${capitalize(camelize(service))}${capitalize(
    camelize(name)
  )}ProviderImpl`
}

export function requireUniHelpers() {
  require(path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    'uni_helpers/lib/bytenode'
  ))
  return require(path.join(process.env.UNI_HBUILDERX_PLUGINS, 'uni_helpers'))
}

export function resolveBundleInputRoot(
  platform: UTSPluginPlatform,
  root: string
) {
  if (
    process.env.UNI_APP_X_TSC === 'true' &&
    // 云端uni_modules编译，传入的已经是真实地址
    isNormalCompileTarget()
  ) {
    return uvueOutDir(platform)
  }
  return root
}

export function resolveBundleInputFileName(
  platform: UTSPluginPlatform,
  fileName: string
) {
  if (
    process.env.UNI_APP_X_TSC === 'true' &&
    // 云端uni_modules编译，传入的已经是真实地址 uni-cli-shared/vite/cloud.ts:190
    isNormalCompileTarget()
  ) {
    const uvueDir = uvueOutDir(platform)
    if (!fileName.startsWith(uvueDir)) {
      return normalizePath(
        path.resolve(
          uvueDir,
          path.relative(process.env.UNI_INPUT_DIR, fileName)
        )
      )
    }
  }
  return fileName
}

export function resolveUVueFileName(
  platform: 'app-android' | 'app-ios',
  fileName: string
) {
  if (!fileName) {
    return fileName
  }
  if (process.env.UNI_APP_X_TSC === 'true') {
    const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
    fileName = normalizePath(fileName)
    if (fileName.startsWith(inputDir)) {
      return normalizePath(
        path.resolve(uvueOutDir(platform), path.relative(inputDir, fileName))
      )
    }
  }
  return fileName
}

export function normalizeUTSResult(
  platform: UTSPluginPlatform,
  result: UTSResult
) {
  if (process.env.UNI_APP_X_TSC === 'true') {
    if (result.deps && result.deps.length) {
      const uvueDir = normalizePath(uvueOutDir(platform))
      result.deps = result.deps.map((file) => {
        file = normalizePath(file)
        if (file.startsWith(uvueDir)) {
          return path.resolve(
            process.env.UNI_INPUT_DIR,
            path.relative(uvueDir, file)
          )
        }
        return file
      })
    }
  }
  return result
}

export function isNormalCompileTarget() {
  // 目前有特殊编译目标 uni_modules 和 ext-api
  return !process.env.UNI_COMPILE_TARGET
}

let enableUtsNumber: boolean
export function isEnableUTSNumber() {
  if (enableUtsNumber === undefined) {
    enableUtsNumber = !!(
      process.env.UNI_INPUT_DIR &&
      fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'UTSNUMBER'))
    )
  }
  return enableUtsNumber
}
