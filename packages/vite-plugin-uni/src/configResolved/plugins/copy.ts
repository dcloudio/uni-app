import path from 'path'
import { Plugin } from 'vite'
import copy from 'rollup-plugin-copy'
import { PUBLIC_DIR } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'

export function uniCopyPlugin({
  inputDir,
  outputDir,
}: VitePluginUniResolvedOptions): Plugin {
  // TODO 多平台，如 h5,app 的 hybrid/html 目录
  return copy({
    targets: [
      {
        src: path.resolve(inputDir, PUBLIC_DIR),
        dest: outputDir,
      },
      {
        src: path.resolve(inputDir, 'uni_modules/*/' + PUBLIC_DIR),
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
