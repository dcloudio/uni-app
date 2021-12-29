import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import {
  PUBLIC_DIR,
  uniViteCopyPlugin,
  UniViteCopyPluginTarget,
  parseSubpackagesRootOnce,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

const debugCopy = debug('vite:uni:copy')

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
  const targets: UniViteCopyPluginTarget[] = [
    {
      src: assets,
      dest: outputDir,
    },
  ]
  targets.push(...copyOptions!.targets)
  debugCopy(targets)
  return uniViteCopyPlugin({
    targets,
    verbose: process.env.DEBUG ? true : false,
  })
}
