import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import {
  PUBLIC_DIR,
  type UniViteCopyPluginTarget,
  getPlatforms,
  hasUTSModulePlatformFile,
  isWindows,
  normalizePath,
  parseSubpackagesRootOnce,
  uniViteCopyPlugin,
} from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'

const debugCopy = debug('uni:copy')

export function uniCopyPlugin({
  outputDir,
  copyOptions,
}: Pick<VitePluginUniResolvedOptions, 'outputDir' | 'copyOptions'>): Plugin {
  const staticDir = PUBLIC_DIR + '/**/*'
  const uniModulesStaticDir = 'uni_modules/*/' + PUBLIC_DIR + '/**/*'
  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
  const uniModulesCppDir = isDom2 ? 'uni_modules/*/cppsdk/**/*' : ''
  const assets = [staticDir, uniModulesStaticDir]
  const cppAssets: string[] = []
  if (uniModulesCppDir) {
    cppAssets.push(uniModulesCppDir)
  }
  const subpackages = parseSubpackagesRootOnce(
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  )
  subpackages.forEach((root) => {
    assets.push(normalizePath(path.join(root, staticDir)))
    assets.push(normalizePath(path.join(root, uniModulesStaticDir)))
    if (uniModulesCppDir) {
      cppAssets.push(normalizePath(path.join(root, uniModulesCppDir)))
    }
  })
  copyOptions!.assets.forEach((asset) => {
    assets.push(asset)
  })
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const normalizedInputDir = normalizePathForCompare(inputDir)
  const platform = process.env.UNI_PLATFORM
  const utsPlatform = process.env.UNI_UTS_PLATFORM
  // 非当前平台 static 目录
  const ignorePlatformStaticDirs = createIgnorePlatformDirs(
    PUBLIC_DIR,
    platform,
    utsPlatform
  )
  // app 资源包导出时，如果 uni_modules 的 utssdk 不支持当前原生平台，则连同 static 一起忽略
  const ignoreUniModulesStaticDirs = createIgnoreUniModulesStaticDirs(
    inputDir,
    subpackages,
    utsPlatform
  )
  const ignoreStaticDirs = [
    ...ignorePlatformStaticDirs,
    ...ignoreUniModulesStaticDirs,
  ]
  // 非当前平台 cppsdk 目录
  const ignorePlatformCppDirs = uniModulesCppDir
    ? createIgnorePlatformDirs('cppsdk', platform, utsPlatform)
    : []

  const targets: UniViteCopyPluginTarget[] = [
    {
      src: assets,
      dest: outputDir,
      watchOptions: {
        readyTimeout: getReadyTimeout(),
        ignored(path: string) {
          const normalizedPath = normalizePath(path)
          const comparablePath = normalizePathForCompare(normalizedPath)
          if (
            ignoreUniModulesStaticDirs.find((dir) =>
              // 忽略整个 static 目录及其子文件，避免无效资源进入资源包
              (comparablePath + '/').includes(dir)
            )
          ) {
            return true
          }
          if (
            ignorePlatformStaticDirs.find((dir) =>
              (comparablePath + '/').includes(dir)
            )
          ) {
            return fs.statSync(normalizedPath).isDirectory()
          }
          if (!comparablePath.startsWith(normalizedInputDir)) {
            if (comparablePath.includes('/static/')) {
              return false
            }
            return true
          }
          return false
        },
      },
    },
  ]
  targets.push(...copyOptions!.targets)
  if (process.env.UNI_APP_X_DOM2_CPP_DIR && cppAssets.length) {
    targets.push({
      src: cppAssets,
      dest: process.env.UNI_APP_X_DOM2_CPP_DIR,
      watchOptions: {
        readyTimeout: getReadyTimeout(),
        ignored(path: string) {
          const normalizedPath = normalizePath(path)
          if (
            ignorePlatformCppDirs.find((dir) =>
              // dir都是以 / 结尾，所以这里也要以 / 结尾
              (normalizedPath + '/').includes(dir)
            )
          ) {
            return fs.statSync(normalizedPath).isDirectory()
          }
          return false
        },
      },
    })
  }
  debugCopy(targets)
  checkIgnoreStatic(ignoreStaticDirs.map((dir) => dir.substring(1).split('/')))
  return uniViteCopyPlugin({
    targets,
  })
}

let isIgnoreChecked = false

function checkIgnoreStatic(ignoreStatic: string[][]) {
  if (isIgnoreChecked) {
    return
  }
  isIgnoreChecked = true
  const existIgnore = new Set()
  ignoreStatic.forEach((ignore) => {
    const dir = path.resolve(process.env.UNI_INPUT_DIR, ...ignore)
    if (fs.existsSync(dir)) {
      existIgnore.add(ignore.join('/'))
    }
  })
  if (existIgnore.size) {
    console.log(
      '已忽略静态资源目录：' +
        [...existIgnore].join('、') +
        '。详见：https://uniapp.dcloud.net.cn/tutorial/platform.html#static'
    )
  }
}

function getReadyTimeout() {
  // chokidar 在部分 windows 上 ready 会触发较早，导致文件还没被全部 copy 过去
  if (!isWindows) {
    return 1000
  }
  if (process.env.NODE_ENV === 'development') {
    return 1000
  }
  // 仅在生产环境使用
  return 4000
}

function createIgnorePlatformDirs(
  dir: string,
  platform: UniApp.PLATFORM,
  utsPlatform: UniApp.PLATFORM
) {
  return (
    getPlatforms()
      .filter((p) => {
        if (platform === 'app') {
          if (process.env.UNI_APP_X === 'true') {
            if (p === 'app-android' || p === 'app-ios' || p === 'app-harmony') {
              return p !== utsPlatform
            }
            return p !== 'app'
          }
          return p !== 'app' && p !== 'app-plus'
        } else if (platform === 'h5' || platform === 'web') {
          return p !== 'h5' && p !== 'web'
        } else if (platform.startsWith('app-')) {
          return p !== 'app' && p !== platform
        }
        return p !== platform
      })
      // 在最后增加 / 是为了避免误判以 platform 开头的目录，比如 app-test
      .map((p) => normalizePathForCompare('/' + dir + '/' + p + '/'))
  )
}

function createIgnoreUniModulesStaticDirs(
  inputDir: string,
  subpackages: string[],
  utsPlatform: UniApp.PLATFORM
) {
  if (utsPlatform !== 'app-android' && utsPlatform !== 'app-ios') {
    return []
  }
  const ignoreDirs: string[] = []
  const roots = [
    inputDir,
    ...subpackages.map((root) => path.resolve(inputDir, root)),
  ]
  roots.forEach((rootDir) => {
    const uniModulesDir = path.resolve(rootDir, 'uni_modules')
    if (!fs.existsSync(uniModulesDir)) {
      return
    }
    fs.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
      const uniModuleRootDir = path.resolve(uniModulesDir, uniModuleDir)
      const utssdkDir = path.resolve(uniModuleRootDir, 'utssdk')
      const staticDir = path.resolve(uniModuleRootDir, PUBLIC_DIR)
      if (!fs.existsSync(utssdkDir) || !fs.existsSync(staticDir)) {
        return
      }
      if (hasUTSModulePlatformFile(uniModuleRootDir, utsPlatform)) {
        return
      }
      ignoreDirs.push(
        normalizePathForCompare(
          '/' + normalizePath(path.relative(inputDir, staticDir)) + '/'
        )
      )
    })
  })
  return ignoreDirs
}

function normalizePathForCompare(id: string) {
  const normalizedPath = normalizePath(id)
  return isWindows ? normalizedPath.toLowerCase() : normalizedPath
}
