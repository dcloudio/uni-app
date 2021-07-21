import path from 'path'
import slash from 'slash'
import { UserConfig } from 'vite'

import { resolveMainPathOnce } from '@dcloudio/uni-cli-shared'

export function buildOptions(): UserConfig['build'] {
  return {
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
            return slash(filepath.replace(path.extname(filepath), '.js'))
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
