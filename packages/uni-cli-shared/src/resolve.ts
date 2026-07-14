import fs from 'fs'

import path from 'path'
import { createRequire } from 'module'
import debug from 'debug'
import resolve from 'resolve'
import { once } from '@dcloudio/uni-shared'

import { normalizePath } from './utils'
import { isInHBuilderX } from './hbx/env'
import { extensions, uni_app_x_extensions } from './constants'

export function requireResolve(filename: string, basedir: string) {
  return resolveWithSymlinks(filename, basedir)
}

function resolveWithSymlinks(id: string, basedir: string): string {
  return resolve.sync(id, {
    basedir,
    extensions:
      process.env.UNI_APP_X === 'true' ? uni_app_x_extensions : extensions,
    // necessary to work with pnpm
    preserveSymlinks: true,
  })
}

export function resolveMainUtsName() {
  if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
    return process.env.UNI_COMPILE_EXT_API_UVUE_ENTRY || 'main.uts'
  }
  return 'main.uts'
}

export function relativeFile(from: string, to: string) {
  const relativePath = normalizePath(path.relative(path.dirname(from), to))
  return relativePath.startsWith('.') ? relativePath : './' + relativePath
}

export const resolveMainPathOnce = once((inputDir: string) => {
  if (process.env.UNI_APP_X === 'true') {
    const mainUTSPath = path.resolve(inputDir, resolveMainUtsName())
    if (fs.existsSync(mainUTSPath)) {
      return normalizePath(mainUTSPath)
    }
  }
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return normalizePath(mainTsPath)
  }
  return normalizePath(path.resolve(inputDir, 'main.js'))
})

const ownerModules = [
  '@dcloudio/uni-app',
  '@dcloudio/vite-plugin-uni',
  '@dcloudio/uni-cli-shared',
]

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
  const cliContext = process.env.UNI_CLI_CONTEXT || process.cwd()
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

export function resolveBuiltIn(module: string) {
  if (
    process.env.UNI_COMPILE_TARGET === 'ext-api' &&
    process.env.UNI_APP_NEXT_WORKSPACE &&
    module.startsWith('@dcloudio/')
  ) {
    return path.resolve(
      process.env.UNI_APP_NEXT_WORKSPACE,
      'packages',
      module.replace('@dcloudio/', '')
    )
  }
  return require.resolve(module, { paths: getBuiltInPaths() })
}

export function resolveVueI18nRuntime() {
  return path.resolve(
    __dirname,
    process.env.UNI_APP_X === 'true'
      ? '../lib/dom2/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      : '../lib/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
  )
}

export function resolveVueI18n() {
  return path.resolve(
    __dirname,
    '../lib/dom2/vue-i18n/dist/vue-i18n.esm-bundler.js'
  )
}

export function resolveProjectVueI18n() {
  const basedir = process.env.UNI_INPUT_DIR || process.env.UNI_CLI_CONTEXT
  if (!basedir) {
    return
  }
  const projectRequire = createRequire(path.resolve(basedir, 'package.json'))
  try {
    return projectRequire.resolve('vue-i18n')
  } catch (e) {}
}

export function resolveVueI18nDependencies(): Record<string, string> {
  if (
    process.env.UNI_APP_X !== 'true' ||
    resolveProjectVueI18n() !== undefined
  ) {
    return {}
  }
  const libDir = path.resolve(__dirname, '../lib/dom2')
  return {
    '@intlify/core-base': path.resolve(
      libDir,
      '@intlify/core-base/dist/core-base.mjs'
    ),
    '@intlify/message-compiler': path.resolve(
      libDir,
      '@intlify/message-compiler/dist/message-compiler.mjs'
    ),
    '@intlify/shared': path.resolve(libDir, '@intlify/shared/dist/shared.mjs'),
    '@vue/devtools-api': path.resolve(
      libDir,
      '@vue/devtools-api/lib/esm/index.js'
    ),
  }
}

export function resolveVueI18nRuntimeAlias(): Record<string, string> {
  if (
    process.env.UNI_APP_X === 'true' &&
    resolveProjectVueI18n() !== undefined
  ) {
    return {}
  }
  return {
    ...resolveVueI18nDependencies(),
    'vue-i18n': resolveVueI18nRuntime(),
  }
}

let componentsLibPath: string = ''
export function resolveComponentsLibPath() {
  if (!componentsLibPath) {
    const dir =
      process.env.UNI_APP_X_DOM2 === 'true'
        ? '../lib-x-vapor'
        : process.env.UNI_APP_X === 'true'
        ? '../lib-x'
        : '../lib'
    if (isInHBuilderX()) {
      componentsLibPath = path.join(
        resolveBuiltIn('@dcloudio/uni-components/package.json'),
        dir
      )
    } else {
      try {
        componentsLibPath = path.join(
          resolveWithSymlinks(
            '@dcloudio/uni-components/package.json',
            process.env.UNI_INPUT_DIR
          ),
          dir
        )
      } catch (e) {
        try {
          componentsLibPath = path.join(
            resolveWithSymlinks(
              '@dcloudio/uni-components/package.json',
              process.cwd()
            ),
            dir
          )
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
  return componentsLibPath
}

export function resolveComponentsLibDirs() {
  return process.env.UNI_COMPILE_TARGET === 'ext-api'
    ? []
    : [resolveComponentsLibPath()]
}
