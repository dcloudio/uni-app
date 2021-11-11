import fs from 'fs'
import path from 'path'
import { ConfigEnv, UserConfig } from 'vite'

import {
  emptyDir,
  normalizePath,
  isConfusionFile,
  hasConfusionFile,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'

export function buildOptions(configEnv: ConfigEnv): UserConfig['build'] {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  if (fs.existsSync(outputDir)) {
    emptyDir(outputDir)
  }
  return {
    // sourcemap: 'inline',
    emptyOutDir: false, // 不清空输出目录，否则会影响 webpack 的输出
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
      external: ['vue'],
      output: {
        name: 'AppService',
        format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'iife',
        amd: {
          autoId: true,
        },
        entryFileNames: 'app-service.js',
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
        manualChunks(id) {
          if (hasConfusionFile()) {
            if (
              configEnv.mode === 'production' &&
              isConfusionFile(path.relative(inputDir, id))
            ) {
              return 'app-confusion'
            }
          }
        },
        chunkFileNames(chunk) {
          if (chunk.isDynamicEntry && chunk.facadeModuleId) {
            const filepath = path.relative(
              process.env.UNI_INPUT_DIR,
              chunk.facadeModuleId
            )
            return normalizePath(
              filepath.replace(path.extname(filepath), '.js')
            )
          }
          return '[name].js'
        },
        assetFileNames: '[name][extname]',
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
}
