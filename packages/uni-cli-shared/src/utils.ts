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
  NodeTypes,
  ElementNode,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'
import { ParserPlugin } from '@babel/parser'
import { getPlatformDir } from './platform'
import { isInHBuilderX } from './hbx'

export const version = require('../package.json').version

// 专为 uts.ts 服务
export { camelize, capitalize, isArray } from '@vue/shared'

export let isRunningWithYarnPnp: boolean
try {
  isRunningWithYarnPnp = Boolean(require('pnpapi'))
} catch {}

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

export function normalizeIdentifier(str: string) {
  return capitalize(camelize(str.replace(/\//g, '-')))
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

export function isAppVue(filename: string) {
  return filename.endsWith('App.vue') || filename.endsWith('App.uvue')
}

export function resolveAppVue(inputDir: string) {
  const appUVue = path.resolve(inputDir, 'App.uvue')
  if (fs.existsSync(appUVue)) {
    return normalizePath(appUVue)
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
