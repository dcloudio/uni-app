import path from 'path'
import { Plugin } from 'vite'

import {
  normalizePath,
  PUBLIC_DIR,
  uniViteCopyPlugin,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'
import type { Target } from 'rollup-plugin-copy'

export function uniCopyPlugin({
  inputDir,
  outputDir,
  copyOptions,
}: VitePluginUniResolvedOptions): Plugin {
  const targets: Target[] = [
    {
      src: normalizePath(path.resolve(inputDir, PUBLIC_DIR)),
      dest: outputDir,
    },
    {
      src: normalizePath(path.resolve(inputDir, 'uni_modules/*/' + PUBLIC_DIR)),
      dest: outputDir,
      rename: (_name, _extension, fullPath) => {
        return path.relative(inputDir, fullPath)
      },
    },
  ]
  copyOptions!.assets.forEach((asset) => {
    targets.push({
      src: normalizePath(path.resolve(inputDir, asset)),
      dest: outputDir,
      rename: (_name, _extension, fullPath) => {
        return path.relative(inputDir, fullPath)
      },
    })
    targets.push({
      src: normalizePath(path.resolve(inputDir, 'uni_modules/*/' + asset)),
      dest: outputDir,
      rename: (_name, _extension, fullPath) => {
        return path.relative(inputDir, fullPath)
      },
    })
  })
  targets.push(...copyOptions!.targets)
  return uniViteCopyPlugin({
    targets,
    hook: 'writeBundle',
    verbose: process.env.DEBUG ? true : false,
  })
}
