import path from 'path'
import { UserConfig } from 'vite'

import { normalizePath, resolveMainPathOnce } from '@dcloudio/uni-cli-shared'

export function buildOptions(): UserConfig['build'] {
  return {
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
