import fs from 'fs'

import path from 'path'
import debug from 'debug'
import resolve from 'resolve'
import { once } from '@dcloudio/uni-shared'
import * as UTSCompiler from '@dcloudio/uni-uts-v1'

import { normalizePath } from './utils'
import { isInHBuilderX } from './hbx/env'
import { extensions } from './constants'

export function requireResolve(filename: string, basedir: string) {
  return resolveWithSymlinks(filename, basedir)
}

function resolveWithSymlinks(id: string, basedir: string): string {
  return resolve.sync(id, {
    basedir,
    extensions,
    // necessary to work with pnpm
    preserveSymlinks: true,
  })
}

export function relativeFile(from: string, to: string) {
  const relativePath = normalizePath(path.relative(path.dirname(from), to))
  return relativePath.startsWith('.') ? relativePath : './' + relativePath
}

export const resolveMainPathOnce = once((inputDir: string) => {
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return normalizePath(mainTsPath)
  }
  return normalizePath(path.resolve(inputDir, 'main.js'))
})

const ownerModules = ['@dcloudio/uni-app', '@dcloudio/vite-plugin-uni']

const paths: string[] = []

function resolveNodeModulePath(modulePath: string) {
  const nodeModulesPaths: string[] = []
  const nodeModulesPath = path.join(modulePath, 'node_modules')
  if (fs.existsSync(nodeModulesPath)) {
    nodeModulesPaths.push(nodeModulesPath)
  }
  const index = modulePath.lastIndexOf('node_modules')
  if (index > -1) {
    nodeModulesPaths.push(path.join(modulePath.slice(0, index), 'node_modules'))
  }
  return nodeModulesPaths
}

function initPaths() {
  const cliContext = process.env.UNI_CLI_CONTEXT
  if (cliContext) {
    const pathSet = new Set<string>()
    pathSet.add(path.join(cliContext, 'node_modules'))
    if (!isInHBuilderX()) {
      ;[`@dcloudio/uni-` + process.env.UNI_PLATFORM, ...ownerModules].forEach(
        (ownerModule) => {
          let pkgPath: string = ''
          try {
            pkgPath = require.resolve(ownerModule + '/package.json', {
              paths: [cliContext],
            })
          } catch (e) {}
          if (pkgPath) {
            resolveNodeModulePath(path.dirname(pkgPath)).forEach(
              (nodeModulePath) => {
                pathSet.add(nodeModulePath)
              }
            )
          }
        }
      )
    }
    paths.push(...pathSet)
    debug('uni-paths')(paths)
  }
}

export function getBuiltInPaths() {
  if (!paths.length) {
    initPaths()
  }
  return paths
}

export function resolveBuiltIn(path: string) {
  return require.resolve(path, { paths: getBuiltInPaths() })
}

export function resolveVueI18nRuntime() {
  return path.resolve(
    __dirname,
    '../lib/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
  )
}

let componentsLibPath: string = ''
export function resolveComponentsLibPath() {
  if (!componentsLibPath) {
    if (isInHBuilderX()) {
      componentsLibPath = path.join(
        resolveBuiltIn('@dcloudio/uni-components/package.json'),
        '../lib'
      )
    } else {
      componentsLibPath = path.join(
        resolveWithSymlinks(
          '@dcloudio/uni-components/package.json',
          process.env.UNI_INPUT_DIR
        ),
        '../lib'
      )
    }
  }
  return componentsLibPath
}

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

export function resolveUtsModuleProxyFile(id: string, importer: string) {
  const file = resolveUtsAppModule(id, importer)
  if (file) {
    return '\0' + file + '?uts-proxy'
  }
}
// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
export function resolveUtsModule(
  id: string,
  importer: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  if (process.env.UNI_PLATFORM === 'app') {
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

      let index = resolveUtsFile(resolvePlatformDir(platform))
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
        path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts')
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
