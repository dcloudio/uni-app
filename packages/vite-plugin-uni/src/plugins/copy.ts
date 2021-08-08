import { Plugin } from 'vite'

import {
  PUBLIC_DIR,
  uniViteCopyPlugin,
  UniViteCopyPluginTarget,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function uniCopyPlugin({
  outputDir,
  copyOptions,
}: Pick<VitePluginUniResolvedOptions, 'outputDir' | 'copyOptions'>): Plugin {
  const assets = [PUBLIC_DIR + '/**/*', 'uni_modules/*/' + PUBLIC_DIR + '/**/*']
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
  return uniViteCopyPlugin({
    targets,
    verbose: process.env.DEBUG ? true : false,
  })
}
