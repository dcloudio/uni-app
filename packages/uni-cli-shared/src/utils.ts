import fs from 'fs'
import os from 'os'
import path from 'path'
import { camelize, capitalize } from '@vue/shared'
export { default as hash } from 'hash-sum'
import { EXTNAME_TS_RE, PAGE_EXTNAME, PAGE_EXTNAME_APP } from './constants'

import {
  NodeTypes,
  ElementNode,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'
import { ParserPlugin } from '@babel/parser'

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
  const absoltePagePath = path.resolve(process.env.UNI_INPUT_DIR, pagePath)
  let extnames = PAGE_EXTNAME
  if (platform === 'app') {
    extnames = PAGE_EXTNAME_APP
  }
  for (let i = 0; i < extnames.length; i++) {
    const extname = extnames[i]
    if (fs.existsSync(absoltePagePath + extname)) {
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
