import path from 'path'
import {
  addMiniProgramComponentJson,
  normalizeMiniProgramFilename,
  normalizePath,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import { Plugin } from 'vite'
import { UniMiniProgramPluginOptions } from '../plugin'

function encode(str: string) {
  return Buffer.from(str).toString('base64url')
}

function decode(str: string) {
  return Buffer.from(str, 'base64url').toString()
}

const uniPagePrefix = 'uniPage://'
const uniComponentPrefix = 'uniComponent://'

export function virtualPagePath(filepath: string) {
  return uniPagePrefix + encode(filepath)
}
export function virtualComponentPath(filepath: string) {
  return uniComponentPrefix + encode(filepath)
}

export function parseVirtualPagePath(uniPageUrl: string) {
  return decode(uniPageUrl.replace(uniPagePrefix, ''))
}

export function parseVirtualComponentPath(uniComponentUrl: string) {
  return decode(uniComponentUrl.replace(uniComponentPrefix, ''))
}

export function isUniPageUrl(id: string) {
  return id.startsWith(uniPagePrefix)
}

export function isUniComponentUrl(id: string) {
  return id.startsWith(uniComponentPrefix)
}

export function uniEntryPlugin({
  global,
}: UniMiniProgramPluginOptions): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  return {
    name: 'vite:uni-virtual',
    enforce: 'pre',
    resolveId(id) {
      if (isUniPageUrl(id) || isUniComponentUrl(id)) {
        return id
      }
    },
    load(id) {
      if (isUniPageUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualPagePath(id))
        )
        this.addWatchFile(filepath)
        return {
          code: `import MiniProgramPage from '${filepath}?mpType=page'
${global}.createPage(MiniProgramPage)`,
        }
      } else if (isUniComponentUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualComponentPath(id))
        )
        this.addWatchFile(filepath)
        addMiniProgramComponentJson(
          removeExt(normalizeMiniProgramFilename(filepath, inputDir)),
          { component: true }
        )
        return {
          code: `import Component from '${filepath}'
${global}.createComponent(Component)`,
        }
      }
    },
  }
}
