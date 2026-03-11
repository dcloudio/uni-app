import type { BuildOptions, Plugin } from 'vite'
import { isUTSProxy } from '../uts'
import { resolveMainPathOnce } from '../resolve'
import type { RollupOptions } from 'rollup'

export function uniUniModulesExtApiPlugin(): Plugin {
  return {
    name: 'uni:uni-modules_ext-api',
    apply: 'build',
    config() {
      const rollupOptions: RollupOptions = {
        input: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
        external: ['vue'],
        output: {
          format: 'iife',
          entryFileNames: `${
            process.env.UNI_COMPILE_EXT_API_OUT_FILE_NAME || 'components'
          }.js`,
          globals: {
            vue: 'Vue',
            uni: 'uni',
          },
        },
      }
      const build: BuildOptions = {}
      if (
        process.env.UNI_UTS_PLATFORM === 'app-ios' ||
        process.env.UNI_UTS_PLATFORM === 'app-harmony' ||
        (process.env.UNI_UTS_PLATFORM === 'app-android' &&
          process.env.UNI_APP_X_DOM2 === 'true')
      ) {
        build.rollupOptions = rollupOptions
      }
      return {
        build,
      }
    },
    load(id) {
      if (isUTSProxy(id)) {
        return ''
      }
    },
    // generateBundle(_, bundle) {
    //   Object.keys(bundle).forEach((fileName) => {
    //     console.log('fileName', fileName)
    //   })
    // },
  }
}
