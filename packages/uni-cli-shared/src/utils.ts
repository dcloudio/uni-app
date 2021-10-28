import fs from 'fs'
import os from 'os'
import path from 'path'
import { camelize, capitalize } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
export { default as hash } from 'hash-sum'

import { PAGE_EXTNAME, PAGE_EXTNAME_APP } from './constants'
import { SFCTemplateCompileOptions } from '@vue/compiler-sfc'
import { NodeTypes, ElementNode, Node } from '@vue/compiler-core'
export const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return isWindows ? id.replace(/\\/g, '/') : id
}

export function checkElementNodeTag(
  node: Node | null | undefined,
  tag: string
): node is ElementNode {
  return (
    !!node &&
    node.type === NodeTypes.ELEMENT &&
    (node as ElementNode).tag === tag
  )
}

export const resolveMainPathOnce = once((inputDir: string) => {
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return normalizePath(mainTsPath)
  }
  return normalizePath(path.resolve(inputDir, 'main.js'))
})

export function resolveBuiltIn(path: string) {
  if (process.env.UNI_CLI_CONTEXT) {
    return require.resolve(path, { paths: [process.env.UNI_CLI_CONTEXT] })
  }
  return require.resolve(path)
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
  str = str.replace(/.*\/plugins\/uniapp-cli\/node[-_]modules/, 'node-modules')
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

export function createUniVueTransformAssetUrls(
  base: string
): SFCTemplateCompileOptions['transformAssetUrls'] {
  return {
    base,
    tags: {
      audio: ['src'],
      video: ['src', 'poster'],
      img: ['src'],
      image: ['src'],
      'cover-image': ['src'],
      // h5
      'v-uni-audio': ['src'],
      'v-uni-video': ['src', 'poster'],
      'v-uni-image': ['src'],
      'v-uni-cover-image': ['src'],
      // nvue
      'u-image': ['src'],
      'u-video': ['src', 'poster'],
    },
  }
}
