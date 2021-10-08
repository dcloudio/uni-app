import path from 'path'
import { UserConfig } from 'vite'

import { normalizePath, resolveMainPathOnce } from '@dcloudio/uni-cli-shared'

export function buildOptions(): UserConfig['build'] {
  return {
    // sourcemap: 'inline', // TODO
    assetsInlineLimit: 0, // TODO
    rollupOptions: {
      input: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
      output: {
        format: 'cjs',
        entryFileNames: 'main.js',
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
      },
    },
  }
}
