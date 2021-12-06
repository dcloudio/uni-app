import { RollupOptions } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { EXTNAME_VUE_RE, removeExt } from '@dcloudio/uni-cli-shared'
import { isBuiltInComponent } from '@dcloudio/uni-shared'
import { createUniNVuePagePath } from '../plugins/entry'

export function createRollupOptions(pagePath: string): RollupOptions {
  return {
    input: createUniNVuePagePath(pagePath),
    context: 'global',
    external: ['vue'],
    preserveEntrySignatures: false,
    output: {
      dir: process.env.UNI_OUTPUT_DIR,
      file: removeExt(pagePath) + '.js',
      format: 'iife',
      exports: 'auto',
      sourcemap: false,
      globals: { vue: 'Vue' },
    },
    plugins: [
      vue({
        include: [EXTNAME_VUE_RE],
        ssr: false,
        isProduction: process.env.NODE_ENV === 'production',
        refTransform: true,
        template: {
          compilerOptions: {
            // TODO
            isNativeTag: isBuiltInComponent,
          },
        },
      }),
    ],
  }
}
