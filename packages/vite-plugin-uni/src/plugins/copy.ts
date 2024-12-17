import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import {
  PUBLIC_DIR,
  type UniViteCopyPluginTarget,
  getPlatforms,
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
  const assets = [staticDir, uniModulesStaticDir]
  const subpackages = parseSubpackagesRootOnce(
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  )
  subpackages.forEach((root) => {
    assets.push(normalizePath(path.join(root, staticDir)))
    assets.push(normalizePath(path.join(root, uniModulesStaticDir)))
  })
  copyOptions!.assets.forEach((asset) => {
    assets.push(asset)
  })
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const platform = process.env.UNI_PLATFORM
  const utsPlatform = process.env.UNI_UTS_PLATFORM
  // 非当前平台 static 目录
  const ignorePlatformStaticDirs = getPlatforms()
    .filter((p) => {
      if (platform === 'app') {
        if (process.env.UNI_APP_X === 'true') {
          if (p === 'app-android' || p === 'app-ios') {
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
    .map((p) => '/' + PUBLIC_DIR + '/' + p + '/')

  const targets: UniViteCopyPluginTarget[] = [
    {
      src: assets,
      dest: outputDir,
      watchOptions: {
        ignored(path: string) {
          const normalizedPath = normalizePath(path)
          if (
            ignorePlatformStaticDirs.find((dir) =>
              // dir都是以 / 结尾，所以这里也要以 / 结尾
              (normalizedPath + '/').includes(dir)
            )
          ) {
            return fs.statSync(normalizedPath).isDirectory()
          }
          // 应该是软链
          if (!normalizedPath.startsWith(inputDir)) {
            // 目前仅简单处理static
            if (normalizedPath.includes('/static/')) {
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
  debugCopy(targets)
  checkIgnoreStatic(
    ignorePlatformStaticDirs.map((dir) => dir.substring(1).split('/'))
  )
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
