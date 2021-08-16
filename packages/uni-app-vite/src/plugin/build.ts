import fs from 'fs'
import path from 'path'
import { UserConfig } from 'vite'

import {
  emptyDir,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'

export function buildOptions(): UserConfig['build'] {
  // 开始编译时，清空输出目录
  if (fs.existsSync(process.env.UNI_OUTPUT_DIR)) {
    emptyDir(process.env.UNI_OUTPUT_DIR)
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
        entryFileNames: 'app-service.js',
        manualChunks: {},
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
