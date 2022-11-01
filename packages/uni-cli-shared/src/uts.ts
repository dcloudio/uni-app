import fs from 'fs'
import path from 'path'

import * as UTSCompiler from '@dcloudio/uni-uts-v1'

import { isInHBuilderX } from './hbx'
import { normalizePath } from './utils'

/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
export function resolveUtsAppModule(id: string, importer: string) {
  id = path.resolve(importer, id)
  if (id.includes('utssdk') || id.includes('uni_modules')) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      if (fs.existsSync(path.resolve(id, basedir, 'index.uts'))) {
        return id
      }
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, basedir, p)
      }
      const extname = ['.uts']
      if (resolveUtsFile(resolvePlatformDir('app-android'), extname)) {
        return id
      }
      if (resolveUtsFile(resolvePlatformDir('app-ios'), extname)) {
        return id
      }
    }
  }
}

// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
export function resolveUtsModule(id: string, importer: string) {
  if (
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-plus'
  ) {
    return resolveUtsAppModule(id, importer)
  }
  id = path.resolve(importer, id)
  if (id.includes('utssdk') || id.includes('uni_modules')) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, basedir, p)
      }

      let index = resolveUtsFile(
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

function resolveUtsFile(
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
    } catch (e) {}
  }
  if (!compilerPath) {
    throw 'uts compiler is not found'
  }
  return require(compilerPath)
}
