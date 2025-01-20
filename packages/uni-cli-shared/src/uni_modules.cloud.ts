import path from 'path'
import fs from 'fs-extra'
import { sync } from 'fast-glob'
import { camelize, capitalize, normalizePath, requireUniHelpers } from './utils'
import { genUTSComponentPublicInstanceIdent } from './easycom'
import { M } from './messages'

function genEncryptEasyComModuleIndex(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  components: Record<string, '.vue' | '.uvue'>
) {
  const imports: string[] = []
  const ids: string[] = []
  Object.keys(components).forEach((component) => {
    const id = capitalize(camelize(component))

    ids.push(id)
    let instance = ''
    if (platform === 'app-android') {
      instance = genUTSComponentPublicInstanceIdent(component)
      // 类型
      ids.push(instance)
    }
    imports.push(
      `import ${id}${
        instance ? `, { ${instance} }` : ''
      } from './components/${component}/${component}${components[component]}'`
    )
  })
  return `
${imports.join('\n')}
export { 
  ${ids.join(',\n  ')} 
}
  `
}

// easyCom
export function genEncryptEasyComModuleCode(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  components: Record<string, '.vue' | '.uvue'>
) {
  // easyCom
  if (components && Object.keys(components).length) {
    return genEncryptEasyComModuleIndex(platform, components)
  }
  return ''
}

export function genEncryptUTSModuleCode(
  module: string,
  inputDir: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  const utssdkDir = path.resolve(inputDir, 'uni_modules', module, 'utssdk')
  let indexUTSFile = ''
  const platformIndexUTSFile = path.resolve(utssdkDir, platform, 'index.uts')
  if (fs.existsSync(platformIndexUTSFile)) {
    indexUTSFile = `./utssdk/${platform}/index.uts`
  } else {
    const rootIndexUTSFile = path.resolve(utssdkDir, 'index.uts')
    if (fs.existsSync(rootIndexUTSFile)) {
      indexUTSFile = `./utssdk/index.uts`
    }
  }
  if (indexUTSFile) {
    return `export * from '${indexUTSFile}'`
  }
  return ''
}

// 目前该函数仅在云端使用（目前仅限iOS/web），云端编译时，提交上来的uni_modules是过滤好的
export function parseUniModulesWithComponents(
  inputDir: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  const modulesDir = path.resolve(inputDir, 'uni_modules')
  const uniModules: Record<string, string> = {}
  if (fs.existsSync(modulesDir)) {
    fs.readdirSync(modulesDir).forEach((uniModuleDir) => {
      if (
        !fs.existsSync(path.resolve(modulesDir, uniModuleDir, 'package.json'))
      ) {
        return
      }
      let code = genEncryptUTSModuleCode(uniModuleDir, inputDir, platform)
      if (code) {
        // uts插件
        uniModules[uniModuleDir] = code
      } else {
        const codes: string[] = []
        // 前端组件插件
        if (hasIndexFile(path.resolve(inputDir, 'uni_modules', uniModuleDir))) {
          codes.push(`export * from './index'`)
        }
        // 解析加密的 easyCom 插件列表
        const components = parseEasyComComponents(uniModuleDir, inputDir, false)
        if (Object.keys(components).length) {
          codes.push(genEncryptEasyComModuleCode(platform, components))
        }
        if (codes.length) {
          uniModules[uniModuleDir] = codes.join(`\n`)
        }
      }
    })
  }
  return uniModules
}

const indexFiles = ['index.uts', 'index.ts', 'index.js']
function hasIndexFile(uniModuleDir: string) {
  return fs.readdirSync(uniModuleDir).some((file) => indexFiles.includes(file))
}

/**
 * 解析 easyCom 组件列表
 * @param pluginId
 * @param inputDir
 * @returns
 */
export function parseEasyComComponents(
  pluginId: string,
  inputDir: string,
  detectBinary = true
) {
  const componentsDir = path.resolve(
    inputDir,
    'uni_modules',
    pluginId,
    'components'
  )
  const components: Record<string, '.vue' | '.uvue'> = {}
  if (fs.existsSync(componentsDir)) {
    fs.readdirSync(componentsDir).forEach((componentDir) => {
      const componentFile = path.resolve(
        componentsDir,
        componentDir,
        componentDir
      )
      const extname = ['.vue', '.uvue'].find((extname) => {
        const filename = componentFile + extname
        // 探测 filename 是否是二进制文件
        if (fs.existsSync(filename)) {
          if (detectBinary) {
            // 延迟require，这个是新增的依赖，无法及时同步到内部测试版本HBuilderX中，导致报错，所以延迟require吧
            if (require('isbinaryfile').isBinaryFileSync(filename)) {
              return true
            }
          } else {
            return true
          }
        }
      })
      if (extname) {
        components[componentDir] = extname as '.vue' | '.uvue'
      }
    })
  }
  return components
}

// 查找所有普通加密插件 uni_modules
export function findEncryptUniModules(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string,
  cacheDir: string = ''
) {
  const modulesDir = path.resolve(inputDir, 'uni_modules')
  const uniModules: Record<string, EncryptPackageJson | undefined> = {}
  if (fs.existsSync(modulesDir)) {
    fs.readdirSync(modulesDir).forEach((uniModuleDir) => {
      const uniModuleRootDir = path.resolve(modulesDir, uniModuleDir)
      if (!fs.existsSync(path.resolve(uniModuleRootDir, 'encrypt'))) {
        return
      }
      // 只有 app-android 和 app-ios 不需要云编译 utssdk 插件，而是需要自定义基座
      if (platform === 'app-android' || platform === 'app-ios') {
        // 仅扫描普通加密插件，无需依赖
        if (fs.existsSync(path.resolve(uniModuleRootDir, 'utssdk'))) {
          return
        }
      }
      const pkg = require(path.resolve(uniModuleRootDir, 'package.json'))
      uniModules[uniModuleDir] = findEncryptUniModuleCache(
        uniModuleDir,
        cacheDir,
        { version: pkg.version, env: initCheckEnv() }
      )
    })
  }
  return uniModules
}

export function findUploadEncryptUniModulesFiles(
  uniModules: Record<string, EncryptPackageJson | undefined>,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string
): Record<string, string[]> {
  const modules: Record<string, string[]> = {}
  Object.keys(uniModules).forEach((uniModuleId) => {
    if (!uniModules[uniModuleId]) {
      modules[uniModuleId] = findUniModuleFiles(platform, uniModuleId, inputDir)
    }
  })
  return modules
}

export function packUploadEncryptUniModules(
  uniModules: Record<string, EncryptPackageJson | undefined>,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string,
  cacheDir: string
) {
  const modules = findUploadEncryptUniModulesFiles(
    uniModules,
    platform,
    inputDir
  )
  const uploadModuleIds = Object.keys(modules)
  if (uploadModuleIds.length) {
    // 延迟 require，避免 vue2 编译器需要安装此依赖，目前该方法仅在 vite 编译器中使用
    const AdmZip = require('adm-zip')
    const zip = new AdmZip()
    uploadModuleIds.forEach((moduleId) => {
      modules[moduleId].forEach((file) => {
        zip.addLocalFile(file, path.dirname(path.relative(inputDir, file)))
      })
    })
    const zipFile = path.resolve(cacheDir, 'cloud-compile-plugins.zip')
    zip.writeZip(zipFile)
    return {
      zipFile,
      modules: uploadModuleIds,
    }
  }
  return {
    zipFile: '',
    modules: [],
  }
}

function isEnvExpired(
  value: Record<string, unknown>,
  other: Record<string, unknown>
) {
  const valueKeys = Object.keys(value)
  const otherKeys = Object.keys(other)
  if (valueKeys.length !== otherKeys.length) {
    return true
  }
  if (valueKeys.find((name) => value[name] !== other[name])) {
    return true
  }
  return false
}

export interface EncryptPackageJson {
  id: string
  version: string
  uni_modules: {
    dependencies: string[]
    artifacts: {
      env: {
        compilerVersion: string
      } & Record<string, any>
      apis: string[]
      components: string[]
      scopedSlots: string[]
      customElements: { name: string; class: string }[]
      declaration: string
    }
  }
}

function findEncryptUniModuleCache(
  uniModuleId: string,
  cacheDir: string,
  options: {
    version: string
    env: Record<string, string>
  }
): EncryptPackageJson | undefined {
  if (!cacheDir) {
    return
  }
  const uniModuleCacheDir = path.resolve(cacheDir, 'uni_modules', uniModuleId)
  if (fs.existsSync(uniModuleCacheDir)) {
    const pkg = require(path.resolve(
      uniModuleCacheDir,
      'package.json'
    )) as EncryptPackageJson
    // 插件版本以及各种环境一致
    if (
      pkg.version === options.version &&
      !isEnvExpired(pkg.uni_modules?.artifacts?.env || {}, options.env)
    ) {
      const declaration = path.resolve(
        uniModuleCacheDir,
        'utssdk/app-android/index.d.uts'
      )
      pkg.uni_modules.artifacts.declaration = fs.existsSync(declaration)
        ? declaration
        : ''
      return pkg
    }
    console.log(`插件${uniModuleId} 缓存已过期，需要重新云编译。`)
    // 已过期的插件，删除缓存
    fs.rmSync(uniModuleCacheDir, { recursive: true })
  }
}

const KNOWN_ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'pdf',
  'txt',
]

function findUniModuleFiles(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  id: string,
  inputDir: string
) {
  return sync(`uni_modules/${id}/**/*`, {
    cwd: inputDir,
    absolute: true,
    ignore: [
      '**/*.md',
      ...(platform !== 'app-android' // 非 android 平台不需要扫描 assets
        ? [`**/*.{${KNOWN_ASSET_TYPES.join(',')}}`]
        : []),
    ],
  })
}

export function initCheckEnv(): Record<string, string> {
  return {
    // 云端编译的版本号不带日期及小版本
    compilerVersion: process.env.UNI_COMPILER_VERSION,
  }
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

let encryptUniModules: ReturnType<typeof findEncryptUniModules> = {}

export function resolveEncryptUniModule(
  id: string,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  isX: boolean = true
) {
  const parts = id.split('?', 2)[0].split('/')
  const index = findLastIndex(parts, (part) => part === 'uni_modules')
  if (index !== -1) {
    const uniModuleId = parts[index + 1]
    if (uniModuleId in encryptUniModules) {
      if (
        parts[index + 2] &&
        (platform === 'app-android' || platform === 'app-ios')
      ) {
        console.warn(
          M['uni_modules.import']
            .replace('{0}', uniModuleId)
            .replace('{1}', uniModuleId)
            .replace('{2}', parts.slice(index + 2).join('/'))
        )
      }
      // 原生平台走旧的uts-proxy
      return normalizePath(
        path.join(
          process.env.UNI_INPUT_DIR,
          `uni_modules/${uniModuleId}?${
            isX && platform === 'app-android' ? 'uts-proxy' : 'uni_helpers'
          }`
        )
      )
    }
  }
}

export async function checkEncryptUniModules(
  inputDir: string,
  params: {
    mode: 'development' | 'production'
    packType: 'debug' | 'release'
    compilerVersion: string // hxVersion
    appid: string
    appname: string
    platform: typeof process.env.UNI_UTS_PLATFORM // app-android | app-ios | web
    'uni-app-x': boolean
  }
) {
  // 扫描加密插件云编译
  encryptUniModules = findEncryptUniModules(
    params.platform,
    inputDir,
    process.env.UNI_MODULES_ENCRYPT_CACHE_DIR
  )
  if (!Object.keys(encryptUniModules).length) {
    return {}
  }
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return {}
  }

  const cacheDir = process.env.UNI_MODULES_ENCRYPT_CACHE_DIR!
  const { zipFile, modules } = packUploadEncryptUniModules(
    encryptUniModules,
    process.env.UNI_UTS_PLATFORM,
    inputDir,
    cacheDir
  )
  if (zipFile) {
    const downloadFile = path.resolve(cacheDir, 'uni_modules.download.zip')
    const { C, D, R, U } = requireUniHelpers()
    try {
      const isLogin = await C()
      const tips =
        process.env.UNI_UTS_PLATFORM !== 'app-android'
          ? '（此过程耗时较长）'
          : ''
      console.log(
        `正在云编译插件${isLogin ? '' : '（请先登录）'}${tips}：${modules.join(
          ','
        )}...`
      )
      let downloadUrl = ''
      try {
        downloadUrl = await U({
          params,
          attachment: zipFile,
        })
      } catch (e: any) {
        if (e.message && e.message === '{"error":"UserNotLogin"}') {
          console.log(
            '当前项目包含需要云编译的付费插件，需要您先登录HBuilderX账号。'
          )
        } else {
          console.error(e)
        }
        process.exit(0)
      }
      await D(downloadUrl, downloadFile)
      // unzip
      const AdmZip = require('adm-zip')
      const zip = new AdmZip(downloadFile)
      zip.extractAllTo(cacheDir, true)
      fs.unlinkSync(zipFile)
      fs.unlinkSync(downloadFile)
      R({
        dir: process.env.UNI_INPUT_DIR,
        cacheDir: process.env.UNI_MODULES_ENCRYPT_CACHE_DIR,
      })
      console.log(`云编译已完成`)
      console.log(`正在编译中...`)
    } catch (e) {
      fs.existsSync(zipFile) && fs.unlinkSync(zipFile)
      fs.existsSync(downloadFile) && fs.unlinkSync(downloadFile)
      console.error(e)
      process.exit(0)
    }
  } else {
    // android 平台需要在这里初始化
    if (params.platform === 'app-android') {
      const { R } = requireUniHelpers()
      R({
        dir: process.env.UNI_INPUT_DIR,
        cacheDir: process.env.UNI_MODULES_ENCRYPT_CACHE_DIR,
      })
    }
  }
  encryptUniModules = findEncryptUniModules(
    params.platform,
    inputDir,
    process.env.UNI_MODULES_ENCRYPT_CACHE_DIR
  )
}

export function parseUniModulesArtifacts() {
  const res: {
    name: string
    package: string
    scopedSlots: string[]
    declaration: string
  }[] = []
  Object.keys(encryptUniModules).forEach((uniModuleId) => {
    const pkg = encryptUniModules[uniModuleId]
    if (pkg?.uni_modules?.artifacts) {
      res.push({
        name: uniModuleId,
        package: `uts.sdk.modules.${camelize(uniModuleId)}`,
        scopedSlots: pkg.uni_modules.artifacts.scopedSlots || [],
        declaration: pkg.uni_modules.artifacts.declaration,
      })
    }
  })
  return res
}
