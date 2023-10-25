import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import {
  PUBLIC_DIR,
  uniViteCopyPlugin,
  UniViteCopyPluginTarget,
  parseSubpackagesRootOnce,
  normalizePath,
  getPlatforms,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

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
  const platform = process.env.UNI_PLATFORM
  // 非当前平台 static 目录
  const ignorePlatformStaticDirs = getPlatforms()
    .filter((p) => {
      if (platform === 'app') {
        return p !== 'app' && p !== 'app-plus'
      } else if (platform === 'h5' || platform === 'web') {
        return p !== 'h5' && p !== 'web'
      }
      return p !== platform
    })
    .map((p) => '/' + PUBLIC_DIR + '/' + p)

  const targets: UniViteCopyPluginTarget[] = [
    {
      src: assets,
      dest: outputDir,
      watchOptions: {
        ignored(path: string) {
          const normalizedPath = normalizePath(path)
          if (
            ignorePlatformStaticDirs.find((dir) => normalizedPath.includes(dir))
          ) {
            return fs.statSync(normalizedPath).isDirectory()
          }
          return false
        },
      },
    },
  ]
  targets.push(...copyOptions!.targets)
  debugCopy(targets)
  return uniViteCopyPlugin({
    targets,
    verbose: process.env.DEBUG ? true : false,
  })
}
