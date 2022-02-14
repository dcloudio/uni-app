import fs from 'fs'
import path from 'path'
import { ConfigEnv, UserConfig } from 'vite'

import {
  emptyDir,
  isInHybridNVue,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { nvueOutDir } from '../utils'

export function buildOptions(
  renderer: 'native' | undefined,
  userConfig: UserConfig,
  _: ConfigEnv
): UserConfig['build'] {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  function emptyNVueDir() {
    const nvueOutputDir = nvueOutDir()
    if (fs.existsSync(nvueOutputDir)) {
      emptyDir(nvueOutputDir)
    }
  }
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  if (renderer === 'native') {
    emptyNVueDir()
    emptyOutDir()
  } else {
    if (isInHybridNVue(userConfig)) {
      emptyNVueDir()
    } else {
      emptyOutDir()
    }
  }
  return {
    // App 端目前仅提供 inline
    sourcemap: userConfig.build?.sourcemap ? 'inline' : false,
    emptyOutDir: false, // 不清空输出目录，否则会影响 webpack 的输出
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolveMainPathOnce(inputDir),
      output: {
        sourcemapPathTransform(relativeSourcePath, sourcemapPath) {
          const sourcePath = normalizePath(
            path.relative(
              inputDir,
              path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
            )
          )
          if (sourcePath.startsWith('..')) {
            return ''
          }
          return 'uni-app:///' + sourcePath
        },
        manualChunks: {},
        chunkFileNames(chunk) {
          if (chunk.isDynamicEntry && chunk.facadeModuleId) {
            const filepath = path.relative(inputDir, chunk.facadeModuleId)
            return normalizePath(
              filepath.replace(path.extname(filepath), '.js')
            )
          }
          return '[name].js'
        },
        assetFileNames: '[name][extname]',
      },
    },
  }
}
