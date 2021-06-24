import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'

import { PUBLIC_DIR, uniViteCopyPlugin } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'

export function uniCopyPlugin({
  inputDir,
  outputDir,
}: VitePluginUniResolvedOptions): Plugin {
  return uniViteCopyPlugin({
    targets: [
      {
        src: slash(path.resolve(inputDir, PUBLIC_DIR)),
        dest: outputDir,
      },
      {
        src: slash(path.resolve(inputDir, 'uni_modules/*/' + PUBLIC_DIR)),
        dest: outputDir,
        rename: (_name, _extension, fullPath) => {
          return path.relative(inputDir, fullPath)
        },
      },
    ],
    hook: 'writeBundle',
    verbose: process.env.DEBUG ? true : false,
  })
}
