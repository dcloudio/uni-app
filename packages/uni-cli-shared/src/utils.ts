import fs from 'fs'
import os from 'os'
import path from 'path'
import colors from 'picocolors'
import { camelize, capitalize } from '@vue/shared'
export { default as hash } from 'hash-sum'
import {
  EXTNAME_TS_RE,
  PAGE_EXTNAME,
  PAGE_EXTNAME_APP,
  X_PAGE_EXTNAME,
  X_PAGE_EXTNAME_APP,
} from './constants'

import {
  type ElementNode,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
} from '@vue/compiler-core'
import type { ParserPlugin } from '@babel/parser'
import { getPlatformDir } from './platform'
import { isInHBuilderX } from './hbx'
import { parseManifestJsonOnce } from './json'

// 专为 uts.ts 服务
export { camelize, capitalize, isArray } from '@vue/shared'

// export let isRunningWithYarnPnp: boolean
// try {
//   isRunningWithYarnPnp = Boolean(require('pnpapi'))
// } catch {}

export const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return isWindows ? id.replace(/\\/g, '/') : id
}

export function checkElementNodeTag(
  node: RootNode | TemplateChildNode | null | undefined,
  tag: string
): node is ElementNode {
  return !!node && node.type === NodeTypes.ELEMENT && node.tag === tag
}

/**
 * 根据 path 返回合法 js 变量
 * @param str pages.json.page.path
 * @returns
 */
export function normalizeIdentifier(str: string) {
  let _str = str.replace(/[^a-zA-Z0-9]+/g, '-')
  _str = capitalize(camelize(_str))
  // 不允许数字开头，补充 _
  if (/^\d/.test(_str)) {
    _str = '_' + _str
  }
  return _str
}

export function normalizePagePath(pagePath: string, platform: UniApp.PLATFORM) {
  const absolutePagePath = path.resolve(process.env.UNI_INPUT_DIR, pagePath)
  const isX = process.env.UNI_APP_X === 'true'
  let extensions = isX ? X_PAGE_EXTNAME : PAGE_EXTNAME
  if (platform === 'app') {
    extensions = isX ? X_PAGE_EXTNAME_APP : PAGE_EXTNAME_APP
  }
  for (let i = 0; i < extensions.length; i++) {
    const extname = extensions[i]
    if (fs.existsSync(absolutePagePath + extname)) {
      return pagePath + extname
    }
  }
  console.error(`${pagePath} not found`)
}

export function removeExt(str: string) {
  return str.split('?')[0].replace(/\.\w+$/g, '')
}

const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g

export function normalizeNodeModules(str: string) {
  str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules')
  // HBuilderX 内置模块路径转换
  str = str.replace(
    /.*\/plugins\/uniapp-cli-vite\/node[-_]modules/,
    'node-modules'
  )
  if (!isInHBuilderX()) {
    // 内部测试
    if (str.includes('uni-app-next/packages/')) {
      str = str.replace(
        /.*\/uni-app-next\/packages\//,
        'node-modules/@dcloudio/'
      )
    }
  }

  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  }
  return str
}

export function normalizeMiniProgramFilename(
  filename: string,
  inputDir?: string
) {
  if (!inputDir || !path.isAbsolute(filename)) {
    return normalizeNodeModules(filename)
  }
  return normalizeNodeModules(path.relative(inputDir, filename))
}

export function normalizeParsePlugins(
  importer: string,
  babelParserPlugins?: ParserPlugin[]
) {
  const isTS = EXTNAME_TS_RE.test(importer.split('?')[0])
  const plugins: ParserPlugin[] = []
  if (isTS) {
    plugins.push('jsx')
  }
  if (babelParserPlugins) plugins.push(...babelParserPlugins)
  if (isTS) plugins.push('typescript', 'decorators-legacy')
  return plugins
}

export function pathToGlob(
  pathString: string,
  glob: string,
  options: { windows?: boolean; escape?: boolean } = {}
): string {
  const isWindows =
    'windows' in options ? options.windows : /^win/.test(process.platform)
  const useEscape = options.escape
  const str = isWindows ? pathString.replace(/\\/g, '/') : pathString
  let safeStr = str.replace(
    /[\\*?[\]{}()!]/g,
    isWindows || !useEscape ? '[$&]' : '\\$&'
  )
  return path.posix.join(safeStr, glob)
}

export function resolveSourceMapPath(
  outputDir?: string,
  platform?: UniApp.PLATFORM
) {
  return path.resolve(
    outputDir || process.env.UNI_OUTPUT_DIR,
    '../.sourcemap/' + (platform || getPlatformDir())
  )
}

function hasProjectYarn(cwd: string) {
  return fs.existsSync(path.join(cwd, 'yarn.lock'))
}

function hasProjectPnpm(cwd: string) {
  return fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))
}

function getInstallCommand(cwd: string) {
  return hasProjectYarn(cwd)
    ? 'yarn add'
    : hasProjectPnpm(cwd)
    ? 'pnpm i'
    : 'npm i'
}

export function installDepTips(
  type: 'dependencies' | 'devDependencies',
  module: string,
  version?: string
) {
  return `Cannot find module: ${module}
Please run \`${colors.cyan(
    `${getInstallCommand(process.cwd())} ${
      module + (version ? '@' + version : '')
    }${type === 'devDependencies' ? ' -D' : ''}`
  )}\` and try again.`
}

/**
 * 根据路径判断是否为 App.(u?)vue
 * @param {string} filename 相对、绝对路径
 * @returns
 */
export function isAppVue(filename: string) {
  const _filePath = normalizePath(filename)
  return /(\/|\\)app\.(u?)vue$/.test(_filePath.toLowerCase())
}

export function resolveAppVue(inputDir: string) {
  if (process.env.UNI_APP_X === 'true') {
    const appUVue = path.resolve(inputDir, 'App.uvue')
    if (fs.existsSync(appUVue)) {
      return normalizePath(appUVue)
    }
  }
  return normalizePath(path.resolve(inputDir, 'App.vue'))
}

export function parseImporter(importer: string) {
  importer = importer.split('?')[0]
  if (path.isAbsolute(importer)) {
    return normalizePath(path.relative(process.env.UNI_INPUT_DIR, importer))
  }
  return importer
}

export function createResolveErrorMsg(source: string, importer: string) {
  return `Could not resolve "${source}" from "${parseImporter(importer)}"`
}

export function enableSourceMap() {
  if (process.env.UNI_APP_SOURCEMAP === 'true') {
    return true
  }
  if (process.env.UNI_APP_SOURCEMAP === 'false') {
    return false
  }
  return process.env.NODE_ENV === 'development' && isNormalCompileTarget()
}

export function requireUniHelpers() {
  require(path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    'uni_helpers/lib/bytenode'
  ))
  return require(path.join(process.env.UNI_HBUILDERX_PLUGINS, 'uni_helpers'))
}

export function normalizeEmitAssetFileName(fileName: string) {
  const extname = path.extname(fileName)

  if (process.env.UNI_APP_X_TSC === 'true') {
    if (extname !== '.ts') {
      return fileName + '.ts'
    }
  } else {
    // logo.png、pages.json 等
    if (!['.ts', '.uts', '.uvue', '.vue'].includes(extname)) {
      fileName = fileName + '.uts'
    }
  }
  return fileName
}

function createIdent(platform: UniApp.PLATFORM) {
  if (process.env.UNI_INPUT_DIR) {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    let id = (manifestJson.appid || '').replace('__UNI__', '')
    const platformAppId = manifestJson[platform]?.appid
    if (platformAppId) {
      id += '%%' + platformAppId
    }
    if (id) {
      return Buffer.from(Buffer.from(id).toString('base64')).toString('hex')
    }
  }
  return ''
}

export function createShadowImageUrl(cdn: number, type: string = 'grey') {
  let identStr = ''
  if (process.env.UNI_PLATFORM !== 'h5' && process.env.UNI_PLATFORM !== 'web') {
    const ident = createIdent(process.env.UNI_PLATFORM)
    identStr = ident ? `${ident}/` : ''
  }
  return `https://cdn${
    (cdn || 0) + (process.env.UNI_APP_X === 'true' ? 1000 : 0) || ''
  }.dcloud.net.cn/${identStr}img/shadow-${type}.png`
}

export function isNormalCompileTarget() {
  // 目前有特殊编译目标 uni_modules 和 ext-api
  return !process.env.UNI_COMPILE_TARGET
}
