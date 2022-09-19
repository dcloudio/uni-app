import fs from 'fs'

import path from 'path'
import debug from 'debug'
import resolve from 'resolve'
import { once } from '@dcloudio/uni-shared'

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

// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
export function resolveUtsModule(
  id: string,
  importer: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  id = path.resolve(importer, id)
  if (id.includes('utssdk') || id.includes('uni_modules')) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, parentDir === 'uni_modules' ? 'utssdk' : '', p)
      }
      // 未指定具体的平台
      if (platform === 'app') {
        platform = 'app-android'
      }
      let index = resolveUtsFile(resolvePlatformDir(platform))
      if (index) {
        return index
      }
      index = path.resolve(id, 'index.uts')
      if (fs.existsSync(index)) {
        return index
      }
      // 如果是 android 或 ios，本平台没有，则查找一下另一个平台
      if (platform === 'app-android') {
        return resolveUtsFile(resolvePlatformDir('app-ios'))
      } else if (platform === 'app-ios') {
        return resolveUtsFile(resolvePlatformDir('app-android'))
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
